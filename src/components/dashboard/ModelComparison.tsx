import React from 'react';
import { motion, useInView } from 'framer-motion';

const models = [
  { name: 'ARIMA', type: 'Statistical Baseline', rmse: 0.00491, barWidth: 90, color: 'bg-text-sub' },
  { name: 'LSTM', type: 'Deep Learning Standard', rmse: 0.00391, barWidth: 70, color: 'bg-fin-blue' },
  { name: 'MLP', type: 'Feedforward Network', rmse: 0.00356, barWidth: 62, color: 'bg-ai-indigo' },
  { name: 'GCN', type: 'Graph Topology Aware', rmse: 0.00322, barWidth: 45, color: 'bg-electric-blue', highlight: true }
];

export const ModelComparison = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="bg-[#060D20] border border-[#00F0FF] rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.15)]">
      <div className="bg-[#080D1C] border-b border-border-color p-4 relative overflow-hidden flex justify-between items-center z-10">
        <div>
          <h3 className="text-xs font-bold text-text-main uppercase tracking-widest">Target Architecture Benchmark</h3>
          <p className="text-[9px] font-mono text-text-sub mt-1">Evaluation Metric: Node-Averaged RMSE</p>
        </div>
        <div className="bg-surface-panel border border-electric-blue/40 px-3 py-1.5 rounded-sm shadow-[0_0_15px_rgba(96,165,250,0.15)] flex flex-col items-end">
          <span className="text-[8px] font-bold uppercase tracking-widest text-electric-blue">GCN Adv.</span>
          <span className="font-mono text-sm font-black text-white hover:scale-105 transition-transform cursor-crosshair">17.6% vs LSTM</span>
        </div>
      </div>

      <div className="p-0 flex flex-col relative z-20">
        {/* Table Header */}
        <div className="grid grid-cols-12 text-[9px] uppercase font-bold tracking-widest text-text-muted bg-[#080D1C] p-3 border-b border-border-color">
          <div className="col-span-3 pl-3">Architecture</div>
          <div className="col-span-6">RMSE Error Distribution Gap</div>
          <div className="col-span-3 text-right pr-3">Node-Avg RMSE</div>
        </div>

        {/* Rows */}
        {models.map((model, idx) => (
          <motion.div 
            key={model.name}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`grid grid-cols-12 items-center p-3 border-b border-[#15234B]/50 transition-colors hover:bg-white/5 cursor-crosshair group ${model.highlight ? 'bg-[#0B1630] border-l-4 border-[#00F0FF] shadow-inner' : ''}`}
          >
            <div className="col-span-3 flex flex-col pl-3">
              <span className={`text-[11px] font-black uppercase tracking-widest drop-shadow-sm ${model.highlight ? 'text-[#00F0FF] shadow-[0_0_5px_rgba(0,240,255,0.5)]' : 'text-text-main'}`}>
                {model.name}
              </span>
              <span className={`text-[9px] uppercase font-bold ${model.highlight ? 'text-white/80' : 'text-text-sub'}`}>{model.type}</span>
            </div>
            
            <div className="col-span-6 flex items-center">
              <div className="w-full h-1.5 bg-[#030712] rounded-sm overflow-hidden relative shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${model.barWidth}%` } : {}}
                  transition={{ duration: 1, delay: 0.5 + (idx * 0.15), type: "spring" }}
                  className={`h-full ${model.color} ${model.highlight ? 'shadow-[0_0_15px_#00F0FF] brightness-125' : 'shadow-[0_0_5px_rgba(0,0,0,0.5)]'} transition-all`}
                />
              </div>
            </div>
            
            <div className="col-span-3 text-right pr-3">
              <span className={`text-sm font-mono font-bold group-hover:text-white transition-colors drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] ${model.highlight ? 'text-[#00F0FF]' : 'text-text-sub'}`}>
                {model.rmse.toFixed(5)}
              </span>
            </div>
          </motion.div>
        ))}

        <div className="p-4 bg-[#040814] flex justify-between items-center text-[10px] font-mono font-bold text-white/50 border-t border-[#15234B]">
          <span>*Lower RMSE indicates higher predictive accuracy</span>
          <span className="text-white/80">GCN MAE: <span className="text-[#00F0FF]">0.00231</span></span>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;
