import React, { useState, useEffect } from "react";
import MountainIllustration from "../../../components/ui/MountainIllustration";
import { NavIcons, UI, behavioralPrompts } from "../constants";

export default function Resources({ nightMode, setPage }) {
  const resources = [
    ["Answer framework", "Use STAR to make your stories easy to follow.", "5 min read", "Interview"],
    ["Technical interview checklist", "A concise preparation list for problem-solving rounds.", "8 min read", "Technical"],
    ["Resume impact guide", "Turn responsibilities into clear, measurable outcomes.", "6 min read", "Resume"],
    ["Calm before the interview", "A short routine for arriving focused and present.", "4 min read", "Mindset"],
    ["System Design Cheatsheet", "Core components, load balancers, caching, and databases.", "12 min read", "System Design"],
    ["HR Interview Handbook", "Questions to ask your interviewer at the end of the round.", "7 min read", "Behavioral"],
    ["Aptitude Formulas", "Quick math shortcuts for quantitative aptitude tests.", "10 min read", "Aptitude"],
    ["Cold Email Templates", "How to reach out to recruiters and engineering managers.", "5 min read", "Networking"]
  ];
  
  return <section className="pb-8">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-[#DCE3FA] bg-white/80 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#3355E8] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8]" /> RESOURCE LIBRARY
        </p>
        <h1 className={`mt-3 font-hero text-3xl font-bold tracking-[-0.05em] sm:mt-4 sm:text-[44px] sm:leading-[1.1] ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Useful when you need it.</h1>
      </div>
      <p className={`max-w-sm text-sm leading-6 mb-1 ${nightMode ? "text-slate-400" : "text-slate-600"}`}>Short, practical guides to help you prepare with more confidence.</p>
    </div>
    
    <div className="mt-8 grid gap-5 sm:gap-5 md:grid-cols-2">
      {resources.map(([title, description, duration, category]) => (
        <article key={title} className={`group rounded-[28px] sm:rounded-[28px] border p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hero ${nightMode ? "border-white/10 bg-[#10173A]/50 hover:bg-[#10173A]" : "border-[#DCE3FA] bg-white hover:border-[#3355E8]/30"}`}>
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[#EAEEFC] px-3 py-1 text-[10px] font-bold tracking-[0.1em] text-[#3355E8]">{category}</span>
            <span className={`text-[10px] font-bold ${nightMode ? "text-slate-400" : "text-slate-400"}`}>{duration}</span>
          </div>
          
          <h2 className={`mt-5 font-display text-xl sm:text-[22px] font-bold tracking-tight transition-colors ${nightMode ? "text-slate-200 group-hover:text-white" : "text-[#131A2E] group-hover:text-[#3355E8]"}`}>{title}</h2>
          <p className={`mt-2 text-xs sm:text-sm leading-5 sm:leading-6 ${nightMode ? "text-slate-400" : "text-[#6B7280]"}`}>{description}</p>
          
          <button type="button" onClick={() => alert("Guide reader will open here in V2.")} className="mt-5 inline-flex items-center font-bold text-[#3355E8] text-xs sm:text-sm transition group-hover:translate-x-1">
            Open guide <span className="ml-1 sm:ml-2 text-base sm:text-lg" aria-hidden="true">→</span>
          </button>
        </article>
      ))}
    </div>

  </section>;
}

