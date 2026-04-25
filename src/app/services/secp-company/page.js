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
        The Securities and Exchange Commission of Pakistan (SECP) mandates specific procedural intricacies to form a Private Limited or Single Member Company. Whether you are a local startup or a foreign entity looking to establish a branch in Pakistan, we bypass the bureaucratic hurdles on your behalf.
      </p>
      <h2 className="text-2xl font-bold text-slate-900 pt-4">Corporate Structuring tailored for you</h2>
      <p>
        Choosing the right corporate structure protects your personal assets and allows for dynamic growth and international investments. We provide exclusive consultation on share capital division, directorship allocations, and drafting the all-important Memorandum containing your company’s legal scope.
      </p>
      <p>
        Post-incorporation, we continue managing your Form 29, Form A (Annual Returns), and ensure that your corporate veil remains flawlessly intact.
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
