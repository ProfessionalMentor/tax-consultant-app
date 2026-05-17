# Admin Portal - Setup & Testing Guide

## Prerequisites
Ensure the application dependencies are installed:
```bash
npm install
```

## Running the Portal
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser to `http://localhost:3000/admin/compliance`

## Authentication Configuration
The Admin portal is protected by `src/middleware.js`. To view the portal UI without a database connection, the middleware must be bypassed.

**To Test with Real Authentication:**
1. Setup a MongoDB database and add the connection string to `.env`:
   ```env
   DATABASE_URL="mongodb+srv://..."
   AUTH_SECRET="your_secret_hash"
   ```
2. Run the Prisma seed script to generate test users:
   ```bash
   npx prisma db seed
   ```
3. Ensure the `SUPER_ADMIN` or `ADMIN` role is assigned to your test user in the database.

## Directory Structure
- `/src/app/admin/layout.js`: The root wrapper for all admin pages.
- `/src/components/admin/AdminSidebar.js`: The navigation component.
- `/src/app/admin/dashboard/page.js`: The Command Center overview.
- `/src/app/admin/compliance/page.js`: The Tax & SECP hub.
- `/src/app/admin/cases/page.js`: The Case tracking system.
- `/src/app/admin/clients/page.js`: The Client Directory.
- `/src/app/admin/documents/page.js`: The Document Vault.
- `/src/app/admin/billing/page.js`: The Billing & Payments system.
- `/src/app/admin/messages/page.js`: The Secure Communications hub.
- `/src/app/admin/notifications/page.js`: The System Alerts dispatch center.
