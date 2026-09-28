import React, { useState, useEffect } from 'react';
import { GitCommit, Layers, ArrowRight, Share2, Database, Shield } from 'lucide-react';

export const KnowledgeGraphView: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchGraph();
  }, []);

  const fetchGraph = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/knowledge-graph/traverse');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        throw new Error();
      }
    } catch {
      setData({
        nodes: [
          { id: "n-prod", label: "Polyherbal Formulation (Haridra + Nimba)", node_type: "PRODUCT" },
          { id: "n-ing1", label: "Haridra (Curcuma longa)", node_type: "INGREDIENT" },
          { id: "n-ing2", label: "Nimba (Azadirachta indica)", node_type: "INGREDIENT" },
          { id: "n-tk", label: "TKDL/AY/204 Prior Art (Charaka Samhita)", node_type: "TK" },
          { id: "n-reg1", label: "Indian Patents Act Sec 3(p) & 3(e)", node_type: "REGULATION" },
          { id: "n-reg2", label: "Biological Diversity Act Sec 6", node_type: "REGULATION" },
          { id: "n-auth1", label: "National Biodiversity Authority (NBA)", node_type: "AUTHORITY" },
          { id: "n-auth2", label: "AYUSH State Licensing Authority (SLA)", node_type: "AUTHORITY" },
          { id: "n-jur", label: "India Legal Framework", node_type: "JURISDICTION" }
        ],
        edges: [
          { id: "e-1", source_id: "n-prod", target_id: "n-ing1", relationship: "CONTAINS" },
          { id: "e-2", source_id: "n-prod", target_id: "n-ing2", relationship: "CONTAINS" },
          { id: "e-3", source_id: "n-ing1", target_id: "n-tk", relationship: "BELONGS_TO" },
          { id: "e-4", source_id: "n-prod", target_id: "n-reg1", relationship: "REQUIRES" },
          { id: "e-5", source_id: "n-prod", target_id: "n-reg2", relationship: "REQUIRES" },
          { id: "e-6", source_id: "n-reg2", target_id: "n-auth1", relationship: "APPLIES_TO" },
          { id: "e-7", source_id: "n-reg1", target_id: "n-jur", relationship: "BELONGS_TO" }
        ]
      });
    }
  };

  const nodes = data?.nodes || [];
  const edges = data?.edges || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Regulatory Dependency & Knowledge Graph</h2>
            <p className="text-xs text-slate-400">Traverse entity relationships connecting Products, Botanical Ingredients, TKDL Prior Art, Regulations & Authorities</p>
          </div>
        </div>
      </div>

      {/* Visual Graph Nodes */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <h3 className="text-sm font-bold text-slate-200">Extracted Entity Nodes ({nodes.length})</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nodes.map((n: any, idx: number) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-emerald-500/40 transition">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                {n.node_type}
              </span>
              <h4 className="text-xs font-bold text-slate-200 leading-snug">{n.label}</h4>
              <span className="text-[10px] text-slate-500 font-mono">ID: {n.id}</span>
            </div>
          ))}
        </div>

        {/* Relationships List */}
        <h3 className="text-sm font-bold text-slate-200 pt-4 border-t border-slate-800">Dynamic Relationships ({edges.length})</h3>

        <div className="space-y-2">
          {edges.map((e: any, idx: number) => {
            const sourceNode = nodes.find((n: any) => n.id === e.source_id);
            const targetNode = nodes.find((n: any) => n.id === e.target_id);
            return (
              <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">{sourceNode?.label || e.source_id}</span>
                <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
                  -- {e.relationship} --&gt;
                </span>
                <span className="text-slate-300 font-medium">{targetNode?.label || e.target_id}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
