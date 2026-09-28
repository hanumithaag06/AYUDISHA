import React from 'react';
import { Shield, Sparkles, Globe, BookOpen, Scale, Layers, History, FileText, Activity, Cpu, Fingerprint, ShieldAlert, Compass, Sliders, BarChart2, GitBranch, Share2 } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  jurisdiction: string;
  setJurisdiction: (j: string) => void;
  language: string;
  setLanguage: (l: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  jurisdiction,
  setJurisdiction,
  language,
  setLanguage
}) => {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'ml', label: 'മലയാളം (Malayalam)' },
    { code: 'kn', label: 'கன்னட (Kannada)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { code: 'sa', label: 'संस्कृतम् (Sanskrit)' },
  ];

  const navItems = [
    { id: 'chat', label: 'Research RAG', icon: Sparkles },
    { id: 'fingerprint', label: 'Formulation Fingerprint', icon: Fingerprint },
    { id: 'ipr-path', label: 'IPR Path Map', icon: Scale },
    { id: 'radar', label: 'IPR Conflict Radar', icon: ShieldAlert },
    { id: 'prior-art', label: 'Prior-Art Explorer', icon: Compass },
    { id: 'simulator', label: 'Regulatory Simulator', icon: Sliders },
    { id: 'tk-lens', label: 'TK Lens', icon: BookOpen },
    { id: 'timeline', label: 'Timeline & Diff', icon: History },
    { id: 'compare', label: 'Jurisdiction Compare', icon: Layers },
    { id: 'classifier', label: 'Product Classifier', icon: Cpu },
    { id: 'uncertainty', label: 'Uncertainty Map', icon: BarChart2 },
    { id: 'contradictions', label: 'Contradiction Detector', icon: GitBranch },
    { id: 'gaps', label: 'Research Gaps', icon: ShieldAlert },
    { id: 'graph', label: 'Knowledge Graph', icon: Share2 },
    { id: 'sources', label: 'Source Registry', icon: FileText },
    { id: 'workspace', label: 'Workspace & Export', icon: Shield },
    { id: 'admin', label: 'Admin Telemetry', icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-emerald-950/60 text-slate-100">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo & Tagline */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('chat')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 p-0.5 shadow-lg shadow-emerald-950/50">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                AYUDISHA
              </span>
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-semibold">
                Living Intelligence System
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Where Ayurveda Meets IPR & Regulation
            </p>
          </div>
        </div>

        {/* Global Controls: Jurisdiction & Language */}
        <div className="flex items-center space-x-3">
          {/* Jurisdiction Selector */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-lg p-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
            <span className="text-slate-400 mr-1.5 font-medium">Scope:</span>
            {['India', 'International', 'Both'].map((j) => (
              <button
                key={j}
                onClick={() => setJurisdiction(j)}
                className={`px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
                  jurisdiction === j
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {j}
              </button>
            ))}
          </div>

          {/* Language Selector */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-lg px-2 py-1 text-xs">
            <span className="text-slate-400 mr-1 font-medium">Lang:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-emerald-300 font-medium focus:outline-none cursor-pointer"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-slate-200">
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none border-t border-slate-900">
        <nav className="flex space-x-1 py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
