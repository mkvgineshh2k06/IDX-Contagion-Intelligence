import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import { motion, useInView } from 'framer-motion';

const ihsgData = [
  { date: 'Jan 15', value: 8350 },
  { date: 'Feb 15', value: 8235.49 }, // Pre-shock
  { date: 'Feb 28', value: 7600 },
  { date: 'Mar 15', value: 7100 },
  { date: 'Market Bottom', value: 6969.40 }, // Peak drop
  { date: 'Apr 15', value: 7200 },
  { date: 'May 15', value: 7400 },
];

const timelineEvents = [
  "US/Israel strikes on Iran",
  "Crude oil surge",
  "Global market stress",
  "IHSG decline",
  "Sector transmission",
  "Network analysis",
  "GCN forecasting"
];

export const MarketContext = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="space-y-12 w-full perspective-container" ref={ref}>
      
      {/* Horizontal Cinematic Timeline */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="terminal-card p-8 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none text-9xl font-black italic">
          SHOCK
        </div>
        
        <h3 className="text-[10px] font-bold text-fin-blue uppercase tracking-widest mb-10 shadow-sm flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-fin-blue animate-ping" /> Market Shock Event Timeline — Feb 28, 2026
        </h3>
        
        <div className="relative flex justify-between items-center w-full max-w-5xl mx-auto pb-6">
          <div className="absolute top-3 left-0 w-full h-[1px] bg-border-color z-0" />
          
          <motion.div 
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-3 left-0 h-[2px] bg-gradient-to-r from-fin-blue via-trend-up to-ai-indigo z-0 shadow-[0_0_10px_#3B82F6]" 
          />
          
          {timelineEvents.map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + (idx * 0.4), type: 'spring' }}
              className="relative z-10 flex flex-col items-center gap-4 group"
            >
              <div className="w-6 h-6 rounded-full bg-surface-panel border-2 border-fin-blue flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-transform duration-300 group-hover:scale-125 cursor-crosshair">
                <div className={`w-1.5 h-1.5 rounded-full ${idx === 3 || idx === 1 ? 'bg-trend-down shadow-[0_0_10px_#EF4444]' : 'bg-electric-blue'} animate-pulse`} />
              </div>
              <div className="w-28 text-center preserve-3d group-hover:translate-z-4 transition-transform">
                <span className={`text-[10px] font-bold leading-tight uppercase transition-colors filter drop-shadow-md ${idx === 0 ? 'text-text-main' : 'text-text-sub group-hover:text-white'}`}>
                  {event}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* IHSG Impact Stats */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="xl:w-1/4 flex flex-col gap-4"
        >
          <div className="terminal-card p-6 bg-gradient-to-br from-[#101A31] to-[#050816] border-t-2 border-t-trend-down">
            <span className="text-[10px] font-bold text-trend-down/80 uppercase tracking-widest space-x-1 block mb-3">
              <span className="w-2 h-2 inline-block bg-trend-down rounded-full animate-ping mr-1" />
              Market Shock Decline
            </span>
            <div className="flex justify-between items-end mt-4 border-b border-border-color pb-4">
              <div>
                <span className="block text-[10px] tracking-wider uppercase font-bold text-text-sub">Pre-Shock</span>
                <span className="text-2xl font-mono text-text-main drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">8,235.49</span>
              </div>
              <span className="text-text-muted mx-2 mb-1">→</span>
              <div className="text-right">
                <span className="block text-[10px] tracking-wider uppercase font-bold text-text-sub">Trough</span>
                <span className="text-2xl font-mono text-trend-down font-bold drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]">6,969.40</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-text-sub uppercase tracking-wider">Max Drawdown</span>
              <span className="text-2xl font-black text-trend-down drop-shadow-md">-15.37%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 flex-1">
            <motion.div whileHover={{ scale: 1.02 }} className="terminal-card p-5 flex flex-col justify-center border-l-2 border-l-trend-down/50">
               <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest block mb-1">1-Month Return</span>
               <span className="text-xl font-mono text-text-main font-bold">-4.26%</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="terminal-card p-5 flex flex-col justify-center border-l-2 border-l-trend-down/70">
               <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest block mb-1">3-Month Return</span>
               <span className="text-xl font-mono text-trend-down font-bold">-12.17%</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="terminal-card p-5 flex flex-col justify-center col-span-2 lg:col-span-1 border-l-2 border-l-trend-down/90">
               <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest block mb-1">6-Month Decline</span>
               <span className="text-xl font-mono text-trend-down font-bold drop-shadow-sm">approx. -16.98%</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Quant-Style Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="xl:w-3/4 terminal-card p-6 flex flex-col h-[450px]"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-[11px] font-black text-white uppercase tracking-widest drop-shadow-sm">IHSG Pricing Action</h3>
              <p className="text-[10px] text-text-sub font-mono mt-1">Study Period: Jan 2025 - May 2026</p>
            </div>
            <div className="flex gap-2 text-xs">
              <button className="px-3 py-1 bg-surface-bg border border-border-color rounded text-text-sub font-bold hover:bg-surface-elevated transition-colors">1M</button>
              <button className="px-3 py-1 bg-surface-bg border border-border-color rounded text-text-sub font-bold hover:bg-surface-elevated transition-colors">3M</button>
              <button className="px-3 py-1 bg-fin-blue text-white rounded font-bold shadow-[0_0_10px_rgba(59,130,246,0.3)]">6M</button>
            </div>
          </div>
          
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ihsgData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIHSG_Dark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }} 
                  dy={10}
                />
                <YAxis 
                  domain={['dataMin - 100', 'dataMax + 100']} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }} 
                  tickFormatter={(val) => val.toLocaleString()}
                />
                <Tooltip
                  cursor={{ stroke: '#60A5FA', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ 
                    backgroundColor: '#0B1224', 
                    borderRadius: '4px', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                    fontFamily: 'monospace',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#60A5FA', fontWeight: 'bold' }}
                  formatter={(value: any) => [`${Number(value).toLocaleString()}`, 'IHSG']}
                />
                
                {/* Shock Area Highlight */}
                <ReferenceArea x1="Feb 15" x2="Mar 15" fill="#EF4444" fillOpacity={0.05} />
                
                {/* Event Marker */}
                <ReferenceLine 
                  x="Feb 28" 
                  stroke="#EF4444" 
                  strokeDasharray="4 4" 
                  label={{ 
                    position: 'top', 
                    value: 'FEB 28, 2026 MARKET SHOCK', 
                    fill: '#EF4444', 
                    fontSize: 10, 
                    fontWeight: 'bold', 
                    fontFamily: 'sans-serif' 
                  }} 
                />
                
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#60A5FA" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorIHSG_Dark)" 
                  animationBegin={500}
                  animationDuration={2000}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default MarketContext;
