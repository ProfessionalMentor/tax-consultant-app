import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const invoices = await prisma.invoice.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: { invoiceDate: 'desc' },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.error('GET /api/invoices error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Generate invoice number
    const lastInvoice = await prisma.invoice.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    
    const invoiceNumber = `INV-${Date.now()}`;

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        userId: body.userId,
        description: body.description,
        amountBilled: body.amountBilled,
        balanceDue: body.amountBilled,
        invoiceDate: new Date(),
        dueDate: body.dueDate ? new Date(body.dueDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        retainerFee: body.retainerFee || 0,
        perHearingFee: body.perHearingFee || 0,
        governmentFilingFees: body.governmentFilingFees || 0,
      },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error('POST /api/invoices error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
