import React from 'react';
import { motion, useInView } from 'framer-motion';

const domesticIndicators = [
  { name: 'BANKING', category: 'IDX Sector', metric: 'Centrality: 0.84', trend: 'down' },
  { name: 'IHSG', category: 'Market Index', metric: 'Correlation: Base', trend: 'down' },
  { name: 'TELECOMMUNICATIONS', category: 'IDX Sector', metric: 'Highly Correlated', trend: 'up' },
  { name: 'CONSUMER GOODS', category: 'IDX Sector', metric: 'Corr vs IHSG: 0.68', trend: 'down' },
  { name: 'BASIC INDUSTRY', category: 'IDX Sector', metric: 'Corr vs IHSG: 0.63', trend: 'down' }
];

const globalIndicators = [
  { name: 'WTI OIL', category: 'Commodity', metric: 'Corr vs IHSG: -0.42', trend: 'up' },
  { name: 'BRENT OIL', category: 'Commodity', metric: 'Corr vs IHSG: -0.46', trend: 'up' },
  { name: 'NATURAL GAS', category: 'Commodity', metric: 'Corr vs Banking: 0.01', trend: 'up' },
  { name: 'DOLLAR INDEX (DXY)', category: 'Currency', metric: 'Corr vs WTI: 0.56', trend: 'up' },
  { name: 'GOLD', category: 'Commodity', metric: 'Safe Haven', trend: 'up' },
  { name: 'VIX', category: 'Volatility', metric: 'Corr vs IHSG: -0.05', trend: 'up' },
  { name: 'US10Y', category: 'Bond Yield', metric: 'Yield Curve', trend: 'up' },
  { name: 'S&P500', category: 'Global Index', metric: 'Global Benchmark', trend: 'down' }
];

const IndicatorRow = ({ item, index }: { item: any, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.02)' }}
    className="flex items-center justify-between p-3 border-b border-border-color last:border-b-0 cursor-default group"
  >
    <div className="flex items-center gap-3">
      <div className={`w-1.5 h-1.5 rounded-full ${item.trend === 'up' ? 'bg-trend-up shadow-[0_0_8px_#22C55E]' : item.trend === 'down' ? 'bg-trend-down shadow-[0_0_8px_#EF4444]' : 'bg-text-muted'} transition-all`} />
      <div className="flex flex-col">
        <span className="text-[11px] font-bold text-text-main uppercase tracking-wide group-hover:text-white transition-colors">{item.name}</span>
        <span className="text-[9px] text-text-sub uppercase tracking-wider">{item.category}</span>
      </div>
    </div>
    <div className="text-right">
      <span className="text-[10px] font-mono font-medium text-text-sub bg-[#050B18] px-2 py-1 rounded border border-[rgba(96,165,250,0.16)] group-hover:border-[rgba(96,165,250,0.4)] transition-colors">
        {item.metric}
      </span>
    </div>
  </motion.div>
);

export const GlobalIndicatorPanel = () => {
  const ref = React.useRef(null);
  
  return (
    <div ref={ref} className="flex flex-col gap-6 w-full lg:w-80 flex-shrink-0">
      
      {/* Domestic Core */}
      <div className="bg-[#040916] border border-[#00F0FF] rounded-lg overflow-hidden shadow-[0_0_15px_rgba(0,240,255,0.15)]">
        <div className="bg-[#0C1730] border-b border-[rgba(96,165,250,0.16)] p-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-fin-blue opacity-5" />
          <h3 className="text-[10px] font-bold text-text-main uppercase tracking-widest flex items-center gap-2 relative z-10">
            <span className="w-1.5 h-1.5 bg-fin-blue rounded shadow-[0_0_5px_#3B82F6]" />
            Domestic Core
          </h3>
        </div>
        <div className="flex flex-col">
          {domesticIndicators.map((item, idx) => (
            <IndicatorRow key={`dom-${idx}`} item={item} index={idx} />
          ))}
        </div>
      </div>

      {/* Global & External */}
      <div className="bg-[#040916] border border-[#A855F7] rounded-lg overflow-hidden shadow-[0_0_35px_rgba(168,85,247,0.35)]">
        <div className="bg-[#0C1730] border-b border-[rgba(96,165,250,0.16)] p-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-ai-indigo opacity-5" />
          <h3 className="text-[10px] font-bold text-text-main uppercase tracking-widest flex items-center gap-2 relative z-10">
            <span className="w-1.5 h-1.5 bg-ai-indigo rounded shadow-[0_0_5px_#8B5CF6]" />
            Global & External Filters
          </h3>
        </div>
        <div className="flex flex-col flex-1 max-h-[300px] overflow-y-auto scrollbar-hide">
          {globalIndicators.map((item, idx) => (
            <IndicatorRow key={`glob-${idx}`} item={item} index={idx} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default GlobalIndicatorPanel;
