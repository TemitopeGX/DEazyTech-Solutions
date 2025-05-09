import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Twitter, Mail } from "lucide-react";

const ceoInfo = {
  name: "Comr. Ayokunle Kehinde",
  role: "Founder & CEO",
  image: "/images/ceo.jpg", // You'll need to add this image
  bio: "With over a decade of experience in technology and software development, Comr. Ayokunle Kehinde has led DEAZY Tech Solutions to become a leading provider of innovative digital solutions.",
  socials: {
    linkedin: "#",
    twitter: "#",
    email: "mailto:contact@deazytech.com",
  },
};

export function MeetTheTeam() {
  return (
    <section className="w-full py-16 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#ff096c05_1px,transparent_1px),linear-gradient(-45deg,#8a0faf05_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-sm rounded-full bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 text-[#8a0faf] font-medium"
          >
            Leadership
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold"
          >
            <span className="bg-gradient-to-r from-[#ff096c] to-[#8a0faf] bg-clip-text text-transparent">
              Meet Our CEO
            </span>
          </motion.h2>
        </div>

        {/* CEO Profile */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image Container */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl border-2 border-border shadow-lg hover:shadow-xl hover:border-[#ff096c]/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff096c]/20 to-[#8a0faf]/20 group-hover:opacity-75 transition-opacity duration-300" />
                  <Image
                    src={ceoInfo.image}
                    alt={ceoInfo.name}
                    fill
                    className="object-cover"
                  />

                  {/* Floating decorative elements */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-[#ff096c]/30 to-[#8a0faf]/30 blur-lg"
                  />
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                      x: [0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-gradient-to-r from-[#8a0faf]/30 to-[#ff096c]/30 blur-lg"
                  />
                </motion.div>

                {/* Social Links */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-gray-100">
                  <a
                    href={ceoInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff096c] hover:text-[#8a0faf] transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={ceoInfo.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff096c] hover:text-[#8a0faf] transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={ceoInfo.socials.email}
                    className="text-[#ff096c] hover:text-[#8a0faf] transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {ceoInfo.name}
                  </h3>
                  <p className="text-lg md:text-xl font-medium bg-gradient-to-r from-[#ff096c] to-[#8a0faf] bg-clip-text text-transparent">
                    {ceoInfo.role}
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {ceoInfo.bio}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Under his leadership, DEAZY Tech Solutions has grown into a
                    trusted partner for businesses seeking innovative digital
                    solutions. His vision and commitment to excellence continue
                    to drive our company's success.
                  </p>
                </div>
                <div className="pt-4">
                  <div className="inline-flex items-center justify-center px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 text-[#8a0faf] font-medium">
                    Visionary Leadership
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
