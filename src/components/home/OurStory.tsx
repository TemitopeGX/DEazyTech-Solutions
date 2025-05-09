import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function OurStory() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-block rounded-full bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 px-3 py-1 text-sm text-[#8a0faf]">
              Our Story
            </div>
            <h2 className="text-3xl font-bold">
              Transforming Ideas Into Reality
            </h2>
            <p className="text-gray-600">
              DEAZY Tech Solutions Limited is a leading software development
              company specializing in cutting-edge digital solutions for
              businesses, institutions, and organizations. With a strong
              background in web and mobile app development, we provide custom,
              scalable, and high-performance solutions that drive success.
            </p>
            <p className="text-gray-600">
              Our team consists of highly skilled developers, designers, and IT
              experts dedicated to delivering innovative technology solutions
              that enhance user experience and business efficiency.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff096c]/20 to-[#8a0faf]/20" />
              <Image
                src="/images/about-image.jpg"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
