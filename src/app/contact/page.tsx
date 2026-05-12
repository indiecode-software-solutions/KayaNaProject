export default function ContactPage() {
  return (
    <main className="flex flex-col w-full bg-brand-charcoal min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4">
            Initiate Contact
          </p>
          <h1 className="text-5xl md:text-7xl font-bold font-sans tracking-tight text-white mb-6">
            Let's build your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">
              Supply Chain
            </span>
          </h1>
          <p className="text-xl text-white/70 font-secondary leading-relaxed">
            Reach out to our logistics architects to discuss your enterprise procurement and distribution needs.
          </p>
        </div>
        
        {/* Placeholder for Contact Form and Office Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-[60vh] border border-white/10 rounded-2xl glass-panel-dark flex items-center justify-center">
            <p className="text-white/40 font-secondary">Secure Contact Form Coming Soon</p>
          </div>
          <div className="h-[60vh] border border-white/10 rounded-2xl glass-panel-dark flex items-center justify-center">
            <p className="text-white/40 font-secondary">Global Office Locations Coming Soon</p>
          </div>
        </div>
      </div>
    </main>
  );
}
