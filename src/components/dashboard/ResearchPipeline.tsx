import React from 'react';
import { Database, LineChart, Hash, Share2, Layers, Goal } from 'lucide-react';

const pipelineSteps = [
  { label: 'Yahoo Finance', icon: Database },
  { label: 'Market Data', icon: LineChart },
  { label: 'Data Cleaning', icon: Hash },
  { label: 'Log Return Transform', icon: Hash },
  { label: 'Correlation Matrix', icon: Share2 },
  { label: 'Financial Network', icon: Share2 },
  { label: 'SNA Centrality', icon: Goal },
  { label: 'GCN', icon: Layers },
  { label: 'Return Forecast', icon: LineChart },
  { label: 'Risk Intelligence', icon: Goal },
];

export const ResearchPipeline = () => {
  return (
    <div className="bg-surface-main rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-5 border-b border-border bg-gradient-to-r from-surface-main to-surface-secondary">
        <h3 className="text-lg font-bold text-text-primary">CONTAGION DETECTION PIPELINE</h3>
        <p className="text-xs text-text-secondary mt-1">SNA and GCN integrated into one cohesive analytical framework</p>
      </div>
      
      <div className="p-8 overflow-x-auto">
        <div className="flex items-center min-w-max">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === pipelineSteps.length - 1;
            
            return (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center group">
                  <div className="w-12 h-12 rounded-full border-2 border-border bg-surface-secondary flex items-center justify-center mb-3 group-hover:border-accent-primary group-hover:bg-accent-primary/5 transition-colors">
                    <Icon size={20} className="text-text-muted group-hover:text-accent-primary" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-text-secondary text-center max-w-[80px]">
                    {step.label}
                  </span>
                </div>
                
                {!isLast && (
                  <div className="w-12 h-0.5 bg-border mx-2 relative top-[-10px]" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResearchPipeline;
