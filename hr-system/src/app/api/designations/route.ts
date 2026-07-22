import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/designations
export async function GET() {
  try {
    const designations = await prisma.designation.findMany({
      include: { branch: true, department: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(designations);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch designations", error: String(error) },
      { status: 500 }
    );
  }
}

// POST /api/designations
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, branchId, departmentId } = body;

    if (!name || !branchId || !departmentId) {
      return NextResponse.json(
        { message: "name, branchId and departmentId are required" },
        { status: 400 }
      );
    }

    const designation = await prisma.designation.create({
      data: { name, branchId, departmentId },
      include: { branch: true, department: true },
    });

    return NextResponse.json(designation, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create designation", error: String(error) },
      { status: 500 }
    );
  }
}