import React, { useState } from 'react';
import { 
  Shield, Globe, HelpCircle, Check, X, Compass, BookOpen, Layers, Cpu, ChevronDown
} from 'lucide-react';
import { t } from '../utils/translations';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  jurisdiction: string;
  setJurisdiction: (j: string) => void;
  language: string;
  setLanguage: (l: string) => void;
  completedStages?: string[];
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  jurisdiction,
  setJurisdiction,
  language,
  setLanguage,
  completedStages = []
}) => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'ml', label: 'മലയാളം (Malayalam)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { code: 'sa', label: 'संस्कृतम् (Sanskrit)' },
  ];

  // 6 Primary Guided Workflow Stages with multilingual translations
  const primaryStages = [
    { id: 'research', num: 1, labelKey: 'stage1' },
    { id: 'analyze', num: 2, labelKey: 'stage2' },
    { id: 'ipr-tk', num: 3, labelKey: 'stage3' },
    { id: 'regulation', num: 4, labelKey: 'stage4' },
    { id: 'verify', num: 5, labelKey: 'stage5' },
    { id: 'dossier', num: 6, labelKey: 'stage6' },
  ];

  const stageOrder = ['research', 'analyze', 'ipr-tk', 'regulation', 'verify', 'dossier'];
  const currentIndex = stageOrder.indexOf(activeTab);

  const getStageState = (stageId: string, index: number) => {
    if (activeTab === stageId) return 'current';
    if (completedStages.includes(stageId) || (currentIndex !== -1 && index < currentIndex)) return 'completed';
    return 'future';
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-900 text-slate-100 shadow-xl">
        {/* Top Bar with Brand, Scope, Lang, Top Utilities, Help, Profile */}
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3 border-b border-slate-900/80">
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('research')}>
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shadow-md">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight text-slate-100">
                {t('appTitle', language)}
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 font-semibold">
                {t('guidedWorkspace', language)}
              </span>
            </div>
          </div>

          {/* Center/Right Top Nav Controls & Tools (Moved from footer to top) */}
          <div className="flex items-center space-x-2.5 text-xs">
            {/* Top Navigation Utilities Links */}
            <div className="hidden lg:flex items-center space-x-1.5 border-r border-slate-800 pr-3 mr-1">
              <button
                onClick={() => setActiveTab('sources')}
                className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer flex items-center space-x-1 ${
                  activeTab === 'sources' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('sourceRegistry', language)}</span>
              </button>

              <button
                onClick={() => setActiveTab('graph')}
                className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer flex items-center space-x-1 ${
                  activeTab === 'graph' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('knowledgeGraph', language)}</span>
              </button>

              <button
                onClick={() => setActiveTab('admin')}
                className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer flex items-center space-x-1 ${
                  activeTab === 'admin' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('systemTelemetry', language)}</span>
              </button>
            </div>

            {/* Jurisdiction Selector */}
            <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
              <Globe className="w-3.5 h-3.5 text-emerald-400 mr-1" />
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer text-xs"
              >
                <option value="India" className="bg-slate-900 text-slate-200">{t('india', language)} ▾</option>
                <option value="International" className="bg-slate-900 text-slate-200">{t('international', language)} ▾</option>
                <option value="Both" className="bg-slate-900 text-slate-200">{t('both', language)} ▾</option>
              </select>
            </div>

            {/* Language Selector */}
            <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-emerald-300 font-medium focus:outline-none cursor-pointer text-xs font-semibold"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-900 text-slate-200">
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Help Button */}
            <button
              onClick={() => setShowHelpModal(true)}
              className="flex items-center space-x-1 text-slate-400 hover:text-slate-200 px-2 py-1 rounded-lg transition cursor-pointer"
              title="Help & Workflow Info"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline font-medium">{t('help', language)}</span>
            </button>

            {/* Profile Avatar */}
            <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xs shadow-inner">
              ◯
            </div>
          </div>
        </div>

        {/* 6-Stage Progress Stepper */}
        <div className="max-w-7xl mx-auto px-4 py-2.5 overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-between min-w-[640px] space-x-2">
            {primaryStages.map((stage, idx) => {
              const state = getStageState(stage.id, idx);
              const isCurrent = state === 'current';
              const isCompleted = state === 'completed';
              const isFuture = state === 'future';
              const stageName = t(stage.labelKey, language);

              return (
                <React.Fragment key={stage.id}>
                  <button
                    onClick={() => setActiveTab(stage.id)}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs transition cursor-pointer font-medium border ${
                      isCurrent
                        ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 shadow-md font-semibold'
                        : isCompleted
                        ? 'bg-slate-900/80 border-emerald-900/40 text-emerald-400/90 hover:bg-slate-900'
                        : 'bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-400 hover:bg-slate-900/40'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-emerald-500 text-slate-950'
                          : isCompleted
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                          : 'bg-slate-900 text-slate-600 border border-slate-800'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : stage.num}
                    </span>

                    <span>
                      {isCompleted && '✓ '}
                      {isCurrent && `${stage.num} `}
                      {isFuture && '○ '}
                      {stageName}
                    </span>
                  </button>

                  {idx < primaryStages.length - 1 && (
                    <div
                      className={`flex-1 h-[1.5px] max-w-[28px] mx-1 rounded-full ${
                        idx < currentIndex
                          ? 'bg-emerald-500/50'
                          : 'bg-slate-800'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </header>

      {/* Quick Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">{t('appTitle', language)} Workflow Guide</h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-emerald-400">1. {t('stage1', language)}:</span> Define formulation name, ingredients, intended use.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-emerald-400">2. {t('stage2', language)}:</span> Get product classification & formulation fingerprint.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-emerald-400">3. {t('stage3', language)}:</span> Review TKDL, Prior Art, & IPR conflicts.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-emerald-400">4. {t('stage4', language)}:</span> Discover regulatory pathway & compliance checklist.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-emerald-400">5. {t('stage5', language)}:</span> Inspect evidence integrity & missing gaps.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-emerald-400">6. {t('stage6', language)}:</span> Export official research dossier (PDF/MD/JSON).
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2.5 rounded-xl transition cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};
