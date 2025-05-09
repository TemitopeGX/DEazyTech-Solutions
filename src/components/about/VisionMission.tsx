import React from "react";
import { motion } from "framer-motion";
import { Rocket, Target } from "lucide-react";

export function VisionMission() {
  return (
    <section className="w-full py-16 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border-2 border-border bg-background hover:border-[#ff096c]/50 transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff096c] to-[#8a0faf] flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground">
              To be a leading provider of innovative technology solutions that
              empower businesses and organizations worldwide.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border-2 border-border bg-background hover:border-[#8a0faf]/50 transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff096c] to-[#8a0faf] flex items-center justify-center mb-6">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                • To develop custom software solutions that improve efficiency
                and productivity.
              </li>
              <li>
                • To provide secure, scalable, and user-friendly digital
                platforms.
              </li>
              <li>
                • To support organizations in leveraging technology for growth
                and success.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
