import { Link } from "react-router-dom";
import BrandLogo from "../components/ui/BrandLogo";

const features = [
  {
    number: "01",
    title: "Practice with direction",
    text: "Target the questions, skills, and patterns that matter for your next role.",
    icon: "focus",
  },
  {
    number: "02",
    title: "See your progress",
    text: "Keep your preparation organised with a clear view of what comes next.",
    icon: "progress",
  },
  {
    number: "03",
    title: "Show up prepared",
    text: "Turn small, consistent practice into calm interview confidence.",
    icon: "ready",
  },
];

const prepSteps = [
  { title: "Choose your focus", text: "Start with the role, company, or skill you want to work toward." },
  { title: "Follow a clear plan", text: "Turn big preparation goals into small sessions you can actually finish." },
  { title: "Reflect and improve", text: "Use every practice session to build confidence for the next one." },
];

const focusAreas = [
  { title: "Interview practice", text: "Build sharper answers with role-focused questions.", icon: "chat", tone: "bg-[#0057FF] text-white" },
  { title: "Aptitude prep", text: "Keep core problem-solving skills in regular rotation.", icon: "grid", tone: "bg-[#E6EEFF] text-[#0057FF]" },
  { title: "Resume review", text: "Make your experience easy for recruiters to understand.", icon: "document", tone: "bg-[#16213d] text-white" },
];

const companionCards = [
  { label: "DAILY GOAL", title: "One focused session", detail: "25 minutes", accent: "bg-[#0057FF] text-white", icon: "◎" },
  { label: "FEEDBACK NOTES", title: "Keep the useful parts", detail: "Save takeaways", accent: "bg-[#F8F7F4] text-[#16213d]", icon: "✦" },
  { label: "COMPANY RESEARCH", title: "Know the context", detail: "Role & company cues", accent: "bg-[#0057FF] text-white", icon: "↗" },
  { label: "CONFIDENCE CHECK", title: "See what is ready", detail: "Review your strengths", accent: "bg-[#F8F7F4] text-[#16213d]", icon: "✓" },
];

export default function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F7F4] text-[#16213d]">
      <header className="animate-enter mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link to="/" className="rounded-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E6EEFF]" aria-label="NextPrep home"><BrandLogo /></Link>
        <nav className="flex items-center gap-3" aria-label="Main navigation">
          <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:text-[#0057FF] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E6EEFF]">
            Log in
          </Link>
          <Link to="/register" className="rounded-lg bg-[#0057FF] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(0,87,255,0.2)] transition hover:bg-[#0047D1] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#a9c4ff]">
            Get started
          </Link>
        </nav>
      </header>

      <section className="landing-grid relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-28 lg:pt-20">
        <div className="absolute -left-32 top-0 -z-0 h-80 w-80 rounded-full bg-[#E6EEFF] blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-xl">
          <p className="animate-enter-delay inline-flex rounded-full border border-[#cbdcff] bg-white/80 px-3 py-1.5 text-xs font-bold tracking-[0.12em] text-[#0057FF]">
            PLACEMENT PREP, MADE CLEAR
          </p>
          <h1 className="animate-enter-delay-2 mt-6 font-display text-4xl font-bold leading-[1.08] tracking-[-0.055em] text-[#16213d] sm:text-5xl lg:text-6xl">
            Prepare with focus. <span className="text-[#0057FF]">Walk in ready.</span>
          </h1>
          <p className="animate-enter-delay-3 mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
            NextPrep brings your interview practice, aptitude preparation, and resume goals into one calm, focused workspace.
          </p>
          <div className="animate-enter-delay-4 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/register" className="group inline-flex items-center justify-center rounded-xl bg-[#0057FF] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(0,87,255,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0047D1] hover:shadow-[0_16px_28px_rgba(0,87,255,0.3)]">
              Start preparing free
              <span className="ml-2 text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center rounded-xl border border-[#cad8fa] bg-white px-5 py-3.5 text-sm font-semibold text-[#0057FF] transition hover:bg-[#E6EEFF]">
              I already have an account
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500">Built for students preparing for placement season.</p>
        </div>

        <div className="animate-enter-visual relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-[#b8d0ff] opacity-70 blur-2xl" aria-hidden="true" />
          <div className="animate-float relative rounded-[26px] border border-[#dbe5fb] bg-white p-4 shadow-[0_24px_60px_rgba(0,87,255,0.14)] sm:p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs font-semibold text-slate-400">YOUR PREP PLAN</p>
                <p className="mt-1 font-brand text-lg font-bold tracking-tight">This week</p>
              </div>
              <span className="rounded-full bg-[#E6EEFF] px-3 py-1.5 text-xs font-bold text-[#0057FF]">On track</span>
            </div>
            <div className="mt-5 rounded-2xl bg-[#0057FF] p-5 text-white">
              <p className="text-xs font-semibold tracking-[0.1em] text-blue-100">NEXT SESSION</p>
              <p className="mt-2 font-display text-xl font-bold tracking-tight">Mock interview</p>
              <div className="mt-5 flex items-center justify-between text-sm text-blue-100">
                <span>Product &amp; HR round</span><span>25 min</span>
              </div>
            </div>
            <div className="mt-5 space-y-4">
              <Progress label="Interview questions" value="8 / 12" width="w-2/3" />
              <Progress label="Aptitude practice" value="14 / 20" width="w-[72%]" />
              <Progress label="Resume review" value="Complete" width="w-full" />
            </div>
          </div>
          <div className="animate-float-delayed absolute -bottom-5 -left-5 hidden rounded-2xl border border-[#dbe5fb] bg-white px-4 py-3 shadow-[0_16px_32px_rgba(0,87,255,0.14)] sm:block">
            <p className="text-[11px] font-bold tracking-[0.1em] text-slate-400">CONSISTENCY</p>
            <p className="mt-1 font-brand text-sm font-bold text-[#0057FF]">4-day streak ✦</p>
          </div>
          <div className="animate-float absolute -right-4 top-20 hidden h-11 w-11 items-center justify-center rounded-2xl bg-[#0057FF] text-lg text-white shadow-[0_12px_24px_rgba(0,87,255,0.3)] lg:flex">↗</div>
        </div>
      </section>

      <section className="border-y border-[#e4e7ee] bg-white/70">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-xl">
            <p className="text-xs font-bold tracking-[0.12em] text-[#0057FF]">A SIMPLER WAY TO PREPARE</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] sm:text-4xl">Everything you need, without the noise.</h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
            <article key={feature.number} className="group border-t-2 border-[#0057FF] pt-5 transition duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between"><p className="font-brand text-sm font-bold text-[#0057FF]">{feature.number}</p><FeatureIcon type={feature.icon} /></div>
                <h3 className="mt-4 text-lg font-bold tracking-tight transition-colors group-hover:text-[#0057FF]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-xl"><p className="text-xs font-bold tracking-[0.12em] text-[#0057FF]">YOUR PREP TOOLKIT</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] sm:text-4xl">Start where you need the most momentum.</h2></div>
          <Link to="/register" className="text-sm font-bold text-[#0057FF] transition hover:text-[#0047D1]">Explore your plan →</Link>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {focusAreas.map((area) => <PrepCard key={area.title} {...area} />)}
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 sm:px-8 lg:px-10" aria-hidden="true"><span className="h-px flex-1 bg-[#cbdcff]" /><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E6EEFF] text-sm text-[#0057FF]">✦</span><span className="h-px flex-1 bg-[#cbdcff]" /></div>

      <section id="how-it-works" className="mx-auto my-16 max-w-6xl overflow-hidden rounded-[30px] bg-[#16213d] px-5 py-14 text-white sm:my-20 sm:px-8 lg:px-10 lg:py-20">
        <div className="max-w-2xl"><p className="text-xs font-bold tracking-[0.12em] text-blue-200">HOW IT WORKS</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] sm:text-4xl">A simple path from preparation to confidence.</h2><p className="mt-4 text-sm leading-6 text-slate-300">Set a direction, build a steady habit, and arrive feeling ready for the conversation ahead.</p></div>
        <ol className="relative mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          <div className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-white/20 md:block" aria-hidden="true" />
          {prepSteps.map((step, index) => (
            <li key={step.title} className="group relative rounded-[22px] border border-white/10 bg-white/[0.07] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12]">
              <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-white font-brand text-sm font-bold text-[#0057FF] shadow-[0_7px_14px_rgba(0,0,0,0.16)]">0{index + 1}</span>
              <div className="mt-8 flex h-8 w-8 items-center justify-center rounded-xl bg-[#0057FF] text-lg text-white">{index === 0 ? "⌁" : index === 1 ? "↗" : "✓"}</div>
              <h3 className="mt-5 font-brand text-lg font-bold tracking-tight text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{step.text}</p>
            </li>
          ))}
        </ol>
        <Link to="/register" className="mt-8 inline-flex items-center rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#0057FF] transition hover:bg-[#E6EEFF]">Build your plan <span className="ml-2 text-lg">→</span></Link>
      </section>

      <section className="border-y border-[#e4e7ee] bg-white/70">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-2xl"><p className="text-xs font-bold tracking-[0.12em] text-[#0057FF]">BUILT FOR THE DETAILS</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] sm:text-4xl">Small tools that make preparation feel lighter.</h2></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {companionCards.map((card) => <CompanionCard key={card.label} {...card} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#E6EEFF]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:px-10 lg:py-16">
          <div><p className="text-xs font-bold tracking-[0.12em] text-[#0057FF]">ONE PLACE TO GROW</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em]">Less switching. More doing.</h2></div>
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            <MiniStat value="01" label="Focused plan" />
            <MiniStat value="03" label="Prep areas" />
            <MiniStat value="∞" label="Room to improve" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-7 rounded-[24px] bg-[#16213d] px-7 py-9 text-white sm:px-10 sm:py-11 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-blue-200">Your next opportunity starts here.</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">Make your preparation count.</h2>
          </div>
          <Link to="/register" className="whitespace-nowrap rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0057FF] transition hover:bg-[#E6EEFF]">Create your account</Link>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#16213d] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_0.6fr_0.6fr] lg:px-10">
          <div>
            <Link to="/" className="inline-flex rounded-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300" aria-label="NextPrep home"><BrandLogo dark /></Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">A focused home for students preparing for their next placement opportunity.</p>
          </div>
          <div><p className="text-xs font-bold tracking-[0.12em] text-blue-200">ACCOUNT</p><div className="mt-4 flex flex-col gap-3 text-sm text-slate-300"><Link to="/login" className="transition hover:text-white">Log in</Link><Link to="/register" className="transition hover:text-white">Create account</Link></div></div>
          <div><p className="text-xs font-bold tracking-[0.12em] text-blue-200">EXPLORE</p><div className="mt-4 flex flex-col gap-3 text-sm text-slate-300"><a href="#how-it-works" className="transition hover:text-white">How it works</a><Link to="/register" className="transition hover:text-white">Start preparing</Link></div></div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-white/10 px-5 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><span>© {new Date().getFullYear()} NextPrep</span><span>Made for steady progress.</span></div>
      </footer>
    </main>
  );
}

function Progress({ label, value, width }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600"><span>{label}</span><span className="text-slate-400">{value}</span></div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#edf1f8]"><div className={`progress-fill h-full rounded-full bg-[#0057FF] ${width}`} /></div>
    </div>
  );
}

function MiniStat({ value, label }) {
  return <div className="flex min-h-[118px] flex-col justify-between rounded-2xl bg-white p-5 shadow-[0_8px_20px_rgba(0,87,255,0.08)] sm:min-h-[136px] sm:p-6"><p className="font-display text-3xl font-bold tracking-tight text-[#0057FF] sm:text-4xl">{value}</p><p className="mt-2 text-sm font-semibold leading-5 text-slate-600">{label}</p></div>;
}

function FeatureIcon({ type }) {
  const paths = {
    focus: <><circle cx="12" cy="12" r="7" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" /></>,
    progress: <><path d="M4 19V11M10 19V5M16 19v-4M22 19V2" /><path d="m4 8 6-4 6 5 6-7" /></>,
    ready: <><path d="m4 13 5 5L20 6" /><path d="M12 3.5a8.5 8.5 0 1 1-8.5 8.5" /></>,
  };
  return <svg className="h-8 w-8 text-[#0057FF] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}

function PrepCard({ title, text, icon, tone }) {
  return (
    <article className="group relative min-h-60 overflow-hidden rounded-[22px] border border-[#dbe5fb] bg-white p-6 shadow-[0_10px_24px_rgba(0,87,255,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(0,87,255,0.13)]">
      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone}`}><ToolkitIcon type={icon} /></div>
      <h3 className="mt-9 font-brand text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-2 max-w-[15rem] text-sm leading-6 text-slate-600">{text}</p>
      <span className="absolute bottom-6 text-sm font-bold text-[#0057FF]">Part of your prep plan</span>
      <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full border-[18px] border-[#E6EEFF] transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
    </article>
  );
}

function ToolkitIcon({ type }) {
  const paths = {
    chat: <><path d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v5a3.5 3.5 0 0 1-3.5 3.5H11l-4 3v-3.4A3.5 3.5 0 0 1 5 11.5v-5Z" /><path d="M9 8h6M9 11h4" /></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1.5" /><rect x="14" y="4" width="6" height="6" rx="1.5" /><rect x="4" y="14" width="6" height="6" rx="1.5" /><rect x="14" y="14" width="6" height="6" rx="1.5" /></>,
    document: <><path d="M7 3h7l4 4v14H7V3Z" /><path d="M14 3v5h5M10 12h5M10 16h5" /></>,
  };
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}

function CompanionCard({ label, title, detail, accent, icon }) {
  return (
    <article className={`group min-h-52 rounded-[22px] border border-[#dbe5fb] p-5 shadow-[0_10px_24px_rgba(0,87,255,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(0,87,255,0.12)] ${accent}`}>
      <div className="flex items-start justify-between"><p className="text-[10px] font-bold tracking-[0.12em] opacity-65">{label}</p><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/10 text-base font-bold">{icon}</span></div>
      <div className="mt-12"><h3 className="font-brand text-lg font-bold tracking-tight">{title}</h3><p className="mt-2 text-sm opacity-70">{detail}</p></div>
      <div className="mt-5 h-px w-full bg-current opacity-15" />
    </article>
  );
}
