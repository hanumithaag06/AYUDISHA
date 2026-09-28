import React, { useState } from 'react';
import { Scale, ShieldCheck, AlertCircle, FileText, CheckCircle2, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

export const IPRPathView: React.FC = () => {
  const [productName, setProductName] = useState('Polyherbal Anti-Diabetic Capsule (Haridra & Nimba)');
  const [ingredients, setIngredients] = useState('Turmeric (Haridra), Neem (Nimba), Ashwagandha');
  const [targetMarket, setTargetMarket] = useState('Both');
  const [loading, setLoading] = useState(false);
  const [iprNodes, setIprNodes] = useState<any[]>([]);

  const defaultNodes = [
    {
      step_id: "step-1",
      title: "Traditional Knowledge (TKDL) Prior-Art Check",
      status: "RELEVANT",
      relevance_reason: "Formulation contains ingredients (Turmeric, Neem) documented in classical Samhitas. Defense required under Section 3(p).",
      evidence_citations: [
        { document_title: "TKDL Prior Art Database for Haridra & Nimba", section: "TKDL/AY/204", source_url: "https://www.tkdl.res.in/", evidence_text: "Documented classical Ayurvedic uses of Haridra and Nimba in Charaka Samhita Chikitsasthana 16/39." }
      ],
      questions_to_verify: [
        "Is the therapeutic claim disclosed in Charaka or Sushruta Samhita?",
        "Are you using novel processing/extraction or classical aqueous methods?"
      ],
      official_resource_url: "https://www.tkdl.res.in/"
    },
    {
      step_id: "step-2",
      title: "Patentability Assessment (Sec 3p, 3e, 3d)",
      status: "RELEVANT",
      relevance_reason: "Requires overcoming Section 3(e) mere admixture objection with statistical synergistic efficacy proof.",
      evidence_citations: [
        { document_title: "Indian Patents Act, 1970 - Section 3(e)", section: "Section 3(e)", source_url: "https://ipindia.gov.in/", evidence_text: "Combinations require experimental proof of synergistic therapeutic efficacy to overcome Section 3(e)." }
      ],
      questions_to_verify: [
        "Is Chou-Talalay Combination Index < 1.0 backed by bioassays?",
        "Does the extraction process produce a novel phytopharmaceutical composition?"
      ],
      official_resource_url: "https://ipindia.gov.in/"
    },
    {
      step_id: "step-3",
      title: "Trademark Registration Strategy (Class 5)",
      status: "CONDITIONAL",
      relevance_reason: "Classical formulation titles (e.g. Triphala, Chyawanprash) cannot be registered. Choose arbitrary brand prefix.",
      evidence_citations: [
        { document_title: "Trade Marks Rules & Class 5 Guidelines", section: "Class 5 Classification", source_url: "https://ipindia.gov.in/", evidence_text: "Classical formulation titles appearing in API are public domain descriptors." }
      ],
      questions_to_verify: [
        "Is the proposed mark a generic Ayurvedic text descriptor?",
        "Have you conducted an InPASS public mark search in Class 5?"
      ],
      official_resource_url: "https://ipindia.gov.in/"
    },
    {
      step_id: "step-4",
      title: "Geographical Indication (GI) & Design Rights",
      status: "LOW_RISK",
      relevance_reason: "Check if herbs are sourced from protected GI regions (e.g., Alleppey Green Cardamom). Novel delivery device packaging may qualify for Design Registration.",
      evidence_citations: [],
      questions_to_verify: ["Does the product packaging or device design possess novelty?"],
      official_resource_url: "https://ipindia.gov.in/"
    },
    {
      step_id: "step-5",
      title: "Biological Resource & ABS Compliance (NBA Form I)",
      status: "RELEVANT",
      relevance_reason: "Mandatory filing of Form I with NBA before grant of patent if utilizing Indian herbs/flora.",
      evidence_citations: [
        { document_title: "Biological Diversity Act, 2002 - Section 6", section: "Section 6 Mandate", source_url: "https://nbaindia.org/", evidence_text: "Prior approval of NBA via Form I is required before securing any IPR based on Indian biological resources." }
      ],
      questions_to_verify: [
        "Were raw herbs procured from Indian geographical origins?",
        "Is Form I submitted prior to international patent grant?"
      ],
      official_resource_url: "https://nbaindia.org/"
    },
    {
      step_id: "step-6",
      title: "Regulatory Licensing & FSSAI / AYUSH SLA Compliance",
      status: "RELEVANT",
      relevance_reason: "Form 25-D manufacturing license from SLA for medicinal claims OR FSSAI Ayurveda-Aahar for dietary food supplement.",
      evidence_citations: [
        { document_title: "Food Safety and Standards (Ayurveda Aahar) Regulations, 2022", section: "Regulation 6 Labelling", source_url: "https://www.fssai.gov.in/", evidence_text: "Ayurveda Aahar products require mandatory logo and consumer advisory statement." }
      ],
      questions_to_verify: [
        "Are claims therapeutic or dietary/wellness focused?",
        "Is Schedule T GMP certified facility selected for manufacture?"
      ],
      official_resource_url: "https://www.fssai.gov.in/"
    }
  ];

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/ipr-path/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_name: productName,
          description: "Ayurvedic formulation for metabolic wellness",
          ingredients: ingredients.split(',').map(s => s.trim()),
          target_market: targetMarket
        })
      });
      if (res.ok) {
        const data = await res.json();
        setIprNodes(data.ipr_nodes || defaultNodes);
      } else {
        setIprNodes(defaultNodes);
      }
    } catch {
      setIprNodes(defaultNodes);
    } finally {
      setLoading(false);
    }
  };

  const nodesToDisplay = iprNodes.length > 0 ? iprNodes : defaultNodes;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Title & Description */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">IPR Path — Interactive Regulatory & IP Map</h2>
            <p className="text-xs text-slate-400">Evidence-backed research map navigating Traditional Knowledge, Patents, Trademarks, GI, ABS & Product Licensing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Product Title</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Key Ingredients / Herbs</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Target Jurisdiction</label>
              <select
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300 focus:outline-none"
              >
                <option value="India">India Only</option>
                <option value="Global">Global / International</option>
                <option value="Both">Both (India + Global)</option>
              </select>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition shadow-lg"
            >
              {loading ? 'Analyzing...' : 'Generate IPR Path'}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Workflow Node Trail */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nodesToDisplay.map((node, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 space-y-4 shadow-xl transition-all relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  node.status === 'RELEVANT'
                    ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                    : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                }`}>
                  {node.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-100 mb-2 leading-snug">{node.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">{node.relevance_reason}</p>

              {/* Questions to verify */}
              {node.questions_to_verify && node.questions_to_verify.length > 0 && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 mb-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Questions to Audit</span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {node.questions_to_verify.map((q: string, i: number) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Official Resource Footer Link */}
            <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">Official Portal</span>
              <a
                href={node.official_resource_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1"
              >
                <span>Access Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
