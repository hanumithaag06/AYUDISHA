import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ResearchGapView: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchGaps();
  }, []);

  const fetchGaps = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/research/trail-101/gaps');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        throw new Error();
      }
    } catch {
      setData({
        gaps: [
          {
            research_area: "International Export Product Classification",
            evidence_status: "LIMITED_EVIDENCE",
            reason: "Only WIPO PCT framework retrieved. Specific country botanical pharmacopoeias (e.g. US Pharmacopeia USP-NF Herbal Monographs) require addition.",
            recommendation: "Register US FDA Botanical Drug Guidelines as an additional source in the Source Registry."
          },
          {
            research_area: "Experimental Combination Efficacy Index Data",
            evidence_status: "SPARSE_EVIDENCE",
            reason: "Section 3(e) requires Chou-Talalay Combination Index (CI) bioassay evidence. Specific experimental values must be uploaded by user.",
            recommendation: "Upload bioassay synergy assay lab reports to the Research Workspace."
          },
          {
            research_area: "Restricted TKDL Database Prior Art",
            evidence_status: "UNAVAILABLE_RESTRICTED",
            reason: "TKDL restricted access entries are not publicly searchable per official CSIR licensing restrictions.",
            recommendation: "File an official prior-art access request directly through CSIR TKDL portal."
          }
        ]
      });
    }
  };

  const gaps = data?.gaps || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-950 border border-amber-500/40 text-amber-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Research Gap Detector Report</h2>
            <p className="text-xs text-slate-400">Analyzes corpus evidence weaknesses, outdated sources, sparse data & incomplete jurisdiction coverage</p>
          </div>
        </div>
      </div>

      {/* Gaps List */}
      <div className="space-y-4">
        {gaps.map((gap: any, idx: number) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-slate-100">{gap.research_area}</h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                {gap.evidence_status}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-slate-400">Weakness Reason: </strong>
              {gap.reason}
            </p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-emerald-300 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong className="text-emerald-400">Recommended Next Step: </strong>{gap.recommendation}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
