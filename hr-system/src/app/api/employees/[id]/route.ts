import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/employees/:id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: { branch: true, department: true, designation: true },
    });

    if (!employee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch employee", error: String(error) },
      { status: 500 }
    );
  }
}

// PUT /api/employees/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    const employee = await prisma.employee.update({
      where: { id },
      data,
      include: { branch: true, department: true, designation: true },
    });

    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update employee", error: String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/employees/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.employee.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete employee", error: String(error) },
      { status: 500 }
    );
  }
}