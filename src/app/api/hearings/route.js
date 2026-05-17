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
      whereClause = { case: { clientId: id } };
    } else if (role === 'LAWYER') {
      whereClause = { case: { lawyerId: id } };
    } else if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
      whereClause = {}; // Admins see all hearings
    }

    const hearings = await prisma.hearing.findMany({
      where: whereClause,
      include: {
        case: {
          select: {
            id: true,
            caseNumber: true,
            title: true,
            type: true,
            client: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
      orderBy: { hearingDate: 'asc' },
    });

    return NextResponse.json(hearings);
  } catch (error) {
    console.error('GET /api/hearings error:', error);
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

    const {
      caseId,
      hearingDate,
      courtRoom,
      judgeAssigned,
      hearingStatus,
      agenda,
      notes,
      outcome,
      nextStepsRecommended,
    } = body;

    if (!caseId || !hearingDate) {
      return NextResponse.json({ error: 'Case ID and Hearing Date are required' }, { status: 400 });
    }

    // Verify ownership of the case
    const existingCase = await prisma.case.findUnique({
      where: { id: caseId },
      select: { clientId: true, lawyerId: true },
    });

    if (!existingCase) {
      return NextResponse.json({ error: 'Associated case not found' }, { status: 404 });
    }

    const isOwner = existingCase.clientId === id;
    const isAssignedLawyer = existingCase.lawyerId === id;
    const isAdmin = role === 'ADMIN' || role === 'SUPER_ADMIN';

    // Only lawyer or admin can add hearings (clients can only view)
    if (!isAssignedLawyer && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Only the assigned lawyer or admin can add hearings' }, { status: 403 });
    }

    // Create the hearing
    const hearing = await prisma.hearing.create({
      data: {
        caseId,
        hearingDate: new Date(hearingDate),
        courtRoom: courtRoom || null,
        judgeAssigned: judgeAssigned || null,
        hearingStatus: hearingStatus || 'SCHEDULED',
        agenda: agenda || null,
        notes: notes || null,
        outcome: outcome || null,
        nextStepsRecommended: nextStepsRecommended || null,
        assignedLawyerId: isAssignedLawyer ? id : (existingCase.lawyerId || null),
      },
    });

    // Automatically update the nextHearingDate on the Case if this hearing is in the future
    const hearingDateTime = new Date(hearingDate);
    if (hearingDateTime >= new Date()) {
      await prisma.case.update({
        where: { id: caseId },
        data: {
          nextHearingDate: hearingDateTime,
        },
      });
    }

    return NextResponse.json(hearing, { status: 201 });
  } catch (error) {
    console.error('POST /api/hearings error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
