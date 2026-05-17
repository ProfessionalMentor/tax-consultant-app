import Services from "@/components/Services";

export const metadata = {
  title: "Our Services | Law & Tax Consultant Pakistan",
  description: "Explore our comprehensive legal and tax consultancy services including Filer Registration, SECP incorporation, and NTN services.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">How We Help You Grow</h1>
        <p className="mt-4 text-xl text-slate-400 max-w-3xl mx-auto">
          From individual tax returns to complex corporate restructurings, we offer end-to-end solutions.
        </p>
      </div>
      <Services />
    </div>
  );
}
