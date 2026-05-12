"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP, CustomEase);

// Define custom enterprise-grade cinematic easings
CustomEase.create("cinematic", "M0,0 C0.19,1 0.22,1 1,1");
CustomEase.create("industrial", "M0,0 C0.76,0 0.24,1 1,1");

// Export configured gsap and plugins for use across the application
export { gsap, ScrollTrigger, useGSAP, CustomEase };
