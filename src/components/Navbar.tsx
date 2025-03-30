import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/recent-projects", label: "Recent Projects" },
    { href: "/hire-experts", label: "Hire Experts" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.header className="fixed w-full z-50 px-4 py-3">
      <motion.nav
        className={`mx-auto max-w-7xl transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg rounded-2xl px-6 py-2"
            : "bg-white px-4 py-4"
        }`}
        initial={{ y: -100 }}
        animate={{
          y: 0,
          ...(isScrolled && {
            margin: "0.5rem auto",
          }),
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-[120px] sm:w-[140px] flex-shrink-0"
          >
            <Link href="/" className="flex items-center">
              <div className="relative w-full h-8 sm:h-10">
                <Image
                  src="/images/logo-2.png"
                  alt="DEAZY Tech Solutions"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center space-x-8"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors text-gray-800 hover:text-[#ff096c]`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block"
          >
            <Link
              href="/start-project"
              className="px-6 py-2.5 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap shadow-lg"
            >
              Start Project
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-gray-800" />
            ) : (
              <FaBars className="text-gray-800" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-sm mt-4 rounded-xl shadow-lg"
            >
              <div className="px-6 py-6">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="block text-gray-800 hover:text-[#ff096c] font-medium text-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    className="pt-4"
                  >
                    <Link
                      href="/start-project"
                      className="inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white rounded-full text-base font-medium hover:opacity-90 transition-opacity shadow-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Start Project
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
};

export default Navbar;
