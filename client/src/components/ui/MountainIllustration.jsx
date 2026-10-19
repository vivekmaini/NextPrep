export default function MountainIllustration({ className = "" }) {
  return (
    <svg viewBox="0 0 420 300" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="peak-light" x1="160" y1="54" x2="280" y2="268" gradientUnits="userSpaceOnUse"><stop stopColor="#DCE3FA" /><stop offset="0.3" stopColor="#3355E8" /><stop offset="1" stopColor="#10173A" /></linearGradient>
        <linearGradient id="peak-shadow" x1="214" y1="68" x2="340" y2="258" gradientUnits="userSpaceOnUse"><stop stopColor="#3355E8" /><stop offset="1" stopColor="#171F49" /></linearGradient>
        <linearGradient id="snow" x1="209" y1="57" x2="209" y2="135" gradientUnits="userSpaceOnUse"><stop stopColor="#FFFFFF" /><stop offset="1" stopColor="#DCE3FA" stopOpacity="0.4" /></linearGradient>
        <linearGradient id="road" x1="155" y1="195" x2="255" y2="294" gradientUnits="userSpaceOnUse"><stop stopColor="#FFFFFF" stopOpacity="0.9" /><stop offset="1" stopColor="#DCE3FA" stopOpacity="0.55" /></linearGradient>
        <filter id="cloud-soft" x="-30%" y="-40%" width="160%" height="190%"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="badge-shadow" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#10173A" floodOpacity="0.25" /></filter>
      </defs>


      {/* Stars */}
      <g fill="#DCE3FA" opacity="0.45"><circle cx="64" cy="62" r="2" /><circle cx="90" cy="42" r="1.5" /><circle cx="336" cy="56" r="2" /><circle cx="367" cy="91" r="1.5" /><circle cx="45" cy="202" r="1.4" /></g>
      <path d="m118 54 3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Zm206 42 2.5 6.5 6.5 2.5-6.5 2.5-2.5 6.5-2.5-6.5-6.5-2.5 6.5-2.5 2.5-6.5Z" fill="#DCE3FA" opacity="0.9" />

      {/* Main mountain body (lit side) */}
      <path d="M0 279 83 212l39 27 38-46 49-136 64 107 42-34 105 149H0Z" fill="url(#peak-light)" />

      {/* Main mountain body (shadow side) */}
      <path d="M209 57l64 107 42-34 105 149H209V57Z" fill="url(#peak-shadow)" />

      {/* Snow cap - single clean layer, no overlap */}
      <path d="M209 57l-32 74 18-13 13 16 19-18 30 13-48-72Z" fill="url(#snow)" />

      {/* Foothill overlay */}
      <path d="m83 212 39 27 38-46 23 31-61 55H0l83-67Z" fill="#3355E8" fillOpacity="0.5" />

      {/* Ridge detail */}
      <path d="m273 164 42-34 45 63-31-12-22 19-34-36Z" fill="#DCE3FA" fillOpacity="0.22" />

      {/* Road/path winding up - centered on mountain, near peak */}
      <path d="M190 280c20-15 50-25 70-50 15-18-5-24-30-30-22-5-20-16 8-24 18-5 30-12 35-20-5 14-18 22-35 28-20 7 40 14 60 32 14 12-8 30-45 45l-63 19Z" fill="url(#road)" />

      {/* Foreground cloud - pushed down to mountain base */}
      <g filter="url(#cloud-soft)"><path d="M280 240c8-13 25-14 35-2 10-22 43-15 46 6 20-8 34 8 30 24H268c-7-13 1-24 12-28Z" fill="#DCE3FA" fillOpacity="0.86" /></g>
      <path d="M280 240c8-13 25-14 35-2 10-22 43-15 46 6 20-8 34 8 30 24H268c-7-13 1-24 12-28Z" fill="#DCE3FA" fillOpacity="0.55" />

      {/* Flag pole at peak */}
      <path d="M209 54V31" stroke="#DCE3FA" strokeLinecap="round" strokeWidth="2" />

      {/* Badge/checkmark at top */}
      <g filter="url(#badge-shadow)"><circle cx="209" cy="17" r="16" fill="#FFFFFF" /><path d="m202 17 4.8 4.8 9.4-10" stroke="#3355E8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.2" /></g>

      {/* Bottom detail dots */}
      <g fill="#DCE3FA" opacity="0.55"><circle cx="344" cy="250" r="2" /><circle cx="370" cy="268" r="1.5" /><circle cx="343" cy="278" r="1.5" /><circle cx="54" cy="259" r="1.5" /></g>
    </svg>
  );
}
