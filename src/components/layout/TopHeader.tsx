import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const TopHeader = () => {
  const { scrollY } = useScroll();
  
  // Shrink/fade physics for the scroll effect
  const headerHeight = useTransform(scrollY, [0, 100], [80, 56]);
  const bgOpacity = useTransform(scrollY, [0, 100], [0.5, 0.85]);
  const borderColor = useTransform(scrollY, [0, 100], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.08)']);

  return (
    <motion.header 
      style={{ height: headerHeight, backgroundColor: `rgba(11, 18, 36, 0.85)`, borderColor }} // Fallback for framer motion rgba 
      className="sticky top-10 flex items-center justify-between px-8 z-40 backdrop-blur-md border-b"
    >
      {/* Left */}
      <div className="flex flex-col justify-center">
        <h1 className="text-xl font-black tracking-tight text-text-main leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">IDX CONTAGION <span className="text-fin-blue ml-1 font-mono tracking-tighter">INTELLIGENCE</span></h1>
        <p className="text-[10px] text-text-sub uppercase tracking-widest font-semibold mt-1 opacity-80">
          Graph-Based Financial Contagion Detection & Forecasting
        </p>
      </div>

      {/* Right */}
      <div className="hidden lg:flex items-center gap-3 text-xs font-mono font-medium text-text-sub">
        
        <div className="flex items-center gap-2 px-3 py-1.5 border border-[#00F0FF] rounded-sm bg-[#060D20] text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.3)]">
          <span className="font-bold text-[#F8FAFC]">JAN 2025</span>
          <span className="opacity-70 text-[10px]">—</span>
          <span className="font-bold text-[#F8FAFC]">MAY 2026</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-1.5 border border-[#8B5CF6] rounded-sm bg-[#0B061A] text-[#A78BFA] shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <span className="font-bold">GCN</span>
          <span className="text-[9px] uppercase tracking-wider opacity-80 text-white">MODEL</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 ml-2 border border-fin-blue/30 rounded-sm bg-fin-blue/10 text-fin-blue relative overflow-hidden group">
          <div className="absolute inset-0 bg-fin-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Activity size={12} className="relative z-10" />
          <span className="relative z-10 text-[10px] font-bold tracking-widest uppercase">ANALYTICS ENGINE ACTIVE</span>
          <div className="w-1.5 h-1.5 rounded-full bg-fin-blue ml-2 relative z-10 shadow-[0_0_8px_#3B82F6] animate-pulse-subtle" />
        </div>

      </div>
    </motion.header>
  );
};

export default TopHeader;
