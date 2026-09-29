import React, { useState } from 'react';
import { BookOpen, Search, AlertTriangle, X, ExternalLink } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { SourceEvidenceModal } from './SourceEvidenceModal';
import { t } from '../utils/translations';

interface IPRAndTKStageViewProps {
  researchData: any;
  language?: string;
  onProceedToRegulation: () => void;
}

export const IPRAndTKStageView: React.FC<IPRAndTKStageViewProps> = ({
  researchData,
  language = 'en',
  onProceedToRegulation
}) => {
  const [selectedDetail, setSelectedDetail] = useState<'tk' | 'prior-art' | 'conflicts' | null>(null);
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [activeFinding, setActiveFinding] = useState<any>(null);

  const findingsList = {
    tk: {
      title: "TRADITIONAL KNOWLEDGE (TKDL)",
      subtitle: t('tkdlFindingsSub', language),
      finding: "Finding 01: Classical Polyherbal Formulation Reference Identified",
      whyItMatters: "The retrieved TKDL source contains overlapping classical formulation characteristics from Charaka Samhita. Patent protection requires novel processing or synergy proof to overcome Section 3(p) statutory exception.",
      evidence: {
        sourceName: "Traditional Knowledge Digital Library (TKDL)",
        document: "Charaka Samhita, Chikitsa Sthana (Oral & Anti-Inflammatory)",
        section: "Entry TKDL-DEL-8941",
        page: "Vol II, Page 189",
        url: "https://www.tkdl.res.in/",
        excerpt: "Curcuma longa (Haridra) paired with Azadirachta indica (Nimba) in equal parts for mouthwash & topical anti-inflammatory application."
      }
    },
    'prior-art': {
      title: "PRIOR ART FINDINGS",
      subtitle: t('similarityFindingsSub', language),
      finding: "Finding 01: Patent Prior Art Overlap (WO/2021/08912)",
      whyItMatters: "The retrieved patent contains overlapping extract concentration claims for Curcuma longa and Neem oil. Section 3(e) requires proof of synergistic effect via Combination Index (CI < 1.0).",
      evidence: {
        sourceName: "WIPO PatentScope & IP India Gazette",
        document: "International Patent Application WO/2021/08912",
        section: "Claims 1-4 (Herbal extract composition)",
        page: "Page 12, Specification paragraph 0042",
        url: "https://patentscope.wipo.int/",
        excerpt: "Synergistic botanical composition comprising bio-enhanced curcuminoid extracts and Azadirachta indica seed oil for oral hygiene."
      }
    },
    conflicts: {
      title: "IPR CONFLICTS & STATUTORY RISKS",
      subtitle: t('conflictsSub', language),
      finding: "Finding 01: Indian Patents Act Sec 3(p) & Sec 3(e) Conflict",
      whyItMatters: "Traditional Ayurvedic formulations are subject to non-patentability under Sec 3(p). Furthermore, biological material export requires mandatory NBA Form I approval under Biological Diversity Act 2002.",
      evidence: {
        sourceName: "Indian Patents Act, 1970 & Biological Diversity Act, 2002",
        document: "Section 3(p), Section 3(e) & NBA Section 6 Clearance Rules",
        section: "Statutory Patent Exception 3(p) & NBA Approval",
        page: "Gazette Notification No. 42",
        url: "https://nbaindia.org/",
        excerpt: "An invention which in effect is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components is not an invention."
      }
    }
  };

  const handleOpenDetail = (type: 'tk' | 'prior-art' | 'conflicts') => {
    setSelectedDetail(type);
    setActiveFinding(findingsList[type]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar Workspace */}
        <Sidebar
          activeTab="ipr-tk"
          setActiveTab={() => {}}
          language={language}
          researchData={researchData}
        />

        {/* Main Content Area */}
        <main className="flex-1 space-y-6">
          {/* Header Title & Purpose */}
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-100 uppercase tracking-tight flex items-center space-x-2">
              <span>{t('iprTKTitle', language)}</span>
              <span className="text-xs font-normal normal-case px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Stage 3 of 6
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              {t('stage3Sub', language)}
            </p>
          </div>

          {/* THREE CONCEPTUAL CATEGORIES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category 1: Traditional Knowledge */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-xs font-bold uppercase text-slate-200 tracking-wider">
                  {t('traditionalKnowledge', language)}
                </h3>
                <p className="text-xs text-slate-400">
                  {t('tkdlFindingsSub', language)}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleOpenDetail('tk')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <span>{t('viewEvidence', language)}</span>
                </button>
              </div>
            </div>

            {/* Category 2: Prior Art */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center">
                  <Search className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-xs font-bold uppercase text-slate-200 tracking-wider">
                  {t('priorArt', language)}
                </h3>
                <p className="text-xs text-slate-400">
                  {t('similarityFindingsSub', language)}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleOpenDetail('prior-art')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <span>{t('viewMatches', language)}</span>
                </button>
              </div>
            </div>

            {/* Category 3: IPR Conflicts */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/40 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-xs font-bold uppercase text-slate-200 tracking-wider">
                  {t('iprConflicts', language)}
                </h3>
                <p className="text-xs text-slate-400">
                  {t('conflictsSub', language)}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleOpenDetail('conflicts')}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <span>{t('viewConflicts', language)}</span>
                </button>
              </div>
            </div>
          </div>

          {/* FOCUSED DETAIL VIEW (When category selected) */}
          {selectedDetail && activeFinding && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl relative">
              <button
                onClick={() => setSelectedDetail(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <button onClick={() => setSelectedDetail(null)} className="hover:underline text-emerald-400">
                  ← {t('iprTKTitle', language)}
                </button>
                <span>/</span>
                <span className="font-bold text-slate-200">{activeFinding.title}</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-sm font-bold text-slate-100">{activeFinding.finding}</h4>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Why it matters</span>
                    <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                      {activeFinding.whyItMatters}
                    </p>
                  </div>
                </div>

                {/* Evidence Table */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block border-b border-slate-800 pb-1.5">
                    Evidence Metadata
                  </span>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-slate-300 pt-1">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-semibold">Source</span>
                      <span>{activeFinding.evidence.sourceName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-semibold">Document</span>
                      <span>{activeFinding.evidence.document}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-semibold">Section</span>
                      <span>{activeFinding.evidence.section}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-semibold">Page / ID</span>
                      <span className="font-mono">{activeFinding.evidence.page}</span>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      onClick={() => setShowSourceModal(true)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition flex items-center space-x-1.5 cursor-pointer"
                    >
                      <span>[ View source ]</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Primary Dominant Next Action */}
          <div className="pt-6 border-t border-slate-900 flex justify-end">
            <button
              onClick={onProceedToRegulation}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-8 py-3 rounded-xl shadow-xl shadow-emerald-950/60 transition cursor-pointer flex items-center space-x-2"
            >
              <span>{t('checkRegulationBtn', language)}</span>
            </button>
          </div>
        </main>
      </div>

      {/* Source Modal */}
      {activeFinding && (
        <SourceEvidenceModal
          isOpen={showSourceModal}
          onClose={() => setShowSourceModal(false)}
          evidenceData={activeFinding.evidence}
        />
      )}
    </div>
  );
};
