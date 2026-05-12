"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current || !bgRef.current) return;

    const tl = gsap.timeline();

    // Initial load animation
    tl.fromTo(
      bgRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: "cinematic" }
    ).fromTo(
      textRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "cinematic",
      },
      "-=1.2"
    );

    // Scroll parallax & scale-down effect
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "50% top",
        scrub: true,
      },
    });

    gsap.to(containerRef.current, {
      scale: 0.85,
      opacity: 0,
      borderRadius: "4rem",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "50% top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center origin-bottom z-0">
      {/* Background Image/Video */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1473445730015-841f29a9490b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Cinematic Global Logistics Port"
          fill
          priority
          className={cn(
            "object-cover transition-opacity duration-1000",
            videoLoaded ? "opacity-0" : "opacity-100"
          )}
          sizes="100vw"
        />
        
        {/* Hero Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
            videoLoaded ? "opacity-100" : "opacity-0"
          )}
        >
          <source src="/Truck_into_moving_video_202605122144.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-brand-charcoal/40 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-brand-navy/30 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <div ref={textRef} className="max-w-5xl flex flex-col items-center">
          <h1 className="text-[2.75rem] md:text-[4.25rem] lg:text-[5.5rem] font-bold font-sans tracking-tighter text-white mb-6 leading-[1.1]">
            Your Global Partner in <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-white">
              Sourcing, Supply & Logistics
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 font-secondary max-w-2xl mb-10 leading-relaxed">
            Providing reliable sourcing, procurement, supply chain, and distribution solutions across multiple industries worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </Button>
            <Button 
              variant="glass" 
              size="lg" 
              className="w-full sm:w-auto text-lg px-8 py-6 rounded-full"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Services
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-brand-blue/20 blur-[80px] pointer-events-none" />
    </section>
  );
}
