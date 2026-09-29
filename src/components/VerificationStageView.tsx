import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle, X } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { ContradictionDetectorView } from './ContradictionDetectorView';
import { ResearchGapView } from './ResearchGapView';
import { UncertaintyMapView } from './UncertaintyMapView';
import { t } from '../utils/translations';

interface VerificationStageViewProps {
  researchData: any;
  language?: string;
  onProceedToDossier: () => void;
}

export const VerificationStageView: React.FC<VerificationStageViewProps> = ({
  researchData,
  language = 'en',
  onProceedToDossier
}) => {
  const [showConflictsModal, setShowConflictsModal] = useState(false);
  const [showGapsModal, setShowGapsModal] = useState(false);
  const [showUncertaintyMapModal, setShowUncertaintyMapModal] = useState(false);

  const completenessScores = [
    { label: "Product Classification", status: "supported", text: t('supported', language) },
    { label: "TK Evidence", status: "supported", text: t('supported', language) },
    { label: "Prior Art", status: "review", text: t('needsReview', language) },
    { label: "Regulatory Evidence", status: "supported", text: t('supported', language) },
    { label: "International Evidence", status: "missing", text: t('missing', language) }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Workspace Sidebar */}
        <Sidebar
          activeTab="verify"
          setActiveTab={() => {}}
          language={language}
          researchData={researchData}
        />

        {/* Main Content Area */}
        <main className="flex-1 space-y-6">
          {/* Header Title & Subtitle */}
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-100 uppercase tracking-tight flex items-center space-x-2">
              <span>{t('verifyTitle', language)}</span>
              <span className="text-xs font-normal normal-case px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Stage 5 of 6
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              {t('stage5Sub', language)}
            </p>
          </div>

          {/* THREE SECTIONS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. EVIDENCE */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">SECTION 01</span>
                <h3 className="text-xs font-bold uppercase text-slate-200 tracking-wider">
                  {t('evidenceIntegrity', language)}
                </h3>
                <div className="space-y-2 text-xs pt-1">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-300 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t('supported', language)}</span>
                    </span>
                    <span className="font-bold text-emerald-400">5 sources</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-300 flex items-center space-x-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t('needsReview', language)}</span>
                    </span>
                    <span className="font-bold text-amber-400">1 finding</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-300 flex items-center space-x-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                      <span>{t('missing', language)}</span>
                    </span>
                    <span className="font-bold text-slate-400">1 requirement</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. CONFLICTS */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">SECTION 02</span>
                <h3 className="text-xs font-bold uppercase text-slate-200 tracking-wider">
                  {t('conflictsTitle', language)}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <strong>2 potential contradictions identified</strong> between Section 3(p) prior art and Section 3(e) synergistic claim.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <button
                  onClick={() => setShowConflictsModal(true)}
                  className="w-full bg-slate-950 hover:bg-slate-800 text-amber-400 border border-slate-800 text-xs font-semibold py-2.5 rounded-xl transition cursor-pointer"
                >
                  {t('reviewConflictsBtn', language)}
                </button>
              </div>
            </div>

            {/* 3. RESEARCH GAPS */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">SECTION 03</span>
                <h3 className="text-xs font-bold uppercase text-slate-200 tracking-wider">
                  {t('researchGapsTitle', language)}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <strong>3 pieces of evidence may be required</strong> prior to statutory filing (Combinatorial assay & heavy metals).
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <button
                  onClick={() => setShowGapsModal(true)}
                  className="w-full bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-800 text-xs font-semibold py-2.5 rounded-xl transition cursor-pointer"
                >
                  {t('viewMissingEvidenceBtn', language)}
                </button>
              </div>
            </div>
          </div>

          {/* RESEARCH COMPLETENESS SUMMARY */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t('completenessSummary', language)}
              </h3>
              <button
                onClick={() => setShowUncertaintyMapModal(true)}
                className="text-xs text-emerald-400 hover:underline font-semibold cursor-pointer"
              >
                {t('viewEvidenceMap', language)}
              </button>
            </div>

            <div className="space-y-2">
              {completenessScores.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
                  <span className="font-semibold text-slate-200">{item.label}</span>
                  <span className={`flex items-center space-x-1 font-bold ${
                    item.status === 'supported' ? 'text-emerald-400' : item.status === 'review' ? 'text-amber-400' : 'text-slate-500'
                  }`}>
                    {item.status === 'supported' && '✓'}
                    {item.status === 'review' && '⚠'}
                    {item.status === 'missing' && '?'}
                    <span className="ml-1">{item.text}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Dominant Next Action */}
          <div className="pt-6 border-t border-slate-900 flex justify-end">
            <button
              onClick={onProceedToDossier}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-8 py-3 rounded-xl shadow-xl shadow-emerald-950/60 transition cursor-pointer flex items-center space-x-2"
            >
              <span>{t('buildDossierBtn', language)}</span>
            </button>
          </div>
        </main>
      </div>

      {/* Conflicts Review Modal */}
      {showConflictsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowConflictsModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-100">REVIEW CONTRADICTIONS & CONFLICTS</h3>
            <ContradictionDetectorView />
          </div>
        </div>
      )}

      {/* Gaps Modal */}
      {showGapsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowGapsModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-100">MISSING EVIDENCE & RESEARCH GAPS</h3>
            <ResearchGapView />
          </div>
        </div>
      )}

      {/* Uncertainty Evidence Map Modal */}
      {showUncertaintyMapModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowUncertaintyMapModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-100">DETAILED EVIDENCE UNCERTAINTY MAP</h3>
            <UncertaintyMapView />
          </div>
        </div>
      )}
    </div>
  );
};
