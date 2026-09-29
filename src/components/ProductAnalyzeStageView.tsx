import React, { useState } from 'react';
import { CheckCircle2, HelpCircle } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { FormulationFingerprintView } from './FormulationFingerprintView';
import { ProductClassifierView } from './ProductClassifierView';
import { WhyExplanationModal } from './WhyExplanationModal';
import { SourceEvidenceModal } from './SourceEvidenceModal';
import { t } from '../utils/translations';

interface ProductAnalyzeStageViewProps {
  researchData: any;
  language?: string;
  onProceedToIPR: () => void;
}

export const ProductAnalyzeStageView: React.FC<ProductAnalyzeStageViewProps> = ({
  researchData,
  language = 'en',
  onProceedToIPR
}) => {
  const [showFingerprintDetails, setShowFingerprintDetails] = useState(false);
  const [showClassifierDetails, setShowClassifierDetails] = useState(false);
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Workspace Sidebar */}
        <Sidebar
          activeTab="analyze"
          setActiveTab={() => {}}
          language={language}
          researchData={researchData}
        />

        {/* Main Content Area */}
        <main className="flex-1 space-y-6">
          {/* Header Title & Subtitle */}
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-100 uppercase tracking-tight flex items-center space-x-2">
              <span>{t('analyzeTitle', language)}</span>
              <span className="text-xs font-normal normal-case px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Stage 2 of 6
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              {t('stage2Sub', language)}
            </p>
          </div>

          {/* TWO PRIMARY RESULTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. PRODUCT CLASSIFICATION CARD */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    {t('primaryResult01', language)}
                  </span>
                  <button
                    onClick={() => setShowWhyModal(true)}
                    className="text-xs text-emerald-400 hover:underline font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{t('why', language)}</span>
                  </button>
                </div>

                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  {t('productClassification', language)}
                </h3>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-base font-extrabold text-emerald-300 block">
                    {t('proprietaryAyurvedic', language)}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t('rule161Desc', language)}
                  </p>
                  <div className="flex items-center space-x-2 pt-1 text-[11px] text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t('confidenceScore', language)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <button
                  onClick={() => setShowEvidenceModal(true)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <span>{t('viewEvidence', language)}</span>
                </button>
                <button
                  onClick={() => setShowClassifierDetails(!showClassifierDetails)}
                  className="text-xs text-slate-400 hover:text-slate-200 font-medium cursor-pointer"
                >
                  {showClassifierDetails ? 'Hide details' : 'View details'}
                </button>
              </div>
            </div>

            {/* 2. FORMULATION FINGERPRINT CARD */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    {t('primaryResult02', language)}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    fp-8F92A1
                  </span>
                </div>

                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  {t('formulationFingerprint', language)}
                </h3>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <span className="text-xs font-bold text-slate-200 block">
                    {t('ingredientsNormalized', language)}
                  </span>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Sanskrit: <strong>Haridra</strong>, <strong>Nimba</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Botanical: <strong>Curcuma longa</strong>, <strong>Azadirachta indica</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Common: <strong>Turmeric</strong>, <strong>Neem</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <button
                  onClick={() => setShowFingerprintDetails(!showFingerprintDetails)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <span>{showFingerprintDetails ? 'Hide details' : t('viewFingerprintDetails', language)}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Collapsible Details Views */}
          {showClassifierDetails && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-slate-200">Detailed Classification Breakdown</h3>
              <ProductClassifierView />
            </div>
          )}

          {showFingerprintDetails && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-slate-200">Formulation Fingerprint Breakdown</h3>
              <FormulationFingerprintView />
            </div>
          )}

          {/* Single Dominant Next Action */}
          <div className="pt-6 border-t border-slate-900 flex justify-end">
            <button
              onClick={onProceedToIPR}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-8 py-3 rounded-xl shadow-xl shadow-emerald-950/60 transition cursor-pointer flex items-center space-x-2"
            >
              <span>{t('checkIPRTKBtn', language)}</span>
            </button>
          </div>
        </main>
      </div>

      {/* Modals */}
      <WhyExplanationModal
        isOpen={showWhyModal}
        onClose={() => setShowWhyModal(false)}
        title="Why did AYUDISHA classify this product?"
        findingText="Product contains Curcuma longa and Azadirachta indica processed according to Ayurvedic Pharmacopoeia guidelines. Classified under Rule 161 (Proprietary Ayurvedic Medicine)."
      />

      <SourceEvidenceModal
        isOpen={showEvidenceModal}
        onClose={() => setShowEvidenceModal(false)}
        evidenceData={{
          sourceName: "Drugs & Cosmetics Act 1940 & Rules 1945 (Rule 161)",
          document: "AYUSH Statutory Notification Gazette G.S.R. 849(E)",
          section: "Rule 161 - Labeling & Packaging of ASU Drugs",
          page: "Page 45, Schedule T GMP Guidelines",
          url: "https://ayush.gov.in/",
          excerpt: "Any medicine intended for internal or external use for human or animal diagnosis, treatment, mitigation or prevention of disease in human beings or animals and manufactured exclusively in accordance with Ayurvedic texts is governed under Rule 161."
        }}
      />
    </div>
  );
};
