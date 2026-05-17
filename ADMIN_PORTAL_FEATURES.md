# Admin Portal - Features List

## 1. Command Center (Dashboard)
- High-level overview of firm revenue, active cases, and pending tasks.
- System Audit Logs tracking which lawyer/accountant accessed or modified files.

## 2. Tax & SECP Compliance Hub
*Directly addresses the firm's core business requirements:*
- **FBR Tracking:** Real-time visibility into client NTN, STRN, and ATL (Active Taxpayer) status.
- **Provincial/Specialized Tax:** Dedicated columns for PRA (Punjab Revenue Authority) and E-PADS registration status.
- **Notice Management:** Visual indicators for unanswered FBR/SECP notices.

## 3. Case & Matter Management
- **Litigation Tracking:** Filter cases by CIVIL, CRIMINAL, CORPORATE, or TAXATION.
- **Hearing Calendar:** Quick-glance list of upcoming court dates, assigned judges, and courtrooms.
- **Assignment System:** View which advocate is assigned to which matter.

## 4. Client Directory
- **Client Profiles:** Manage individual and corporate clients in one centralized table.
- **Contact Overview:** Quick access to client emails, phone numbers, and active/pending account statuses.

## 5. Document Vault
- **Secure Storage:** Categorize documents by Legal Drafts, Client Uploads, and Court Orders.
- **File Management:** Download and view capabilities for CNICs, tax returns, property deeds, and injunction orders.

## 6. Billing & Payments
- **Revenue Tracking:** High-level metrics for monthly revenue, pending dues, and overdue invoices.
- **Invoice Generation:** Track retainer fees, per-hearing fees, and SECP filing charges with clear PAID/PENDING/OVERDUE statuses.

## 7. Secure Communications (Messages)
- **Client Chat Interface:** A dedicated inbox for admins to view client inquiries categorized by case and respond directly.
- **Audit Trail:** All conversations are logged within the system rather than external apps for professional compliance.

## 8. System Alerts (Notifications)
- **Broadcast System:** Form-based dispatch system to send urgent hearing or tax deadline alerts to specific clients or all active clients.
- **Multi-Channel Dispatch:** Options to route notifications via the Client Portal, Email, or SMS/WhatsApp.

## 9. Firm Management Layout
- Sticky sidebar tailored specifically for `SUPER_ADMIN` and `ADMIN` roles.
- Distinct color coding (Rose/Red accents) to differentiate the Admin Portal from the Client Portal (Blue accents).

## Planned Features (Backend Integration)
Once the MongoDB database is fully connected, the following features will become active:
- Uploading CPRs (Computerized Payment Receipts) directly to client profiles.
- Automated email/WhatsApp notifications sent to clients when hearing dates change.
- Generation of tax reports using real database metrics.
