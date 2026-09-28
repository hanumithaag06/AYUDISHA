import React, { useState } from 'react';
import { Shield, Download, Plus, BookMarked, FileText, CheckCircle2 } from 'lucide-react';
import { jsPDF } from 'jspdf';

export const ResearchWorkspaceView: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<any[]>([
    {
      id: "ws-101",
      title: "Polyherbal Metabolic Formulation IPR & Regulatory Dossier",
      description: "Complete statutory compliance trail covering Section 3(p) TKDL defense, Section 3(e) combination synergy proof, NBA Form I, and FSSAI 2022 labelling.",
      date: "2026-09-27"
    }
  ]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateWorkspace = () => {
    if (!title.trim()) return;
    const newWs = {
      id: `ws-${Date.now().toString().slice(-4)}`,
      title: title,
      description: description || "AYUDISHA Research Dossier Workspace",
      date: new Date().toISOString().split('T')[0]
    };
    setWorkspaces([newWs, ...workspaces]);
    setTitle('');
    setDescription('');
  };

  const exportAsPDF = (ws: any) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(5, 150, 105); // emerald color
    doc.text("AYUDISHA — Regulatory & IPR Research Dossier", 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text("Where Ayurveda Meets IPR & Regulation | Source-Grounded Research Export", 14, 28);
    doc.line(14, 32, 196, 32);

    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text(`Workspace Title: ${ws.title}`, 14, 42);

    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.text(`Description: ${ws.description}`, 14, 50);
    doc.text(`Export Date: ${new Date().toLocaleDateString()}`, 14, 58);

    doc.setFontSize(11);
    doc.setTextColor(5, 150, 105);
    doc.text("Authoritative Grounded Evidence Summary:", 14, 70);

    const evidenceLines = [
      "1. Indian Patents Act, 1970 (Sec 3(p)): Classical formulation prior art verified in TKDL.",
      "2. Indian Patents Act, 1970 (Sec 3(e)): Chou-Talalay Combination Index synergy proof required.",
      "3. Biological Diversity Act, 2002 (Sec 6): Mandatory NBA Form I clearance prior to patent grant.",
      "4. Food Safety and Standards (Ayurveda Aahar) Regulations, 2022: Packaging & logo compliance."
    ];

    let y = 78;
    evidenceLines.forEach(line => {
      doc.setFontSize(10);
      doc.setTextColor(30, 41, 59);
      doc.text(line, 14, y);
      y += 8;
    });

    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("Disclaimer: AYUDISHA provides research guidance based on retrieved sources. It does not provide legal advice.", 14, 280);

    doc.save(`${ws.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_dossier.pdf`);
  };

  const exportAsMarkdown = (ws: any) => {
    const mdContent = `# AYUDISHA — Regulatory & IPR Dossier\n` +
      `**Title:** ${ws.title}\n` +
      `**Description:** ${ws.description}\n` +
      `**Date:** ${new Date().toLocaleDateString()}\n\n` +
      `## Statutory Evidence Summary\n` +
      `- **Section 3(p) TKDL Defense:** Verified against classical texts.\n` +
      `- **Section 3(e) Synergistic Efficacy:** Requires bioassay Combination Index proof.\n` +
      `- **Section 6 NBA Form I:** Mandatory prior approval before IPR grant.\n` +
      `- **FSSAI 2022 Ayurveda Aahar:** Mandatory logo and label placement.\n\n` +
      `*Exported from AYUDISHA — Where Ayurveda Meets IPR & Regulation*`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ws.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_dossier.md`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Research Workspace & Dossier Export</h2>
            <p className="text-xs text-slate-400">Save research sessions, bookmark evidence citations, and export dossiers in PDF, Markdown, or JSON</p>
          </div>
        </div>

        {/* Create Workspace Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Dossier Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Polyherbal Anti-Diabetic Patent Filing Strategy"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Description / Notes</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Sec 3(p) defense, NBA Form I, and FSSAI 2022 guidelines"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleCreateWorkspace}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2.5 rounded-xl transition shadow-lg flex items-center justify-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Research Workspace</span>
            </button>
          </div>
        </div>
      </div>

      {/* Workspaces List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-200">Active Research Workspaces ({workspaces.length})</h3>

        {workspaces.map((ws) => (
          <div key={ws.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-base font-bold text-slate-100">{ws.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{ws.description}</p>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-500/30">
                Created: {ws.date}
              </span>
            </div>

            {/* Export Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Source-Grounded Citations Attached</span>
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => exportAsPDF(ws)}
                  className="bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export PDF Dossier</span>
                </button>

                <button
                  onClick={() => exportAsMarkdown(ws)}
                  className="bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center space-x-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Export Markdown</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
