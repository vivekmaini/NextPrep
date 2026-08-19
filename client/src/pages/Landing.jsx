import { Link } from "react-router-dom";
import BrandLogo from "../components/ui/BrandLogo";

const features = [
  {
    number: "01",
    title: "Practice with direction",
    text: "Target the questions, skills, and patterns that matter for your next role.",
    icon: "focus", tint: "bg-[#EAEEFC]",
  },
  {
    number: "02",
    title: "See your progress",
    text: "Keep your preparation organised with a clear view of what comes next.",
    icon: "progress", tint: "bg-[#EAEEFC]",
  },
  {
    number: "03",
    title: "Show up prepared",
    text: "Turn small, consistent practice into calm interview confidence.",
    icon: "ready", tint: "bg-[#EAEEFC]",
  },
];

const prepSteps = [
  { title: "Choose your focus", text: "Start with the role, company, or skill you want to work toward." },
  { title: "Follow a clear plan", text: "Turn big preparation goals into small sessions you can actually finish." },
  { title: "Reflect and improve", text: "Use every practice session to build confidence for the next one." },
];

const focusAreas = [
  { title: "Interview practice", text: "Build sharper answers with role-focused questions.", icon: "chat", tone: "bg-[#3355E8] text-white" },
  { title: "Aptitude prep", text: "Keep core problem-solving skills in regular rotation.", icon: "grid", tone: "bg-[#EAEEFC] text-[#3355E8]" },
  { title: "Resume review", text: "Make your experience easy for recruiters to understand.", icon: "document", tone: "bg-[#10173A] text-white" },
];

const companionCards = [
  { label: "DAILY GOAL", title: "One focused session", detail: "25 minutes", accent: "bg-[#3355E8] text-white", icon: "◎" },
  { label: "FEEDBACK NOTES", title: "Keep the useful parts", detail: "Save takeaways", accent: "bg-[#F7F5EF] text-[#131A2E]", icon: "✦" },
  { label: "COMPANY RESEARCH", title: "Know the context", detail: "Role & company cues", accent: "bg-[#10173A] text-white", icon: "↗" },
  { label: "CONFIDENCE CHECK", title: "See what is ready", detail: "Review your strengths", accent: "bg-[#F7F5EF] text-[#131A2E]", icon: "✓" },
];

export default function Landing() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_76%_8%,#DCE3FA_0,transparent_24%),#F7F5EF] text-[#131A2E]">
      <div className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
        <header className="premium-nav animate-enter mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-[22px] px-4 py-3 sm:px-5 lg:px-6">
        <Link to="/" className="rounded-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[#EAEEFC]" aria-label="NextPrep home"><BrandLogo /></Link>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            <a href="#how-it-works" className="rounded-full px-3 py-2 text-sm font-semibold text-[#6B7280] transition duration-200 hover:bg-[#EAEEFC] hover:text-[#3355E8]">How it works</a>
            <a href="#toolkit" className="rounded-full px-3 py-2 text-sm font-semibold text-[#6B7280] transition duration-200 hover:bg-[#EAEEFC] hover:text-[#3355E8]">Toolkit</a>
          </nav>
          <Link to="/login" className="rounded-full px-3 py-2 text-sm font-semibold text-[#6B7280] transition duration-200 hover:bg-[#EAEEFC] hover:text-[#3355E8] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#EAEEFC]">
            Log in
          </Link>
          <Link to="/register" className="rounded-full bg-[#3355E8] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_8px_rgba(16,23,58,0.12),0_14px_28px_rgba(51,85,232,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#2542C4] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#DCE3FA] sm:px-5">
            <span className="sm:hidden">Start</span><span className="hidden sm:inline">Get started</span>
          </Link>
        </div>
        </header>
      </div>

      <section className="landing-grid relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-24 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:pb-32 lg:pt-24">
        <div className="absolute -left-40 top-0 -z-0 h-96 w-96 rounded-full bg-[#DCE3FA] blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-xl">
          <p className="animate-enter-delay inline-flex items-center gap-2 rounded-full border border-[#DCE3FA] bg-white/80 px-3 py-1.5 text-xs font-bold tracking-[0.12em] text-[#3355E8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8]" /> PLACEMENT PREP, MADE CLEAR
          </p>
          <h1 className="animate-enter-delay-2 mt-6 font-hero text-4xl font-bold leading-[1.08] tracking-[-0.05em] text-[#131A2E] sm:text-5xl lg:text-[62px]">
            Prepare with focus. <span className="text-[#3355E8]">Walk in ready.</span>
          </h1>
          <p className="animate-enter-delay-3 mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
            A focused system for better interview answers, stronger resumes, and steady confidence before placement season.
          </p>
          <div className="animate-enter-delay-4 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/register" className="group inline-flex items-center justify-center rounded-full bg-[#3355E8] px-6 py-3.5 text-sm font-semibold text-white shadow-soft-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#2542C4] hover:shadow-soft-hero active:translate-y-0 active:scale-[0.98]">
              Start preparing free
              <span className="ml-2 text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center rounded-full border border-[#DCE3FA] bg-white px-6 py-3.5 text-sm font-semibold text-[#3355E8] transition duration-200 hover:-translate-y-0.5 hover:bg-[#EAEEFC]">
              I already have an account
            </Link>
          </div>
          <div className="mt-7 flex items-center gap-3 text-xs font-medium text-[#6B7280]"><div className="flex -space-x-2"><span className="h-7 w-7 rounded-full border-2 border-[#F7F5EF] bg-[#10173A]" /><span className="h-7 w-7 rounded-full border-2 border-[#F7F5EF] bg-[#3355E8]" /><span className="h-7 w-7 rounded-full border-2 border-[#F7F5EF] bg-[#DCE3FA]" /></div>Built for students preparing for placement season.</div>
        </div>

        <div className="animate-enter-visual relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute inset-x-3 bottom-1 top-7 rounded-[34px] bg-[#3355E8] opacity-30 blur-2xl" aria-hidden="true" />
          <div className="animate-float shadow-soft-hero relative rounded-[28px] border border-[#DCE3FA] bg-white/95 p-4 backdrop-blur-sm sm:p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs font-semibold text-slate-400">YOUR PREP PLAN</p>
                <p className="mt-1 font-brand text-lg font-bold tracking-tight">This week</p>
              </div>
              <span className="rounded-full bg-[#EAEEFC] px-3 py-1.5 text-xs font-bold text-[#3355E8]">On track</span>
            </div>
            <div className="mt-5 rounded-2xl bg-[#10173A] p-5 text-white">
              <p className="text-xs font-semibold tracking-[0.1em] text-blue-100">NEXT SESSION</p>
              <p className="mt-2 font-display text-xl font-bold tracking-tight">Mock interview</p>
              <div className="mt-5 flex items-center justify-between text-sm text-blue-100">
                <span>Product &amp; HR round</span><span>25 min</span>
              </div>
            </div>
            <div className="mt-5 space-y-4 rounded-2xl bg-[#EAEEFC] p-4">
              <Progress label="Interview questions" value="8 / 12" width="w-2/3" />
              <Progress label="Aptitude practice" value="14 / 20" width="w-[72%]" />
              <Progress label="Resume review" value="Complete" width="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e4e7ee] bg-white/80">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <p className="text-xs font-bold tracking-[0.12em] text-[#3355E8]">A SIMPLER WAY TO PREPARE</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] sm:text-4xl">Everything you need, without the noise.</h2>
          </div>
          <div className="feature-card-grid mt-10 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
            <article key={feature.number} className="premium-card hover-lift-sm group relative overflow-hidden rounded-[24px] border border-[#DCE3FA] bg-white p-6 sm:p-7">
                <div className="flex items-center justify-between"><p className="font-brand text-sm font-bold text-[#3355E8]">{feature.number}</p><span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.tint}`}><FeatureIcon type={feature.icon} /></span></div>
                <h3 className="mt-8 text-xl font-bold tracking-[-0.03em] transition-colors group-hover:text-[#3355E8]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">{feature.text}</p>
                <span className="mt-6 block h-1 w-12 rounded-full bg-[#3355E8] transition-all duration-300 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="toolkit" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-xl"><p className="text-xs font-bold tracking-[0.12em] text-[#3355E8]">YOUR PREP TOOLKIT</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] sm:text-4xl">Start where you need the most momentum.</h2></div>
          <Link to="/register" className="text-sm font-bold text-[#3355E8] transition hover:text-[#2542C4]">Explore your plan →</Link>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {focusAreas.map((area) => <PrepCard key={area.title} {...area} />)}
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 sm:px-8 lg:px-10" aria-hidden="true"><span className="h-px flex-1 bg-[#DCE3FA]" /><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAEEFC] text-sm text-[#3355E8]">✦</span><span className="h-px flex-1 bg-[#DCE3FA]" /></div>

      <section id="how-it-works" className="how-it-works-shell mx-auto my-20 max-w-6xl overflow-hidden rounded-[32px] px-5 py-14 text-white sm:my-24 sm:px-8 lg:px-10 lg:py-20">
        <div className="relative z-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div className="max-w-2xl"><p className="text-xs font-bold tracking-[0.12em] text-[#DCE3FA]">HOW IT WORKS</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.05em] sm:text-[42px]">A clearer way to get ready.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-[#DCE3FA]/75">One focused system takes you from a goal to meaningful practice — without making preparation feel like another full-time job.</p></div><span className="inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.1em] text-[#DCE3FA]">THREE FOCUSED STEPS</span></div>
        <ol className="how-steps relative z-10 mt-11 grid gap-4 md:grid-cols-3 md:gap-5">
          <div className="how-step-rail absolute left-[17%] right-[17%] top-[138px] hidden h-px md:block" aria-hidden="true" />
          {prepSteps.map((step, index) => (
            <li key={step.title} className="how-step-card group relative overflow-hidden rounded-[26px] border border-white/10 p-5 sm:p-6">
              <div className="relative z-10 flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#171F49] font-brand text-xs font-bold text-[#DCE3FA]">0{index + 1}</span><span className="text-[10px] font-bold tracking-[0.13em] text-[#DCE3FA]/60">STEP {index + 1}</span></div>
              <HowStepVisual index={index} />
              <h3 className="relative z-10 mt-6 font-brand text-xl font-bold tracking-[-0.035em] text-white">{step.title}</h3>
              <p className="relative z-10 mt-2 text-sm leading-6 text-[#DCE3FA]/75">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="relative z-10 mt-8 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm font-medium text-[#DCE3FA]/70">Your plan adjusts as your confidence grows.</p><Link to="/register" className="inline-flex w-fit items-center rounded-full bg-white px-5 py-3 text-sm font-bold text-[#3355E8] transition duration-200 hover:-translate-y-0.5 hover:bg-[#EAEEFC]">Build your plan <span className="ml-2 text-lg">→</span></Link></div>
      </section>

      <section className="details-section border-y border-[#DCE3FA] bg-white/70">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div className="max-w-2xl"><p className="text-xs font-bold tracking-[0.12em] text-[#3355E8]">BUILT FOR THE DETAILS</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Small tools. A stronger sense of progress.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-[#6B7280]">The useful things stay close: focus cues, feedback, and a simple view of what is already working.</p></div><span className="w-fit rounded-full border border-[#DCE3FA] bg-[#EAEEFC] px-4 py-2 text-xs font-bold tracking-[0.1em] text-[#3355E8]">DESIGNED FOR DAILY USE</span></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {companionCards.map((card, index) => <CompanionCard key={card.label} index={index} {...card} />)}
          </div>
        </div>
      </section>

      <section className="growth-strip">
        <div className="relative mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.5fr] lg:items-center lg:px-10 lg:py-16">
          <div><p className="text-xs font-bold tracking-[0.12em] text-[#3355E8]">ONE PLACE TO GROW</p><h2 className="mt-3 max-w-md font-display text-3xl font-bold tracking-[-0.05em] sm:text-4xl">One clear loop for better preparation.</h2><p className="mt-4 max-w-sm text-sm leading-6 text-[#6B7280]">Plan your next session, put in focused practice, then use feedback to decide what comes next.</p></div>
          <div className="growth-stats grid grid-cols-3 gap-3 sm:gap-4">
            <MiniStat eyebrow="START" label="Set a focus" icon="⌁" />
            <MiniStat eyebrow="PRACTICE" label="Build the habit" icon="✦" />
            <MiniStat eyebrow="REFLECT" label="Keep improving" icon="↗" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="shadow-soft-hero hover-lift final-cta-mesh flex flex-col items-start justify-between gap-7 rounded-[24px] bg-[#10173A] px-7 py-9 text-white sm:px-10 sm:py-11 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-blue-200">Your next opportunity starts here.</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">Make your preparation count.</h2>
          </div>
          <Link to="/register" className="whitespace-nowrap rounded-full bg-white px-5 py-3 text-sm font-bold text-[#3355E8] transition hover:bg-[#EAEEFC]">Create your account</Link>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#10173A] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_0.6fr_0.6fr] lg:px-10">
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
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#DCE3FA]"><div className={`progress-fill h-full rounded-full bg-[#3355E8] ${width}`} /></div>
    </div>
  );
}

function HowStepVisual({ index }) {
  if (index === 0) return <div className="how-visual how-visual-focus relative mt-6 overflow-hidden rounded-[18px] border border-white/10 bg-[#171F49] p-4"><span className="absolute -right-6 -top-8 h-24 w-24 rounded-full border border-[#3355E8]/70" /><p className="text-[10px] font-bold tracking-[0.11em] text-[#DCE3FA]/65">CHOOSE A DIRECTION</p><div className="mt-4 flex flex-wrap gap-2"><span className="rounded-full bg-[#3355E8] px-3 py-1.5 text-xs font-bold">Product role</span><span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#DCE3FA]">HR round</span></div></div>;
  if (index === 1) return <div className="how-visual relative mt-6 rounded-[18px] border border-white/10 bg-[#171F49] p-4"><div className="flex items-center justify-between"><p className="text-[10px] font-bold tracking-[0.11em] text-[#DCE3FA]/65">THIS WEEK</p><span className="text-xs font-bold text-[#DCE3FA]">3 / 4</span></div><div className="mt-5 flex items-end gap-2"><span className="h-7 flex-1 rounded-t-md bg-[#3355E8]" /><span className="h-11 flex-1 rounded-t-md bg-[#3355E8]" /><span className="h-8 flex-1 rounded-t-md bg-[#3355E8]" /><span className="h-4 flex-1 rounded-t-md bg-white/15" /></div></div>;
  return <div className="how-visual how-visual-ready relative mt-6 flex items-center gap-4 overflow-hidden rounded-[18px] border border-white/10 bg-[#171F49] p-4"><span className="absolute -right-7 -bottom-10 h-28 w-28 rounded-full border-[12px] border-[#3355E8]/35" /><span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#DCE3FA] text-xl font-bold text-[#3355E8]">✓</span><div className="relative"><p className="text-[10px] font-bold tracking-[0.11em] text-[#DCE3FA]/65">CONFIDENCE</p><p className="mt-1 text-lg font-bold text-white">Ready to go</p></div></div>;
}

function MiniStat({ eyebrow, label, icon }) {
  return <div className="growth-stat premium-stat group flex min-h-[148px] flex-col justify-between rounded-[22px] border border-white/80 bg-white p-4 sm:min-h-[164px] sm:p-5"><div className="flex items-start justify-between"><p className="text-[10px] font-bold tracking-[0.12em] text-[#3355E8]">{eyebrow}</p><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EAEEFC] text-sm font-bold text-[#3355E8] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">{icon}</span></div><p className="mt-4 text-sm font-semibold leading-5 text-[#131A2E]">{label}</p><span className="mt-3 h-px w-full bg-[#DCE3FA]" /></div>;
}

function FeatureIcon({ type }) {
  const paths = {
    focus: <><circle cx="12" cy="12" r="7" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" /></>,
    progress: <><path d="M4 19V11M10 19V5M16 19v-4M22 19V2" /><path d="m4 8 6-4 6 5 6-7" /></>,
    ready: <><path d="m4 13 5 5L20 6" /><path d="M12 3.5a8.5 8.5 0 1 1-8.5 8.5" /></>,
  };
  return <svg className="h-8 w-8 text-[#3355E8] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}

function PrepCard({ title, text, icon, tone }) {
  return (
    <article className="toolkit-card hover-lift shadow-soft group relative min-h-72 overflow-hidden rounded-[26px] border border-[#DCE3FA] bg-white p-7">
      <div className="relative z-10 flex items-center justify-between"><div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}><ToolkitIcon type={icon} /></div><span className="rounded-full bg-[#EAEEFC] px-3 py-1 text-[10px] font-bold tracking-[0.08em] text-[#3355E8]">IN YOUR PLAN</span></div><MiniProductVisual type={icon} />
      <h3 className="relative z-10 mt-12 font-brand text-[22px] font-bold tracking-[-0.035em]">{title}</h3>
      <p className="relative z-10 mt-2 max-w-[15rem] text-sm leading-6 text-[#6B7280]">{text}</p>
      <span className="relative z-10 mt-7 inline-flex items-center text-sm font-bold text-[#3355E8]">Start practicing <span className="ml-2 transition-transform group-hover:translate-x-1">→</span></span>
    </article>
  );
}

function MiniProductVisual({ type }) {
  if (type === "chat") return <div className="absolute right-5 top-20 w-24 -rotate-6 rounded-xl border border-[#DCE3FA] bg-white p-2.5 shadow-[0_10px_20px_rgba(51,85,232,0.12)]"><span className="block h-1.5 w-10 rounded-full bg-[#3355E8]" /><span className="mt-2 block h-1.5 w-full rounded-full bg-[#EAEEFC]" /><span className="mt-1.5 block h-1.5 w-3/4 rounded-full bg-[#EAEEFC]" /></div>;
  if (type === "grid") return <div className="absolute right-5 top-20 grid w-20 grid-cols-3 gap-1.5 rounded-xl border border-[#DCE3FA] bg-white p-2.5 shadow-[0_10px_20px_rgba(51,85,232,0.12)]">{Array.from({ length: 9 }, (_, index) => <span key={index} className={`aspect-square rounded-[3px] ${index === 4 ? "bg-[#3355E8]" : "bg-[#DCE3FA]"}`} />)}</div>;
  return <div className="absolute right-5 top-20 w-20 rounded-xl border border-[#DCE3FA] bg-white p-2.5 shadow-[0_10px_20px_rgba(51,85,232,0.12)]"><span className="block h-1.5 w-8 rounded-full bg-[#10173A]" /><span className="mt-2 block h-1.5 w-full rounded-full bg-[#EAEEFC]" /><span className="mt-1.5 block h-1.5 w-full rounded-full bg-[#EAEEFC]" /><span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-[#3355E8]" /></div>;
}

function ToolkitIcon({ type }) {
  const paths = {
    chat: <><path d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v5a3.5 3.5 0 0 1-3.5 3.5H11l-4 3v-3.4A3.5 3.5 0 0 1 5 11.5v-5Z" /><path d="M9 8h6M9 11h4" /></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1.5" /><rect x="14" y="4" width="6" height="6" rx="1.5" /><rect x="4" y="14" width="6" height="6" rx="1.5" /><rect x="14" y="14" width="6" height="6" rx="1.5" /></>,
    document: <><path d="M7 3h7l4 4v14H7V3Z" /><path d="M14 3v5h5M10 12h5M10 16h5" /></>,
  };
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}

function CompanionCard({ label, title, detail, accent, icon, index }) {
  const isDark = accent.includes("text-white");
  return (
    <article className={`detail-card detail-card-${index} hover-lift shadow-soft group relative flex min-h-[270px] flex-col overflow-hidden rounded-[26px] border border-[#DCE3FA] p-6 ${accent}`}>
      <div className="detail-orbit" aria-hidden="true"><span /><span /><span /></div>
      <div className="relative z-10 flex items-start justify-between"><p className="text-[10px] font-bold tracking-[0.12em] opacity-65">{label}</p><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/10 text-lg font-bold transition duration-300 group-hover:scale-110 group-hover:rotate-6">{icon}</span></div>
      <div className="relative z-10 mt-16"><h3 className="max-w-[11rem] font-brand text-xl font-bold tracking-[-0.035em]">{title}</h3><p className="mt-2 text-sm leading-6 opacity-70">{detail}</p></div>
      <div className={`relative z-10 mt-auto flex items-center gap-2 pt-6 text-[10px] font-bold tracking-[0.1em] ${isDark ? "text-[#DCE3FA]" : "text-[#3355E8]"}`}><span className="h-1.5 w-1.5 rounded-full bg-current" /> READY WHEN YOU ARE</div>
    </article>
  );
}
