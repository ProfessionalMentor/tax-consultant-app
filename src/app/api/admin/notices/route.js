import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Fetch all clients to populate the dropdown for recording new notices
    const clients = await prisma.user.findMany({
      where: { role: "CLIENT" },
      select: {
        id: true,
        name: true,
        email: true,
        ntnNumber: true,
        businessName: true,
      },
    });

    // 2. Fetch all tax records that have received a notice
    const notices = await prisma.taxRecord.findMany({
      where: { noticeReceived: true },
      include: {
        user: true,
      },
      orderBy: {
        noticeDate: "desc",
      },
    });

    return NextResponse.json({ success: true, clients, notices });
  } catch (error) {
    console.error("Failed to fetch notices:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, recordType, taxYear, noticeContent, noticeDate, noticeDocumentUrl } = body;

    if (!userId || !recordType || !taxYear || !noticeContent) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if client exists
    const client = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!client) {
      return NextResponse.json(
        { success: false, error: "Client not found" },
        { status: 404 }
      );
    }

    // Check if a tax record already exists for this client, type, and year
    const existingRecord = await prisma.taxRecord.findFirst({
      where: {
        userId,
        recordType,
        taxYear,
      },
    });

    let updatedRecord;

    if (existingRecord) {
      // Update existing record with notice info
      updatedRecord = await prisma.taxRecord.update({
        where: { id: existingRecord.id },
        data: {
          noticeReceived: true,
          noticeDate: noticeDate ? new Date(noticeDate) : new Date(),
          noticeContent,
          noticeDocumentUrl: noticeDocumentUrl || "/documents/sample-notice.pdf",
          filingStatus: "PENDING", // When a notice is received, reset compliance state
        },
      });
    } else {
      // Create a brand new tax record with notice info
      updatedRecord = await prisma.taxRecord.create({
        data: {
          userId,
          recordType,
          taxYear,
          noticeReceived: true,
          noticeDate: noticeDate ? new Date(noticeDate) : new Date(),
          noticeContent,
          noticeDocumentUrl: noticeDocumentUrl || "/documents/sample-notice.pdf",
          filingStatus: "PENDING",
        },
      });
    }

    return NextResponse.json({ success: true, record: updatedRecord });
  } catch (error) {
    console.error("Failed to save notice:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { noticeId, responseDocumentUrl } = body;

    if (!noticeId) {
      return NextResponse.json(
        { success: false, error: "Notice ID is required" },
        { status: 400 }
      );
    }

    const record = await prisma.taxRecord.findUnique({
      where: { id: noticeId },
    });

    if (!record) {
      return NextResponse.json(
        { success: false, error: "Notice record not found" },
        { status: 404 }
      );
    }

    const updatedRecord = await prisma.taxRecord.update({
      where: { id: noticeId },
      data: {
        responseDocumentUrl: responseDocumentUrl || "/documents/response-filed.pdf",
        filingStatus: "FILED", // Mark as resolved/filed
        filedDate: new Date(),
      },
    });

    return NextResponse.json({ success: true, record: updatedRecord });
  } catch (error) {
    console.error("Failed to update notice response:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
