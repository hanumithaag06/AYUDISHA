import React, { useState } from 'react';
import { Sliders, CheckCircle2, AlertTriangle, Circle, X, Globe } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { JurisdictionCompareView } from './JurisdictionCompareView';
import { SourceEvidenceModal } from './SourceEvidenceModal';
import { t } from '../utils/translations';

interface RegulatoryStageViewProps {
  researchData: any;
  language?: string;
  onProceedToVerify: () => void;
}

export const RegulatoryStageView: React.FC<RegulatoryStageViewProps> = ({
  researchData,
  language = 'en',
  onProceedToVerify
}) => {
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [activeChecklistItem, setActiveChecklistItem] = useState<string | null>(null);

  // Scenario Simulator State
  const [scenarioProductType, setScenarioProductType] = useState('Ayurvedic Medicine');
  const [scenarioJurisdiction, setScenarioJurisdiction] = useState('USA');
  const [scenarioRun, setScenarioRun] = useState(false);

  const pathwaySteps = [
    { title: "Product", desc: "Herbal Immunity Formulation" },
    { title: "Classification", desc: "Proprietary Ayurvedic Medicine" },
    { title: "Regulatory Framework", desc: "Drugs & Cosmetics Act 1940 (Rule 161)" },
    { title: "Authority", desc: "State Licensing Authority (AYUSH)" },
    { title: "Required Actions", desc: "Form 25D Application + Labeling Compliance" }
  ];

  const checklistItems = [
    { id: 'item-1', label: "Product classification", status: "completed", desc: "Rule 161 Proprietary Medicine confirmed" },
    { id: 'item-2', label: "Traditional knowledge review", status: "completed", desc: "3 TKDL references retrieved" },
    { id: 'item-3', label: "Prior-art review", status: "warning", desc: "Section 3(e) combination index proof pending" },
    { id: 'item-4', label: "Regulatory documentation", status: "pending", desc: "Form 25D license dossier draft required" },
    { id: 'item-5', label: "Evidence requirements", status: "pending", desc: "Stability & heavy metals testing reports" },
    { id: 'item-6', label: "Final verification", status: "pending", desc: "Final checklist audit before SLA submission" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Workspace Sidebar */}
        <Sidebar
          activeTab="regulation"
          setActiveTab={() => {}}
          language={language}
          researchData={researchData}
        />

        {/* Main Content Area */}
        <main className="flex-1 space-y-6">
          {/* Header Title & Subtitle */}
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-100 uppercase tracking-tight flex items-center space-x-2">
              <span>{t('regulationTitle', language)}</span>
              <span className="text-xs font-normal normal-case px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Stage 4 of 6
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              {t('stage4Sub', language)}
            </p>
          </div>

          {/* 1. REGULATORY PATHWAY STEPPER */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('regulatoryPathwayHeader', language)}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 pt-2">
              {pathwaySteps.map((step, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-1 relative">
                  <span className="text-[10px] text-emerald-400 font-mono font-bold block">
                    STEP 0{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-200 block">
                    {step.title}
                  </span>
                  <span className="text-[11px] text-slate-400 block leading-tight">
                    {step.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. COMPLIANCE CHECKLIST */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t('complianceChecklist', language)}
              </h3>
              <span className="text-xs text-emerald-400 font-medium">2 / 6 Completed</span>
            </div>

            <div className="space-y-2">
              {checklistItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveChecklistItem(item.id)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition cursor-pointer text-left"
                >
                  <div className="flex items-center space-x-3">
                    {item.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {item.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                    {item.status === 'pending' && <Circle className="w-4 h-4 text-slate-600" />}
                    
                    <div>
                      <span className={`text-xs font-semibold block ${
                        item.status === 'completed' ? 'text-slate-200' : item.status === 'warning' ? 'text-amber-200' : 'text-slate-400'
                      }`}>
                        {item.label}
                      </span>
                      <span className="text-[11px] text-slate-500">{item.desc}</span>
                    </div>
                  </div>

                  <span className="text-[11px] text-emerald-400 font-medium hover:underline">
                    {t('viewEvidence', language)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SECONDARY ACTIONS: SCENARIO SIMULATOR & JURISDICTION COMPARISON */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario Simulator Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">SCENARIO SIMULATOR</span>
                <h4 className="text-xs font-bold text-slate-200 mt-1">Explore alternative product pathway</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Current: <strong>India → Proprietary Ayurvedic Medicine</strong>
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowScenarioModal(true)}
                  className="w-full bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-800 text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('exploreScenarioBtn', language)}</span>
                </button>
              </div>
            </div>

            {/* Jurisdiction Comparison Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">JURISDICTION COMPARISON</span>
                <h4 className="text-xs font-bold text-slate-200 mt-1">Compare regulatory requirements across markets</h4>
                <p className="text-xs text-slate-400 mt-1">
                  India (AYUSH) vs USA (FDA Dietary Supplement)
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="w-full bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-800 text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('viewFullComparisonBtn', language)}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Primary Dominant Next Action */}
          <div className="pt-6 border-t border-slate-900 flex justify-end">
            <button
              onClick={onProceedToVerify}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-8 py-3 rounded-xl shadow-xl shadow-emerald-950/60 transition cursor-pointer flex items-center space-x-2"
            >
              <span>{t('verifyEvidenceBtn', language)}</span>
            </button>
          </div>
        </main>
      </div>

      {/* Scenario Simulator Modal */}
      {showScenarioModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => { setShowScenarioModal(false); setScenarioRun(false); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-100">WHAT IF? — Regulatory Scenario Simulator</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Product Type</label>
                <select
                  value={scenarioProductType}
                  onChange={(e) => setScenarioProductType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                >
                  <option value="Ayurvedic Medicine">Ayurvedic Medicine</option>
                  <option value="Phytopharmaceutical">Phytopharmaceutical</option>
                  <option value="Ayurveda-Aahar Dietary Food">Ayurveda-Aahar Dietary Food</option>
                  <option value="Cosmetic">Cosmetic</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Jurisdiction</label>
                <select
                  value={scenarioJurisdiction}
                  onChange={(e) => setScenarioJurisdiction(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                >
                  <option value="USA">USA (FDA)</option>
                  <option value="EU">European Union (EMA)</option>
                  <option value="India">India (AYUSH)</option>
                </select>
              </div>

              <button
                onClick={() => setScenarioRun(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl transition cursor-pointer"
              >
                [ Run Scenario ]
              </button>
            </div>

            {scenarioRun && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs pt-3">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">SCENARIO DIFFERENCES</h4>
                <div className="space-y-1.5 text-slate-300">
                  <div><strong>Regulatory Pathway:</strong> Changed to US FDA Dietary Supplement Health & Education Act (DSHEA 1994)</div>
                  <div><strong>Authority:</strong> US FDA Center for Food Safety and Applied Nutrition (CFSAN)</div>
                  <div><strong>Evidence Requirements:</strong> New Dietary Ingredient (NDI) Notification 75 days prior to marketing</div>
                  <div><strong>Additional Research:</strong> Heavy metal limits & Nondisclosure agreement for raw botanical source</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Jurisdiction Compare Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setShowCompareModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-100">COMPARE JURISDICTIONS</h3>
            <JurisdictionCompareView />
          </div>
        </div>
      )}

      {/* Supporting Evidence Modal for Checklist */}
      <SourceEvidenceModal
        isOpen={Boolean(activeChecklistItem)}
        onClose={() => setActiveChecklistItem(null)}
        evidenceData={{
          sourceName: "Drugs & Cosmetics Rules 1945 — Schedule T",
          document: "SLA AYUSH Form 25D Application Guidelines",
          section: "Rule 158(B) Mandatory Quality & Safety Evidence",
          page: "Page 112, AYUSH SLA Handbook",
          url: "https://ayush.gov.in/",
          excerpt: "Proof of textual reference in authoritative 56 Ayurvedic texts listed under First Schedule of Drugs & Cosmetics Act 1940."
        }}
      />
    </div>
  );
};
