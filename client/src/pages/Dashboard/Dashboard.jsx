import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BrandLogo from "../../components/ui/BrandLogo";
import MountainIllustration from "../../components/ui/MountainIllustration";
import Resume from "../resume/Resume";
import InterviewPractice from "../interview/InterviewPractice";
import LiveMock from "./LiveMock";
import Settings from "../Settings";
import Support from "../Support";
import Terms from "../Terms";

import { dashboardNav, NavIcons, UI, behavioralPrompts } from "./constants";
import Overview from "./sections/Overview";
import Progress from "./sections/Progress";
import Resources from "./sections/Resources";
import Coding from "./sections/Coding";

function DashboardContent() {
  const { user, isAuthenticated, initializing, logout } = useAuth();
  const [page, setPage] = useState("Overview");
  const [nightMode, setNightMode] = useState(() => localStorage.getItem("nextprep-night-mode") === "true");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("nextprep-history") || "[]"));
  const [dailyMinutes, setDailyMinutes] = useState(() => parseInt(localStorage.getItem("nextprep-minutes") || "0"));
  const [milestone, setMilestone] = useState(() => {
    const saved = localStorage.getItem("nextprep-milestone");
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 14);
    return saved ? JSON.parse(saved) : { role: "Software Engineer", company: "Google", date: defaultDate.toISOString().split('T')[0] };
  });

  const [promptIndex, setPromptIndex] = useState(() => Math.floor(Math.random() * behavioralPrompts.length));
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  
  const firstName = (user?.full_name || user?.name || "there").trim().split(" ")[0];

  useEffect(() => {
    localStorage.setItem("nextprep-night-mode", String(nightMode));
  }, [nightMode]);

  const cyclePrompt = () => {
    setPromptIndex((prev) => {
      let nextIndex = prev;
      while (nextIndex === prev) {
        nextIndex = Math.floor(Math.random() * behavioralPrompts.length);
      }
      return nextIndex;
    });
    setAnswer("");
    setResult(null);
  };

  const checkAnswer = () => {
    if (answer.trim().length === 0) return;
    const words = answer.trim().split(/\s+/).filter(Boolean);
    const hasAction = /\b(built|led|created|improved|solved|launched|designed|delivered|learned)\b/i.test(answer);
    const hasResult = /\b\d+[%+]?\b|\b(impact|result|outcome|increase|reduced|decreased)\b/i.test(answer);
    const score = words.length < 12 ? 42 : Math.min(94, 58 + (words.length > 35 ? 12 : 4) + (hasAction ? 12 : 0) + (hasResult ? 12 : 0));
    
    const evalMessage = words.length < 12 ? "Add a little more detail: situation, action, then outcome." : hasResult ? "Strong signal—you made your impact clear." : "Good start. End with the outcome or what you learned.";
    setResult({ score, message: evalMessage });

    const newEntry = {
      id: Date.now(),
      title: "Quick Practice",
      detail: "Behavioral Mock",
      score: score,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
    
    const newHistory = [newEntry, ...history].slice(0, 15);
    setHistory(newHistory);
    localStorage.setItem("nextprep-history", JSON.stringify(newHistory));
    
    const newMinutes = dailyMinutes + 5;
    setDailyMinutes(newMinutes);
    localStorage.setItem("nextprep-minutes", newMinutes.toString());
  };

  const updateMilestone = () => {
    const company = window.prompt("Enter Target Company:", milestone.company);
    if (!company) return;
    const dateStr = window.prompt("Enter Interview Date (YYYY-MM-DD):", milestone.date);
    if (!dateStr || isNaN(Date.parse(dateStr))) return alert("Invalid date format!");
    
    const newMilestone = { ...milestone, company, date: dateStr };
    setMilestone(newMilestone);
    localStorage.setItem("nextprep-milestone", JSON.stringify(newMilestone));
  };

  if (initializing) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const bgStyle = nightMode 
    ? "bg-[#0D1525] text-[#EDF3FF]" 
    : "bg-[radial-gradient(circle_at_76%_8%,#DCE3FA_0,transparent_24%),#F7F5EF] text-[#131A2E]";

  return (
    <main className={`min-h-screen transition-colors duration-300 ${bgStyle}`}>
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        {/* Restored Modern Sidebar with reduced width (230px instead of 270px) */}
        <aside className={`hidden w-[230px] shrink-0 flex-col px-4 py-8 lg:flex ${nightMode ? "border-r border-white/10 bg-[#10173A]/50 backdrop-blur-md" : "border-r border-[#DCE3FA] bg-white/60 backdrop-blur-xl"}`}>
          <div className="px-3"><BrandLogo dark={nightMode} /></div>
          
          <p className={`mt-14 px-3 text-[10px] font-bold tracking-[0.15em] ${nightMode ? "text-slate-500" : "text-[#6B7280]"}`}>MAIN MENU</p>
          
          <nav className="mt-4 space-y-1.5" aria-label="Dashboard navigation">
            {dashboardNav.map((item) => {
              const isActive = page === item;
              return (
                <button 
                  key={item} 
                  onClick={() => setPage(item)} 
                  className={`group relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all duration-300 overflow-hidden ${
                    isActive 
                      ? nightMode ? "bg-[#3355E8]/10 text-white" : "bg-white shadow-sm text-[#131A2E]"
                      : nightMode ? "text-slate-400 hover:text-slate-200 hover:bg-white/5" : "text-[#6B7280] hover:text-[#131A2E] hover:bg-black/5"
                  }`}
                >
                  {isActive && (
                    <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1 rounded-r-md ${nightMode ? "bg-[#3355E8]" : "bg-[#3355E8]"}`} />
                  )}
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                    isActive 
                      ? nightMode ? "bg-[#3355E8] text-white shadow-[0_0_12px_rgba(51,85,232,0.5)]" : "bg-[#EAEEFC] text-[#3355E8]" 
                      : nightMode ? "text-slate-500 group-hover:text-slate-300" : "text-[#6B7280] group-hover:text-[#3355E8]"
                  }`}>
                    {NavIcons[item]}
                  </span>
                  {item}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Area */}
        <section className="min-w-0 flex-1 flex flex-col h-screen overflow-y-auto">
          <header className={`sticky top-0 z-20 flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8 lg:py-4 backdrop-blur-md ${nightMode ? "bg-[#0D1525]/80 border-b border-white/5" : "bg-[#F7F5EF]/80 border-b border-[#DCE3FA]/50"}`}>
            <div className="lg:hidden"><BrandLogo dark={nightMode} /></div>
            <p className={`hidden text-sm font-bold tracking-wide lg:block ${nightMode ? "text-slate-400" : "text-[#6B7280]"}`}>Your preparation, at a glance</p>
            
            <div className="flex items-center gap-3 sm:gap-4 ml-auto">
              <button 
                onClick={() => setNightMode(!nightMode)} 
                className={`group relative flex h-8 w-16 shrink-0 items-center rounded-full border transition-all duration-500 ${
                  nightMode 
                    ? "border-white/10 bg-[#10173A] shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)]" 
                    : "border-[#DCE3FA] bg-[#EAEEFC] shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
                }`}
                title={nightMode ? "Switch to Day" : "Switch to Night"}
              >
                {/* Sliding Thumb */}
                <div 
                  className={`absolute flex h-6 w-6 items-center justify-center rounded-full bg-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    nightMode 
                      ? "translate-x-9 shadow-[0_0_12px_rgba(51,85,232,0.8)] border border-transparent" 
                      : "translate-x-1 shadow-sm border border-[#DCE3FA]"
                  }`}
                >
                  <span className={`absolute flex items-center justify-center transition-all duration-500 ${nightMode ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100 text-amber-500"}`}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                  </span>
                  <span className={`absolute flex items-center justify-center transition-all duration-500 ${nightMode ? "rotate-0 scale-100 opacity-100 text-[#3355E8]" : "-rotate-90 scale-0 opacity-0"}`}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                  </span>
                </div>
              </button>
              
              <div className="relative">
                <button onClick={() => setShowProfileMenu(!showProfileMenu)} className={`flex items-center gap-2 rounded-full py-1 pl-2 pr-1 transition-all ${nightMode ? "hover:bg-white/5" : "hover:bg-black/5"}`}>
                  <span className={`hidden text-sm font-bold sm:block ${nightMode ? "text-white" : "text-[#131A2E]"}`}>{firstName}</span>
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#3355E8] text-sm font-bold text-white shadow-md ring-2 ring-white/20">
                    {firstName[0]?.toUpperCase()}
                  </div>
                </button>
                {showProfileMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                    <div className={`absolute right-0 top-full z-50 mt-2 w-56 origin-top-right overflow-hidden rounded-[24px] border shadow-soft-hero animate-in fade-in slide-in-from-top-2 ${nightMode ? "border-white/10 bg-[#10173A]" : "border-[#DCE3FA] bg-white"}`}>
                      <div className={`border-b px-5 py-4 ${nightMode ? "border-white/10" : "border-[#DCE3FA]/50"}`}>
                        <p className={`text-[10px] font-bold tracking-[0.1em] ${nightMode ? "text-slate-400" : "text-[#3355E8]"}`}>SIGNED IN AS</p>
                        <p className={`mt-1 truncate text-sm font-bold ${nightMode ? "text-white" : "text-[#131A2E]"}`}>{user?.email}</p>
                      </div>
                      <div className="p-2">
                        <button onClick={() => { setShowProfileMenu(false); setPage("Settings"); }} className={`flex w-full items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${nightMode ? "text-slate-300 hover:bg-white/10" : "text-[#6B7280] hover:bg-[#EAEEFC] hover:text-[#3355E8]"}`}>Profile Settings</button>
                        <button onClick={() => { setShowProfileMenu(false); setPage("Support"); }} className={`flex w-full items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${nightMode ? "text-slate-300 hover:bg-white/10" : "text-[#6B7280] hover:bg-[#EAEEFC] hover:text-[#3355E8]"}`}>Help & Support</button>
                        <button onClick={() => { setShowProfileMenu(false); setPage("Terms"); }} className={`flex w-full items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${nightMode ? "text-slate-300 hover:bg-white/10" : "text-[#6B7280] hover:bg-[#EAEEFC] hover:text-[#3355E8]"}`}>Terms & Conditions</button>
                      </div>
                      <div className={`border-t p-2 ${nightMode ? "border-white/10" : "border-[#DCE3FA]/50"}`}>
                        <button onClick={() => { setShowProfileMenu(false); logout(); }} className={`flex w-full items-center rounded-xl px-4 py-2.5 text-sm font-bold text-red-500 transition-colors ${nightMode ? "hover:bg-red-500/10" : "hover:bg-red-50"}`}>Log out</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </header>
          
          <div className="mx-auto w-full max-w-[1360px] px-4 pb-16 pt-4 sm:px-6 sm:pt-6 lg:px-8">
            <div className="lg:hidden -mx-4 mb-6 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <nav className="flex items-center gap-2">
                {dashboardNav.map((item) => (
                  <button key={item} onClick={() => setPage(item)} className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all ${page === item ? nightMode ? "bg-[#3355E8] text-white shadow-[0_0_12px_rgba(51,85,232,0.4)]" : "bg-[#131A2E] text-white shadow-md" : nightMode ? "bg-white/5 text-slate-400" : "bg-white text-[#6B7280] border border-transparent shadow-sm"}`}>
                    {item}
                  </button>
                ))}
              </nav>
            </div>
            
            {page === "Resume" ? <Resume /> : 
             page === "Practice" ? <InterviewPractice /> : 
             page === "Mock Interview" ? <LiveMock nightMode={nightMode} /> :
             page === "Coding" ? <Coding nightMode={nightMode} /> :
             page === "Progress" ? <Progress nightMode={nightMode} history={history} setPage={setPage} /> : 
             page === "Resources" ? <Resources nightMode={nightMode} setPage={setPage} /> : 
             page === "Settings" ? <Settings nightMode={nightMode} user={user} /> :
             page === "Support" ? <Support nightMode={nightMode} /> :
             page === "Terms" ? <Terms nightMode={nightMode} /> : 
              <Overview 
                firstName={firstName} answer={answer} setAnswer={setAnswer} result={result} checkAnswer={checkAnswer} 
                nightMode={nightMode} behavioralPrompts={behavioralPrompts} promptIndex={promptIndex} cyclePrompt={cyclePrompt} 
                history={history} dailyMinutes={dailyMinutes} milestone={milestone} updateMilestone={updateMilestone}
                setPage={setPage}
              />
            }
          </div>
        </section>
      </div>
    </main>
  );
}



import React from 'react';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Dashboard Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#330000', color: '#ffaaaa', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2>React Crash Detected in Dashboard</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Click to view exact error</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children; 
  }
}

export default function Dashboard() {
  return <ErrorBoundary><DashboardContent /></ErrorBoundary>;
}

