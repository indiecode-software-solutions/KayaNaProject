"use client";

import { motion } from "framer-motion";

const markets = [
  { id: "b2b", name: "B2B", description: "Sourcing, procurement, logistics, and industrial supply solutions for expanding businesses." },
  { id: "b2g", name: "B2G", description: "Operational supply and logistics coordination for government institutions." },
  { id: "ngo", name: "NGO", description: "Humanitarian logistics and supply-chain support for international organizations." },
];

export function WhoWeServe() {
  return (
    <section className="relative w-full min-h-[90vh] bg-brand-charcoal pt-40 pb-32 z-10 -mt-24 overflow-hidden">
      {/* Background structural elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />
      
      {/* Large Decorative "M" in background */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-[40rem] font-bold text-white/[0.02] select-none pointer-events-none leading-none tracking-tighter">
        M
      </div>

      {/* Floating Ambient Glows */}
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left Column: Heavy Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
              <p className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-8 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-brand-gold/50" />
                Who We Serve
              </p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-sans tracking-tight text-white leading-[1.05] mb-8">
                A trusted partner <br />
                <span className="text-white/40">for your global projects.</span>
              </h2>
              <p className="text-white/50 text-xl font-secondary max-w-xl leading-relaxed">
                Manacles Solutions partners with businesses, governments, and organizations to deliver procurement and logistics solutions tailored to operational needs.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Markets */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-center">
            <div className="relative space-y-12">
              {/* Vertical line connector */}
              <div className="absolute left-0 top-4 bottom-4 w-[1px] bg-gradient-to-b from-brand-gold/0 via-brand-gold/20 to-brand-gold/0" />

              {markets.map((market, index) => (
                <motion.div
                  key={market.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.76, 0, 0.24, 1] }}
                  className="group relative pl-12"
                >
                  {/* Indicator Dot */}
                  <div className="absolute left-[-4px] top-4 w-2 h-2 rounded-full bg-brand-gold scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                  
                  <div className="flex flex-col">
                    <span className="text-brand-gold font-mono text-sm tracking-widest mb-2 opacity-40 group-hover:opacity-100 transition-opacity">
                      {`0${index + 1}`}
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors duration-300">
                      {market.name}
                    </h3>
                    <p className="text-white/50 font-secondary text-lg leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                      {market.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
