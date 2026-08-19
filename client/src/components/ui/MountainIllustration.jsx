export default function MountainIllustration({ className = "" }) {
  return (
    <svg viewBox="0 0 420 300" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="peak-light" x1="160" y1="54" x2="280" y2="268" gradientUnits="userSpaceOnUse"><stop stopColor="#DCE3FA" /><stop offset="0.3" stopColor="#3355E8" /><stop offset="1" stopColor="#10173A" /></linearGradient>
        <linearGradient id="peak-shadow" x1="214" y1="68" x2="340" y2="258" gradientUnits="userSpaceOnUse"><stop stopColor="#3355E8" /><stop offset="1" stopColor="#171F49" /></linearGradient>
        <linearGradient id="snow" x1="210" y1="54" x2="207" y2="122" gradientUnits="userSpaceOnUse"><stop stopColor="#FFFFFF" /><stop offset="1" stopColor="#DCE3FA" /></linearGradient>
        <linearGradient id="road" x1="155" y1="195" x2="255" y2="294" gradientUnits="userSpaceOnUse"><stop stopColor="#FFFFFF" stopOpacity="0.9" /><stop offset="1" stopColor="#DCE3FA" stopOpacity="0.55" /></linearGradient>
        <filter id="cloud-soft" x="-30%" y="-40%" width="160%" height="190%"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="badge-shadow" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#10173A" floodOpacity="0.25" /></filter>
      </defs>

      <g fill="#DCE3FA" filter="url(#cloud-soft)" opacity="0.18"><path d="M31 145c10-17 32-17 42-2 12-25 51-17 54 8 24-9 40 10 36 29H19c-8-16 0-30 12-35Z" /><path d="M296 128c9-15 30-16 40-2 12-24 48-16 52 7 22-8 37 10 32 27H282c-7-15 1-27 14-32Z" /></g>
      <g fill="#DCE3FA" opacity="0.45"><circle cx="64" cy="62" r="2" /><circle cx="90" cy="42" r="1.5" /><circle cx="336" cy="56" r="2" /><circle cx="367" cy="91" r="1.5" /><circle cx="45" cy="202" r="1.4" /></g>
      <path d="m118 54 3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Zm206 42 2.5 6.5 6.5 2.5-6.5 2.5-2.5 6.5-2.5-6.5-6.5-2.5 6.5-2.5 2.5-6.5Z" fill="#DCE3FA" opacity="0.9" />

      <path d="M0 279 83 212l39 27 38-46 49-136 64 107 42-34 105 149H0Z" fill="url(#peak-light)" />
      <path d="m209 57 64 107 42-34 105 149H209V57Z" fill="url(#peak-shadow)" />
      <path d="m209 57 35 72-25-13-14 18-17-16-23 13 44-74Z" fill="url(#snow)" />
      <path d="m209 57 35 72-25-13-10-59Z" fill="#FFFFFF" fillOpacity="0.62" />
      <path d="m83 212 39 27 38-46 23 31-61 55H0l83-67Z" fill="#3355E8" fillOpacity="0.5" />
      <path d="m273 164 42-34 45 63-31-12-22 19-34-36Z" fill="#DCE3FA" fillOpacity="0.22" />
      <path d="M123 300c39-19 111-15 133-37 21-21-35-28-74-40-34-10-37-21 4-33 23-7 42-13 49-22-2 15-23 27-47 35-29 10 68 19 91 42 18 18-17 38-59 55H123Z" fill="url(#road)" />

      <g filter="url(#cloud-soft)"><path d="M274 194c8-13 25-14 35-2 10-22 43-15 46 6 20-8 34 8 30 24h-123c-7-13 1-24 12-28Z" fill="#DCE3FA" fillOpacity="0.86" /></g>
      <path d="M274 194c8-13 25-14 35-2 10-22 43-15 46 6 20-8 34 8 30 24h-123c-7-13 1-24 12-28Z" fill="#DCE3FA" fillOpacity="0.55" />

      <path d="M209 54V31" stroke="#DCE3FA" strokeLinecap="round" strokeWidth="2" />
      <g filter="url(#badge-shadow)"><circle cx="209" cy="17" r="16" fill="#FFFFFF" /><path d="m202 17 4.8 4.8 9.4-10" stroke="#3355E8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.2" /></g>
      <g fill="#DCE3FA" opacity="0.55"><circle cx="344" cy="250" r="2" /><circle cx="370" cy="268" r="1.5" /><circle cx="343" cy="278" r="1.5" /><circle cx="54" cy="259" r="1.5" /></g>
    </svg>
  );
}
