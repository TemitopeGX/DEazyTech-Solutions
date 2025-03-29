import Head from "next/head";
import { useState } from "react";
import { FaWhatsapp, FaEnvelope, FaCalendarCheck } from "react-icons/fa";
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

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    contactMethod: "email",
  });

  const services = [
    "Web Development",
    "Web Design",
    "Application Development",
    "Graphic Design",
    "UI/UX Design",
    "Digital Marketing",
    "Content Creation",
    "SEO Services",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format the message for WhatsApp or email
    const message = `New Service Booking Request\n
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
Message: ${formData.message}`;

    if (formData.contactMethod === "whatsapp") {
      // Replace with your actual WhatsApp business number
      const whatsappNumber = "1234567890";
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    } else {
      // Replace with your actual business email
      const emailAddress = "contact@deazy-tech.com";
      window.location.href = `mailto:${emailAddress}?subject=Service Booking Request&body=${encodeURIComponent(
        message
      )}`;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Head
        children={
          <>
            <title>Book a Service - DEAZY Tech Solutions</title>
            <meta
              name="description"
              content="Book our professional services for your next digital project. We offer web development, mobile apps, and more."
            />
          </>
        }
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#15181e] to-[#4e10d3] text-white py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.1 }}
                className="inline-block mb-8"
              >
                <FaCalendarCheck size={48} className="text-[#ff096c]" />
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Book Our Services
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl text-gray-200">
                Take the first step towards transforming your business. Fill out
                the form below and we'll get back to you within 24 hours.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="max-w-2xl mx-auto"
            >
              <motion.div
                variants={scaleIn}
                className="bg-gradient-to-r from-[#15181e] to-[#4e10d3] p-1 rounded-2xl"
              >
                <div className="bg-white rounded-xl p-8">
                  <motion.form
                    variants={staggerChildren}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <motion.div variants={fadeInUp}>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                      />
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                      />
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                      />
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Select Service
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Project Details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                      ></textarea>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="flex space-x-4">
                        <motion.label
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center bg-gray-100 px-4 py-2 rounded-full cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="contactMethod"
                            value="email"
                            checked={formData.contactMethod === "email"}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          <FaEnvelope className="mr-2 text-[#ff096c]" />
                          <span className="text-gray-700">Email</span>
                        </motion.label>
                        <motion.label
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center bg-gray-100 px-4 py-2 rounded-full cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="contactMethod"
                            value="whatsapp"
                            checked={formData.contactMethod === "whatsapp"}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          <FaWhatsapp className="mr-2 text-[#ff096c]" />
                          <span className="text-gray-700">WhatsApp</span>
                        </motion.label>
                      </div>
                    </motion.div>

                    <motion.div variants={scaleIn} whileHover={{ scale: 1.02 }}>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                      >
                        Book Service
                      </button>
                    </motion.div>
                  </motion.form>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BookingPage;
