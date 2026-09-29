import React from 'react';
import { X, BookOpen, ExternalLink } from 'lucide-react';

interface SourceEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  evidenceData?: {
    sourceName?: string;
    document?: string;
    section?: string;
    page?: string;
    url?: string;
    excerpt?: string;
  };
}

export const SourceEvidenceModal: React.FC<SourceEvidenceModalProps> = ({
  isOpen,
  onClose,
  evidenceData = {
    sourceName: "Traditional Knowledge Digital Library (TKDL) & Indian Patents Act 1970",
    document: "Ayurvedic Pharmacopoeia of India (API) Vol III / Patent Gazette",
    section: "Section 3(p) & Sec 3(e) Synergistic Combination",
    page: "Page 142-148, Entry TKDL-HYD-4892",
    url: "https://ipindia.gov.in/patents.htm",
    excerpt: "Classical text reference formulation containing Haridra (Curcuma longa) and Nimba (Azadirachta indica) in oral paste preparation. Prior art established under Section 3(p)."
  }
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">SOURCE EVIDENCE & CITATION</h3>
            <p className="text-xs text-slate-400">Statutory & Classical Text Grounding</p>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Official Source</span>
            <span className="font-semibold text-emerald-300">{evidenceData.sourceName}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Document</span>
              <span className="text-slate-200">{evidenceData.document}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Section / Clause</span>
              <span className="text-slate-200">{evidenceData.section}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Page / Reference</span>
            <span className="text-slate-200 font-mono">{evidenceData.page}</span>
          </div>

          {evidenceData.excerpt && (
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Exact Retrieved Excerpt</span>
              <p className="text-slate-300 italic bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-[11px] leading-relaxed">
                "{evidenceData.excerpt}"
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3 pt-2">
          {evidenceData.url && (
            <a
              href={evidenceData.url}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5"
            >
              <span>Open Official Source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={onClose}
            className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs py-2.5 rounded-xl transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
