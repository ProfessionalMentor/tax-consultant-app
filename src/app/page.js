import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Profile from '@/components/Profile';
import FAQ from '@/components/FAQ';
import FloatingContact from '@/components/FloatingContact';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Services />
      <Profile />
      <FAQ />
      <FloatingContact />
    </main>
  );
}
