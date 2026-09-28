import React, { useState } from 'react';
import { History, Calendar, GitCommit, ArrowRight, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

export const RegulationTimelineView: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState('bda');

  const timelines: Record<string, any> = {
    bda: {
      title: "Biological Diversity Act & Amendments Timeline",
      jurisdiction: "India",
      events: [
        {
          date: "2003-02-05",
          version: "v1.0 (Original Act)",
          title: "Enactment of Biological Diversity Act, 2002",
          change_summary: "Established National Biodiversity Authority (NBA). Section 6 mandated prior approval for filing IPR derived from Indian biological resources.",
          affected_sections: ["Section 3", "Section 6", "Section 19"],
          source_url: "https://nbaindia.org/"
        },
        {
          date: "2014-11-21",
          version: "v1.1 (ABS Regulations 2014)",
          title: "Access and Benefit Sharing Guidelines Issued",
          change_summary: "Introduced structured Form I, Form II, Form III fees and benefit-sharing fee brackets (0.1% - 0.5% of ex-factory sales).",
          affected_sections: ["ABS Guidelines 2014"],
          source_url: "https://nbaindia.org/"
        },
        {
          date: "2024-04-01",
          version: "v2.0 (Biological Diversity Amendment Act 2023)",
          title: "Biological Diversity (Amendment) Act, 2023 Effective Date",
          change_summary: "Exempted codified traditional knowledge users and registered AYUSH practitioners from benefit-sharing obligations. Streamlined NBA approval process for Indian patent applicants.",
          affected_sections: ["Section 6 (Amended)", "Section 40"],
          source_url: "https://nbaindia.org/"
        }
      ]
    },
    ayush: {
      title: "Ayurvedic Regulatory Framework & FSSAI Evolution Timeline",
      jurisdiction: "India",
      events: [
        {
          date: "1945-12-21",
          version: "v1.0",
          title: "Enactment of Drugs and Cosmetics Rules, 1945",
          change_summary: "Initial framework for regulating drugs and cosmetics in India.",
          affected_sections: ["Rule 151"],
          source_url: "https://www.ayush.gov.in/"
        },
        {
          date: "2006-08-10",
          version: "v1.5 (Schedule T Implementation)",
          title: "Mandatory GMP (Schedule T) for Ayurvedic Units",
          change_summary: "Made Good Manufacturing Practices mandatory for commercial Ayurvedic drugs manufacturing.",
          affected_sections: ["Schedule T", "Rule 157"],
          source_url: "https://www.ayush.gov.in/"
        },
        {
          date: "2022-05-05",
          version: "v2.0 (FSSAI Ayurveda Aahar Notification)",
          title: "FSSAI Ayurveda-Aahar Regulations 2022",
          change_summary: "Created distinct regulatory category for Ayurvedic food products, separating them from medicinal drugs under AYUSH SLA.",
          affected_sections: ["FSSAI Regulation 3", "Regulation 6"],
          source_url: "https://www.fssai.gov.in/"
        }
      ]
    }
  };

  const currentTimeline = timelines[selectedDoc] || timelines.bda;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Regulation Timeline — Version Evolution & Diffs</h2>
            <p className="text-xs text-slate-400">Track statutory amendments, effective dates, and "What Changed?" across regulatory versions</p>
          </div>
        </div>

        {/* Timeline Selector */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
          <button
            onClick={() => setSelectedDoc('bda')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedDoc === 'bda' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Biological Diversity Act (2002 → 2024)
          </button>
          <button
            onClick={() => setSelectedDoc('ayush')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedDoc === 'ayush' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Drugs & Cosmetics / FSSAI (1945 → 2022)
          </button>
        </div>
      </div>

      {/* Visual Chronological Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-8">
        <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <span>{currentTimeline.title}</span>
        </h3>

        <div className="relative border-l-2 border-emerald-500/30 ml-4 space-y-8 pl-6">
          {currentTimeline.events.map((event: any, idx: number) => (
            <div key={idx} className="relative group">
              {/* Node Icon */}
              <div className="absolute -left-[31px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 text-xs shadow-md">
                <GitCommit className="w-3.5 h-3.5" />
              </div>

              {/* Event Card */}
              <div className="bg-slate-950 border border-slate-800 group-hover:border-emerald-500/40 rounded-2xl p-5 space-y-3 transition-all shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                      {event.version}
                    </span>
                    <span className="text-xs font-semibold text-slate-300">{event.date}</span>
                  </div>
                  <a
                    href={event.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1"
                  >
                    <span>Official Gazette</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <h4 className="text-sm font-bold text-slate-100">{event.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <strong className="text-emerald-400">What Changed? </strong>
                  {event.change_summary}
                </p>

                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <span>Affected Provisions:</span>
                  {event.affected_sections.map((sec: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-emerald-300">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
