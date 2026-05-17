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
    let whereClause = {};

    if (role === 'CLIENT') {
      whereClause = { clientId: id };
    } else if (role === 'LAWYER') {
      whereClause = { lawyerId: id };
    } else if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
      whereClause = {}; // Admins can see all cases
    }

    const cases = await prisma.case.findMany({
      where: whereClause,
      include: {
        assignedLawyer: {
          select: { id: true, name: true, email: true, specialization: true },
        },
        client: {
          select: { id: true, name: true, email: true, phoneNumber: true, ntnNumber: true, strn: true, cnic: true, businessName: true },
        },
        hearings: {
          orderBy: { hearingDate: 'desc' },
        },
        documents: {
          include: {
            document: true
          }
        }
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

    const { role, id } = session.user;
    const body = await req.json();

    let targetClientId = body.clientId;
    let targetLawyerId = body.lawyerId;

    if (role === 'CLIENT') {
      targetClientId = id;
    } else if (role === 'LAWYER') {
      targetLawyerId = id;
    }

    if (!targetClientId) {
      return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
    }

    const caseData = await prisma.case.create({
      data: {
        caseNumber: body.caseNumber,
        title: body.title,
        description: body.description,
        type: body.type,
        clientId: targetClientId,
        lawyerId: targetLawyerId || null,
        courtName: body.courtName,
        courtLocation: body.courtLocation,
        judicialOfficer: body.judicialOfficer,
        filingDate: body.filingDate ? new Date(body.filingDate) : null,
        nextHearingDate: body.nextHearingDate ? new Date(body.nextHearingDate) : null,
        retainerFee: body.retainerFee || 0,
        otherFees: body.otherFees || 0,
        courtCharges: body.courtCharges || 0,
      },
      include: {
        assignedLawyer: {
          select: { id: true, name: true, email: true },
        },
        client: {
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
