import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Award, Users } from "lucide-react";
import Link from "next/link";

interface Achievement {
  number: string;
  label: string;
}

interface Action {
  label: string;
  href: string;
  variant: "default" | "outline";
}

interface AboutHeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  achievements?: Achievement[];
  actions?: Action[];
}

export function AboutHero({
  badge = "Welcome to DEAZY Tech",
  title = "We Create Digital Excellence",
  subtitle = "Leading Software Development",
  description = "Transforming ideas into powerful digital solutions since 2010. We combine innovation, expertise, and creativity to deliver exceptional results that drive business success.",
  achievements = [],
  actions = [],
}: AboutHeroProps) {
  const stats = [
    {
      icon: Star,
      value: "10+",
      label: "Years Experience",
      gradient: "from-rose to-mauveine",
      delay: 0.4,
    },
    {
      icon: Award,
      value: "200+",
      label: "Projects Completed",
      gradient: "from-mauveine to-chrysler-blue",
      delay: 0.5,
    },
    {
      icon: Users,
      value: "50+",
      label: "Team Members",
      gradient: "from-chrysler-blue to-rose",
      delay: 0.6,
    },
  ];

  return (
    <div className="relative min-h-[85vh] w-full overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50/50 pt-24">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated grid pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(138,15,175,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,9,108,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(255,9,108,0.05),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_300px,rgba(138,15,175,0.05),transparent)]" />
        </div>

        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.2, 0.3],
                left: ["0%", "100%", "0%"],
                top: [(i + 1) * 30 + "%"],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div
                className={cn(
                  "w-[300px] h-[300px] rounded-full",
                  "bg-gradient-to-r from-rose/10 to-mauveine/10",
                  "blur-3xl"
                )}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-rose/10 via-mauveine/10 to-chrysler-blue/10 text-rose font-medium text-sm"
              >
                {badge}
              </motion.span>

              <div className="relative">
                <motion.h1
                  className="text-6xl md:text-8xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {title.split(" ").map((word, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <br />}
                      {i === title.split(" ").length - 1 ? (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose via-mauveine to-chrysler-blue animate-gradient">
                          {word}
                        </span>
                      ) : (
                        word
                      )}
                    </React.Fragment>
                  ))}
                </motion.h1>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -right-4 top-0 w-24 h-24 rounded-full bg-gradient-to-r from-rose/20 to-mauveine/20 blur-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -left-4 bottom-0 w-24 h-24 rounded-full bg-gradient-to-r from-mauveine/20 to-chrysler-blue/20 blur-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
              </div>

              <motion.p
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {description}
              </motion.p>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row justify-center gap-4 pt-8"
              >
                {actions.map((action, index) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className={cn(
                      "inline-flex items-center px-8 py-4 rounded-xl font-medium group transition-all duration-300",
                      action.variant === "outline"
                        ? "bg-white border border-rose/20 text-gray-800 hover:bg-rose/5"
                        : "bg-gradient-to-r from-rose to-mauveine text-white hover:shadow-lg hover:scale-105"
                    )}
                  >
                    {action.label}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: stat.delay }}
                className="group relative"
              >
                <div className="relative z-10 bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 hover:border-rose/20 transition-all duration-300 hover:shadow-xl">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} p-2.5 text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="w-full h-full" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-rose to-mauveine text-transparent bg-clip-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-rose/10 to-mauveine/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
