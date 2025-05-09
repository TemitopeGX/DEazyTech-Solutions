import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";
import Link from "next/link";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

interface HeroAction {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

interface AboutHeroProps {
  className?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  achievements?: { number: string; label: string }[];
  actions?: HeroAction[];
}

export function AboutHero({
  className,
  badge = "Our Story",
  title = "Transforming Digital Experiences",
  subtitle = "Since 2010",
  description = "We've been on a mission to create exceptional digital experiences that drive business growth and user engagement. Our journey has been defined by innovation, creativity, and a relentless pursuit of excellence.",
  achievements = [
    { number: "10+", label: "Years Experience" },
    { number: "200+", label: "Projects Completed" },
    { number: "50+", label: "Team Members" },
  ],
  actions = [
    {
      label: "Our Services",
      href: "#services",
      variant: "outline",
    },
    {
      label: "Contact Us",
      href: "#contact",
      variant: "default",
    },
  ],
}: AboutHeroProps) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-background pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff096c]/[0.05] via-transparent to-[#8a0faf]/[0.05] blur-3xl" />

      <motion.div
        animate={{
          y: [0, -20, 0],
          transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-[#ff096c]/20 to-[#8a0faf]/20 blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          transition: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          },
        }}
        className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-[#8a0faf]/20 to-[#ff096c]/20 blur-xl"
      />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-[#ff096c]/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-[#8a0faf]/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-[#ff096c]/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-[#8a0faf]/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 mb-6"
          >
            <Circle className="h-2 w-2 fill-[#ff096c]" />
            <span className="text-sm font-medium text-[#8a0faf]">{badge}</span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                {title}
              </span>
              <br />
              <span className="text-foreground">{subtitle}</span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              {description}
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
          >
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-border/20 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm hover:border-[#ff096c]/20 transition-colors duration-300"
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#ff096c] to-[#8a0faf] bg-clip-text text-transparent">
                  {achievement.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {achievement.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                className={cn(
                  "px-6 py-2.5",
                  action.variant === "default" &&
                    "bg-gradient-to-r from-[#ff096c] to-[#8a0faf] hover:opacity-90"
                )}
                asChild
              >
                <Link href={action.href}>{action.label}</Link>
              </Button>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80 pointer-events-none" />
    </div>
  );
}
