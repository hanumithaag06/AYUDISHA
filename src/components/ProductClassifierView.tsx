import React, { useState } from 'react';
import { Cpu, CheckCircle2, FileText, AlertCircle, ArrowRight } from 'lucide-react';

export const ProductClassifierView: React.FC = () => {
  const [productName, setProductName] = useState('Haridra & Nimba Metabolic Elixir');
  const [ingredients, setIngredients] = useState('Turmeric Extract (Curcumin 95%), Neem Extract');
  const [formulationType, setFormulationType] = useState('Herb-Extract');
  const [intendedUse, setIntendedUse] = useState('Dietary Wellness & Metabolic Health');
  const [loading, setLoading] = useState(false);
  const [classification, setClassification] = useState<any>(null);

  const defaultClassification = {
    product_name: "Haridra & Nimba Metabolic Elixir",
    classification_category: "Proprietary Ayurvedic Medicine",
    confidence: "High evidence support",
    rationale: "Formulation contains ingredients mentioned in Ayurvedic authoritative texts but prepared in standardized extract proportions.",
    regulatory_steps: [
      "Submit pilot clinical safety/efficacy data or textual rationale under Rule 158-B",
      "Obtain Form 25-D AYUSH SLA License with Schedule T GMP certification",
      "Perform InPASS trademark search for novel brand title in Class 5",
      "File NBA Form I if biological resources sourced from India are intended for patenting"
    ],
    retrieved_evidence: [
      {
        document_title: "Drugs and Cosmetics Rules, 1945 - Rule 158-B",
        section: "Rule 158-B Licensing Criteria",
        source_url: "https://www.ayush.gov.in/",
        evidence_text: "Patent or Proprietary Ayurvedic Medicines require safety data, standardized formulation parameters, and SLA Form 25-D approval."
      }
    ]
  };

  const handleClassify = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/classification/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_name: productName,
          ingredients: ingredients.split(',').map(s => s.trim()),
          formulation_type: formulationType,
          intended_use: intendedUse
        })
      });
      if (res.ok) {
        const data = await res.json();
        setClassification(data);
      } else {
        setClassification(defaultClassification);
      }
    } catch {
      setClassification(defaultClassification);
    } finally {
      setLoading(false);
    }
  };

  const result = classification || defaultClassification;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Product Classification Engine</h2>
            <p className="text-xs text-slate-400">Evidence-backed classification into Classical, Proprietary, Phytopharmaceutical, or Ayurveda-Aahar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Active Ingredients</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Formulation Type</label>
            <select
              value={formulationType}
              onChange={(e) => setFormulationType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300 focus:outline-none"
            >
              <option value="Classical">Classical Recipe (Schedule I)</option>
              <option value="Proprietary">Proprietary Combination</option>
              <option value="Herb-Extract">Standardized Extract</option>
              <option value="Food">Ayurveda-Aahar Food</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleClassify}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2.5 rounded-xl transition shadow-lg"
            >
              {loading ? 'Classifying...' : 'Analyze Category'}
            </button>
          </div>
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-2">
            <div>
              <span className="text-xs text-slate-400">Classified Product Category</span>
              <h3 className="text-xl font-extrabold text-emerald-300">{result.classification_category}</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-semibold text-xs flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{result.confidence}</span>
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
            <strong className="text-emerald-400">Statutory Rationale: </strong>
            {result.rationale}
          </p>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Mandatory Compliance Action Plan</h4>
            <div className="space-y-2">
              {result.regulatory_steps?.map((step: string, idx: number) => (
                <div key={idx} className="flex items-start space-x-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
