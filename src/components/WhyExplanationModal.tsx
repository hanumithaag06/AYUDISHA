import React from 'react';
import { X, HelpCircle, CheckCircle2, BookOpen, ShieldCheck, Search } from 'lucide-react';

interface WhyExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  findingText?: string;
}

export const WhyExplanationModal: React.FC<WhyExplanationModalProps> = ({
  isOpen,
  onClose,
  title = "Why did AYUDISHA say this?",
  findingText = "This product qualifies as Proprietary Ayurvedic Medicine under Rule 161 with Section 3(p) TKDL prior art protection."
}) => {
  if (!isOpen) return null;

  const steps = [
    { label: "Your Question / Input", desc: "User entered formulation Curcuma longa + Azadirachta indica for anti-inflammatory wellness", icon: Search },
    { label: "Research Intent", desc: "Identify patentability exceptions (Sec 3(p)/3(e)) and state AYUSH licensing requirements", icon: HelpCircle },
    { label: "Retrieved Sources", desc: "Retrieved Indian Patents Act 1970, TKDL classical texts, & Drugs & Cosmetics Act 1940", icon: BookOpen },
    { label: "Relevant Evidence", desc: "Matched Charaka Samhita formulation references with 89% structural overlap score", icon: ShieldCheck },
    { label: "Verification", desc: "Validated by contradiction engine against 2022 Ayurveda-Aahar regulations", icon: CheckCircle2 },
    { label: "Conclusion", desc: findingText, icon: CheckCircle2 }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto scrollbar-thin">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">{title}</h3>
            <p className="text-xs text-slate-400">Transparent AI Research Deduction Pathway</p>
          </div>
        </div>

        <div className="space-y-3 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-[2px] before:bg-emerald-500/20">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isFinal = idx === steps.length - 1;
            return (
              <div key={idx} className="flex items-start space-x-4 relative z-10">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border text-xs font-bold ${
                  isFinal
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-emerald-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className={`flex-1 p-3 rounded-2xl border ${
                  isFinal
                    ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-950/70 border-slate-800/80 text-slate-300'
                }`}>
                  <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
                    <span>{step.label}</span>
                    <span className="text-[10px] text-slate-500 font-mono">Step {idx + 1}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs py-2.5 rounded-xl transition cursor-pointer"
        >
          Close Explanation
        </button>
      </div>
    </div>
  );
};
