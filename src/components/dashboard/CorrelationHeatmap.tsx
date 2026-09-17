import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';

const variables = [
  'Banking', 'Telecom', 'Consumer', 'Basic Ind.', 'Energy', 'IHSG', 
  'Gold', 'WTI', 'Brent', 'Nat Gas', 'DXY', 'US10Y', 'VIX', 'S&P500'
];

interface CellData { row: string, col: string, value: number | null }

const knownCorrelations: Record<string, number> = {
  'WTI-Brent': 0.88, 'Brent-WTI': 0.88,
  'IHSG-Banking': 0.77, 'Banking-IHSG': 0.77,
  'IHSG-Telecom': 0.78, 'Telecom-IHSG': 0.78,
  'IHSG-Consumer': 0.68, 'Consumer-IHSG': 0.68,
  'IHSG-Basic Ind.': 0.63, 'Basic Ind.-IHSG': 0.63,
  'IHSG-WTI': -0.42, 'WTI-IHSG': -0.42,
  'IHSG-Brent': -0.46, 'Brent-IHSG': -0.46,
  'IHSG-VIX': -0.05, 'VIX-IHSG': -0.05,
  'DXY-WTI': 0.56, 'WTI-DXY': 0.56,
  'DXY-Brent': 0.54, 'Brent-DXY': 0.54,
  'Nat Gas-Banking': 0.01, 'Banking-Nat Gas': 0.01,
  'Nat Gas-Energy': 0.04, 'Energy-Nat Gas': 0.04,
  'Nat Gas-Consumer': 0.13, 'Consumer-Nat Gas': 0.13,
  'Nat Gas-Telecom': 0.04, 'Telecom-Nat Gas': 0.04
};

const matrix: CellData[][] = variables.map(row => 
  variables.map(col => {
    if (row === col) return { row, col, value: 1.0 };
    const key = `${row}-${col}`;
    return { row, col, value: knownCorrelations[key] ?? null };
  })
);

export const CorrelationHeatmap = () => {
  const [hoveredCell, setHoveredCell] = useState<CellData | null>(null);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="terminal-card p-6 flex flex-col w-full h-[600px] overflow-hidden">
      <div className="mb-8 flex justify-between items-end relative z-20">
        <div>
          <h3 className="text-[11px] font-black text-white uppercase tracking-widest drop-shadow-sm">14×14 Correlation Matrix</h3>
          <p className="text-[10px] text-text-sub font-mono mt-1">Pearson Correlation (Pearson's r) • Filter: |r| &gt; 0.50</p>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-text-muted">
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-fin-blue rounded-sm shadow-[0_0_8px_#3B82F6]" /> <span className="text-fin-blue">+1.0</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-surface-bg border border-border-color rounded-sm" /> <span>N/A</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-trend-down rounded-sm shadow-[0_0_8px_#EF4444]" /> <span className="text-trend-down">-1.0</span></div>
        </div>
      </div>

      <div className="flex-1 overflow-auto scrollbar-hide pb-4 relative z-10 w-full h-full flex items-center justify-center">
        <div className="min-w-[650px] flex flex-col relative select-none">
          
          {/* Header Row */}
          <div className="flex ml-24 h-20 relative">
            {variables.map((col, i) => (
              <div key={i} className="flex-1 w-8 relative">
                <span className={`absolute bottom-2 left-1/2 -translate-x-1/2 -rotate-45 origin-bottom-left text-[9px] tracking-widest uppercase whitespace-nowrap transition-colors ${hoveredCell?.col === col ? 'text-white font-bold drop-shadow-md' : 'text-text-sub'}`}>
                  {col}
                </span>
              </div>
            ))}
          </div>

          {/* Matrix Body */}
          <div className="flex flex-col gap-[1px]">
            {matrix.map((rowArr, i) => (
              <div key={i} className="flex h-8 gap-[1px]">
                {/* Row Label */}
                <div className={`w-24 flex items-center justify-end pr-4 text-[9px] tracking-widest uppercase transition-colors ${hoveredCell?.row === variables[i] ? 'text-white font-bold drop-shadow-md' : 'text-text-sub'}`}>
                  {variables[i]}
                </div>
                
                {/* Cells array animated sequentially */}
                {rowArr.map((cell, j) => {
                  const isHovered = hoveredCell === cell;
                  const inCrosshair = hoveredCell?.row === cell.row || hoveredCell?.col === cell.col;
                  
                  let bgColor = 'rgba(255,255,255,0.02)';
                  let boxShadow = 'none';
                  
                  if (cell.value === 1) {
                    bgColor = 'rgba(255,255,255,0.9)';
                  } else if (cell.value !== null && cell.value > 0) {
                    const intense = Math.min(Math.max(cell.value, 0.1), 1);
                    bgColor = `rgba(59, 130, 246, ${intense})`;
                    if (intense > 0.6) boxShadow = `0 0 10px rgba(59,130,246,${intense})`;
                  } else if (cell.value !== null && cell.value < 0) {
                    const intense = Math.min(Math.max(Math.abs(cell.value), 0.1), 1);
                    bgColor = `rgba(239, 68, 68, ${intense})`;
                    if (intense > 0.6) boxShadow = `0 0 10px rgba(239,68,68,${intense})`;
                  }

                  const animDelay = (i * 0.03) + (j * 0.03);
                  
                  return (
                    <motion.div 
                      key={j}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: animDelay, type: "spring" }}
                      onMouseEnter={() => setHoveredCell(cell)}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`flex-1 relative cursor-crosshair border border-transparent transition-all duration-200 ${isHovered ? 'ring-2 ring-white ring-inset z-20 scale-125 rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'rounded-[1px]'} ${inCrosshair && !isHovered ? 'opacity-100' : ''} ${hoveredCell && !inCrosshair ? 'opacity-20' : 'opacity-100'}`}
                      style={{ backgroundColor: bgColor, boxShadow: isHovered ? undefined : boxShadow }}
                    >
                      {isHovered && cell.value !== null && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 p-2 bg-text-main text-surface-bg text-[10px] font-mono leading-tight rounded whitespace-nowrap shadow-[0_5px_15px_rgba(0,0,0,0.5)] z-50 pointer-events-none">
                          <span className="opacity-80 block mb-1">{cell.row} ↔ {cell.col}</span>
                          <span className="font-extrabold text-sm">{cell.value.toFixed(2)}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
};

export default CorrelationHeatmap;
