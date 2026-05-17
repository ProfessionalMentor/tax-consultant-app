import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, caseNumber, type, clientId } = await req.json();

    if (!title || !caseNumber || !type || !clientId) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const newCase = await prisma.case.create({
      data: {
        title,
        caseNumber,
        type,
        clientId,
        status: "ACTIVE",
        filingDate: new Date()
      }
    });

    return NextResponse.json({ success: true, case: newCase });
  } catch (error) {
    console.error("Failed to create case:", error);
    if (error.code === 'P2002') {
      return NextResponse.json({ success: false, error: "Case number already exists" }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
