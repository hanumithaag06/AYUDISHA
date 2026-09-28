import React, { useState } from 'react';
import { Header } from './components/Header';
import { ResearchChat } from './components/ResearchChat';
import { FormulationFingerprintView } from './components/FormulationFingerprintView';
import { IPRPathView } from './components/IPRPathView';
import { IPRConflictRadarView } from './components/IPRConflictRadarView';
import { PriorArtExplorerView } from './components/PriorArtExplorerView';
import { RegulatorySimulatorView } from './components/RegulatorySimulatorView';
import { TKLensView } from './components/TKLensView';
import { RegulationTimelineView } from './components/RegulationTimelineView';
import { JurisdictionCompareView } from './components/JurisdictionCompareView';
import { ProductClassifierView } from './components/ProductClassifierView';
import { UncertaintyMapView } from './components/UncertaintyMapView';
import { ContradictionDetectorView } from './components/ContradictionDetectorView';
import { ResearchGapView } from './components/ResearchGapView';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { SourceRegistryView } from './components/SourceRegistryView';
import { ResearchWorkspaceView } from './components/ResearchWorkspaceView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { Shield } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [jurisdiction, setJurisdiction] = useState('Both');
  const [language, setLanguage] = useState('en');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'chat':
        return <ResearchChat jurisdiction={jurisdiction} language={language} />;
      case 'fingerprint':
        return <FormulationFingerprintView />;
      case 'ipr-path':
        return <IPRPathView />;
      case 'radar':
        return <IPRConflictRadarView />;
      case 'prior-art':
        return <PriorArtExplorerView />;
      case 'simulator':
        return <RegulatorySimulatorView />;
      case 'tk-lens':
        return <TKLensView />;
      case 'timeline':
        return <RegulationTimelineView />;
      case 'compare':
        return <JurisdictionCompareView />;
      case 'classifier':
        return <ProductClassifierView />;
      case 'uncertainty':
        return <UncertaintyMapView />;
      case 'contradictions':
        return <ContradictionDetectorView />;
      case 'gaps':
        return <ResearchGapView />;
      case 'graph':
        return <KnowledgeGraphView />;
      case 'sources':
        return <SourceRegistryView />;
      case 'workspace':
        return <ResearchWorkspaceView />;
      case 'admin':
        return <AdminDashboardView />;
      default:
        return <ResearchChat jurisdiction={jurisdiction} language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        jurisdiction={jurisdiction}
        setJurisdiction={setJurisdiction}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {renderActiveTab()}
      </main>

      {/* Production Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 px-4 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="font-bold text-slate-200">AYUDISHA</span>
              <p className="text-[11px] text-slate-400">Where Ayurveda Meets IPR & Regulation</p>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-500 max-w-xl">
            AYUDISHA provides information and research guidance based on retrieved authoritative sources. It does not provide legal advice.
          </p>

          <div className="flex items-center space-x-4 text-emerald-400 font-medium">
            <button onClick={() => setActiveTab('sources')} className="hover:underline cursor-pointer">
              Source Registry
            </button>
            <button onClick={() => setActiveTab('admin')} className="hover:underline cursor-pointer">
              System Telemetry
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
