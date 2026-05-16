import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const notificationId = params.id;

    // Verify ownership
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
    }

    if (notification.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updated = await prisma.notification.update({
      where: { id: notificationId },
      data: {
        isRead: body.isRead ?? notification.isRead,
        readAt: body.isRead ? new Date() : notification.readAt,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('PATCH /api/notifications/:id error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const notificationId = params.id;

    // Verify ownership
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
    }

    if (notification.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.notification.delete({
      where: { id: notificationId },
    });

    return NextResponse.json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('DELETE /api/notifications/:id error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
