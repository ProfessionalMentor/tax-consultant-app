import ServiceLayout from "@/components/layout/ServiceLayout";

export const metadata = {
  title: "SECP Company Registration in Pakistan",
  description: "End-to-end Private Limited (Pvt Ltd) and Single Member Company (SMC) registration with SECP.",
};

export default function SECPRegistrationPage() {
  const features = [
    "Name Availability & Reservation",
    "Memorandum & Articles of Association (MoA & AoA)",
    "Digital Verification & Biometrics Support",
    "Corporate Bank Account Setup Guidance",
    "Post-Incorporation Compliance",
    "Free NTN Integration"
  ];

  const content = (
    <div className="space-y-6">
      <p>
        The Securities and Exchange Commission of Pakistan (SECP) has specific procedures to register a Private Limited or Single Member Company (SMC). We handle all the paperwork for you, making company registration fast and easy.
      </p>
      <h2 className="text-2xl font-bold text-slate-900 pt-4">Custom Corporate Registration</h2>
      <p>
        Choosing the right company type protects your personal assets and builds business trust. We guide you on shares division, directors, and draft your company&apos;s Memorandum of Association.
      </p>
      <p>
        After registration, we also help you with annual compliance filings (Form A, Form 29) to keep your company fully active and legal.
      </p>
    </div>
  );

  return (
    <ServiceLayout
      title="SECP Company Registration"
      subtitle="Launch your corporate journey. We offer end-to-end legal registration for Private Limited (Pvt Ltd), SMCs, and NGOs."
      features={features}
      content={content}
      ctaText="Start Company Setup"
    />
  );
}
