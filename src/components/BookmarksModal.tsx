import React from 'react';
import { Bookmark, X, Trash2, ArrowRight, Clock } from 'lucide-react';
import { Article } from '../types/article';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] relative transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-amber-500" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-red-500 fill-current" />
            <h3 className="font-display text-lg font-bold text-zinc-950 dark:text-white">
              Rev Shelf ({bookmarkedArticles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-3 flex-1">
          {bookmarkedArticles.length === 0 ? (
            <div className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
              <Bookmark className="w-8 h-8 mx-auto mb-3 opacity-30 text-zinc-400 dark:text-zinc-500" />
              <p className="font-display text-base font-bold text-zinc-900 dark:text-white mb-1">
                Your reading shelf is empty.
              </p>
              <p className="text-xs text-zinc-500">
                Click the bookmark icon on any dispatch to save it to your local pit lane.
              </p>
            </div>
          ) : (
            bookmarkedArticles.map((article) => (
              <div
                key={article.id}
                className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black/50 flex items-start justify-between gap-3 group hover:border-red-500/50 transition-colors"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-zinc-500 mb-1">
                    <span className="text-red-600 dark:text-red-500 font-bold">{article.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 inline text-red-500" />
                      {article.readTimeMinutes} min
                    </span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-zinc-950 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-1">
                    {article.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="p-1.5 text-zinc-400 hover:text-red-500 cursor-pointer"
                    title="Read now"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(article.id)}
                    className="p-1.5 text-zinc-400 hover:text-rose-500 cursor-pointer"
                    title="Remove from reading list"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookmarkedArticles.length > 0 && (
          <div className="px-6 py-3 bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs font-mono">
            <button
              onClick={onClearAll}
              className="text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
            >
              Clear Shelf
            </button>
            <span className="text-zinc-500">Rev Talks Shelf</span>
          </div>
        )}
      </div>
    </div>
  );
};
