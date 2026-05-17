import ServiceLayout from "@/components/layout/ServiceLayout";

export const metadata = {
  title: "Legal Advisory & Corporate Drafting",
  description: "Expert contract drafting, intellectual property, and civil trust advisory.",
};

export default function LegalAdvisoryPage() {
  const features = [
    "Partnership & Business Agreements",
    "Employment Contracts & NDAs",
    "Trusts, Foundations & NGO Deeds",
    "Trademark & Brand Registrations",
    "Civil & Corporate Legal Advice",
    "Succession & Inheritance Certificates"
  ];

  const content = (
    <div className="space-y-6">
      <p>
        A clear and simple contract protects you from costly future disputes. Our legal team drafts complete, professional documents to secure your business and personal interests.
      </p>
      <h2 className="text-2xl font-bold text-slate-900 pt-4">Professional Legal Advice</h2>
      <p>
        We draft partnership deeds, trademark registrations, NGO registrations, and NDAs tailored exactly to your requirements, avoiding generic templates.
      </p>
      <p>
        Additionally, protecting your brand via IPO (Intellectual Property Office) trademarks and handling Trust/NGO registrations under the Societies Act are our specialized suites.
      </p>
    </div>
  );

  return (
    <ServiceLayout
      title="Legal Advisory & Drafting"
      subtitle="Professional drafting of business agreements, trademark registrations, and expert legal consultations."
      features={features}
      content={content}
      ctaText="Request Legal Consultation"
    />
  );
}
