"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Shield, FileText, Ship, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const processSteps = [
  { 
    id: 1, 
    title: "Client Consultation", 
    description: "Deep analysis of operational requirements and strategic goals.", 
    icon: Search,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: 2, 
    title: "Strategic Sourcing", 
    description: "Identifying and vetting global suppliers to match strict quality and volume standards.", 
    icon: Globe,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: 3, 
    title: "Supplier Verification", 
    description: "Rigorous vetting of international partners to ensure compliance, quality, and ethical standards.", 
    icon: Shield,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: 4, 
    title: "Procurement & Negotiation", 
    description: "Securing contracts and establishing long-term enterprise pricing structures.", 
    icon: FileText,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: 5, 
    title: "Logistics & Distribution", 
    description: "Coordinating multi-modal freight, warehousing, and customs clearance.", 
    icon: Ship,
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: 6, 
    title: "Delivery & Ongoing Support", 
    description: "Final mile execution and continuous supply chain optimization.", 
    icon: CheckCircle2,
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2070&auto=format&fit=crop"
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] bg-[#050505] overflow-hidden z-10 border-t border-white/5 flex flex-col">
      {/* Background Image Stage */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence>
          <motion.div
            key={activeStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={processSteps[activeStep].image}
              alt={processSteps[activeStep].title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-1 flex flex-col pt-32 pb-12">
        
        {/* Section Header */}
        <div className="flex flex-col mb-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-12 h-[1px] bg-brand-gold" />
            <span className="text-brand-gold font-mono text-xs tracking-[0.4em] uppercase">The Lifecycle</span>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-white leading-[1.1]">
                Flawless <br />
                <span className="text-white/20">Execution.</span>
              </h2>
            </div>
            
            <div className="lg:col-span-7 flex flex-col pt-4 md:pt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-3xl md:text-5xl font-bold text-brand-gold mb-6 leading-tight">
                    {processSteps[activeStep].title}
                  </h3>
                  <p className="text-white/70 text-lg md:text-xl font-secondary leading-relaxed max-w-2xl">
                    {processSteps[activeStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Step Control Bar */}
        <div className="grid grid-cols-5 gap-2 md:gap-4 mt-20">
          {processSteps.map((step, index) => {
            const isActive = activeStep === index;
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                onMouseEnter={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
                className="group relative flex flex-col gap-4 text-left"
              >
                {/* Progress Bar Item */}
                <div className="relative h-1 w-full bg-white/10 overflow-hidden rounded-full">
                  <motion.div
                    initial={false}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    className="absolute inset-0 bg-brand-gold"
                  />
                  {/* Hover visual */}
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                </div>
                
                <div className={`flex items-center gap-3 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>
                  <Icon className="w-5 h-5 hidden md:block" />
                  <span className="font-mono text-sm tracking-widest uppercase">
                    {`0${step.id}`}
                  </span>
                </div>
                
                <span className={`hidden md:block text-xs font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/0 group-hover:text-white/40'}`}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Decorative Stage Lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
