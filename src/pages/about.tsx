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

const AboutPage: React.FC = () => {
  const achievements: Achievement[] = [
    {
      icon: Users,
      title: "Happy Clients",
      value: "50+",
      color: "from-[#ff096c] to-[#8a0faf]",
    },
    {
      icon: Award,
      title: "Projects Completed",
      value: "100+",
      color: "from-[#8a0faf] to-[#4e10d3]",
    },
    {
      icon: Code,
      title: "Years Experience",
      value: "5+",
      color: "from-[#4e10d3] to-[#ff096c]",
    },
    {
      icon: Building2,
      title: "Team Members",
      value: "20+",
      color: "from-[#ff096c] to-[#8a0faf]",
    },
  ];

  const values: Value[] = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We constantly explore new technologies and solutions to stay ahead.",
      gradient: "from-[#ff096c] to-[#8a0faf]",
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for the highest quality in every project we undertake.",
      gradient: "from-[#8a0faf] to-[#4e10d3]",
    },
    {
      icon: Handshake,
      title: "Partnership",
      description:
        "We build long-term relationships with our clients based on trust.",
      gradient: "from-[#4e10d3] to-[#ff096c]",
    },
  ];

  return (
    <>
      <Head>
        <title>About Us - DEAZY Tech Solutions</title>
        <meta
          name="description"
          content="Learn about DEAZY Tech Solutions - a leading software development company specializing in cutting-edge digital solutions for businesses and organizations."
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
                  About DEAZY Tech
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                  Transforming Ideas
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                  Into Reality
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                A leading software development company specializing in
                cutting-edge digital solutions for businesses, institutions, and
                organizations worldwide.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="mb-4">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${achievement.color} flex items-center justify-center`}
                      >
                        <achievement.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-[#ff096c] to-[#8a0faf] bg-clip-text text-transparent mb-2">
                      {achievement.value}
                    </h3>
                    <p className="text-gray-600">{achievement.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-4 text-[#8a0faf] font-medium"
                >
                  Our Journey
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                >
                  Our Story
                </motion.h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src="/images/about-story.jpg"
                      alt="Our Story"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-lg font-semibold">
                      Building the future of technology
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <p className="text-gray-600 text-lg">
                    DEAZY Tech Solutions began with a vision to transform how
                    businesses interact with technology. Founded by industry
                    veterans with decades of combined experience, we've grown
                    from a small team of passionate developers to a full-service
                    digital solutions provider.
                  </p>
                  <p className="text-gray-600 text-lg">
                    Our journey has been marked by continuous innovation,
                    successful project deliveries, and strong client
                    relationships. We've helped businesses across various
                    sectors modernize their operations and achieve digital
                    excellence.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      className="bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white"
                      size="lg"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-4 text-[#8a0faf] font-medium"
              >
                Our Core Values
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
              >
                What Drives Us
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                    <div className="mb-6">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-r ${value.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
                      >
                        <value.icon className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-4 text-[#8a0faf] font-medium"
              >
                Our Leadership
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
              >
                Meet Our Team
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="relative">
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <Image
                        src="/images/ceo.jpg"
                        alt="CEO of DEAZY Tech Solutions"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white px-6 py-2 rounded-full shadow-lg">
                      <span className="font-semibold">
                        10+ Years Experience
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Comr. Ayokunle Kehinde
                      </h3>
                      <p className="text-[#8a0faf] font-semibold">
                        Founder & CEO
                      </p>
                    </div>
                    <p className="text-gray-600">
                      With over a decade of experience in technology and
                      software development, Comr. Ayokunle Kehinde has led DEAZY
                      Tech Solutions to become a leading provider of innovative
                      digital solutions.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-700">
                        <Lightbulb className="h-4 w-4 text-[#ff096c]" />
                        Innovation Leader
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-700">
                        <Users className="h-4 w-4 text-[#ff096c]" />
                        Team Builder
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-700">
                        <Rocket className="h-4 w-4 text-[#ff096c]" />
                        Vision Driven
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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

export default AboutPage;
