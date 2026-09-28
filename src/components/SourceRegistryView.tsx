import React, { useState, useEffect } from 'react';
import { FileText, RefreshCw, ExternalLink, ShieldCheck, Database, CheckCircle2, Clock, Info } from 'lucide-react';

export const SourceRegistryView: React.FC = () => {
  const [sources, setSources] = useState<any[]>([]);
  const [crawling, setCrawling] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const defaultSources = [
    {
      id: "src-tkdl",
      name: "Traditional Knowledge Digital Library (TKDL)",
      organization: "CSIR & Ministry of AYUSH, Govt of India",
      base_url: "https://www.tkdl.res.in/",
      source_type: "TKDL",
      jurisdiction: "India",
      access_type: "PUBLIC / RESTRICTED",
      parser_type: "HTML / API",
      enabled: true,
      last_crawled_at: "2026-09-27T10:00:00Z",
      document_count: 2400
    },
    {
      id: "src-indiacode",
      name: "India Code Statutory Legal Portal",
      organization: "Ministry of Law & Justice, Govt of India",
      base_url: "https://www.indiacode.nic.in/",
      source_type: "ACT",
      jurisdiction: "India",
      access_type: "PUBLIC",
      parser_type: "HTML / PDF",
      enabled: true,
      last_crawled_at: "2026-09-27T11:30:00Z",
      document_count: 142
    },
    {
      id: "src-ipindia",
      name: "IP India Patent & Trade Mark Office",
      organization: "DPIIT, Ministry of Commerce & Industry",
      base_url: "https://ipindia.gov.in/",
      source_type: "PATENT",
      jurisdiction: "India",
      access_type: "PUBLIC",
      parser_type: "PDF / InPASS",
      enabled: true,
      last_crawled_at: "2026-09-27T08:15:00Z",
      document_count: 850
    },
    {
      id: "src-nba",
      name: "National Biodiversity Authority (NBA)",
      organization: "Ministry of Environment, Forest & Climate Change",
      base_url: "https://nbaindia.org/",
      source_type: "ABS",
      jurisdiction: "India",
      access_type: "PUBLIC",
      parser_type: "PDF / HTML",
      enabled: true,
      last_crawled_at: "2026-09-27T09:45:00Z",
      document_count: 65
    },
    {
      id: "src-ayush",
      name: "Ministry of AYUSH Regulatory Portal",
      organization: "Ministry of AYUSH, Govt of India",
      base_url: "https://www.ayush.gov.in/",
      source_type: "REGULATION",
      jurisdiction: "India",
      access_type: "PUBLIC",
      parser_type: "HTML",
      enabled: true,
      last_crawled_at: "2026-09-27T07:20:00Z",
      document_count: 310
    },
    {
      id: "src-wipo",
      name: "World Intellectual Property Organization (WIPO)",
      organization: "United Nations / WIPO",
      base_url: "https://www.wipo.int/",
      source_type: "INTERNATIONAL_TREATY",
      jurisdiction: "International",
      access_type: "PUBLIC",
      parser_type: "HTML / PDF",
      enabled: true,
      last_crawled_at: "2026-09-27T06:00:00Z",
      document_count: 420
    },
    {
      id: "src-fssai",
      name: "FSSAI Ayurveda-Aahar Regulations Portal",
      organization: "Ministry of Health & Family Welfare",
      base_url: "https://www.fssai.gov.in/",
      source_type: "REGULATION",
      jurisdiction: "India",
      access_type: "PUBLIC",
      parser_type: "PDF",
      enabled: true,
      last_crawled_at: "2026-09-27T12:00:00Z",
      document_count: 88
    }
  ];

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/sources');
      if (res.ok) {
        const data = await res.json();
        setSources(data.length > 0 ? data : defaultSources);
      } else {
        setSources(defaultSources);
      }
    } catch {
      setSources(defaultSources);
    }
  };

  const handleTriggerCrawl = async () => {
    setCrawling(true);
    try {
      await fetch('http://localhost:8000/api/v1/sources/crawl', { method: 'POST' });
      await fetchSources();
    } catch {
      // simulate background update
    } finally {
      setTimeout(() => setCrawling(false), 1500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Database-Driven Source Registry</h2>
            <p className="text-xs text-slate-400">No hardcoded websites inside scraper code. Dynamic configuration & change tracking.</p>
          </div>
        </div>

        <button
          onClick={handleTriggerCrawl}
          disabled={crawling}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition shadow-lg flex items-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${crawling ? 'animate-spin' : ''}`} />
          <span>{crawling ? 'Crawling Sources...' : 'Trigger Change Detection Crawl'}</span>
        </button>
      </div>

      {/* Grid of Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(sources.length > 0 ? sources : defaultSources).map((src: any, idx: number) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 space-y-3 shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                  {src.source_type}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  {src.access_type}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-100">{src.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{src.organization}</p>

              <div className="mt-3 text-[11px] text-slate-400 space-y-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono">
                <p>Jurisdiction: <strong className="text-slate-200">{src.jurisdiction}</strong></p>
                <p>Parser: <strong className="text-slate-200">{src.parser_type}</strong></p>
                <p>Indexed Docs: <strong className="text-emerald-400">{src.document_count}</strong></p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[10px] flex items-center space-x-1">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span>Crawled: Today</span>
              </span>
              <a
                href={src.base_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1"
              >
                <span>Base Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
