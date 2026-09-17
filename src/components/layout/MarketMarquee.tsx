import React from 'react';
import clsx from 'clsx';

const tickerData = [
  { label: 'BANKING', val: '▼', isUp: false, isNeutral: false },
  { label: 'ENERGY', val: '│', isUp: true, isNeutral: true },
  { label: 'TELECOM', val: '▲', isUp: true, isNeutral: false },
  { label: 'CONSUMER', val: '▼', isUp: false, isNeutral: false },
  { label: 'BASIC IND', val: '│', isUp: false, isNeutral: true },
  { label: 'WTI', val: '▲', isUp: true, isNeutral: false },
  { label: 'BRENT', val: '▲', isUp: true, isNeutral: false },
  { label: 'GOLD', val: '▲', isUp: true, isNeutral: false },
  { label: 'NAT GAS', val: '▼', isUp: false, isNeutral: false },
  { label: 'DXY', val: '▲', isUp: true, isNeutral: false },
  { label: 'US10Y', val: '▼', isUp: false, isNeutral: false },
  { label: 'VIX', val: '▲', isUp: true, isNeutral: false },
  { label: 'S&P500', val: '▼', isUp: false, isNeutral: false },
];

export const MarketMarquee = () => {
  return (
    <div 
      className="w-full bg-[#020617] opacity-100 flex items-center overflow-hidden flex-shrink-0 z-[9999] fixed top-0 select-none shadow-[0_4px_20px_-5px_rgba(0,0,0,0.8)]"
      style={{
        height: '40px',
        borderBottom: '1px solid rgba(0,245,255,0.18)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <div 
        className="flex whitespace-nowrap animate-marquee-infinite"
        style={{ width: 'fit-content' }}
      >
        {/* Render two identical sets of the items to ensure seamless flow */}
        {[...Array(2)].map((_, groupIdx) => (
          <div key={groupIdx} className="flex gap-16 px-8 items-center h-full"> 
            {tickerData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 cursor-default group hover:brightness-150 transition-all duration-300">
                <span className="text-[10px] font-bold text-text-sub group-hover:text-white transition-colors tracking-widest uppercase">{item.label}</span>
                <span className={clsx(
                  "text-[10px] font-black drop-shadow-sm",
                  item.isNeutral ? "text-electric-blue" : (item.isUp ? "text-trend-up" : "text-trend-down")
                )}>
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketMarquee;
