import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, useInView } from 'framer-motion';

const getMockForecast = (base: number) => {
  return Array.from({ length: 45 }).map((_, i) => {
    const val = base + Math.sin(i * 0.2) * 5 + (Math.random() * 2 - 1);
    const predVal = val + (Math.random() * 0.8 - 0.4);
    return {
      day: `T+${i+1}`,
      actual: Number(val.toFixed(2)),
      predicted: Number((predVal).toFixed(2))
    };
  });
};

const datasets: any = {
  banking: getMockForecast(100),
  ihsg: getMockForecast(7000),
  telecom: getMockForecast(50),
  consumer: getMockForecast(75),
  basic: getMockForecast(80),
  energy: getMockForecast(60),
};

export const ForecastChart = () => {
  const [activeSet, setActiveSet] = useState('banking');
  const [chartKey, setChartKey] = useState(0); // force re-render for line animation on swap
  
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSwap = (val: string) => {
    setActiveSet(val);
    setChartKey(prev => prev + 1);
  };

  return (
    <div ref={ref} className="bg-[#081225] border border-[rgba(96,165,250,0.16)] rounded-lg p-6 h-[500px] flex flex-col justify-between w-full">
      <div className="flex justify-between flex-wrap gap-4 items-center mb-4 relative z-20">
        <div>
          <h3 className="text-[12px] font-black text-white uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Out-of-Sample Predictive Forecasting</h3>
          <p className="text-[10px] text-ai-indigo font-mono font-bold mt-1 shadow-sm">GCN Predicted Returns (T+1)</p>
        </div>
        <select 
          value={activeSet}
          onChange={(e) => handleSwap(e.target.value)}
          className="bg-[#050B18] border border-[rgba(96,165,250,0.16)] text-white text-xs font-bold rounded-sm px-4 py-2 outline-none hover:border-fin-blue transition-colors focus:ring-1 focus:ring-fin-blue cursor-pointer drop-shadow-[0_0_8px_rgba(0,168,255,0.4)]"
        >
          <option value="ihsg">IHSG (Composite)</option>
          <option value="banking">Banking Sector</option>
          <option value="telecom">Telecommunications</option>
          <option value="consumer">Consumer Goods</option>
          <option value="basic">Basic Industry</option>
          <option value="energy">Energy Sector</option>
        </select>
      </div>

      <div className="flex-1 w-full mt-4">
        {isInView && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart key={chartKey} data={datasets[activeSet]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }} 
                tickLine={false} 
                axisLine={false} 
                dy={10} 
                interval={4} 
              />
              <YAxis 
                domain={['auto', 'auto']} 
                tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => val.toLocaleString()}
              />
              <Tooltip 
                cursor={{ stroke: '#8B5CF6', strokeWidth: 1, strokeDasharray: '4 4' }}
                contentStyle={{ 
                  backgroundColor: '#0B1224', 
                  borderRadius: '4px', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: 'bold'
                }}
                itemStyle={{ color: '#fff' }}
              />
              <Line 
                name="Actual (Ground Truth)"
                type="monotone" 
                dataKey="actual" 
                stroke="#64748B" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#64748B', stroke: '#fff', strokeWidth: 1 }}
                animationBegin={200}
                animationDuration={1500}
                animationEasing="ease-out"
                style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))' }}
              />
              <Line 
                name="GCN Prediction"
                type="monotone" 
                dataKey="predicted" 
                stroke="#60A5FA" 
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: '#60A5FA', stroke: '#fff', strokeWidth: 1 }}
                animationBegin={1200} // Draw sequences AFTER actual draws
                animationDuration={1500}
                animationEasing="ease-out"
                style={{ filter: 'drop-shadow(0 0 5px rgba(96,165,250,0.6))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex gap-6 justify-center mt-6 z-20 bg-[#060D20] py-2 border border-ai-indigo rounded relative backdrop-blur-sm shadow-[0_0_12px_rgba(139,92,246,0.25)]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-text-sub drop-shadow-sm" />
          <span className="text-[10px] font-bold text-text-sub uppercase tracking-widest">Ground Truth</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-electric-blue shadow-[0_0_5px_#60A5FA]" />
          <span className="text-[10px] font-bold text-electric-blue uppercase tracking-widest text-shadow-sm">GCN Forecast</span>
        </div>
      </div>
    </div>
  );
};

export default ForecastChart;
