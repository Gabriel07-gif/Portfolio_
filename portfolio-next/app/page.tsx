import SkipLink      from '@/components/SkipLink';
import Navbar        from '@/components/Navbar';
import Hero          from '@/components/Hero';
import TechTape      from '@/components/TechTape';
import Services      from '@/components/Services';
import Projects      from '@/components/Projects';
import Skills        from '@/components/Skills';
import About         from '@/components/About';
import FAQ           from '@/components/FAQ';
import Contact       from '@/components/Contact';
import Footer        from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import SideDots      from '@/components/SideDots';
import BackTop       from '@/components/BackTop';
import Toast         from '@/components/Toast';
import ClientShell   from '@/components/ClientShell';

export default function Home() {
  return (
    <>
      <SkipLink />

      {/* Browser-only: intro overlay, custom cursor, particles, magnetic, smooth scroll */}
      <ClientShell />

      {/* Ambient blobs */}
      <div className="bg-blobs" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="noise-overlay" aria-hidden="true" />
      <ScrollProgress />
      <Toast />
      <SideDots />
      <Navbar />

      <main id="main-content">
        <Hero />
        <TechTape />
        <Services />
        <Projects />
        <Skills />
        <About />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <BackTop />
    </>
  );
}
