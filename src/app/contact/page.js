export const metadata = {
  title: "Contact Us | Request Consultation",
  description: "Book an appointment or contact our legal team for expert advice.",
};

import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-[#0a0f1c] min-h-screen relative overflow-hidden">
      
      {/* Decorative Blob */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">Let's Discuss Your <span className="text-transparent bg-clip-text bg-linear-to-r from-gold to-[#e3b850]">Needs</span></h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Whether you need to file your annual tax return or require complex corporate litigation support, our team is ready to assist.
            </p>
            
            <div className="space-y-6 mt-12">
              <div className="flex items-start group">
                <div className="shrink-0 bg-slate-900 border border-white/10 rounded-xl p-4 group-hover:border-gold/30 transition-colors">
                  <span className="text-2xl" role="img" aria-label="Location">🏢</span>
                </div>
                <div className="ml-5 mt-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors">Main Office</h3>
                  <p className="mt-1 text-slate-400">Shahrah-e-Faisal<br/>Karachi, Pakistan</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="shrink-0 bg-slate-900 border border-white/10 rounded-xl p-4 group-hover:border-emerald-500/30 transition-colors">
                  <span className="text-2xl" role="img" aria-label="Phone">📞</span>
                </div>
                <div className="ml-5 mt-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Contact Number</h3>
                  <p className="mt-1 text-slate-400">+92 300 0000000<br/>(Mon - Fri, 9am - 6pm)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#040814]/80 backdrop-blur-md p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 relative">
            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Book a Consultation</h2>
            <ContactForm />
          </div>
        </div>
        
      </div>
    </div>
  );
}
