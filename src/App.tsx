import React, { useState, useEffect } from 'react';
import { ARTICLES } from './data/articles';
import { Article, Category, VehicleType } from './types/article';
import { Navbar } from './components/Navbar';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { ContactSection } from './components/ContactSection';
import { SearchModal } from './components/SearchModal';
import { BookmarksModal } from './components/BookmarksModal';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { SlidersHorizontal, Flame, ArrowRight, Activity, Disc } from 'lucide-react';
import cinematicBg from './assets/images/revtalks_cinematic_bg_1791385997218.jpg';

export default function App() {
  // Dark mode state: initialized from localStorage or DOM class
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('revtalks_theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark') ||
             !document.documentElement.classList.contains('light');
    } catch {
      return true; // Default to sporty dark mode
    }
  });

  // Navigation & View State
  const [currentView, setCurrentView] = useState<'home' | 'article' | 'contact'>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Filters State
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [activeVehicleType, setActiveVehicleType] = useState<VehicleType | 'All'>('All');

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Bookmarks in localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('revtalks_bookmarks');
      return saved ? JSON.parse(saved) : ['mclaren-f1-purity'];
    } catch {
      return ['mclaren-f1-purity'];
    }
  });

  // Apply dark/light mode classes to html document root synchronously
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      try {
        localStorage.setItem('revtalks_theme', 'dark');
      } catch {}
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      try {
        localStorage.setItem('revtalks_theme', 'light');
      } catch {}
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      const root = document.documentElement;
      if (next) {
        root.classList.add('dark');
        root.classList.remove('light');
        root.setAttribute('data-theme', 'dark');
        try {
          localStorage.setItem('revtalks_theme', 'dark');
        } catch {}
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        root.setAttribute('data-theme', 'light');
        try {
          localStorage.setItem('revtalks_theme', 'light');
        } catch {}
      }
      return next;
    });
  };

  // Comprehensive URL Router (Pathname + Hash + PopState + Browser Back/Forward)
  useEffect(() => {
    const parseUrl = () => {
      const rawPath = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
      const rawHash = window.location.hash.toLowerCase().replace(/^#\/?/, '');

      // Helper category map
      const categoryMap: Record<string, Category> = {
        supercars: 'Supercars',
        superbikes: 'Superbikes',
        motorsport: 'Motorsport',
        engineering: 'Engineering',
        heritage: 'Heritage',
      };

      // 1. Article view: /article/:slug or #article/:slug
      let articleSlug = '';
      if (rawPath.startsWith('article/')) {
        articleSlug = rawPath.replace('article/', '');
      } else if (rawHash.startsWith('article/')) {
        articleSlug = rawHash.replace('article/', '');
      }

      if (articleSlug) {
        const found = ARTICLES.find((a) => a.slug.toLowerCase() === articleSlug);
        if (found) {
          setSelectedArticle(found);
          setCurrentView('article');
          document.title = `${found.title} — Rev Talks`;
          return;
        }
      }

      // 2. Contact view: /contact or #contact
      if (rawPath === 'contact' || rawHash === 'contact') {
        setCurrentView('contact');
        setSelectedArticle(null);
        document.title = 'Contact & Inquiries — Rev Talks';
        return;
      }

      // 3. Category / Vehicle type: /category/:slug or #category/:slug
      let catSlug = '';
      if (rawPath.startsWith('category/')) {
        catSlug = rawPath.replace('category/', '');
      } else if (rawHash.startsWith('category/')) {
        catSlug = rawHash.replace('category/', '');
      } else if (rawHash.startsWith('type/')) {
        catSlug = rawHash.replace('type/', '');
      }

      if (catSlug) {
        if (catSlug === 'car' || catSlug === 'cars') {
          setActiveVehicleType('Car');
          setActiveCategory('All');
          setCurrentView('home');
          setSelectedArticle(null);
          document.title = 'Supercars & GTs — Rev Talks';
          return;
        }
        if (catSlug === 'motorcycle' || catSlug === 'motorcycles' || catSlug === 'bikes') {
          setActiveVehicleType('Motorcycle');
          setActiveCategory('All');
          setCurrentView('home');
          setSelectedArticle(null);
          document.title = 'Superbikes & Two-Strokes — Rev Talks';
          return;
        }
        if (categoryMap[catSlug]) {
          const mappedCat = categoryMap[catSlug];
          setActiveCategory(mappedCat);
          setActiveVehicleType('All');
          setCurrentView('home');
          setSelectedArticle(null);
          document.title = `${mappedCat} Dispatches — Rev Talks`;
          return;
        }
      }

      // 4. Default Home view
      setCurrentView('home');
      setSelectedArticle(null);
      if (rawPath === '' && (rawHash === '' || rawHash === 'home')) {
        setActiveCategory('All');
        setActiveVehicleType('All');
      }
      document.title = 'Rev Talks — The Automotive Journal';
    };

    parseUrl();
    window.addEventListener('popstate', parseUrl);
    window.addEventListener('hashchange', parseUrl);
    return () => {
      window.removeEventListener('popstate', parseUrl);
      window.removeEventListener('hashchange', parseUrl);
    };
  }, []);

  // Keyboard shortcut: Cmd+K / Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // URL State Transition Handlers (Updates address bar URL and history stack)
  const pushUrl = (url: string, title?: string) => {
    try {
      window.history.pushState(null, '', url);
      if (title) document.title = title;
    } catch {
      // Fallback if pushState is restricted
      window.location.hash = url;
    }
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article');
    pushUrl(`/article/${article.slug}`, `${article.title} — Rev Talks`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedArticle(null);
    setActiveCategory('All');
    setActiveVehicleType('All');
    pushUrl('/', 'Rev Talks — The Automotive Journal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: Category | 'All') => {
    setActiveCategory(cat);
    setActiveVehicleType('All');
    setCurrentView('home');
    setSelectedArticle(null);
    if (cat === 'All') {
      pushUrl('/', 'Rev Talks — The Automotive Journal');
    } else {
      pushUrl(`/category/${cat.toLowerCase()}`, `${cat} Dispatches — Rev Talks`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVehicleType = (vt: VehicleType | 'All') => {
    setActiveVehicleType(vt);
    setActiveCategory('All');
    setCurrentView('home');
    setSelectedArticle(null);
    if (vt === 'All') {
      pushUrl('/', 'Rev Talks — The Automotive Journal');
    } else if (vt === 'Car') {
      pushUrl('/category/cars', 'Supercars & GTs — Rev Talks');
    } else {
      pushUrl('/category/motorcycles', 'Superbikes & Two-Strokes — Rev Talks');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContact = () => {
    setCurrentView('contact');
    setSelectedArticle(null);
    pushUrl('/contact', 'Contact & Inquiries — Rev Talks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (articleId: string) => {
    let updated: string[];
    if (bookmarkedIds.includes(articleId)) {
      updated = bookmarkedIds.filter((id) => id !== articleId);
    } else {
      updated = [...bookmarkedIds, articleId];
    }
    setBookmarkedIds(updated);
    localStorage.setItem('revtalks_bookmarks', JSON.stringify(updated));
  };

  const handleClearBookmarks = () => {
    setBookmarkedIds([]);
    localStorage.setItem('revtalks_bookmarks', JSON.stringify([]));
  };

  const bookmarkedArticles = ARTICLES.filter((a) => bookmarkedIds.includes(a.id));

  // Filtered articles list
  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesVehicle = activeVehicleType === 'All' || article.vehicleType === activeVehicleType;
    return matchesCategory && matchesVehicle;
  });

  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];
  const gridArticles = filteredArticles;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-red-500/30 selection:text-red-200 transition-colors duration-200 flex flex-col relative overflow-x-hidden">
      
      {/* =========================================================================
          CINEMATIC CARS & BIKES ATMOSPHERIC BACKGROUND SYSTEM (PURE WHITE LIGHT / DEEP BLACK DARK)
         ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-300">
        {/* Cinematic Backdrop Image */}
        <img
          src={cinematicBg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-10 dark:opacity-35 scale-105 transform mix-blend-multiply dark:mix-blend-screen contrast-125 filter blur-[0.5px]"
        />

        {/* Dynamic Theme Scrim: Crisp White in Light Mode, Midnight Black in Dark Mode */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/98 to-white dark:from-black/80 dark:via-zinc-950/90 dark:to-black pointer-events-none" />

        {/* Racing Circuit Grid Lines Graphic Overlay */}
        <div className="absolute inset-0 bg-circuit-grid opacity-15 dark:opacity-35 pointer-events-none" />

        {/* Ambient Redline Glow Accents */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-red-600/5 dark:bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-2/3 -right-20 w-[600px] h-[600px] bg-rose-600/5 dark:bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Real-World Telemetry Ticker Strip */}
      <div className="relative z-40 bg-white/90 dark:bg-zinc-950/90 border-b border-zinc-200 dark:border-zinc-800/80 py-1.5 px-4 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 overflow-hidden hidden md:block transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-red-600 dark:text-red-500 font-bold uppercase tracking-wider">
              <Activity className="w-3 h-3 text-red-500" />
              LIVE TELEMETRY
            </span>
            <span className="text-zinc-300 dark:text-zinc-600">|</span>
            <span className="text-zinc-700 dark:text-zinc-300">MC LAREN XP5: <strong className="text-zinc-950 dark:text-white">240.1 MPH</strong></span>
            <span className="text-zinc-300 dark:text-zinc-600">·</span>
            <span className="text-zinc-700 dark:text-zinc-300">MAZDA 787B: <strong className="text-zinc-950 dark:text-white">9,000 RPM (R26B)</strong></span>
            <span className="text-zinc-300 dark:text-zinc-600">·</span>
            <span className="text-zinc-700 dark:text-zinc-300">KAWASAKI H2R: <strong className="text-zinc-950 dark:text-white">130,000 RPM BLOWER</strong></span>
            <span className="text-zinc-300 dark:text-zinc-600">·</span>
            <span className="text-zinc-700 dark:text-zinc-300">EV ROTOR: <strong className="text-zinc-950 dark:text-white">100,000G CENTRIFUGAL</strong></span>
          </div>

          <div className="flex items-center gap-3 text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>PIT LANE STATUS: ALL 10 ENGINES ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Racing Red Apex Kerb Accent Line */}
      <div className="h-0.5 w-full racing-kerb relative z-40 opacity-70" />

      {/* Navigation */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        savedCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateHome={handleNavigateHome}
        onSelectCategory={handleSelectCategory}
        onSelectVehicleType={handleSelectVehicleType}
        onOpenContact={handleOpenContact}
        activeCategory={activeCategory}
        activeVehicleType={activeVehicleType}
        currentView={currentView}
      />

      {/* Main Body Content with Depth */}
      <div className="flex-1 relative z-10">
        {currentView === 'article' && selectedArticle ? (
          <ArticleView
            article={selectedArticle}
            onBack={handleNavigateHome}
            onSelectArticle={handleSelectArticle}
            allArticles={ARTICLES}
            isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : currentView === 'contact' ? (
          <ContactSection onBackToArchive={handleNavigateHome} />
        ) : (
          <main>
            {/* Cinematic Sporty Hero Section */}
            <section className="border-b border-zinc-200 dark:border-zinc-800/80 pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-xs transition-colors duration-200">
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800/80">
                  <div className="max-w-3xl">
                    <div className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-500 font-bold mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <span>The High-Octane Automotive Monograph</span>
                      <span className="text-zinc-300 dark:text-zinc-600">/</span>
                      <span className="text-zinc-600 dark:text-zinc-400">10 Curated Treatises</span>
                    </div>
                    <h1
                      className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight drop-shadow-xs"
                      style={{ textWrap: 'balance' }}
                    >
                      BRED ON ASPHALT. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 dark:from-red-500 dark:via-rose-500 dark:to-amber-500">ENGINEERED FOR REDLINE.</span>
                    </h1>
                  </div>
                  
                  {/* High Aesthetic Tech Badge */}
                  <div className="text-sm text-zinc-700 dark:text-zinc-300 font-sans max-w-sm leading-relaxed border-l-2 border-red-500 pl-4 bg-white/80 dark:bg-zinc-950/70 p-4 rounded-r-xl border-y border-r border-zinc-200 dark:border-zinc-800/80 backdrop-blur-md shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-mono text-red-600 dark:text-red-400 uppercase font-bold mb-1">
                      <Disc className="w-3.5 h-3.5 animate-spin" />
                      <span>Pure Mechanical Mastery</span>
                    </div>
                    Inside the combustion masterworks, carbon monocoques, and aero dynamics of the world’s most relentless machines.
                  </div>
                </div>

                {/* Lead Story Spotlight (Lead Salience Tier) */}
                {activeCategory === 'All' && activeVehicleType === 'All' && (
                  <div className="mt-10">
                    <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3 flex items-center gap-2 font-bold">
                      <Flame className="w-3.5 h-3.5 text-red-500" />
                      <span>Issue Headline // Featured Machine</span>
                    </div>
                    <div
                      onClick={() => handleSelectArticle(featuredArticle)}
                      className="group cursor-pointer rounded-2xl border border-zinc-200 dark:border-zinc-800/90 bg-white/90 dark:bg-zinc-900/70 backdrop-blur-md overflow-hidden hover:border-red-500/80 transition-all duration-300 shadow-md hover:shadow-2xl dark:hover:shadow-red-950/30 relative"
                    >
                      {/* Top Redline Accent */}
                      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 transition-all duration-500 absolute top-0 left-0 z-20" />

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                        <div className="lg:col-span-7 overflow-hidden bg-zinc-100 dark:bg-black aspect-16/9 lg:aspect-auto relative">
                          <img
                            src={featuredArticle.heroImage}
                            alt={featuredArticle.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        </div>
                        <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
                          <div>
                            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                              <span className="text-red-600 dark:text-red-500 font-bold">{featuredArticle.category}</span>
                              <span className="text-zinc-300 dark:text-zinc-600">/</span>
                              <span className="text-zinc-700 dark:text-zinc-200">{featuredArticle.vehicleType}</span>
                              <span className="text-zinc-300 dark:text-zinc-600">/</span>
                              <span>{featuredArticle.readTimeMinutes} min read</span>
                            </div>
                            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-tight mb-4 tracking-tight">
                              {featuredArticle.title}
                            </h2>
                            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-4">
                              {featuredArticle.excerpt}
                            </p>
                          </div>

                          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono mt-6">
                            <span className="text-zinc-500 dark:text-zinc-400">By {featuredArticle.author.name}</span>
                            <span className="text-red-600 dark:text-red-400 font-bold group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5">
                              <span>Read Full Dispatch</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Filter Controls & Catalog */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
              {/* Interactive Segmented Filter Control */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-mono uppercase tracking-widest font-bold text-zinc-900 dark:text-white">
                    Paddock Category Filter
                  </span>
                </div>

                {/* Filter Tabs with sporty active highlight */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/80 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 rounded-xl backdrop-blur-md shadow-xs">
                  {(['All', 'Supercars', 'Superbikes', 'Motorsport', 'Engineering', 'Heritage'] as (Category | 'All')[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleSelectCategory(cat)}
                      className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-all whitespace-nowrap font-medium cursor-pointer ${
                        activeCategory === cat
                          ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/40'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-filter by Machine Type */}
              <div className="flex items-center gap-4 mb-8 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                <span className="text-zinc-500 uppercase">Machine Class:</span>
                {(['All', 'Car', 'Motorcycle'] as (VehicleType | 'All')[]).map((vt) => (
                  <button
                    key={vt}
                    onClick={() => handleSelectVehicleType(vt)}
                    className={`hover:text-zinc-950 dark:hover:text-white transition-colors font-semibold cursor-pointer ${
                      activeVehicleType === vt
                        ? 'text-red-600 dark:text-red-400 border-b-2 border-red-500 pb-0.5'
                        : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    {vt === 'Car' ? 'Supercars (6)' : vt === 'Motorcycle' ? 'Superbikes (4)' : 'Full Grid (10)'}
                  </button>
                ))}
              </div>

              {/* Articles Grid */}
              {gridArticles.length === 0 ? (
                <div className="py-20 text-center text-zinc-500 font-mono text-sm">
                  No treatises found matching the selected filter combination.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {gridArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onSelect={handleSelectArticle}
                      isBookmarked={bookmarkedIds.includes(article.id)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Newsletter Subscription */}
            <NewsletterSection />
          </main>
        )}
      </div>

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
      />

      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedArticles={bookmarkedArticles}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={handleClearBookmarks}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onSelectVehicleType={handleSelectVehicleType}
        onOpenContact={handleOpenContact}
        onNavigateHome={handleNavigateHome}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    </div>
  );
}
