import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('GET /api/notifications error:', error);
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

    const notification = await prisma.notification.create({
      data: {
        userId: body.userId,
        notificationType: body.notificationType,
        title: body.title,
        message: body.message,
        relatedEntityId: body.relatedEntityId,
        relatedEntityType: body.relatedEntityType,
        priority: body.priority || 'NORMAL',
        notificationChannels: body.notificationChannels ? JSON.stringify(body.notificationChannels) : JSON.stringify(['PORTAL']),
      },
    });

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    console.error('POST /api/notifications error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
