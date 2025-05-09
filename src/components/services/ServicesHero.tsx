import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Circle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

function AnimatedCard({
  icon: Icon,
  title,
  delay,
}: {
  icon: any;
  title: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
    >
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff096c] to-[#8a0faf] p-2 flex items-center justify-center">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="text-sm font-medium text-white/90">{title}</span>
    </motion.div>
  );
}

export function ServicesHero() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0f0f0f] pt-20">
      {/* Animated background gradient */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff096c] via-[#8a0faf] to-[#ff096c] blur-3xl" />
      </motion.div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff05_1px,transparent_1px),linear-gradient(-45deg,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-[#ff096c]" />
              <span className="text-sm font-medium text-white/90">
                Transforming Ideas into Digital Reality
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-white">Innovative</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                  Digital Services
                </span>
              </h1>
              <p className="text-lg text-white/70 max-w-lg">
                We craft cutting-edge solutions that drive business growth and
                deliver exceptional user experiences. Let's build something
                amazing together.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#ff096c] to-[#8a0faf] hover:opacity-90 text-white gap-2 group"
                asChild
              >
                <Link href="#contact">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/10 text-white hover:bg-white/5"
                asChild
              >
                <Link href="#services">View Services</Link>
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
              <AnimatedCard
                icon={Circle}
                title="Custom Development"
                delay={0.3}
              />
              <AnimatedCard icon={Circle} title="Modern Design" delay={0.4} />
              <AnimatedCard icon={Circle} title="Cloud Solutions" delay={0.5} />
              <AnimatedCard icon={Circle} title="24/7 Support" delay={0.6} />
            </div>
          </div>

          {/* Right content - 3D-like illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] hidden lg:block"
          >
            {/* Main image */}
            <div className="absolute inset-0">
              <div className="relative w-full h-full">
                <Image
                  src="/images/services-hero.png"
                  alt="Services Illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-20 -left-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#ff096c]/20 to-[#8a0faf]/20 blur-xl"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-20 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#8a0faf]/20 to-[#ff096c]/20 blur-xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
    </div>
  );
}
