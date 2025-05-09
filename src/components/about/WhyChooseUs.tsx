import React from "react";
import { motion } from "framer-motion";
import { Shield, Settings, Clock, Scale } from "lucide-react";

const features = [
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Expertise & Experience",
    description:
      "We have a proven track record in delivering high-quality, scalable, and secure digital solutions for businesses and organizations.",
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "Tailor-Made Solutions",
    description:
      "Our approach is customer-focused, ensuring that we build solutions customized to meet your specific needs.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Reliable Support & Maintenance",
    description:
      "We offer 24/7 technical support, system updates, and ongoing maintenance to ensure smooth performance.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Scalable Development",
    description:
      "Our systems are built with robust security measures and scalability in mind, ensuring that they grow with your business.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-sm rounded-full border border-border bg-background"
          >
            Why Choose Us
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold"
          >
            <span className="bg-gradient-to-r from-[#ff096c] to-[#8a0faf] bg-clip-text text-transparent">
              What Sets Us Apart
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border-2 border-border bg-background/50 hover:border-[#ff096c]/50 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff096c] to-[#8a0faf] flex items-center justify-center mb-4">
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
