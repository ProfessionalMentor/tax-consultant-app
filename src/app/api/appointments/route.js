import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: { scheduledFor: 'asc' },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('GET /api/appointments error:', error);
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

    const appointment = await prisma.appointment.create({
      data: {
        userId: session.user.id,
        appointmentType: body.appointmentType,
        description: body.description,
        scheduledFor: body.scheduledFor ? new Date(body.scheduledFor) : null,
        duration: body.duration,
        location: body.location,
        meetingLink: body.meetingLink,
        notes: body.notes,
        reminder: body.reminder !== false,
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error('POST /api/appointments error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
