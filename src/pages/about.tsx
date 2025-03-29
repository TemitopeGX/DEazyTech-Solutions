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
import { motion } from "framer-motion";

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

  return (
    <>
      <Head
        children={
          <>
            <title>About Us - DEAZY Tech Solutions</title>
            <meta
              name="description"
              content="Learn about DEAZY Tech Solutions - a leading software development company specializing in cutting-edge digital solutions for businesses and organizations."
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
              {/* Logo */}
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.1 }}
                className="mb-8 flex justify-center"
              >
                <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                  <div className="w-full h-full relative rounded-full overflow-hidden">
                    <Image
                      src="/images/logo.png"
                      alt="DEAZY Tech Solutions Logo"
                      width={120}
                      height={120}
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                About DEAZY Tech Solutions
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-200 mb-8"
              >
                A leading software development company specializing in
                cutting-edge digital solutions for businesses, institutions, and
                organizations.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Company Overview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="max-w-3xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="prose prose-lg">
                <p className="text-gray-600 mb-6">
                  Our team consists of highly skilled developers, designers, and
                  IT experts dedicated to delivering innovative technology
                  solutions that enhance user experience and business
                  efficiency.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {/* Vision */}
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <motion.h2
                  variants={fadeInUp}
                  className="text-2xl font-bold mb-6 flex items-center"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaLightbulb className="text-[#ff096c] mr-3" size={24} />
                  </motion.div>
                  Our Vision
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-gray-600">
                  To be a leading provider of innovative technology solutions
                  that empower businesses and organizations worldwide.
                </motion.p>
              </motion.div>

              {/* Mission */}
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <motion.h2
                  variants={fadeInUp}
                  className="text-2xl font-bold mb-6 flex items-center"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaBullseye className="text-[#ff096c] mr-3" size={24} />
                  </motion.div>
                  Our Mission
                </motion.h2>
                <motion.ul variants={staggerChildren} className="space-y-3">
                  <motion.li variants={fadeInUp} className="flex items-start">
                    <FaCheckCircle
                      className="text-[#8a0faf] mt-1 mr-3"
                      size={16}
                    />
                    <span className="text-gray-600">
                      To develop custom software solutions that improve
                      efficiency and productivity
                    </span>
                  </motion.li>
                  <motion.li variants={fadeInUp} className="flex items-start">
                    <FaCheckCircle
                      className="text-[#8a0faf] mt-1 mr-3"
                      size={16}
                    />
                    <span className="text-gray-600">
                      To provide secure, scalable, and user-friendly digital
                      platforms
                    </span>
                  </motion.li>
                  <motion.li variants={fadeInUp} className="flex items-start">
                    <FaCheckCircle
                      className="text-[#8a0faf] mt-1 mr-3"
                      size={16}
                    />
                    <span className="text-gray-600">
                      To support organizations in leveraging technology for
                      growth and success
                    </span>
                  </motion.li>
                </motion.ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <achievement.icon
                      className="mx-auto text-[#8a0faf] mb-4"
                      size={32}
                    />
                  </motion.div>
                  <motion.div
                    variants={fadeInUp}
                    className="text-3xl font-bold text-[#ff096c] mb-2"
                  >
                    {achievement.value}
                  </motion.div>
                  <motion.div variants={fadeInUp} className="text-gray-600">
                    {achievement.title}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 bg-gray-50">
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
                Our Values
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-8 rounded-xl shadow-lg text-center"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <value.icon
                        className="mx-auto text-[#8a0faf] mb-4"
                        size={32}
                      />
                    </motion.div>
                    <motion.h3
                      variants={fadeInUp}
                      className="text-xl font-bold mb-4"
                    >
                      {value.title}
                    </motion.h3>
                    <motion.p variants={fadeInUp} className="text-gray-600">
                      {value.description}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Meet the CEO Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="max-w-4xl mx-auto"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl font-bold text-center mb-12"
              >
                Meet Our CEO
              </motion.h2>
              <motion.div
                variants={scaleIn}
                className="bg-gradient-to-r from-[#15181e] to-[#4e10d3] rounded-2xl p-1"
              >
                <div className="bg-white rounded-xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <motion.div variants={slideIn} className="relative">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative w-full aspect-square rounded-xl overflow-hidden shadow-xl"
                      >
                        <Image
                          src="/images/ceo.jpg"
                          alt="CEO of DEAZY Tech Solutions"
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="absolute -bottom-4 -right-4 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white px-6 py-2 rounded-full shadow-lg"
                      >
                        <span className="font-semibold">
                          10+ Years Experience
                        </span>
                      </motion.div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-6">
                      <motion.div variants={fadeInUp}>
                        <h3 className="text-2xl font-bold mb-2">
                          Comr. Ayokunle Kehinde
                        </h3>
                        <p className="text-[#8a0faf] font-semibold">
                          Founder & CEO
                        </p>
                      </motion.div>
                      <motion.p variants={fadeInUp} className="text-gray-600">
                        With over a decade of experience in technology and
                        software development, Comr. Ayokunle Kehinde has led
                        DEAZY Tech Solutions to become a leading provider of
                        innovative digital solutions. His vision and leadership
                        have been instrumental in driving the company's growth
                        and success.
                      </motion.p>
                      <motion.p variants={fadeInUp} className="text-gray-600">
                        Under his guidance, DEAZY Tech Solutions has
                        successfully delivered hundreds of projects and built
                        lasting relationships with clients across various
                        industries. Comr. Ayokunle Kehinde commitment to
                        excellence and innovation continues to shape our
                        company's future.
                      </motion.p>
                      <motion.div
                        variants={staggerChildren}
                        className="flex flex-wrap gap-4 pt-4"
                      >
                        <motion.div
                          variants={scaleIn}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full"
                        >
                          <FaLightbulb className="text-[#ff096c]" />
                          <span className="text-gray-700">
                            Innovation Leader
                          </span>
                        </motion.div>
                        <motion.div
                          variants={scaleIn}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full"
                        >
                          <FaUsers className="text-[#ff096c]" />
                          <span className="text-gray-700">Team Builder</span>
                        </motion.div>
                        <motion.div
                          variants={scaleIn}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full"
                        >
                          <FaRocket className="text-[#ff096c]" />
                          <span className="text-gray-700">Vision Driven</span>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#15181e] to-[#4e10d3] text-white">
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
                Ready to Work Together?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
              >
                Let's discuss how we can help transform your business with our
                innovative technology solutions.
              </motion.p>
              <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }}>
                <Link
                  href="/start-project"
                  className="px-8 py-3 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-full text-white font-semibold hover:opacity-90 transition-opacity inline-flex items-center space-x-2"
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

export default AboutPage;
