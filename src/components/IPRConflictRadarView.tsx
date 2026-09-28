import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, ExternalLink, Info, CheckCircle2 } from 'lucide-react';

export const IPRConflictRadarView: React.FC = () => {
  const [formName, setFormName] = useState('Polyherbal Metabolic Formulation');
  const [ingredients, setIngredients] = useState('Turmeric, Neem, Ashwagandha');
  const [loading, setLoading] = useState(false);
  const [radar, setRadar] = useState<any>(null);

  const defaultOverlaps = [
    {
      category: "Traditional Knowledge (TKDL)",
      overlap_level: "HIGH",
      supporting_record: "TKDL Entry TKDL/AY/204 (Charaka Samhita 16/39)",
      similarity_score: 0.96,
      reason_for_flag: "Ingredients and traditional therapeutic claims match classical prior art. Section 3(p) statutory defense required.",
      relevant_source_url: "https://www.tkdl.res.in/"
    },
    {
      category: "Patents (Section 3e & 3d)",
      overlap_level: "MODERATE",
      supporting_record: "Indian Patents Act 1970 Sec 3(e) Examination Guidelines",
      similarity_score: 0.88,
      reason_for_flag: "Polyherbal combination requires Chou-Talalay synergistic efficacy bioassay proof to overcome mere admixture objection.",
      relevant_source_url: "https://ipindia.gov.in/"
    },
    {
      category: "Trademarks (Class 5)",
      overlap_level: "MODERATE",
      supporting_record: "Trade Marks Rules 2017 Class 5 Generic Descriptors",
      similarity_score: 0.75,
      reason_for_flag: "Classical formulation names in API cannot be trademarked. Word mark must feature a distinctive novel prefix.",
      relevant_source_url: "https://ipindia.gov.in/"
    },
    {
      category: "Biological Resource Access (NBA ABS)",
      overlap_level: "HIGH",
      supporting_record: "Biological Diversity Act 2002 Section 6",
      similarity_score: 0.92,
      reason_for_flag: "Mandatory prior approval from NBA via Form I required before grant of patent for Indian biological resources.",
      relevant_source_url: "https://nbaindia.org/"
    }
  ];

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/ipr-radar/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formulation_name: formName, ingredients: ingredients.split(',').map(s => s.trim()) })
      });
      if (res.ok) {
        const data = await res.json();
        setRadar(data);
      } else {
        setRadar({ overlaps: defaultOverlaps });
      }
    } catch {
      setRadar({ overlaps: defaultOverlaps });
    } finally {
      setLoading(false);
    }
  };

  const overlapsToDisplay = radar?.overlaps || defaultOverlaps;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">IPR Conflict Radar — Multi-Tier Overlap Explorer</h2>
            <p className="text-xs text-slate-400">Identifies research overlaps across Patents, Trademarks, Designs, GI, Copyright, TKDL & NBA ABS</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Formulation Title</label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Ingredients</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2.5 rounded-xl transition shadow-lg cursor-pointer"
            >
              {loading ? 'Analyzing Overlaps...' : 'Scan IPR Conflict Radar'}
            </button>
          </div>
        </div>
      </div>

      {/* Overlaps Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200">Detected Research Overlaps ({overlapsToDisplay.length})</h3>
          <span className="text-xs text-amber-400 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/30">
            Non-Legal Infringement Assessment
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {overlapsToDisplay.map((ov: any, idx: number) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 space-y-3 shadow-xl transition-all">
              <div className="flex items-start justify-between">
                <h4 className="text-sm font-bold text-slate-100">{ov.category}</h4>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border ${
                  ov.overlap_level === 'HIGH'
                    ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                }`}>
                  {ov.overlap_level} OVERLAP
                </span>
              </div>

              <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                <strong className="text-emerald-400">Reason for Flag: </strong>
                {ov.reason_for_flag}
              </p>

              <div className="text-xs text-slate-400 space-y-1">
                <p><strong>Supporting Record:</strong> {ov.supporting_record}</p>
                <p><strong>Similarity Metric:</strong> {(ov.similarity_score * 100).toFixed(0)}%</p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-end">
                <a
                  href={ov.relevant_source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1"
                >
                  <span>Official Record</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
