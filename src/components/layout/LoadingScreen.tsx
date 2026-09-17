import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>, t2: ReturnType<typeof setTimeout>, t3: ReturnType<typeof setTimeout>;
    t1 = setTimeout(() => setPhase(1), 500);
    t2 = setTimeout(() => setPhase(2), 1000);
    t3 = setTimeout(() => {
        setPhase(3); 
        setTimeout(() => onComplete(), 500); 
    }, 1500);
    
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const texts = [
    "IDX CONTAGION INTELLIGENCE",
    "NETWORK INITIALIZING...",
    "GRAPH ENGINE READY",
    "DASHBOARD READY"
  ];

  return (
    <AnimatePresence>
      <motion.div 
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed inset-0 z-[100] bg-surface-bg flex items-center justify-center flex-col"
      >
        <div className="w-64 relative mb-8">
            <div className="h-[1px] w-full bg-border-color absolute top-1/2 -translate-y-1/2" />
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: `${(phase / 3) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="h-[1px] bg-fin-blue absolute top-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
            />
        </div>
        <div className="h-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-mono font-medium tracking-widest uppercase text-text-sub text-center"
              >
                {texts[phase]}
              </motion.div>
            </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
