import React from 'react';
import DashboardShell from './components/layout/DashboardShell';
import ExecutiveOverview from './components/dashboard/ExecutiveOverview';
import MarketContext from './components/dashboard/MarketContext';
import GlobalIndicatorPanel from './components/dashboard/GlobalIndicatorPanel';
import CorrelationHeatmap from './components/dashboard/CorrelationHeatmap';
import ContagionNetwork from './components/dashboard/ContagionNetwork';
import CentralityRanking from './components/dashboard/CentralityRanking';
import GCNArchitecture from './components/dashboard/GCNArchitecture';
import ForecastChart from './components/dashboard/ForecastChart';
import ModelComparison from './components/dashboard/ModelComparison';
import ResearchInsights from './components/dashboard/ResearchInsights';
import { motion } from 'framer-motion';

const SectionWrapper = ({ children, id, className }: any) => (
  <motion.section 
    id={id} 
    className={className}
    initial={{ opacity: 0, scale: 0.92, rotateX: 4, y: 60 }}
    whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
    style={{ transformStyle: "preserve-3d" }}
  >
    {children}
  </motion.section>
);

function App() {
  return (
    <DashboardShell>
      {/* 1. Dashboard Overview */}
      <SectionWrapper id="dashboard" className="pt-10 scroll-mt-32">
        <ExecutiveOverview />
      </SectionWrapper>

      {/* 2. Market Context */}
      <SectionWrapper id="context" className="scroll-mt-32">
        <MarketContext />
      </SectionWrapper>

      {/* 3. Market Topography Network */}
      <SectionWrapper id="network" className="scroll-mt-32">
        <div className="flex flex-col xl:flex-row gap-6 items-start">
          <ContagionNetwork />
          <GlobalIndicatorPanel />
        </div>
      </SectionWrapper>

      {/* 4. Contagion Risk / Correlations */}
      <SectionWrapper id="contagion" className="scroll-mt-32 flex flex-col xl:flex-row gap-6">
        <div className="xl:w-2/3">
          <CorrelationHeatmap />
        </div>
        <div className="xl:w-1/3">
          <CentralityRanking />
        </div>
      </SectionWrapper>

      {/* 5. GCN Forecast & Deep Learning Architecture */}
      <SectionWrapper id="forecast" className="scroll-mt-32 pb-4">
        <GCNArchitecture />
        <div className="mt-16">
          <ForecastChart />
        </div>
      </SectionWrapper>

      {/* 6. Model Performance & Findings */}
      <SectionWrapper id="performance" className="scroll-mt-32">
        <div className="flex flex-col xl:flex-row gap-6 items-start">
          <div className="xl:w-1/3 min-w-[350px]">
            <ModelComparison />
          </div>
          <div className="xl:w-2/3 mt-6 xl:mt-0" id="research">
             <div className="mb-4">
               <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest px-1">Empirical Research Findings</h3>
             </div>
             <ResearchInsights />
          </div>
        </div>
      </SectionWrapper>
      
    </DashboardShell>
  );
}

export default App;
