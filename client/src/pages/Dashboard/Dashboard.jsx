import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BrandLogo from "../../components/ui/BrandLogo";
import MountainIllustration from "../../components/ui/MountainIllustration";
import Resume from "../resume/Resume";
import InterviewPractice from "../interview/InterviewPractice";

const practiceModes = [
  { name: "Behavioral", detail: "Tell better stories from your experience.", time: "20 min" },
  { name: "Technical", detail: "Think aloud through problems clearly.", time: "30 min" },
  { name: "HR round", detail: "Practice confident, concise answers.", time: "15 min" },
];

const dashboardNav = ["Overview", "Resume", "Practice", "Progress", "Resources"];

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>;
}

export default function Dashboard() {
  const { user, isAuthenticated, initializing, logout } = useAuth();
  const [page, setPage] = useState("Overview");
  const [nightMode, setNightMode] = useState(() => localStorage.getItem("nextprep-night-mode") === "true");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const firstName = (user?.full_name || user?.name || "there").trim().split(" ")[0];

  useEffect(() => {
    localStorage.setItem("nextprep-night-mode", String(nightMode));
  }, [nightMode]);

  const checkAnswer = () => {
    const words = answer.trim().split(/\s+/).filter(Boolean);
    const hasAction = /\b(built|led|created|improved|solved|launched|designed|delivered)\b/i.test(answer);
    const hasResult = /\b\d+[%+]?\b|\b(impact|result|outcome|increase|reduced)\b/i.test(answer);
    const score = words.length < 12 ? 42 : Math.min(94, 58 + (words.length > 35 ? 12 : 4) + (hasAction ? 12 : 0) + (hasResult ? 12 : 0));
    setResult({ score, message: words.length < 12 ? "Add a little more detail: situation, action, then outcome." : hasResult ? "Strong signal—you made your impact clear." : "Good start. End with the outcome or what you learned." });
  };

  if (initializing) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <main className={`min-h-screen transition-colors duration-300 ${nightMode ? "dashboard-night bg-[#0D1525] text-[#EDF3FF]" : "bg-[#F8F7F4] text-[#16213d]"}`}>
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="hidden w-[248px] shrink-0 flex-col border-r border-slate-200/80 bg-white px-5 py-7 lg:flex">
          <BrandLogo />
          <p className="mt-12 px-3 text-[10px] font-bold tracking-[0.14em] text-slate-400">YOUR SPACE</p>
          <nav className="mt-3 space-y-1" aria-label="Dashboard navigation">
            {dashboardNav.map((item, index) => <button key={item} type="button" onClick={() => setPage(item)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${page === item ? "bg-[#E6EEFF] text-[#0057FF]" : "text-slate-500 hover:bg-slate-50 hover:text-[#16213d]"}`}><span className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs ${page === item ? "bg-[#0057FF] text-white" : "bg-slate-100 text-slate-400"}`}>{["□", "▤", "↗", "⌁", "◇"][index]}</span>{item}</button>)}
          </nav>
          <div className="mt-10 border-t border-slate-100 pt-7"><p className="px-3 text-[10px] font-bold tracking-[0.14em] text-slate-400">YOUR RHYTHM</p><div className="mt-4 rounded-2xl bg-[#16213d] p-4 text-white"><p className="text-xs font-bold tracking-[0.12em] text-blue-200">ON A ROLL</p><p className="mt-2 text-sm font-semibold">Four thoughtful days in a row.</p><div className="mt-4 flex gap-1.5">{[1, 2, 3, 4, 5, 6, 7].map((day) => <span key={day} className={`h-2 flex-1 rounded-full ${day < 6 ? "bg-[#83AEFF]" : "bg-white/15"}`} />)}</div></div></div>
          <button type="button" onClick={() => setNightMode((enabled) => !enabled)} aria-pressed={nightMode} className="mt-6 flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-[#16213d]"><span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-sm" aria-hidden="true">{nightMode ? "☀" : "☾"}</span>{nightMode ? "Day mode" : "Night mode"}</button>
          <button type="button" onClick={logout} className="mt-auto px-3 text-left text-sm font-semibold text-slate-400 transition hover:text-red-500">Log out</button>
        </aside>
        <section className="min-w-0 flex-1"><header className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10 lg:py-7"><div className="lg:hidden"><BrandLogo /></div><p className="hidden text-sm font-medium text-slate-400 lg:block">Your preparation, at a glance</p><div className="flex items-center gap-3"><button type="button" onClick={() => setNightMode((enabled) => !enabled)} aria-label={nightMode ? "Switch to day mode" : "Switch to night mode"} aria-pressed={nightMode} className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-sm text-slate-500 transition hover:border-[#0057FF] hover:text-[#0057FF]">{nightMode ? "☀" : "☾"}</button><span className="hidden text-sm font-semibold text-slate-600 sm:block">{firstName}</span><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E6EEFF] text-xs font-bold text-[#0057FF]">{firstName[0]?.toUpperCase()}</span><button type="button" onClick={logout} className="text-xs font-bold text-slate-400 hover:text-red-500 lg:hidden">Log out</button></div></header>
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-7 sm:px-8 sm:pt-10 lg:px-10">
          <div className="lg:hidden"><nav className="mb-10 grid grid-cols-2 rounded-xl border border-slate-200 bg-white p-1" aria-label="Dashboard navigation">{dashboardNav.map((item) => <button key={item} type="button" onClick={() => setPage(item)} className={`rounded-lg py-2 text-sm font-semibold ${page === item ? "bg-[#0057FF] text-white" : "text-slate-500"}`}>{item}</button>)}</nav></div>
          {page === "Resume" ? <Resume /> : page === "Practice" ? <InterviewPractice /> : page === "Progress" ? <Progress /> : page === "Resources" ? <Resources /> : <Overview firstName={firstName} answer={answer} setAnswer={setAnswer} result={result} checkAnswer={checkAnswer} />}
        </div></section>
      </div>
    </main>
  );
}

function Overview({ firstName, answer, setAnswer, result, checkAnswer }) {
  return <>
    <p className="text-xs font-bold tracking-[0.14em] text-[#0057FF]">TUESDAY, 5 AUGUST</p>
    <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.06em] sm:text-5xl">Good morning, {firstName}.</h1>
    <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">Keep it small today. One thoughtful practice session is enough.</p>

    <section className="mt-10 grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(290px,0.75fr)]">
      <article className="relative overflow-hidden rounded-[24px] bg-[#3355E8] p-6 text-white sm:p-7"><div className="absolute -right-12 -top-16 h-52 w-52 rounded-full border-[24px] border-white/10" aria-hidden="true" /><MountainIllustration className="pointer-events-none absolute -bottom-10 right-0 w-64 opacity-65" /><div className="relative flex items-start justify-between"><div><p className="text-xs font-bold tracking-[0.12em] text-[#DCE3FA]">UP NEXT</p><h2 className="mt-3 font-display text-2xl font-bold tracking-tight">Mock interview</h2></div><button type="button" className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20" aria-label="More options">•••</button></div><p className="relative mt-3 max-w-[16rem] text-sm leading-6 text-[#DCE3FA]">Practice clear, confident answers for your product and HR round.</p><div className="relative mt-7 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#DCE3FA]"><span className="rounded-lg bg-white/10 px-2.5 py-1.5">25 minutes</span><span className="rounded-lg bg-white/10 px-2.5 py-1.5">8 questions</span></div><button type="button" className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#3355E8] transition hover:bg-[#EAEEFC]">Begin practice <Arrow /></button></article>
      <article className="rounded-[24px] border border-[#E9E5DC] bg-white p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-bold tracking-[0.12em] text-slate-400">DAILY GOAL</p><h2 className="mt-2 font-display text-xl font-bold tracking-tight">Stay in rhythm</h2></div><div className="flex h-14 w-14 items-center justify-center rounded-full border-[6px] border-[#E6EEFF] text-sm font-bold text-[#0057FF]">70%</div></div><p className="mt-5 text-sm leading-6 text-slate-500">You&apos;ve completed <span className="font-bold text-[#16213d]">35 of 50 minutes</span> of focused preparation today.</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[70%] rounded-full bg-[#0057FF]" /></div><div className="mt-2 flex justify-between text-xs font-semibold text-slate-400"><span>35 min done</span><span>15 min left</span></div></article>
    </section>

    <section className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <div><p className="text-xs font-bold tracking-[0.13em] text-[#0057FF]">YOUR MOMENTUM</p><h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em]">A steady week so far.</h2><div className="mt-6 space-y-5">{[["Interview practice", 67], ["Aptitude prep", 70], ["Resume review", 85]].map(([label, value]) => <div key={label}><div className="flex justify-between text-sm"><span className="font-semibold">{label}</span><span className="text-slate-400">{value}%</span></div><div className="mt-2 h-2 rounded-full bg-slate-200"><div className="h-full rounded-full bg-[#0057FF]" style={{ width: `${value}%` }} /></div></div>)}</div><p className="mt-8 inline-flex rounded-full bg-[#FFF1D8] px-3 py-1.5 text-xs font-bold text-[#A96508]">✦ Four-day practice streak</p></div>
      <div className="rounded-[24px] border border-[#D8E5FF] bg-white p-6 sm:p-7"><p className="text-xs font-bold tracking-[0.13em] text-[#0057FF]">ANSWER SIGNAL</p><h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em]">Check the shape of an answer.</h2><p className="mt-2 text-sm leading-6 text-slate-500">Try this prompt: “Tell me about a problem you solved.”</p><textarea value={answer} onChange={(event) => { setAnswer(event.target.value); }} placeholder="Write a practice answer…" className="mt-5 min-h-28 w-full resize-none rounded-xl border border-slate-200 bg-[#FBFAF8] p-3.5 text-sm leading-6 outline-none placeholder:text-slate-400 focus:border-[#0057FF] focus:ring-4 focus:ring-[#E6EEFF]" maxLength={700} /><div className="mt-3 flex items-center justify-between"><span className="text-xs text-slate-400">{answer.trim() ? `${answer.trim().split(/\s+/).length} words` : "Aim for 35–60 words"}</span><button type="button" onClick={checkAnswer} className="rounded-xl bg-[#0057FF] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0047D1]">Evaluate</button></div>{result && <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#EAF1FF] p-3.5"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0057FF] text-sm font-bold text-white">{result.score}</span><p className="text-sm font-medium leading-5 text-slate-600">{result.message}</p></div>}</div>
    </section>

    <section className="mt-10"><div className="flex items-end justify-between"><div><p className="text-xs font-bold tracking-[0.13em] text-[#0057FF]">YOUR PLAN</p><h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em]">Keep building momentum</h2></div><button type="button" className="text-sm font-bold text-[#0057FF] hover:underline">View full plan</button></div><div className="mt-5 grid gap-4 md:grid-cols-3">{[["Interview practice", "8 of 12 questions completed", "67%", "Continue", "bg-[#0057FF]"], ["Aptitude prep", "14 of 20 questions completed", "70%", "Practice", "bg-[#F0A84A]"], ["Resume review", "One improvement left", "85%", "Review", "bg-[#257A5A]"]].map(([title, detail, percent, action, color]) => <article key={title} className="rounded-2xl border border-[#E9E5DC] bg-white p-5"><div className="flex items-start justify-between"><span className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${color}`}>✦</span><button type="button" className="text-xs font-bold text-[#0057FF] hover:underline">{action}</button></div><h3 className="mt-5 font-bold tracking-tight">{title}</h3><p className="mt-1 text-xs text-slate-500">{detail}</p><div className="mt-5 h-2 rounded-full bg-slate-100"><div className={`h-full rounded-full ${color}`} style={{ width: percent }} /></div><p className="mt-2 text-right text-xs font-bold text-slate-400">{percent}</p></article>)}</div></section>

    <section className="mt-8 grid gap-4 pb-8 lg:grid-cols-[1.2fr_0.8fr]"><article className="rounded-2xl border border-[#E9E5DC] bg-white p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-bold tracking-[0.12em] text-slate-400">THIS WEEK</p><h2 className="mt-2 font-display text-xl font-bold tracking-tight">Your consistency</h2></div><span className="rounded-full bg-[#FFF1D8] px-3 py-1.5 text-xs font-bold text-[#B66A00]">4-day streak</span></div><div className="mt-7 flex items-end justify-between gap-3">{[45, 72, 55, 90, 70, 20, 12].map((height, index) => <div key={index} className="flex flex-1 flex-col items-center gap-2"><div className="flex h-20 w-full max-w-8 items-end rounded-t-lg bg-slate-100"><div style={{ height: `${height}%` }} className={`w-full rounded-t-lg ${index < 5 ? "bg-[#0057FF]" : "bg-slate-200"}`} /></div><span className="text-[10px] font-semibold text-slate-400">{["M", "T", "W", "T", "F", "S", "S"][index]}</span></div>)}</div></article><article className="rounded-2xl border border-[#D8E5FF] bg-[#EAF1FF] p-6"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0057FF]">✓</span><p className="mt-5 text-xs font-bold tracking-[0.12em] text-[#0057FF]">QUICK WIN</p><h2 className="mt-2 font-display text-xl font-bold tracking-tight">Review one answer</h2><p className="mt-2 text-sm leading-6 text-slate-600">Take two minutes to refine your strongest mock-interview response.</p><button type="button" className="mt-5 text-sm font-bold text-[#0057FF] hover:underline">Open feedback →</button></article></section>
  </>;
}

function Practice() {
  const [selected, setSelected] = useState(practiceModes[0].name);
  const [difficulty, setDifficulty] = useState("Balanced");
  const mode = practiceModes.find((item) => item.name === selected);
  return <section><p className="text-xs font-bold tracking-[0.14em] text-[#0057FF]">PRACTICE STUDIO</p><h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.06em] sm:text-5xl">What do you want to sharpen?</h1><p className="mt-3 text-sm text-slate-500">Pick one area and keep the session focused.</p><div className="mt-10 grid gap-4 md:grid-cols-3">{practiceModes.map((item) => <button type="button" key={item.name} onClick={() => setSelected(item.name)} className={`rounded-2xl border p-5 text-left transition ${selected === item.name ? "border-[#0057FF] bg-[#EAF1FF] shadow-[0_12px_24px_rgba(0,87,255,0.1)]" : "border-slate-200 bg-white hover:border-[#AFC8FF]"}`}><p className="font-display text-lg font-bold">{item.name}</p><p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">{item.detail}</p><p className="mt-5 text-xs font-bold text-[#0057FF]">{item.time}</p></button>)}</div><div className="mt-8 grid overflow-hidden rounded-[24px] border border-slate-200 bg-white lg:grid-cols-[0.85fr_1.15fr]"><div className="bg-[#16213d] p-7 text-white"><p className="text-xs font-bold tracking-[0.13em] text-blue-200">YOUR SESSION</p><h2 className="mt-3 font-display text-2xl font-bold">{mode.name} practice</h2><p className="mt-3 text-sm leading-6 text-slate-300">{mode.detail}</p><div className="mt-7 space-y-3 border-t border-white/10 pt-5 text-sm"><div className="flex justify-between"><span className="text-slate-300">Format</span><span className="font-semibold">Timed practice</span></div><div className="flex justify-between"><span className="text-slate-300">Feedback</span><span className="font-semibold">After each answer</span></div></div></div><div className="p-7"><p className="text-xs font-bold tracking-[0.13em] text-slate-400">SET THE PACE</p><h3 className="mt-2 font-display text-xl font-bold">How challenging should it feel?</h3><div className="mt-5 grid gap-3 sm:grid-cols-3">{["Gentle", "Balanced", "Stretch"].map((option) => <button key={option} type="button" onClick={() => setDifficulty(option)} className={`rounded-xl border px-3 py-3 text-left text-sm font-bold transition ${difficulty === option ? "border-[#0057FF] bg-[#EAF1FF] text-[#0057FF]" : "border-slate-200 text-slate-500"}`}><span className="block">{option}</span><span className="mt-1 block text-[11px] font-medium text-slate-400">{option === "Gentle" ? "Build comfort" : option === "Balanced" ? "Find your flow" : "Push your edge"}</span></button>)}</div><div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5"><p className="text-sm text-slate-500"><span className="font-bold text-[#16213d]">{mode.time}</span> · {difficulty}</p><button type="button" className="inline-flex items-center gap-2 rounded-xl bg-[#0057FF] px-5 py-3 text-sm font-bold text-white hover:bg-[#0047D1]">Begin session <Arrow /></button></div></div></div><div className="mt-7 overflow-hidden rounded-2xl border border-[#E9E5DC] bg-white"><p className="border-b border-slate-100 px-5 py-4 text-xs font-bold tracking-[0.12em] text-slate-400">RECENT PRACTICE</p>{[["Walk me through a project you’re proud of.", "Behavioral interview · Yesterday", "82"], ["How would you improve a student app?", "Product thinking · Monday", "76"]].map(([title, detail, score]) => <div key={title} className="flex items-center gap-4 border-b border-slate-100 p-4 last:border-0 sm:px-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1FF] text-xs font-bold text-[#0057FF]">{score}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{title}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div><button type="button" className="text-xs font-bold text-[#0057FF] hover:underline">Review</button></div>)}</div></section>;
}

function Progress() {
  const metrics = [
    ["Interview practice", "8 of 12 questions", 67, "bg-[#0057FF]"],
    ["Aptitude prep", "14 of 20 questions", 70, "bg-[#F0A84A]"],
    ["Resume review", "17 of 20 checks", 85, "bg-[#257A5A]"],
  ];
  const activity = [
    ["Mock interview", "Behavioral · 25 min", "82", "Yesterday"],
    ["Aptitude practice", "Quantitative reasoning · 20 min", "76", "Monday"],
    ["Resume review", "Impact statements · 15 min", "88", "Sunday"],
  ];

  return <section>
    <p className="text-xs font-bold tracking-[0.14em] text-[#0057FF]">YOUR PROGRESS</p>
    <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.06em] sm:text-5xl">Small sessions add up.</h1>
    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">You&apos;ve kept a four-day streak and completed 35 focused minutes today.</p>
    <div className="mt-10 grid gap-4 sm:grid-cols-3">{[["4", "Day streak"], ["11", "Sessions this week"], ["82", "Average score"]].map(([value, label]) => <article key={label} className="rounded-2xl border border-[#E9E5DC] bg-white p-5"><p className="font-display text-3xl font-bold tracking-tight text-[#0057FF]">{value}{label === "Average score" ? "%" : ""}</p><p className="mt-1 text-sm font-medium text-slate-500">{label}</p></article>)}</div>
    <section className="mt-10 rounded-[24px] border border-[#E9E5DC] bg-white p-6 sm:p-7"><p className="text-xs font-bold tracking-[0.13em] text-slate-400">SKILL BREAKDOWN</p><h2 className="mt-2 font-display text-2xl font-bold tracking-tight">Keep the momentum going.</h2><div className="mt-7 space-y-6">{metrics.map(([name, detail, value, color]) => <div key={name}><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-bold">{name}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div><span className="text-sm font-bold text-slate-500">{value}%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} /></div></div>)}</div></section>
    <section className="mt-8 overflow-hidden rounded-2xl border border-[#E9E5DC] bg-white"><div className="border-b border-slate-100 px-5 py-4"><p className="text-xs font-bold tracking-[0.12em] text-slate-400">RECENT ACTIVITY</p></div>{activity.map(([title, detail, score, date]) => <article key={title} className="flex items-center gap-4 border-b border-slate-100 p-4 last:border-0 sm:px-5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FF] text-xs font-bold text-[#0057FF]">{score}</span><div className="min-w-0 flex-1"><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div><span className="text-xs font-medium text-slate-400">{date}</span></article>)}</section>
  </section>;
}

function Resources() {
  const resources = [
    ["Answer framework", "Use STAR to make your stories easy to follow.", "5 min read", "Interview"],
    ["Technical interview checklist", "A concise preparation list for problem-solving rounds.", "8 min read", "Technical"],
    ["Resume impact guide", "Turn responsibilities into clear, measurable outcomes.", "6 min read", "Resume"],
    ["Calm before the interview", "A short routine for arriving focused and present.", "4 min read", "Mindset"],
  ];
  return <section>
    <p className="text-xs font-bold tracking-[0.14em] text-[#0057FF]">RESOURCE LIBRARY</p>
    <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.06em] sm:text-5xl">Useful when you need it.</h1>
    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">Short, practical guides to help you prepare with more confidence.</p>
    <div className="mt-10 grid gap-4 md:grid-cols-2">{resources.map(([title, description, duration, category]) => <article key={title} className="group rounded-2xl border border-[#E9E5DC] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#AFC8FF] hover:shadow-[0_12px_28px_rgba(22,33,61,0.07)]"><div className="flex items-center justify-between"><span className="rounded-full bg-[#EAF1FF] px-3 py-1.5 text-xs font-bold text-[#0057FF]">{category}</span><span className="text-xs font-medium text-slate-400">{duration}</span></div><h2 className="mt-6 font-display text-xl font-bold tracking-tight">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p><button type="button" className="mt-6 text-sm font-bold text-[#0057FF] group-hover:underline">Open guide <span aria-hidden="true">→</span></button></article>)}</div>
  </section>;
}
