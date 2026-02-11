"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { MapPin } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Mazarine Hub",
    location: "New Alamein City",
    image: "/assets/images/portfolio/1.webp",
  },
  {
    id: 2,
    title: "Mazarine Boulevard",
    location: "New Alamein City",
    image: "/assets/images/portfolio/2.png",
  },
  {
    id: 3,
    title: "Mamsha Vista",
    location: "New Capital City",
    image: "/assets/images/portfolio/3.webp",
  },
  {
    id: 4,
    title: "Jade Park",
    location: "New Capital City",
    image: "/assets/images/portfolio/4.webp",
  },
  {
    id: 5,
    title: "Maspero Mall",
    location: "Maspero Triangle",
    image: "/assets/images/portfolio/5.jpg",
  },
  {
    id: 6,
    title: "Maspero Nile Heights",
    location: "Maspero Triangle",
    image: "/assets/images/portfolio/6.jpg",
  },
  {
    id: 7,
    title: "Maspero Business Towers",
    location: "Maspero Triangle",
    image: "/assets/images/portfolio/7.jpg",
  },
  {
    id: 8,
    title: "V40",
    location: "New Cairo City",
    image: "/assets/images/portfolio/8.png",
  },
];

export default function PortfolioSlider() {
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      slides: {
        perView: 1,
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 768px)": {
          slides: { perView: 2, spacing: 16 },
        },
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ],
  );

  return (
    <section id="portfolio" className="py-24 bg-white overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-foreground text-center md:text-left text-4xl md:text-5xl font-normal max-w-2xl leading-tight"
          >
            Explore our diverse portfolio of exceptional Projects
          </motion.h2>
        </div>

        {/* Slider Container */}
        <div className="relative group">
          <div ref={sliderRef} className="keen-slider">
            {projects.map((project) => (
              <div key={project.id} className="keen-slider__slide rounded-md">
                <div className="flex flex-col gap-6">
                  {/* Project Image */}
                  <div className="relative aspect-16/10 w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Project Info */}
                  <div className="space-y-1">
                    <h3 className="text-primary text-2xl font-normal">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin size={14} className="text-[#C5A059]" />
                      <span className="text-sm font-light uppercase tracking-widest">
                        {project.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows (Sides) */}
          {loaded && (
            <>
              <button
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
                className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all z-20 border border-gray-100"
                aria-label="Previous slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
                className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all z-20 border border-gray-100"
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Navigation Counter (Bottom) */}
        </div>
      </div>
    </section>
  );
}
