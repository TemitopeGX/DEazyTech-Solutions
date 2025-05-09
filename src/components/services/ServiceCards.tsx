import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Globe2,
  Database,
  Cloud,
  Shield,
  Lightbulb,
  LineChart,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Custom web applications built with modern technologies and best practices.",
    gradient: "from-[#ff096c] to-[#8a0faf]",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile apps for iOS and Android devices.",
    gradient: "from-[#8a0faf] to-[#ff096c]",
  },
  {
    icon: Globe2,
    title: "UI/UX Design",
    description:
      "User-centered design solutions that enhance digital experiences.",
    gradient: "from-[#ff096c] to-[#8a0faf]",
  },
  {
    icon: Database,
    title: "Database Solutions",
    description:
      "Efficient database design and management for optimal performance.",
    gradient: "from-[#8a0faf] to-[#ff096c]",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description: "Scalable cloud solutions for modern business needs.",
    gradient: "from-[#ff096c] to-[#8a0faf]",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Comprehensive security solutions to protect your digital assets.",
    gradient: "from-[#8a0faf] to-[#ff096c]",
  },
  {
    icon: Lightbulb,
    title: "IT Consulting",
    description: "Strategic technology consulting to drive business growth.",
    gradient: "from-[#ff096c] to-[#8a0faf]",
  },
  {
    icon: LineChart,
    title: "Digital Analytics",
    description: "Data-driven insights to optimize your digital presence.",
    gradient: "from-[#8a0faf] to-[#ff096c]",
  },
];

export function ServiceCards() {
  return (
    <section
      className="w-full py-20 bg-background relative overflow-hidden"
      id="services"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#ff096c05_1px,transparent_1px),linear-gradient(-45deg,#8a0faf05_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
              Our Services
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive range of digital solutions to help your
            business thrive in the modern world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative p-6 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-[#ff096c]/50 transition-all duration-300"
            >
              {/* Gradient background */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, var(--${service.gradient}))`,
                }}
              />

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-2.5 mb-4`}
              >
                <service.icon className="w-full h-full text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>

              {/* Hover effect */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
