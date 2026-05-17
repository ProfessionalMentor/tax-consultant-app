"use client";

import { useState } from 'react';
import { Download, FileText, FileSearch, HelpCircle, ShieldCheck, Award, AlertCircle, Sparkles } from 'lucide-react';
import { jsPDF } from 'jspdf';

// Structured content for each PDF template matching FBR/SECP branding
const pdfContents = {
  "Individual Salary Filer Checklist": {
    title: "Individual Salary Filer Checklist",
    authority: "Federal Board of Revenue (FBR), Government of Pakistan",
    branding: "FBR Official Taxpayer Registry (ATL)",
    steps: [
      "1. Valid CNIC / NICOP Copy",
      "2. Annual Salary Certificate from Employer (Form 16 / Tax Statement)",
      "3. 12-Month Bank Account Statements (showing salary credit & balance)",
      "4. Personal Utility Bills (Electricity, Gas, PTCL showing tax deductions)",
      "5. Wealth Asset Details (Properties, Vehicles, Cash under own/spouse name)",
      "6. Annual Personal Expenses Summary (Rent, Household, Travel, Education)"
    ],
    notes: "Note: As per FBR rules, hiding assets or incorrect filing will invite direct audit scrutiny and penalties under Section 111 of Income Tax Ordinance 2001."
  },
  "Corporate Filer Checklist (AOP/Pvt Ltd)": {
    title: "Corporate Filer Checklist (AOP/Pvt Ltd)",
    authority: "Federal Board of Revenue (FBR), Government of Pakistan",
    branding: "FBR Corporate Tax Compliance Desk",
    steps: [
      "1. SECP Incorporation Certificate / AOP Registration Deed Copy",
      "2. Corporate NTN Certificate & Director CNICs",
      "3. Audited Financial Statements (Balance Sheet & Profit/Loss)",
      "4. Annual Sales Tax Returns (FBR / PRA / SRB / KPRA as applicable)",
      "5. Withholding Tax Certificates (challans & e-filing summaries)",
      "6. Business Premises Utility Bills & Rent Agreement"
    ],
    notes: "Note: Corporate filings must be uploaded through the Iris portal before the official due date to maintain the Active Taxpayer List (ATL) status."
  },
  "Wealth Proxy Mapping Form": {
    title: "Wealth Statement Proxy Mapping Form",
    authority: "Federal Board of Revenue (FBR), Government of Pakistan",
    branding: "FBR Wealth & Asset Declarations (Section 116)",
    steps: [
      "1. Complete details of local/immovable properties (purchased/inherited)",
      "2. Foreign assets and offshore bank account details (if any)",
      "3. Vehicles registered under NTN with registration booklet copy",
      "4. Details of gold, jewelry, cash in hand, and prize bonds",
      "5. Details of liabilities, loans, mortgages, or advances",
      "6. Reconciliation of personal expenditures versus declared income sources"
    ],
    notes: "Note: Accurate reconciliation of wealth statement is mandatory. Any discrepancies will lead to FBR wealth asset misclassification audits."
  },
  "Memorandum of Association Template": {
    title: "Memorandum of Association Template Guide",
    authority: "Securities & Exchange Commission of Pakistan (SECP)",
    branding: "SECP Corporate Registration Guidelines",
    steps: [
      "1. Company Name & Proposed Registered Office Location",
      "2. Principal Line of Business (defining main commercial activities)",
      "3. Authorized Capital (Proposed division of shares, e.g. PKR 1,000,000)",
      "4. Subscribers' Page (Names, CNICs, addresses, and subscribed share counts)",
      "5. Standard Statutory Declaration under Companies Act 2017"
    ],
    notes: "Note: Ensure name reservation is secured on the SECP e-services portal before submitting the final Memorandum."
  },
  "Articles of Association Guide": {
    title: "Articles of Association Guide",
    authority: "Securities & Exchange Commission of Pakistan (SECP)",
    branding: "SECP Companies Act 2017 Frameworks",
    steps: [
      "1. Division of shares and transferability rules among directors",
      "2. Management structure, voting rights, and general board meetings frequency",
      "3. Procedures for appointing and removing company directors",
      "4. Auditing guidelines and maintenance of official corporate accounts",
      "5. Seal, dividends allocation, and standard winding-up procedures"
    ],
    notes: "Note: SMC-Pvt Ltd structures follow Table A of Companies Act 2017 with customized directorship variables."
  },
  "Directors' KYC Requirements": {
    title: "SECP Directors' KYC Requirements",
    authority: "Securities & Exchange Commission of Pakistan (SECP)",
    branding: "SECP AML & KYC Regulatory Frameworks",
    steps: [
      "1. Clear CNIC color copy (or passport copy for foreign directors)",
      "2. Direct contact details (Unique mobile number registered on own CNIC)",
      "3. Valid individual email address & residential physical address",
      "4. Declaration of non-conviction, non-bankruptcy, and AML compliance",
      "5. Ultimate Beneficial Owner (UBO) declaration form (Form 45)"
    ],
    notes: "Note: Incomplete KYC will delay name approval and company incorporation filings on SECP."
  },
  "Standard Non-Disclosure Agreement (NDA)": {
    title: "Standard Non-Disclosure Agreement (NDA) Template",
    authority: "Digital Law Chamber - Contract Drafting",
    branding: "Commercial Legal Template",
    steps: [
      "1. Definition of Disclosing and Receiving Parties",
      "2. Precise Scope of Confidential Information (source code, financial logs)",
      "3. Exclusion from Confidentiality (publicly known items, prior knowledge)",
      "4. Term of Obligation (typically 3 to 5 years from disclosure)",
      "5. Remedies for Breach (injunction, damages, attorney costs coverage)",
      "6. Governing Law & Jurisdiction (e.g. Lahore, Pakistan)"
    ],
    notes: "Note: This is a professional reference draft. Customize all commercial parameters to align with specific project workflows."
  },
  "Employment Contract Template": {
    title: "Employment Contract Template Guide",
    authority: "Digital Law Chamber - Labor Law Compliance",
    branding: "Employment Legal Frameworks",
    steps: [
      "1. Designation, Job Description, and Probation Period parameters",
      "2. Compensation package, monthly allowances, and annual leaves criteria",
      "3. Intellectual Property (IP) assignment and work-for-hire declarations",
      "4. Code of Conduct, non-solicitation of clients, and notice terms",
      "5. Termination for Cause regulations under Pakistan Employment Laws"
    ],
    notes: "Note: Maintain alignment with West Pakistan Industrial and Commercial Employment (Standing Orders) Ordinance 1968."
  },
  "Rent Agreement Abstract": {
    title: "Rent Agreement Abstract & Checklist",
    authority: "Digital Law Chamber - Property Laws Desk",
    branding: "Immovable Property Agreements",
    steps: [
      "1. Details of Landlord, Tenant, and full property description",
      "2. Monthly rent value, payment schedule, and security deposit details",
      "3. Term of lease (typically 11 months, renewable with mutual consent)",
      "4. Utility bills responsibility and restrictions on commercial subletting",
      "5. Annual rent increment rate (usually 10% as per Rent Restriction Act)"
    ],
    notes: "Note: Rent agreements exceeding 12 months must be registered under local registration laws to carry full legal authority."
  }
};

export default function ResourcesPage() {
  const [downloadingItem, setDownloadingItem] = useState(null);

  const handleDownloadPDF = (itemName) => {
    const content = pdfContents[itemName];
    if (!content) return;

    setDownloadingItem(itemName);

    setTimeout(() => {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // Branding color tokens
      const darkGreen = [13, 31, 24]; // FBR Emerald Green
      const gold = [184, 144, 71]; // Gold brand color (#b89047)
      const slateGray = [148, 163, 184]; // Muted text

      // Draw top header banner
      doc.setFillColor(...darkGreen);
      doc.rect(0, 0, 210, 30, 'F');

      // Title & slogan
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("DIGITAL LAW CHAMBER", 15, 14);

      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...gold);
      doc.text("EXPERT LEGAL ADVOCACY & FBR/SECP TAX COMPLIANCE", 15, 20);

      // Official Badge
      doc.setFillColor(...gold);
      doc.rect(145, 10, 50, 10, 'F');
      doc.setTextColor(10, 15, 28);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text("OFFICIAL DRAFT", 153, 16.5);

      // Body Document Information
      doc.setTextColor(15, 23, 42); // Slate-900
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(content.title, 15, 45);

      doc.setFontSize(10);
      doc.setTextColor(...gold);
      doc.text(content.authority, 15, 51);

      doc.setDrawColor(226, 232, 240);
      doc.line(15, 55, 195, 55);

      // Subheader
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text("Key Requirements & Guidelines Checklist:", 15, 63);

      // Render Checkbox checklist items
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85); // slate-700
      
      let y = 72;
      content.steps.forEach((step) => {
        // Draw checkbox
        doc.setDrawColor(...gold);
        doc.rect(15, y - 3.5, 4, 4);
        
        // Render step text
        doc.text(step, 23, y);
        y += 12;
      });

      // Disclaimer Box
      doc.setFillColor(248, 250, 252);
      doc.rect(15, 185, 180, 25, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.rect(15, 185, 180, 25, 'D');

      doc.setTextColor(71, 85, 105);
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "italic");
      const splitNotes = doc.splitTextToSize(content.notes, 172);
      doc.text(splitNotes, 18, 192);

      // Chamber Verification Stamp Text
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text("Chamber Verification: Ahmad Raza (Advocate High Court)", 15, 225);
      doc.text("Corporate Filing Desk: Khalil ur Rehman Butt", 15, 230);

      // Bottom footer line
      doc.setDrawColor(226, 232, 240);
      doc.line(15, 270, 195, 270);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...slateGray);
      doc.text("Document Authority: " + content.branding, 15, 276);
      doc.text("Page 1 of 1 | Verified Secure Download", 145, 276);

      // Trigger download
      const filename = content.title.toLowerCase().replace(/[^a-z0-9]/g, "_") + ".pdf";
      doc.save(filename);

      setDownloadingItem(null);
    }, 600);
  };

  const categories = [
    { 
      title: "Tax Return Checklists", 
      icon: <FileText className="w-6 h-6 text-gold" />, 
      items: ["Individual Salary Filer Checklist", "Corporate Filer Checklist (AOP/Pvt Ltd)", "Wealth Proxy Mapping Form"] 
    },
    { 
      title: "SECP Incorporation", 
      icon: <FileSearch className="w-6 h-6 text-cyan" />, 
      items: ["Memorandum of Association Template", "Articles of Association Guide", "Directors' KYC Requirements"] 
    },
    { 
      title: "Legal Drafting", 
      icon: <HelpCircle className="w-6 h-6 text-emerald-400" />, 
      items: ["Standard Non-Disclosure Agreement (NDA)", "Employment Contract Template", "Rent Agreement Abstract"] 
    },
  ];

  return (
    <div className="pt-32 pb-24 bg-[#02050e] min-h-screen relative overflow-hidden">
      
      {/* Decorative Aurora Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-900/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-900/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-800 text-xs font-semibold text-cyan mb-6 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-cyan" />
            <span>FBR & SECP Authorized Resource Vault</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Legal & Tax <span className="text-transparent bg-clip-text bg-linear-to-r from-gold via-[#e3b850] to-gold">Resource Vault</span>
          </h1>
          <p className="text-lg text-slate-400">
            Access and download our free repository of compliance checklists, legal templates, and FBR regulatory guides.
          </p>
        </div>

        {/* FBR Verified Branding Badge (New Branding Highlight) */}
        <div className="max-w-5xl mx-auto mb-16 p-8 rounded-3xl bg-linear-to-br from-[#0d1f18]/60 via-[#02050e] to-[#0d1f18]/40 border border-[#b89047]/20 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[#0d1f18] border border-[#b89047]/30 flex items-center justify-center shrink-0 shadow-lg">
            <Award className="w-8 h-8 text-gold animate-pulse" />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-widest bg-[#b89047]/10 px-3 py-1 rounded-full border border-[#b89047]/20">
              Federal Board of Revenue (FBR) Active Registration
            </div>
            <h3 className="text-xl font-bold text-white">Authorized FBR Active Taxpayer List (ATL) Desk</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We specialize in FBR NTN registrations and annual income tax filing for both <strong>salaried individual returns</strong> and <strong>registered business companies</strong> (Pvt Ltd, AOP, SMC). Make sure your business stays 100% compliant under Pakistan tax laws. Use our official FBR checklists below to get started.
            </p>
          </div>
        </div>

        {/* Grid Vault Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 hover:border-white/10 hover:bg-slate-900/60 transition-all duration-500 shadow-2xl backdrop-blur-md">
              <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white/5">
                {cat.icon}
              </div>
              <h2 className="text-2xl font-black text-white mb-6 tracking-tight">{cat.title}</h2>
              <ul className="space-y-4">
                {cat.items.map((item, id) => (
                  <li key={id} className="border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                    <button 
                      onClick={() => handleDownloadPDF(item)}
                      disabled={downloadingItem !== null}
                      className="w-full flex justify-between items-center text-left text-slate-400 hover:text-white transition-colors group cursor-pointer disabled:opacity-50"
                    >
                      <span className="text-sm font-semibold leading-relaxed pr-3">{item}</span>
                      <div className="flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#b89047]/20 transition-all">
                        {downloadingItem === item ? (
                          <div className="w-3.5 h-3.5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Download className="w-4 h-4 text-slate-500 group-hover:text-gold transition-colors" />
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer warning banner */}
        <div className="max-w-5xl mx-auto mt-16 p-6 rounded-2xl bg-slate-900/20 border border-white/5 flex gap-4 items-start">
          <AlertCircle className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong>Disclaimer:</strong> The checklists and templates provided in this resource vault are designed for reference and structural guidance purposes. While they represent compliant FBR, SECP, and legal frameworks, specific legal agreements and complex corporate filing structures should always be formally validated with our senior High Court and tax chamber advocates.
          </p>
        </div>

      </div>
    </div>
  );
}
