import React, { useState } from 'react';
import { AlertCircle, ExternalLink, RefreshCw, GitBranch } from 'lucide-react';

export const ContradictionDetectorView: React.FC = () => {
  const [topic, setTopic] = useState('Benefit Sharing Obligation for AYUSH Practitioners');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const defaultItems = [
    {
      topic: "Benefit Sharing Obligation for Registered AYUSH Practitioners",
      source_a_title: "Biological Diversity Act, 2002 (Original Section 6)",
      source_a_requirement: "Mandatory ABS approval and benefit-sharing fee payment required for all users of Indian biological resources.",
      source_b_title: "Biological Diversity (Amendment) Act, 2023 (Amended Section 6)",
      source_b_requirement: "Registered AYUSH practitioners and codified traditional knowledge users are explicitly exempted from benefit-sharing fee obligations.",
      possible_explanation: "Legislative Amendment: The 2023 Amendment Act (effective April 2024) superseded the 2002 provision for AYUSH practitioners, while commercial IPR applicants retain mandatory NBA Form I notification.",
      source_a_url: "https://nbaindia.org/",
      source_b_url: "https://nbaindia.org/"
    },
    {
      topic: "Therapeutic Claims on Packaged Herbal Products",
      source_a_title: "Drugs and Cosmetics Rules 1945 (Rule 158-B)",
      source_a_requirement: "Therapeutic disease claims permitted under SLA Form 25-D License backed by textual Samhita citations or pilot safety trial data.",
      source_b_title: "Food Safety and Standards (Ayurveda Aahar) Regulations 2022 (Regulation 6)",
      source_b_requirement: "Mandatory front-of-pack advisory statement: 'Ayurveda Aahar product - Not for medicinal use'. Disease claims strictly prohibited.",
      possible_explanation: "Product Category Difference: Drugs & Cosmetics governs medicinal drugs (AYUSH SLA), whereas FSSAI governs food/dietary products. The applicable requirement depends on product regulatory classification.",
      source_a_url: "https://www.ayush.gov.in/",
      source_b_url: "https://www.fssai.gov.in/"
    }
  ];

  const handleDetect = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/evidence/contradictions', { method: 'POST' });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        setData({ apparent_contradictions: defaultItems });
      }
    } catch {
      setData({ apparent_contradictions: defaultItems });
    } finally {
      setLoading(false);
    }
  };

  const items = data?.apparent_contradictions || defaultItems;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-950 border border-amber-500/40 text-amber-400">
            <GitBranch className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Source Contradiction Detector</h2>
            <p className="text-xs text-slate-400">Identifies apparent contradictions between authoritative legal documents and explains dates, amendments, or category differences</p>
          </div>
        </div>

        <button
          onClick={handleDetect}
          disabled={loading}
          className="bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition shadow-lg cursor-pointer"
        >
          {loading ? 'Analyzing...' : 'Scan Contradictions'}
        </button>
      </div>

      {/* Contradictions List */}
      <div className="space-y-6">
        {items.map((item: any, idx: number) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center justify-center">
                {idx + 1}
              </span>
              <span>{item.topic}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{item.source_a_title}</span>
                <p className="text-xs text-slate-300 leading-relaxed">{item.source_a_requirement}</p>
                <a href={item.source_a_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-emerald-400 flex items-center space-x-1 font-semibold">
                  <span>Source A Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{item.source_b_title}</span>
                <p className="text-xs text-slate-300 leading-relaxed">{item.source_b_requirement}</p>
                <a href={item.source_b_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-emerald-400 flex items-center space-x-1 font-semibold">
                  <span>Source B Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl text-xs text-amber-200">
              <strong className="text-amber-300 font-bold">Reason for Apparent Contradiction: </strong>
              {item.possible_explanation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
