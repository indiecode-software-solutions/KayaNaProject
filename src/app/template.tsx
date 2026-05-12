"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <motion.div
        key={pathname}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="flex-1 w-full"
      >
        {children}
      </motion.div>
      
      {/* The Cinematic Reveal Curtain */}
      <motion.div
        className="fixed inset-0 z-[100] bg-brand-navy pointer-events-none"
        initial={{ top: 0, height: "100vh" }}
        animate={{ top: "100vh", height: 0 }}
        exit={{ top: 0, height: "100vh" }}
        transition={{ ease: [0.76, 0, 0.24, 1], duration: 1.2 }}
      />
    </>
  );
}
