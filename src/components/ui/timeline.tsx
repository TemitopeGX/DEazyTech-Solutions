import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  achievements?: string[];
  image?: string;
}

interface TimelineProps {
  data: TimelineEntry[];
  className?: string;
}

export const Timeline = ({ data, className }: TimelineProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div className={cn("w-full font-sans", className)} ref={ref}>
      <div className="relative max-w-7xl mx-auto">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-8 md:gap-16 py-12 md:py-24 relative"
          >
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff096c] to-[#8a0faf] transform -translate-x-1/2" />

            {/* Year marker */}
            <div className="flex items-center md:w-1/2 md:justify-end relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff096c] to-[#8a0faf] flex items-center justify-center text-white font-bold text-sm"
              >
                {item.year}
              </motion.div>
            </div>

            {/* Content */}
            <div className="md:w-1/2 pl-12 md:pl-16 relative">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] bg-clip-text text-transparent"
              >
                {item.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
                className="text-muted-foreground mb-6"
              >
                {item.description}
              </motion.p>
              {item.achievements && (
                <motion.ul
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#ff096c] to-[#8a0faf]" />
                      <span className="text-sm text-muted-foreground">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </motion.ul>
              )}
              {item.image && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                  src={item.image}
                  alt={item.title}
                  className="mt-6 rounded-lg w-full object-cover shadow-lg"
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
