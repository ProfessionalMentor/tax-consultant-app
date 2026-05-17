import { prisma } from '../src/lib/prisma.js';
import bcrypt from 'bcryptjs';

async function main() {
  // Generate dynamic hashes where each account's password matches its exact email username
  const clientHash = await bcrypt.hash('client.hassan', 10);
  const ahmadHash = await bcrypt.hash('ahmad.raza', 10);
  const khalilHash = await bcrypt.hash('khalil.butt', 10);
  const accountantHash = await bcrypt.hash('ali.accountant', 10);
  const adminHash = await bcrypt.hash('admin', 10);

  // Clear the old dummy lawyer accounts if they exist to release unique NTN and CNIC constraints
  await prisma.user.deleteMany({
    where: {
      email: {
        in: [
          'lawyer@example.com',
          'client@example.com',
          'accountant@example.com',
          'admin@example.com',
          'ahmad@example.com',
          'khalil@example.com'
        ]
      }
    }
  });

  // 1. Client user: Ahmed Hassan
  const client = await prisma.user.upsert({
    where: { email: 'client.hassan@digitallawchamber.pk' },
    update: {
      name: 'Ahmed Hassan',
      password: clientHash,
      role: 'CLIENT',
      phoneNumber: '+92-300-1234567',
      ntnNumber: '1234567-8',
      strn: '1234567890123',
      cnic: '12345-6789012-3',
      businessName: 'Hassan Trading Co.',
      businessType: 'Import/Export',
      taxFilingStatus: 'ACTIVE',
    },
    create: {
      name: 'Ahmed Hassan',
      email: 'client.hassan@digitallawchamber.pk',
      password: clientHash,
      role: 'CLIENT',
      phoneNumber: '+92-300-1234567',
      ntnNumber: '1234567-8',
      strn: '1234567890123',
      cnic: '12345-6789012-3',
      businessName: 'Hassan Trading Co.',
      businessType: 'Import/Export',
      taxFilingStatus: 'ACTIVE',
    },
  });

  // 2. Lawyer 1: Advocate Ahmad Raza (Senior Lead)
  const lawyer1 = await prisma.user.upsert({
    where: { email: 'ahmad.raza@digitallawchamber.pk' },
    update: {
      name: 'Advocate Ahmad Raza',
      password: ahmadHash,
      role: 'LAWYER',
      phoneNumber: '+92-300-4882260',
      specialization: 'FBR Tax Audits, SECP, Land Registries',
      licenseNumber: 'LHC-9876',
      ntnNumber: '8765432-1',
      strn: '9876543210987',
      cnic: '54321-7654321-0',
    },
    create: {
      name: 'Advocate Ahmad Raza',
      email: 'ahmad.raza@digitallawchamber.pk',
      password: ahmadHash,
      role: 'LAWYER',
      phoneNumber: '+92-300-4882260',
      specialization: 'FBR Tax Audits, SECP, Land Registries',
      licenseNumber: 'LHC-9876',
      ntnNumber: '8765432-1',
      strn: '9876543210987',
      cnic: '54321-7654321-0',
    },
  });

  // 3. Lawyer 2: Advocate Khalil ur Rehman Butt (Partner)
  const lawyer2 = await prisma.user.upsert({
    where: { email: 'khalil.butt@digitallawchamber.pk' },
    update: {
      name: 'Advocate Khalil ur Rehman Butt',
      password: khalilHash,
      role: 'LAWYER',
      phoneNumber: '+92-300-7654321',
      specialization: 'Criminal Defense & Corporate Compliance',
      licenseNumber: 'LHC-5432',
      ntnNumber: '7654321-9',
      strn: '7654321098765',
      cnic: '35202-1234567-9',
    },
    create: {
      name: 'Advocate Khalil ur Rehman Butt',
      email: 'khalil.butt@digitallawchamber.pk',
      password: khalilHash,
      role: 'LAWYER',
      phoneNumber: '+92-300-7654321',
      specialization: 'Criminal Defense & Corporate Compliance',
      licenseNumber: 'LHC-5432',
      ntnNumber: '7654321-9',
      strn: '7654321098765',
      cnic: '35202-1234567-9',
    },
  });

  // 4. Accountant user: Muhammad Ali
  const accountant = await prisma.user.upsert({
    where: { email: 'ali.accountant@digitallawchamber.pk' },
    update: {
      name: 'Muhammad Ali (Accountant)',
      password: accountantHash,
      role: 'ACCOUNTANT',
      phoneNumber: '+92-300-5555555',
      specialization: 'Tax & Corporate Accounting',
      licenseNumber: 'CA-5678',
      ntnNumber: '5555555-5',
      strn: '5555555555555',
      cnic: '55555-5555555-5',
    },
    create: {
      name: 'Muhammad Ali (Accountant)',
      email: 'ali.accountant@digitallawchamber.pk',
      password: accountantHash,
      role: 'ACCOUNTANT',
      phoneNumber: '+92-300-5555555',
      specialization: 'Tax & Corporate Accounting',
      licenseNumber: 'CA-5678',
      ntnNumber: '5555555-5',
      strn: '5555555555555',
      cnic: '55555-5555555-5',
    },
  });

  // 5. Admin user: Chamber Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@digitallawchamber.pk' },
    update: {
      name: 'Chamber Admin',
      password: adminHash,
      role: 'ADMIN',
      phoneNumber: '+92-300-1111111',
      cnic: '11111-1111111-1',
    },
    create: {
      name: 'Chamber Admin',
      email: 'admin@digitallawchamber.pk',
      password: adminHash,
      role: 'ADMIN',
      phoneNumber: '+92-300-1111111',
      cnic: '11111-1111111-1',
    },
  });

  console.log('✅ Real Chamber Users Seeded successfully:', { client, lawyer1, lawyer2, accountant, admin });

  // Clear existing mock data to ensure repeatable seeds
  await prisma.caseDocument.deleteMany({});
  await prisma.document.deleteMany({});
  await prisma.hearing.deleteMany({});
  await prisma.courtOrder.deleteMany({});
  await prisma.taxRecord.deleteMany({});
  await prisma.invoice.deleteMany({});
  await prisma.appointment.deleteMany({});
  await prisma.message.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.case.deleteMany({});

  // 6. Create Case 1: Assigned to Advocate Ahmad Raza
  const testCase1 = await prisma.case.create({
    data: {
      caseNumber: 'CASE-2026-001',
      title: 'Commercial Property Dispute - Karachi High Court',
      description: 'Commercial property dispute regarding lease agreement breach and wealth asset verification',
      type: 'CIVIL',
      status: 'ACTIVE',
      priority: 'HIGH',
      clientId: client.id,
      lawyerId: lawyer1.id,
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

  // 7. Create Case 2: Assigned to Advocate Khalil ur Rehman Butt
  const testCase2 = await prisma.case.create({
    data: {
      caseNumber: 'CASE-2026-002',
      title: 'Pre-Arrest Bail Petition - Lahore High Court',
      description: 'Securing protective and pre-arrest bail in a corporate tax audit investigation',
      type: 'CRIMINAL',
      status: 'HEARING',
      priority: 'HIGH',
      clientId: client.id,
      lawyerId: lawyer2.id,
      courtName: 'Lahore High Court',
      courtLocation: 'Lahore, Punjab',
      judicialOfficer: 'Justice Tariq Saleem Sheikh',
      caseRegistrationNo: 'LHC/B-402/2026',
      filingDate: new Date('2026-04-10'),
      nextHearingDate: new Date('2026-07-20'),
      retainerFee: 150000,
      courtCharges: 30000,
    },
  });

  console.log('✅ Real Cases Seeded successfully:', { testCase1, testCase2 });

  // 8. Create Hearings
  const hearing1 = await prisma.hearing.create({
    data: {
      caseId: testCase1.id,
      hearingDate: new Date('2026-06-15'),
      courtRoom: 'Court Room 4-A',
      judgeAssigned: 'Justice Muhammad Amin',
      hearingStatus: 'SCHEDULED',
      agenda: 'Arguments on preliminary lease objections',
      assignedLawyerId: lawyer1.id,
    },
  });

  const hearing2 = await prisma.hearing.create({
    data: {
      caseId: testCase2.id,
      hearingDate: new Date('2026-07-20'),
      courtRoom: 'Court Room 3-B',
      judgeAssigned: 'Justice Tariq Saleem Sheikh',
      hearingStatus: 'SCHEDULED',
      agenda: 'Evidence presentation and interim relief arguments',
      assignedLawyerId: lawyer2.id,
    },
  });

  console.log('✅ Real Hearings Seeded:', { hearing1, hearing2 });

  // 9. Create Court Order
  await prisma.courtOrder.create({
    data: {
      caseId: testCase1.id,
      orderDate: new Date('2026-05-20'),
      orderType: 'INTERIM RELIEF',
      orderContent: 'Injunction granted to prevent unauthorized occupation of lease premise',
      documentUrl: '/documents/court-order-001.pdf',
      orderStatus: 'ACTIVE',
    },
  });

  // 10. Create Tax Record
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

  console.log('✅ Real Tax record Seeded:', taxRecord);

  // 11. Create Invoice
  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-001',
      userId: client.id,
      description: 'Legal Services - Property Dispute & Bail Petitions',
      amountBilled: 250000,
      balanceDue: 150000,
      amountPaid: 100000,
      invoiceDate: new Date('2026-01-10'),
      dueDate: new Date('2026-02-10'),
      paidDate: new Date('2026-01-15'),
      invoiceStatus: 'PARTIALLY_PAID',
      retainerFee: 200000,
      perHearingFee: 30000,
      governmentFilingFees: 20000,
      notes: 'Initial retainer fees split between corporate and bail representation',
    },
  });

  console.log('✅ Real Invoice Seeded:', invoice);

  // 12. Create Document
  const document = await prisma.document.create({
    data: {
      userId: client.id,
      documentName: 'Certified Property Deed - Lahore Office',
      fileUrl: '/documents/property-deed-2026.pdf',
      fileType: 'application/pdf',
      fileSize: 2048000,
      documentType: 'PROPERTY_DEED',
      description: 'Original registered lease and registry documents',
      isConfidential: true,
      metadata: JSON.stringify({
        propertyLocation: 'Lahore, Punjab',
        propertyValue: 8000000,
        registeredDate: '2022-03-22',
      }),
    },
  });

  console.log('✅ Real Document Seeded:', document);

  // Link document to case
  await prisma.caseDocument.create({
    data: {
      caseId: testCase1.id,
      documentId: document.id,
    },
  });

  // 13. Create Appointments
  await prisma.appointment.create({
    data: {
      userId: client.id,
      appointmentType: 'CONSULTATION',
      description: 'FBR Audit wealth reconciliation discussion with Advocate Ahmad Raza',
      scheduledFor: new Date('2026-06-10T10:00:00.000Z'),
      duration: 45,
      location: 'Office 402, Main Court Chambers, Lahore',
      appointmentStatus: 'CONFIRMED',
      reminder: true,
    },
  });

  await prisma.appointment.create({
    data: {
      userId: client.id,
      appointmentType: 'COURT_APPEARANCE',
      description: 'Pre-Arrest bail preparations review with Advocate Khalil ur Rehman Butt',
      scheduledFor: new Date('2026-06-12T14:30:00.000Z'),
      duration: 60,
      location: 'Lahore High Court Advocates Lounge',
      appointmentStatus: 'CONFIRMED',
      reminder: true,
    },
  });

  // 14. Create Messages from both Advocates
  const message1 = await prisma.message.create({
    data: {
      senderId: lawyer1.id,
      recipientId: client.id,
      messageType: 'LEGAL_MATTER',
      subject: 'Wealth Reconciliation Checklist',
      content:
        'Dear Ahmed, I have prepared the preliminary FBR defense draft for your wealth statement audit. Please upload the certified bank statements into the Vault as soon as possible.',
      isRead: true,
      readAt: new Date(),
    },
  });

  const message2 = await prisma.message.create({
    data: {
      senderId: lawyer2.id,
      recipientId: client.id,
      messageType: 'LEGAL_MATTER',
      subject: 'High Court Bail Preparation',
      content:
        'Ahmed, I have drafted the bail petition for tomorrow. Meet me in the Advocates Lounge at 1:30 PM sharp so we can go through your signature details and original CNIC copy.',
      isRead: false,
    },
  });

  console.log('✅ Real Secure communications Seeded:', { message1, message2 });

  // 15. Create Notifications
  await prisma.notification.create({
    data: {
      userId: client.id,
      notificationType: 'HEARING_REMINDER',
      title: 'Upcoming Court Appearance',
      message: 'Your hearing on the Karachi lease dispute is on June 15, 2026 at 9:00 AM with Advocate Ahmad Raza.',
      relatedEntityId: hearing1.id,
      relatedEntityType: 'HEARING',
      priority: 'HIGH',
      notificationChannels: JSON.stringify(['PORTAL', 'EMAIL']),
    },
  });

  await prisma.notification.create({
    data: {
      userId: client.id,
      notificationType: 'HEARING_REMINDER',
      title: 'Bail Arguments Scheduled',
      message: 'Your bail arguments hearing at Lahore High Court is on July 20, 2026 with Advocate Khalil ur Rehman Butt.',
      relatedEntityId: hearing2.id,
      relatedEntityType: 'HEARING',
      priority: 'HIGH',
      notificationChannels: JSON.stringify(['PORTAL', 'EMAIL']),
    },
  });

  console.log('✅ Real Notifications Seeded successfully');

  console.log('\n✅ Real Seed data loaded successfully!');
  console.log('\n📝 Dynamic Chamber Credentials (Password is same as Username):');
  console.log('   Client: client.hassan@digitallawchamber.pk / client.hassan');
  console.log('   Advocate Ahmad Raza: ahmad.raza@digitallawchamber.pk / ahmad.raza');
  console.log('   Advocate Khalil ur Rehman Butt: khalil.butt@digitallawchamber.pk / khalil.butt');
  console.log('   Accountant Muhammad Ali: ali.accountant@digitallawchamber.pk / ali.accountant');
  console.log('   Admin: admin@digitallawchamber.pk / admin');
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
