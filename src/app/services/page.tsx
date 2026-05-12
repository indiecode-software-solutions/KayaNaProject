export default function ServicesPage() {
  return (
    <main className="flex flex-col w-full bg-brand-charcoal min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4">
            Our Capabilities
          </p>
          <h1 className="text-5xl md:text-7xl font-bold font-sans tracking-tight text-white mb-6">
            Comprehensive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">
              Logistics Solutions
            </span>
          </h1>
          <p className="text-xl text-white/70 font-secondary leading-relaxed">
            From raw material sourcing to final-mile delivery, we architect supply chains that scale with your enterprise.
          </p>
        </div>
        
        {/* Placeholder for detailed service grids */}
        <div className="h-[40vh] border border-white/10 rounded-2xl glass-panel-dark flex items-center justify-center">
          <p className="text-white/40 font-secondary">Detailed Services Grid Coming Soon</p>
        </div>
      </div>
    </main>
  );
}
