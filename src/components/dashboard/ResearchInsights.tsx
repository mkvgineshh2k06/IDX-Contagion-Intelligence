import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightbulb, CheckCircle2, Workflow, Database } from 'lucide-react';

const insights = [
  {
    icon: Database,
    title: 'Data Constraints & Stationarity',
    desc: 'Input variables underwent first-difference transformations to strictly adhere to stationarity requirements for predictive modeling.',
    color: 'text-text-main'
  },
  {
    icon: Workflow,
    title: 'Topological Advantages of GCN',
    desc: 'Unlike LSTM, the GCN maps inter-node contagion flow explicitly. Negative shocks hitting highly central nodes transmit recursively across the edges, which GCN captures naturally via hidden layers.',
    color: 'text-ai-indigo',
    glow: 'rgba(139,92,246,0.3)'
  },
  {
    icon: CheckCircle2,
    title: 'Contagion Validity Confirmed',
    desc: 'The network confirmed measurable contagion effects originating from external macro factors (WTI/Brent) into the core IDX sectors during the Feb 2026 market stress event.',
    color: 'text-electric-blue',
    glow: 'rgba(96,165,250,0.3)'
  }
];

export const ResearchInsights = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 preserve-3d">
      {insights.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30, rotateX: 10 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.6, delay: idx * 0.2, type: "spring" }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`terminal-card p-6 border-t-2 transition-all cursor-default flex flex-col gap-4 ${item.glow ? `hover:shadow-[0_0_20px_${item.glow}]` : ''}`}
            style={{ borderTopColor: item.glow ? item.glow.replace('0.3', '1') : 'rgba(255,255,255,0.2)' }}
          >
            <div className={`w-8 h-8 rounded bg-surface-bg border border-border-color flex items-center justify-center ${item.color} shadow-sm`}>
              <Icon size={14} />
            </div>
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${item.color} drop-shadow-sm`}>{item.title}</h4>
              <p className="text-[11px] text-text-sub font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ResearchInsights;
