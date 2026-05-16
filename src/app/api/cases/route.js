import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cases = await prisma.case.findMany({
      where: {
        clientId: session.user.id,
      },
      include: {
        assignedLawyer: {
          select: { id: true, name: true, email: true },
        },
        hearings: {
          orderBy: { hearingDate: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(cases);
  } catch (error) {
    console.error('GET /api/cases error:', error);
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

    const caseData = await prisma.case.create({
      data: {
        caseNumber: body.caseNumber,
        title: body.title,
        description: body.description,
        type: body.type,
        clientId: session.user.id,
        courtName: body.courtName,
        courtLocation: body.courtLocation,
        judicialOfficer: body.judicialOfficer,
        filingDate: body.filingDate ? new Date(body.filingDate) : null,
        nextHearingDate: body.nextHearingDate ? new Date(body.nextHearingDate) : null,
        retainerFee: body.retainerFee || 0,
      },
      include: {
        assignedLawyer: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(caseData, { status: 201 });
  } catch (error) {
    console.error('POST /api/cases error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
