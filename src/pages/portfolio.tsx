import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";

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

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce solution with advanced features including real-time inventory management and AI-powered product recommendations.",
    image: "/images/projects/ecommerce.jpg",
    category: "Web Development",
    link: "#",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description:
      "Secure and user-friendly mobile banking application with biometric authentication and instant transaction processing.",
    image: "/images/projects/banking.jpg",
    category: "Mobile Development",
    link: "#",
  },
  {
    id: 3,
    title: "IoT Fleet Management",
    description:
      "IoT-based fleet management system with real-time tracking, predictive maintenance, and analytics dashboard.",
    image: "/images/projects/iot.jpg",
    category: "IoT Solutions",
    link: "#",
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Smith",
    role: "CTO",
    company: "TechCorp Inc.",
    content:
      "DEAZY Tech Solutions delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise are unmatched.",
    image: "/images/testimonials/john.jpg",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "FinTech Solutions",
    content:
      "Working with DEAZY Tech was a game-changer for our mobile banking app. They brought innovative solutions and maintained the highest security standards.",
    image: "/images/testimonials/sarah.jpg",
  },
];

const PortfolioPage: React.FC = () => {
  return (
    <>
      <Head
        children={
          <>
            <title>Our Portfolio - DEAZY Tech Solutions</title>
            <meta
              name="description"
              content="Explore our successful projects and see how we've helped businesses transform their digital presence."
            />
          </>
        }
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-[#15181e] to-[#4e10d3] text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="text-center"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold text-center mb-6"
              >
                Our Portfolio
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-center max-w-3xl mx-auto"
              >
                Explore our successful projects and see how we've helped
                businesses transform their digital presence.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <motion.div variants={fadeInUp} className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                  <motion.div variants={fadeInUp} className="p-6">
                    <motion.span
                      variants={fadeInUp}
                      className="text-sm font-semibold text-[#8a0faf]"
                    >
                      {project.category}
                    </motion.span>
                    <motion.h3
                      variants={fadeInUp}
                      className="text-xl font-bold mt-2 mb-3"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      variants={fadeInUp}
                      className="text-gray-600 mb-4"
                    >
                      {project.description}
                    </motion.p>
                    <motion.div
                      variants={fadeInUp}
                      whileHover={{ x: 5 }}
                      className="inline-block"
                    >
                      <Link
                        href={project.link}
                        className="text-[#8a0faf] font-semibold hover:text-[#ff096c]"
                      >
                        View Project →
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl font-bold text-center mb-12"
              >
                Client Testimonials
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    variants={scaleIn}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-lg shadow-lg p-8"
                  >
                    <motion.div
                      variants={fadeInUp}
                      className="flex items-center mb-6"
                    >
                      <motion.div
                        variants={scaleIn}
                        className="relative w-16 h-16 rounded-full overflow-hidden"
                      >
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="64px"
                        />
                      </motion.div>
                      <motion.div variants={slideIn} className="ml-4">
                        <motion.h4 variants={fadeInUp} className="font-bold">
                          {testimonial.name}
                        </motion.h4>
                        <motion.p variants={fadeInUp} className="text-gray-600">
                          {testimonial.role}
                        </motion.p>
                        <motion.p variants={fadeInUp} className="text-gray-600">
                          {testimonial.company}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                    <motion.p
                      variants={fadeInUp}
                      className="text-gray-700 italic"
                    >
                      {testimonial.content}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#15181e] to-[#4e10d3] text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl font-bold mb-6"
              >
                Ready to Start Your Project?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl mb-8 max-w-2xl mx-auto"
              >
                Let's discuss how we can help transform your business with
                innovative technology solutions.
              </motion.p>
              <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }}>
                <Link
                  href="/contact"
                  className="inline-block bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
                >
                  Contact Us Today
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PortfolioPage;
