import React, { useState } from 'react';
import { Layers, Globe, ArrowRightLeft, CheckCircle2, FileText } from 'lucide-react';

export const JurisdictionCompareView: React.FC = () => {
  const [topic, setTopic] = useState('Traditional Herbal IP & Regulatory Requirements');
  const [jurisdictionA, setJurisdictionA] = useState('India');
  const [jurisdictionB, setJurisdictionB] = useState('USA');
  const [loading, setLoading] = useState(false);
  const [comparison, setComparison] = useState<any>(null);

  const defaultPoints = [
    {
      criterion: "Patentability of Traditional Herbal Formulations",
      position_jurisdiction_a: "Excluded under Section 3(p) as traditional knowledge; requires proof of synergistic therapeutic efficacy under Section 3(e).",
      position_jurisdiction_b: "US Patent Law allows botanical extract combination patents if non-obviousness and utility are proven, but USPTO references India's TKDL database during examination.",
      key_difference: "India strictly excludes non-synergistic classical combinations, whereas US permits them subject to prior art rejection via TKDL disclosures.",
      citation_a: "Indian Patents Act, 1970 - Section 3(p) & 3(e)",
      citation_b: "35 U.S.C. 102 / 103 (USPTO Manual of Patent Examining Procedure)"
    },
    {
      criterion: "Biological Resource & Genetic Resource Access (ABS)",
      position_jurisdiction_a: "Mandatory prior approval from National Biodiversity Authority (NBA Form I) before IPR grant under Biological Diversity Act.",
      position_jurisdiction_b: "US is not a party to the Nagoya Protocol, but WIPO 2024 Treaty mandates mandatory disclosure of origin of genetic resources in patent filings.",
      key_difference: "India enforces national ABS benefit-sharing fees (0.1%-0.5%), while US relies on international WIPO origin disclosure declarations.",
      citation_a: "Biological Diversity Act, 2002 - Section 6",
      citation_b: "WIPO Treaty on IP, Genetic Resources and Associated TK (2024)"
    },
    {
      criterion: "Product Regulatory Commercialization Pathway",
      position_jurisdiction_a: "Dual pathway: Form 25-D AYUSH Drug License (AYUSH SLA) for medicinal claims OR FSSAI Ayurveda-Aahar for food supplement.",
      position_jurisdiction_b: "US FDA Botanical Drug NDA pathway (requires clinical trial batches & fingerprinting) OR Dietary Supplement (DSHEA 1994, no therapeutic disease claims allowed).",
      key_difference: "India allows therapeutic claims under traditional Ayurvedic texts via Form 25-D without full Phase III IND, whereas US FDA requires full NDA for disease claims.",
      citation_a: "Drugs & Cosmetics Rules 1945 Rule 158-B & FSSAI 2022",
      citation_b: "US FDA Guidance for Industry: Botanical Drug Development (2016)"
    }
  ];

  const handleCompare = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/regulations/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic,
          jurisdiction_a: jurisdictionA,
          jurisdiction_b: jurisdictionB
        })
      });
      if (res.ok) {
        const data = await res.json();
        setComparison(data);
      } else {
        setComparison({ comparison_points: defaultPoints });
      }
    } catch {
      setComparison({ comparison_points: defaultPoints });
    } finally {
      setLoading(false);
    }
  };

  const pointsToDisplay = comparison?.comparison_points || defaultPoints;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Jurisdiction Compare — Multi-Country Regulatory Matrix</h2>
            <p className="text-xs text-slate-400">Side-by-side comparative analysis of IPR, ABS, and product approval frameworks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">Research Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Jurisdiction A</label>
            <select
              value={jurisdictionA}
              onChange={(e) => setJurisdictionA(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300 focus:outline-none"
            >
              <option value="India">India (IPO / AYUSH / NBA)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Jurisdiction B</label>
            <select
              value={jurisdictionB}
              onChange={(e) => setJurisdictionB(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300 focus:outline-none"
            >
              <option value="USA">United States (USPTO / US FDA)</option>
              <option value="EU">European Union (EPO / EMA THMPD)</option>
              <option value="WIPO">WIPO International (PCT / Nagoya)</option>
              <option value="Japan">Japan (JPO / PMDA)</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCompare}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition shadow-lg flex items-center space-x-2 cursor-pointer"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>{loading ? 'Comparing...' : 'Compare Frameworks'}</span>
          </button>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <h3 className="text-sm font-bold text-slate-200">
          Comparative Analysis: <span className="text-emerald-400">{jurisdictionA}</span> vs <span className="text-emerald-400">{jurisdictionB}</span>
        </h3>

        <div className="space-y-6">
          {pointsToDisplay.map((pt: any, idx: number) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span>{pt.criterion}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Jurisdiction A */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                    {jurisdictionA} Position
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{pt.position_jurisdiction_a}</p>
                  <p className="text-[11px] text-slate-500 font-mono pt-1">Citation: {pt.citation_a}</p>
                </div>

                {/* Jurisdiction B */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 px-2 py-0.5 rounded bg-teal-950 border border-teal-500/30">
                    {jurisdictionB} Position
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{pt.position_jurisdiction_b}</p>
                  <p className="text-[11px] text-slate-500 font-mono pt-1">Citation: {pt.citation_b}</p>
                </div>
              </div>

              {/* Difference Rationale */}
              <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl text-xs text-amber-200">
                <strong className="text-amber-300 font-bold">Key Regulatory Difference: </strong>
                {pt.key_difference}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
