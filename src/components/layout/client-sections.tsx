"use client";

import dynamic from "next/dynamic";
import React from "react";

function LoadingSection() {
  return (
    <div className="w-full h-[60vh] bg-brand-charcoal flex items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 border-2 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin" />
        <div className="absolute inset-0 blur-xl bg-brand-gold/10 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

// Dynamic imports with SSR disabled for heavy sections
export const Industries = dynamic(() => import("@/components/sections/industries").then(mod => mod.Industries), {
  ssr: false,
  loading: () => <LoadingSection />,
});

export const Process = dynamic(() => import("@/components/sections/process").then(mod => mod.Process), {
  ssr: false,
  loading: () => <LoadingSection />,
});

export const Network = dynamic(() => import("@/components/sections/network").then(mod => mod.Network), {
  ssr: false,
  loading: () => <LoadingSection />,
});
