import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Heart,
  Clock,
  Printer,
  Check,
  Calendar,
  User,
  Gauge,
  Zap,
} from 'lucide-react';
import { Article } from '../types/article';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  allArticles: Article[];
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  allArticles,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [likes, setLikes] = useState<number>(() => {
    const saved = localStorage.getItem(`revtalks_likes_${article.id}`);
    return saved ? parseInt(saved, 10) : 74;
  });
  const [hasLiked, setHasLiked] = useState<boolean>(() => {
    return localStorage.getItem(`revtalks_user_liked_${article.id}`) === 'true';
  });
  const [shareCopied, setShareCopied] = useState(false);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [article.id]);

  // Track scroll reading progress accurately as user scrolls down the article
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const height = (document.documentElement.scrollHeight || document.body.scrollHeight || 0) - (window.innerHeight || document.documentElement.clientHeight || 0);
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        setReadingProgress(Math.min(100, Math.max(0, scrolled)));
      } else {
        setReadingProgress(0);
      }
    };

    // Calculate immediately upon mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [article.id]);

  const handleLike = () => {
    if (hasLiked) {
      const newCount = likes - 1;
      setLikes(newCount);
      setHasLiked(false);
      localStorage.setItem(`revtalks_likes_${article.id}`, newCount.toString());
      localStorage.removeItem(`revtalks_user_liked_${article.id}`);
    } else {
      const newCount = likes + 1;
      setLikes(newCount);
      setHasLiked(true);
      localStorage.setItem(`revtalks_likes_${article.id}`, newCount.toString());
      localStorage.setItem(`revtalks_user_liked_${article.id}`, 'true');
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // 2-3 Related articles
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .filter((a) => a.category === article.category || a.vehicleType === article.vehicleType)
    .slice(0, 3);

  return (
    <div className="relative min-h-screen pb-24 text-zinc-100">
      {/* Thin, Red Reading Progress Bar Spanning the Top of the Screen */}
      <div
        className="fixed top-0 left-0 right-0 w-full h-[3px] sm:h-1 bg-zinc-950/40 z-[100] pointer-events-none"
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Article reading position"
      >
        <div
          className="h-full bg-red-600 dark:bg-red-500 transition-all duration-150 ease-out relative shadow-[0_0_12px_#ef4444,0_0_5px_#dc2626]"
          style={{ width: `${readingProgress}%` }}
        >
          {/* Glowing Red Head on the leading edge */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_12px_#ef4444]" />
        </div>
      </div>

      {/* Floating Action Strip / Sticky Reader Sub-bar */}
      <div className="sticky top-16 md:top-18 z-30 bg-zinc-950/95 dark:bg-black/95 backdrop-blur-xl border-b border-zinc-800/80 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 text-red-500 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dispatches</span>
            </button>
            {readingProgress > 0 && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-red-400 font-semibold border-l border-zinc-800 pl-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>{Math.round(readingProgress)}% READ</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                hasLiked
                  ? 'bg-rose-950/70 text-rose-400 border-rose-800 shadow-sm shadow-rose-900/40'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
              title="Like this dispatch"
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current text-rose-500' : ''}`} />
              <span className="tabular-nums font-bold">{likes}</span>
            </button>

            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                isBookmarked
                  ? 'bg-red-950/70 text-red-300 border-red-800 shadow-sm shadow-red-900/40'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
              title={isBookmarked ? 'Saved to reading list' : 'Save for later'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current text-red-500' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 text-zinc-300 border border-zinc-800 hover:text-white hover:border-zinc-700 transition-colors"
              title="Copy article link"
            >
              {shareCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 text-zinc-300 border border-zinc-800 hover:text-white hover:border-zinc-700 transition-colors"
              title="Print article"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        
        {/* Unboxed Metadata Kicker with Redline Slash */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
          <span className="text-red-500 font-bold">{article.category}</span>
          <span aria-hidden="true" className="text-zinc-600">/</span>
          <span className="text-zinc-200">{article.vehicleType}</span>
          <span aria-hidden="true" className="text-zinc-600">/</span>
          <span>Era: {article.historicalEra}</span>
          <span aria-hidden="true" className="text-zinc-600">/</span>
          <span className="flex items-center gap-1 text-zinc-400">
            <Clock className="w-3 h-3 inline text-red-400" />
            {article.readTimeMinutes} min read
          </span>
        </div>

        {/* Title & Subtitle */}
        <h1
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5 tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          {article.title}
        </h1>

        <p className="text-lg sm:text-xl text-zinc-300 font-sans leading-relaxed mb-8">
          {article.subtitle}
        </p>

        {/* Byline and Published Date */}
        <div className="flex flex-wrap items-center justify-between py-4 border-y border-zinc-800/80 text-xs font-mono text-zinc-400 mb-10 gap-3">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-red-500" />
            <span className="text-white font-semibold">{article.author.name}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{article.author.role}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span>Dispatched {article.publishedDate}</span>
          </div>
        </div>

        {/* Hero Figure */}
        <figure className="mb-12">
          <div className="overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800 shadow-2xl relative group">
            <img
              src={article.heroImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto aspect-16/9 object-cover contrast-105"
            />
            {/* Subtle red bottom shadow line */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-600 to-amber-500" />
          </div>
          <figcaption className="mt-3 text-xs font-mono text-zinc-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span className="text-zinc-300">01 // {article.imageCaption}</span>
            <span className="text-[11px] text-zinc-500">
              Credit: {article.photographerCredit}
            </span>
          </figcaption>
        </figure>

        {/* Telemetry Dashboard Specifications Box */}
        <div className="mb-14 p-6 sm:p-7 rounded-xl bg-zinc-900/70 border border-zinc-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-rose-500 to-transparent" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-red-500" />
              <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-white">
                Dyno & Chassis Telemetry
              </h2>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              Verified Homologation Data
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {article.keySpecs.map((spec, i) => (
              <div
                key={i}
                className="p-3.5 bg-black/60 rounded-lg border border-zinc-800/80 hover:border-red-500/40 transition-colors"
              >
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                  {spec.label}
                </div>
                <div className="font-mono text-sm font-bold text-white tabular-nums">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Article Body Content */}
        <div className="prose prose-invert max-w-none">
          {article.sections.map((section, sIdx) => (
            <section key={sIdx} className="mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-5 border-b border-zinc-800/80 pb-3 flex items-center gap-3">
                <span className="w-1.5 h-6 rounded-full bg-red-600 shrink-0" />
                <span>{section.heading}</span>
              </h2>

              <div className="space-y-5 text-zinc-300 font-sans text-base sm:text-lg leading-relaxed">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Sporty Quote Highlight */}
              {section.quote && (
                <blockquote className="my-8 py-5 px-6 border-l-2 border-red-500 bg-zinc-900/60 rounded-r-lg">
                  <p className="font-display italic text-lg sm:text-xl text-white font-medium leading-snug">
                    "{section.quote}"
                  </p>
                </blockquote>
              )}

              {/* Technical Telemetry Callout */}
              {section.callout && (
                <aside className="my-8 p-5 sm:p-6 rounded-xl bg-red-950/20 border border-red-500/30 text-zinc-200">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{section.callout.title}</span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                    {section.callout.text}
                  </p>
                </aside>
              )}
            </section>
          ))}
        </div>

        {/* Tags Footnote */}
        <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400 mb-12">
          <span className="uppercase tracking-wider text-zinc-500">Telemetry Tags:</span>
          {article.tags.map((tag, tIdx) => (
            <React.Fragment key={tIdx}>
              <span className="text-zinc-300">{tag}</span>
              {tIdx < article.tags.length - 1 && <span aria-hidden="true" className="text-zinc-600">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/60 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center font-display text-lg font-black text-white shadow-lg shadow-red-600/30 shrink-0">
            {article.author.name.charAt(0)}
          </div>
          <div>
            <div className="font-display text-base font-bold text-white">
              {article.author.name}
            </div>
            <div className="text-xs font-mono text-red-400 mb-1">
              {article.author.role} · Rev Talks Technical Team
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Specializing in mechanical history, powertrain engineering, track homologations, and chassis dynamics.
            </p>
          </div>
        </div>

        {/* Related Treatises */}
        {relatedArticles.length > 0 && (
          <section className="pt-8 border-t border-zinc-800">
            <h3 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Gauge className="w-5 h-5 text-red-500" />
              <span>More High-Octane Reads</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel)}
                  className="group cursor-pointer p-4 rounded-xl border border-zinc-800 hover:border-red-500/60 bg-zinc-900/50 transition-all hover:shadow-lg"
                >
                  <div className="aspect-16/10 overflow-hidden rounded-lg mb-3 bg-zinc-950">
                    <img
                      src={rel.heroImage}
                      alt={rel.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-[11px] font-mono uppercase text-red-400 font-bold mb-1">
                    {rel.category} · {rel.vehicleType}
                  </div>
                  <h4 className="font-display text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
