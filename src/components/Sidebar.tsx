import React, { useState } from 'react';
import { 
  FileText, Search, ShieldCheck, Compass, BookOpen, 
  Layers, CheckCircle2, Sparkles, ChevronRight
} from 'lucide-react';
import { t } from '../utils/translations';

interface SidebarProps {
  activeTab?: string;
  setActiveTab: (tab: string) => void;
  researchData: any;
  language?: string;
  activeSection?: string;
  setActiveSection?: (sec: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  setActiveTab,
  researchData,
  language = 'en',
  activeSection = 'overview',
  setActiveSection
}) => {
  const [showAdvancedTools, setShowAdvancedTools] = useState(false);

  const productName = researchData?.productName || 'Herbal Immunity Formulation';
  const ingredients = researchData?.ingredients || 'Curcuma longa + Azadirachta indica';
  const productStage = researchData?.productStage || 'Pre-Clinical';
  const jurisdiction = researchData?.jurisdiction || 'India';

  const ingredientCount = ingredients.split('+').length || 2;

  const workflowNavItems = [
    { id: 'overview', label: t('productOverview', language), icon: FileText },
    { id: 'findings', label: t('findings', language), icon: Search },
    { id: 'evidence', label: t('evidence', language), icon: ShieldCheck },
    { id: 'action-plan', label: t('actionPlan', language), icon: CheckCircle2 }
  ];

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
      {/* Workflow Navigation */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
        <h3 className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-3 px-2">
          {t('researchWorkspace', language)}
        </h3>
        <nav className="space-y-1">
          {workflowNavItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection && setActiveSection(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {isSelected && <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Persistent RESEARCH SUMMARY Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-[11px] uppercase tracking-wider font-bold text-emerald-400 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('researchSummary', language)}</span>
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-medium">
            {t('activeContext', language)}
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">{t('product', language)}</span>
            <span className="font-semibold text-slate-100 line-clamp-1">{productName}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">{t('ingredients', language)}</span>
              <span className="font-medium text-slate-200">{ingredientCount}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">{t('stage', language)}</span>
              <span className="font-medium text-slate-200">{productStage}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">{t('jurisdiction', language)}</span>
            <span className="font-medium text-slate-200">{jurisdiction}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">{t('researchAreas', language)}</span>
            <span className="font-semibold text-emerald-400 text-[11px]">IPR • TK • Regulation</span>
          </div>
        </div>
      </div>

      {/* Advanced Research Mode Toggle */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">{t('advancedTools', language)}</span>
          <button
            onClick={() => setShowAdvancedTools(!showAdvancedTools)}
            className="text-[11px] text-emerald-400 hover:underline font-semibold cursor-pointer flex items-center space-x-1"
          >
            <span>{showAdvancedTools ? 'Hide' : 'Explore'}</span>
            <ChevronRight className={`w-3 h-3 transition-transform ${showAdvancedTools ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {showAdvancedTools && (
          <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('graph')}
              className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-emerald-300 hover:bg-slate-800 transition cursor-pointer text-left"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('knowledgeGraph', language)}</span>
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-emerald-300 hover:bg-slate-800 transition cursor-pointer text-left"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('sourceRegistry', language)}</span>
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-emerald-300 hover:bg-slate-800 transition cursor-pointer text-left"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('systemTelemetry', language)}</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
