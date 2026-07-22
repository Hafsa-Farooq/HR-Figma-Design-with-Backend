import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const departments = await prisma.department.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(departments);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch departments", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ message: "name is required" }, { status: 400 });
    }
    const department = await prisma.department.create({ data: { name } });
    return NextResponse.json(department, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create department", error: String(error) },
      { status: 500 }
    );
  }
}