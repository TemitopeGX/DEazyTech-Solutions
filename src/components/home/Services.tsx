import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Smartphone,
  Globe,
  Lightbulb,
  Cloud,
  Settings,
} from "lucide-react";

const services = [
  {
    icon: <Code className="w-6 h-6 text-white" />,
    title: "Software Development",
    description:
      "Custom software, LMS, eCommerce, enterprise apps, and automation tools.",
  },
  {
    icon: <Smartphone className="w-6 h-6 text-white" />,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for Android and iOS.",
  },
  {
    icon: <Globe className="w-6 h-6 text-white" />,
    title: "Web Development",
    description:
      "High-performance websites and web apps focused on security and UX.",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-white" />,
    title: "IT Consulting",
    description:
      "Expert advice and solutions to automate and optimize operations.",
  },
  {
    icon: <Cloud className="w-6 h-6 text-white" />,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and integration services.",
  },
  {
    icon: <Settings className="w-6 h-6 text-white" />,
    title: "Support & Maintenance",
    description:
      "24/7 technical support and system updates for smooth performance.",
  },
];

export function Services() {
  return (
    <section className="py-12 md:py-16 bg-[#f8f9fd]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-4"
          >
            <span className="bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-transparent bg-clip-text font-semibold">
              Our Services
            </span>
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff096c] to-[#8a0faf] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
