import React, { useState, useEffect } from "react";
import MountainIllustration from "../../../components/ui/MountainIllustration";
import { NavIcons, UI, behavioralPrompts } from "../constants";

export default function Progress({ nightMode, history, setPage }) {
  const avgScore = history.length > 0 ? Math.round(history.reduce((a, b) => a + b.score, 0) / history.length) : 0;
  
  const metrics = [
    ["System Design", "Not started yet", 0, "bg-[#3355E8]"],
    ["Algorithms", "Not started yet", 0, "bg-[#F0A84A]"],
    ["Behavioral", `${history.length} responses evaluated`, avgScore, "bg-[#257A5A]"],
  ];

  return <section>
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-[#DCE3FA] bg-white/80 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#3355E8] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8]" /> YOUR PROGRESS
        </p>
        <h1 className={`mt-3 font-hero text-3xl font-bold tracking-[-0.05em] sm:mt-4 sm:text-[44px] sm:leading-[1.1] ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Small sessions add up.</h1>
      </div>
      <p className={`max-w-sm text-sm leading-6 mb-1 ${nightMode ? "text-slate-400" : "text-slate-600"}`}>Review your historical data and real-time performance analytics.</p>
    </div>
    
    <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
      {[["Real", "Data active"], [history.length.toString(), "Total sessions"], [avgScore.toString(), "Average score"]].map(([value, label]) => (
        <article key={label} className={`rounded-[24px] sm:rounded-[28px] border p-5 sm:p-7 shadow-soft transition-transform hover:-translate-y-1 ${nightMode ? "border-white/10 bg-[#10173A]/50" : "border-[#DCE3FA] bg-white"}`}>
          <p className="font-display text-4xl sm:text-[40px] font-bold tracking-tight text-[#3355E8]">{value}{label === "Average score" ? "%" : ""}</p>
          <p className={`mt-2 text-sm font-bold ${nightMode ? "text-slate-400" : "text-[#6B7280]"}`}>{label}</p>
        </article>
      ))}
    </div>
    
    <section className={`mt-6 rounded-[28px] sm:rounded-[28px] border p-6 sm:p-7 shadow-soft ${nightMode ? "border-white/10 bg-[#10173A]/30" : "border-[#DCE3FA] bg-white/60 backdrop-blur-md"}`}>
      <p className={`text-[10px] font-bold tracking-[0.14em] ${nightMode ? "text-slate-400" : "text-[#3355E8]"}`}>SKILL BREAKDOWN</p>
      <h2 className={`mt-2 font-display text-2xl font-bold tracking-tight ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Actual Performance Stats.</h2>
      <div className="mt-6 space-y-5 sm:space-y-6">
        {metrics.map(([name, detail, value, color]) => (
          <div key={name}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className={`text-sm sm:text-base font-bold ${nightMode ? "text-slate-200" : "text-[#131A2E]"}`}>{name}</p>
                <p className={`mt-1 text-xs font-medium ${nightMode ? "text-slate-400" : "text-slate-500"}`}>{detail}</p>
              </div>
              <span className={`text-base font-bold ${nightMode ? "text-slate-300" : "text-[#6B7280]"}`}>{value}%</span>
            </div>
            <div className={`mt-3 h-2 rounded-full ${nightMode ? "bg-white/10" : "bg-[#EAEEFC]"}`}>
              <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
    
    <section className={`mt-6 mb-8 overflow-hidden rounded-[28px] sm:rounded-[28px] border pb-3 shadow-soft ${nightMode ? "border-white/10 bg-[#10173A]/50" : "border-[#DCE3FA] bg-white"}`}>
      <div className={`border-b px-6 py-4 sm:px-7 sm:py-5 ${nightMode ? "border-white/10" : "border-[#DCE3FA]/50"}`}>
        <p className={`text-[10px] font-bold tracking-[0.14em] ${nightMode ? "text-slate-400" : "text-[#3355E8]"}`}>YOUR FULL ACTIVITY LOG</p>
      </div>
      {history.length === 0 ? (
        <div className="p-8 text-center flex flex-col items-center">
          <p className={`text-sm font-bold ${nightMode ? "text-slate-400" : "text-slate-500"}`}>No history yet. Start practicing to generate real data!</p>
          <button onClick={() => setPage("Practice")} className="mt-4 rounded-full bg-[#3355E8] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:-translate-y-0.5 transition-all">Go to Practice</button>
        </div>
      ) : (
        history.map((entry) => (
          <article key={entry.id} className={`flex items-center gap-4 sm:gap-5 border-b p-4 sm:p-5 last:border-0 sm:px-7 transition hover:bg-black/5 ${nightMode ? "border-white/5" : "border-slate-100"}`}>
            <span className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-[16px] sm:rounded-[20px] bg-[#EAEEFC] text-sm sm:text-base font-bold text-[#3355E8] shadow-sm">{entry.score}</span>
            <div className="min-w-0 flex-1">
              <p className={`text-sm sm:text-base font-bold ${nightMode ? "text-slate-200" : "text-[#131A2E]"}`}>{entry.title}</p>
              <p className={`mt-1 text-xs font-medium ${nightMode ? "text-slate-400" : "text-[#6B7280]"}`}>{entry.detail}</p>
            </div>
            <span className={`text-[10px] sm:text-xs font-bold ${nightMode ? "text-slate-500" : "text-slate-400"}`}>{entry.date}</span>
          </article>
        ))
      )}
    </section>
  </section>;
}

