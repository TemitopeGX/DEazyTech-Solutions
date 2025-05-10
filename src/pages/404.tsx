import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - DEazy Tech Solutions</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Return to DEazy Tech Solutions homepage."
        />
      </Head>

      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute w-[500px] h-[500px] -top-48 -left-24 bg-[#ff096c] rounded-full mix-blend-multiply opacity-10 animate-blob" />
          <div className="absolute w-[500px] h-[500px] -top-48 -right-24 bg-[#8a0faf] rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000" />
          <div className="absolute w-[500px] h-[500px] top-[60%] left-[50%] transform -translate-x-1/2 bg-[#ff096c] rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-4000" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#ff096c05_1px,transparent_1px),linear-gradient(-45deg,#8a0faf05_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[150px] md:text-[200px] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]"
            >
              404
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-foreground"
            >
              Page Not Found
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-muted-foreground max-w-md mx-auto"
            >
              Oops! The page you're looking for doesn't exist or has been moved.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#ff096c] to-[#8a0faf] hover:opacity-90 text-white gap-2 group"
              >
                <Link href="/">
                  <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Back to Home
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 group border-[#ff096c]/20 hover:border-[#8a0faf]/40"
              >
                <Link href="/contact">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Contact Support
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
