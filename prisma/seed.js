import { prisma } from '../../src/lib/prisma.js';
import bcrypt from 'bcryptjs';

async function main() {
  // Create test users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Client user
  const client = await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      name: 'Ahmed Hassan',
      email: 'client@example.com',
      password: hashedPassword,
      role: 'CLIENT',
      phoneNumber: '+92-300-1234567',
      ntnNumber: '1234567-8',
      cnic: '12345-6789012-3',
      businessName: 'Hassan Trading Co.',
      businessType: 'Import/Export',
      taxFilingStatus: 'ACTIVE',
    },
  });

  // Lawyer user
  const lawyer = await prisma.user.upsert({
    where: { email: 'lawyer@example.com' },
    update: {},
    create: {
      name: 'Fatima Khan (Advocate)',
      email: 'lawyer@example.com',
      password: hashedPassword,
      role: 'LAWYER',
      phoneNumber: '+92-300-9876543',
      specialization: 'Civil & Criminal Law',
      licenseNumber: 'AK-1234',
    },
  });

  // Accountant user
  const accountant = await prisma.user.upsert({
    where: { email: 'accountant@example.com' },
    update: {},
    create: {
      name: 'Muhammad Ali (Accountant)',
      email: 'accountant@example.com',
      password: hashedPassword,
      role: 'ACCOUNTANT',
      phoneNumber: '+92-300-5555555',
      specialization: 'Tax & Corporate Accounting',
      licenseNumber: 'CA-5678',
    },
  });

  console.log('✅ Users created:', { client, lawyer, accountant });

  // Create test case
  const testCase = await prisma.case.create({
    data: {
      caseNumber: 'CASE-2026-001',
      title: 'Property Dispute - Karachi High Court',
      description: 'Commercial property dispute regarding lease agreement breach',
      type: 'CIVIL',
      status: 'ACTIVE',
      priority: 'HIGH',
      clientId: client.id,
      lawyerId: lawyer.id,
      courtName: 'Karachi High Court',
      courtLocation: 'Karachi, Sindh',
      judicialOfficer: 'Justice Muhammad Amin',
      caseRegistrationNo: 'CH/001/2026',
      filingDate: new Date('2025-12-01'),
      nextHearingDate: new Date('2026-06-15'),
      retainerFee: 100000,
      courtCharges: 25000,
    },
  });

  console.log('✅ Case created:', testCase);

  // Create hearings
  const hearing1 = await prisma.hearing.create({
    data: {
      caseId: testCase.id,
      hearingDate: new Date('2026-06-15'),
      courtRoom: 'Court Room 4-A',
      judgeAssigned: 'Justice Muhammad Amin',
      hearingStatus: 'SCHEDULED',
      agenda: 'Arguments on preliminary objections',
      assignedLawyerId: lawyer.id,
    },
  });

  const hearing2 = await prisma.hearing.create({
    data: {
      caseId: testCase.id,
      hearingDate: new Date('2026-07-20'),
      courtRoom: 'Court Room 4-A',
      judgeAssigned: 'Justice Muhammad Amin',
      hearingStatus: 'SCHEDULED',
      agenda: 'Evidence presentation',
      assignedLawyerId: lawyer.id,
    },
  });

  console.log('✅ Hearings created:', { hearing1, hearing2 });

  // Create court order
  await prisma.courtOrder.create({
    data: {
      caseId: testCase.id,
      orderDate: new Date('2026-05-20'),
      orderType: 'INTERIM RELIEF',
      orderContent: 'Injunction granted to prevent unauthorized occupation',
      documentUrl: '/documents/court-order-001.pdf',
      orderStatus: 'ACTIVE',
    },
  });

  // Create tax records
  const taxRecord = await prisma.taxRecord.create({
    data: {
      userId: client.id,
      recordType: 'INCOME_TAX',
      taxYear: '2025',
      filingPeriod: 'FY 2025',
      ntnNumber: client.ntnNumber,
      filingStatus: 'FILED',
      filedDate: new Date('2025-11-30'),
      acknowledgementNo: 'ACK-2025-12345',
      praStatus: 'ACTIVE',
      epadsStatus: 'REGISTERED',
    },
  });

  console.log('✅ Tax record created:', taxRecord);

  // Create invoice
  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-001',
      userId: client.id,
      description: 'Legal Services - Property Dispute Case',
      amountBilled: 125000,
      balanceDue: 75000,
      amountPaid: 50000,
      invoiceDate: new Date('2026-01-10'),
      dueDate: new Date('2026-02-10'),
      paidDate: new Date('2026-01-15'),
      invoiceStatus: 'PARTIALLY_PAID',
      retainerFee: 100000,
      perHearingFee: 15000,
      governmentFilingFees: 10000,
      notes: 'Retainer fee for ongoing legal representation',
    },
  });

  console.log('✅ Invoice created:', invoice);

  // Create document
  const document = await prisma.document.create({
    data: {
      userId: client.id,
      documentName: 'Property Deed - Main Office',
      fileUrl: '/documents/property-deed-2026.pdf',
      fileType: 'application/pdf',
      fileSize: 2048000,
      documentType: 'PROPERTY_DEED',
      description: 'Original property deed for commercial property in Karachi',
      isConfidential: true,
      metadata: JSON.stringify({
        propertyLocation: 'Karachi, Sindh',
        propertyValue: 5000000,
        registeredDate: '2020-01-15',
      }),
    },
  });

  console.log('✅ Document created:', document);

  // Link document to case
  await prisma.caseDocument.create({
    data: {
      caseId: testCase.id,
      documentId: document.id,
    },
  });

  // Create appointments
  await prisma.appointment.create({
    data: {
      userId: client.id,
      appointmentType: 'CONSULTATION',
      description: 'Case strategy discussion and hearing preparation',
      scheduledFor: new Date('2026-06-10'),
      duration: 60,
      location: 'Office 402, Main Building, Karachi',
      appointmentStatus: 'CONFIRMED',
      reminder: true,
    },
  });

  // Create messages
  const message = await prisma.message.create({
    data: {
      senderId: lawyer.id,
      recipientId: client.id,
      messageType: 'LEGAL_MATTER',
      subject: 'Case Update - Property Dispute',
      content:
        'Dear Mr. Hassan, I wanted to update you on the latest developments in your property dispute case. The court has scheduled the next hearing for June 15, 2026. Please prepare all relevant documents...',
      isRead: true,
      readAt: new Date(),
    },
  });

  console.log('✅ Message created:', message);

  // Create notifications
  await prisma.notification.create({
    data: {
      userId: client.id,
      notificationType: 'HEARING_REMINDER',
      title: 'Upcoming Hearing Reminder',
      message: 'Your next hearing is scheduled for June 15, 2026 at 10:00 AM in Court Room 4-A',
      relatedEntityId: hearing1.id,
      relatedEntityType: 'HEARING',
      priority: 'HIGH',
      notificationChannels: JSON.stringify(['PORTAL', 'EMAIL']),
    },
  });

  await prisma.notification.create({
    data: {
      userId: client.id,
      notificationType: 'INVOICE_GENERATED',
      title: 'New Invoice Generated',
      message: 'Invoice INV-2026-001 has been generated for Rs. 125,000',
      relatedEntityId: invoice.id,
      relatedEntityType: 'INVOICE',
      priority: 'NORMAL',
      notificationChannels: JSON.stringify(['PORTAL', 'EMAIL']),
    },
  });

  console.log('✅ Notifications created');

  console.log('\n✅ Seed data created successfully!');
  console.log('\n📝 Test Credentials:');
  console.log('   Client: client@example.com / password123');
  console.log('   Lawyer: lawyer@example.com / password123');
  console.log('   Accountant: accountant@example.com / password123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
