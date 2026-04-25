import ServiceLayout from "@/components/layout/ServiceLayout";

export const metadata = {
  title: "Filer Registration & Income Tax Return Pakistan",
  description: "Become an active taxpayer. Expert filer registration and income tax return preparation.",
};

export default function FilerRegistrationPage() {
  const features = [
    "100% Guaranteed Active Taxpayer Status",
    "Reduction in Withholding Taxes (Property, Vehicles)",
    "Audit support across the board",
    "Free Tax Notice Assessment",
    "Wealth Statement Preparation",
    "Digital Filing & Zero Paperwork"
  ];

  const content = (
    <div className="space-y-6">
      <p>
        Being an Active Taxpayer (Filer) in Pakistan is no longer just a legal obligation—it is a financial necessity. Without filer status, you pay <strong>double withholding taxes</strong> on cash withdrawals, property purchases, vehicle registrations, and international transactions.
      </p>
      <h2 className="text-2xl font-bold text-slate-900 pt-4">Why File With Us?</h2>
      <p>
        Our team of expert tax consultants and advocates ensures your wealth statement matches your income declarations flawlessly. We mitigate the risk of FBR audits and penalty notices by providing a highly meticulous review process before submission.
      </p>
      <p>
        We handle your IRIS credentials with utmost confidentiality. All documents (CNIC, Utility Bills, Salary Slips) are transmitted via our secure Client Dashboard, eliminating the risks of WhatsApp and email leaks.
      </p>
    </div>
  );

  return (
    <ServiceLayout
      title="Filer Registration & Income Tax Return"
      subtitle="Save millions in excessive withholding taxes. Professional mapping of your wealth and income to achieve Active Taxpayer status swiftly."
      features={features}
      content={content}
      ctaText="Become a Filer Today"
    />
  );
}
