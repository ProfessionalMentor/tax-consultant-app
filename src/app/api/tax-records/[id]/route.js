import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function PUT(req, context) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role } = session.user;
    if (role !== 'LAWYER' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await context.params;
    const body = await req.json();

    const updatedRecord = await prisma.taxRecord.update({
      where: { id },
      data: {
        filingStatus: body.filingStatus,
        acknowledgementNo: body.acknowledgementNo,
        filedDate: body.filedDate ? new Date(body.filedDate) : null,
        incomeTaxReturn: body.incomeTaxReturn,
        salesTaxReturn: body.salesTaxReturn,
        companyRegistration: body.companyRegistration,
        incorporationNo: body.incorporationNo,
        annualFormType: body.annualFormType,
        praStatus: body.praStatus,
        epadsStatus: body.epadsStatus,
        noticeReceived: body.noticeReceived !== undefined ? body.noticeReceived : undefined,
        noticeDate: body.noticeDate ? new Date(body.noticeDate) : null,
        noticeContent: body.noticeContent,
        responseDocumentUrl: body.responseDocumentUrl,
      },
    });

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error('PUT /api/tax-records/[id] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
