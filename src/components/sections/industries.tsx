"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Factory, Stethoscope, Wheat, Zap, Truck, Package } from "lucide-react";

const industries = [
  {
    id: "manufacturing",
    title: "Heavy Manufacturing",
    description: "Securing raw materials and industrial components for massive-scale production lines across borders.",
    icon: Factory,
    image: "/hero-bg.png",
    colSpan: "md:col-span-8",
    rowSpan: "md:row-span-2",
  },
  {
    id: "pharma",
    title: "Pharmaceuticals",
    description: "Cold-chain logistics and strict compliance procurement for medical supplies.",
    icon: Stethoscope,
    image: "https://images.pexels.com/photos/6170140/pexels-photo-6170140.jpeg",
    colSpan: "md:col-span-4",
    rowSpan: "md:row-span-1",
  },
  {
    id: "agriculture",
    title: "Agriculture",
    description: "High-volume commodity sourcing and distribution networks.",
    icon: Wheat,
    image: "https://impact-logistics.in/assets/img/industry/Agriculture-supply-chain-main.jpeg",
    colSpan: "md:col-span-4",
    rowSpan: "md:row-span-1",
  },
  {
    id: "energy",
    title: "Power & Energy",
    description: "Procurement of critical infrastructure parts for renewable and traditional energy grids.",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1695222833131-54ee679ae8e5?q=80&w=2041&auto=format&fit=crop",
    colSpan: "md:col-span-4",
    rowSpan: "md:row-span-1",
  },
  {
    id: "transport",
    title: "Transportation",
    description: "Fleet parts and transit network supply chain solutions.",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1619302820124-e3b9d8a7f686?q=80&w=2942&auto=format&fit=crop",
    colSpan: "md:col-span-4",
    rowSpan: "md:row-span-1",
  },
  {
    id: "retail",
    title: "FMCG & Retail",
    description: "Fast-moving consumer goods distribution and packaging sourcing.",
    icon: Package,
    image: "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg",
    colSpan: "md:col-span-4",
    rowSpan: "md:row-span-1",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  },
};

export function Industries() {
  return (
    <section className="relative w-full py-32 bg-brand-charcoal overflow-hidden z-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-4"
            >
              The Operational Grid
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-white"
            >
              Industries We Power
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors border-b border-brand-gold/30 pb-1 hover:border-brand-gold font-medium w-fit"
          >
            Explore all sectors <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]"
        >
          {industries.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`relative group rounded-2xl overflow-hidden border-white/10 ${item.colSpan} ${item.rowSpan}`}
              >
                {/* Background Image (scaled on hover) */}
                <motion.div className="absolute inset-0 w-full h-full -z-10 transition-transform duration-700 ease-[0.76,0,0.24,1] group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-100 transition-opacity duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Subtle gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                </motion.div>

                {/* Animated Glowing Border on Hover */}
                <div className="absolute inset-0 border border-brand-blue/0 group-hover:border-brand-blue/40 rounded-2xl transition-colors duration-500 box-border pointer-events-none" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[inset_0_0_20px_rgba(148,163,184,0.15)] rounded-2xl transition-opacity duration-500 pointer-events-none" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8">
                  <div className="mb-auto">
                    <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 text-white mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-glow transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      {item.title}
                    </h3>
                    <p className="text-white/70 font-secondary text-sm md:text-base leading-relaxed opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
