import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCode,
  FaMobile,
  FaLaptopCode,
  FaTools,
  FaRocket,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaStar,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { IconType } from "react-icons";

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
  icon: IconType;
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
      icon: FaCode,
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
      icon: FaMobile,
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
      icon: FaLaptopCode,
      title: "Web Development",
      description: "High-performance websites and web applications.",
      skills: ["React.js", "Next.js", "Node.js", "PHP/Laravel", "WordPress"],
    },
    {
      icon: FaTools,
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
      <Head
        children={
          <>
            <title>Our Experts - DEAZY Tech Solutions</title>
            <meta
              name="description"
              content="Meet our team of expert developers and consultants at DEAZY Tech Solutions."
            />
          </>
        }
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <motion.section
          className="bg-gradient-to-r from-[#15181e] to-[#4e10d3] text-white py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Meet Our Expert Team
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Work with our highly skilled professionals who bring years of
                experience in delivering successful technology solutions.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/start-project"
                  className="px-8 py-3 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-full text-white font-semibold hover:opacity-90 transition-opacity inline-flex items-center space-x-2"
                >
                  <FaRocket size={20} />
                  <span>Start Your Project</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section
          className="py-16 bg-white"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-3xl font-bold mb-4">
                Why Choose Our Experts?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our team brings years of experience in delivering successful
                projects across various industries and technologies.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "5+", label: "Years of Experience" },
                { value: "100+", label: "Projects Completed" },
                { value: "50+", label: "Happy Clients" },
                { value: "24/7", label: "Support Available" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-[#ff096c] text-4xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Featured Experts Section */}
        <motion.section
          className="py-16 bg-gray-50"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              variants={fadeInUp}
            >
              Our Featured Experts
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experts.map((expert) => (
                <motion.div
                  key={expert.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  variants={scaleIn}
                  whileHover={{ y: -10 }}
                >
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{expert.name}</h3>
                    <p className="text-[#8a0faf] font-semibold mb-3">
                      {expert.role}
                    </p>
                    <p className="text-gray-600 mb-4">{expert.description}</p>
                    <div className="flex items-center mb-4">
                      <FaStar className="text-yellow-400" />
                      <span className="ml-2 text-gray-600">
                        {expert.experience} Experience
                      </span>
                      <span className="mx-2">•</span>
                      <span className="text-gray-600">
                        {expert.projects}+ Projects
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {expert.skills.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      {expert.linkedin && (
                        <motion.a
                          href={expert.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-[#8a0faf]"
                          whileHover={{ scale: 1.2 }}
                        >
                          <FaLinkedin size={20} />
                        </motion.a>
                      )}
                      {expert.github && (
                        <motion.a
                          href={expert.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-[#8a0faf]"
                          whileHover={{ scale: 1.2 }}
                        >
                          <FaGithub size={20} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Expertise Areas Section */}
        <motion.section
          className="py-16 bg-white"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              variants={fadeInUp}
            >
              Areas of Expertise
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
                  variants={scaleIn}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    <motion.div
                      className="text-[#8a0faf]"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <area.icon size={32} />
                    </motion.div>
                    <h3 className="text-2xl font-bold ml-4">{area.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{area.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border border-gray-200"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-16 bg-gradient-to-r from-[#15181e] to-[#4e10d3] text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Let's discuss how our experts can help transform your business
                with custom technology solutions.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/start-project"
                  className="px-8 py-3 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-full text-white font-semibold hover:opacity-90 transition-opacity inline-flex items-center space-x-2"
                >
                  <FaRocket size={20} />
                  <span>Start Your Project</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="py-16 bg-gray-50"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-3xl font-bold mb-4">
                Need More Information?
              </h2>
              <p className="text-gray-600">
                Contact us directly through any of these channels
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8"
              variants={fadeInUp}
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/contact"
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#8a0faf]"
                >
                  <FaEnvelope size={20} />
                  <span>contact@deazytech.com</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/contact"
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#8a0faf]"
                >
                  <FaPhone size={20} />
                  <span>+123 456 7890</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default HireExpertsPage;
