import BrandLogo from "../ui/BrandLogo";
import MountainIllustration from "../ui/MountainIllustration";

export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-6 lg:flex lg:items-center lg:justify-center">
      <main className="mx-auto flex w-full max-w-[1060px] overflow-hidden rounded-[32px] border border-slate-200/60 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] lg:min-h-[620px] lg:flex-row flex-col">
        
        {/* LEFT PANEL - Premium Dark Section with Rich Content */}
        <section className="relative hidden w-[46%] overflow-hidden bg-[#0A0F24] p-8 lg:p-9 text-white lg:flex lg:flex-col justify-between">
          {/* Modern Glow Effects */}
          <div className="absolute -left-[20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#3355E8] opacity-[0.16] blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-20%] h-[400px] w-[400px] rounded-full bg-[#DCE3FA] opacity-[0.08] blur-[100px]" />
          
          {/* Top & Middle Content */}
          <div className="relative z-20 flex flex-col">
            <BrandLogo dark />
            
            <div className="mt-7">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[10px] font-bold tracking-widest text-[#DCE3FA] backdrop-blur-md shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8] animate-pulse" /> CAREER PREP, SIMPLIFIED
              </span>
              <h2 className="mt-3.5 font-hero text-[32px] sm:text-[36px] font-extrabold leading-[1.12] tracking-[-0.04em] text-white">
                Master your <br/> next interview.
              </h2>
              <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-slate-300 max-w-[340px]">
                A calmer, data-driven way to prepare for technical rounds, ATS resume screening, and campus placements.
              </p>
            </div>

            {/* Feature Highlights Grid filling the blank middle space */}
            <div className="mt-6 space-y-2.5 max-w-[370px]">
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-md transition duration-200 hover:bg-white/[0.07]">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#3355E8]/30 text-xs font-bold text-[#DCE3FA]">
                  ✓
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">Adaptive Mock Interviews</p>
                  <p className="text-[11px] leading-relaxed text-slate-400">Strictly conditioned on your uploaded projects &amp; target role.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-md transition duration-200 hover:bg-white/[0.07]">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#3355E8]/30 text-xs font-bold text-[#DCE3FA]">
                  ✓
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">Instant ATS Resume Scoring</p>
                  <p className="text-[11px] leading-relaxed text-slate-400">Deterministic gap analysis to identify missing skills before recruiters do.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-md transition duration-200 hover:bg-white/[0.07]">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#3355E8]/30 text-xs font-bold text-[#DCE3FA]">
                  ✓
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">Placement-Ready Question Banks</p>
                  <p className="text-[11px] leading-relaxed text-slate-400">Curated DSA roadmaps, real-world system design &amp; HR rubrics.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Status Row */}
          <div className="relative z-20 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>NextPrep Placement Suite</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> 2026 Batch Ready
            </span>
          </div>

          {/* Bottom Mountain Illustration cleanly anchored below text as backdrop */}
          <div className="auth-mountain-stage pointer-events-none" aria-hidden="true">
            <MountainIllustration className="auth-mountain" />
          </div>
        </section>

        {/* RIGHT PANEL - Auth Form */}
        <section className="flex flex-1 lg:w-[54%] flex-col px-6 py-6 sm:py-8 sm:px-10 lg:px-16 justify-center">
          <div className="flex items-center justify-between lg:hidden mb-12">
            <BrandLogo />
          </div>

          <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center">
            {eyebrow && <p className="mb-2 text-[11px] font-bold tracking-[0.15em] text-[#3355E8] uppercase">{eyebrow}</p>}
            <h1 className="font-hero text-[32px] sm:text-[36px] font-extrabold tracking-[-0.04em] text-[#131A2E] leading-[1.1]">{title}</h1>
            {subtitle && <p className="mt-2 text-sm sm:text-[15px] leading-relaxed font-medium text-slate-500">{subtitle}</p>}

            <div className="mt-6">{children}</div>

            {footer && <div className="mt-6 pt-4 border-t border-slate-100 text-center text-sm font-medium text-slate-500">{footer}</div>}
          </div>
        </section>
      </main>
    </div>
  );
}
