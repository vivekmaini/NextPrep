import BrandLogo from "../ui/BrandLogo";
import MountainIllustration from "../ui/MountainIllustration";

export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-6 lg:flex lg:items-center lg:justify-center">
      <main className="mx-auto flex w-full max-w-[1020px] overflow-hidden rounded-[28px] sm:rounded-[32px] border border-slate-200/60 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] lg:min-h-[560px] lg:flex-row flex-col">
        
        {/* LEFT PANEL - Premium Dark Section */}
        <section className="relative hidden w-[44%] overflow-hidden bg-[#0A0F24] p-8 lg:p-9 text-white lg:flex lg:flex-col justify-between">
          {/* Modern Glow Effects */}
          <div className="absolute -left-[20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#3355E8] opacity-[0.15] blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-20%] h-[400px] w-[400px] rounded-full bg-[#DCE3FA] opacity-[0.08] blur-[100px]" />
          
          {/* Top Content */}
          <div className="relative z-20">
            <BrandLogo dark />
            <div className="mt-7 lg:mt-8">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[10px] font-bold tracking-widest text-white/80 backdrop-blur-md shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8] animate-pulse" /> CAREER PREP, SIMPLIFIED
              </span>
              <h2 className="mt-3.5 font-hero text-[32px] sm:text-[36px] font-extrabold leading-[1.12] tracking-[-0.04em] text-white">
                Master your <br/> next interview.
              </h2>
              <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-slate-400 max-w-[320px]">
                Join top candidates preparing with curated DSA roadmaps, real-world system design questions, and AI mock interviews.
              </p>
            </div>
          </div>

          {/* Bottom Mountain Illustration cleanly anchored below text */}
          <div className="auth-mountain-stage pointer-events-none" aria-hidden="true">
            <MountainIllustration className="auth-mountain" />
          </div>
        </section>

        {/* RIGHT PANEL - Auth Form */}
        <section className="flex flex-1 lg:w-[56%] flex-col px-6 py-6 sm:py-7 sm:px-10 lg:px-12 justify-center">
          <div className="flex items-center justify-between lg:hidden mb-8">
            <BrandLogo />
          </div>

          <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center">
            {eyebrow && <p className="mb-1 text-[11px] font-bold tracking-[0.15em] text-[#3355E8] uppercase">{eyebrow}</p>}
            <h1 className="font-hero text-[28px] sm:text-[32px] font-extrabold tracking-[-0.04em] text-[#131A2E] leading-[1.15]">{title}</h1>
            {subtitle && <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed font-medium text-slate-500">{subtitle}</p>}

            <div className="mt-4 sm:mt-5">{children}</div>

            {footer && <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs sm:text-sm font-medium text-slate-500">{footer}</div>}
          </div>
        </section>
      </main>
    </div>
  );
}
