import ServiceLayout from "@/components/layout/ServiceLayout";

export const metadata = {
  title: "Legal Advisory & Corporate Drafting",
  description: "Expert contract drafting, intellectual property, and civil trust advisory.",
};

export default function LegalAdvisoryPage() {
  const features = [
    "Partnership & Shareholder Agreements",
    "Employment Contracts & NDAs",
    "Trust & NGO Deeds",
    "Trademark & IP Registration",
    "Civil & Corporate Litigation Consulting",
    "Succession & Inheritance Certificates"
  ];

  const content = (
    <div className="space-y-6">
      <p>
        A single overlooked clause in a contract can cost millions in litigation. Our 20+ years of appellate court and corporate background allows us to draft bulletproof legal documents that protect your interests against unpredicted damages.
      </p>
      <h2 className="text-2xl font-bold text-slate-900 pt-4">Proactive Defense is the Best Defense</h2>
      <p>
        We do not just react to notices; we structure your commercial operations so conflicts are minimized. From strict Non-Disclosure Agreements (NDAs) to complex vendor and tech-transfer contracts, we draft bespoke legal parameters for your precise business needs—rejecting flimsy templates.
      </p>
      <p>
        Additionally, protecting your brand via IPO (Intellectual Property Office) trademarks and handling Trust/NGO registrations under the Societies Act are our specialized suites.
      </p>
    </div>
  );

  return (
    <ServiceLayout
      title="Legal Advisory & Drafting"
      subtitle="Fortify your business with airtight contracts, trademarks, and specialized legal advocacy."
      features={features}
      content={content}
      ctaText="Request Legal Counsel"
    />
  );
}
