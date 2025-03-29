import React, { useState } from "react";
import Head from "next/head";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
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

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    alert("Thank you for your message. We will get back to you soon!");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const contactInfo = [
    {
      icon: <FaPhone size={24} />,
      title: "Phone",
      details: ["+1 (234) 567-8900", "+1 (234) 567-8901"],
    },
    {
      icon: <FaEnvelope size={24} />,
      title: "Email",
      details: ["info@deazytech.com", "support@deazytech.com"],
    },
    {
      icon: <FaMapMarkerAlt size={24} />,
      title: "Address",
      details: ["123 Tech Street", "City, State 12345"],
    },
  ];

  return (
    <>
      <Head
        children={
          <>
            <title>Contact Us - DEAZY Tech Solutions</title>
            <meta
              name="description"
              content="Get in touch with DEAZY Tech Solutions for your technology needs. We're here to help transform your business."
            />
          </>
        }
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#15181e] to-[#4e10d3] text-white py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="text-center"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl font-bold text-center mb-4"
              >
                Contact Us
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-center max-w-2xl mx-auto"
              >
                Have a question or want to discuss a project? We'd love to hear
                from you.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            >
              {/* Contact Information */}
              <motion.div variants={slideIn} className="lg:col-span-1">
                <motion.div
                  variants={scaleIn}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg shadow-lg p-8"
                >
                  <motion.h2
                    variants={fadeInUp}
                    className="text-2xl font-semibold mb-6"
                  >
                    Get in Touch
                  </motion.h2>
                  <motion.div variants={staggerChildren} className="space-y-8">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        variants={fadeInUp}
                        className="flex items-start"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="text-[#8a0faf] mt-1"
                        >
                          {info.icon}
                        </motion.div>
                        <motion.div variants={slideIn} className="ml-4">
                          <motion.h3
                            variants={fadeInUp}
                            className="font-semibold text-lg"
                          >
                            {info.title}
                          </motion.h3>
                          {info.details.map((detail, i) => (
                            <motion.p
                              key={i}
                              variants={fadeInUp}
                              className="text-gray-600"
                            >
                              {detail}
                            </motion.p>
                          ))}
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div variants={slideIn} className="lg:col-span-2">
                <motion.div
                  variants={scaleIn}
                  className="bg-white rounded-lg shadow-lg p-8"
                >
                  <motion.h2
                    variants={fadeInUp}
                    className="text-2xl font-semibold mb-6"
                  >
                    Send Us a Message
                  </motion.h2>
                  <motion.form
                    variants={staggerChildren}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <motion.div
                      variants={fadeInUp}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <motion.div variants={fadeInUp}>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp}>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                        />
                      </motion.div>
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                      ></textarea>
                    </motion.div>
                    <motion.div variants={scaleIn} whileHover={{ scale: 1.02 }}>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                      >
                        Send Message
                      </button>
                    </motion.div>
                  </motion.form>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="max-w-4xl mx-auto"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-2xl font-bold text-center mb-8"
              >
                Visit Our Office
              </motion.h2>
              <motion.div variants={scaleIn} className="aspect-w-16 aspect-h-9">
                {/* Replace with your actual map embed code */}
                <motion.div
                  variants={fadeInUp}
                  className="w-full h-[400px] bg-gray-300 rounded-lg"
                >
                  {/* Add your map component or iframe here */}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
