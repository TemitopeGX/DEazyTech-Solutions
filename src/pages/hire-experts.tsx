import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Globe2,
  Database,
  Rocket,
  CheckCircle,
  Mail,
  Phone,
  Star,
  Linkedin,
  Github,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

interface Expert {
  id: number;
  name: string;
  role: string;
  image: string;
  skills: string[];
  experience: string;
  projects: number;
  description: string;
  linkedin?: string;
  github?: string;
}

interface ExpertiseArea {
  icon: any;
  title: string;
  description: string;
  skills: string[];
}

const HireExpertsPage: React.FC = () => {
  const experts: Expert[] = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Senior Software Developer",
      image: "/images/experts/expert1.jpg",
      skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
      experience: "8+ years",
      projects: 50,
      description:
        "Full-stack developer specializing in scalable web applications and cloud architecture.",
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Mobile Development Lead",
      image: "/images/experts/expert2.jpg",
      skills: ["React Native", "iOS", "Android", "Flutter", "Firebase"],
      experience: "6+ years",
      projects: 35,
      description:
        "Mobile app expert with experience in cross-platform and native development.",
      linkedin: "https://linkedin.com/in/sarahchen",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Solutions Architect",
      image: "/images/experts/expert3.jpg",
      skills: [
        "System Design",
        "Cloud Architecture",
        "DevOps",
        "Azure",
        "Kubernetes",
      ],
      experience: "10+ years",
      projects: 75,
      description:
        "Enterprise solutions architect specializing in cloud infrastructure and scalable systems.",
      linkedin: "https://linkedin.com/in/michaelbrown",
      github: "https://github.com/michaelbrown",
    },
  ];

  const expertiseAreas: ExpertiseArea[] = [
    {
      icon: Code2,
      title: "Software Development",
      description:
        "Custom software solutions that enhance business efficiency and productivity.",
      skills: [
        "Learning Management Systems",
        "Enterprise Applications",
        "eCommerce Platforms",
        "Custom Software",
        "API Integration",
      ],
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile applications for Android and iOS.",
      skills: [
        "iOS Development",
        "Android Development",
        "React Native",
        "Flutter",
        "Mobile UI/UX",
      ],
    },
    {
      icon: Globe2,
      title: "Web Development",
      description: "High-performance websites and web applications.",
      skills: ["React.js", "Next.js", "Node.js", "PHP/Laravel", "WordPress"],
    },
    {
      icon: Database,
      title: "IT Consulting",
      description: "Expert technology advice and digital transformation.",
      skills: [
        "Digital Strategy",
        "Process Automation",
        "System Integration",
        "Tech Architecture",
        "Cloud Solutions",
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Our Experts - DEAZY Tech Solutions</title>
        <meta
          name="description"
          content="Meet our team of expert developers and consultants at DEAZY Tech Solutions."
        />
      </Head>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden pt-20">
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
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff096c]/[0.05] via-[#8a0faf]/[0.05] to-[#ff096c]/[0.05] blur-3xl" />
          </motion.div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#ff096c05_1px,transparent_1px),linear-gradient(-45deg,#8a0faf05_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 mb-6"
              >
                <Sparkles className="w-4 h-4 text-[#ff096c]" />
                <span className="text-sm font-medium text-[#8a0faf]">
                  Expert Team at Your Service
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
              >
                <span className="text-foreground">Meet Our</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                  Expert Team
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto"
              >
                Work with our highly skilled professionals who bring years of
                experience in delivering successful technology solutions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#ff096c] to-[#8a0faf] hover:opacity-90 text-white gap-2 group"
                  asChild
                >
                  <Link href="/start-project">
                    Start Your Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#ff096c]/20 hover:border-[#8a0faf]/40"
                  asChild
                >
                  <Link href="#experts">Meet the Team</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "5+", label: "Years of Experience" },
                { value: "100+", label: "Projects Completed" },
                { value: "50+", label: "Happy Clients" },
                { value: "24/7", label: "Support Available" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="p-6 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-[#ff096c]/50 transition-all duration-300">
                    <div className="text-[#ff096c] text-4xl font-bold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experts Section */}
        <section
          id="experts"
          className="py-20 relative overflow-hidden bg-slate-50"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                  Meet Our Experts
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our team of skilled professionals brings diverse expertise and
                proven track records in delivering exceptional solutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experts.map((expert, index) => (
                <motion.div
                  key={expert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="p-6 rounded-2xl bg-background border border-border/50 shadow-lg hover:shadow-xl hover:border-[#ff096c]/50 transition-all duration-300">
                    <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
                      <Image
                        src={expert.image}
                        alt={expert.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {expert.name}
                    </h3>
                    <p className="text-[#ff096c] font-semibold mb-3">
                      {expert.role}
                    </p>
                    <p className="text-muted-foreground mb-4">
                      {expert.description}
                    </p>
                    <div className="flex items-center mb-4">
                      <Star className="text-yellow-400 w-4 h-4" />
                      <span className="ml-2 text-muted-foreground">
                        {expert.experience}
                      </span>
                      <span className="mx-2 text-muted-foreground/30">•</span>
                      <span className="text-muted-foreground">
                        {expert.projects}+ Projects
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {expert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-50 text-muted-foreground rounded-full text-sm border border-border/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      {expert.linkedin && (
                        <a
                          href={expert.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-[#ff096c] transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {expert.github && (
                        <a
                          href={expert.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-[#ff096c] transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Areas Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                  Areas of Expertise
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We specialize in a wide range of technologies and solutions to
                meet your business needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="p-8 rounded-2xl bg-background border border-border/50 shadow-lg hover:shadow-xl hover:border-[#ff096c]/50 transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff096c] to-[#8a0faf] p-2.5 flex items-center justify-center">
                        <area.icon className="w-full h-full text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground ml-4">
                        {area.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {area.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {area.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-50 text-muted-foreground rounded-full text-sm border border-border/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-4xl font-bold">
                  <span className="text-foreground">Ready to</span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                    Start Your Project?
                  </span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Let's discuss how our experts can help transform your business
                  with custom technology solutions.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#ff096c] to-[#8a0faf] hover:opacity-90 text-white gap-2 group"
                    asChild
                  >
                    <Link href="/start-project">
                      Start Your Project
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#ff096c]/20 hover:border-[#8a0faf]/40"
                    asChild
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center space-y-8"
            >
              <h2 className="text-4xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                  Get in Touch
                </span>
              </h2>
              <p className="text-muted-foreground">
                Contact us directly through any of these channels
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                <Link
                  href="mailto:contact@deazytech.com"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-[#ff096c] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>contact@deazytech.com</span>
                </Link>
                <Link
                  href="tel:+1234567890"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-[#ff096c] transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+123 456 7890</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HireExpertsPage;
