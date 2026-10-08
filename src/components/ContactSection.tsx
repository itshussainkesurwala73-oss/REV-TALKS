import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, HelpCircle, ChevronDown, ChevronUp, Gauge } from 'lucide-react';

interface ContactSectionProps {
  onBackToArchive?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onBackToArchive }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'editorial',
    subject: '',
    topic: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How does Rev Talks verify technical and homologation specs?',
      a: 'Every dyno curve, boost PSI, gear ratio, and track lap time is validated against factory homologation documents, certified FIA/FIM motorsport registries, and original engineering blueprints.'
    },
    {
      q: 'Can readers submit technical insights or period racing photography?',
      a: 'Absolutely. We actively welcome engineers, mechanics, and track drivers to contribute verified telemetry and archival records. Select "Technical Correction / Dyno Note" in the inquiry form.'
    },
    {
      q: 'Are your articles available for media syndication?',
      a: 'Excerpts and automotive essays may be quoted with attribution to Rev Talks. For print licenses or high-resolution engine schematics, please choose "Media & Syndication".'
    }
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject.';
    if (!formData.message.trim()) {
      errs.message = 'Please provide your message.';
    } else if (formData.message.trim().length < 20) {
      errs.message = 'Please provide at least 20 characters for your message.';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `REV-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const existingInquiries = JSON.parse(localStorage.getItem('revtalks_inquiries') || '[]');
      existingInquiries.push({
        ref: generatedRef,
        date: new Date().toISOString(),
        ...formData
      });
      localStorage.setItem('revtalks_inquiries', JSON.stringify(existingInquiries));

      setIsSubmitting(false);
      setSubmittedRef(generatedRef);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      inquiryType: 'editorial',
      subject: '',
      topic: '',
      message: '',
    });
    setSubmittedRef(null);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* Header */}
      <div className="mb-12 text-center md:text-left border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-500 font-bold mb-2 flex items-center justify-center md:justify-start gap-1.5">
          <Gauge className="w-4 h-4 text-red-500" />
          <span>Pit Lane & Editorial Dispatch</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 dark:text-white tracking-tight mb-4">
          Contact Rev Talks
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
          Got a burning technical question, archival dyno records, or an untold machine story? Drop a line to the editorial garage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          {submittedRef ? (
            <div className="p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xl text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-amber-500" />
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-zinc-950 dark:text-white mb-2">
                Transmission Received
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                Your message has arrived at the Rev Talks desk. A reply will be routed to <strong className="text-zinc-950 dark:text-white">{formData.email}</strong>.
              </p>
              
              <div className="p-3 bg-zinc-100 dark:bg-black/60 border border-zinc-200 dark:border-zinc-800 rounded-lg mb-8 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                Dispatch Ticket: <span className="font-bold text-red-600 dark:text-red-400">{submittedRef}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-md shadow-red-600/30 cursor-pointer"
                >
                  Send Another Note
                </button>
                {onBackToArchive && (
                  <button
                    type="button"
                    onClick={onBackToArchive}
                    className="px-5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Back to Articles
                  </button>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-6 relative shadow-xs">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-rose-500 to-transparent" />
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Carroll Shelby"
                    className={`w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-black/60 border rounded-lg focus:outline-none transition-colors text-zinc-900 dark:text-white ${
                      errors.name
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-zinc-300 dark:border-zinc-800 focus:border-red-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3 inline" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="driver@paddock.com"
                    className={`w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-black/60 border rounded-lg focus:outline-none transition-colors text-zinc-900 dark:text-white ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-zinc-300 dark:border-zinc-800 focus:border-red-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3 inline" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Inquiry Type & Vehicle Topic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="inquiryType" className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">
                    Category
                  </label>
                  <select
                    id="inquiryType"
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-black/60 border border-zinc-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-zinc-900 dark:text-white"
                  >
                    <option value="editorial">Editorial & Reader Feedback</option>
                    <option value="correction">Technical Correction / Dyno Note</option>
                    <option value="submission">Untold Machine Pitch</option>
                    <option value="general">Media & Syndication</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="topic" className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">
                    Vehicle Model <span className="text-zinc-400 dark:text-zinc-500 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="e.g. Ford Mustang 5.0, McLaren F1"
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-black/60 border border-zinc-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">
                  Subject Line <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Summary of your inquiry..."
                  className={`w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-black/60 border rounded-lg focus:outline-none transition-colors text-zinc-900 dark:text-white ${
                    errors.subject
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-zinc-300 dark:border-zinc-800 focus:border-red-500'
                  }`}
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3 h-3 inline" /> {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-bold">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="State your technical observations or message..."
                  className={`w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-black/60 border rounded-lg focus:outline-none transition-colors text-zinc-900 dark:text-white ${
                    errors.message
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-zinc-300 dark:border-zinc-800 focus:border-red-500'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3 h-3 inline" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-md shadow-red-600/30 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar Information & FAQs Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-xs">
            <h3 className="font-display text-lg font-bold text-zinc-950 dark:text-white mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-500" />
              <span>Rev Talks Editorial Desk</span>
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Rev Talks is dedicated to pure automotive engineering, internal combustion triumphs, and cutting-edge motorsport dynamics.
            </p>
            <div className="space-y-2 text-xs font-mono text-zinc-500 dark:text-zinc-500 border-t border-zinc-200 dark:border-zinc-800/80 pt-3">
              <div>Email: editors@revtalks.com</div>
              <div>Response Window: 24 to 48 Hours</div>
              <div>Network: Global Automotive Monograph</div>
            </div>
          </div>

          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-white dark:bg-zinc-900/50 shadow-xs">
            <h3 className="font-display text-lg font-bold text-zinc-950 dark:text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-red-500" />
              <span>Frequently Asked Questions</span>
            </h3>
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border-b border-zinc-100 dark:border-zinc-800/60 pb-3 last:border-none last:pb-0">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left flex items-start justify-between gap-2 py-1 text-xs font-semibold text-zinc-900 dark:text-zinc-200 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-3.5 h-3.5 shrink-0 text-red-500 mt-0.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 shrink-0 text-zinc-400 mt-0.5" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
