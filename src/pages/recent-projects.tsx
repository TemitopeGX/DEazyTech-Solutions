import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { ArrowLeft, Circle, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  features: string[];
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

const projects: Project[] = [
  {
    id: 1,
    title: "Learning Management System",
    description:
      "A comprehensive LMS platform with live classes, assessments, and student tracking.",
    image: "/images/projects/lms-preview.jpg",
    tags: ["Next.js", "React", "Node.js", "MongoDB"],
    link: "#",
    features: [
      "Interactive Live Classes",
      "Automated Assessments",
      "Student Progress Tracking",
      "Resource Management",
      "Real-time Analytics",
    ],
    gradient: "from-[#ff096c] to-[#8a0faf]",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description:
      "Modern e-commerce solution with real-time inventory and payment processing.",
    image: "/images/projects/ecommerce.jpg",
    tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
    link: "#",
    features: [
      "Real-time Inventory",
      "Secure Payments",
      "Order Management",
      "Customer Analytics",
      "Mobile Responsive",
    ],
    gradient: "from-[#8a0faf] to-[#4e10d3]",
  },
  {
    id: 3,
    title: "Banking Application",
    description:
      "Secure banking platform with real-time transactions and account management.",
    image: "/images/projects/banking.jpg",
    tags: ["React Native", "Node.js", "AWS", "MongoDB"],
    link: "#",
    features: [
      "Secure Transactions",
      "Account Management",
      "Mobile Banking",
      "Bill Payments",
      "Transaction History",
    ],
    gradient: "from-[#4e10d3] to-[#ff096c]",
  },
  {
    id: 4,
    title: "IoT Dashboard",
    description: "Real-time IoT device monitoring and control dashboard.",
    image: "/images/projects/iot.jpg",
    tags: ["React", "WebSocket", "Node.js", "InfluxDB"],
    link: "#",
    features: [
      "Real-time Monitoring",
      "Device Control",
      "Data Visualization",
      "Alert Management",
      "Performance Analytics",
    ],
    gradient: "from-[#ff096c] to-[#8a0faf]",
  },
];

const RecentProjects = () => {
  return (
    <>
      <Head>
        <title>Recent Projects - DEAZY Tech Solutions</title>
        <meta
          name="description"
          content="Explore our latest projects and see how we help businesses transform their digital presence."
        />
      </Head>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden bg-background">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff096c]/20 via-[#8a0faf]/20 to-[#ff096c]/20 opacity-20 blur-3xl" />

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
          </div>

          <div className="relative z-10 container mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-200 hover:text-white mb-8 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/20 backdrop-blur-md border border-border mb-8"
              >
                <Circle className="h-2 w-2 fill-[#ff096c]" />
                <span className="text-sm text-foreground/80 tracking-wide">
                  Our Projects
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                  Our Latest
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                  Success Stories
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                Explore our latest work and see how we help businesses transform
                their digital presence through innovative solutions.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="relative h-64">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div
                          className={`inline-block px-3 py-1 rounded-full text-xs text-white bg-gradient-to-r ${project.gradient} mb-2`}
                        >
                          Featured Project
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="space-y-2 mb-6">
                        {project.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center text-gray-700 group/feature"
                          >
                            <div className="mr-2 text-[#ff096c] transition-transform duration-300 group-hover/feature:scale-110">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Link
                        href={project.link}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white rounded-full font-medium hover:opacity-90 transition-all duration-300 group"
                      >
                        View Project Details
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#15181e] to-[#4e10d3] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Ready to Transform Your Business?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-200 mb-8"
              >
                Let's discuss how we can help you achieve your digital
                transformation goals.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-full text-white font-semibold hover:opacity-90 transition-all duration-300 group"
                >
                  Start Your Project
                  <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RecentProjects;
