"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLenis } from "lenis/react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "unset";
      lenis?.start();
    };
  }, [isOpen, lenis]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-brand-charcoal/95 backdrop-blur-3xl px-6 overflow-y-auto"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-[210]"
          >
            <X className="w-10 h-10" />
          </button>

          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Info */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <span className="text-brand-gold font-mono text-sm tracking-[0.4em] uppercase mb-6 block">Inquiry Terminal</span>
              <h2 className="text-6xl font-bold text-white mb-8 tracking-tighter leading-[1.1]">
                Let's Build <br />
                <span className="text-white/20">Something Global.</span>
              </h2>
              <p className="text-xl text-white/60 font-secondary max-w-md leading-relaxed">
                Connect with our trade experts to optimize your sourcing, procurement, and supply chain strategy across international borders.
              </p>
              
              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center group-hover:border-brand-gold/50 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                  </div>
                  <p className="text-white/80 font-secondary">Global Logistics Advisory</p>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center group-hover:border-brand-gold/50 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                  </div>
                  <p className="text-white/80 font-secondary">Supply Chain Optimization</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="glass-panel-dark px-8 py-8 md:px-12 md:py-10 rounded-none border-white/10 relative overflow-hidden shadow-2xl"
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-2">Full Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Your Name"
                          className="w-full bg-white/5 border border-white/10 rounded-none px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-gold/50 focus:bg-white/[0.08] transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-2">Email Address</label>
                        <input 
                          required
                          type="email" 
                          placeholder="email@company.com"
                          className="w-full bg-white/5 border border-white/10 rounded-none px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-gold/50 focus:bg-white/[0.08] transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-2">Company</label>
                      <input 
                        type="text" 
                        placeholder="Company Name"
                        className="w-full bg-white/5 border border-white/10 rounded-none px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-gold/50 focus:bg-white/[0.08] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-2">Message</label>
                      <textarea 
                        required
                        rows={4}
                        placeholder="How can we help you?"
                        className="w-full bg-white/5 border border-white/10 rounded-none px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-gold/50 focus:bg-white/[0.08] transition-all resize-none"
                      />
                    </div>
                    <Button size="lg" className="mt-4 py-6 text-lg rounded-none group relative overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        Send Message
                        <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-24 h-24 rounded-none bg-brand-gold/10 flex items-center justify-center mb-8">
                      <CheckCircle2 className="w-12 h-12 text-brand-gold" />
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-4 tracking-tight">Transmission Successful</h3>
                    <p className="text-xl text-white/60 font-secondary max-w-xs">
                      Your inquiry has been logged. Our specialists will reach out shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
