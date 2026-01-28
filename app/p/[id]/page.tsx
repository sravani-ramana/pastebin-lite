import { notFound } from 'next/navigation';
import { getPaste } from '@/lib/db';

export default async function PastePage({ params }: { params: { id: string } }) {
  const paste = await getPaste(params.id, true);

  if (!paste) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <a href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-display text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Create New Paste
          </a>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10">
          <div className="border-b border-emerald-500/20 bg-slate-900/80 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-emerald-400 font-display text-lg tracking-wider">PASTE / {params.id}</h1>
              <div className="flex gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(paste.content)}
                  className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg transition-all font-display text-sm"
                  title="Copy to clipboard"
                >
                  COPY
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([paste.content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `paste-${params.id}.txt`;
                    a.click();
                  }}
                  className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg transition-all font-display text-sm"
                  title="Download"
                >
                  DOWNLOAD
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <pre className="text-slate-200 font-body text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
              {paste.content}
            </pre>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm font-body">
            Paste created • Views: {paste.viewCount}{paste.maxViews ? ` / ${paste.maxViews}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
