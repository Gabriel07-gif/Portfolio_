'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechTape from '@/components/TechTape';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import SideDots from '@/components/SideDots';
import BackTop from '@/components/BackTop';
import Toast from '@/components/Toast';

/* Heavy/browser-only components loaded dynamically */
const IntroOverlay  = dynamic(() => import('@/components/IntroOverlay'),  { ssr: false });
const CustomCursor  = dynamic(() => import('@/components/CustomCursor'),  { ssr: false });
const ParticleCanvas= dynamic(() => import('@/components/ParticleCanvas'),{ ssr: false });

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <CustomCursor />
      <ParticleCanvas />

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

      <main>
        <Hero />
        <TechTape />
        <Services />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>

      <Footer />
      <BackTop />
    </>
  );
}
