export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-6">
          <div className="text-8xl font-display text-emerald-400 mb-4">404</div>
          <h1 className="text-2xl md:text-3xl font-display text-slate-200 mb-2">PASTE NOT FOUND</h1>
          <p className="text-slate-400 font-body mb-8">
            This paste doesn't exist, has expired, or has reached its view limit.
          </p>
        </div>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-display tracking-wider rounded-lg transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
        >
          CREATE NEW PASTE
        </a>
      </div>
    </div>
  );
}
