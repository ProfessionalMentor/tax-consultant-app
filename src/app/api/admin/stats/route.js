import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Dynamic Client Count
    const clientCount = await prisma.user.count({
      where: { role: "CLIENT" },
    });

    // 2. Dynamic Cases Count
    const activeCasesCount = await prisma.case.count({
      where: { status: "ACTIVE" },
    });

    // 3. Dynamic Pending Notice Count
    const pendingNoticesCount = await prisma.taxRecord.count({
      where: { noticeReceived: true, responseDocumentUrl: null },
    });

    // 4. Sum of Invoices Billed Amount for dynamic revenue
    const invoices = await prisma.invoice.findMany({
      select: { amountBilled: true },
    });
    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amountBilled, 0);

    // 5. Fetch recent cases for case triage
    const recentCases = await prisma.case.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
      include: {
        client: true,
        assignedLawyer: true,
      },
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue: `PKR ${totalRevenue.toLocaleString("en-PK")}`,
        activeCases: activeCasesCount.toString(),
        clientCount: clientCount.toString(),
        pendingNotices: pendingNoticesCount.toString(),
      },
      recentCases: recentCases.map((c) => ({
        id: c.id,
        caseNumber: c.caseNumber,
        title: c.title,
        clientName: c.client?.name || "Unlinked Client",
        lawyerName: c.assignedLawyer?.name || "Unassigned",
        status: c.status,
        filingDate: c.filingDate ? new Date(c.filingDate).toLocaleDateString("en-PK", { dateStyle: "medium" }) : "N/A",
      })),
    });
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
