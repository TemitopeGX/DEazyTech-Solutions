import React, { useState, useEffect } from "react";
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
import { projectsApi } from "@/lib/api";
import { toast } from "react-hot-toast";
import { ImageViewer } from "@/components/ui/image-viewer";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

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

const ServicesPage: React.FC = () => {
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
                className="text-xl text-gray-600 max-w-2xl mx-auto mb-4"
              >
                Take a look at some of our successful projects that showcase our
                expertise in delivering high-quality solutions.
              </motion.p>
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
                      <div
                        className="relative h-48 cursor-pointer"
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
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="inline-block px-3 py-1 rounded-full text-xs text-white bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                            Featured Project
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {project.title}
                        </h3>
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
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white rounded-full font-medium hover:opacity-90 transition-all duration-300 group"
                        >
                          View Project
                          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#f8f9fd] relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-[#15181e] to-[#4e10d3] rounded-3xl p-12 lg:p-16 relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-full opacity-10 blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-[#8a0faf] to-[#ff096c] rounded-full opacity-10 blur-[100px] translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                <div className="flex-1 space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                      <span className="text-[#ff096c] font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#ff096c] animate-pulse"></span>
                        Start Your Journey
                      </span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                      Ready to Transform Your Business?
                    </h2>

                    <p className="text-xl text-gray-200 leading-relaxed">
                      Let's discuss how we can help you achieve your digital
                      transformation goals and take your business to the next
                      level.
                    </p>

                    <div className="flex flex-wrap gap-6 items-center text-lg text-gray-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#ff096c]" />
                        <span>Free Consultation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#ff096c]" />
                        <span>Expert Team</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-[#ff096c]" />
                        <span>Quick Response</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center gap-8"
                >
                  <Link
                    href="/contact"
                    className="relative bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white px-12 py-6 rounded-2xl font-semibold text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md group/btn"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Project
                      <ArrowRight className="h-5 w-5 transform group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute -right-3 -top-3">
                      <div className="w-6 h-6 bg-[#ff096c] rounded-full animate-ping"></div>
                    </div>
                    <div className="absolute -left-3 -bottom-3">
                      <div className="w-6 h-6 bg-[#8a0faf] rounded-full animate-ping animation-delay-500"></div>
                    </div>
                  </Link>

                  <div className="flex items-center gap-4 text-gray-200">
                    <div className="flex -space-x-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-[#4e10d3] bg-gradient-to-r from-[#ff096c] to-[#8a0faf]"
                        ></div>
                      ))}
                    </div>
                    <span className="font-medium">Join 100+ happy clients</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Image Viewer Modal */}
      <ImageViewer
        src={selectedImage?.src || ""}
        alt={selectedImage?.alt || ""}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
};

export default ServicesPage;
