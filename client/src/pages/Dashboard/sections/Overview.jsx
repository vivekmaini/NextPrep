import React, { useState, useEffect } from "react";
import MountainIllustration from "../../../components/ui/MountainIllustration";
import { NavIcons, UI, behavioralPrompts } from "../constants";

export default function Overview({ firstName, answer, setAnswer, result, checkAnswer, nightMode, behavioralPrompts, promptIndex, cyclePrompt, history, dailyMinutes, milestone, updateMilestone, setPage }) {
  const [showMockMenu, setShowMockMenu] = useState(false);
  
  const behavioralHistory = history.filter(h => h.detail.includes("Behavioral"));
  const avgBehavioralScore = behavioralHistory.length > 0 
    ? Math.round(behavioralHistory.reduce((acc, curr) => acc + curr.score, 0) / behavioralHistory.length) 
    : 0;

  const progressPercent = Math.min(100, Math.round((dailyMinutes / 50) * 100));
  const daysLeft = Math.max(0, Math.ceil((new Date(milestone.date) - new Date()) / (1000 * 60 * 60 * 24)));

  return <>
    {/* Tighter header aligned horizontally on large screens */}
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-[#DCE3FA] bg-white/80 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#3355E8] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8] animate-pulse" /> DASHBOARD
        </p>
        <h1 className={`mt-3 font-hero text-3xl font-bold tracking-[-0.05em] sm:mt-4 sm:text-[44px] sm:leading-[1.1] ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Welcome back, <span className="text-[#3355E8]">{firstName}</span>.</h1>
      </div>
      <p className={`max-w-sm text-sm leading-6 mb-1 ${nightMode ? "text-slate-400" : "text-slate-600"}`}>Your workspace is ready. Pick up where you left off and keep building your skills.</p>
    </div>

    {/* Reduced mt-14 to mt-6, reduced gap-6 to gap-5 */}
    <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]">
      <article className="group relative overflow-hidden rounded-[28px] bg-[#10173A] p-6 text-white shadow-soft-hero sm:rounded-[28px] sm:p-7 transition-all duration-300 hover:-translate-y-1">
        <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[32px] border-white/5 blur-sm" aria-hidden="true" />
        <MountainIllustration className="pointer-events-none absolute -bottom-10 -right-10 w-64 opacity-50 mix-blend-screen transition-opacity group-hover:opacity-70 sm:right-0 sm:w-72" />
        
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.14em] text-blue-200/80">SUGGESTED MODULE</p>
            <h2 className="mt-2 font-brand text-2xl sm:text-[28px] font-extrabold tracking-[-0.04em] sm:mt-2 sm:text-[26px]">Technical Mock</h2>
          </div>
          <div className="relative">
            <button type="button" onClick={() => setShowMockMenu(!showMockMenu)} className="rounded-xl bg-white/10 p-2 text-white backdrop-blur-md transition hover:bg-white/20" aria-label="More options">•••</button>
            {showMockMenu && (
              <div className="absolute right-0 top-full mt-2 w-44 rounded-[16px] border border-white/10 bg-[#0B1026] p-1.5 shadow-2xl backdrop-blur-xl z-50">
                <button onClick={() => { setShowMockMenu(false); setPage("Mock Interview"); }} className="w-full rounded-[10px] px-3 py-2 text-left text-sm font-bold text-white transition hover:bg-white/10">Start Mock</button>
                <button onClick={() => { setShowMockMenu(false); setPage("Progress"); }} className="w-full rounded-[10px] px-3 py-2 text-left text-sm font-medium text-slate-300 transition hover:bg-white/10">View Analysis</button>
              </div>
            )}
          </div>
        </div>
        <p className="relative z-10 mt-3 max-w-[16rem] text-sm leading-6 text-blue-100/90 sm:mt-3 sm:max-w-[18rem]">Prepare for your upcoming system design and algorithmic problem-solving rounds.</p>
        <div className="relative z-10 mt-5 flex flex-wrap items-center gap-2 text-xs font-bold text-white sm:mt-6 sm:gap-3">
          <span className="rounded-xl bg-[#3355E8] px-3 py-2 sm:px-4 sm:py-2 shadow-sm flex items-center gap-2"><span className="w-4 h-4">{NavIcons.Practice}</span> 45 minutes</span>
          <span className="rounded-xl bg-white/10 px-3 py-2 sm:px-4 sm:py-2 backdrop-blur-md">Hard Difficulty</span>
        </div>
        
        <button type="button" onClick={() => setPage("Mock Interview")} className="relative z-10 mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#10173A] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EAEEFC] sm:mt-8">
          Start Session <span className="ml-1 text-lg transition-transform group-hover:translate-x-1">→</span>
        </button>
      </article>

      <article className={`flex flex-col justify-between rounded-[28px] border p-6 sm:rounded-[28px] sm:p-7 shadow-soft transition-transform hover:-translate-y-1 duration-300 ${nightMode ? "border-white/10 bg-[#10173A]/50" : "border-[#DCE3FA] bg-white"}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-[10px] font-bold tracking-[0.14em] ${nightMode ? "text-slate-400" : "text-[#3355E8]"}`}>DAILY PROGRESS</p>
            <h2 className={`mt-1 font-display text-2xl font-bold tracking-tight sm:mt-1 sm:text-[24px] ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Time Spent</h2>
          </div>
          <div className="flex h-14 w-14 sm:h-[64px] sm:w-[64px] items-center justify-center rounded-full border-[6px] border-[#EAEEFC] bg-white text-base font-bold text-[#3355E8] shadow-sm">{progressPercent}%</div>
        </div>
        <div className="mt-5 sm:mt-6">
          <p className={`text-sm leading-6 ${nightMode ? "text-slate-400" : "text-slate-600"}`}>You&apos;ve completed <span className={`font-bold ${nightMode ? "text-white" : "text-[#131A2E]"}`}>{dailyMinutes} of 50 minutes</span> of focused preparation today.</p>
          <div className={`mt-4 h-2.5 sm:mt-5 overflow-hidden rounded-full ${nightMode ? "bg-white/10" : "bg-[#EAEEFC]"}`}>
            <div className="h-full rounded-full bg-[#3355E8] transition-all duration-1000 shadow-[0_0_12px_rgba(51,85,232,0.6)]" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className={`mt-3 flex justify-between text-xs font-bold ${nightMode ? "text-slate-400" : "text-slate-500"}`}>
            <span>{dailyMinutes} min done</span>
            <span>{Math.max(0, 50 - dailyMinutes)} min left</span>
          </div>
        </div>
      </article>
    </section>

    <section className="mt-6 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <div className={`rounded-[28px] border p-6 sm:rounded-[28px] sm:p-7 shadow-soft ${nightMode ? "border-white/10 bg-[#10173A]/30" : "border-[#DCE3FA] bg-white/60 backdrop-blur-md"}`}>
        <p className={`text-[10px] font-bold tracking-[0.14em] ${nightMode ? "text-slate-400" : "text-[#3355E8]"}`}>SKILL READINESS</p>
        <h2 className={`mt-2 font-display text-xl font-bold tracking-[-0.04em] sm:mt-2 sm:text-2xl ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Actual Performance.</h2>
        <p className={`text-xs mt-1 mb-4 ${nightMode ? "text-slate-500" : "text-slate-400"}`}>Scores based on your recent practice history.</p>
        
        <div className="mt-4 space-y-4 sm:mt-5 sm:space-y-5">
          {[["System Design", 0, "No data"], ["Algorithms", 0, "No data"], ["Behavioral", avgBehavioralScore, avgBehavioralScore > 0 ? "" : "Try quick practice"]].map(([label, value, emptyMsg]) => (
            <div key={label}>
              <div className="flex justify-between text-sm">
                <span className={`font-bold ${nightMode ? "text-slate-200" : "text-[#131A2E]"}`}>{label} {emptyMsg && <span className="font-normal text-[10px] ml-2 text-slate-400">({emptyMsg})</span>}</span>
                <span className={`font-bold ${nightMode ? "text-slate-400" : "text-slate-500"}`}>{value}%</span>
              </div>
              <div className={`mt-2 h-2 rounded-full ${nightMode ? "bg-white/10" : "bg-[#EAEEFC]"}`}>
                <div className="h-full rounded-full bg-[#3355E8] transition-all duration-1000" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={`rounded-[28px] border p-6 sm:rounded-[28px] sm:p-7 shadow-soft-lg flex flex-col ${nightMode ? "border-[#3355E8]/30 bg-[#10173A]" : "border-[#DCE3FA] bg-white"}`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.14em] text-[#3355E8]">QUICK PRACTICE</p>
            <h2 className={`mt-1 font-display text-xl font-bold tracking-[-0.04em] sm:mt-2 sm:text-2xl ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Perfect your delivery.</h2>
          </div>
          <button onClick={cyclePrompt} className={`p-2 rounded-full border transition-all hover:rotate-180 ${nightMode ? "bg-white/5 border-white/10 text-slate-300" : "bg-[#EAEEFC] border-[#DCE3FA] text-[#3355E8]"}`} title="Get new prompt">
            {UI.Refresh}
          </button>
        </div>
        
        <p className={`mt-3 text-sm leading-6 font-medium ${nightMode ? "text-slate-300" : "text-[#131A2E]"}`}>"{behavioralPrompts[promptIndex]}"</p>
        
        {/* Shrunk the textarea min-height from 140px to 100px */}
        <textarea 
          value={answer} 
          onChange={(event) => setAnswer(event.target.value)} 
          placeholder="Answer this to update your real Behavioral score..." 
          className={`mt-4 min-h-[100px] flex-1 w-full resize-none rounded-[20px] border p-4 text-sm leading-6 outline-none transition-all duration-200 ${
            nightMode ? "border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-[#3355E8] focus:bg-white/10" : "border-[#DCE3FA] bg-[#F7F5EF]/50 text-[#131A2E] placeholder:text-[#6B7280] focus:border-[#3355E8] focus:bg-white focus:ring-4 focus:ring-[#EAEEFC]"
          }`} 
          maxLength={700} 
        />
        
        <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <span className={`text-xs font-bold ${nightMode ? "text-slate-400" : "text-[#6B7280]"}`}>
            {answer.trim() ? `${answer.trim().split(/\s+/).length} words` : "Aim for 35–60 words"}
          </span>
          <button type="button" onClick={checkAnswer} className="w-full sm:w-auto rounded-full bg-[#3355E8] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#2542C4] active:translate-y-0">
            Evaluate & Save
          </button>
        </div>
        
        {result && (
          <div className={`mt-4 flex items-start gap-3 rounded-[20px] p-4 border ${nightMode ? "bg-[#3355E8]/10 border-[#3355E8]/20" : "bg-[#EAEEFC] border-[#DCE3FA]"}`}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-[#3355E8] text-sm font-bold text-white shadow-sm">{result.score}</span>
            <div className="pt-0.5">
              <p className={`text-[10px] font-bold tracking-[0.1em] ${nightMode ? "text-blue-300" : "text-[#3355E8]"}`}>SAVED TO HISTORY</p>
              <p className={`mt-1 text-xs font-bold leading-5 ${nightMode ? "text-slate-200" : "text-[#131A2E]"}`}>{result.message}</p>
            </div>
          </div>
        )}
      </div>
    </section>

    <section className="mt-6 grid gap-5 pb-8 lg:grid-cols-[1.2fr_0.8fr]">
      <article className={`rounded-[28px] border p-6 sm:rounded-[28px] sm:p-7 shadow-soft flex flex-col justify-between ${nightMode ? "border-white/10 bg-[#10173A]/50" : "border-[#DCE3FA] bg-white"}`}>
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-[10px] font-bold tracking-[0.14em] flex items-center gap-2 ${nightMode ? "text-slate-400" : "text-[#3355E8]"}`}>
                UPCOMING MILESTONE 
                <button onClick={updateMilestone} className="hover:text-blue-500 transition-colors" title="Edit Milestone">{UI.Edit}</button>
              </p>
              <h2 className={`mt-1 font-display text-xl font-bold tracking-tight sm:mt-1 sm:text-[24px] ${nightMode ? "text-white" : "text-[#131A2E]"}`}>{milestone.role}</h2>
            </div>
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${nightMode ? "bg-white/10 text-white" : "bg-[#EAEEFC] text-[#3355E8]"}`}>
              {UI.Calendar}
            </span>
          </div>
          <p className={`mt-2 text-sm font-bold ${nightMode ? "text-slate-400" : "text-[#6B7280]"}`}>{milestone.company} • Targeted Date: {new Date(milestone.date).toLocaleDateString()}</p>
        </div>
        
        <div className={`mt-6 flex items-center justify-between rounded-[20px] p-5 border ${nightMode ? "bg-[#10173A] border-white/10" : "bg-[#F7F5EF]/50 border-[#DCE3FA]"}`}>
           <div>
             <p className={`text-3xl font-display font-bold ${nightMode ? "text-white" : "text-[#3355E8]"}`}>{daysLeft}</p>
             <p className={`text-[10px] font-bold tracking-wider mt-1 uppercase ${nightMode ? "text-slate-400" : "text-slate-500"}`}>Days left</p>
           </div>
           <button onClick={() => setPage("Resources")} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${nightMode ? "bg-white/10 hover:bg-white/20 text-white" : "bg-white border border-[#DCE3FA] shadow-sm text-[#3355E8] hover:bg-[#EAEEFC]"}`}>
             Review Notes
           </button>
        </div>
      </article>
      
      <article className={`rounded-[28px] border p-6 sm:rounded-[28px] sm:p-7 shadow-soft flex flex-col ${nightMode ? "border-white/10 bg-[#10173A]/30" : "border-[#DCE3FA] bg-white/60"}`}>
        <div className="flex items-center justify-between mb-4">
          <p className={`text-[10px] font-bold tracking-[0.14em] ${nightMode ? "text-slate-400" : "text-slate-500"}`}>RECENT ACTIVITY</p>
          <span className="rounded-full bg-[#FFF1D8] px-3 py-1.5 text-[10px] font-bold text-[#B66A00] shadow-sm">{history.length} Sessions</span>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-3 max-h-[160px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
              <span className="mb-2 text-3xl">📭</span>
              <p className={`text-sm font-bold ${nightMode ? "text-slate-400" : "text-slate-500"}`}>No recent activity.</p>
              <p className={`text-xs mt-1 ${nightMode ? "text-slate-500" : "text-slate-400"}`}>Complete a quick practice to see your scores here.</p>
            </div>
          ) : (
            history.slice(0, 4).map((entry) => (
              <div key={entry.id} className={`flex items-center justify-between p-3 rounded-2xl border ${nightMode ? "bg-white/5 border-white/5" : "bg-white border-[#DCE3FA] shadow-sm"}`}>
                <div>
                  <p className={`text-xs font-bold ${nightMode ? "text-white" : "text-[#131A2E]"}`}>{entry.title}</p>
                  <p className={`text-[10px] font-medium mt-0.5 ${nightMode ? "text-slate-400" : "text-slate-500"}`}>{entry.date} • {entry.detail}</p>
                </div>
                <span className={`text-sm font-bold px-2 py-1 rounded-md ${nightMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-700"}`}>{entry.score}%</span>
              </div>
            ))
          )}
        </div>
      </article>
    </section>
  </>;
}

