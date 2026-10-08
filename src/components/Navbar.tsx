import React, { useState } from 'react';
import { Sun, Moon, Bookmark, Search, Menu, X, ArrowUpRight, Gauge, Zap, Volume2, VolumeX, Flame } from 'lucide-react';
import { Category, VehicleType } from '../types/article';
import { engineAudio } from '../utils/engineAudio';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  savedCount: number;
  onOpenBookmarks: () => void;
  onOpenSearch: () => void;
  onNavigateHome: () => void;
  onSelectCategory: (category: Category | 'All') => void;
  onSelectVehicleType: (type: VehicleType | 'All') => void;
  onOpenContact: () => void;
  activeCategory: Category | 'All';
  activeVehicleType: VehicleType | 'All';
  currentView: 'home' | 'article' | 'contact';
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  savedCount,
  onOpenBookmarks,
  onOpenSearch,
  onNavigateHome,
  onSelectCategory,
  onSelectVehicleType,
  onOpenContact,
  activeCategory,
  activeVehicleType,
  currentView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [engineState, setEngineState] = useState<'off' | 'starting' | 'revving'>('off');

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  const handleEngineStart = () => {
    if (engineState === 'off') {
      setEngineState('starting');
      setTimeout(() => setEngineState('revving'), 400);

      engineAudio.playEngineStart(() => {
        setEngineState('off');
      });
    } else {
      // Re-blip or stop
      engineAudio.stop();
      setEngineState('off');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 dark:bg-black/90 backdrop-blur-xl transition-colors duration-200">
      {/* Top micro racing stripe */}
      <div className="h-0.5 w-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          
          {/* Zone 1: Sporty Wordmark */}
          <div className="flex items-center gap-5">
            <button
              onClick={onNavigateHome}
              className="text-left group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
              aria-label="Rev Talks Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
                <Gauge className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1">
                  REV <span className="text-red-500 font-extrabold">TALKS</span>
                </span>
              </div>
            </button>
            <span className="hidden xl:inline text-[11px] font-mono tracking-widest uppercase text-zinc-400 border-l border-zinc-800 pl-4 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-red-500 fill-current" />
              10 High-Octane Machines
            </span>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-zinc-300">
            <button
              onClick={() => {
                onSelectVehicleType('All');
                onSelectCategory('All');
                onNavigateHome();
              }}
              className={`hover:text-white transition-all py-1 border-b-2 ${
                currentView === 'home' && activeCategory === 'All' && activeVehicleType === 'All'
                  ? 'border-red-500 text-white font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All Treats
            </button>

            <button
              onClick={() => {
                onSelectVehicleType('Car');
                onNavigateHome();
              }}
              className={`hover:text-white transition-all py-1 border-b-2 ${
                currentView === 'home' && activeVehicleType === 'Car'
                  ? 'border-red-500 text-white font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Supercars
            </button>

            <button
              onClick={() => {
                onSelectVehicleType('Motorcycle');
                onNavigateHome();
              }}
              className={`hover:text-white transition-all py-1 border-b-2 ${
                currentView === 'home' && activeVehicleType === 'Motorcycle'
                  ? 'border-red-500 text-white font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Superbikes
            </button>

            <button
              onClick={() => {
                onSelectCategory('Motorsport');
                onNavigateHome();
              }}
              className={`hover:text-white transition-all py-1 border-b-2 ${
                currentView === 'home' && activeCategory === 'Motorsport'
                  ? 'border-red-500 text-white font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Motorsport
            </button>

            <button
              onClick={() => {
                onSelectCategory('Engineering');
                onNavigateHome();
              }}
              className={`hover:text-white transition-all py-1 border-b-2 ${
                currentView === 'home' && activeCategory === 'Engineering'
                  ? 'border-red-500 text-white font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Engineering
            </button>

            <button
              onClick={onOpenContact}
              className={`hover:text-white transition-all py-1 border-b-2 ${
                currentView === 'contact'
                  ? 'border-red-500 text-white font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Actions + Engine Start Audio Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Subtle 'ENGINE START' Audio Button */}
            <button
              type="button"
              onClick={handleEngineStart}
              className={`relative group inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                engineState !== 'off'
                  ? 'bg-red-950/80 border-red-500 text-white shadow-lg shadow-red-600/40 ring-1 ring-red-500/50'
                  : 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:text-white hover:border-red-500/60 hover:bg-zinc-800'
              }`}
              aria-label={engineState !== 'off' ? 'Stop engine audio' : 'Start engine ignition audio'}
              title={engineState !== 'off' ? 'Engine Running // Click to cut' : 'Engine Start // Ignition & Rev sound'}
            >
              {/* Subtle Pulsing Red LED Indicator Dot */}
              <span className="relative flex h-2 w-2">
                {engineState !== 'off' && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    engineState !== 'off' ? 'bg-red-500' : 'bg-zinc-600 group-hover:bg-red-500/80 transition-colors'
                  }`}
                />
              </span>

              {/* Status & Label */}
              <span className="hidden sm:inline font-bold">
                {engineState === 'starting' ? (
                  <span className="text-amber-400">CRANK...</span>
                ) : engineState === 'revving' ? (
                  <span className="text-red-400 animate-pulse">REV 7,500</span>
                ) : (
                  <span>ENGINE START</span>
                )}
              </span>

              {/* Icon */}
              {engineState !== 'off' ? (
                <Flame className="w-3.5 h-3.5 text-red-500 animate-bounce" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-red-400 transition-colors" />
              )}
            </button>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg border border-zinc-800/60 hover:border-zinc-700 transition-colors"
              aria-label="Search articles"
              title="Search articles (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Bookmarks Drawer Trigger */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg border border-zinc-800/60 hover:border-zinc-700 transition-colors"
              aria-label={`View reading list (${savedCount} saved)`}
              title="Reading List"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-[10px] font-mono font-bold text-white flex items-center justify-center shadow-xs">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg border border-zinc-800/60 hover:border-zinc-700 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-300" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg border border-zinc-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 pt-3 pb-6 space-y-2 animate-fadeIn font-mono text-xs uppercase">
          
          {/* Mobile Engine Start Trigger */}
          <div className="pb-2 border-b border-zinc-800">
            <button
              onClick={handleEngineStart}
              className={`w-full py-2.5 px-3 rounded-lg flex items-center justify-between border transition-all ${
                engineState !== 'off'
                  ? 'bg-red-950/80 border-red-500 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${engineState !== 'off' ? 'bg-red-500 animate-ping' : 'bg-zinc-500'}`} />
                <span>Engine Ignition Audio</span>
              </span>
              <span className="text-red-400 font-bold">
                {engineState !== 'off' ? 'REV RUNNING' : 'PUSH TO START'}
              </span>
            </button>
          </div>

          <button
            onClick={() => handleNavClick(() => {
              onSelectVehicleType('All');
              onSelectCategory('All');
              onNavigateHome();
            })}
            className="w-full text-left py-2.5 px-3 text-zinc-200 rounded-lg hover:bg-zinc-900 hover:text-red-400 transition-colors"
          >
            All 10 Dispatches
          </button>
          <button
            onClick={() => handleNavClick(() => {
              onSelectVehicleType('Car');
              onNavigateHome();
            })}
            className="w-full text-left py-2.5 px-3 text-zinc-200 rounded-lg hover:bg-zinc-900 hover:text-red-400 transition-colors"
          >
            Supercars & Hypercars
          </button>
          <button
            onClick={() => handleNavClick(() => {
              onSelectVehicleType('Motorcycle');
              onNavigateHome();
            })}
            className="w-full text-left py-2.5 px-3 text-zinc-200 rounded-lg hover:bg-zinc-900 hover:text-red-400 transition-colors"
          >
            Motorcycles & Superbikes
          </button>
          <button
            onClick={() => handleNavClick(() => {
              onSelectCategory('Motorsport');
              onNavigateHome();
            })}
            className="w-full text-left py-2.5 px-3 text-zinc-200 rounded-lg hover:bg-zinc-900 hover:text-red-400 transition-colors"
          >
            Motorsport & Heritage
          </button>
          <button
            onClick={() => handleNavClick(() => {
              onSelectCategory('Engineering');
              onNavigateHome();
            })}
            className="w-full text-left py-2.5 px-3 text-zinc-200 rounded-lg hover:bg-zinc-900 hover:text-red-400 transition-colors"
          >
            Powertrain Engineering
          </button>
          <button
            onClick={() => handleNavClick(onOpenContact)}
            className="w-full text-left py-2.5 px-3 text-zinc-200 rounded-lg hover:bg-zinc-900 hover:text-red-400 transition-colors flex items-center justify-between"
          >
            <span>Contact & Inquiries</span>
            <ArrowUpRight className="w-4 h-4 text-red-500" />
          </button>
        </div>
      )}
    </header>
  );
};
