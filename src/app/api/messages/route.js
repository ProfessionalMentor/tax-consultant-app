import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { recipientId: session.user.id },
          { senderId: session.user.id },
        ],
      },
      include: {
        sender: { select: { id: true, name: true, email: true } },
        recipient: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('GET /api/messages error:', error);
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

    const message = await prisma.message.create({
      data: {
        senderId: session.user.id,
        recipientId: body.recipientId,
        messageType: body.messageType || 'GENERAL',
        subject: body.subject,
        content: body.content,
        attachmentUrl: body.attachmentUrl,
      },
      include: {
        sender: { select: { id: true, name: true, email: true } },
        recipient: { select: { id: true, name: true, email: true } },
      },
    });

    // Create notification for recipient
    await prisma.notification.create({
      data: {
        userId: body.recipientId,
        notificationType: 'MESSAGE_RECEIVED',
        title: `New message from ${session.user.name}`,
        message: body.content,
        relatedEntityId: message.id,
        relatedEntityType: 'MESSAGE',
        notificationChannels: JSON.stringify(['PORTAL', 'EMAIL']),
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error('POST /api/messages error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
