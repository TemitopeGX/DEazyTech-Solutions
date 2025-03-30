import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { FaArrowLeft } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "Learning Management System",
    description:
      "A comprehensive LMS platform with live classes, assessments, and student tracking.",
    image: "/images/projects/lms-preview.jpg",
    tags: ["Next.js", "React", "Node.js", "MongoDB"],
    link: "#",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description:
      "Modern e-commerce solution with real-time inventory and payment processing.",
    image: "/images/projects/ecommerce.jpg",
    tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
    link: "#",
  },
  {
    id: 3,
    title: "Banking Application",
    description:
      "Secure banking platform with real-time transactions and account management.",
    image: "/images/projects/banking.jpg",
    tags: ["React Native", "Node.js", "AWS", "MongoDB"],
    link: "#",
  },
  {
    id: 4,
    title: "IoT Dashboard",
    description: "Real-time IoT device monitoring and control dashboard.",
    image: "/images/projects/iot.jpg",
    tags: ["React", "WebSocket", "Node.js", "InfluxDB"],
    link: "#",
  },
];

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

      <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#15181e] to-[#4e10d3] text-white py-20 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-5"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="max-w-4xl mx-auto text-center"
            >
              <Link
                href="/"
                className="inline-flex items-center text-gray-200 hover:text-white mb-8 transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Back to Home
              </Link>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl font-bold mb-6"
              >
                Recent Projects
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-200 max-w-2xl mx-auto"
              >
                Explore our latest work and see how we help businesses transform
                their digital presence through innovative solutions.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  className="bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-64">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={project.link}
                      className="inline-block bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity duration-300 font-medium"
                    >
                      View Project Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#15181e] to-[#4e10d3] text-white relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-[url('/images/cta-pattern.svg')] opacity-5"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Ready to Start Your Project?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-200 mb-8"
              >
                Let's discuss how we can help transform your business with our
                innovative solutions.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link
                  href="/start-project"
                  className="inline-block bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity duration-300 font-medium"
                >
                  Start Your Project
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RecentProjects;
