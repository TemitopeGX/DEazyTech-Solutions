import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Code, Users, Target, Award } from "lucide-react";

export function OurStory() {
  const milestones = [
    {
      year: "2015",
      title: "Company Founded",
      description: "Started with a vision to transform digital experiences",
      icon: Code,
    },
    {
      year: "2017",
      title: "Global Expansion",
      description: "Expanded operations to serve clients worldwide",
      icon: Target,
    },
    {
      year: "2018",
      title: "10+ Team Members",
      description: "Grew our talented team of experts",
      icon: Users,
    },
    {
      year: "2025 - Till Date",
      title: "Industry Recognition",
      description: "Received multiple awards for excellence",
      icon: Award,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-mauveine/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-chrysler-blue/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-rose/10 via-mauveine/10 to-chrysler-blue/10 text-rose font-medium text-sm mb-6">
                Our Journey
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                The Story of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose to-mauveine">
                  Innovation
                </span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-rose to-mauveine rounded-full mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                From our humble beginnings to becoming a leading software
                development company, our journey has been defined by innovation,
                dedication, and excellence.
              </p>
            </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose/10 to-mauveine/10"></div>

                {/* Main image */}
                <Image
                  src="/images/logo.png"
                  alt="Our Story"
                  fill
                  className="object-cover object-center"
                />

                {/* Overlay elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>

                {/* Floating stats */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg"
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-rose to-mauveine text-transparent bg-clip-text">
                    13+
                  </div>
                  <div className="text-sm text-gray-600">
                    Years of Excellence
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg"
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-rose to-mauveine text-transparent bg-clip-text">
                    500+
                  </div>
                  <div className="text-sm text-gray-600">
                    Projects Delivered
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="prose prose-lg">
                <p className="text-gray-600 leading-relaxed">
                  DEAZY Tech Solutions began with a vision to revolutionize the
                  digital landscape. Our commitment to innovation and excellence
                  has driven us to become a leading force in software
                  development and digital transformation.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Today, we're proud to have helped hundreds of businesses
                  achieve their digital goals through cutting-edge solutions and
                  unwavering dedication to quality.
                </p>
              </div>

              {/* Milestones */}
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-rose/10 to-mauveine/10 flex items-center justify-center text-rose group-hover:scale-110 transition-transform duration-300">
                        <milestone.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-semibold bg-gradient-to-r from-rose to-mauveine text-transparent bg-clip-text">
                          {milestone.year}
                        </span>
                        <span className="text-lg font-semibold text-gray-900">
                          {milestone.title}
                        </span>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
