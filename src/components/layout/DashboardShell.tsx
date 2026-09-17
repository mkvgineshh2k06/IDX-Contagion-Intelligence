import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import MarketMarquee from './MarketMarquee';
import LoadingScreen from './LoadingScreen';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const BackgroundParticles = () => {
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * -30,
    color: i % 3 === 0 ? 'bg-fin-blue' : i % 3 === 1 ? 'bg-ai-indigo' : 'bg-electric-blue'
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-40">
      {particles.map(p => (
        <motion.div
           key={p.id}
           className={`absolute rounded-full blur-[1px] ${p.color}`}
           style={{ left: `${p.x}vw`, top: `${p.y}vh`, width: p.size, height: p.size }}
           animate={{
             y: ['0vh', '-20vh'],
             x: ['0vw', `${Math.random() * 5 - 2.5}vw`],
             opacity: [0, 0.5, 0]
           }}
           transition={{
             duration: p.duration,
             repeat: Infinity,
             delay: p.delay,
             ease: "linear"
           }}
        />
      ))}
    </div>
  );
}

export const DashboardShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  // Intersection Observer for scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'dashboard';
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Snaps when section crosses the 40% vertical viewport threshold
        if (rect.top <= window.innerHeight * 0.45) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initializing
    setTimeout(handleScroll, 150);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Mouse parallax physics for the background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 40; // max shift
    const y = (clientY / window.innerHeight - 0.5) * 40;
    mouseX.set(x);
    mouseY.set(y);
  };

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div onMouseMove={handleMouseMove} className="min-h-screen bg-[#030712] flex flex-col font-sans overflow-x-hidden relative">
      
      {/* Global Cinematic Background Layers */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030712]">
        <motion.div 
          style={{ x: smoothX, y: smoothY }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay" />
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[rgba(0,168,255,0.06)] rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[rgba(139,92,246,0.06)] rounded-full blur-[130px]" />
          <BackgroundParticles />
        </motion.div>
      </div>

      {/* Actual Content Wrapper */}
      <div className="relative z-10 flex flex-col w-full min-h-screen">
        <MarketMarquee />
        
        <div className="flex flex-1 mt-10">
          <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
          
          <div className="flex-1 ml-64 flex flex-col relative w-[calc(100%-16rem)] overflow-hidden">
            <TopHeader />
            
            <main className="flex-1 overflow-x-hidden p-8 text-text-main pb-32" style={{ perspective: '1200px' }}>
              <div className="max-w-7xl mx-auto space-y-[15vh]">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DashboardShell;
