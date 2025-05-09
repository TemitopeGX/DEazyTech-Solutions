import React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  PenTool,
  Code2,
  TestTube,
  Rocket,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Discovery",
    description: "We analyze your requirements and plan the perfect solution.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Creating intuitive and engaging user experiences.",
  },
  {
    icon: Code2,
    title: "Development",
    description: "Building robust solutions with cutting-edge technologies.",
  },
  {
    icon: TestTube,
    title: "Testing",
    description: "Rigorous testing to ensure quality and reliability.",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Deploying your solution and providing ongoing support.",
  },
];

export function OurProcess() {
  return (
    <section className="w-full py-20 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#ff096c05_1px,transparent_1px),linear-gradient(-45deg,#8a0faf05_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
              Our Process
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We follow a proven development process to deliver high-quality
            solutions that exceed expectations.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff096c]/20 via-[#8a0faf]/20 to-[#ff096c]/20 transform -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Step number */}
                <div className="absolute -top-4 right-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#ff096c] to-[#8a0faf] flex items-center justify-center text-white text-sm font-medium">
                  {index + 1}
                </div>

                {/* Icon container */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-2xl bg-background border-2 border-border/50 group-hover:border-[#ff096c]/50 transition-colors duration-300 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-[#8a0faf] group-hover:text-[#ff096c] transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4 md:hidden">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
