import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  MessageSquare,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us - DEAZY Tech Solutions</title>
        <meta
          name="description"
          content="Get in touch with DEAZY Tech Solutions for your digital needs. We're here to help transform your ideas into reality."
        />
      </Head>

      <div className="min-h-screen bg-background relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] -top-48 -left-24 bg-[#ff096c] rounded-full mix-blend-multiply opacity-10 animate-blob" />
          <div className="absolute w-[500px] h-[500px] -top-48 -right-24 bg-[#8a0faf] rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000" />
          <div className="absolute w-[500px] h-[500px] top-[60%] left-[50%] transform -translate-x-1/2 bg-[#ff096c] rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-4000" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#ff096c05_1px,transparent_1px),linear-gradient(-45deg,#8a0faf05_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Hero Section */}
        <section className="relative min-h-[60vh] w-full flex items-center justify-center pt-20">
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 backdrop-blur-sm border border-white/10 mb-6"
              >
                <Sparkles className="w-4 h-4 text-[#ff096c]" />
                <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                  Let's Create Something Amazing
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
              >
                <span className="text-foreground">Get in Touch</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                  With Our Experts
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto"
              >
                Transform your ideas into reality with our expert team. We're
                here to help you build the next big thing in tech.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {[
                {
                  icon: Mail,
                  title: "Email Us",
                  content: "contact@deazytech.com",
                  link: "mailto:contact@deazytech.com",
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  content: "+123 456 7890",
                  link: "tel:+1234567890",
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  content: "Lagos, Nigeria",
                  link: "#location",
                },
                {
                  icon: Globe,
                  title: "Working Hours",
                  content: "24/7 Available",
                  link: "#",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <a
                    href={item.link}
                    className="block group-hover:scale-[1.02] transition-transform duration-300"
                  >
                    <Card className="relative overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm hover:border-[#ff096c]/50 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ff096c]/5 to-[#8a0faf]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative p-4 md:p-6">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#ff096c] to-[#8a0faf] p-2 md:p-2.5 mb-3 md:mb-4">
                          <item.icon className="w-full h-full text-white" />
                        </div>
                        <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground">
                          {item.content}
                        </p>
                      </div>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              {/* Left side - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 backdrop-blur-sm bg-background/50 border-border/50">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl font-bold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                          Send Us a Message
                        </span>
                      </h2>
                      <p className="text-muted-foreground">
                        Fill out the form below and we'll get back to you
                        shortly.
                      </p>
                    </div>

                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Your Name
                          </label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            className="border-border/50 focus:border-[#ff096c] bg-background/50 backdrop-blur-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Your Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            className="border-border/50 focus:border-[#ff096c] bg-background/50 backdrop-blur-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </label>
                        <Input
                          id="subject"
                          placeholder="Project Inquiry"
                          className="border-border/50 focus:border-[#ff096c] bg-background/50 backdrop-blur-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your project..."
                          className="min-h-[150px] border-border/50 focus:border-[#ff096c] bg-background/50 backdrop-blur-sm"
                        />
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-[#ff096c] to-[#8a0faf] hover:opacity-90 text-white gap-2 group"
                        size="lg"
                      >
                        Send Message
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </form>
                  </div>
                </Card>
              </motion.div>

              {/* Right side - Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:pl-12"
              >
                <Card className="p-8 backdrop-blur-sm bg-background/50 border-border/50">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-6">
                        Why Choose{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                          DEAZY Tech?
                        </span>
                      </h3>
                      <ul className="space-y-6">
                        {[
                          {
                            title: "Expert Team",
                            description:
                              "Years of experience in delivering cutting-edge solutions",
                          },
                          {
                            title: "Custom Solutions",
                            description:
                              "Tailored approaches to meet your unique requirements",
                          },
                          {
                            title: "24/7 Support",
                            description:
                              "Round-the-clock assistance and maintenance",
                          },
                          {
                            title: "Competitive Pricing",
                            description: "Best value for your investment",
                          },
                          {
                            title: "Quick Turnaround",
                            description: "Fast and efficient project delivery",
                          },
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-4 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff096c]/10 to-[#8a0faf]/10 flex items-center justify-center flex-shrink-0 group-hover:from-[#ff096c]/20 group-hover:to-[#8a0faf]/20 transition-colors duration-300">
                              <ArrowRight className="w-4 h-4 text-[#ff096c] group-hover:translate-x-0.5 transition-transform" />
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">
                                {item.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
