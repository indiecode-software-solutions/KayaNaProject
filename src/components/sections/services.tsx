"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const servicesList = [
  {
    id: "sourcing",
    title: "Global Sourcing",
    description: "Identifying and securing high-quality suppliers worldwide, ensuring cost efficiency without compromising on standards.",
    image: "/bento-bg.png",
  },
  {
    id: "procurement",
    title: "Procurement & Supplying",
    description: "End-to-end purchasing operations, managing contracts, negotiations, and inventory acquisition for enterprise scale.",
    image: "/hero-bg.png",
  },
  {
    id: "logistics",
    title: "3PL Logistics",
    description: "Comprehensive third-party logistics covering warehousing, distribution, and fulfillment services across all major trade routes.",
    image: "/bento-bg.png",
  },
  {
    id: "brokerage",
    title: "In-House Brokerage",
    description: "Navigating complex international customs and regulations to ensure frictionless cross-border transit of goods.",
    image: "/hero-bg.png",
  },
];

export function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    if (!containerRef.current || !leftColRef.current || !rightColRef.current) return;

    // Pin the left column while the right column scrolls
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftColRef.current,
      pinSpacing: false,
    });

    // Animate active index based on right column scroll position
    const rightSections = gsap.utils.toArray<HTMLElement>(".service-detail-section");
    
    rightSections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveIndex(index);
          }
        },
      });
    });

    // Refresh ScrollTrigger to ensure calculations are correct
    ScrollTrigger.refresh();

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-brand-charcoal z-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row relative">
        
        {/* Left Column (Sticky) */}
        <div 
          ref={leftColRef} 
          className="lg:w-5/12 h-[100vh] flex flex-col justify-center pt-24 lg:pt-0 pb-12 lg:pb-0 z-20 bg-brand-charcoal lg:bg-transparent"
        >
          <div className="max-w-md">
            <p className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4">
              Core Capabilities
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-tight text-white mb-12">
              The Dynamic Hub
            </h2>

            <ul className="flex flex-col gap-6">
              {servicesList.map((service, index) => (
                <li 
                  key={service.id}
                  className={cn(
                    "text-2xl md:text-3xl font-bold transition-all duration-500 cursor-pointer flex items-center gap-4",
                    activeIndex === index 
                      ? "text-white opacity-100 translate-x-2" 
                      : "text-white opacity-20 hover:opacity-50"
                  )}
                  onClick={() => {
                    // Smooth scroll to the corresponding section
                    const section = document.getElementById(`service-detail-${index}`);
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                  }}
                >
                  <ArrowRight className={cn(
                    "w-6 h-6 transition-all duration-500",
                    activeIndex === index ? "opacity-100 text-brand-gold" : "opacity-0 -ml-10"
                  )} />
                  {service.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column (Scrolling content) */}
        <div ref={rightColRef} className="lg:w-7/12 flex flex-col w-full relative z-10">
          <div className="hidden lg:block h-[30vh]" /> {/* Top padding for first item to center initially */}
          
          {servicesList.map((service, index) => (
            <div 
              key={`detail-${service.id}`} 
              id={`service-detail-${index}`}
              className="service-detail-section min-h-[70vh] flex items-center py-12 lg:py-24"
            >
              <div className="w-full relative group">
                <div className="aspect-[4/3] w-full relative rounded-2xl overflow-hidden glass-panel-dark border-white/10 mb-8">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-charcoal/30 mix-blend-multiply" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 lg:hidden">{service.title}</h3>
                <p className="text-xl text-white/70 font-secondary leading-relaxed max-w-2xl">
                  {service.description}
                </p>
                <button className="mt-8 flex items-center gap-2 text-brand-gold font-semibold hover:text-white transition-colors border-b border-brand-gold/30 hover:border-white pb-1">
                  Learn more about {service.title} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="hidden lg:block h-[30vh]" /> {/* Bottom padding */}
        </div>
      </div>
    </section>
  );
}
