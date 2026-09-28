import React, { useState } from 'react';
import { Sliders, RefreshCw, ArrowRight, CheckCircle2, FileText } from 'lucide-react';

export const RegulatorySimulatorView: React.FC = () => {
  const [productName, setProductName] = useState('Nimbadi Health Formula');
  const [currentCategory, setCurrentCategory] = useState('Food / Ayurveda-Aahar');
  const [proposedCategory, setProposedCategory] = useState('Medicinal Drug (AYUSH SLA)');
  const [currentMarket, setCurrentMarket] = useState('Domestic India');
  const [proposedMarket, setProposedMarket] = useState('Export USA/EU');
  const [loading, setLoading] = useState(false);
  const [simulation, setSimulation] = useState<any>(null);

  const defaultRecomputed = [
    {
      area: "Licensing & Manufacturing Authority",
      old_requirement: "FSSAI Food License under Ayurveda-Aahar Regulations 2022",
      new_requirement: "State Licensing Authority (AYUSH SLA) Form 25-D License with Schedule T GMP certification",
      action_needed: "Transition factory layout to Schedule T audit compliance and submit raw herb botanical identification logs."
    },
    {
      area: "Biological Resource Access & Export Clearance (NBA)",
      old_requirement: "Domestic procurement compliance",
      new_requirement: "NBA Form III Export Approval & Form I IPR filing prior to overseas patent grant",
      action_needed: "File Form III with National Biodiversity Authority for sending biological samples overseas for clinical testing."
    },
    {
      area: "International Regulatory Pathway (US FDA / EU)",
      old_requirement: "Indian domestic food supplement label",
      new_requirement: "US FDA Botanical Drug NDA pathway or DSHEA Dietary Supplement (No therapeutic disease claims without IND)",
      action_needed: "Perform HPLC batch-to-batch chemical fingerprinting for US FDA compliance."
    }
  ];

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/regulatory/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_name: productName,
          current_category: currentCategory,
          proposed_category: proposedCategory,
          current_market: currentMarket,
          proposed_market: proposedMarket
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSimulation(data);
      } else {
        setSimulation({ recomputed_requirements: defaultRecomputed });
      }
    } catch {
      setSimulation({ recomputed_requirements: defaultRecomputed });
    } finally {
      setLoading(false);
    }
  };

  const items = simulation?.recomputed_requirements || defaultRecomputed;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Regulatory Impact Simulator</h2>
            <p className="text-xs text-slate-400">Model hypothetical product attribute changes (Category, Market) and recompute research pathways</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Current Category</label>
            <select
              value={currentCategory}
              onChange={(e) => setCurrentCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300 focus:outline-none"
            >
              <option value="Food / Ayurveda-Aahar">Food / Ayurveda-Aahar</option>
              <option value="Medicinal Drug (AYUSH SLA)">Medicinal Drug (AYUSH SLA)</option>
              <option value="Cosmetic">Cosmetic</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Proposed Category</label>
            <select
              value={proposedCategory}
              onChange={(e) => setProposedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300 focus:outline-none"
            >
              <option value="Medicinal Drug (AYUSH SLA)">Medicinal Drug (AYUSH SLA)</option>
              <option value="Food / Ayurveda-Aahar">Food / Ayurveda-Aahar</option>
              <option value="Phytopharmaceutical">Phytopharmaceutical</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Target Market</label>
            <select
              value={proposedMarket}
              onChange={(e) => setProposedMarket(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300 focus:outline-none"
            >
              <option value="Export USA/EU">Export USA/EU</option>
              <option value="Domestic India">Domestic India</option>
              <option value="Global Multilateral">Global Multilateral</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSimulate}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2.5 rounded-xl transition shadow-lg cursor-pointer"
            >
              {loading ? 'Simulating...' : 'Run Simulation'}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-200">Recomputed Regulatory Impact & Research Requirements</h3>

        <div className="space-y-4">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
              <h4 className="text-sm font-bold text-emerald-300 flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span>{item.area}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Previous Requirement</span>
                  <p className="text-slate-300 mt-1">{item.old_requirement}</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/30">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">New Requirement</span>
                  <p className="text-emerald-200 font-semibold mt-1">{item.new_requirement}</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <strong className="text-emerald-400">Action Plan: </strong>
                {item.action_needed}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
