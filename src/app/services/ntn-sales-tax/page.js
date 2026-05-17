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
      <h2 className="text-2xl font-bold text-slate-900 pt-4">Provincial Sales Tax & PRA Help</h2>
      <p>
        Sales tax rules differ depending on your location and business type, such as Punjab Revenue Authority (PRA). We handle your registration, monthly sales tax filings, and provincial authority alignment perfectly.
      </p>
      <p>
        We make sure you pay the correct taxes while avoiding extra penalties, keeping your business running without any compliance issues.
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
