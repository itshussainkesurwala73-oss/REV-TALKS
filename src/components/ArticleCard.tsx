import React, { useState } from 'react';
import { Bookmark, Clock, ArrowRight, Gauge } from 'lucide-react';
import { Article } from '../types/article';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  featured = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className={`group flex flex-col justify-between border border-zinc-800/80 hover:border-red-500/60 bg-zinc-900/50 dark:bg-zinc-900/60 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/20 relative ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      {/* Top redline hover indicator bar */}
      <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 transition-all duration-300 absolute top-0 left-0 z-10" />

      <div className="cursor-pointer" onClick={() => onSelect(article)}>
        {/* Card Media Container */}
        <div className={`relative overflow-hidden bg-zinc-950 ${featured ? 'aspect-16/9 sm:aspect-21/9' : 'aspect-16/10'}`}>
          {!imageError ? (
            <img
              src={article.heroImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:contrast-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-900">
              <Gauge className="w-8 h-8 text-red-500 mb-2" />
              <span className="font-display text-lg font-bold text-white">
                {article.title}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 mt-2">
                {article.category} · {article.vehicleType}
              </span>
            </div>
          )}

          {/* Quick Bookmark Float Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(article.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all ${
              isBookmarked
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/40'
                : 'bg-black/50 text-zinc-300 hover:bg-black/80 hover:text-white border border-white/10'
            }`}
            aria-label={isBookmarked ? 'Remove from shelf' : 'Save to shelf'}
            title={isBookmarked ? 'Remove from shelf' : 'Save to shelf'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Card Content Area */}
        <div className="p-6 md:p-7">
          {/* Unboxed clean metadata line with sporty red dot */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-400 mb-3">
            <span className="text-red-500 font-bold">{article.category}</span>
            <span aria-hidden="true" className="text-zinc-600">/</span>
            <span className="text-zinc-300">{article.vehicleType}</span>
            <span aria-hidden="true" className="text-zinc-600">/</span>
            <span>{article.historicalEra}</span>
            <span aria-hidden="true" className="text-zinc-600">/</span>
            <span className="flex items-center gap-1 text-zinc-400">
              <Clock className="w-3 h-3 inline text-red-400" />
              {article.readTimeMinutes} min
            </span>
          </div>

          {/* Headline in bold sporty display font */}
          <h3
            className={`font-display text-white group-hover:text-red-400 transition-colors leading-snug font-bold mb-3 ${
              featured ? 'text-2xl sm:text-3xl lg:text-3xl' : 'text-xl sm:text-2xl'
            }`}
            style={{ textWrap: 'balance' }}
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed mb-4">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer with Byline & Read Action */}
      <div className="px-6 pb-6 pt-0 border-t border-zinc-800/60 mt-auto flex items-center justify-between">
        <div className="text-xs font-mono text-zinc-400">
          <span>{article.author.name}</span>
          <span className="mx-1.5 text-zinc-600" aria-hidden="true">·</span>
          <span>{article.publishedDate}</span>
        </div>

        <button
          onClick={() => onSelect(article)}
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white group-hover:text-red-400 transition-colors font-semibold"
        >
          <span>Read Dispatch</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-red-500" />
        </button>
      </div>
    </article>
  );
};
