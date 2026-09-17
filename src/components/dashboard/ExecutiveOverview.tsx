import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Activity, Network, TrendingUp, Cpu, Workflow } from 'lucide-react';

const AnimatedCounter = ({ from = 0, to, duration = 1.5, decimals = 0 }: any) => {
  const [count, setCount] = useState(from);
  useEffect(() => {
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(progress * (to - from) + from);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [to, from, duration]);
  return <>{count.toFixed(decimals)}</>;
};

const TiltCard = ({ children, delay, glowingColor, title }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, type: 'spring' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative w-full p-5 rounded-lg border border-border-color bg-[#050B18] cursor-crosshair group overflow-hidden shadow-lg transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
           style={{ background: `radial-gradient(circle at center, ${glowingColor} 0%, transparent 70%)` }} />
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
        <div className="text-[9px] uppercase font-bold tracking-widest text-text-sub mb-3 flex items-center gap-2">
          {title}
        </div>
        {children}
      </div>
      
      {/* Background Micro-Sparkline */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
           <path d="M0,30 L10,25 L20,28 L30,15 L40,18 L50,5 L60,10 L70,2 L80,8 L90,12 L100,0" fill="none" stroke="currentColor" strokeWidth="1.5" className={glowingColor.replace('0.15)', '1)')} />
           <path d="M0,30 L10,25 L20,28 L30,15 L40,18 L50,5 L60,10 L70,2 L80,8 L90,12 L100,0 L100,30 L0,30 Z" fill={`url(#fade-${title.replace(/\s+/g,'')})`} stroke="none" />
           <defs>
             <linearGradient id={`fade-${title.replace(/\s+/g,'')}`} x1="0" y1="0" x2="0" y2="1">
               <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" className={glowingColor.replace('0.15)', '1)')} />
               <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
             </linearGradient>
           </defs>
        </svg>
      </div>
    </motion.div>
  );
};

export const ExecutiveOverview = () => {
  const { scrollY } = useScroll();
  
  // Parallax calculations
  const yTitle = useTransform(scrollY, [0, 500], [0, -40]);
  const yVisual = useTransform(scrollY, [0, 500], [0, 60]);
  const scaleVisual = useTransform(scrollY, [0, 500], [1, 0.95]);

  return (
    <div className="w-full flex flex-col gap-10 mt-6 preserve-3d" style={{ perspective: '1200px' }}>
      
      {/* Deep Navy Visualization Panel (Layer 3) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{ y: yVisual, scale: scaleVisual }}
        className="w-full rounded-xl border border-[rgba(96,165,250,0.16)] bg-[#0C1730] p-10 flex flex-col xl:flex-row gap-10 items-center justify-between shadow-[0_20px_60px_-15px_rgba(0,168,255,0.2)] overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,168,255,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none mix-blend-screen" />
        
        {/* Texts (Layer 4) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ y: yTitle, transformStyle: "preserve-3d" }}
          className="xl:w-1/2 relative z-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-fin-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fin-blue shadow-[0_0_8px_#00A8FF]"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-fin-blue drop-shadow-[0_0_5px_rgba(0,168,255,1)]">System Active</span>
          </div>
          
          <h2 className="text-4xl xl:text-6xl font-black text-white leading-[1.1] tracking-tighter drop-shadow-md pb-2">
            INDONESIAN MARKET
          </h2>
          <h2 className="text-xl xl:text-2xl font-bold text-electric-blue mb-6 tracking-wide drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]">
            CONTAGION FORECAST ENGINE
          </h2>
          <p className="text-sm text-text-sub font-medium leading-relaxed max-w-lg mb-8">
            A high-fidelity graph-based framework combining Social Network Analysis and Graph Convolutional Networks (GCN) to pinpoint systemic contagion topologies and strictly forecast next-day returns across the IDX core.
          </p>
          
          <div className="inline-flex items-center gap-2 border border-border-color bg-[#050B18] px-4 py-2 rounded-sm text-xs font-mono group cursor-pointer hover:border-fin-blue transition-colors shadow-sm">
            <span className="text-text-muted group-hover:text-text-main transition-colors">MODEL</span>
            <span className="text-white font-bold tracking-widest pl-2 border-l border-border-color ml-2">GCN-LSTM-HYBRID</span>
          </div>
        </motion.div>

        {/* Abstract GCN Graphic (Layer 5) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.6, type: 'spring' }}
          className="xl:w-1/3 relative z-10 flex justify-center perspective-container"
        >
           <div className="w-64 h-64 rounded-full border border-ai-indigo/30 relative flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.15)] bg-surface-bg preserve-3d" style={{ transform: 'rotateX(20deg) rotateY(-15deg)' }}>
             <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="absolute inset-4 rounded-full border border-dashed border-fin-blue/40" 
             />
             <motion.div 
               animate={{ rotate: -360 }} 
               transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
               className="absolute inset-10 rounded-full border-2 border-electric-blue/50 shadow-[0_0_15px_rgba(0,245,255,0.4)]" 
             />
             <div className="w-16 h-16 rounded-full bg-ai-indigo shadow-[0_0_30px_#8B5CF6] flex items-center justify-center animate-pulse">
               <Cpu size={24} className="text-white" />
             </div>
           </div>
        </motion.div>
      </motion.div>

      {/* KPI Cards (Layer 6) - 3D Tilt Hover */ }
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 relative z-20">
        
        <TiltCard title="NETWORK NODES" delay={0.7} glowingColor="rgba(0,168,255,0.15)">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-mono font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              <AnimatedCounter to={14} />
            </div>
            <Network className="text-fin-blue" size={20} />
          </div>
        </TiltCard>

        <TiltCard title="ACTIVE EDGES" delay={0.8} glowingColor="rgba(0,245,255,0.15)">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-mono font-black text-electric-blue drop-shadow-[0_0_15px_rgba(0,245,255,0.6)]">
              <AnimatedCounter to={41} />
            </div>
            <Activity className="text-electric-blue animate-pulse" size={20} />
          </div>
        </TiltCard>

        <TiltCard title="NETWORK DENSITY" delay={0.9} glowingColor="rgba(139,92,246,0.15)">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-mono font-black text-white">
              <AnimatedCounter to={0.44} decimals={2} />
            </div>
          </div>
        </TiltCard>

        <TiltCard title="THRESHOLD" delay={1.0} glowingColor="rgba(255,59,92,0.15)">
          <div className="flex flex-col">
            <div className="text-xl font-mono font-black text-trend-down drop-shadow-[0_0_10px_rgba(255,59,92,0.6)]">|r| &gt;</div>
            <div className="text-2xl font-mono font-black text-white mt-1">0.50</div>
          </div>
        </TiltCard>

        <TiltCard title="MEAN R²" delay={1.1} glowingColor="rgba(0,255,156,0.15)">
          <div className="flex items-center justify-between mb-1">
            <div className="text-3xl font-mono font-black text-trend-up drop-shadow-[0_0_15px_rgba(0,255,156,0.6)]">
              <AnimatedCounter to={0.802} decimals={3} />
            </div>
          </div>
          <div className="text-[10px] font-bold text-text-sub uppercase flex items-center gap-1">
            VS LSTM 
            <TrendingUp size={12} className="text-trend-up ml-1" />
            <span className="text-white">+17.6%</span>
          </div>
        </TiltCard>

      </div>
    </div>
  );
};

export default ExecutiveOverview;
