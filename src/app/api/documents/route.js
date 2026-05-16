import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function GET(req) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const documents = await prisma.document.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: { uploadedAt: 'desc' },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error('GET /api/documents error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contentType = req.headers.get('content-type') || '';
    let body;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file');

      if (!file || typeof file === 'string') {
        return NextResponse.json({ error: 'File is required' }, { status: 400 });
      }

      const bytes = Buffer.from(await file.arrayBuffer());
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadsDir, { recursive: true });

      const extension = path.extname(file.name || '').toLowerCase();
      const safeName = `${Date.now()}-${crypto.randomUUID()}${extension}`;
      await writeFile(path.join(uploadsDir, safeName), bytes);

      body = {
        documentName: formData.get('documentName') || file.name,
        fileUrl: `/uploads/${safeName}`,
        fileType: file.type || 'application/octet-stream',
        fileSize: file.size || bytes.length,
        documentType: formData.get('documentType') || 'OTHER',
        description: formData.get('description') || `Uploaded on ${new Date().toLocaleDateString()}`,
        isConfidential: formData.get('isConfidential') === 'true',
      };
    } else {
      body = await req.json();
    }

    const document = await prisma.document.create({
      data: {
        userId: session.user.id,
        documentName: body.documentName,
        fileUrl: body.fileUrl,
        fileType: body.fileType,
        fileSize: body.fileSize || 0,
        documentType: body.documentType,
        description: body.description,
        isConfidential: body.isConfidential || false,
        metadata: body.metadata ? JSON.stringify(body.metadata) : null,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('POST /api/documents error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
