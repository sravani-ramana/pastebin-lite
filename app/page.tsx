'use client';

import { useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [ttlSeconds, setTtlSeconds] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [pasteUrl, setPasteUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPasteUrl('');
    setIsLoading(true);

    try {
      const body: any = { content };
      
      if (ttlSeconds) {
        body.ttl_seconds = parseInt(ttlSeconds);
      }
      
      if (maxViews) {
        body.max_views = parseInt(maxViews);
      }

      const response = await fetch('/api/pastes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create paste');
        setIsLoading(false);
        return;
      }

      setPasteUrl(data.url);
      setContent('');
      setTtlSeconds('');
      setMaxViews('');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pasteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-6 py-3 backdrop-blur-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 font-display text-sm tracking-widest">ONLINE</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 mb-4 tracking-tight">
            PASTEBIN
          </h1>
          <p className="text-slate-400 font-body text-lg md:text-xl max-w-2xl mx-auto">
            Share code snippets, text, and notes instantly. Secure, ephemeral, and blazingly fast.
          </p>
        </div>

        {/* Success Message */}
        {pasteUrl && (
          <div className="mb-8 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 rounded-2xl p-6 backdrop-blur-sm animate-fadeIn">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-emerald-400 font-display text-lg mb-2">PASTE CREATED SUCCESSFULLY</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={pasteUrl}
                    readOnly
                    className="flex-1 bg-slate-900/50 border border-emerald-500/30 rounded-lg px-4 py-3 text-slate-200 font-body text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-display rounded-lg transition-all shadow-lg shadow-emerald-500/30"
                  >
                    {copied ? 'COPIED!' : 'COPY'}
                  </button>
                  <a
                    href={pasteUrl}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-display rounded-lg transition-all text-center"
                  >
                    VIEW
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-500/10 border border-red-500/40 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-400 font-body">{error}</p>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10">
          <div className="border-b border-emerald-500/20 bg-slate-900/80 px-6 py-4">
            <h2 className="text-emerald-400 font-display text-lg tracking-wider">CREATE PASTE</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {/* Content Textarea */}
            <div>
              <label className="block text-slate-300 font-display text-sm tracking-wider mb-3">
                CONTENT *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your code, text, or notes here..."
                className="w-full h-64 bg-slate-950/50 border border-emerald-500/30 rounded-xl px-4 py-3 text-slate-200 font-body placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                required
              />
            </div>

            {/* Options Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* TTL */}
              <div>
                <label className="block text-slate-300 font-display text-sm tracking-wider mb-3">
                  EXPIRY TIME (seconds)
                </label>
                <input
                  type="number"
                  value={ttlSeconds}
                  onChange={(e) => setTtlSeconds(e.target.value)}
                  placeholder="Optional (e.g., 3600 for 1 hour)"
                  min="1"
                  className="w-full bg-slate-950/50 border border-emerald-500/30 rounded-xl px-4 py-3 text-slate-200 font-body placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                <p className="text-slate-500 text-xs font-body mt-2">
                  Leave empty for no time limit
                </p>
              </div>

              {/* Max Views */}
              <div>
                <label className="block text-slate-300 font-display text-sm tracking-wider mb-3">
                  MAX VIEWS
                </label>
                <input
                  type="number"
                  value={maxViews}
                  onChange={(e) => setMaxViews(e.target.value)}
                  placeholder="Optional (e.g., 5)"
                  min="1"
                  className="w-full bg-slate-950/50 border border-emerald-500/30 rounded-xl px-4 py-3 text-slate-200 font-body placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                <p className="text-slate-500 text-xs font-body mt-2">
                  Leave empty for unlimited views
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !content.trim()}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-slate-700 disabled:to-slate-700 text-slate-950 font-display text-lg tracking-wider py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 disabled:shadow-none disabled:cursor-not-allowed"
            >
              {isLoading ? 'CREATING...' : 'CREATE PASTE'}
            </button>
          </form>
        </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900/30 backdrop-blur-sm border border-emerald-500/10 rounded-xl p-6 hover:border-emerald-500/30 transition-all">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-emerald-400 font-display text-lg mb-2">INSTANT SHARING</h3>
            <p className="text-slate-400 font-body text-sm">
              Get a shareable link immediately. No sign-up required.
            </p>
          </div>

          <div className="bg-slate-900/30 backdrop-blur-sm border border-emerald-500/10 rounded-xl p-6 hover:border-emerald-500/30 transition-all">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-emerald-400 font-display text-lg mb-2">EPHEMERAL</h3>
            <p className="text-slate-400 font-body text-sm">
              Set expiry times or view limits for automatic deletion.
            </p>
          </div>

          <div className="bg-slate-900/30 backdrop-blur-sm border border-emerald-500/10 rounded-xl p-6 hover:border-emerald-500/30 transition-all">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-emerald-400 font-display text-lg mb-2">SIMPLE & SECURE</h3>
            <p className="text-slate-400 font-body text-sm">
              Clean interface with XSS protection and safe rendering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
