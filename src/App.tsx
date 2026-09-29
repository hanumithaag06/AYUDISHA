import React, { useState } from 'react';
import { Header } from './components/Header';
import { StartResearchView } from './components/StartResearchView';
import { ProductAnalyzeStageView } from './components/ProductAnalyzeStageView';
import { IPRAndTKStageView } from './components/IPRAndTKStageView';
import { RegulatoryStageView } from './components/RegulatoryStageView';
import { VerificationStageView } from './components/VerificationStageView';
import { DossierStageView } from './components/DossierStageView';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { SourceRegistryView } from './components/SourceRegistryView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { FloatingChatbot } from './components/FloatingChatbot';
import { Shield } from 'lucide-react';
import { t } from './utils/translations';

export function App() {
  const [activeTab, setActiveTab] = useState('research');
  const [jurisdiction, setJurisdiction] = useState('India');
  const [language, setLanguage] = useState('en');
  const [completedStages, setCompletedStages] = useState<string[]>([]);

  // Shared Research Context across all 6 guided workflow stages
  const [researchData, setResearchData] = useState({
    productName: 'Herbal Immunity Formulation',
    ingredients: 'Curcuma longa + Azadirachta indica',
    intendedUse: 'Anti-inflammatory and oral health wellness supplement',
    productStage: 'Pre-Clinical',
    jurisdiction: 'India',
    objective: 'Patent + regulatory pathway',
    question: 'How do I commercialise this Ayurvedic formulation in India and later export it to USA/EU?'
  });

  const markStageCompleted = (stageId: string) => {
    if (!completedStages.includes(stageId)) {
      setCompletedStages(prev => [...prev, stageId]);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'research':
        return (
          <StartResearchView
            jurisdiction={jurisdiction}
            language={language}
            researchData={researchData}
            setResearchData={setResearchData}
            onProceedToAnalyze={(data) => {
              setResearchData(data);
              markStageCompleted('research');
              setActiveTab('analyze');
            }}
          />
        );
      case 'analyze':
        return (
          <ProductAnalyzeStageView
            researchData={researchData}
            language={language}
            onProceedToIPR={() => {
              markStageCompleted('analyze');
              setActiveTab('ipr-tk');
            }}
          />
        );
      case 'ipr-tk':
        return (
          <IPRAndTKStageView
            researchData={researchData}
            language={language}
            onProceedToRegulation={() => {
              markStageCompleted('ipr-tk');
              setActiveTab('regulation');
            }}
          />
        );
      case 'regulation':
        return (
          <RegulatoryStageView
            researchData={researchData}
            language={language}
            onProceedToVerify={() => {
              markStageCompleted('regulation');
              setActiveTab('verify');
            }}
          />
        );
      case 'verify':
        return (
          <VerificationStageView
            researchData={researchData}
            language={language}
            onProceedToDossier={() => {
              markStageCompleted('verify');
              setActiveTab('dossier');
            }}
          />
        );
      case 'dossier':
        return (
          <DossierStageView
            researchData={researchData}
            language={language}
          />
        );
      case 'graph':
        return (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-xl font-bold text-slate-100 mb-4">{t('knowledgeGraph', language)}</h2>
            <KnowledgeGraphView />
          </div>
        );
      case 'sources':
        return (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-xl font-bold text-slate-100 mb-4">{t('sourceRegistry', language)}</h2>
            <SourceRegistryView />
          </div>
        );
      case 'admin':
        return (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-xl font-bold text-slate-100 mb-4">{t('systemTelemetry', language)}</h2>
            <AdminDashboardView />
          </div>
        );
      default:
        return (
          <StartResearchView
            jurisdiction={jurisdiction}
            language={language}
            researchData={researchData}
            setResearchData={setResearchData}
            onProceedToAnalyze={(data) => {
              setResearchData(data);
              markStageCompleted('research');
              setActiveTab('analyze');
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-slate-950 relative">
      {/* Top Header with 6 Primary Stages Stepper & Top Navigation Links */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        jurisdiction={jurisdiction}
        setJurisdiction={setJurisdiction}
        language={language}
        setLanguage={setLanguage}
        completedStages={completedStages}
      />

      {/* Main Workspace Content Area */}
      <main className="flex-1 pb-16">
        {renderActiveTab()}
      </main>

      {/* Floating Chatbot Widget (Always accessible) */}
      <FloatingChatbot
        jurisdiction={jurisdiction}
        language={language}
        researchData={researchData}
      />

      {/* Streamlined Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-5 px-4 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="font-bold text-slate-200">{t('appTitle', language)}</span>
              <p className="text-[11px] text-slate-400">{t('tagline', language)}</p>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-500 max-w-xl">
            AYUDISHA provides research guidance based on retrieved statutory sources. It does not provide legal advice.
          </p>

          <div className="flex items-center space-x-4 text-slate-400 font-medium text-xs">
            <button onClick={() => setActiveTab('sources')} className="hover:text-emerald-400 cursor-pointer">
              {t('sourceRegistry', language)}
            </button>
            <button onClick={() => setActiveTab('graph')} className="hover:text-emerald-400 cursor-pointer">
              {t('knowledgeGraph', language)}
            </button>
            <button onClick={() => setActiveTab('admin')} className="hover:text-emerald-400 cursor-pointer">
              {t('systemTelemetry', language)}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
