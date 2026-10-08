import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Clock, Gauge } from 'lucide-react';
import { Article } from '../types/article';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const filteredArticles = cleanQuery
    ? articles.filter((a) => {
        return (
          a.title.toLowerCase().includes(cleanQuery) ||
          a.subtitle.toLowerCase().includes(cleanQuery) ||
          a.excerpt.toLowerCase().includes(cleanQuery) ||
          a.category.toLowerCase().includes(cleanQuery) ||
          a.vehicleType.toLowerCase().includes(cleanQuery) ||
          a.tags.some((t) => t.toLowerCase().includes(cleanQuery)) ||
          a.keySpecs.some((s) => s.value.toLowerCase().includes(cleanQuery) || s.label.toLowerCase().includes(cleanQuery))
        );
      })
    : articles;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] relative transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-amber-500" />
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <Search className="w-5 h-5 text-red-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by supercar, engine code, decade, or keywords (e.g. V12, rotary, Le Mans, Desmodromic)..."
            className="w-full bg-transparent text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-white mr-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 divide-y divide-zinc-100 dark:divide-zinc-800/60">
          {filteredArticles.length === 0 ? (
            <div className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400 font-mono">
              No matching machines found for "{query}". Try <span className="text-red-600 dark:text-red-400">McLaren</span>, <span className="text-red-600 dark:text-red-400">Rotary</span>, or <span className="text-red-600 dark:text-red-400">Porsche</span>.
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="py-3 px-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase text-zinc-500 dark:text-zinc-400 mb-1">
                  <span className="text-red-600 dark:text-red-500 font-bold">{article.category}</span>
                  <span>/</span>
                  <span className="text-zinc-700 dark:text-zinc-200">{article.vehicleType}</span>
                  <span>/</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 inline text-red-500" />
                    {article.readTimeMinutes} min
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-display text-base font-bold text-zinc-950 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {article.title}
                  </h4>
                  <ArrowRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-1 mt-1">
                  {article.excerpt}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-500 flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-red-500" />
            <span>{filteredArticles.length} of {articles.length} dispatches</span>
          </div>
          <span>Rev Talks Index</span>
        </div>
      </div>
    </div>
  );
};
