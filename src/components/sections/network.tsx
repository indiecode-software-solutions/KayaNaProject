"use client";

import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { motion, useScroll, useTransform } from "framer-motion";

export function Network() {
  const chartRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [projection, setProjection] = React.useState<"globe" | "map">("globe");
  const rootRef = useRef<am5.Root | null>(null);
  const chartInstanceRef = useRef<am5map.MapChart | null>(null);
  const bgSeriesRef = useRef<am5map.MapPolygonSeries | null>(null);

  // Parallax logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const globeY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    let root = am5.Root.new(chartRef.current);
    rootRef.current = root;

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        wheelX: "none",
        wheelY: "none",
        pinchZoom: false,
        projection: am5map.geoOrthographic(),
        rotationX: -78,
        rotationY: -20,
        minZoomLevel: 1,
        maxZoomLevel: 1.5,
        zoomLevel: 1,
      })
    );
    chartInstanceRef.current = chart;

    // Create series for background fill (Ocean)
    let bgSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    bgSeriesRef.current = bgSeries;
    bgSeries.mapPolygons.template.setAll({
      fill: am5.color(0x050505),
      fillOpacity: 1,
      strokeOpacity: 0,
    });
    bgSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    // Create graticule series
    let graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
    graticuleSeries.mapLines.template.setAll({
      stroke: am5.color(0xffffff),
      strokeOpacity: 0.05,
      strokeWidth: 0.5,
    });

    // Create main polygon series for countries
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0x1a1a1a),
      stroke: am5.color(0x333333),
      strokeWidth: 0.5,
      strokeOpacity: 1,
    });

    // Highlight Key Manacles Hubs
    const hubIds = ["IN", "AE", "US", "DE", "CN", "BR", "ZA"];
    polygonSeries.events.on("datavalidated", function () {
      am5.array.each(polygonSeries.dataItems, function (di: any) {
        if (hubIds.includes(di.get("id"))) {
          di.get("mapPolygon").setAll({
            fill: am5.color(0x2a2a2a),
            stroke: am5.color(0xd4af37),
            strokeWidth: 1,
          });
        }
      });
    });

    // Create Map Sankey series for Flow
    let sankeySeries = chart.series.push(
      am5map.MapSankeySeries.new(root, {
        polygonSeries: polygonSeries,
        maxWidth: 2,
        controlPointDistance: 0.3,
        resolution: 50,
      })
    );

    sankeySeries.mapPolygons.template.setAll({
      fill: am5.color(0xd4af37),
      fillOpacity: 0.3,
      strokeOpacity: 0,
    });

    sankeySeries.nodes.mapPolygons.template.setAll({
      fill: am5.color(0xd4af37),
      fillOpacity: 1,
      strokeOpacity: 0,
    });

    // Add Supply Chain Flow Data
    sankeySeries.data.setAll([
      { sourceId: "CN", targetId: "IN", value: 100 },
      { sourceId: "IN", targetId: "AE", value: 150 },
      { sourceId: "AE", targetId: "DE", value: 120 },
      { sourceId: "DE", targetId: "US", value: 80 },
      { sourceId: "US", targetId: "BR", value: 60 },
      { sourceId: "IN", targetId: "ZA", value: 40 },
    ]);

    // Add Animated Supply Nodes (Bullets)
    sankeySeries.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationX: 0,
        autoRotate: true,
        sprite: am5.Circle.new(root, {
          radius: 2,
          fill: am5.color(0xd4af37),
          stroke: am5.color(0xffffff),
          strokeWidth: 0.5,
          visible: false,
        }),
      });
    });

    sankeySeries.events.on("datavalidated", function () {
      am5.array.each(sankeySeries.dataItems, function (dataItem: any) {
        let bullets = dataItem.bullets;
        if (bullets) {
          am5.array.each(bullets, function (bullet: any) {
            let randomDur = 4000 + Math.random() * 4000;
            let delay = Math.random() * randomDur;
            setTimeout(function () {
              let sprite = bullet.get("sprite");
              if (sprite) sprite.set("visible", true);
              bullet.animate({
                key: "locationX",
                from: 0,
                to: 1,
                duration: randomDur,
                easing: am5.ease.linear,
                loops: Infinity,
              });
            }, delay);
          });
        }
      });
    });

    // Auto-rotate globe
    let rotationAnimation = chart.animate({
      key: "rotationX",
      from: -78,
      to: -78 + 360,
      duration: 120000,
      loops: Infinity,
      easing: am5.ease.linear,
    });

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  // Handle Projection Switch
  React.useEffect(() => {
    if (!chartInstanceRef.current || !bgSeriesRef.current) return;
    
    const chart = chartInstanceRef.current;
    const bgSeries = bgSeriesRef.current;
    const duration = 1200;
    const easing = am5.ease.inOut(am5.ease.cubic);
    const fadeDuration = 300;

    // Fade out
    chart.seriesContainer.animate({ key: "opacity", to: 0, duration: fadeDuration });

    setTimeout(() => {
      if (projection === "map") {
        chart.set("projection", am5map.geoMercator());
        chart.set("panX", "translateX");
        chart.set("panY", "translateY");
        chart.animate({ key: "rotationX", to: 0, duration: duration, easing: easing });
        chart.animate({ key: "rotationY", to: 0, duration: duration, easing: easing });
        bgSeries.mapPolygons.template.set("fillOpacity", 0);
        chart.animate({ key: "zoomLevel", to: 1.5, duration: duration, easing: easing });
      } else {
        chart.set("projection", am5map.geoOrthographic());
        chart.set("panX", "rotateX");
        chart.set("panY", "rotateY");
        chart.animate({ key: "rotationX", to: -78, duration: duration, easing: easing });
        chart.animate({ key: "rotationY", to: -20, duration: duration, easing: easing });
        bgSeries.mapPolygons.template.set("fillOpacity", 1);
        chart.animate({ key: "zoomLevel", to: 1, duration: duration, easing: easing });
      }
      
      // Fade in
      chart.seriesContainer.animate({ key: "opacity", to: 1, duration: fadeDuration });
    }, fadeDuration);
    
  }, [projection]);

  return (
    <section ref={containerRef} className="relative w-full min-h-[120vh] bg-[#050505] overflow-hidden z-10 py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Text Overlay */}
      <div className="absolute inset-x-0 top-32 z-20 pointer-events-none container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <span className="text-brand-gold font-mono text-xs tracking-[0.4em] uppercase mb-6 block">The Operational Expanse</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-white leading-none">
            Global <br />
            <span className="text-white/20">Network.</span>
          </h2>
        </motion.div>

        {/* View Toggle (Top Right) */}
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md pointer-events-auto mt-12 md:mt-0">
          <button 
            onClick={() => setProjection("globe")}
            className={`px-6 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all ${projection === 'globe' ? 'bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/20' : 'text-white/40 hover:text-white'}`}
          >
            Globe
          </button>
          <button 
            onClick={() => setProjection("map")}
            className={`px-6 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all ${projection === 'map' ? 'bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/20' : 'text-white/40 hover:text-white'}`}
          >
            Flat Map
          </button>
        </div>
      </div>

      {/* Stats Card (Bottom Right) */}
      <div className="absolute bottom-32 right-0 z-20 pointer-events-none container mx-auto px-6 md:px-12 flex justify-end">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel-dark p-8 rounded-3xl border-white/10 backdrop-blur-md pointer-events-auto shadow-2xl"
        >
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <p className="text-brand-gold text-3xl font-bold font-mono">14+</p>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em]">Regions</p>
            </div>
            <div>
              <p className="text-brand-gold text-3xl font-bold font-mono">50K</p>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em]">TEU Vol.</p>
            </div>
            <div>
              <p className="text-brand-gold text-3xl font-bold font-mono">99%</p>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em]">Accuracy</p>
            </div>
            <div>
              <p className="text-brand-gold text-3xl font-bold font-mono">24/7</p>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em]">Command</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chart Div with Parallax */}
      <motion.div 
        style={{ y: globeY }}
        ref={chartRef} 
        className="absolute inset-0 z-10 w-full h-full scale-110 md:scale-100" 
      />

      {/* Decorative Stage Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
