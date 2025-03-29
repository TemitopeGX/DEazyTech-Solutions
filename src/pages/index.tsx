import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import CircularText from "../components/CircularText";
import { motion } from "framer-motion";
import {
  FaCode,
  FaMobile,
  FaLaptopCode,
  FaTools,
  FaRocket,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaGlobe,
  FaUserGraduate,
  FaStore,
  FaIndustry,
  FaChartLine,
  FaAward,
  FaStar,
  FaQuoteLeft,
} from "react-icons/fa";
import { IconType } from "react-icons";

interface Service {
  icon: IconType;
  title: string;
  description: string;
  features: string[];
}

interface Feature {
  icon: IconType;
  title: string;
  description: string;
}

interface Industry {
  icon: IconType;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

const HomePage: React.FC = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      },
    },
  };

  const services: Service[] = [
    {
      icon: FaCode,
      title: "Software Development",
      description:
        "Custom software solutions that drive business growth and efficiency.",
      features: [
        "Learning Management Systems",
        "Enterprise Applications",
        "eCommerce Platforms",
        "Custom Software",
        "API Integration",
      ],
    },
    {
      icon: FaMobile,
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile solutions for modern businesses.",
      features: [
        "iOS Development",
        "Android Development",
        "React Native",
        "Flutter",
        "Mobile UI/UX",
      ],
    },
    {
      icon: FaLaptopCode,
      title: "Web Development",
      description:
        "High-performance websites and web applications that deliver results.",
      features: ["React.js", "Next.js", "Node.js", "PHP/Laravel", "WordPress"],
    },
    {
      icon: FaTools,
      title: "IT Consulting",
      description:
        "Strategic technology advice to optimize your business operations.",
      features: [
        "Digital Strategy",
        "Process Automation",
        "System Integration",
        "Tech Architecture",
        "Cloud Solutions",
      ],
    },
  ];

  const features: Feature[] = [
    {
      icon: FaCheckCircle,
      title: "Expertise & Experience",
      description:
        "Proven track record in delivering high-quality, scalable, and secure digital solutions.",
    },
    {
      icon: FaTools,
      title: "Tailor-Made Solutions",
      description:
        "Customer-focused approach ensuring solutions customized to meet your specific needs.",
    },
    {
      icon: FaClock,
      title: "Reliable Support",
      description:
        "24/7 technical support, system updates, and ongoing maintenance for smooth performance.",
    },
    {
      icon: FaShieldAlt,
      title: "Secure & Scalable",
      description:
        "Systems built with robust security measures and scalability for business growth.",
    },
  ];

  const industries: Industry[] = [
    {
      icon: FaUserGraduate,
      title: "Education",
      description:
        "Transforming learning with digital solutions and LMS platforms.",
    },
    {
      icon: FaStore,
      title: "Retail & E-commerce",
      description:
        "Building seamless shopping experiences and management systems.",
    },
    {
      icon: FaIndustry,
      title: "Manufacturing",
      description: "Automating processes and improving operational efficiency.",
    },
    {
      icon: FaGlobe,
      title: "Technology",
      description: "Developing cutting-edge solutions for tech companies.",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "John Smith",
      role: "CEO",
      company: "TechCorp Inc.",
      image: "/images/testimonials/john.jpg",
      content:
        "DEAZY Tech delivered an exceptional e-commerce platform that exceeded our expectations. Their team's expertise and dedication were impressive.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "Director",
      company: "EduTech Solutions",
      image: "/images/testimonials/sarah.jpg",
      content:
        "The LMS they developed revolutionized our online learning program. Great team, great results!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CTO",
      company: "Innovation Labs",
      image: "/images/testimonials/michael.jpg",
      content:
        "Their technical expertise and project management made our digital transformation smooth and successful.",
      rating: 5,
    },
  ];

  return (
    <>
      <Head>
        <title>
          DEAZY Tech Solutions - Custom Software Development Company
        </title>
        <meta
          name="description"
          content="Transform your business with custom software solutions. We specialize in web development, mobile apps, and enterprise solutions."
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="DEAZY Tech Solutions - Custom Software Development Company"
        />
        <meta
          property="og:description"
          content="Transform your business with custom software solutions. We specialize in web development, mobile apps, and enterprise solutions."
        />
        <meta
          property="og:image"
          content="/favicon/android-chrome-512x512.png"
        />
      </Head>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#15181e] to-[#4e10d3] text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
              >
                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                >
                  Transform Your Business with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                    Innovative
                  </span>{" "}
                  Solutions
                </motion.h1>
                <motion.p
                  variants={fadeInUp}
                  className="text-xl text-gray-200 mb-8"
                >
                  We develop cutting-edge digital solutions that drive success.
                  From custom software to mobile apps, we're your partner in
                  digital transformation.
                </motion.p>
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    href="/start-project"
                    className="px-8 py-4 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-full text-white font-semibold hover:opacity-90 transition-opacity inline-flex items-center space-x-2"
                  >
                    <FaRocket size={20} />
                    <span>Start Your Project</span>
                  </Link>
                  <Link
                    href="/services"
                    className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Explore Services
                  </Link>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="mt-12 flex items-center gap-8"
                >
                  <div className="flex items-center">
                    <FaAward className="text-[#ff096c] mr-2" size={24} />
                    <span>5+ Years Experience</span>
                  </div>
                  <div className="flex items-center">
                    <FaChartLine className="text-[#ff096c] mr-2" size={24} />
                    <span>100+ Projects Delivered</span>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative"
              >
                <div className="relative w-full h-[400px]">
                  <Image
                    src="/images/hero-tech-solutions.svg"
                    alt="DEAZY Tech Solutions - Software Development, Mobile Apps, Web Development, and Digital Transformation Services"
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute top-[95%] right-[10%] transform -translate-y-1/2 z-10 hidden md:block">
                    <CircularText
                      text="INNOVATION*EXCELLENCE*GROWTH*"
                      onHover="speedUp"
                      spinDuration={25}
                      className="opacity-90 hover:opacity-100 transition-opacity w-[220px] h-[220px] text-2xl bg-gradient-to-r from-[#15181e]/50 to-[#4e10d3]/50 rounded-full backdrop-blur-sm"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerChildren}
              >
                <motion.span
                  variants={slideIn}
                  className="text-[#ff096c] font-semibold mb-2 block"
                >
                  About Us
                </motion.span>
                <motion.h2
                  variants={slideIn}
                  className="text-3xl md:text-4xl font-bold mb-6"
                >
                  Leading Software Development Company
                </motion.h2>
                <motion.p
                  variants={slideIn}
                  className="text-gray-600 mb-6 text-lg"
                >
                  DEAZY Tech Solutions Limited is a leading software development
                  company specializing in cutting-edge digital solutions for
                  businesses, institutions, and organizations. With a strong
                  background in web and mobile app development, we provide
                  custom, scalable, and high-performance solutions that drive
                  success.
                </motion.p>
                <motion.div
                  variants={staggerChildren}
                  className="grid grid-cols-2 gap-6 mb-8"
                >
                  <motion.div
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="text-[#8a0faf] mb-2">
                      <FaCheckCircle size={24} />
                    </div>
                    <h3 className="font-semibold mb-1">Our Vision</h3>
                    <p className="text-gray-600 text-sm">
                      To be a leading provider of innovative technology
                      solutions that empower businesses worldwide.
                    </p>
                  </motion.div>
                  <motion.div
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="text-[#8a0faf] mb-2">
                      <FaRocket size={24} />
                    </div>
                    <h3 className="font-semibold mb-1">Our Mission</h3>
                    <p className="text-gray-600 text-sm">
                      To develop custom software solutions that improve
                      efficiency and drive business growth.
                    </p>
                  </motion.div>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Link
                    href="/about"
                    className="text-[#8a0faf] font-semibold hover:text-[#ff096c] transition-colors inline-flex items-center space-x-2"
                  >
                    <span>Learn More About Us</span>
                    <FaRocket size={16} />
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={scaleIn}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-[#15181e] to-[#4e10d3] rounded-2xl p-8 text-white"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <motion.div variants={fadeInUp} className="text-center">
                      <div className="text-4xl font-bold mb-2">5+</div>
                      <div className="text-sm text-gray-200">
                        Years Experience
                      </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="text-center">
                      <div className="text-4xl font-bold mb-2">100+</div>
                      <div className="text-sm text-gray-200">
                        Projects Delivered
                      </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="text-center">
                      <div className="text-4xl font-bold mb-2">50+</div>
                      <div className="text-sm text-gray-200">Happy Clients</div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="text-center">
                      <div className="text-4xl font-bold mb-2">24/7</div>
                      <div className="text-sm text-gray-200">
                        Support Available
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
                <div className="absolute -top-4 -right-4 -bottom-4 -left-4 bg-[url('/images/hero-pattern.svg')] opacity-5 rounded-2xl"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Our Services
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                We offer comprehensive software solutions to help your business
                grow and succeed in the digital age.
              </motion.p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group hover:border-[#8a0faf]"
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="mb-4 text-[#8a0faf]"
                  >
                    <service.icon size={40} />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <motion.ul variants={staggerChildren} className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        variants={fadeInUp}
                        className="flex items-center text-gray-600"
                      >
                        <FaCheckCircle
                          className="text-[#ff096c] mr-2"
                          size={14}
                        />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Industries We Serve
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Our expertise spans across various industries, delivering
                tailored solutions for specific business needs.
              </motion.p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  className="p-6 bg-white rounded-xl shadow-lg text-center group hover:bg-gradient-to-r hover:from-[#15181e] hover:to-[#4e10d3] transition-all"
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="mb-4 text-[#8a0faf] group-hover:text-white transition-colors"
                  >
                    <industry.icon size={40} />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-200 transition-colors">
                    {industry.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Project Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={slideIn}>
                <motion.span
                  variants={fadeInUp}
                  className="text-[#ff096c] font-semibold mb-2 block"
                >
                  Featured Project
                </motion.span>
                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl font-bold mb-6"
                >
                  Learning Management System
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-gray-600 mb-6">
                  Our flagship LMS solution powers educational institutions and
                  corporate training programs with cutting-edge features.
                </motion.p>
                <motion.ul variants={staggerChildren} className="space-y-4">
                  {[
                    "Web Dashboard for centralized management",
                    "Tutor & Student mobile apps",
                    "Live & pre-recorded sessions",
                    "Automated assessments & certification",
                    "Payment gateway integration",
                    "Progress tracking & analytics",
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      variants={fadeInUp}
                      className="flex items-center space-x-3 text-gray-700"
                    >
                      <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#8a0faf]"
                      >
                        <FaCheckCircle size={20} />
                      </motion.div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.div variants={fadeInUp} className="mt-8">
                  <Link
                    href="/services"
                    className="text-[#8a0faf] font-semibold hover:text-[#ff096c] transition-colors inline-flex items-center space-x-2"
                  >
                    <span>Learn More</span>
                    <FaRocket size={16} />
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-2xl shadow-xl"
              >
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                  <Image
                    src="/images/lms-preview.jpg"
                    alt="LMS Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                What Our Clients Say
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Don't just take our word for it. Here's what our clients have to
                say about their experience working with us.
              </motion.p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-xl shadow-lg relative"
                >
                  <motion.div
                    initial={{ opacity: 0.1, scale: 1 }}
                    whileHover={{ opacity: 0.2, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaQuoteLeft
                      className="text-[#ff096c] absolute top-4 left-4"
                      size={40}
                    />
                  </motion.div>
                  <motion.div
                    variants={fadeInUp}
                    className="flex items-center mb-6"
                  >
                    <div className="w-16 h-16 relative rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-600">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </motion.div>
                  <motion.p variants={fadeInUp} className="text-gray-600 mb-4">
                    {testimonial.content}
                  </motion.p>
                  <motion.div
                    variants={staggerChildren}
                    className="flex text-[#ff096c]"
                  >
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <motion.span
                        key={i}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        className="mr-1"
                      >
                        <FaStar size={16} />
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Why Choose Us
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                We're committed to delivering excellence in every project we
                undertake.
              </motion.p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group hover:bg-gradient-to-r hover:from-[#15181e] hover:to-[#4e10d3] p-8 rounded-xl transition-all"
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 inline-block p-4 bg-gray-50 rounded-full group-hover:bg-white/10 transition-colors"
                  >
                    <feature.icon
                      className="text-[#8a0faf] group-hover:text-white transition-colors"
                      size={32}
                    />
                  </motion.div>
                  <motion.h3
                    variants={fadeInUp}
                    className="text-xl font-bold mb-3 group-hover:text-white transition-colors"
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p
                    variants={fadeInUp}
                    className="text-gray-600 group-hover:text-gray-200 transition-colors"
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#15181e] to-[#4e10d3] text-white relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[url('/images/cta-pattern.svg')]"
          ></motion.div>
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Ready to Transform Your Business?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-200 mb-8"
              >
                Let's discuss your project and create a solution that drives
                your business forward.
              </motion.p>
              <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }}>
                <Link
                  href="/start-project"
                  className="px-8 py-4 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-full text-white font-semibold hover:opacity-90 transition-opacity inline-flex items-center space-x-2"
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaRocket size={20} />
                  </motion.div>
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

export default HomePage;
