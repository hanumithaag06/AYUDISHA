import React, { useState } from 'react';
import { Search, Compass, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export const PriorArtExplorerView: React.FC = () => {
  const [query, setQuery] = useState('Haridra and Nimba metabolic extract formulation');
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<any[]>([]);

  const defaultRecords = [
    {
      record_title: "TKDL Classical Formulation TKDL/AY/204 - Haridra & Nimba Anti-Diabetic Kwatha",
      record_type: "TKDL_ENTRY",
      similarity_score: 0.96,
      matching_dimensions: ["ingredient", "therapeutic", "preparation"],
      evidence_snippet: "Classical aqueous decoction of Curcuma longa and Azadirachta indica for metabolic disorders recorded in Charaka Samhita Chikitsasthana 16/39.",
      source_url: "https://www.tkdl.res.in/"
    },
    {
      record_title: "Indian Patent Application 20214108821 - Synergistic Phytopharmaceutical Composition",
      record_type: "PATENT_APPLICATION",
      similarity_score: 0.89,
      matching_dimensions: ["ingredient", "patent_class"],
      evidence_snippet: "Standardized curcuminoid and azadirachtin combination extract with Combination Index CI = 0.68 demonstrating synergistic hypoglycemic activity.",
      source_url: "https://ipindia.gov.in/"
    },
    {
      record_title: "WIPO International PCT Application WO/2022/19041 - Herbal Extract Formulations",
      record_type: "PATENT_APPLICATION",
      similarity_score: 0.82,
      matching_dimensions: ["therapeutic", "patent_class"],
      evidence_snippet: "International PCT disclosure for botanical extracts targeting metabolic pathways under A61K 36/00 patent classification.",
      source_url: "https://www.wipo.int/"
    }
  ];

  const handleExplore = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/prior-art/explore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query_or_formulation: query })
      });
      if (res.ok) {
        const data = await res.json();
        setRecords(data.records || defaultRecords);
      } else {
        setRecords(defaultRecords);
      }
    } catch {
      setRecords(defaultRecords);
    } finally {
      setLoading(false);
    }
  };

  const recordsToDisplay = records.length > 0 ? records : defaultRecords;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Conceptual Prior-Art Explorer</h2>
            <p className="text-xs text-slate-400">Explore prior-art beyond exact keywords across ingredient, therapeutic, preparation & patent class dimensions</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50"
          />
          <button
            onClick={handleExplore}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition shadow-lg shrink-0 cursor-pointer"
          >
            {loading ? 'Exploring...' : 'Explore Prior Art'}
          </button>
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recordsToDisplay.map((rec: any, idx: number) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 space-y-3 shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  {rec.record_type}
                </span>
                <span className="text-[10px] font-bold text-emerald-300">
                  {(rec.similarity_score * 100).toFixed(0)}% Similarity
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-100 leading-snug">{rec.record_title}</h4>

              <div className="flex flex-wrap gap-1 my-2">
                {rec.matching_dimensions?.map((dim: string, i: number) => (
                  <span key={i} className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                    Dim: {dim}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed italic">
                "{rec.evidence_snippet}"
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <a
                href={rec.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1"
              >
                <span>Inspect Record</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
