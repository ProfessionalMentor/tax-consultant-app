import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const caseId = params.id;

    const caseData = await prisma.case.findUnique({
      where: { id: caseId },
      include: {
        assignedLawyer: {
          select: { id: true, name: true, email: true, specialization: true },
        },
        hearings: {
          orderBy: { hearingDate: 'desc' },
        },
        courtOrders: {
          orderBy: { orderDate: 'desc' },
        },
        documents: {
          include: {
            document: true,
          },
        },
      },
    });

    if (!caseData) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    // Verify ownership
    const isOwner = caseData.clientId === session.user.id;
    const isAssignedLawyer = caseData.lawyerId === session.user.id;
    const isAdmin = session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN';

    if (!isOwner && !isAssignedLawyer && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(caseData);
  } catch (error) {
    console.error('GET /api/cases/:id error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const caseId = params.id;

    // Verify ownership
    const existingCase = await prisma.case.findUnique({
      where: { id: caseId },
      select: { clientId: true, lawyerId: true },
    });

    if (!existingCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    const isOwner = existingCase.clientId === session.user.id;
    const isAssignedLawyer = existingCase.lawyerId === session.user.id;
    const isAdmin = session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN';

    if (!isOwner && !isAssignedLawyer && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updatedCase = await prisma.case.update({
      where: { id: caseId },
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
        courtName: body.courtName,
        nextHearingDate: body.nextHearingDate ? new Date(body.nextHearingDate) : undefined,
      },
      include: {
        assignedLawyer: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(updatedCase);
  } catch (error) {
    console.error('PUT /api/cases/:id error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const caseId = params.id;

    const deletedCase = await prisma.case.delete({
      where: { id: caseId },
    });

    return NextResponse.json({ message: 'Case deleted', case: deletedCase });
  } catch (error) {
    console.error('DELETE /api/cases/:id error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
