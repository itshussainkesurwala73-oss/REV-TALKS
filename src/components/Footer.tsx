import React from 'react';
import { ArrowUp, Gauge, Zap } from 'lucide-react';
import { Category, VehicleType } from '../types/article';

interface FooterProps {
  onSelectCategory: (category: Category | 'All') => void;
  onSelectVehicleType: (type: VehicleType | 'All') => void;
  onOpenContact: () => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectVehicleType,
  onOpenContact,
  onNavigateHome,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800 bg-black text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={onNavigateHome}
              className="group flex items-center gap-2.5 text-left focus-visible:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
                <Gauge className="w-4 h-4" />
              </div>
              <span className="font-display text-2xl font-black text-white tracking-tight">
                REV <span className="text-red-500 font-extrabold">TALKS</span>
              </span>
            </button>
            <p className="text-sm leading-relaxed text-zinc-400 max-w-sm">
              The premier automotive journal celebrating naturally aspirated redlines, analog chassis balance, track-bred homologations, and next-generation powertrain physics.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 pt-2">
              <Zap className="w-3.5 h-3.5 text-red-500 fill-current" />
              <span>10 Verified Technical Treatises · 100% Real-World Heritage</span>
            </div>
          </div>

          {/* Directory Column 1 */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-white font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Paddock Directory</span>
            </div>
            <ul className="space-y-2 text-sm font-mono">
              <li>
                <button
                  onClick={() => {
                    onSelectVehicleType('Car');
                    onNavigateHome();
                  }}
                  className="hover:text-red-400 transition-colors"
                >
                  Supercars & GTs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectVehicleType('Motorcycle');
                    onNavigateHome();
                  }}
                  className="hover:text-red-400 transition-colors"
                >
                  Superbikes & Two-Strokes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Motorsport');
                    onNavigateHome();
                  }}
                  className="hover:text-red-400 transition-colors"
                >
                  Motorsport & Le Mans
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Engineering');
                    onNavigateHome();
                  }}
                  className="hover:text-red-400 transition-colors"
                >
                  Dyno & Powertrains
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial & Inquiries Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-white font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Editorial Desk</span>
            </div>
            <ul className="space-y-2 text-sm font-mono">
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-red-400 transition-colors"
                >
                  Letters to Rev Talks
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-red-400 transition-colors"
                >
                  Technical Dyno Note & Fact Check
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-red-400 transition-colors"
                >
                  Media & High-Res Schematics
                </button>
              </li>
            </ul>
            <div className="pt-2 text-xs font-mono text-zinc-500">
              Published for driving enthusiasts and mechanics. Optimized for retina displays.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} Rev Talks. All rights reserved. Built for speed.
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">Ultra-Fast · Responsive · Pure Octane</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-red-400 transition-colors font-bold"
              title="Return to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
