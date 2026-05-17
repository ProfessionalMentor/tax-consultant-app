import ServiceLayout from "@/components/layout/ServiceLayout";

export const metadata = {
  title: "e-Payments & e-PADS Tenders | Law & Tax Consultant",
  description: "FBR online payments, tax challans, and e-PADS portal registrations for tenders.",
};

export default function EPaymentsPage() {
  const features = [
    "Official e-PADS portal registration",
    "FBR online tax challan (CPR) generation",
    "PRA & provincial online payments help",
    "Online bidding & tender document preparation",
    "Secure online tax payments verification",
    "Prompt electronic processing & support"
  ];

  const content = (
    <div className="space-y-6">
      <p>
        Digital operations are now the standard for taxation and public procurement in Pakistan. We help you navigate these online systems smoothly, allowing you to pay taxes and apply for government contracts with zero stress.
      </p>
      <h2 className="text-2xl font-bold text-slate-300 pt-4">Online Payments & e-PADS Tender Processing</h2>
      <p>
        We assist you in making online tax payments via the FBR e-payment portal, generating tax challans (PSID), and securing Computerized Payment Receipts (CPR) immediately.
      </p>
      <p>
        If you are looking to bid for public government tenders, we provide end-to-end support for registration on the Electronic Procurement & Disposal System (e-PADS). We help prepare technical files, process bidding documents, and ensure complete compliance.
      </p>
    </div>
  );

  return (
    <ServiceLayout
      title="e-Payments & e-PADS Tenders"
      subtitle="Handle FBR online tax payments, tax challan creations, and e-PADS procurement bids easily and securely."
      features={features}
      content={content}
      ctaText="Apply for e-Payments"
    />
  );
}
