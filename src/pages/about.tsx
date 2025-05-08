import React from "react";
import Head from "next/head";
import Link from "next/link";
import {
  FaRocket,
  FaCheckCircle,
  FaUsers,
  FaLightbulb,
  FaBullseye,
  FaHandshake,
  FaCog,
  FaChartLine,
} from "react-icons/fa";
import { IconType } from "react-icons";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

interface Achievement {
  icon: IconType;
  title: string;
  value: string;
}

interface Value {
  icon: IconType;
  title: string;
  description: string;
}

const AboutPage: React.FC = () => {
  const achievements: Achievement[] = [
    { icon: FaUsers, title: "Happy Clients", value: "50+" },
    { icon: FaRocket, title: "Projects Completed", value: "100+" },
    { icon: FaCog, title: "Years Experience", value: "5+" },
    { icon: FaChartLine, title: "Team Members", value: "20+" },
  ];

  const values: Value[] = [
    {
      icon: FaLightbulb,
      title: "Innovation",
      description:
        "We constantly explore new technologies and solutions to stay ahead.",
    },
    {
      icon: FaBullseye,
      title: "Excellence",
      description:
        "We strive for the highest quality in every project we undertake.",
    },
    {
      icon: FaHandshake,
      title: "Partnership",
      description:
        "We build long-term relationships with our clients based on trust.",
    },
  ];

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <>
      <Head>
        <title>About Us - DEAZY Tech Solutions</title>
        <meta
          name="description"
          content="Learn about DEAZY Tech Solutions - a leading software development company specializing in cutting-edge digital solutions for businesses and organizations."
        />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
          {/* Animated Background Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[800px] h-[800px] top-[-400px] left-[-200px]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff096c]/40 to-[#8a0faf]/40 rounded-full animate-blob1 opacity-70 blur-[120px]"></div>
            </div>
            <div className="absolute w-[600px] h-[600px] top-[-100px] right-[-200px]">
              <div className="absolute inset-0 bg-gradient-to-l from-[#4e10d3]/40 to-[#8a0faf]/40 rounded-full animate-blob2 opacity-70 blur-[100px]"></div>
            </div>
            <div className="absolute w-[700px] h-[700px] bottom-[-400px] left-[20%]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ff096c]/40 to-[#4e10d3]/40 rounded-full animate-blob3 opacity-70 blur-[110px]"></div>
            </div>
          </div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Animated Logo */}
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.1 }}
                className="mb-12 flex justify-center"
              >
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-full animate-spin-slow opacity-75 blur-md"></div>
                  <div className="relative w-full h-full bg-white shadow-xl rounded-full p-3 border border-gray-100">
                    <div className="w-full h-full relative rounded-full overflow-hidden">
                      <Image
                        src="/images/logo.png"
                        alt="DEAZY Tech Solutions Logo"
                        width={140}
                        height={140}
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Title */}
              <motion.div variants={fadeInUp} className="relative mb-6">
                <h1 className="text-6xl md:text-7xl font-bold">
                  <span className="text-gray-900">About DEAZY Tech</span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                    Solutions
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.div
                variants={fadeInUp}
                className="relative max-w-3xl mx-auto p-6 rounded-2xl bg-white/80 shadow-lg backdrop-blur-sm border border-gray-100"
              >
                <p className="text-xl text-gray-700 leading-relaxed">
                  A leading software development company specializing in
                  cutting-edge digital solutions for businesses, institutions,
                  and organizations.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={staggerChildren}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
              >
                {[
                  { value: "50+", label: "Happy Clients", icon: FaUsers },
                  { value: "100+", label: "Projects Done", icon: FaRocket },
                  { value: "5+", label: "Years Experience", icon: FaCog },
                  { value: "20+", label: "Team Members", icon: FaChartLine },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff096c]/10 to-[#8a0faf]/10 rounded-2xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                    <div className="relative p-6 rounded-2xl bg-white shadow-lg border border-gray-100">
                      <stat.icon className="w-8 h-8 mb-4 mx-auto text-[#ff096c] group-hover:text-[#8a0faf] transition-colors duration-300" />
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {stat.value}
                      </h3>
                      <p className="text-gray-600">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 rounded-full border-2 border-gray-400 p-1"
              >
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mx-auto animate-scroll"></div>
              </motion.div>
              <span className="text-gray-500 text-sm mt-2">Scroll Down</span>
            </div>
          </motion.div>
        </section>

        {/* Vision & Mission Section */}
        <section className="relative py-24 overflow-hidden bg-gray-50">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {/* Vision Card */}
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff096c]/10 via-[#8a0faf]/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full p-8 rounded-3xl bg-white shadow-lg border border-gray-100">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-[#ff096c]/10 to-[#8a0faf]/10 p-4 rounded-2xl inline-block mb-6"
                  >
                    <FaLightbulb className="text-[#ff096c] w-8 h-8" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Our Vision
                  </h2>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    To be a leading provider of innovative technology solutions
                    that empower businesses and organizations worldwide.
                  </p>
                </div>
              </motion.div>

              {/* Mission Card */}
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8a0faf]/10 via-[#ff096c]/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full p-8 rounded-3xl bg-white shadow-lg border border-gray-100">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-[#8a0faf]/10 to-[#ff096c]/10 p-4 rounded-2xl inline-block mb-6"
                  >
                    <FaBullseye className="text-[#8a0faf] w-8 h-8" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Our Mission
                  </h2>
                  <ul className="space-y-4">
                    {[
                      "To develop custom software solutions that improve efficiency and productivity",
                      "To provide secure, scalable, and user-friendly digital platforms",
                      "To support organizations in leveraging technology for growth and success",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        variants={fadeInUp}
                        className="flex items-start space-x-3"
                      >
                        <FaCheckCircle className="text-[#ff096c] mt-1.5 flex-shrink-0 w-5 h-5" />
                        <span className="text-lg text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-24 overflow-hidden bg-white">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-4xl font-bold text-gray-900 mb-6"
              >
                Our Values
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                The principles that guide our work and relationships
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff096c]/10 via-[#8a0faf]/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative p-8 rounded-3xl bg-white shadow-lg border border-gray-100 h-full">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gradient-to-br from-[#ff096c]/10 to-[#8a0faf]/10 p-4 rounded-2xl inline-block mb-6"
                    >
                      <value.icon className="text-[#ff096c] group-hover:text-[#8a0faf] transition-colors duration-300 w-8 h-8" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-lg text-gray-600">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the CEO Section */}
        <section className="relative py-24 overflow-hidden bg-gray-50">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="max-w-5xl mx-auto"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-4xl font-bold text-center text-gray-900 mb-16"
              >
                Meet Our CEO
              </motion.h2>

              <motion.div variants={scaleIn} className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff096c]/20 via-[#8a0faf]/10 to-transparent rounded-3xl blur-3xl"></div>
                <div className="relative p-8 md:p-12 rounded-3xl bg-white shadow-lg border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div variants={slideIn} className="relative">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ff096c]/10 to-[#8a0faf]/10 mix-blend-overlay"></div>
                        <Image
                          src="/images/ceo.jpg"
                          alt="CEO of DEAZY Tech Solutions"
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                          className="transform hover:scale-110 transition-transform duration-500"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="absolute -bottom-6 -right-6 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white px-6 py-3 rounded-2xl shadow-xl"
                      >
                        <span className="font-semibold text-lg">
                          10+ Years Experience
                        </span>
                      </motion.div>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="space-y-6">
                      <div>
                        <h3 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                          Comr. Ayokunle Kehinde
                        </h3>
                        <p className="text-[#8a0faf] font-semibold text-xl">
                          Founder & CEO
                        </p>
                      </div>
                      <p className="text-lg text-gray-700">
                        With over a decade of experience in technology and
                        software development, Comr. Ayokunle Kehinde has led
                        DEAZY Tech Solutions to become a leading provider of
                        innovative digital solutions.
                      </p>
                      <p className="text-lg text-gray-700">
                        Under his guidance, DEAZY Tech Solutions has
                        successfully delivered hundreds of projects and built
                        lasting relationships with clients across various
                        industries.
                      </p>
                      <div className="flex flex-wrap gap-4 pt-6">
                        {[
                          { icon: FaLightbulb, label: "Innovation Leader" },
                          { icon: FaUsers, label: "Team Builder" },
                          { icon: FaRocket, label: "Vision Driven" },
                        ].map((badge, index) => (
                          <motion.div
                            key={index}
                            variants={scaleIn}
                            whileHover={{ scale: 1.05 }}
                            className="group flex items-center space-x-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 px-6 py-3 rounded-xl"
                          >
                            <badge.icon className="text-[#ff096c] group-hover:text-[#8a0faf] transition-colors duration-300" />
                            <span className="text-gray-700 font-medium">
                              {badge.label}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="max-w-3xl mx-auto"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-4xl font-bold text-white mb-6"
              >
                Ready to Work Together?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-white/90 mb-12"
              >
                Let's discuss how we can help transform your business with our
                innovative technology solutions.
              </motion.p>
              <motion.div variants={scaleIn}>
                <Link
                  href="/start-project"
                  className="group relative inline-flex items-center gap-4 bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform duration-300"
                >
                  <motion.span
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <FaRocket className="text-[#ff096c] group-hover:rotate-12 transition-transform duration-300" />
                  </motion.span>
                  <span>Start Your Project</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
