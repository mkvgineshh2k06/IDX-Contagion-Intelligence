import React from 'react';
import { motion, useInView } from 'framer-motion';

const rankings = [
  { rank: 1, node: 'Central Bank / IHSG', score: 0.95 },
  { rank: 2, node: 'Banking Sector', score: 0.84 },
  { rank: 3, node: 'Consumer Goods', score: 0.65 },
  { rank: 4, node: 'Basic Industry', score: 0.61 },
  { rank: 5, node: 'Energy Sector', score: 0.42 },
  { rank: 6, node: 'Telecommunications', score: 0.38 },
];

export const CentralityRanking = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="bg-[#081225] border border-[rgba(96,165,250,0.16)] rounded-lg overflow-hidden">
      <div className="bg-[#0C1730] border-b border-[rgba(96,165,250,0.16)] p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-fin-blue opacity-5" />
        <h3 className="text-xs font-bold text-text-main uppercase tracking-widest relative z-10 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-fin-blue shadow-[0_0_8px_#3B82F6] animate-pulse" />
          Domestic Node Centrality Index
        </h3>
      </div>
      
      <div className="p-5 flex flex-col gap-4">
        {rankings.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1.5 group cursor-crosshair relative z-10">
            <div className="flex justify-between items-center text-[10px] font-bold font-mono">
              <span className="text-text-sub group-hover:text-white transition-colors duration-200">#{item.rank} {item.node}</span>
              <span className="text-fin-blue font-black tracking-widest">{item.score.toFixed(2)}</span>
            </div>
            
            <div className="w-full h-1.5 bg-[#050B18] rounded-sm overflow-hidden border border-[rgba(96,165,250,0.16)]">
              <motion.div 
                initial={{ width: 0 }}
                animate={isInView ? { width: `${item.score * 100}%` } : {}}
                transition={{ duration: 1, delay: idx * 0.1, type: "spring" }}
                className="h-full bg-gradient-to-r from-fin-blue/50 to-fin-blue shadow-[0_0_10px_#3B82F6] group-hover:shadow-[0_0_15px_#60A5FA] transition-all"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CentralityRanking;
