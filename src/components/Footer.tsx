import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IconType } from "react-icons";

interface SocialLink {
  href: string;
  icon: IconType;
  label: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    { href: "#", icon: FaFacebook, label: "Facebook" },
    { href: "#", icon: FaTwitter, label: "Twitter" },
    { href: "#", icon: FaInstagram, label: "Instagram" },
    { href: "#", icon: FaLinkedin, label: "LinkedIn" },
  ];

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  const services = [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Cloud Solutions",
    "Digital Marketing",
  ];

  return (
    <footer className="bg-[#15181e] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col space-y-8 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/images/logo-white.png"
              alt="DEAZY Tech Solutions"
              width={150}
              height={40}
              className="object-contain"
            />
            <p className="text-gray-400 text-sm">
              Transforming ideas into innovative digital solutions. Your trusted
              partner for technology excellence.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <social.icon size={20} />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links and Services in 2 columns for mobile */}
          <div className="grid grid-cols-2 gap-8 sm:gap-4 lg:col-span-2">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <span className="text-gray-400 hover:text-white transition-colors text-sm">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Our Services</h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service} className="text-gray-400 text-sm">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>123 Tech Street</p>
              <p>Silicon Valley, CA 94025</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@deazytech.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} DEAZY Tech Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
