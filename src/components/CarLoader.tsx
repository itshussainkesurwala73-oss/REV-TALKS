import React, { useEffect, useState } from 'react';

interface CarLoaderProps {
  isLoading: boolean;
  message?: string;
  submessage?: string;
}

export const CarLoader: React.FC<CarLoaderProps> = ({
  isLoading,
  message = 'FERRARI LAFERRARI',
  submessage = 'HY-KERS active · 6.3L Naturally Aspirated V12 priming...',
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
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading content"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 pointer-events-auto ${
        animatingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Blurred & Dimmed Backdrop */}
      <div 
        className="absolute inset-0 bg-black/55 dark:bg-black/80 backdrop-blur-md transition-opacity duration-300" 
      />

      {/* Center Micro-Stage Card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md rounded-2xl bg-white/95 dark:bg-zinc-950/95 border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl shadow-red-950/25 dark:shadow-red-950/50 p-6 flex flex-col items-center overflow-hidden">
        
        {/* Subtle Ambient Red Maranello Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-24 bg-red-600/20 dark:bg-red-600/25 blur-2xl rounded-full pointer-events-none" />

        {/* Top Badges */}
        <div className="w-full flex items-center justify-between mb-3 text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-zinc-950 dark:text-zinc-100 font-bold tracking-wider">LAFERRARI HY-KERS</span>
          </div>
          <div className="flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold">
            <span className="text-[8px] bg-amber-400/15 text-amber-600 dark:text-amber-400 font-mono px-1.5 py-0.5 rounded border border-amber-400/30">
              950 HP
            </span>
            <span className="text-[8px] bg-red-500/10 text-red-600 dark:text-red-400 font-mono px-1 py-0.5 rounded border border-red-500/20">
              V12
            </span>
          </div>
        </div>

        {/* Car & Road Stage */}
        <div className="relative w-full h-32 flex flex-col items-center justify-end overflow-hidden select-none py-2">
          
          {/* Aerodynamic Speed Wind Streaks */}
          <div className="absolute top-2 inset-x-0 h-5 pointer-events-none opacity-40 overflow-hidden">
            <div className="car-speed-wind w-36 h-0.5 bg-gradient-to-r from-transparent via-zinc-400 dark:via-zinc-500 to-transparent absolute top-0" />
            <div className="car-speed-wind-2 w-28 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent absolute top-2" />
          </div>

          {/* Drifting Ferrari LaFerrari Silhouette */}
          <div className="relative z-10 w-52 h-18 flex items-center justify-center car-chassis-anim">
            
            {/* Drift Smoke from Rear Wheel */}
            <div className="absolute -left-2 bottom-2.5 pointer-events-none">
              <span className="car-drift-smoke smoke-1" />
              <span className="car-drift-smoke smoke-2" />
              <span className="car-drift-smoke smoke-3" />
            </div>

            {/* Screaming V12 Exhaust Flame (Blue-Orange Hypercar Flame) */}
            <div className="absolute -left-3.5 bottom-3.5 w-5 h-2 bg-gradient-to-l from-blue-400 via-orange-500 to-transparent rounded-l-full car-exhaust-flame pointer-events-none" />

            {/* Slender LED Headlight Beam Projecting Forward */}
            <div className="absolute right-0 bottom-3 w-20 h-9 bg-gradient-to-r from-amber-100/40 via-yellow-300/25 to-transparent blur-[1px] pointer-events-none car-headlight-cone" />

            {/* Authentic Ferrari LaFerrari SVG Vector */}
            <svg
              viewBox="0 0 175 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-48 h-auto drop-shadow-[0_5px_12px_rgba(0,0,0,0.4)]"
            >
              {/* Ground Aero Ground-Effect Shadow */}
              <ellipse cx="86" cy="53" rx="76" ry="3.5" fill="rgba(0,0,0,0.38)" />

              {/* Carbon Fiber Underbody / Front Splitter & Rear Active Diffuser */}
              <path
                d="M4 42 L12 45 L34 45 L54 45 L126 45 L144 45 L166 43 L170 39 L162 42 L132 43 L54 43 L36 43 L8 40 Z"
                className="fill-zinc-950 dark:fill-zinc-900"
              />

              {/* Rear Diffuser Aerodynamic Vertical Strakes */}
              <rect x="6" y="42" width="2" height="4" rx="0.5" fill="#09090b" />
              <rect x="11" y="42" width="2" height="4" rx="0.5" fill="#09090b" />
              <rect x="16" y="42" width="2" height="4" rx="0.5" fill="#09090b" />

              {/* Main Body Chassis - Sculpted Rosso Corsa Red */}
              <path
                d="M6 35 C6 30 14 26 26 24 C36 22 46 21 54 21 C62 21 72 26 84 27 C96 28 112 24 122 23 C132 22 144 26 156 32 C164 36 168 39 168 40 L166 43 C156 44 148 44 144 44 C142 37 128 37 126 44 L54 44 C52 37 38 37 36 44 L10 44 C6 43 5 38 6 35 Z"
                className="fill-[#dc2626]"
              />

              {/* Upper Body Highlights & Dynamic Shoulder Contours */}
              <path
                d="M26 24 C40 23 54 22 62 25 L88 28 C102 29 116 26 126 24 C136 23 148 28 158 34 L154 36 C144 30 134 26 124 26 C112 28 98 31 84 30 C72 29 60 25 46 26 C34 27 24 29 16 32 L14 30 C20 27 24 25 26 24 Z"
                fill="rgba(255,255,255,0.2)"
              />

              {/* LaFerrari Signature Black Cockpit / Nero DS Roof Canopy */}
              <path
                d="M52 21 C58 15 72 13 88 13 C104 13 118 16 122 23 L118 26 C112 21 100 17 88 17 C74 17 62 20 54 24 Z"
                className="fill-zinc-950"
              />

              {/* Windshield & Side Windows (Tinted Glass) */}
                <path
                d="M60 22 C64 16 76 14 88 14 C100 14 112 17 118 23 L114 28 C108 24 98 21 86 21 C74 21 66 23 60 25 Z"
                fill="#18181b"
              />
              {/* Windshield Gloss Arc */}
              <path
                d="M94 15 C104 15 112 17 116 22 L112 25 C108 21 100 19 92 19 Z"
                fill="rgba(255,255,255,0.3)"
              />

              {/* Glass Engine Cover displaying 6.3L V12 Plenum */}
              <path
                d="M44 23 L58 21 L56 26 L42 27 Z"
                fill="rgba(24,24,27,0.85)"
              />
              {/* Red V12 Intake Runners visible under glass */}
              <line x1="46" y1="24" x2="55" y2="23" stroke="#ef4444" strokeWidth="1.2" />
              <line x1="46" y1="26" x2="55" y2="25" stroke="#ef4444" strokeWidth="1.2" />

              {/* Side Aero Sculpted Scoop / Radiator Air Intake */}
              <path
                d="M68 36 C80 32 98 32 110 34 L108 38 C96 36 82 36 70 40 Z"
                className="fill-zinc-950"
              />
              <path
                d="M72 38 C82 35 94 35 104 36 L102 37 C94 36 84 36 74 39 Z"
                fill="rgba(0,0,0,0.6)"
              />

              {/* Scuderia Ferrari Yellow Shield Badge on Front Wing */}
              <polygon points="126,27 129,27 128,30 126,30" fill="#facc15" />
              <circle cx="127.5" cy="28.5" r="0.6" fill="#000000" />

              {/* Swept-Back L-Shaped LED Headlight Cluster */}
              <path
                d="M146 31 C152 33 160 37 162 38 L158 39 C154 38 148 35 144 33 Z"
                fill="#FEF08A"
              />
              <circle cx="158" cy="37.5" r="1.3" fill="#FFFFFF" />
              <circle cx="152" cy="35" r="1" fill="#FFFFFF" />

              {/* Iconic Single Round Ferrari LED Taillight */}
              <circle cx="9" cy="32" r="3.2" fill="#ef4444" className="filter drop-shadow-[0_0_4px_rgba(239,68,68,0.9)]" />
              <circle cx="9" cy="32" r="1.6" fill="#18181b" />

              {/* Quad Titanium Exhaust Tips */}
              <rect x="3" y="38" width="3" height="2" rx="0.8" fill="#a1a1aa" />
              <rect x="3" y="41" width="3" height="2" rx="0.8" fill="#71717a" />

              {/* Front Wheel Arch & Forged Star Wheel */}
              <g transform="translate(136, 44)">
                {/* Pirelli P-Zero Corsa Tire */}
                <circle cx="0" cy="0" r="8.5" fill="#18181b" stroke="#27272a" strokeWidth="1" />
                {/* Rotating Forged Rim with Carbon-Ceramic Brakes */}
                <g className="car-wheel-spin">
                  {/* Carbon Ceramic Rotor */}
                  <circle cx="0" cy="0" r="6" fill="#52525b" />
                  <circle cx="0" cy="0" r="2.2" fill="#d4d4d8" />
                  {/* Ferrari Modena Yellow Caliper */}
                  <rect x="2" y="-3.5" width="2.5" height="5" rx="1" fill="#facc15" />
                  {/* 5-Spoke Star Rim Pattern */}
                  <line x1="0" y1="-5.5" x2="0" y2="5.5" stroke="#f4f4f5" strokeWidth="1.2" />
                  <line x1="-5.2" y1="-1.8" x2="5.2" y2="1.8" stroke="#f4f4f5" strokeWidth="1.2" />
                  <line x1="-3.2" y1="4.5" x2="3.2" y2="-4.5" stroke="#f4f4f5" strokeWidth="1.2" />
                  {/* Yellow Center Lock Nut */}
                  <circle cx="0" cy="0" r="1.2" fill="#eab308" />
                </g>
              </g>

              {/* Rear Wheel Arch & Forged Star Wheel */}
              <g transform="translate(46, 44)">
                {/* Pirelli P-Zero Corsa Tire */}
                <circle cx="0" cy="0" r="8.5" fill="#18181b" stroke="#27272a" strokeWidth="1" />
                {/* Rotating Forged Rim */}
                <g className="car-wheel-spin">
                  {/* Carbon Ceramic Rotor */}
                  <circle cx="0" cy="0" r="6" fill="#52525b" />
                  <circle cx="0" cy="0" r="2.2" fill="#d4d4d8" />
                  {/* Ferrari Modena Yellow Caliper */}
                  <rect x="2" y="-3.5" width="2.5" height="5" rx="1" fill="#facc15" />
                  {/* 5-Spoke Star Rim Pattern */}
                  <line x1="0" y1="-5.5" x2="0" y2="5.5" stroke="#f4f4f5" strokeWidth="1.2" />
                  <line x1="-5.2" y1="-1.8" x2="5.2" y2="1.8" stroke="#f4f4f5" strokeWidth="1.2" />
                  <line x1="-3.2" y1="4.5" x2="3.2" y2="-4.5" stroke="#f4f4f5" strokeWidth="1.2" />
                  {/* Yellow Center Lock Nut */}
                  <circle cx="0" cy="0" r="1.2" fill="#eab308" />
                </g>
              </g>
            </svg>
          </div>

          {/* Animated Road Track */}
          <div className="w-full relative h-6 mt-[-8px] flex flex-col justify-end">
            {/* Top Red & White Curb (Fiorano Circuit Kerb) */}
            <div className="w-full h-1 racing-kerb-anim rounded-t-sm" />
            
            {/* Asphalt Surface */}
            <div className="w-full h-4 bg-zinc-800 dark:bg-zinc-900 relative overflow-hidden flex items-center">
              {/* Dashed Center Stripes Scrolling Rapidly */}
              <div className="road-stripes-anim flex gap-5 w-[200%] absolute left-0">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-0.5 bg-yellow-400 dark:bg-yellow-300 rounded-full shrink-0 shadow-xs"
                  />
                ))}
              </div>
            </div>
            
            {/* Bottom Asphalt Edge Shadow */}
            <div className="w-full h-0.5 bg-zinc-950/80" />
          </div>
        </div>

        {/* Status Message & Tachometer Progress Bar */}
        <div className="w-full mt-4 flex flex-col items-center text-center">
          <div className="font-display text-sm font-bold tracking-wide text-zinc-950 dark:text-white uppercase flex items-center gap-1.5">
            <span>{message}</span>
            <span className="inline-block w-1.5 h-3.5 bg-red-600 animate-pulse ml-0.5" />
          </div>
          
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans mt-0.5 max-w-xs truncate">
            {submessage}
          </p>

          {/* F1 Steering Wheel Shift Lights Bar (5 LED racing shift lights) */}
          <div className="w-full mt-3 flex items-center justify-between px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80">
            <span className="text-[8px] font-mono font-bold text-zinc-500 dark:text-zinc-400">RPM</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)] animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)] animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(250,204,21,0.8)] animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)] animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.8)] animate-pulse" />
            </div>
            <span className="text-[8px] font-mono font-bold text-red-600 dark:text-red-400">9,250 REDLINE</span>
          </div>

          {/* Tachometer Sweep Progress */}
          <div className="w-full mt-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-full p-0.5 overflow-hidden">
            <div className="tach-sweep h-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-600" />
          </div>

          {/* Powertrain Telemetry */}
          <div className="w-full flex justify-between items-center mt-1.5 px-0.5 text-[9px] font-mono text-zinc-400 dark:text-zinc-500">
            <span>6.3L NA V12 + KERS</span>
            <div className="flex items-center gap-1">
              <span className="text-red-500 font-bold">MARANELLO</span>
              <span>·</span>
              <span>0-100 &lt; 2.6s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
