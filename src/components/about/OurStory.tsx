import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function OurStory() {
  return (
    <section className="w-full py-12 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#ff096c05_1px,transparent_1px),linear-gradient(-45deg,#8a0faf05_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Logo and visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Animated gradient background */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff096c]/20 to-[#8a0faf]/20 blur-3xl"
              />
              <div className="relative z-10 w-full h-full p-8">
                <Image
                  src="/images/logo.png"
                  alt="DEAZY Tech Solutions Logo"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Decorative elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 right-10 w-16 h-16 rounded-full bg-gradient-to-r from-[#ff096c]/30 to-[#8a0faf]/30 blur-lg"
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-[#8a0faf]/30 to-[#ff096c]/30 blur-lg"
              />
            </div>
          </motion.div>

          {/* Right side - Story content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 text-[#8a0faf] font-medium">
              Our Story
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-[#ff096c] to-[#8a0faf] bg-clip-text text-transparent">
                Leading Software Development Company
              </span>
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground text-lg leading-relaxed">
                DEAZY Tech Solutions Limited is a leading software development
                company specializing in cutting-edge digital solutions for
                businesses, institutions, and organizations. With a strong
                background in web and mobile app development, we provide custom,
                scalable, and high-performance solutions that drive success.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team consists of highly skilled developers, designers, and
                IT experts dedicated to delivering innovative technology
                solutions that enhance user experience and business efficiency.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#ff096c] to-[#8a0faf] bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-sm text-muted-foreground">
                  Technical Support
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#ff096c] to-[#8a0faf] bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-sm text-muted-foreground">
                  Custom Solutions
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
