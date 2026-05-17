# 🇵🇰 Digital Law Chamber - Premium Law & Tax Management Portal

A professional, high-performance, single-page command portal designed for lead counsel, junior associates, corporate clients, and chamber administrators. Built on modern Next.js architecture, featuring dynamic **FBR Tax Filing** systems, **SECP Corporate Compliance** trackers, ** لاہور High Court Litigation diaries**, and **secure real-time peer-to-peer messaging**.

---

## 🚀 Premium Features

### 1. Unified Advocate Command Desk (`/lawyer`)
An executive command dashboard utilizing a glassmorphic dark-mode interface tailored to legal counsel with 6 major interactive modules:
*   **Overview Desk**: Instant visual tracking of active court filings, pending hearings, unread messages, and a calendar diary preview.
*   **Active Litigations**: Filterable Lahore & Karachi High Court filings with detail side-drawers containing client FBR credentials (NTN, STRN, phone, email).
*   **Litigation Court Diary**: Interactive timeline of upcoming court appearances. Integrates a scheduling assistant that registers courtroom, assigned judges, and cause list agendas.
*   **Chamber Compliance & Vault**: Dynamic triple-compliance client folder portal (read below!).
*   **Secure Messenger**: Chronological chat messaging system with active clients, instantly updating the database with in-app unread alerts.
*   **Consultations Hub**: Priority consultation queue showing requested durations, contact cards, and active links.

### 2. Fully Realistic FBR & SECP Compliance Vault
A comprehensive tracking system built directly into the Lawyer's vault that eliminates static dummy listings in favor of live MongoDB queries:
*   **Court Pleadings Portal**: Secure litigation files (Wakalatnama, property deeds, cnic copies, certified court orders) with dynamic uploads linked directly to active case folder MongoDB records.
*   **FBR Tax Compliance Portal**: 
    *   Tracks client NTN details, Sales Tax (STRN) status, PRA active status, and E-PADS registration status.
    *   Filing status tracking (e.g. Income Tax Return, Sales Tax Return) with inline actions allowing lawyers to transition returns from `PENDING` to `FILED` by logging real FBR Acknowledgement numbers.
    *   FBR Audit Notices strip displaying active wealth statement audits, enabling direct defense document responses.
*   **SECP Corporate Portal**: Track corporate annual filings (Form A, Form 29, Incorporation Certificates, Articles of Association) for Pvt Ltd entities with active registry forms logging.

### 3. Role-Based Access Control (RBAC) Security
*   Dynamic middleware checks session credentials, route protections, and database matching to keep client vaults encrypted.
*   Redirect routes direct Lawyers to `/lawyer`, Admins to `/admin`, Accountants to `/accountant`, and Clients to `/client/dashboard`.
*   Standardized public navigation hides marketing headers/footers once inside secure workspace panels.

---

## 🛠️ Technology Stack
*   **Framework**: Next.js (App Router, Turbopack, Secure Server Actions)
*   **Database ORM**: Prisma (relational schema, automatic join-tables, MongoDB Atlas adapter)
*   **Styling**: Custom CSS and utility tokens optimized for sleek dark modes and responsive glassmorphism.
*   **State Management**: React Reactivity & Eager Load DB API integrations.

---

## 🔑 Realistic Chamber Credentials
To achieve authentic handoff, all emails match premium chamber domains and utilize the password simplicity rule requested by the client (password matches username before `@` symbol):

| Account Identity | Assigned Role | Email Address | Password |
| :--- | :--- | :--- | :--- |
| **Advocate Ahmad Raza** | Lead Counsel | `ahmad.raza@digitallawchamber.pk` | `ahmad.raza` |
| **Advocate Khalil ur Rehman Butt** | Partner Counsel | `khalil.butt@digitallawchamber.pk` | `khalil.butt` |
| **Client Ahmed Hassan** | Corporate Client | `client.hassan@digitallawchamber.pk` | `client.hassan` |
| **Chamber Admin** | System Admin | `admin@digitallawchamber.pk` | `admin` |
| **Accountant Muhammad Ali** | Accountant | `ali.accountant@digitallawchamber.pk` | `ali.accountant` |

---

## ⚙️ Installation & Running Locally

Follow these commands to deploy the application for a client or developer handoff:

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory and fill in your MongoDB Atlas connection parameters and authentication keys:
```env
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/lawchamber?retryWrites=true&w=majority"
AUTH_SECRET="your-32-character-auth-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Synchronize Database Schema
Push the Prisma schemas directly to your MongoDB Atlas cluster:
```bash
npx prisma db push
```

### 4. Seed Chamber Accounts
Run the seed script to clear out dummy records and inject high-court litigations, FBR status registries, and verified client profiles:
```bash
npm run prisma:seed
```

### 5. Launch the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to experience the command portal!

### 6. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure Highlights
*   `src/app/lawyer/page.js`: Main Single Page Command Portal (tabs, dynamic forms, messenger state).
*   `src/app/api/tax-records/`: REST endpoints for querying FBR/SECP filings dynamically with lawyers/admins dual-role query filters.
*   `src/app/api/tax-records/[id]/`: PUT routes for marking tax filings as completed and uploading audit response defenses.
*   `src/app/api/documents/`: Secure uploads matching MongoDB join relations.
*   `prisma/schema.prisma`: Complete client, case, document, taxRecord, hearing, and appointment models.
