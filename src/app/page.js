import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Profile from '@/components/Profile';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import FloatingContact from '@/components/FloatingContact';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <Hero />
      <Services />
      <WhyChooseUs />
      <Profile />
      <Testimonials />
      <FAQ />
      <FloatingContact />
    </main>
  );
}
