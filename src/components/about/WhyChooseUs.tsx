import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Users,
  Clock,
  Shield,
  Zap,
  LineChart,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export function WhyChooseUs() {
  const features = [
    {
      icon: Code,
      title: "Expert Development",
      description: "Skilled team of developers using cutting-edge technologies",
      gradient: "from-rose to-mauveine",
      delay: 0.3,
    },
    {
      icon: Shield,
      title: "Secure Solutions",
      description: "Top-tier security measures and best practices",
      gradient: "from-mauveine to-chrysler-blue",
      delay: 0.4,
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock technical support and maintenance",
      gradient: "from-chrysler-blue to-rose",
      delay: 0.5,
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Efficient development and timely project completion",
      gradient: "from-rose to-chrysler-blue",
      delay: 0.6,
    },
    {
      icon: LineChart,
      title: "Scalable Solutions",
      description: "Future-proof applications that grow with your business",
      gradient: "from-mauveine to-rose",
      delay: 0.7,
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Focused on delivering exceptional client experiences",
      gradient: "from-chrysler-blue to-mauveine",
      delay: 0.8,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated grid pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(138,15,175,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,9,108,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(255,9,108,0.05),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_300px,rgba(138,15,175,0.05),transparent)]" />
        </div>

        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.2, 0.3],
                left: ["0%", "100%", "0%"],
                top: [(i + 1) * 30 + "%"],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-r from-rose/10 to-mauveine/10 blur-3xl" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-rose/10 via-mauveine/10 to-chrysler-blue/10 text-rose font-medium text-sm mb-6">
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                The{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose to-mauveine">
                  DEAZY
                </span>{" "}
                Advantage
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-rose to-mauveine rounded-full mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We combine technical expertise with innovative thinking to
                deliver exceptional results that set us apart.
              </p>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="group"
              >
                <div className="relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-rose/20 transition-all duration-300 hover:shadow-xl">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-2.5 text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-full h-full" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                  {/* Decorative gradient background */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose/5 to-mauveine/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="text-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-rose to-mauveine text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
