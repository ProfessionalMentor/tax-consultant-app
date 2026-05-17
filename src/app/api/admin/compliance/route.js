import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, recordType, taxYear, filingStatus } = await req.json();

    if (!userId || !recordType || !taxYear) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const newRecord = await prisma.taxRecord.create({
      data: {
        userId,
        recordType,
        taxYear,
        filingStatus: filingStatus || "FILED",
        filingDeadline: new Date(),
        filedDate: new Date()
      }
    });

    return NextResponse.json({ success: true, record: newRecord });
  } catch (error) {
    console.error("Failed to add compliance record:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
