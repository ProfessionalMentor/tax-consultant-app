import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const taxRecords = await prisma.taxRecord.findMany({
      where: {
        userId: session.user.id,
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

    const body = await req.json();

    const taxRecord = await prisma.taxRecord.create({
      data: {
        userId: session.user.id,
        recordType: body.recordType,
        taxYear: body.taxYear,
        filingPeriod: body.filingPeriod,
        ntnNumber: body.ntnNumber,
        incomeTaxReturn: body.incomeTaxReturn,
        salesTaxReturn: body.salesTaxReturn,
        strn: body.strn,
        companyRegistration: body.companyRegistration,
        filingStatus: body.filingStatus || 'PENDING',
        filingDeadline: body.filingDeadline ? new Date(body.filingDeadline) : null,
      },
    });

    return NextResponse.json(taxRecord, { status: 201 });
  } catch (error) {
    console.error('POST /api/tax-records error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
