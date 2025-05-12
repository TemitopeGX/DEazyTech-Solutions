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
  Smartphone,
  Globe,
  Cloud,
  Shield,
  BarChart,
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
import { projectsApi } from "@/lib/api";
import { toast } from "react-hot-toast";
import { ImageViewer } from "@/components/ui/image-viewer";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
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
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white pt-24">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(138,15,175,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,9,108,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Floating elements - Adjusted positions */}
        <div className="absolute top-[70%] left-10 w-64 h-64 rounded-full bg-rose/5 mix-blend-multiply filter blur-xl animate-float" />
        <div className="absolute top-20 -right-20 w-96 h-96 rounded-full bg-mauveine/5 mix-blend-multiply filter blur-xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-chrysler-blue/5 mix-blend-multiply filter blur-xl animate-float-slow" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20">
          {/* Split layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-rose/10 to-mauveine/10 border border-rose/20 text-rose font-medium">
                  {badge}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  {title}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose via-mauveine to-chrysler-blue">
                    {subtitle}
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-xl">
                  {description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-rose to-mauveine text-white font-medium text-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-mauveine to-chrysler-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white border border-rose/20 text-gray-800 font-medium text-lg hover:bg-rose/5 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Learn More
                </Link>
              </motion.div>

              {/* Tech stack pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                {["React", "Next.js", "Node.js", "TypeScript", "AWS"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 text-sm hover:border-rose/20 hover:text-rose hover:shadow-sm transition-all duration-300"
                    >
                      {tech}
                    </span>
                  )
                )}
              </motion.div>
            </div>

            {/* Right column - Visual elements */}
            <div className="relative lg:h-[600px] hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative w-full h-full"
              >
                {/* Main hero image */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose/10 to-mauveine/10 mix-blend-multiply z-10" />
                  <Image
                    src="/images/hero-image.jpg"
                    alt="Digital Innovation"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>

                {/* Decorative elements - Adjusted positions */}
                <div className="absolute -top-20 -right-20 w-64 h-64">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose/20 to-mauveine/20 animate-float blur-2xl" />
                </div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-mauveine/20 to-chrysler-blue/20 animate-float-delayed blur-2xl" />
                </div>

                {/* Floating code snippets - Adjusted z-index and position */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-4 right-4 p-4 rounded-lg bg-white/90 border border-rose/20 shadow-lg transform -rotate-6 backdrop-blur-sm z-30"
                >
                  <pre className="text-rose text-sm">
                    <code>{`const future = await deazy.transform(
  yourIdea,
  innovation
);`}</code>
                  </pre>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute bottom-4 left-4 p-4 rounded-lg bg-white/90 border border-mauveine/20 shadow-lg transform rotate-3 backdrop-blur-sm z-30"
                >
                  <pre className="text-mauveine text-sm">
                    <code>{`export const success = {
  innovation: 100,
  satisfaction: "∞"
};`}</code>
                  </pre>
                </motion.div>

                {/* Tech dots overlay - Adjusted z-index */}
                <div className="absolute inset-0 z-20">
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-4 p-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.1,
                          ease: "easeOut",
                        }}
                        className="w-2 h-2 rounded-full bg-white/50 backdrop-blur-sm"
                        style={{
                          gridColumn: Math.floor(Math.random() * 8) + 1,
                          gridRow: Math.floor(Math.random() * 8) + 1,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 pt-12"
          >
            {[
              { number: "100+", label: "Projects Delivered" },
              { number: "50+", label: "Happy Clients" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl font-bold bg-gradient-to-r from-rose to-mauveine text-transparent bg-clip-text mb-2 transform transition-transform duration-300 group-hover:scale-110">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const HomePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsApi.getAll();
      // Handle paginated response and limit to 3 projects
      const projectsArray = response.data || [];
      setProjects(projectsArray.slice(0, 3)); // Only take the first 3 projects
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects");
      setLoading(false);
    }
  };

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
      {/* Trusted By Companies Section - Modern Light Theme */}
      <section className="py-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff,#f8f9ff,#ffffff)] opacity-70"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mauveine/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-24 left-1/3 w-96 h-96 bg-chrysler-blue/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-col items-center"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-rose/10 via-mauveine/10 to-chrysler-blue/10 text-rose font-medium text-sm mb-6">
                <svg
                  className="w-4 h-4 mr-2 text-rose"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Trusted by leading companies
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Empowering{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose to-mauveine">
                  Global Brands
                </span>
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-rose to-mauveine rounded-full mb-6"></div>
            </motion.div>
          </div>

          {/* Infinite Scroll Logos - Two Rows */}
          <div className="relative max-w-6xl mx-auto">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

            {/* First Row */}
            <div className="flex space-x-12 mb-8 animate-scroll-left">
              {[
                {
                  name: "Google",
                  logo: "https://www.vectorlogo.zone/logos/google/google-ar21.svg",
                },
                {
                  name: "Microsoft",
                  logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg",
                },
                {
                  name: "Slack",
                  logo: "https://www.vectorlogo.zone/logos/slack/slack-ar21.svg",
                },
                {
                  name: "IBM",
                  logo: "https://www.vectorlogo.zone/logos/ibm/ibm-ar21.svg",
                },
                {
                  name: "Amazon",
                  logo: "https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg",
                },
                // Duplicate for seamless loop
                {
                  name: "Google",
                  logo: "https://www.vectorlogo.zone/logos/google/google-ar21.svg",
                },
                {
                  name: "Microsoft",
                  logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg",
                },
                {
                  name: "Slack",
                  logo: "https://www.vectorlogo.zone/logos/slack/slack-ar21.svg",
                },
                {
                  name: "IBM",
                  logo: "https://www.vectorlogo.zone/logos/ibm/ibm-ar21.svg",
                },
                {
                  name: "Amazon",
                  logo: "https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg",
                },
              ].map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex-none w-48 h-24 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center group hover:shadow-md hover:border-rose/20 transition-all duration-300"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={120}
                    height={40}
                    className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Second Row - Reverse Direction */}
            <div className="flex space-x-12 animate-scroll-right">
              {[
                {
                  name: "Apple",
                  logo: "https://www.vectorlogo.zone/logos/apple/apple-ar21.svg",
                },
                {
                  name: "Meta",
                  logo: "https://www.vectorlogo.zone/logos/meta/meta-ar21.svg",
                },
                {
                  name: "Netflix",
                  logo: "https://www.vectorlogo.zone/logos/netflix/netflix-ar21.svg",
                },
                {
                  name: "Tesla",
                  logo: "https://www.vectorlogo.zone/logos/tesla/tesla-ar21.svg",
                },
                {
                  name: "Oracle",
                  logo: "https://www.vectorlogo.zone/logos/oracle/oracle-ar21.svg",
                },
                // Duplicate for seamless loop
                {
                  name: "Apple",
                  logo: "https://www.vectorlogo.zone/logos/apple/apple-ar21.svg",
                },
                {
                  name: "Meta",
                  logo: "https://www.vectorlogo.zone/logos/meta/meta-ar21.svg",
                },
                {
                  name: "Netflix",
                  logo: "https://www.vectorlogo.zone/logos/netflix/netflix-ar21.svg",
                },
                {
                  name: "Tesla",
                  logo: "https://www.vectorlogo.zone/logos/tesla/tesla-ar21.svg",
                },
                {
                  name: "Oracle",
                  logo: "https://www.vectorlogo.zone/logos/oracle/oracle-ar21.svg",
                },
              ].map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex-none w-48 h-24 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center group hover:shadow-md hover:border-mauveine/20 transition-all duration-300"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={120}
                    height={40}
                    className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* About Us Section - Modern Design */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff,#f8f9ff,#ffffff)]"></div>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-rose/[0.02] to-transparent"></div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-mauveine/5 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-rose/10 to-mauveine/10 text-rose font-medium text-sm">
                  About Us
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Transforming Ideas into{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose to-mauveine">
                    Digital Reality
                  </span>
                </h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-rose to-mauveine rounded-full"></div>
              </div>

              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  DEAZY Tech Solutions is a leading software development company
                  specializing in cutting-edge digital solutions. With a strong
                  foundation in innovation and technical excellence, we help
                  businesses transform their digital presence.
                </p>
                <p>
                  Our team of expert developers, designers, and IT professionals
                  is dedicated to delivering high-quality, scalable solutions
                  that drive success and growth for our clients.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {[
                  { number: "100+", label: "Projects" },
                  { number: "50+", label: "Clients" },
                  { number: "95%", label: "Success" },
                  { number: "24/7", label: "Support" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold bg-gradient-to-r from-rose to-mauveine text-transparent bg-clip-text">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Code className="w-5 h-5" />,
                    title: "Custom Development",
                    description: "Tailored solutions for your unique needs",
                  },
                  {
                    icon: <Users className="w-5 h-5" />,
                    title: "Expert Team",
                    description: "Skilled professionals at your service",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-rose/10 to-mauveine/10 flex items-center justify-center text-rose group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-rose to-mauveine text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-rose/20 text-gray-900 font-medium hover:bg-rose/5 transition-all duration-300"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative lg:h-[600px] hidden lg:block"
            >
              {/* Main Image Container */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute -top-12 -right-12 w-64 h-64">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose/20 to-mauveine/20 animate-blob"></div>
                </div>
                <div className="absolute -bottom-12 -left-12 w-64 h-64">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-mauveine/20 to-chrysler-blue/20 animate-blob animation-delay-2000"></div>
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_0.1em,transparent_0.1em),linear-gradient(90deg,rgba(255,255,255,0.2)_0.1em,transparent_0.1em)] bg-[size:2em_2em]"></div>

                {/* Main Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose/10 to-mauveine/10"></div>
                <Image
                  src="/images/about.jpg"
                  alt="About DEAZY Tech"
                  fill
                  className="object-cover object-center rounded-2xl"
                />

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-10 left-10 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg transform -rotate-6"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose"></div>
                    <div className="text-sm font-medium text-gray-800">
                      Innovation
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg transform rotate-6"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-mauveine"></div>
                    <div className="text-sm font-medium text-gray-800">
                      Excellence
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Services Section - Modern Design */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-mauveine/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-chrysler-blue/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-rose/10 via-mauveine/10 to-chrysler-blue/10 text-rose font-medium text-sm mb-6">
                Our Services
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Transforming Businesses with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose to-mauveine">
                  Digital Innovation
                </span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-rose to-mauveine rounded-full mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We deliver comprehensive digital solutions to help your business
                grow and succeed in the modern tech landscape
              </p>
            </motion.div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: <Code className="w-6 h-6" />,
                title: "Software Development",
                description:
                  "Custom software solutions, web applications, and enterprise systems tailored to your needs.",
                features: [
                  "Custom Development",
                  "API Integration",
                  "Legacy System Updates",
                ],
                gradient: "from-rose to-mauveine",
              },
              {
                icon: <Smartphone className="w-6 h-6" />,
                title: "Mobile App Development",
                description:
                  "Native and cross-platform mobile applications for iOS and Android platforms.",
                features: ["iOS & Android", "React Native", "Flutter"],
                gradient: "from-mauveine to-chrysler-blue",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Web Development",
                description:
                  "Modern, responsive websites and progressive web applications.",
                features: ["React & Next.js", "E-commerce", "CMS Integration"],
                gradient: "from-chrysler-blue to-rose",
              },
              {
                icon: <Cloud className="w-6 h-6" />,
                title: "Cloud Solutions",
                description:
                  "Cloud infrastructure setup, migration, and management services.",
                features: ["AWS", "Azure", "Google Cloud"],
                gradient: "from-rose to-chrysler-blue",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Cybersecurity",
                description:
                  "Comprehensive security solutions to protect your digital assets.",
                features: [
                  "Security Audit",
                  "Penetration Testing",
                  "Compliance",
                ],
                gradient: "from-mauveine to-rose",
              },
              {
                icon: <BarChart className="w-6 h-6" />,
                title: "Digital Consulting",
                description:
                  "Strategic technology consulting and digital transformation services.",
                features: [
                  "Tech Strategy",
                  "Process Optimization",
                  "Digital Roadmap",
                ],
                gradient: "from-chrysler-blue to-mauveine",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
              >
                {/* Service Card Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.gradient} p-3 text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {service.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} mr-2`}
                        ></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <div className="mt-8">
                    <Link
                      href={`/services/${service.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="inline-flex items-center text-rose hover:text-mauveine transition-colors duration-300"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Hover Effect Background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose/5 to-mauveine/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-rose to-mauveine text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Tech Stack Section with Tabs */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff,#f8f9ff,#ffffff)]"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-mauveine/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-chrysler-blue/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-rose/10 via-mauveine/10 to-chrysler-blue/10 text-rose font-medium text-sm mb-6">
                Tech Stack
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Technologies We{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose to-mauveine">
                  Master
                </span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-rose to-mauveine rounded-full mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We leverage cutting-edge technologies to build scalable and
                innovative solutions
              </p>
            </motion.div>
          </div>

          {/* Tabs Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {[
              {
                label: "Frontend",
                key: "frontend",
                icon: <Code className="w-4 h-4" />,
              },
              {
                label: "Backend",
                key: "backend",
                icon: <Database className="w-4 h-4" />,
              },
              {
                label: "Database",
                key: "database",
                icon: <Database className="w-4 h-4" />,
              },
              {
                label: "Tools",
                key: "tools",
                icon: <Laptop className="w-4 h-4" />,
              },
              {
                label: "Design",
                key: "design",
                icon: <Zap className="w-4 h-4" />,
              },
            ].map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as keyof typeof logos)}
                className={cn(
                  "group flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300",
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-rose to-mauveine text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:text-rose border border-gray-200 hover:border-rose/20 hover:shadow-md"
                )}
                whileHover={{ scale: activeTab === tab.key ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className={cn(
                    "transition-colors duration-300",
                    activeTab !== tab.key && "group-hover:text-rose"
                  )}
                >
                  {tab.icon}
                </span>
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Tech Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-5 gap-4 max-w-lg mx-auto"
          >
            <AnimatePresence mode="wait">
              {logos[activeTab].map((logo: LogoType, idx: number) => (
                <motion.div
                  key={logo.alt + idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.3,
                    delay: idx * 0.05,
                    ease: "easeOut",
                  }}
                  className="group relative bg-white rounded-md p-0.5 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative w-full aspect-square flex items-center justify-center">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-rose/5 to-mauveine/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Logo image */}
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={cn(
                        "relative z-10 w-10 h-10 object-contain transition-all duration-300 group-hover:scale-110",
                        logo.extra
                      )}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
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
            <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-4">
              Explore some of our best work that demonstrates our expertise in
              delivering innovative digital solutions.
            </p>
            <Link
              href="/recent-projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white rounded-full font-medium hover:opacity-90 transition-all duration-300 group"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No projects found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className="aspect-w-16 aspect-h-9 relative overflow-hidden cursor-pointer"
                    onClick={() =>
                      project.image &&
                      setSelectedImage({
                        src: `http://localhost:8000/storage/${project.image}`,
                        alt: project.title,
                      })
                    }
                  >
                    {project.image ? (
                      <Image
                        src={`http://localhost:8000/storage/${project.image}`}
                        alt={project.title}
                        width={800}
                        height={450}
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h4>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#8a0faf] hover:text-[#ff096c] transition-colors"
                    >
                      View Project
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
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

      {/* Image Viewer Modal */}
      <ImageViewer
        src={selectedImage?.src || ""}
        alt={selectedImage?.alt || ""}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />

      {/* Add required animations to global styles */}
      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 1.5rem));
          }
        }
        @keyframes scroll-right {
          0% {
            transform: translateX(calc(-50% - 1.5rem));
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default HomePage;
