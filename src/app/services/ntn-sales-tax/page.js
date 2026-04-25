import ServiceLayout from "@/components/layout/ServiceLayout";

export const metadata = {
  title: "NTN & Sales Tax Registration | Law & Tax Consultant",
  description: "Get your National Tax Number (NTN) and General Sales Tax (GST/SRB/PRA) registration effortlessly.",
};

export default function NTNSalesTaxPage() {
  const features = [
    "AOP, Partnership, and Corporate NTNs",
    "FBR GST Verification & Addition",
    "Provincial Tax: PRA, SRB, KPRA",
    "Import/Export WEbOC mapping",
    "Modification in NTN profiles",
    "Business Bank Account Letters"
  ];

  const content = (
    <div className="space-y-6">
      <p>
        Registering your business for an NTN (National Tax Number) is your first formal step toward legal commercial operations in Pakistan. Furthermore, for manufacturing and large-scale providers, Sales Tax verification is non-negotiable.
      </p>
      <h2 className="text-2xl font-bold text-slate-900 pt-4">Cross-Provincial Sales Tax Compliance</h2>
      <p>
        Tax laws vary drastically between provinces (Sindh Revenue Board SRB, Punjab Revenue Authority PRA, KPRA, and BRA). We identify exactly what category your specialized service falls under, limiting your liabilities and correctly matching your input-output taxes.
      </p>
      <p>
        For e-commerce and retail integration, we assist with FBR POS (Point of Sale) integration and ensuring you benefit from reduced tier regulations.
      </p>
    </div>
  );

  return (
    <ServiceLayout
      title="NTN & Sales Tax Registration"
      subtitle="Establish your business identity with FBR and Provincial Authorities to operate smoothly across Pakistan."
      features={features}
      content={content}
      ctaText="Apply for NTN & GST"
    />
  );
}
