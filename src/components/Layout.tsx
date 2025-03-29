import React, { ReactNode } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";
import { IconType } from "react-icons";
import Image from "next/image";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/logo-white.png"
            alt="DEAZY Tech Solutions"
            width={150}
            height={50}
            className="mb-4"
          />
          <p className="text-gray-400 mb-4">
            Empowering businesses through innovative software solutions and
            digital transformation.
          </p>
          <div className="flex space-x-4">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-500"
            >
              <FaFacebookF />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-500"
            >
              <FaTwitter />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-500"
            >
              <FaLinkedinIn />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-500"
            >
              <FaInstagram />
            </motion.a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="text-gray-400 hover:text-primary-500"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-gray-400 hover:text-primary-500"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                className="text-gray-400 hover:text-primary-500"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-primary-500"
              >
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li>123 Tech Street</li>
            <li>Lagos, Nigeria</li>
            <li>+234 (803) 123-4567</li>
            <li>info@deazytech.com</li>
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-4">
            Subscribe to our newsletter for updates and insights.
          </p>
          <form className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center mt-12 pt-8 border-t border-gray-800"
      >
        <p className="text-gray-400">
          © {new Date().getFullYear()} DEAZY Tech Solutions Limited. All rights
          reserved.
        </p>
      </motion.div>
    </div>
  </footer>
);

const Layout = ({ children }: LayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      <Navbar />
      <main className="flex-grow pt-24">{children}</main>
      <Footer />
    </motion.div>
  );
};

export default Layout;
