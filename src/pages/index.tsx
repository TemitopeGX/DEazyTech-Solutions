import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { DevelopmentTimeline } from "@/components/ui/development-timeline";
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
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
  Variants,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 flex flex-col items-center text-center"
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-primary/10 p-2 sm:p-3 rounded-full mb-3 sm:mb-4">
        {icon}
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

interface HeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

function DeazyHero({
  badge = "DEAZY Tech Solutions",
  title = "Transforming Ideas into",
  subtitle = "Digital Excellence",
  description = "We build innovative digital solutions that help businesses grow, scale, and succeed in the modern tech landscape with our cutting-edge development expertise.",
}: HeroProps) {
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

  // Add floating elements animation variants
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Graph line background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(#8a0faf10_1px,transparent_1px),linear-gradient(to_right,#8a0faf10_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:24px_24px]" />

      {/* Floating geometric elements - Show on all screens */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-[#ff096c]/20 to-[#8a0faf]/20 blur-xl"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-[#8a0faf]/20 to-[#ff096c]/20 blur-xl"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-r from-[#ff096c]/30 to-[#8a0faf]/30 blur-lg"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#ff096c]/20 via-[#8a0faf]/20 to-[#ff096c]/20 opacity-20 blur-3xl" />

      {/* Add animated graph lines */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#ff096c10_1px,transparent_1px),linear-gradient(-45deg,#8a0faf10_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px] animate-[grain_8s_steps(10)_infinite]" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={200}
          height={80}
          rotate={12}
          gradient="from-[#ff096c]/[0.15]"
          className="left-[-10%] sm:left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={180}
          height={60}
          rotate={-15}
          gradient="from-[#8a0faf]/[0.15]"
          className="right-[-10%] sm:right-[-10%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={150}
          height={50}
          rotate={-8}
          gradient="from-[#ff096c]/[0.15]"
          className="left-[0%] sm:left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={120}
          height={40}
          rotate={20}
          gradient="from-[#8a0faf]/[0.15]"
          className="right-[10%] sm:right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={80}
          height={25}
          rotate={-25}
          gradient="from-[#ff096c]/[0.15]"
          className="left-[15%] sm:left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-3 px-4 sm:px-4 py-2 rounded-full bg-background/20 backdrop-blur-md border border-border mb-8 sm:mb-10 md:mb-12"
          >
            <Circle className="h-3 w-3 fill-[#ff096c]" />
            <span className="text-base sm:text-lg text-foreground/80 tracking-wide font-medium">
              {badge}
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 sm:mb-10 md:mb-12 tracking-tight px-2 leading-[1.1]">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                {title}
              </span>
              <br className="hidden sm:block" />
              <span className="mt-3 sm:mt-0 inline-block sm:inline bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                {subtitle}
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 sm:mb-12 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
              {description}
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row justify-center gap-5 sm:gap-4 mb-10 sm:mb-16 px-4"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-[#ff096c] to-[#8a0faf] hover:opacity-90 text-white text-lg sm:text-xl py-7 sm:py-6 rounded-xl sm:rounded-lg"
              asChild
            >
              <Link href="/contact">
                Get Started <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-[#8a0faf] text-[#8a0faf] hover:bg-[#8a0faf]/5 text-lg sm:text-xl py-7 sm:py-6 rounded-xl sm:rounded-lg"
              asChild
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80 pointer-events-none" />
    </div>
  );
}

const HomePage: React.FC = () => {
  // Auto-scroll logic for services carousel
  const scrollRef = useRef<HTMLDivElement>(null);

  // Define the logos object
  const logos = {
    frontend: [
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        alt: "React",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        alt: "Next.js",
        extra: "bg-white rounded-lg p-2",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
        alt: "Vue.js",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
        alt: "Angular",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        alt: "JavaScript",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        alt: "TypeScript",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        alt: "HTML5",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        alt: "CSS3",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
        alt: "Tailwind CSS",
      },
    ],
    backend: [
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        alt: "Node.js",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        alt: "Express.js",
        extra: "bg-white rounded-lg p-2",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
        alt: "NestJS",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        alt: "Python",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
        alt: "Django",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        alt: "PHP",
      },
    ],
    database: [
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        alt: "MySQL",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        alt: "MongoDB",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        alt: "PostgreSQL",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
        alt: "Redis",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        alt: "Firebase",
      },
    ],
    tools: [
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        alt: "Git",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        alt: "GitHub",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        alt: "Docker",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        alt: "Kubernetes",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aws/aws-original.svg",
        alt: "AWS",
      },
    ],
    design: [
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        alt: "Figma",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg",
        alt: "Sketch",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
        alt: "Photoshop",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg",
        alt: "Adobe XD",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
        alt: "Illustrator",
      },
    ],
  } as const;

  type LogoType = {
    src: string;
    alt: string;
    extra?: string;
  };

  const [activeTab, setActiveTab] = useState<keyof typeof logos>("frontend");

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let direction: "right" | "left" = "right";
    let frame: number;
    function autoScroll() {
      if (!el) return;
      if (direction === "right") {
        el.scrollLeft += 1;
        if (el.scrollLeft + el.offsetWidth >= el.scrollWidth)
          direction = "left";
      } else {
        el.scrollLeft -= 1;
        if (el.scrollLeft <= 0) direction = "right";
      }
      frame = requestAnimationFrame(autoScroll);
    }
    frame = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(frame);
  }, []);

  const fadeUpVariants: Variants = {
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

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 1.3,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const techStackVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.5,
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 1.0,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Add keyframes for the grain animation
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes grain {
        0%, 100% { transform: translate(0, 0) }
        10% { transform: translate(-5%, -5%) }
        20% { transform: translate(-10%, 5%) }
        30% { transform: translate(5%, -10%) }
        40% { transform: translate(-5%, 15%) }
        50% { transform: translate(-10%, 5%) }
        60% { transform: translate(15%, 0) }
        70% { transform: translate(0, 10%) }
        80% { transform: translate(-15%, 0) }
        90% { transform: translate(10%, 5%) }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <Head>
        <title>DEAZY Tech Solutions - Custom Software Development</title>
        <meta
          name="description"
          content="Empowering Business Growth with Innovative Software. DEAZY Tech Solutions delivers custom, secure, and scalable digital platforms for organizations."
        />
      </Head>
      {/* Hero Section - Modern Animated */}
      <DeazyHero
        badge="DEAZY Tech Solutions"
        title="Transforming Ideas into"
        subtitle="Digital Excellence"
        description="We build innovative digital solutions that help businesses grow, scale, and succeed in the modern tech landscape with our cutting-edge development expertise."
      />
      {/* Trusted By Companies Section - Continuous Scrolling Logos */}
      <section className="py-6 sm:py-10 bg-white border-t border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4 sm:mb-6">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-2 sm:mb-3 text-[#8a0faf] text-sm sm:text-base font-medium">
              Trusted by leading companies
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              Our Clients & Partners
            </h3>
          </div>

          {/* Logo Marquee Container */}
          <div className="relative w-full overflow-hidden bg-white py-4">
            {/* Add fade effects */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

            {/* Marquee wrapper */}
            <div className="flex w-[200%] animate-marquee">
              {/* First set of logos */}
              <div className="flex w-1/2 justify-around items-center min-w-max gap-12 px-8">
                <div className="flex items-center justify-center w-24 sm:w-32 h-12 sm:h-16">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                    alt="Google"
                    className="max-h-6 sm:max-h-8 w-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-center w-24 sm:w-32 h-12 sm:h-16">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
                    alt="Microsoft"
                    className="max-h-6 sm:max-h-8 w-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-center w-24 sm:w-32 h-12 sm:h-16">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png"
                    alt="Slack"
                    className="max-h-6 sm:max-h-8 w-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-center w-24 sm:w-32 h-12 sm:h-16">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
                    alt="IBM"
                    className="max-h-6 sm:max-h-8 w-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-center w-24 sm:w-32 h-12 sm:h-16">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                    alt="Amazon"
                    className="max-h-6 sm:max-h-8 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Second set of logos (duplicate for seamless loop) */}
              <div className="flex w-1/2 justify-around items-center min-w-max gap-12 px-8">
                <div className="flex items-center justify-center w-24 sm:w-32 h-12 sm:h-16">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                    alt="Google"
                    className="max-h-6 sm:max-h-8 w-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-center w-24 sm:w-32 h-12 sm:h-16">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
                    alt="Microsoft"
                    className="max-h-6 sm:max-h-8 w-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-center w-24 sm:w-32 h-12 sm:h-16">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png"
                    alt="Slack"
                    className="max-h-6 sm:max-h-8 w-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-center w-24 sm:w-32 h-12 sm:h-16">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
                    alt="IBM"
                    className="max-h-6 sm:max-h-8 w-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-center w-24 sm:w-32 h-12 sm:h-16">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                    alt="Amazon"
                    className="max-h-6 sm:max-h-8 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Add CSS for the marquee animation */}
          <style jsx>{`
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      </section>
      {/* About Us Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-white border-t border-b border-gray-100">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.5,
                staggerChildren: 0.2,
              },
            },
          }}
          className="container px-4 md:px-6"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    },
                  },
                }}
                className="inline-block rounded-full bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 px-3 py-1 text-sm text-[#8a0faf]"
              >
                About Us
              </motion.div>
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    },
                  },
                }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900"
              >
                Our Story
              </motion.h2>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    },
                  },
                }}
                className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              >
                Discover who we are and what drives us to create exceptional
                experiences
              </motion.p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1,
                  },
                },
              }}
              className="space-y-4"
            >
              <motion.h3
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.2,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    },
                  },
                }}
                className="text-2xl font-bold text-gray-900"
              >
                Transforming Ideas Into Reality
              </motion.h3>
              <motion.p
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 0.5,
                    },
                  },
                }}
                className="text-gray-600"
              >
                DEAZY Tech Solutions Limited is a leading software development
                company specializing in cutting-edge digital solutions for
                businesses, institutions, and organizations. With a strong
                background in web and mobile app development, we provide custom,
                scalable, and high-performance solutions that drive success.
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delay: 0.4,
                      duration: 0.5,
                    },
                  },
                }}
                className="text-gray-600"
              >
                Our team consists of highly skilled developers, designers, and
                IT experts dedicated to delivering innovative technology
                solutions that enhance user experience and business efficiency.
              </motion.p>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.5,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    },
                  },
                }}
                className="flex flex-col gap-3 pt-4 sm:flex-row"
              >
                <Button
                  className="group bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white"
                  asChild
                >
                  <Link href="/contact">
                    Learn More
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1,
                  },
                },
              }}
              className="relative h-[350px] w-full md:h-[450px] overflow-hidden rounded-lg border border-gray-100"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute inset-0 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <motion.h3
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: 0.3,
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        },
                      },
                    }}
                    className="text-2xl font-bold mb-2 text-gray-900"
                  >
                    Our Vision
                  </motion.h3>
                  <motion.p
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          delay: 0.4,
                          duration: 0.5,
                        },
                      },
                    }}
                    className="text-gray-600 max-w-md"
                  >
                    To be a leading provider of innovative technology solutions
                    that empower businesses and organizations worldwide.
                  </motion.p>
                  <motion.h3
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: 0.5,
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        },
                      },
                    }}
                    className="text-2xl font-bold mb-2 mt-8 text-gray-900"
                  >
                    Our Mission
                  </motion.h3>
                  <motion.p
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          delay: 0.6,
                          duration: 0.5,
                        },
                      },
                    }}
                    className="text-gray-600 max-w-md"
                  >
                    To develop custom software solutions that improve efficiency
                    and productivity, provide secure, scalable, and
                    user-friendly digital platforms, and support organizations
                    in leveraging technology for growth and success.
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
      {/* Services Section - Clean Grid Layout */}
      <section className="py-24 bg-[#f8f9fd]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-4 text-[#ff096c] font-medium">
              Services we offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We deliver a full spectrum of digital solutions to help your
              business grow and succeed in a digital world.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
            {/* Software Development */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10"
                    stroke="#8a0faf"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 21h8M12 17v4"
                    stroke="#ff096c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">Software Development</h3>
              <p className="text-gray-600 text-base">
                Custom software, LMS, eCommerce, enterprise apps, and automation
                tools.
              </p>
            </div>
            {/* Mobile App Development */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="7"
                    y="2"
                    width="10"
                    height="20"
                    rx="2"
                    stroke="#8a0faf"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="18" r="1" fill="#ff096c" />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">Mobile App Development</h3>
              <p className="text-gray-600 text-base">
                Native and cross-platform apps for Android and iOS.
              </p>
            </div>
            {/* Web Development */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="16"
                    rx="2"
                    stroke="#8a0faf"
                    strokeWidth="2"
                  />
                  <path d="M3 8h18" stroke="#ff096c" strokeWidth="2" />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">Web Development</h3>
              <p className="text-gray-600 text-base">
                High-performance websites and web apps focused on security and
                UX.
              </p>
            </div>
            {/* IT Consulting & Digital Transformation */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 20v-6M12 4v2M4 12h2m12 0h2M7.76 7.76l1.42 1.42M16.24 16.24l1.42 1.42M7.76 16.24l1.42-1.42M16.24 7.76l1.42-1.42"
                    stroke="#8a0faf"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="12" r="3" fill="#ff096c" />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">
                IT Consulting & Digital Transformation
              </h3>
              <p className="text-gray-600 text-base">
                Expert advice and solutions to automate and optimize your
                operations.
              </p>
            </div>
            {/* Support & Maintenance */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 20v-4M8 20v-4M16 20v-4M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"
                    stroke="#8a0faf"
                    strokeWidth="2"
                  />
                  <rect
                    x="4"
                    y="8"
                    width="16"
                    height="12"
                    rx="2"
                    stroke="#ff096c"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">Support & Maintenance</h3>
              <p className="text-gray-600 text-base">
                Ongoing support, updates, and troubleshooting for smooth
                performance.
              </p>
            </div>
            {/* UI/UX Design */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="4"
                    stroke="#8a0faf"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="12" r="4" fill="#ff096c" />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">UI/UX Design</h3>
              <p className="text-gray-600 text-base">
                Intuitive and engaging user interface and experience design for
                web and mobile apps.
              </p>
            </div>
            {/* Cloud Solutions */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 18a4 4 0 1 1 0-8 5.5 5.5 0 0 1 10.9 1.5A4.5 4.5 0 1 1 18 18H6z"
                    stroke="#8a0faf"
                    strokeWidth="2"
                    fill="#ff096c"
                  />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">Cloud Solutions</h3>
              <p className="text-gray-600 text-base">
                Scalable cloud infrastructure, migration, and integration for
                modern businesses.
              </p>
            </div>
            {/* Digital Marketing */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M4 4h16v16H4z" stroke="#8a0faf" strokeWidth="2" />
                  <path d="M8 12h8M8 16h5" stroke="#ff096c" strokeWidth="2" />
                  <circle cx="8" cy="8" r="1.5" fill="#ff096c" />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">Digital Marketing</h3>
              <p className="text-gray-600 text-base">
                Online marketing, SEO, and social media strategies to grow your
                brand.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Tech Stack Section with Tabs */}
      <section className="py-10 bg-[#f8f9fd] border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-3 text-[#4e10d3] font-medium">
              Tech Stack
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Technologies We Use
            </h3>
          </div>
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {[
              { label: "Frontend", key: "frontend" },
              { label: "Backend", key: "backend" },
              { label: "Database", key: "database" },
              { label: "Tools", key: "tools" },
              { label: "Design", key: "design" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as keyof typeof logos)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-sm sm:text-base transition-all focus:outline-none ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white shadow-md"
                    : "bg-white text-[#4e10d3] border border-[#8a0faf] hover:bg-[#f3eafd]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto">
            {[...logos[activeTab]].map((logo: any, idx: number) => (
              <div
                key={logo.alt + idx}
                className="group relative bg-white rounded-lg p-1 sm:p-1.5 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-[#8a0faf]/20"
              >
                <div className="aspect-square w-12 sm:w-14 flex items-center justify-center p-1 sm:p-1.5 mx-auto">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110 ${
                      "extra" in logo ? logo.extra : ""
                    }`}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-center text-[10px] sm:text-xs text-gray-600 truncate">
                    {logo.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Development & Design Approach - Animated Timeline */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-4 text-[#8a0faf] font-medium">
              Our Process
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Development & Design Approach
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl">
              We follow a proven, collaborative process to deliver high-quality
              solutions.
            </p>
          </div>

          <DevelopmentTimeline
            data={[
              {
                title: "Requirements Analysis",
                icon: <FileCheck className="w-5 h-5 text-white" />,
                content: (
                  <p className="text-gray-600">
                    We begin by thoroughly understanding your needs, goals, and
                    vision to create a comprehensive project roadmap.
                  </p>
                ),
              },
              {
                title: "Design & Architecture",
                icon: <Code className="w-5 h-5 text-white" />,
                content: (
                  <p className="text-gray-600">
                    Our team designs scalable architecture and creates detailed
                    technical specifications for your project.
                  </p>
                ),
              },
              {
                title: "Development",
                icon: <GitBranch className="w-5 h-5 text-white" />,
                content: (
                  <p className="text-gray-600">
                    We implement your solution using modern technologies and
                    best practices, with regular code reviews and testing.
                  </p>
                ),
              },
              {
                title: "Testing & QA",
                icon: <Database className="w-5 h-5 text-white" />,
                content: (
                  <p className="text-gray-600">
                    Rigorous testing ensures your application is reliable,
                    secure, and performs optimally under various conditions.
                  </p>
                ),
              },
              {
                title: "Deployment",
                icon: <Rocket className="w-5 h-5 text-white" />,
                content: (
                  <p className="text-gray-600">
                    We handle the deployment process and ensure your application
                    runs smoothly in its intended environment.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>
      {/* Featured Projects Section */}
      <section className="py-20 bg-[#f8f9fd]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-4 text-[#8a0faf] font-medium">
              Our Work
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore some of our best work that demonstrates our expertise in
              delivering innovative digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* LMS Project */}
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                  alt="Learning Management System"
                  width={800}
                  height={450}
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white text-xl font-bold mb-2">
                    Learning Management System
                  </h4>
                  <p className="text-white/80 text-sm line-clamp-2">
                    Comprehensive LMS solution for educational institutions and
                    corporate training.
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#ff096c]/10 text-[#ff096c] rounded-full text-sm">
                    React
                  </span>
                  <span className="px-3 py-1 bg-[#8a0faf]/10 text-[#8a0faf] rounded-full text-sm">
                    Node.js
                  </span>
                  <span className="px-3 py-1 bg-[#4e10d3]/10 text-[#4e10d3] rounded-full text-sm">
                    MongoDB
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Live Project</span>
                  </div>
                  <Link
                    href="/projects/lms"
                    className="text-[#8a0faf] hover:text-[#ff096c] font-medium text-sm transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>

            {/* Enterprise Management Software */}
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                  alt="Enterprise Management Software"
                  width={800}
                  height={450}
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white text-xl font-bold mb-2">
                    Enterprise Management Software
                  </h4>
                  <p className="text-white/80 text-sm line-clamp-2">
                    Streamlined business operations with integrated management
                    solutions.
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#ff096c]/10 text-[#ff096c] rounded-full text-sm">
                    Vue.js
                  </span>
                  <span className="px-3 py-1 bg-[#8a0faf]/10 text-[#8a0faf] rounded-full text-sm">
                    Laravel
                  </span>
                  <span className="px-3 py-1 bg-[#4e10d3]/10 text-[#4e10d3] rounded-full text-sm">
                    PostgreSQL
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Live Project</span>
                  </div>
                  <Link
                    href="/projects/ems"
                    className="text-[#8a0faf] hover:text-[#ff096c] font-medium text-sm transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile App Development */}
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
                  alt="Mobile App Development"
                  width={800}
                  height={450}
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white text-xl font-bold mb-2">
                    Service Provider App
                  </h4>
                  <p className="text-white/80 text-sm line-clamp-2">
                    Mobile application connecting service providers with
                    customers.
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#ff096c]/10 text-[#ff096c] rounded-full text-sm">
                    React Native
                  </span>
                  <span className="px-3 py-1 bg-[#8a0faf]/10 text-[#8a0faf] rounded-full text-sm">
                    Firebase
                  </span>
                  <span className="px-3 py-1 bg-[#4e10d3]/10 text-[#4e10d3] rounded-full text-sm">
                    Node.js
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Live Project</span>
                  </div>
                  <Link
                    href="/projects/service-app"
                    className="text-[#8a0faf] hover:text-[#ff096c] font-medium text-sm transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <Link
              href="/recent-projects"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              View All Projects
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      {/* Hire Developers CTA Section */}
      <section className="py-20 bg-[#f8f9fd] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#ff096c]/5 to-[#8a0faf]/5 rounded-3xl p-12 lg:p-16 relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-full opacity-10 blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-[#8a0faf] to-[#ff096c] rounded-full opacity-10 blur-[100px] translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
              <div className="flex-1 space-y-6">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full">
                  <span className="bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-transparent bg-clip-text font-semibold">
                    🚀 Limited Time Offer
                  </span>
                </div>

                <h3 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  Hire the best developers and designers around!
                </h3>

                <div className="space-y-4">
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Get access to our elite team of developers and designers who
                    have delivered 100+ successful projects.
                  </p>

                  <div className="flex flex-wrap gap-6 items-center text-lg text-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#ff096c]"></div>
                      <span>Expert Team</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#8a0faf]"></div>
                      <span>Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#4e10d3]"></div>
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                <Link
                  href="/contact"
                  className="relative bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white px-12 py-6 rounded-2xl font-semibold text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md group/btn"
                >
                  <span className="relative z-10">Hire Top Developers</span>
                  <div className="absolute -right-3 -top-3">
                    <div className="w-6 h-6 bg-[#ff096c] rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute -left-3 -bottom-3">
                    <div className="w-6 h-6 bg-[#8a0faf] rounded-full animate-ping animation-delay-500"></div>
                  </div>
                </Link>

                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-[#ff096c] to-[#8a0faf]"
                      ></div>
                    ))}
                  </div>
                  <span className="font-medium">Join 100+ happy clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-8 sm:py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-3 sm:mb-4 text-[#8a0faf] text-sm sm:text-base font-medium"
            >
              Our Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
            >
              What We Offer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto"
            >
              We provide comprehensive solutions to help your business thrive in
              the digital age
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: <Code className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff096c]" />,
                title: "Custom Development",
                description:
                  "Tailored solutions built specifically for your business needs",
              },
              {
                icon: (
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 text-[#8a0faf]" />
                ),
                title: "Cloud Solutions",
                description:
                  "Scalable and secure cloud infrastructure for your applications",
              },
              {
                icon: (
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff096c]" />
                ),
                title: "Digital Transformation",
                description:
                  "Modernize your business with cutting-edge technology",
              },
              {
                icon: (
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#8a0faf]" />
                ),
                title: "Enterprise Solutions",
                description:
                  "Robust systems designed for large-scale operations",
              },
              {
                icon: (
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff096c]" />
                ),
                title: "Strategic Consulting",
                description: "Expert guidance for your technology initiatives",
              },
              {
                icon: (
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#8a0faf]" />
                ),
                title: "Quality Assurance",
                description:
                  "Comprehensive testing and quality control processes",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
