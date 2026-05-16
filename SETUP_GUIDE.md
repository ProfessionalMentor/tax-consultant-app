# Tax Consultant Portal - Complete Setup Guide

## Project Overview

This is a comprehensive tax consultant client portal built with Next.js, featuring:

### ✅ Implemented Features

#### 1. **Main Dashboard (Overview)**
- Quick summary of active cases, upcoming hearings, tax/SECP compliance status
- Real-time data integration from database
- Quick links to all major sections
- Pending alerts and billing summary

#### 2. **Case & Matter Management**
- Complete case tracking system
- Real-time case status updates (PENDING, ACTIVE, HEARING, WON, LOST, CLOSED)
- Hearing calendar with automatic updates
- Court orders and certified copies management
- Case history and timeline

#### 3. **Tax & Corporate Compliance Hub**
- NTN, STRN, and ATL status tracking
- FBR and Sales Tax return filing history
- SECP corporate filing records
- PRA and ePADS compliance status
- Audit and legal notice center
- Filing deadline tracking

#### 4. **Document Vault (Secure)**
- Client-side document upload (CNIC, bank statements, property docs, etc.)
- Firm-side document download (legal opinions, petitions, certificates)
- Document versioning and history
- Confidential document tagging
- Secure file encryption

#### 5. **Billing, Invoices & Payments**
- Detailed fee breakdown (retainer, per-hearing, government fees)
- Complete invoice history with payment status
- Online payment integration support (Bank Transfer, Raast, Cards)
- Automatic invoice generation
- Payment tracking and receipts

#### 6. **Communication & Support Center**
- Direct messaging between client and assigned lawyer/accountant
- Appointment scheduler for consultations
- Support ticket system
- Case-specific communication threads

#### 7. **Automated Notification System**
- Real-time portal notifications
- Email notification support (integration ready)
- SMS notification framework (integration ready)
- Notification priority levels (URGENT, HIGH, MEDIUM, NORMAL)
- Auto-read tracking

#### 8. **E-pads & PRA Integration**
- E-pads registration and status tracking
- PRA compliance records
- Filing status monitoring
- Document management for E-pads/PRA submissions

---

## Prerequisites

Before you begin, ensure you have:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)
- Git

---

## Installation & Setup

### Step 1: Clone and Install Dependencies

```bash
cd tax-consultant-app
npm install
```

### Step 2: Configure MongoDB

#### Option A: Using MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (Free tier)
4. In "Database Access", create a database user
5. In "Network Access", add your IP address (or 0.0.0.0/0 for development)
6. Click "Connect" and copy the connection string

#### Option B: Using Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Connection string: `mongodb://localhost:27017/tax-consultant-app`

### Step 3: Setup Environment Variables

1. Update the `.env.local` file with your configuration:

```bash
# MongoDB Connection
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/tax-consultant-app?retryWrites=true&w=majority"
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/tax-consultant-app?retryWrites=true&w=majority"

# NextAuth Configuration
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI for Chatbot
OPENAI_API_KEY="sk-your-api-key-here"

# Optional: Payment Gateway
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Optional: Email Service
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

### Step 4: Run Prisma Migration

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) View database
npx prisma studio
```

### Step 5: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## Database Schema

### Core Models

#### **User**
- Authentication and role management (SUPER_ADMIN, ADMIN, LAWYER, ACCOUNTANT, CLIENT)
- Tax information (NTN, STRN, CNIC)
- Business details
- Profile metadata

#### **Case**
- Case management with full lifecycle tracking
- Client and lawyer assignments
- Court information and hearing dates
- Financial tracking

#### **Hearing**
- Hearing schedule and status
- Court details and judge assignment
- Hearing outcomes and next steps

#### **TaxRecord**
- Income tax, sales tax, SECP filing records
- PRA and E-PADS status tracking
- Compliance status and deadlines
- Audit/notice management

#### **Document**
- Secure file storage with metadata
- Document classification and confidentiality tagging
- Multiple upload support

#### **Invoice**
- Comprehensive billing system
- Fee breakdown (retainer, per-hearing, govt fees)
- Payment tracking

#### **Message**
- Client-lawyer communication
- Message type categorization
- Read status tracking

#### **Notification**
- Multi-channel notifications (Portal, Email, SMS)
- Priority levels
- Entity linking for context

---

## API Endpoints

### Cases
- `GET /api/cases` - List all cases
- `POST /api/cases` - Create new case
- `GET /api/cases/[id]` - Get case details
- `PUT /api/cases/[id]` - Update case
- `DELETE /api/cases/[id]` - Delete case

### Tax Records
- `GET /api/tax-records` - List tax records
- `POST /api/tax-records` - Create tax record

### Invoices
- `GET /api/invoices` - List invoices
- `POST /api/invoices` - Create invoice

### Documents
- `GET /api/documents` - List documents
- `POST /api/documents` - Upload document
- `DELETE /api/documents/[id]` - Delete document

### Messages
- `GET /api/messages` - List messages
- `POST /api/messages` - Send message

### Notifications
- `GET /api/notifications` - List notifications
- `POST /api/notifications` - Create notification
- `PATCH /api/notifications/[id]` - Update notification
- `DELETE /api/notifications/[id]` - Delete notification

### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Create appointment

---

## Features Not Yet Implemented (Ready for Integration)

1. **Payment Gateway Integration**
   - Stripe setup for international payments
   - Raast integration for Pakistan
   - Direct bank transfer tracking

2. **Email & SMS Notifications**
   - SendGrid or AWS SES for emails
   - Twilio or local SMS gateway for SMS

3. **Document Upload Service**
   - UploadThing or AWS S3 for file storage
   - Virus scanning and compression

4. **Video Consultation**
   - Daily.co or Jitsi integration
   - Screen sharing support

5. **Audit Logging**
   - Activity tracking
   - Document versioning

6. **Admin Dashboard**
   - Client management
   - Invoice generation
   - Report generation

---

## User Roles & Access Control

### **Client**
- View own cases, hearings, documents
- Upload documents
- View invoices and billing
- Send messages to assigned lawyer
- Receive notifications

### **Lawyer/Accountant**
- Manage assigned cases
- Create hearings and court orders
- Generate invoices
- Communicate with clients
- View document vault

### **Admin**
- Full system access
- User management
- Generate reports
- System configuration
- Audit logs

---

## Testing

### Create Test User

```bash
# Access Prisma Studio
npx prisma studio

# Create test user manually in MongoDB:
db.User.insertOne({
  name: "Test Client",
  email: "client@example.com",
  password: "$2a$10$...", // bcrypt hashed password
  role: "CLIENT",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Test Login
- Email: `client@example.com`
- Password: `password123`

---

## Deployment

### Vercel (Recommended for Next.js)

```bash
npm install -g vercel
vercel login
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package* .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

## Troubleshooting

### Issue: DATABASE_URL not found
**Solution:** Ensure `.env.local` exists in project root with DATABASE_URL set

### Issue: Prisma migration fails
**Solution:** 
```bash
npx prisma db push --skip-generate
```

### Issue: Authentication not working
**Solution:** Check NEXTAUTH_SECRET is set and session strategy is "jwt"

### Issue: API endpoints returning 401
**Solution:** Ensure session is valid and user has proper role permissions

---

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local` to git
   - Use `.env.example` as template

2. **Authentication**
   - Passwords are bcrypt hashed
   - JWT tokens with 30-day expiry
   - Role-based access control

3. **Documents**
   - Marked as confidential when needed
   - Access restricted to client and assigned lawyer
   - File type validation on upload

4. **Data Protection**
   - All sensitive data encrypted in transit (HTTPS)
   - Database connection uses TLS
   - CNIC and financial data marked PII

---

## Support & Maintenance

For issues or questions:
1. Check database connection: `npx prisma db execute --stdin < SELECT 1`
2. Verify API endpoint: `curl http://localhost:3000/api/cases`
3. Check browser console for client-side errors
4. Review server logs: `npm run dev` shows detailed logs

---

## License

Proprietary - Tax Consultant Portal
