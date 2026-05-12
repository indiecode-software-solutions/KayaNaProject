"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/", id: "00" },
  { name: "Services", href: "/services", id: "01" },
  { name: "Industries", href: "/industries", id: "02" },
  { name: "Network", href: "/network", id: "03" },
  { name: "Company", href: "/company", id: "04" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const lastYRef = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;
    if (y > 50) setIsScrolled(true);
    else setIsScrolled(false);

    if (y > 400 && difference > 0) setIsHidden(true);
    else if (difference < 0 || y < 50) setIsHidden(false);

    lastYRef.current = y;
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-120%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 border-b",
        isScrolled 
          ? "py-3 bg-[#050505]/80 backdrop-blur-xl border-white/10" 
          : "py-6 bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link href="/" className="relative z-50 flex items-center gap-3 group">
            <div className="relative w-9 h-9 bg-brand-gold rounded-[2px] flex items-center justify-center overflow-hidden">
              <span className="text-[#050505] font-black text-xl z-10">M</span>
              <motion.div 
                className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg tracking-tight text-white leading-none uppercase">
                Manacles
              </span>
              <span className="text-[10px] font-mono tracking-[0.3em] text-brand-gold uppercase mt-1">
                Solutions
              </span>
            </div>
          </Link>

        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="group relative flex flex-col items-center"
              >
                <div className="flex items-baseline gap-1.5">
                  <span className={cn(
                    "text-[11px] font-mono text-brand-gold transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )}>
                    {link.id}
                  </span>
                  <span className={cn(
                    "text-sm font-mono tracking-[0.2em] uppercase transition-colors duration-300",
                    isActive ? "text-white" : "text-white/50 group-hover:text-white"
                  )}>
                    {link.name}
                  </span>
                </div>
                <motion.div 
                  initial={false}
                  animate={{ width: isActive ? "100%" : "0%" }}
                  className="absolute -bottom-1 h-[1px] bg-brand-gold group-hover:w-full transition-all duration-500"
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          
          <Button 
            className="bg-brand-gold hover:bg-white text-brand-navy font-mono text-[11px] tracking-widest uppercase h-10 px-6 rounded-none transition-all duration-300 flex items-center gap-2 group"
          >
            Connect
            <Plus className="w-3 h-3 group-hover:rotate-90 transition-transform duration-300" />
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-[#050505] z-40 flex flex-col p-8 pt-32"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-baseline gap-4 group"
                  >
                    <span className={cn(
                      "text-xs font-mono text-brand-gold transition-colors",
                      isActive ? "opacity-100" : "opacity-40"
                    )}>{link.id}</span>
                    <span className={cn(
                      "text-4xl font-bold uppercase tracking-tighter transition-colors",
                      isActive ? "text-brand-gold" : "text-white group-hover:text-brand-gold"
                    )}>
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-auto pb-12 flex flex-col gap-8">
              <div className="h-px w-full bg-white/10" />
              <Button className="w-full bg-brand-gold text-brand-navy h-16 text-lg font-bold rounded-none">
                Get in Touch
              </Button>
              <div className="flex justify-between items-center text-white/30 font-mono text-[10px] uppercase tracking-widest">
                <span>© 2026 Manacles Solutions</span>
                <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-brand-gold" /> HQ // Dubai</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
