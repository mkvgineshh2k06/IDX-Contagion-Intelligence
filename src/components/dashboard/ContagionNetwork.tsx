import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, { 
  type Node, 
  type Edge, 
  Background, 
  useNodesState, 
  useEdgesState, 
  MarkerType, 
  Handle, 
  Position 
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, useInView } from 'framer-motion';

const nodeData = [
  { id: 'IHSG',     group: 'Domestic', centrality: 0.95 },
  { id: 'BANKING',  group: 'Domestic', centrality: 0.84 },
  { id: 'ENERGY',   group: 'Domestic', centrality: 0.42 },
  { id: 'TELECOM',  group: 'Domestic', centrality: 0.38 },
  { id: 'CONSUMER', group: 'Domestic', centrality: 0.65 },
  { id: 'BASIC_IND',group: 'Domestic', centrality: 0.61 },
  { id: 'WTI',      group: 'Global',   centrality: 0.20 },
  { id: 'BRENT',    group: 'Global',   centrality: 0.22 },
  { id: 'NAT_GAS',  group: 'Global',   centrality: 0.05 },
  { id: 'DXY',      group: 'Global',   centrality: 0.31 },
  { id: 'GOLD',     group: 'Global',   centrality: 0.25 },
  { id: 'US10Y',    group: 'Global',   centrality: 0.45 },
  { id: 'VIX',      group: 'Global',   centrality: 0.15 },
  { id: 'SP500',    group: 'Global',   centrality: 0.80 },
];

const edgeData = [
  { source: 'IHSG', target: 'BANKING', val: 0.77 },
  { source: 'IHSG', target: 'TELECOM', val: 0.78 },
  { source: 'IHSG', target: 'CONSUMER', val: 0.68 },
  { source: 'IHSG', target: 'BASIC_IND', val: 0.63 },
  { source: 'WTI', target: 'BRENT', val: 0.88 },
  { source: 'WTI', target: 'IHSG', val: -0.42 },
  { source: 'BRENT', target: 'IHSG', val: -0.46 },
  { source: 'DXY', target: 'WTI', val: 0.56 },
  { source: 'SP500', target: 'IHSG', val: 0.60 },
  { source: 'US10Y', target: 'IHSG', val: -0.30 },
];

// Custom 3D Dark Animated Node
const CustomNode = ({ data, selected }: any) => {
  const isGlobal = data.group === 'Global';
  return (
    <div className={`relative flex items-center justify-center rounded-full border-2 transition-all duration-300 ${isGlobal ? 'bg-[#101A31] border-ai-indigo shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'bg-[#0B1224] border-fin-blue shadow-[0_0_15px_rgba(59,130,246,0.3)]'} ${selected ? 'ring-4 ring-white ring-opacity-20 scale-110 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]' : ''}`} style={{ width: data.size, height: data.size }}>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <span className={`text-[10px] font-bold tracking-wider ${isGlobal ? 'text-ai-indigo' : 'text-fin-blue'} drop-shadow-md`}>{data.id}</span>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      
      {/* Pulse effect */}
      <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${isGlobal ? 'bg-ai-indigo' : 'bg-fin-blue'}`} style={{ animationDuration: '3s' }} />
    </div>
  );
};
const nodeTypes = { custom: CustomNode };

export const ContagionNetwork = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Grid layout placement
  const initialNodes: Node[] = nodeData.map((nd, i) => {
    let x, y;
    if (nd.group === 'Domestic') {
      x = 150 + Math.random() * 200;
      y = 150 + Math.random() * 200;
      if(nd.id === 'IHSG') { x = 250; y = 250; }
    } else {
      const angle = (i / 8) * Math.PI * 2;
      x = 250 + Math.cos(angle) * 350;
      y = 250 + Math.sin(angle) * 350;
    }
    const size = Math.max(50, nd.centrality * 120);
    return {
      id: nd.id,
      position: { x, y },
      type: 'custom',
      data: { id: nd.id, group: nd.group, size, centrality: nd.centrality }
    };
  });

  const initialEdges: Edge[] = edgeData.map((ed) => ({
    id: `e-${ed.source}-${ed.target}`,
    source: ed.source,
    target: ed.target,
    animated: true,
    style: { 
      stroke: ed.val > 0 ? '#3B82F6' : '#EF4444', 
      strokeWidth: Math.max(1, Math.abs(ed.val) * 4), 
      opacity: 0.6,
      filter: ed.val > 0 ? 'drop-shadow(0 0 5px rgba(59,130,246,0.6))' : 'drop-shadow(0 0 5px rgba(239,68,68,0.6))'
    },
    markerEnd: { type: MarkerType.ArrowClosed, color: ed.val > 0 ? '#3B82F6' : '#EF4444' }
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Stagger entrance via ReactFlow instances
  useEffect(() => {
    if (isInView) {
      setTimeout(() => setNodes(initialNodes), 200);
      setTimeout(() => setEdges(initialEdges), 1000);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="w-full h-[650px] terminal-card overflow-hidden flex flex-col perspective-container">
      <div className="p-6 pb-0 flex justify-between items-end relative z-20">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
          <h3 className="text-xl font-black text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">TOPOLOGICAL FINANCIAL NETWORK</h3>
          <p className="text-xs text-text-sub font-mono mt-1">Force-directed representation of systemic vulnerability | Filter: |r| &gt; 0.50</p>
        </motion.div>
        
        <div className="flex gap-4">
          <div className="flex flex-col border border-[#00F0FF] bg-[#060D20] rounded-sm p-3 text-xs w-32 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
            <span className="font-black text-[#F8FAFC] tracking-widest drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">DOMESTIC CORE</span>
            <span className="text-[#00F0FF] font-bold mt-1 uppercase text-[9px] tracking-wider">High Centrality Nodes</span>
          </div>
          <div className="flex flex-col border border-[#A855F7] bg-[#0B061A] rounded-sm p-3 text-xs w-32 shadow-[0_0_30px_rgba(168,85,247,0.6)]">
            <span className="font-black text-[#F8FAFC] tracking-widest drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">GLOBAL SYSTEMS</span>
            <span className="text-[#A78BFA] font-bold mt-1 uppercase text-[9px] tracking-wider">External Vectors</span>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.2, type: 'spring' }}
        className="flex-1 w-full relative z-10 preserve-3d"
      >
        {/* Dark ReactFlow canvas */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.2}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
          className="dark-react-flow"
        >
          {/* Faded Background dotted matrix */}
          <Background color="rgba(255,255,255,0.05)" size={1} gap={20} />
        </ReactFlow>

      </motion.div>
    </div>
  );
};

export default ContagionNetwork;
