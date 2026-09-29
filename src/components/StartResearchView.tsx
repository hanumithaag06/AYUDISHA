import React, { useState } from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { ResearchChat } from './ResearchChat';
import { Sidebar } from './Sidebar';
import { t } from '../utils/translations';

interface StartResearchViewProps {
  jurisdiction: string;
  language: string;
  onProceedToAnalyze: (data: any) => void;
  researchData: any;
  setResearchData: (data: any) => void;
}

export const StartResearchView: React.FC<StartResearchViewProps> = ({
  jurisdiction,
  language,
  onProceedToAnalyze,
  researchData,
  setResearchData
}) => {
  const [productName, setProductName] = useState(researchData?.productName || 'Herbal Immunity Formulation');
  const [ingredients, setIngredients] = useState(researchData?.ingredients || 'Curcuma longa + Azadirachta indica');
  const [intendedUse, setIntendedUse] = useState(researchData?.intendedUse || 'Anti-inflammatory and oral health wellness supplement');
  const [productStage, setProductStage] = useState(researchData?.productStage || 'Pre-Clinical');

  const developmentStages = [
    'Formulation',
    'In-Vitro',
    'Pre-Clinical',
    'Market-Ready'
  ];

  const handleStartResearch = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      productName,
      ingredients,
      intendedUse,
      productStage,
      jurisdiction
    };
    setResearchData(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar Workflow Navigation & Research Summary */}
        <Sidebar
          activeTab="research"
          setActiveTab={() => {}}
          language={language}
          researchData={{
            productName,
            ingredients,
            productStage,
            jurisdiction
          }}
        />

        {/* Main Content Area */}
        <main className="flex-1 space-y-6">
          {/* Header Title & One-Sentence Purpose */}
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-100 uppercase tracking-tight flex items-center space-x-2">
              <span>{t('researchTitle', language)}</span>
              <span className="text-xs font-normal normal-case px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Stage 1 of 6
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              {t('stage1Sub', language)}
            </p>
          </div>

          {/* Form Card */}
          <form onSubmit={handleStartResearch} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            {/* Product Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                {t('productNameLabel', language)}
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Herbal Immunity Formulation"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 transition"
                required
              />
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                {t('ingredientsLabel', language)}
              </label>
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g. Curcuma longa + Azadirachta indica"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 transition"
                required
              />
            </div>

            {/* Intended Use */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                {t('intendedUseLabel', language)}
              </label>
              <input
                type="text"
                value={intendedUse}
                onChange={(e) => setIntendedUse(e.target.value)}
                placeholder="e.g. Anti-inflammatory, oral hygiene & wellness supplement"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 transition"
                required
              />
            </div>

            {/* Product Development Stage */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                {t('developmentStageLabel', language)}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {developmentStages.map((stg) => {
                  const isSelected = productStage === stg;
                  return (
                    <button
                      key={stg}
                      type="button"
                      onClick={() => setProductStage(stg)}
                      className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/60 font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-emerald-400 bg-emerald-500' : 'border-slate-700 bg-transparent'
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </span>
                      <span>{stg}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition shadow-lg flex items-center space-x-2 cursor-pointer"
              >
                <span>{t('startResearchBtn', language)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Research Assistant Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">{t('researchAssistantTitle', language)}</h3>
                  <p className="text-xs text-slate-400">{t('askAssistantSub', language)}</p>
                </div>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30 font-semibold">
                Multilingual AI
              </span>
            </div>

            {/* Embedded Research Chat */}
            <ResearchChat jurisdiction={jurisdiction} language={language} researchData={{ productName, ingredients, intendedUse, productStage }} />
          </div>

          {/* Primary Next Action */}
          <div className="pt-4 border-t border-slate-900 flex justify-end">
            <button
              onClick={() => onProceedToAnalyze({ productName, ingredients, intendedUse, productStage, jurisdiction })}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-8 py-3 rounded-xl shadow-xl shadow-emerald-950/60 transition cursor-pointer flex items-center space-x-2"
            >
              <span>{t('analyzeProductBtn', language)}</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
