import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role, id } = session.user;
    const url = new URL(req.url);
    const clientId = url.searchParams.get('clientId');

    let targetUserId = id;
    if (clientId && (role === 'LAWYER' || role === 'ADMIN' || role === 'SUPER_ADMIN')) {
      targetUserId = clientId;
    }

    const taxRecords = await prisma.taxRecord.findMany({
      where: {
        userId: targetUserId,
      },
      orderBy: { taxYear: 'desc' },
    });

    return NextResponse.json(taxRecords);
  } catch (error) {
    console.error('GET /api/tax-records error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role, id } = session.user;
    const body = await req.json();

    let targetUserId = id;
    if (body.userId && (role === 'LAWYER' || role === 'ADMIN' || role === 'SUPER_ADMIN')) {
      targetUserId = body.userId;
    }

    const taxRecord = await prisma.taxRecord.create({
      data: {
        userId: targetUserId,
        recordType: body.recordType,
        taxYear: body.taxYear,
        filingPeriod: body.filingPeriod,
        ntnNumber: body.ntnNumber,
        incomeTaxReturn: body.incomeTaxReturn,
        salesTaxReturn: body.salesTaxReturn,
        strn: body.strn,
        companyRegistration: body.companyRegistration,
        incorporationNo: body.incorporationNo,
        annualFormType: body.annualFormType,
        filingStatus: body.filingStatus || 'PENDING',
        filingDeadline: body.filingDeadline ? new Date(body.filingDeadline) : null,
        filedDate: body.filedDate ? new Date(body.filedDate) : null,
        acknowledgementNo: body.acknowledgementNo,
        praStatus: body.praStatus,
        epadsStatus: body.epadsStatus,
        noticeReceived: body.noticeReceived || false,
        noticeDate: body.noticeDate ? new Date(body.noticeDate) : null,
        noticeContent: body.noticeContent,
      },
    });

    return NextResponse.json(taxRecord, { status: 201 });
  } catch (error) {
    console.error('POST /api/tax-records error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
