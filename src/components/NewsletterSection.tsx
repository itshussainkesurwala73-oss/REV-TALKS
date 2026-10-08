import React, { useState } from 'react';
import { Mail, Check, AlertCircle, Gauge, Zap } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid driver email address.');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      const subscribers = JSON.parse(localStorage.getItem('revtalks_newsletter') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('revtalks_newsletter', JSON.stringify(subscribers));
      }
      setStatus('success');
    }, 500);
  };

  return (
    <section className="border-y border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-zinc-100 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-black py-16 px-4 sm:px-6 relative overflow-hidden transition-colors duration-200">
      {/* Background ambient red glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-red-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-500 font-bold mb-2 flex items-center justify-center gap-1.5">
          <Gauge className="w-4 h-4 text-red-500" />
          <span>The Redline Dispatch</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 dark:text-white tracking-tight mb-3">
          REV TALKS <span className="text-red-600 dark:text-red-500 font-extrabold">INBOX</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
          Bi-weekly deep dives into high-revving engines, track-day physics, and legendary machines. No clickbait, 100% octane.
        </p>

        {status === 'success' ? (
          <div className="inline-flex items-center gap-2 p-3.5 px-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-mono animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>You're strapped in. First dispatch will land at {email}.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="driver@paddock.com"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-white dark:bg-black/70 border border-zinc-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-red-500 text-zinc-900 dark:text-white transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-md shadow-red-600/30 disabled:opacity-50 shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>{status === 'submitting' ? 'Ignition...' : 'Subscribe'}</span>
              </button>
            </div>
            {status === 'error' && (
              <p className="text-xs text-red-500 flex items-center justify-center gap-1 mt-1 font-mono">
                <AlertCircle className="w-3 h-3 inline" /> {errorMessage}
              </p>
            )}
            <p className="text-[11px] font-mono text-zinc-500 pt-2">
              Zero telemetry tracking. Unsubscribe at any time with one click.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
