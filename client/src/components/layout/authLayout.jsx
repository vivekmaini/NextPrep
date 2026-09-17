import BrandLogo from "../ui/BrandLogo";
import MountainIllustration from "../ui/MountainIllustration";

export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-6 lg:flex lg:items-center lg:justify-center">
      <main className="mx-auto flex w-full max-w-[1040px] overflow-hidden rounded-[32px] border border-slate-200/60 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] lg:min-h-[520px] lg:flex-row flex-col">
        
        {/* LEFT PANEL - Premium Dark Section */}
        <section className="relative hidden w-[45%] overflow-hidden bg-[#0A0F24] p-8 lg:p-10 text-white lg:flex lg:flex-col justify-between">
          {/* Modern Glow Effects */}
          <div className="absolute -left-[20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#3355E8] opacity-[0.15] blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-20%] h-[400px] w-[400px] rounded-full bg-[#DCE3FA] opacity-[0.08] blur-[100px]" />
          
          {/* Top Content */}
          <div className="relative z-20">
            <BrandLogo dark />
            <div className="mt-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold tracking-widest text-white/80 backdrop-blur-md shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8] animate-pulse" /> CAREER PREP, SIMPLIFIED
              </span>
              <h2 className="mt-5 font-hero text-[44px] sm:text-[48px] font-extrabold leading-[1.08] tracking-[-0.05em] text-white">
                Master your <br/> next interview.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-sm">
                Join top candidates preparing with highly curated DSA roadmaps, real-world system design questions, and AI mock interviews.
              </p>
            </div>
          </div>

          {/* Bottom Mountain Illustration properly aligned using original CSS */}
          <div className="auth-mountain-stage pointer-events-none" aria-hidden="true">
            <MountainIllustration className="auth-mountain" />
          </div>
        </section>

        {/* RIGHT PANEL - Auth Form */}
        <section className="flex flex-1 lg:w-[55%] flex-col px-6 py-6 sm:py-8 sm:px-10 lg:px-16 justify-center">
          <div className="flex items-center justify-between lg:hidden mb-12">
            <BrandLogo />
          </div>

          <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center">
            {eyebrow && <p className="mb-3 text-[11px] font-bold tracking-[0.15em] text-[#3355E8] uppercase">{eyebrow}</p>}
            <h1 className="font-hero text-[32px] sm:text-[38px] font-extrabold tracking-[-0.05em] text-[#131A2E] leading-[1.1]">{title}</h1>
            {subtitle && <p className="mt-3 text-[15px] leading-relaxed font-medium text-slate-500">{subtitle}</p>}

            <div className="mt-6">{children}</div>

            {footer && <div className="mt-6 pt-4 border-t border-slate-100 text-center text-sm font-medium text-slate-500">{footer}</div>}
          </div>
        </section>
      </main>
    </div>
  );
}
