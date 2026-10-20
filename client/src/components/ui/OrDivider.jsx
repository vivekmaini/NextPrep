export default function OrDivider({ label = "or" }) {
  return (
    <div className="my-3.5 sm:my-4 flex items-center gap-3">
      <span className="h-px flex-1 bg-slate-200" />
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
