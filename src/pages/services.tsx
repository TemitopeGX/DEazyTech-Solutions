import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  Code,
  Smartphone,
  Globe,
  Wrench,
  Cog,
  Headphones,
  GraduationCap,
  ShoppingCart,
  Building2,
  Rocket,
  CheckCircle,
  ArrowRight,
  Circle,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

interface Project {
  title: string;
  type: string;
  description: string;
  image: string;
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

const ServicesPage: React.FC = () => {
  const services: Service[] = [
    {
      icon: Code,
      title: "Software Development",
      description:
        "Custom software solutions that enhance business efficiency and productivity.",
      features: [
        "Learning Management Systems (LMS)",
        "eCommerce Platforms",
        "Enterprise Applications",
        "Automation Tools",
        "Custom Software Solutions",
      ],
      gradient: "from-[#ff096c] to-[#8a0faf]",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications for Android and iOS.",
      features: [
        "Native iOS Development",
        "Native Android Development",
        "Cross-Platform Solutions",
        "Mobile App UI/UX Design",
        "App Maintenance & Updates",
      ],
      gradient: "from-[#8a0faf] to-[#4e10d3]",
    },
    {
      icon: Globe,
      title: "Web Development",
      description:
        "High-performance websites and web applications focused on security and user experience.",
      features: [
        "Responsive Web Design",
        "Progressive Web Apps",
        "E-commerce Websites",
        "Content Management Systems",
        "Web Application Development",
      ],
      gradient: "from-[#4e10d3] to-[#ff096c]",
    },
    {
      icon: Wrench,
      title: "IT Consulting & Digital Transformation",
      description:
        "Expert advice and technology-driven solutions for business optimization.",
      features: [
        "Technology Strategy",
        "Digital Transformation",
        "Process Automation",
        "System Integration",
        "IT Infrastructure Planning",
      ],
      gradient: "from-[#ff096c] to-[#8a0faf]",
    },
  ];

  const projects: Project[] = [
    {
      title: "Learning Management System",
      type: "Education Technology",
      description:
        "A comprehensive LMS solution for educational institutions and corporate training programs.",
      image: "/images/projects/lms.jpg",
      features: [
        "Web Dashboard",
        "Tutor & Student Apps",
        "Live Class Integration",
        "Automated Assessments",
        "Payment Processing",
      ],
      gradient: "from-[#ff096c] to-[#8a0faf]",
    },
    {
      title: "Enterprise Management Software",
      type: "Business Solutions",
      description:
        "Custom enterprise software for streamlined business operations and management.",
      image: "/images/projects/enterprise.jpg",
      features: [
        "Resource Planning",
        "Task Management",
        "Analytics Dashboard",
        "Team Collaboration",
        "Process Automation",
      ],
      gradient: "from-[#8a0faf] to-[#4e10d3]",
    },
    {
      title: "E-commerce Platform",
      type: "Digital Commerce",
      description:
        "Feature-rich e-commerce solution for online retail businesses.",
      image: "/images/projects/ecommerce.jpg",
      features: [
        "Product Management",
        "Secure Payments",
        "Inventory System",
        "Customer Analytics",
        "Mobile Commerce",
      ],
      gradient: "from-[#4e10d3] to-[#ff096c]",
    },
  ];

  return (
    <>
      <Head>
        <title>Our Services - DEAZY Tech Solutions</title>
        <meta
          name="description"
          content="Explore our comprehensive range of technology solutions and services at DEAZY Tech Solutions."
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/20 backdrop-blur-md border border-border mb-8"
              >
                <Circle className="h-2 w-2 fill-[#ff096c]" />
                <span className="text-sm text-foreground/80 tracking-wide">
                  Our Services
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                  Innovative Solutions
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                  For Your Business
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                We provide comprehensive software solutions to help businesses
                automate, optimize, and grow in the digital age.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-4 text-[#8a0faf] font-medium"
              >
                What We Offer
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
              >
                Our Services
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                    <div className="mb-6">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
                      >
                        <service.icon className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-gray-700 group/feature"
                        >
                          <div className="mr-3 text-[#ff096c] transition-transform duration-300 group-hover/feature:scale-110">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-4 text-[#8a0faf] font-medium"
              >
                Our Work
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
              >
                Featured Projects
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                Take a look at some of our successful projects that showcase our
                expertise in delivering high-quality solutions.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="relative h-48">
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
                          {project.type}
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">
                        {project.description}
                      </p>
                      <div className="space-y-2">
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

export default ServicesPage;
