export default function NetworkPage() {
  return (
    <main className="flex flex-col w-full bg-brand-charcoal min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4">
            Global Coverage
          </p>
          <h1 className="text-5xl md:text-7xl font-bold font-sans tracking-tight text-white mb-6">
            Connecting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">
              Continents
            </span>
          </h1>
          <p className="text-xl text-white/70 font-secondary leading-relaxed">
            Our established networks across Asia, Europe, Africa, and the Americas guarantee resilient, uninterrupted supply chains.
          </p>
        </div>
        
        {/* Placeholder for interactive map or region list */}
        <div className="h-[40vh] border border-white/10 rounded-2xl glass-panel-dark flex items-center justify-center">
          <p className="text-white/40 font-secondary">Interactive Regional Map Coming Soon</p>
        </div>
      </div>
    </main>
  );
}
