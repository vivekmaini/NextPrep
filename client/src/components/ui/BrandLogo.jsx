export default function BrandLogo({ dark = false }) {
  const wordmarkColor = dark ? "text-white" : "text-[#131A2E]";

  return (
    <div className="flex items-center gap-2.5" aria-label="NextPrep">
      <svg className="h-9 w-9 shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="44" height="44" rx="14" fill={dark ? "rgba(255,255,255,0.16)" : "#3355E8"} />
        <path d="M12 31V13l20 18V13" stroke={dark ? "#fff" : "#fff"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29.5 11.5 34 12l-.5 4.5" stroke="#DCE3FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`font-brand text-[19px] font-extrabold leading-none tracking-[-0.055em] ${wordmarkColor}`}>
        Next<span className={dark ? "text-[#DCE3FA]" : "text-[#3355E8]"}>Prep</span>
      </span>
    </div>
  );
}
