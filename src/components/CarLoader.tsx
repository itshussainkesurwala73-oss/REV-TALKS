import React, { useEffect, useState } from 'react';

interface CarLoaderProps {
  isLoading: boolean;
  message?: string;
  submessage?: string;
}

export const CarLoader: React.FC<CarLoaderProps> = ({
  isLoading,
  message = 'KAWASAKI NINJA H2R',
  submessage = 'Supercharged 998cc Inline-4 · 326 HP Ram-Air Engaged...',
}) => {
  const [shouldRender, setShouldRender] = useState(isLoading);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
      setAnimatingOut(false);
    } else if (shouldRender) {
      setAnimatingOut(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setAnimatingOut(false);
      }, 260);
      return () => clearTimeout(timer);
    }
  }, [isLoading, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading content"
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 transition-all duration-300 pointer-events-auto ${
        animatingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Heavy Blurred Cinematic Background Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-xl transition-opacity duration-300" 
      />

      {/* Cinematic Widescreen "Video Screen Size" Center Stage */}
      <div className="relative z-10 w-full max-w-4xl aspect-[16/10] sm:aspect-video rounded-2xl bg-zinc-950/95 border border-zinc-800 shadow-2xl shadow-emerald-950/40 p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
        
        {/* Subtle Ambient Kawasaki Lime Green Backlight Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none" />

        {/* Cinematic Letterbox Top Header / Telemetry Bar */}
        <div className="relative z-20 w-full flex items-center justify-between pb-2 border-b border-zinc-800/80 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
            <span className="text-white font-bold tracking-widest font-display text-xs sm:text-sm">
              KAWASAKI NINJA H2R
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[9px]">
              SUPERCHARGED
            </span>
          </div>
          
          <div className="flex items-center gap-3 font-mono text-[9px] sm:text-[11px]">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              BOOST: +20.5 PSI
            </span>
            <span className="hidden md:inline text-zinc-500">|</span>
            <span className="hidden md:inline text-zinc-300">326 HP @ 14,000 RPM</span>
            <span className="px-1.5 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30 font-bold text-[9px]">
              TRACK ONLY
            </span>
          </div>
        </div>

        {/* Center Stage: High-Speed Riding Kawasaki Ninja H2R Superbike */}
        <div className="relative w-full flex-1 flex flex-col items-center justify-center overflow-hidden select-none py-1 sm:py-2">
          
          {/* High-Speed Wind Warp Lines */}
          <div className="absolute inset-x-0 top-3 h-10 pointer-events-none opacity-40 overflow-hidden">
            <div className="car-speed-wind w-48 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent absolute top-1" />
            <div className="car-speed-wind-2 w-36 h-0.5 bg-gradient-to-r from-transparent via-zinc-200 to-transparent absolute top-5" />
            <div className="car-speed-wind w-56 h-0.5 bg-gradient-to-r from-transparent via-emerald-300 to-transparent absolute top-8" />
          </div>

          {/* Superbike Riding Container */}
          <div className="relative z-10 w-full max-w-lg h-28 sm:h-36 flex items-center justify-center car-chassis-anim">
            
            {/* Rear Wheel Drift Smoke & Rubber Smoke */}
            <div className="absolute left-[12%] sm:left-[16%] bottom-2.5 pointer-events-none">
              <span className="car-drift-smoke smoke-1" />
              <span className="car-drift-smoke smoke-2" />
              <span className="car-drift-smoke smoke-3" />
            </div>

            {/* Screaming Titanium Megaphone Exhaust Flame (Kawasaki H2R Blow-off Flame) */}
            <div className="absolute left-[8%] sm:left-[13%] bottom-4 w-7 sm:w-10 h-3 bg-gradient-to-l from-emerald-400 via-amber-500 to-transparent rounded-l-full car-exhaust-flame pointer-events-none shadow-[0_0_12px_rgba(16,185,129,0.9)]" />

            {/* Piercing LED Projector Beam Slicing Forward */}
            <div className="absolute right-[5%] sm:right-[10%] bottom-5 w-32 sm:w-44 h-12 bg-gradient-to-r from-emerald-200/50 via-lime-300/30 to-transparent blur-[2px] pointer-events-none car-headlight-cone" />

            {/* Kawasaki Ninja H2R Superbike SVG Illustration */}
            <svg
              viewBox="0 0 240 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-md sm:max-w-lg h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
            >
              {/* Ground Shadow */}
              <ellipse cx="120" cy="91" rx="90" ry="4.5" fill="rgba(0,0,0,0.45)" />

              {/* ========================================================
                  REAR WHEEL & SINGLE-SIDED SWINGARM
                  ======================================================== */}
              <g transform="translate(56, 75)">
                {/* 200/55 Bridgestone Battlax Racing Slick Rear Tire */}
                <circle cx="0" cy="0" r="17" fill="#141416" stroke="#222226" strokeWidth="2" />
                {/* Single-Sided Star-Spoke Forged Wheel */}
                <g className="car-wheel-spin">
                  <circle cx="0" cy="0" r="12" fill="#27272a" />
                  <circle cx="0" cy="0" r="4.5" fill="#52525b" />
                  {/* Kawasaki Green Rim Tape Ring */}
                  <circle cx="0" cy="0" r="15" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="8 4" />
                  {/* Star Forged Spokes */}
                  <line x1="0" y1="-11" x2="0" y2="11" stroke="#a1a1aa" strokeWidth="2" />
                  <line x1="-10.5" y1="-3.5" x2="10.5" y2="3.5" stroke="#a1a1aa" strokeWidth="2" />
                  <line x1="-6.5" y1="9" x2="6.5" y2="-9" stroke="#a1a1aa" strokeWidth="2" />
                  {/* Massive Rear Sprocket & Chain */}
                  <circle cx="0" cy="0" r="7.5" fill="none" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="0" cy="0" r="2.5" fill="#10b981" />
                </g>
              </g>

              {/* Single-Sided Aluminum Swingarm */}
              <path
                d="M56 75 L82 72 L96 66 L86 64 L56 75 Z"
                fill="#3f3f46"
                stroke="#27272a"
                strokeWidth="1"
              />

              {/* ========================================================
                  FRONT WHEEL & INVERTED FORKS
                  ======================================================== */}
              <g transform="translate(186, 75)">
                {/* 120/70 ZR17 Front Slick Tire */}
                <circle cx="0" cy="0" r="17" fill="#141416" stroke="#222226" strokeWidth="2" />
                {/* Front Wheel Rim */}
                <g className="car-wheel-spin">
                  <circle cx="0" cy="0" r="12" fill="#27272a" />
                  <circle cx="0" cy="0" r="4.5" fill="#52525b" />
                  {/* Kawasaki Green Rim Tape */}
                  <circle cx="0" cy="0" r="15" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="8 4" />
                  <line x1="0" y1="-11" x2="0" y2="11" stroke="#a1a1aa" strokeWidth="2" />
                  <line x1="-10.5" y1="-3.5" x2="10.5" y2="3.5" stroke="#a1a1aa" strokeWidth="2" />
                  <line x1="-6.5" y1="9" x2="6.5" y2="-9" stroke="#a1a1aa" strokeWidth="2" />
                  {/* 330mm Semi-Floating Brembo Discs */}
                  <circle cx="0" cy="0" r="11" fill="none" stroke="#71717a" strokeWidth="2" strokeDasharray="4 2" />
                  <circle cx="0" cy="0" r="2.5" fill="#10b981" />
                </g>
                {/* Brembo Stylema Monobloc Caliper (Red Badge) */}
                <rect x="-8" y="5" width="6" height="8" rx="1.5" fill="#dc2626" />
                <rect x="-7" y="7" width="4" height="2" fill="#ffffff" />
              </g>

              {/* Inverted KYB AOS-II Racing Forks (Gold & Titanium Stanchions) */}
              <line x1="186" y1="75" x2="170" y2="38" stroke="#ca8a04" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="183" y1="70" x2="168" y2="38" stroke="#18181b" strokeWidth="2.5" />

              {/* Front Carbon Fender / Mudguard */}
              <path
                d="M174 62 C178 57 194 57 198 62 L194 65 C188 61 180 61 176 65 Z"
                fill="#18181b"
              />

              {/* ========================================================
                  EXHAUST SYSTEM (TITANIUM MEGAPHONE & HEAT SHIELD)
                  ======================================================== */}
              <path
                d="M110 74 L92 78 L60 82 L52 79 L54 75 L92 72 Z"
                fill="url(#titaniumExhaustGrad)"
                stroke="#18181b"
                strokeWidth="1"
              />
              {/* Exhaust Slash-Cut Tip */}
              <ellipse cx="53" cy="77" rx="3" ry="4" fill="#09090b" stroke="#38bdf8" strokeWidth="1" />

              {/* ========================================================
                  SUPERCHARGED 998cc ENGINE & GREEN TRELLIS FRAME
                  ======================================================== */}
              {/* Engine Block & Carbon Cases */}
              <path
                d="M96 58 L142 54 L146 72 L112 76 L94 70 Z"
                fill="#18181b"
                stroke="#27272a"
                strokeWidth="1"
              />

              {/* Exposed Kawasaki Racing Green Trellis Tubular Frame */}
              <line x1="102" y1="52" x2="142" y2="52" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
              <line x1="142" y1="52" x2="162" y2="44" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
              <line x1="102" y1="52" x2="124" y2="68" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
              <line x1="124" y1="68" x2="146" y2="52" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="124" y1="68" x2="96" y2="68" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="146" y1="52" x2="148" y2="68" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />

              {/* Supercharger Red/Green Turbine Housing Glow */}
              <circle cx="128" cy="62" r="5" fill="#052e16" stroke="#22c55e" strokeWidth="1.5" />
              <circle cx="128" cy="62" r="2.5" fill="#22c55e" className="animate-ping" />

              {/* ========================================================
                  CARBON FIBER FAIRING & FUEL TANK
                  ======================================================== */}
              {/* Chiseled Fuel Tank (Mirror-Coated Spark Black) */}
              <path
                d="M106 44 C116 34 136 34 148 42 L144 50 L108 50 Z"
                fill="#27272a"
                stroke="#3f3f46"
                strokeWidth="1"
              />
              {/* Tank Silver Mirror Highlight */}
              <path
                d="M112 42 C120 37 132 37 140 42 L136 45 C130 41 122 41 116 45 Z"
                fill="rgba(255,255,255,0.4)"
              />

              {/* Aggressive H2R Sharp Tail Cowl & Winglets */}
              <path
                d="M72 48 L104 46 L98 56 L68 54 Z"
                fill="#18181b"
                stroke="#27272a"
                strokeWidth="1"
              />
              {/* Tail Aerodynamic Spoiler Fin */}
              <path
                d="M66 52 L82 46 L86 48 L68 55 Z"
                fill="#22c55e"
              />

              {/* Front Carbon Fairing & Upper Cowl */}
              <path
                d="M144 42 L172 34 L196 46 L188 56 L160 52 L144 50 Z"
                fill="#18181b"
                stroke="#27272a"
                strokeWidth="1"
              />

              {/* Ninja H2R Massive Carbon Downforce Front Winglets (Upper & Lower) */}
              {/* Upper Winglet (where mirrors would be) */}
              <path
                d="M172 38 L190 32 L192 36 L174 42 Z"
                fill="#09090b"
                stroke="#22c55e"
                strokeWidth="1"
              />
              {/* Lower Carbon Strakes */}
              <path
                d="M176 48 L194 46 L192 50 L174 51 Z"
                fill="#09090b"
                stroke="#3f3f46"
                strokeWidth="1"
              />

              {/* Ram-Air Duct & Hyper-LED Projector Light */}
              <path
                d="M188 44 L198 46 L194 50 L186 48 Z"
                fill="#022c22"
              />
              <polygon points="194,46 200,47 197,49 192,48" fill="#4ade80" />
              <circle cx="197" cy="47.5" r="1.5" fill="#ffffff" />

              {/* Racing Aerodynamic Bubble Windscreen */}
              <path
                d="M168 34 C174 24 186 28 190 36 L176 36 Z"
                fill="rgba(16,185,129,0.35)"
                stroke="#22c55e"
                strokeWidth="1"
              />

              {/* ========================================================
                  RIDER IN HIGH-SPEED AERODYNAMIC RACING TUCK
                  ======================================================== */}
              {/* Racing Leather Torso / Suit */}
              <path
                d="M114 42 C120 30 144 26 158 36 L152 46 L118 46 Z"
                fill="#18181b"
                stroke="#27272a"
                strokeWidth="1"
              />
              {/* Kawasaki Green Racing Suit Accents */}
              <path
                d="M124 35 L146 31 L148 35 L126 39 Z"
                fill="#22c55e"
              />
              {/* Aerodynamic Speed Hump on Rider's Back */}
              <path
                d="M112 36 C116 28 126 28 132 34 Z"
                fill="#09090b"
              />
              {/* Aerodynamic Racing Helmet & Smoked Iridescent Visor */}
              <ellipse cx="160" cy="27" rx="10" ry="8.5" fill="#18181b" stroke="#22c55e" strokeWidth="1" />
              <path
                d="M164 24 C170 25 170 30 166 32 L158 31 Z"
                fill="#22c55e"
              />
              {/* Arm reaching for clip-on handlebar */}
              <path
                d="M142 38 L168 40 L166 43 L140 42 Z"
                fill="#27272a"
              />

              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="titaniumExhaustGrad" x1="110" y1="74" x2="52" y2="79" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ca8a04" />
                  <stop offset="40%" stopColor="#818cf8" />
                  <stop offset="70%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* High-Speed Asphalt Road with Isle of Man / Suzuka Kerbs */}
          <div className="w-full relative h-7 sm:h-8 flex flex-col justify-end mt-1">
            {/* Kawasaki Green & White Racing Kerb */}
            <div className="w-full h-1.5 h2r-kerb-anim rounded-t-sm" />
            
            {/* Asphalt Surface with Dashed Centerline */}
            <div className="w-full h-5 bg-zinc-900 relative overflow-hidden flex items-center border-t border-zinc-700/60">
              <div className="road-stripes-anim flex gap-6 w-[200%] absolute left-0">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-1 bg-yellow-400 rounded-full shrink-0 shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                  />
                ))}
              </div>
            </div>
            
            {/* Bottom Dark Frame */}
            <div className="w-full h-0.5 bg-black" />
          </div>
        </div>

        {/* Cinematic Letterbox Bottom Dash & Telemetry HUD */}
        <div className="relative z-20 w-full pt-2 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-2">
          
          {/* Article / Loading Message Display */}
          <div className="flex flex-col text-center sm:text-left">
            <div className="font-display text-xs sm:text-sm font-bold tracking-wide text-white uppercase flex items-center justify-center sm:justify-start gap-1.5">
              <span>{message}</span>
              <span className="inline-block w-1.5 h-3 bg-emerald-500 animate-pulse ml-0.5" />
            </div>
            <p className="text-[10px] sm:text-xs text-zinc-400 font-mono truncate max-w-sm">
              {submessage}
            </p>
          </div>

          {/* H2R Digital Tachometer & Shift Light Array */}
          <div className="w-full sm:w-auto flex flex-col items-center sm:items-end gap-1">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono font-bold text-zinc-500">REV RANGE</span>
              {/* 5 High-Intensity Kawasaki Green Shift Lights */}
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.9)] animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.9)] animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(250,204,21,0.9)] animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)] animate-pulse" />
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-400">14,000 RPM REDLINE</span>
            </div>

            {/* Sweep Bar */}
            <div className="w-full sm:w-56 bg-zinc-900 border border-zinc-800 rounded-full p-0.5 overflow-hidden">
              <div className="tach-sweep h-1 rounded-full bg-gradient-to-r from-emerald-500 via-lime-400 to-red-500" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
