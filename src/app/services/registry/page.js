import ServiceLayout from "@/components/layout/ServiceLayout";

export const metadata = {
  title: "Property Registry & Land Mutations | Law & Tax Consultant",
  description: "Expert deed drafting, title verification, Registryan, and mutations (Inteqal) in Pakistan.",
};

export default function PropertyRegistryPage() {
  const features = [
    "Expert Title deed drafting ('Registryan')",
    "Official Land mutations ('Inteqal') processing",
    "Legal property title verification checks",
    "Registrar office representation & execution",
    "Registry records verification and corrections",
    "Secure legal documentation transfer"
  ];

  const content = (
    <div className="space-y-6">
      <p>
        Buying, selling, or transferring property in Pakistan involves complex paperwork and legal procedures. We simplify this process entirely for you, making sure your investment is safe and fully legal.
      </p>
      <h2 className="text-2xl font-bold text-slate-300 pt-4">Complete Registry & Mutation Support</h2>
      <p>
        Our team helps you draft airtight sale deeds, gift deeds, and mortgage registries. We handle all paperwork with local registrar offices to execute the registry smoothly.
      </p>
      <p>
        Once the registry is complete, we assist in processing the Land Mutation (Inteqal) in government records to officially record you as the owner. We also perform complete verification of ownership history (Fard, Registry) to secure you against fraud.
      </p>
    </div>
  );

  return (
    <ServiceLayout
      title="Property Registry & Mutations"
      subtitle="Protect your land and property investments. We handle registry drafting, mutations (Inteqal), and legal verification from start to finish."
      features={features}
      content={content}
      ctaText="Get Property Advice"
    />
  );
}
