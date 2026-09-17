import React from "react";

export default function Settings({ nightMode, user }) {
  const inputClass = `mt-2 w-full rounded-xl border p-3.5 text-sm outline-none transition-all ${
    nightMode 
      ? "border-white/10 bg-white/5 text-white focus:border-[#3355E8]" 
      : "border-[#DCE3FA] bg-white text-[#131A2E] focus:border-[#3355E8] focus:ring-4 focus:ring-[#EAEEFC]"
  }`;

  const Toggle = ({ defaultChecked }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
      <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${nightMode ? "bg-slate-700 peer-checked:bg-[#3355E8]" : "bg-slate-200 peer-checked:bg-[#3355E8]"}`}></div>
    </label>
  );

  return (
    <section className="pb-12 max-w-4xl animate-in fade-in duration-500">
      <p className="inline-flex items-center gap-2 rounded-full border border-[#DCE3FA] bg-white/80 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-[#3355E8] shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8]" /> PREFERENCES
      </p>
      <h1 className={`mt-4 font-hero text-3xl font-bold tracking-[-0.05em] sm:mt-5 sm:text-5xl ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Profile Settings.</h1>
      <p className={`mt-3 text-sm leading-6 sm:mt-4 sm:text-base ${nightMode ? "text-slate-400" : "text-slate-600"}`}>Manage your personal information, notification preferences, and account security.</p>

      <div className="mt-10 space-y-8">
        {/* Personal Details */}
        <div className={`rounded-[28px] sm:rounded-[32px] border p-6 sm:p-9 shadow-soft ${nightMode ? "border-white/10 bg-[#10173A]/30" : "border-[#DCE3FA] bg-white"}`}>
          <h2 className={`font-display text-xl font-bold ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Personal Details</h2>
          <p className={`mt-1 text-sm ${nightMode ? "text-slate-400" : "text-slate-500"}`}>Update your basic profile information.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label className={`text-xs font-bold tracking-wide ${nightMode ? "text-slate-400" : "text-slate-500"}`}>FULL NAME</label>
              <input type="text" defaultValue={user?.full_name || user?.name || "Student"} className={inputClass} />
            </div>
            <div>
              <label className={`text-xs font-bold tracking-wide ${nightMode ? "text-slate-400" : "text-slate-500"}`}>EMAIL ADDRESS</label>
              <input type="email" defaultValue={user?.email || "student@university.edu"} disabled className={`${inputClass} opacity-60 cursor-not-allowed`} />
            </div>
            <div>
              <label className={`text-xs font-bold tracking-wide ${nightMode ? "text-slate-400" : "text-slate-500"}`}>PHONE NUMBER (OPTIONAL)</label>
              <input type="tel" placeholder="+91 98765 43210" className={inputClass} />
            </div>
            <div>
              <label className={`text-xs font-bold tracking-wide ${nightMode ? "text-slate-400" : "text-slate-500"}`}>LINKEDIN URL</label>
              <input type="url" placeholder="linkedin.com/in/username" className={inputClass} />
            </div>
          </div>
          <button className="mt-8 rounded-full bg-[#3355E8] px-7 py-3 text-sm font-bold text-white shadow-md hover:-translate-y-0.5 transition-all">Save Profile</button>
        </div>

        {/* Application Preferences */}
        <div className={`rounded-[28px] sm:rounded-[32px] border p-6 sm:p-9 shadow-soft ${nightMode ? "border-white/10 bg-[#10173A]/30" : "border-[#DCE3FA] bg-white"}`}>
          <h2 className={`font-display text-xl font-bold ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Application Preferences</h2>
          <p className={`mt-1 text-sm ${nightMode ? "text-slate-400" : "text-slate-500"}`}>Customize how NextPrep works for you.</p>
          
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-bold text-sm ${nightMode ? "text-slate-200" : "text-[#131A2E]"}`}>Daily Practice Reminders</p>
                <p className={`text-xs mt-1 ${nightMode ? "text-slate-400" : "text-slate-500"}`}>Receive an email to keep your streak going.</p>
              </div>
              <Toggle defaultChecked={true} />
            </div>
            <div className={`h-px w-full ${nightMode ? "bg-white/10" : "bg-[#DCE3FA]"}`}></div>
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-bold text-sm ${nightMode ? "text-slate-200" : "text-[#131A2E]"}`}>Strict Evaluation Mode</p>
                <p className={`text-xs mt-1 max-w-[250px] sm:max-w-md ${nightMode ? "text-slate-400" : "text-slate-500"}`}>AI will evaluate your answers more harshly, expecting deep technical details and specific metrics.</p>
              </div>
              <Toggle defaultChecked={false} />
            </div>
            <div className={`h-px w-full ${nightMode ? "bg-white/10" : "bg-[#DCE3FA]"}`}></div>
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-bold text-sm ${nightMode ? "text-slate-200" : "text-[#131A2E]"}`}>Default Practice Difficulty</p>
                <p className={`text-xs mt-1 ${nightMode ? "text-slate-400" : "text-slate-500"}`}>Select your target tier.</p>
              </div>
              <select className={`rounded-xl border p-2 text-sm outline-none transition-all ${nightMode ? "border-white/10 bg-[#10173A] text-white focus:border-[#3355E8]" : "border-[#DCE3FA] bg-[#F7F5EF]/50 text-[#131A2E] focus:border-[#3355E8]"}`}>
                <option>Beginner (Startups)</option>
                <option>Intermediate (Mid-level)</option>
                <option>Advanced (MAANG / Tier-1)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Subscription / Plan */}
        <div className={`rounded-[28px] sm:rounded-[32px] border p-6 sm:p-9 shadow-soft flex items-center justify-between ${nightMode ? "border-[#3355E8]/30 bg-[#3355E8]/10" : "border-[#3355E8]/20 bg-[#EAEEFC]"}`}>
          <div>
            <h2 className={`font-display text-xl font-bold ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Current Plan: Pro (Local)</h2>
            <p className={`mt-2 text-sm max-w-xl ${nightMode ? "text-slate-300" : "text-[#6B7280]"}`}>You are running NextPrep locally via Ollama. You have unlimited practice sessions, resume generations, and full data privacy with no recurring cloud costs.</p>
          </div>
          <div className="hidden sm:flex h-16 w-16 items-center justify-center rounded-full bg-[#3355E8] text-white shadow-md">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>

        {/* Danger Zone */}
        <div className={`rounded-[28px] sm:rounded-[32px] border p-6 sm:p-9 shadow-soft ${nightMode ? "border-red-500/20 bg-red-500/5" : "border-red-100 bg-red-50/50"}`}>
          <h2 className={`font-display text-xl font-bold ${nightMode ? "text-red-400" : "text-red-600"}`}>Danger Zone</h2>
          <p className={`mt-2 text-sm ${nightMode ? "text-slate-400" : "text-slate-600"}`}>Permanently delete your account, wipe all history data, mock interview scores, and saved resumes. This action is irreversible.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className={`rounded-full px-6 py-3 text-sm font-bold transition-all ${nightMode ? "bg-white/5 text-slate-300 hover:bg-white/10" : "bg-white border border-slate-300 text-slate-700 shadow-sm hover:bg-slate-50"}`}>Export My Data</button>
            <button className={`rounded-full px-6 py-3 text-sm font-bold transition-all ${nightMode ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-white border border-red-200 text-red-600 shadow-sm hover:bg-red-50"}`}>Delete Account</button>
          </div>
        </div>
      </div>
    </section>
  );
}
