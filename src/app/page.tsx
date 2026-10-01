import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PracticeAreasSection from '@/components/PracticeAreasSection';
import AboutSection from '@/components/AboutSection';
import ProcessSection from '@/components/ProcessSection';
import TeamSection from '@/components/TeamSection';
import ConsultSection from '@/components/ConsultSection';
import Footer from '@/components/Footer';
import LangSwitcher from '@/components/LangSwitcher';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PracticeAreasSection />
        <AboutSection />
        <ProcessSection />
        <TeamSection />
        <ConsultSection />
      </main>
      <Footer />
      <LangSwitcher />
    </>
  );
}
