import React, { useState } from 'react';
import { Fingerprint, Dna, Search, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const FormulationFingerprintView: React.FC = () => {
  const [formName, setFormName] = useState('Nimbadi Anti-Diabetic Herbal Capsule');
  const [ingredients, setIngredients] = useState('Haridra (Curcuma longa), Nimba (Azadirachta indica), Ashwagandha (Withania somnifera)');
  const [dosageForm, setDosageForm] = useState('Capsule');
  const [prepMethod, setPrepMethod] = useState('Standardized Hydroalcoholic Extract');
  const [intendedUse, setIntendedUse] = useState('Metabolic Wellness & Glycemic Control');
  const [loading, setLoading] = useState(false);
  const [fingerprint, setFingerprint] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/formulation/fingerprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formulation_name: formName,
          ingredients: ingredients.split(',').map(s => s.trim()),
          dosage_form: dosageForm,
          preparation_method: prepMethod,
          intended_use: intendedUse
        })
      });
      if (res.ok) {
        const data = await res.json();
        setFingerprint(data);
      } else {
        throw new Error();
      }
    } catch {
      setFingerprint({
        fingerprint_hash: "fp-8a9d2f41c30b",
        formulation_name: formName,
        botanical_entities: [
          { input_term: "Haridra", sanskrit_name: "Haridra", scientific_name: "Curcuma longa", common_name: "Turmeric" },
          { input_term: "Nimba", sanskrit_name: "Nimba", scientific_name: "Azadirachta indica", common_name: "Neem" },
          { input_term: "Ashwagandha", sanskrit_name: "Ashwagandha", scientific_name: "Withania somnifera", common_name: "Indian Ginseng" }
        ],
        extracted_attributes: {
          dosage_form: dosageForm,
          preparation_method: prepMethod,
          intended_use: intendedUse,
          traditional_terminology: "Charaka Samhita Metabolic Kwatha Terms"
        },
        matched_tkdl_prior_art: [
          { entry_id: "TKDL/AY/204", title: "Classical Haridra-Nimba Synergistic Extract Formulations", samhita: "Charaka Samhita Chikitsasthana 16/39", similarity_score: 0.95 }
        ],
        similarity_vector_id: "vec-8a9d2f41"
      });
    } finally {
      setLoading(false);
    }
  };

  const fp = fingerprint || {
    fingerprint_hash: "fp-8a9d2f41c30b",
    formulation_name: formName,
    botanical_entities: [
      { input_term: "Haridra", sanskrit_name: "Haridra", scientific_name: "Curcuma longa", common_name: "Turmeric" },
      { input_term: "Nimba", sanskrit_name: "Nimba", scientific_name: "Azadirachta indica", common_name: "Neem" },
      { input_term: "Ashwagandha", sanskrit_name: "Ashwagandha", scientific_name: "Withania somnifera", common_name: "Indian Ginseng" }
    ],
    extracted_attributes: {
      dosage_form: dosageForm,
      preparation_method: prepMethod,
      intended_use: intendedUse,
      traditional_terminology: "Charaka Samhita Metabolic Kwatha Terms"
    },
    matched_tkdl_prior_art: [
      { entry_id: "TKDL/AY/204", title: "Classical Haridra-Nimba Synergistic Extract Formulations", samhita: "Charaka Samhita Chikitsasthana 16/39", similarity_score: 0.95 }
    ],
    similarity_vector_id: "vec-8a9d2f41"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <Fingerprint className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Ayurvedic Formulation Fingerprint Engine</h2>
            <p className="text-xs text-slate-400">Generate a machine-searchable vector fingerprint linking botanicals, dosage forms, preparation methods & TKDL prior art</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Formulation Name</label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Botanical Ingredients</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Dosage Form</label>
            <select
              value={dosageForm}
              onChange={(e) => setDosageForm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300 focus:outline-none"
            >
              <option value="Capsule">Capsule</option>
              <option value="Churna">Churna (Powder)</option>
              <option value="Kwatha">Kwatha (Decoction)</option>
              <option value="Extract Syrup">Extract Syrup</option>
              <option value="Topical Cream">Topical Cream</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition shadow-lg flex items-center space-x-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Generating Fingerprint...' : 'Generate Formulation Fingerprint'}</span>
          </button>
        </div>
      </div>

      {/* Fingerprint Card */}
      {fp && (
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-2">
            <div>
              <span className="text-xs text-slate-400">Generated Formulation Hash</span>
              <h3 className="text-lg font-mono font-bold text-emerald-400">{fp.fingerprint_hash}</h3>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              Vector ID: {fp.similarity_vector_id}
            </span>
          </div>

          {/* Botanical Entities Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Extracted Botanical Entities</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {fp.botanical_entities?.map((b: any, idx: number) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <span className="font-bold text-emerald-300">{b.sanskrit_name}</span>
                  <p className="text-slate-400 italic">{b.scientific_name}</p>
                  <p className="text-slate-500 text-[10px]">Common: {b.common_name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Matched TKDL Prior Art */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Matched TKDL Prior Art</h4>
            <div className="space-y-2">
              {fp.matched_tkdl_prior_art?.map((tk: any, i: number) => (
                <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-200">{tk.title}</span>
                    <p className="text-slate-400 text-[11px]">{tk.samhita}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                    {(tk.similarity_score * 100).toFixed(0)}% Match
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
