import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  FileCheck,
  GitBranch,
  Code,
  Database,
  Rocket,
  Building2,
  Target,
  Award,
  ArrowRight,
  Circle,
  ChevronRight,
  Laptop,
  Zap,
  Lightbulb,
  Target as BullseyeIcon,
  Handshake,
  Cog,
  LineChart,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DevelopmentTimeline } from "@/components/ui/development-timeline";
import { AboutHero } from "@/components/about/AboutHero";
import { OurStory } from "@/components/about/OurStory";
import { VisionMission } from "@/components/about/VisionMission";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { MeetTheTeam } from "@/components/about/MeetTheTeam";

interface Achievement {
  icon: React.ElementType;
  title: string;
  value: string;
  color: string;
}

interface Value {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
}

interface ElegantShapeProps {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: ElegantShapeProps) {
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

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - DEAZY Tech Solutions</title>
        <meta
          name="description"
          content="Learn about DEAZY Tech Solutions - a leading software development company specializing in cutting-edge digital solutions for businesses and organizations."
        />
      </Head>

      <main className="min-h-screen">
        <AboutHero
          badge="About Us"
          title="Pioneering Digital Excellence"
          subtitle="Leading Software Development"
          description="DEAZY Tech Solutions Limited is a leading software development company specializing in cutting-edge digital solutions for businesses, institutions, and organizations."
          achievements={[
            { number: "24/7", label: "Support" },
            { number: "100%", label: "Custom Solutions" },
          ]}
          actions={[
            {
              label: "Our Services",
              href: "/services",
              variant: "outline",
            },
            {
              label: "Contact Us",
              href: "/contact",
              variant: "default",
            },
          ]}
        />
        <OurStory />
        <VisionMission />
        <WhyChooseUs />
        <MeetTheTeam />
      </main>
    </>
  );
}
