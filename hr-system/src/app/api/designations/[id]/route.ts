import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/designations/:id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const designation = await prisma.designation.findUnique({
      where: { id },
      include: { branch: true, department: true },
    });

    if (!designation) {
      return NextResponse.json({ message: "Designation not found" }, { status: 404 });
    }

    return NextResponse.json(designation);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch designation", error: String(error) },
      { status: 500 }
    );
  }
}

// PUT /api/designations/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, branchId, departmentId } = body;

    const designation = await prisma.designation.update({
      where: { id },
      data: { name, branchId, departmentId },
      include: { branch: true, department: true },
    });

    return NextResponse.json(designation);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update designation", error: String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/designations/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.designation.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete designation", error: String(error) },
      { status: 500 }
    );
  }
}