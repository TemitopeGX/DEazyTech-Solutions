import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Target, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

export function VisionMission() {
  const cards = [
    {
      icon: Lightbulb,
      title: "Our Vision",
      description:
        "To be the global leader in digital innovation, creating transformative solutions that empower businesses and enrich lives.",
      points: [
        "Setting industry standards",
        "Driving digital transformation",
        "Creating lasting impact",
      ],
      gradient: "from-rose to-mauveine",
    },
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To deliver exceptional digital solutions through innovation, expertise, and unwavering commitment to client success.",
      points: [
        "Client-centric approach",
        "Technical excellence",
        "Continuous innovation",
      ],
      gradient: "from-mauveine to-chrysler-blue",
    },
    {
      icon: Rocket,
      title: "Our Values",
      description:
        "We are guided by core values that define our culture and drive our success in delivering outstanding results.",
      points: [
        "Integrity & transparency",
        "Innovation & creativity",
        "Excellence in delivery",
      ],
      gradient: "from-chrysler-blue to-rose",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff,#f8f9ff,#ffffff)]"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-mauveine/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-chrysler-blue/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative">
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
              Vision & Mission
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Driving{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose to-mauveine">
                Digital Excellence
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-rose to-mauveine rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our vision and mission guide us in creating innovative solutions
              that transform businesses and drive digital success.
            </p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-r ${card.gradient} p-3 text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <card.icon className="w-full h-full" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600 mb-6">{card.description}</p>

              {/* Points */}
              <ul className="space-y-3 mb-6">
                {card.points.map((point, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${card.gradient} mr-2`}
                    ></div>
                    {point}
                  </li>
                ))}
              </ul>

              {/* Hover decoration */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose/5 to-mauveine/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
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
    </section>
  );
}
