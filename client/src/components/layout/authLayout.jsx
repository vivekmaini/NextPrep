import BrandLogo from "../ui/BrandLogo";
import MountainIllustration from "../ui/MountainIllustration";

export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-[#F7F5EF] p-3 sm:p-5 lg:flex lg:items-center lg:p-8">
      <main className="mx-auto grid w-full max-w-[1100px] overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_8px_16px_rgba(16,23,58,0.06),0_32px_72px_rgba(51,85,232,0.16)] lg:min-h-[680px] lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden bg-[#10173A] p-10 text-white lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(51,85,232,0.72),transparent_38%),radial-gradient(circle_at_100%_100%,rgba(220,227,250,0.22),transparent_42%)]" />
          <div className="absolute -right-20 top-1/3 h-64 w-64 rounded-full border border-white/15" />
          <div className="relative z-10"><BrandLogo dark /></div>

          <div className="relative z-10 max-w-sm pt-16">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-white/80">
              CAREER PREP, SIMPLIFIED
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.18] tracking-tight">
              Build your future, one focused step at a time.
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/75">
              A calmer way to prepare for interviews, tests, and the opportunities ahead.
            </p>
            <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-[#DCE3FA]"><span className="h-1.5 w-1.5 rounded-full bg-[#DCE3FA]" /> A calmer way to build momentum</div>
          </div>
          <div className="auth-mountain-stage" aria-hidden="true"><MountainIllustration className="auth-mountain" /></div>
        </section>

        <section className="flex min-w-0 flex-col px-6 py-7 sm:px-10 sm:py-9 lg:px-16">
          <div className="flex items-center justify-between lg:hidden">
            <BrandLogo />
            <span className="rounded-full bg-[#EAEEFC] px-3 py-1 text-xs font-semibold text-[#3355E8]">Career prep</span>
          </div>

          <div className="mx-auto flex w-full max-w-[380px] flex-1 flex-col justify-center py-8 lg:py-0">
            {eyebrow && <p className="mb-2 text-xs font-bold tracking-[0.1em] text-[#3355E8]">{eyebrow}</p>}
            <h1 className="font-display text-[30px] font-bold tracking-[-0.04em] text-[#131A2E]">{title}</h1>
            {subtitle && <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>}

            <div className="mt-6">{children}</div>

            {footer && <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>}
          </div>
          <p className="hidden text-center text-xs text-slate-400 lg:block">© {new Date().getFullYear()} NextPrep</p>
        </section>
      </main>
    </div>
  );
}
