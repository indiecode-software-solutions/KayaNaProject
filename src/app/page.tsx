import { Hero } from "@/components/sections/hero";
import { WhoWeServe } from "@/components/sections/who-we-serve";
import { Industries } from "@/components/sections/industries";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Network } from "@/components/sections/network";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-brand-charcoal overflow-x-hidden">
      <Hero />
      <WhoWeServe />
      <Industries />
      <Services />
      <Process />
      <div className="h-48 md:h-64 bg-[#050505] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.02)_0%,transparent_70%)]" />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[#050505] border border-white/5 rounded-full">
            <span className="text-[10px] font-mono tracking-[0.5em] text-white/20 uppercase">Global Operations // Transit</span>
          </div>
        </div>
      </div>
      <Network />
    </main>
  );
}
