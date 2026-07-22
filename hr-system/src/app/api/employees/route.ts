import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/employees
export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      include: { branch: true, department: true, designation: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch employees", error: String(error) },
      { status: 500 }
    );
  }
}

// POST /api/employees
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.employeeCode || !data.firstName || !data.lastName || !data.email) {
      return NextResponse.json(
        { message: "employeeCode, firstName, lastName and email are required" },
        { status: 400 }
      );
    }

    const employee = await prisma.employee.create({
      data,
      include: { branch: true, department: true, designation: true },
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error("=== CREATE EMPLOYEE ERROR ===");
    console.error(error);
    console.error("=== END ERROR ===");
    return NextResponse.json(
      { message: "Failed to create employee", error: String(error) },
      { status: 500 }
    );
  }
}