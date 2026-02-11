"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import StaggerContainer, {
  StaggerItem,
} from "@/components/shared/StaggerContainer";

const destinations = [
  {
    id: "new-alamein",
    x: "34%",
    y: "42%",
  },
  {
    id: "new-mansoura",
    x: "55.8%",
    y: "42%",
  },
  {
    id: "sheikh-zayed",
    x: "46.7%",
    y: "54%",
  },
  {
    id: "maspero",
    x: "50.2%",
    y: "50%",
  },
  {
    id: "new-cairo",
    x: "53.3%",
    y: "55%",
  },
  {
    id: "new-capital",
    x: "56.5%",
    y: "58%",
  },
];

function MapPin({ dest }: { dest: (typeof destinations)[0] }) {
  return (
    <motion.div
      className="absolute z-20"
      style={{ left: dest.x, top: dest.y }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* Pin Icon and Pulse */}
      <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          className="relative z-10 drop-shadow-lg w-[28px] h-[28px]"
          animate={{
            scale: [1, 1.2, 1],
            fill: ["#443627", "#C5A059", "#443627"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
        </motion.svg>
      </div>
    </motion.div>
  );
}

export default function Destinations() {
  return (
    <section id="destinations" className="pt-20 bg-white overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Left Side: Map Image with Pins */}
          <div className="w-full lg:w-3/5 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-video"
            >
              <Image
                src="/assets/images/map.webp"
                alt="City Edge Destinations Map"
                fill
                className="object-cover rounded-lg"
                priority
              />

              {/* Animated Map Pins */}
              <div className="absolute inset-0">
                {destinations.map((dest) => (
                  <MapPin key={dest.id} dest={dest} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <StaggerContainer
              staggerDelay={0.15}
              initialDelay={0.3}
              className="space-y-6"
            >
              <StaggerItem direction="up">
                <span className="text-gray-500 text-sm font-medium tracking-widest uppercase">
                  We are in
                </span>
              </StaggerItem>

              <StaggerItem direction="up">
                <h2 className="text-4xl md:text-5xl font-light text-[#002D54] tracking-tight">
                  6 Key Destinations
                </h2>
              </StaggerItem>

              <StaggerItem direction="up">
                <p className="text-[#002D54] text-lg md:text-xl leading-relaxed font-normal max-w-lg">
                  City Edge transforms your visions{" "}
                  <span className="text-[#C5A059]">
                    into vibrant realities.
                  </span>{" "}
                  We craft spaces where your ideals and aspirations become
                  tangible creations.
                </p>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
