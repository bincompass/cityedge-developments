"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const sliderImages = [
  { id: 1, src: "/assets/images/properties/1.webp" },
  { id: 2, src: "/assets/images/properties/2.webp" },
  { id: 3, src: "/assets/images/properties/3.webp" },
  { id: 4, src: "/assets/images/properties/4.webp" },
  { id: 5, src: "/assets/images/properties/5.webp" },
  { id: 6, src: "/assets/images/properties/6.webp" },
  { id: 7, src: "/assets/images/properties/7.webp" },
  { id: 8, src: "/assets/images/properties/8.webp" },
];

const statistics = [
  { label: "Destinations", value: 6, suffix: "" },
  { label: "Projects", value: 30, suffix: "+" },
  { label: "Homeowners", value: 25111, suffix: "", isFormatted: true },
  { label: "Units Delivered", value: 11147, suffix: "", isFormatted: true },
  { label: "Area Developed", value: 15, suffix: "M Sqm" },
  { label: "Employees", value: 400, suffix: "+" },
];

function Counter({
  value,
  isFormatted,
}: {
  value: number;
  isFormatted?: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(isFormatted ? "0" : "0");
  const count = useMotionValue(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          const num = Math.round(latest);
          setDisplayValue(isFormatted ? num.toLocaleString() : num.toString());
        },
      });
      return controls.stop;
    }
  }, [inView, value, count, isFormatted]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      created(s) {
        setCurrentSlide(s.track.details.rel);
      },
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
      updated(s) {
        setCurrentSlide(s.track.details.rel);
      },
      animationEnded(s) {
        setCurrentSlide(s.track.details.rel);
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
    <section
      id="hero"
      className="relative w-full h-[calc(100vh-5rem)] flex flex-col lg:flex-row overflow-hidden bg-white"
    >
      {/* Left Slider Section */}
      <div className="relative w-full lg:w-[70%] h-[50vh] sm:h-[60vh] lg:h-full overflow-hidden">
        <div ref={sliderRef} className="keen-slider h-full w-full">
          {sliderImages.map((slide, idx) => (
            <div
              key={slide.id}
              className="keen-slider__slide relative h-full w-full"
            >
              <Image
                src={slide.src}
                alt="City Edge Development"
                fill
                priority={idx === 0}
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Stats Section */}
      <div className="w-full lg:w-[30%] bg-[#F6F6F6] flex flex-col justify-center py-8 sm:py-12 lg:p-16 relative flex-1">
        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-12">
          {statistics.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-light text-[#C5A059]">
                  <Counter value={stat.value} isFormatted={stat.isFormatted} />
                </span>
                {stat.suffix && (
                  <span className="text-xl md:text-2xl font-light text-[#C5A059]">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <span className="text-gray-500 text-xs md:text-sm mt-2 uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content Container Overlay */}
      <div className="absolute top-0 left-0 w-full h-[50vh] sm:h-[60vh] lg:h-full pointer-events-none z-30">
        <div className="container h-full relative">
          {/* Continuous Top Line Overlay */}
          <div className="absolute top-[10%] lg:top-[15%] left-4 right-4 md:right-8 hidden lg:flex items-center pointer-events-none">
            <div className="flex items-center gap-4 w-full">
              <span className="text-white/80 text-sm md:text-base font-medium tracking-widest whitespace-nowrap min-w-[120px]">
                We are City Edge
              </span>
              <div className="h-px flex-1 bg-white/20" />
              <div className="flex items-center gap-4 ml-12 lg:ml-24">
                <div className="h-px w-24 lg:w-48 bg-gray-200" />
                <span className="text-primary text-sm font-medium uppercase tracking-widest whitespace-nowrap">
                  our numbers
                </span>
              </div>
            </div>
          </div>

          {/* Static Title Overlay */}
          <div className="absolute inset-0 flex flex-col items-center md:items-start md:left-4 justify-center pointer-events-none">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white text-3xl sm:text-4xl md:text-5xl font-medium max-w-2xl leading-[1.2] tracking-tight text-center md:text-left"
            >
              Shaping Egypt&apos;s Future <br /> through Innovative <br /> Real
              Estate Development
            </motion.h1>
          </div>

          {/* Slider Controls & Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 md:bottom-20 flex justify-center md:justify-start items-center gap-6 md:gap-12 pointer-events-auto w-full md:w-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
              className="text-white hover:text-primary text-[10px] md:text-sm font-medium uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              Previous
            </button>

            <div className="text-white text-xl md:text-3xl font-light tracking-tighter flex items-center">
              <span>{String(currentSlide + 1).padStart(2, "0")}</span>
              <span className="text-white/30 mx-2 md:mx-3 text-lg md:text-2xl">
                /
              </span>
              <span>{String(sliderImages.length).padStart(2, "0")}</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
              className="text-white hover:text-primary text-[10px] md:text-sm font-medium uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
