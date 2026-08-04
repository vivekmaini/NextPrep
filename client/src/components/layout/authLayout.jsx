import BrandLogo from "../ui/BrandLogo";

export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-[#F8F7F4] p-3 sm:p-5 lg:flex lg:items-center lg:p-8">
      <main className="mx-auto grid w-full max-w-[1050px] overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,87,255,0.12)] lg:min-h-[640px] lg:grid-cols-[0.82fr_1.18fr]">
        <section className="relative hidden overflow-hidden bg-[#0057FF] p-9 text-white lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(148,190,255,0.48),transparent_35%),radial-gradient(circle_at_100%_100%,rgba(0,42,145,0.55),transparent_45%)]" />
          <div className="relative"><BrandLogo dark /></div>

          <div className="relative my-auto max-w-sm py-12">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-white/80">
              CAREER PREP, SIMPLIFIED
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.18] tracking-tight">
              Build your future, one focused step at a time.
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/75">
              A calmer way to prepare for interviews, tests, and the opportunities ahead.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/90">
              {['Practical interview practice', 'Clear progress, less clutter'].map((item) => (
                <li key={item} className="flex items-center gap-2.5"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-[#0057FF]">✓</span>{item}</li>
              ))}
            </ul>
          </div>

          <div className="relative flex items-center gap-3 text-xs text-white/70">
            <div className="flex -space-x-2">
              {["A", "S", "K"].map((initial, index) => (
                <span
                  key={initial}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0057FF] text-[10px] font-bold ${index === 0 ? "bg-blue-100 text-[#0057FF]" : index === 1 ? "bg-blue-200 text-[#0057FF]" : "bg-white text-[#0057FF]"}`}
                >
                  {initial}
                </span>
              ))}
            </div>
            Made for steady progress
          </div>
        </section>

        <section className="flex min-w-0 flex-col px-6 py-7 sm:px-10 sm:py-9 lg:px-16">
          <div className="flex items-center justify-between lg:hidden">
            <BrandLogo />
            <span className="rounded-full bg-[#E6EEFF] px-3 py-1 text-xs font-semibold text-[#0057FF]">Career prep</span>
          </div>

          <div className="mx-auto flex w-full max-w-[380px] flex-1 flex-col justify-center py-8 lg:py-0">
            {eyebrow && <p className="mb-2 text-xs font-bold tracking-[0.1em] text-[#0057FF]">{eyebrow}</p>}
            <h1 className="font-display text-[28px] font-bold tracking-tight text-[#173326]">{title}</h1>
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
