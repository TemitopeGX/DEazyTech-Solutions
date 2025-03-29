import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Hire Experts", href: "/hire-experts" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <nav className="flex-grow px-4">
              <ul className="space-y-6">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xl font-medium text-gray-900 hover:text-blue-500 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4">
              <Link
                href="/start-project"
                className="block w-full py-3 px-6 text-center text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:opacity-90 transition-opacity"
                onClick={() => setIsOpen(false)}
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
