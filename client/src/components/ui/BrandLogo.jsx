export default function BrandLogo({ dark = false }) {
  const tileColor = dark ? "rgba(255,255,255,0.96)" : "#F8F7F4";
  const wordmarkColor = dark ? "text-white" : "text-[#16213d]";

  return (
    <div className="flex items-center gap-2.5" aria-label="NextPrep">
      <svg
        className="h-8 w-8 shrink-0"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="12" fill={dark ? "rgba(255,255,255,0.16)" : "#0057FF"} />
        <rect x="10" y="10" width="8" height="8" rx="2.5" fill={tileColor} />
        <rect x="22" y="10" width="8" height="8" rx="2.5" fill={tileColor} opacity="0.72" />
        <rect x="10" y="22" width="8" height="8" rx="2.5" fill={tileColor} opacity="0.72" />
        <rect x="22" y="22" width="8" height="8" rx="2.5" fill={tileColor} opacity="0.42" />
      </svg>
      <span className={`font-brand text-[18px] font-bold leading-none tracking-[-0.045em] ${wordmarkColor}`}>
        Next<span className={dark ? "text-blue-100" : "text-[#0057FF]"}>Prep</span>
      </span>
    </div>
  );
}
