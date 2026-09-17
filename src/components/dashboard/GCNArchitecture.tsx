import React from 'react';
import { motion, useInView } from 'framer-motion';

export const GCNArchitecture = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const LayerBlock = ({ title, desc, delay, isGCN, particles }: any) => (
    <motion.div 
      initial={{ opacity: 0, z: -100, rotateX: -20 }}
      animate={isInView ? { opacity: 1, z: 0, rotateX: 0 } : {}}
      transition={{ duration: 1, delay, type: "spring", stiffness: 100 }}
      className={`relative flex-1 p-6 preserve-3d terminal-card flex flex-col items-center justify-center text-center transition-transform hover:translate-z-8
        ${isGCN ? 'border-ai-indigo shadow-[0_0_30px_rgba(139,92,246,0.15)] bg-ai-indigo/5' : 'bg-surface-secondary/50 scale-90'}`}
    >
      <span className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isGCN ? 'text-ai-indigo' : 'text-text-sub'}`}>{title}</span>
      <span className="text-lg font-mono font-bold text-white drop-shadow-sm">{desc}</span>

      {/* Layer Depth shadow base */}
      <div className="absolute inset-0 border border-t-[3px] border-l-[3px] border-white/5 pointer-events-none rounded-md" style={{ transform: 'translateZ(10px)' }} />

      {particles && (
        <motion.div 
          className="w-2 h-2 rounded-full border-2 border-ai-indigo bg-white shadow-[0_0_15px_#8B5CF6] absolute top-1/2 -right-[60px] z-50 animate-pulse"
        />
      )}
    </motion.div>
  );

  return (
    <div ref={ref} className="w-full flex flex-col gap-12 perspective-container">
      
      <div className="text-center">
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">GRAPH CONVOLUTIONAL ENGINE</h3>
        <p className="text-xs text-ai-indigo tracking-widest uppercase mt-2 font-bold shadow-sm">Layer Architecture & Output Map</p>
      </div>

      <div className="w-full h-[400px] flex items-center justify-between px-10 gap-x-8 preserve-3d" 
           style={{ transform: 'rotateX(5deg) rotateY(-5deg) translateZ(0)' }}>
        
        {/* Layer 1 - Inputs */}
        <LayerBlock title="Input Features" desc="14×5 Matrix" delay={0.2} />

        {/* Connection Arrow */}
        <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} className="h-1 flex-1 bg-gradient-to-r from-border-color to-ai-indigo origin-left drop-shadow-[0_0_5px_#8B5CF6]" transition={{ duration: 0.5, delay: 0.3 }} />

        {/* Layer 2 - GCN 1 */}
        <LayerBlock title="GCN Layer 1" desc="64 Units / ReLU" delay={0.4} isGCN particles />

        {/* Connection Arrow */}
        <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} className="h-1 flex-1 bg-gradient-to-r from-ai-indigo to-border-color origin-left drop-shadow-[0_0_5px_#8B5CF6]" transition={{ duration: 0.5, delay: 0.5 }} />

        {/* Layer 3 - Dropout */}
        <LayerBlock title="Regularization" desc="Dropout 0.3s" delay={0.6} />

        {/* Connection Arrow */}
        <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} className="h-1 flex-1 bg-gradient-to-r from-border-color to-ai-indigo origin-left drop-shadow-[0_0_5px_#8B5CF6]" transition={{ duration: 0.5, delay: 0.7 }} />

        {/* Layer 4 - GCN 2 */}
        <LayerBlock title="GCN Layer 2" desc="32 Units / ReLU" delay={0.8} isGCN />

        {/* Connection Arrow */}
        <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} className="h-1 flex-1 bg-gradient-to-r from-ai-indigo to-fin-blue origin-left drop-shadow-[0_0_5px_#3B82F6]" transition={{ duration: 0.5, delay: 0.9 }} />

        {/* Final Output */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="p-6 rounded-full border-[2px] border-fin-blue bg-[#101A31] shadow-[0_0_40px_rgba(59,130,246,0.3)] flex flex-col items-center justify-center text-center relative z-20 group"
        >
          <div className="absolute inset-0 rounded-full border border-fin-blue animate-ping opacity-10" />
          <span className="text-[9px] uppercase tracking-widest text-fin-blue font-bold">Prediction</span>
          <span className="text-white font-black whitespace-nowrap mt-1">LOG RETURN(T+1)</span>
        </motion.div>

      </div>
    </div>
  );
};

export default GCNArchitecture;
