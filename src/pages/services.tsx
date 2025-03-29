import React, { ReactNode } from "react";
import Head from "next/head";
import {
  FaCode,
  FaMobile,
  FaLaptopCode,
  FaTools,
  FaCogs,
  FaHeadset,
  FaGraduationCap,
  FaShoppingCart,
  FaBuilding,
  FaRocket,
  FaCheckCircle,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import Link from "next/link";

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

interface Service {
  icon: IconType;
  title: string;
  description: string;
  features: string[];
}

interface Project {
  title: string;
  type: string;
  description: string;
  image: string;
  features: string[];
}

interface IconComponentProps {
  icon: IconType;
  children?: ReactNode;
}

const ServicesPage: React.FC = () => {
  const services: Service[] = [
    {
      icon: FaCode,
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
    },
    {
      icon: FaMobile,
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
    },
    {
      icon: FaLaptopCode,
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
    },
    {
      icon: FaTools,
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
    },
  ];

  const IconComponent: React.FC<IconComponentProps> = ({ icon: Icon }) => (
    <div className="text-[#8a0faf]">
      <Icon size={32} />
    </div>
  );

  return (
    <>
      <Head
        children={
          <>
            <title>Our Services - DEAZY Tech Solutions</title>
            <meta
              name="description"
              content="Explore our comprehensive range of technology solutions and services at DEAZY Tech Solutions."
            />
          </>
        }
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#15181e] to-[#4e10d3] text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Our Services
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl text-gray-200">
                We provide comprehensive software solutions to help businesses
                automate, optimize, and grow in the digital age.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Detailed Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                >
                  <motion.div
                    variants={fadeInUp}
                    className="flex items-center mb-6"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent icon={service.icon} />
                    </motion.div>
                    <h3 className="text-2xl font-bold ml-4">{service.title}</h3>
                  </motion.div>
                  <motion.p variants={fadeInUp} className="text-gray-600 mb-6">
                    {service.description}
                  </motion.p>
                  <motion.ul variants={staggerChildren} className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        variants={fadeInUp}
                        className="flex items-center text-gray-700"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="text-[#ff096c]"
                        >
                          <FaCheckCircle size={16} />
                        </motion.div>
                        <span className="ml-3">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section */}
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
                className="text-3xl font-bold mb-4"
              >
                Featured Projects
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Take a look at some of our successful projects that showcase our
                expertise in delivering high-quality solutions.
              </motion.p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <motion.img
                    variants={fadeInUp}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <motion.div variants={fadeInUp} className="p-6">
                    <motion.div
                      variants={fadeInUp}
                      className="text-sm text-[#8a0faf] font-semibold mb-2"
                    >
                      {project.type}
                    </motion.div>
                    <motion.h3
                      variants={fadeInUp}
                      className="text-xl font-bold mb-3"
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
                      variants={staggerChildren}
                      className="space-y-2"
                    >
                      {project.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          variants={fadeInUp}
                          className="flex items-center text-gray-700"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className="text-[#ff096c]"
                          >
                            <FaCheckCircle size={14} />
                          </motion.div>
                          <span className="ml-2 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
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
                Ready to Transform Your Business?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
              >
                Let's discuss how we can help you achieve your goals with our
                innovative technology solutions.
              </motion.p>
              <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }}>
                <Link
                  href="/start-project"
                  className="px-8 py-4 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-full text-white font-semibold hover:opacity-90 transition-opacity inline-flex items-center space-x-2"
                >
                  <motion.div
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

export default ServicesPage;
