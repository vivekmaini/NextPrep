import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Settings({ nightMode, user }) {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Software Engineer",
    portfolio: ""
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load from local storage
    const storedProfile = JSON.parse(localStorage.getItem("nextprep-profile") || "{}");
    setProfile({
      firstName: storedProfile.firstName || user?.firstName || "Vivek",
      lastName: storedProfile.lastName || user?.lastName || "Maini",
      email: storedProfile.email || user?.email || "vivek@example.com",
      role: storedProfile.role || "Software Engineer",
      portfolio: storedProfile.portfolio || ""
    });
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("nextprep-profile", JSON.stringify(profile));
    
    // Update global context so UI changes immediately
    if (updateUser) {
      updateUser({
        ...user,
        name: `${profile.firstName} ${profile.lastName}`.trim(),
        email: profile.email,
        role: profile.role
      });
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleExport = () => {
    const data = {
      profile,
      history: JSON.parse(localStorage.getItem("nextprep-history") || "[]"),
      minutes: localStorage.getItem("nextprep-minutes")
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nextprep-export.json";
    a.click();
  };

  const handleDelete = () => {
    if(window.confirm("Are you sure you want to wipe your local data? This is irreversible.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const inputClass = `mt-2 w-full rounded-xl border p-3.5 text-[15px] font-medium outline-none transition-all ${
    nightMode 
      ? "border-white/10 bg-white/5 text-white focus:border-[#0057FF]" 
      : "border-slate-200 bg-[#FBFAF8] text-slate-800 focus:border-[#0057FF] focus:bg-white"
  }`;

  return (
    <section className="pb-16 max-w-4xl animate-in fade-in duration-500">
      <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-[#0057FF] shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#0057FF]" /> PREFERENCES
      </p>
      <h1 className={`mt-4 font-display text-4xl font-bold tracking-tight sm:mt-5 sm:text-5xl ${nightMode ? "text-white" : "text-slate-800"}`}>Profile Settings.</h1>
      <p className={`mt-3 text-[15px] leading-6 mb-10 ${nightMode ? "text-slate-400" : "text-slate-500"}`}>Manage your personal details, career goals, and data privacy locally.</p>

      <form onSubmit={handleSave} className="space-y-8">
        <div className={`rounded-[28px] border p-8 sm:p-10 shadow-sm ${nightMode ? "border-white/10 bg-[#10173A]/50" : "border-slate-100 bg-white"}`}>
          <h2 className={`font-display text-2xl font-bold ${nightMode ? "text-white" : "text-slate-800"}`}>Personal Details</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <label className={`text-[11px] font-extrabold tracking-[0.1em] ${nightMode ? "text-slate-400" : "text-slate-500"}`}>FIRST NAME</label>
              <input type="text" value={profile.firstName} onChange={e => setProfile({...profile, firstName: e.target.value})} className={inputClass} />
            </div>
            <div>
              <label className={`text-[11px] font-extrabold tracking-[0.1em] ${nightMode ? "text-slate-400" : "text-slate-500"}`}>LAST NAME</label>
              <input type="text" value={profile.lastName} onChange={e => setProfile({...profile, lastName: e.target.value})} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className={`text-[11px] font-extrabold tracking-[0.1em] ${nightMode ? "text-slate-400" : "text-slate-500"}`}>EMAIL ADDRESS</label>
              <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className={inputClass} />
            </div>
          </div>
        </div>

        <div className={`rounded-[28px] border p-8 sm:p-10 shadow-sm ${nightMode ? "border-white/10 bg-[#10173A]/50" : "border-slate-100 bg-white"}`}>
          <h2 className={`font-display text-2xl font-bold ${nightMode ? "text-white" : "text-slate-800"}`}>Professional Profile</h2>
          <div className="mt-8 space-y-6">
            <div>
              <label className={`text-[11px] font-extrabold tracking-[0.1em] ${nightMode ? "text-slate-400" : "text-slate-500"}`}>TARGET ROLE</label>
              <input type="text" value={profile.role} onChange={e => setProfile({...profile, role: e.target.value})} className={inputClass} />
            </div>
            <div>
              <label className={`text-[11px] font-extrabold tracking-[0.1em] ${nightMode ? "text-slate-400" : "text-slate-500"}`}>PORTFOLIO / GITHUB URL</label>
              <input type="url" placeholder="https://" value={profile.portfolio} onChange={e => setProfile({...profile, portfolio: e.target.value})} className={inputClass} />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-5 pt-4">
          <button type="submit" className="rounded-2xl bg-[#0057FF] px-10 py-4 text-[15px] font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:-translate-y-0.5 transition-all">Save Changes</button>
          {isSaved && <span className="text-[15px] font-bold text-emerald-500 animate-in fade-in slide-in-from-left-2 flex items-center gap-2"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> Profile saved!</span>}
        </div>
      </form>

      {/* Danger Zone */}
      <div className={`mt-12 rounded-[28px] border p-8 sm:p-10 shadow-sm ${nightMode ? "border-red-500/20 bg-red-500/5" : "border-red-100 bg-red-50"}`}>
        <h2 className={`font-display text-xl font-bold ${nightMode ? "text-red-400" : "text-red-600"}`}>Danger Zone</h2>
        <p className={`mt-3 text-[15px] leading-relaxed max-w-2xl ${nightMode ? "text-slate-400" : "text-slate-600"}`}>Permanently delete your account, wipe all history data, mock interview scores, and saved resumes. This action is irreversible.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button type="button" onClick={handleExport} className={`rounded-xl px-6 py-3.5 text-sm font-bold transition-all ${nightMode ? "bg-white/5 text-slate-300 hover:bg-white/10" : "bg-white border border-slate-300 text-slate-700 shadow-sm hover:bg-slate-50"}`}>Export My Data</button>
          <button type="button" onClick={handleDelete} className={`rounded-xl px-6 py-3.5 text-sm font-bold transition-all ${nightMode ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-white border border-red-200 text-red-600 shadow-sm hover:bg-red-50"}`}>Delete Account</button>
        </div>
      </div>
    </section>
  );
}
