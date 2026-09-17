import React from 'react';
import { 
  LayoutDashboard, 
  Network, 
  TableProperties, 
  AlertTriangle,
  BrainCircuit,
  BarChart3,
  Lightbulb,
  FileText
} from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'context', label: 'Market Context', icon: BarChart3 },
  { id: 'network', label: 'Market Network', icon: Network },
  { id: 'contagion', label: 'Contagion Risk', icon: AlertTriangle },
  { id: 'forecast', label: 'GCN Forecast', icon: BrainCircuit },
  { id: 'performance', label: 'Model Metrics', icon: TableProperties },
  { id: 'research', label: 'Research Info', icon: Lightbulb },
];

const ScrollProgress = ({ activeSection }: { activeSection: string }) => {
  const currentIndex = navItems.findIndex(i => i.id === activeSection);
  const progress = Math.max(0, currentIndex / (navItems.length - 1));

  return (
    <div className="w-full h-1 bg-surface-elevated mt-4 relative rounded overflow-hidden">
      <motion.div 
        className="absolute left-0 top-0 bottom-0 bg-fin-blue shadow-[0_0_10px_#3B82F6]"
        initial={{ width: 0 }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
};

export const Sidebar = ({ activeSection, onNavigate }: { activeSection: string, onNavigate: (id: string) => void }) => {
  return (
      <aside className="w-64 flex-shrink-0 bg-[#030510] border-r border-[#15234B] fixed left-0 top-10 h-[calc(100vh-40px)] overflow-y-auto flex flex-col z-50 shadow-[5px_0_30px_rgba(0,0,0,0.5)]">
      
      <div className="p-6 border-b border-border-color relative overflow-hidden">
        <div className="absolute inset-0 bg-ai-glow opacity-30" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-fin-blue to-ai-indigo flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-white/10">
            I
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-[15px] tracking-tight leading-none text-text-main">IDX</span>
            <span className="font-semibold text-xs tracking-widest text-[#94A3B8] mt-0.5">CONTAGION</span>
          </div>
        </div>
        
        <ScrollProgress activeSection={activeSection} />
      </div>

      <nav className="flex-1 py-4 flex flex-col gap-2 px-3">
        <div className="px-3 mb-2">
          <span className="text-[9px] font-bold tracking-widest text-text-muted uppercase">Intelligence Menu</span>
        </div>
        {navItems.map((item, idx) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onNavigate(item.id)}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded transition-all duration-300 relative group overflow-hidden",
                isActive 
                  ? "text-white bg-fin-blue/10 border border-fin-blue/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]" 
                  : "text-text-sub hover:bg-surface-elevated hover:text-text-main border border-transparent"
              )}
            >
              <div className={clsx(
                "absolute left-0 top-0 bottom-0 w-1 transition-all duration-300",
                isActive ? "bg-fin-blue shadow-[0_0_10px_#00F0FF]" : "bg-transparent group-hover:bg-border-color"
              )} />
              
              <Icon size={16} className={clsx("transition-colors relative z-10 duration-300", isActive ? 'text-fin-blue drop-shadow-[0_0_5px_rgba(0,240,255,1)]' : 'text-text-muted group-hover:text-text-main')} />
              <span className="relative z-10 tracking-wide text-xs">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-[rgba(96,165,250,0.16)] bg-[#030510]">
        <div className="bg-[#02040A] rounded-sm p-3 relative overflow-hidden border border-[rgba(255,255,255,0.05)] shadow-sm group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-text-main/5 to-transparent -translate-x-full group-hover:animate-[marquee_2s_linear] pointer-events-none" />
          <span className="block text-[9px] font-bold text-text-muted uppercase tracking-wider mb-1">State</span>
          <div className="flex items-center gap-2 text-xs font-semibold text-text-main">
            <div className="w-1.5 h-1.5 rounded-full bg-status-cyan shadow-[0_0_8px_#22D3EE] animate-pulse-subtle" />
            Node Connected
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
