import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code,
  Database,
  FileCode,
  Layers,
  Rocket,
  Server,
  Users,
  FileCheck,
  GitBranch,
} from "lucide-react";

interface TimelineEntry {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const DevelopmentTimeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-white font-sans md:px-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-32 md:gap-10 group"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-12 absolute left-3 md:left-3 w-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-[#8a0faf] group-hover:shadow-[#ff096c]/20">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#ff096c] to-[#8a0faf] flex items-center justify-center transition-all duration-300">
                  {item.icon}
                </div>
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-gray-900 transition-all duration-300 group-hover:text-[#8a0faf]">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-gray-900">
                {item.title}
              </h3>
              <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:border-[#8a0faf]/20">
                {item.content}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-gray-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#ff096c] via-[#8a0faf] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
