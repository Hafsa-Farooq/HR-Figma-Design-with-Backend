import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const branches = await prisma.branch.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(branches);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch branches", error: String(error) },
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
    const branch = await prisma.branch.create({ data: { name } });
    return NextResponse.json(branch, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create branch", error: String(error) },
      { status: 500 }
    );
  }
}