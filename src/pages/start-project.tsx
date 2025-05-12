import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  Upload,
  Clock,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ProjectFormData {
  fullName: string;
  email: string;
  phone: string;
  expertise: string;
  description: string;
  timeline: string;
  budget: string;
  files: FileList | null;
}

const StartProjectPage: React.FC = () => {
  const [formData, setFormData] = useState<ProjectFormData>({
    fullName: "",
    email: "",
    phone: "",
    expertise: "",
    description: "",
    timeline: "",
    budget: "",
    files: null,
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const sections = ["Contact", "Project", "Timeline", "Files"];
  const progress = Math.round(
    (Object.values(formData).filter((value) => value && value !== "").length /
      (Object.keys(formData).length - 1)) *
      100
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, files: e.target.files }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log(formData);
  };

  return (
    <>
      <Head>
        <title>Start Your Project - DEAZY Tech Solutions</title>
        <meta
          name="description"
          content="Submit your project requirements and get started with DEAZY Tech Solutions."
        />
      </Head>

      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[800px] h-[800px] -top-48 -left-24 bg-[#ff096c] rounded-full mix-blend-multiply opacity-[0.03] blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[800px] h-[800px] -top-48 -right-24 bg-[#8a0faf] rounded-full mix-blend-multiply opacity-[0.03] blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[800px] h-[800px] top-[60%] left-[50%] transform -translate-x-1/2 bg-[#ff096c] rounded-full mix-blend-multiply opacity-[0.03] blur-3xl"
          />
        </div>

        {/* Enhanced grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#ff096c05_1px,transparent_1px),linear-gradient(-45deg,#8a0faf05_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Hero Section with enhanced animations */}
        <section className="relative min-h-[40vh] w-full flex items-center justify-center pt-32">
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#ff096c]/5 to-[#8a0faf]/5 backdrop-blur-sm border border-white/10 mb-6 hover:from-[#ff096c]/10 hover:to-[#8a0faf]/10 transition-all cursor-default"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-[#ff096c]" />
                </motion.div>
                <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                  Let's Build Something Amazing
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
              >
                <span className="text-foreground">Start Your</span>
                <br />
                <motion.span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf] inline-block"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 100%" }}
                >
                  Dream Project
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto"
              >
                Tell us about your project and let our experts help you bring
                your vision to life. We'll get back to you within 24 hours.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Project Form Section with enhanced animations */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="max-w-3xl mx-auto"
            >
              {/* Progress bar */}
              <motion.div
                className="mb-8 relative h-2 bg-background/50 rounded-full overflow-hidden backdrop-blur-sm"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#ff096c] to-[#8a0faf]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              {/* Section indicators */}
              <div className="flex justify-between mb-8">
                {sections.map((section, index) => (
                  <motion.button
                    key={section}
                    onClick={() => setCurrentSection(index)}
                    className={`flex flex-col items-center space-y-2 ${
                      currentSection >= index
                        ? "text-[#ff096c]"
                        : "text-muted-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        currentSection >= index
                          ? "border-[#ff096c] bg-[#ff096c]/10"
                          : "border-muted-foreground"
                      }`}
                      initial={false}
                      animate={{
                        scale: currentSection >= index ? 1 : 0.8,
                        opacity: currentSection >= index ? 1 : 0.5,
                      }}
                    >
                      <CheckCircle2
                        className={`w-5 h-5 ${
                          currentSection >= index ? "opacity-100" : "opacity-50"
                        }`}
                      />
                    </motion.div>
                    <span className="text-sm font-medium">{section}</span>
                  </motion.button>
                ))}
              </div>

              <Card className="overflow-hidden backdrop-blur-md border-white/10">
                {/* Enhanced background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff096c]/10 via-[#8a0faf]/10 to-transparent opacity-50" />

                {/* Content */}
                <div className="relative p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Contact Information */}
                    <AnimatePresence mode="wait">
                      {currentSection === 0 && (
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                            Contact Information
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              whileHover={{ scale: 1.02 }}
                              className="group"
                            >
                              <Label className="group-hover:text-[#ff096c] transition-colors">
                                Full Name
                              </Label>
                              <Input
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="mt-2 bg-background/50 backdrop-blur-sm border-white/10 focus:border-[#ff096c] transition-colors"
                                required
                              />
                            </motion.div>
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              whileHover={{ scale: 1.02 }}
                              className="group"
                            >
                              <Label className="group-hover:text-[#ff096c] transition-colors">
                                Email
                              </Label>
                              <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-2 bg-background/50 backdrop-blur-sm border-white/10 focus:border-[#ff096c] transition-colors"
                                required
                              />
                            </motion.div>
                          </div>
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.02 }}
                            className="group"
                          >
                            <Label className="group-hover:text-[#ff096c] transition-colors">
                              Phone Number
                            </Label>
                            <Input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="mt-2 bg-background/50 backdrop-blur-sm border-white/10 focus:border-[#ff096c] transition-colors"
                              required
                            />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Project Details */}
                    <AnimatePresence mode="wait">
                      {currentSection === 1 && (
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                            Project Details
                          </h2>
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ scale: 1.02 }}
                            className="group"
                          >
                            <Label className="group-hover:text-[#ff096c] transition-colors">
                              Select Expertise Area
                            </Label>
                            <select
                              name="expertise"
                              value={formData.expertise}
                              onChange={handleInputChange}
                              className="mt-2 w-full px-4 py-2 rounded-md bg-background/50 backdrop-blur-sm border border-white/10 focus:border-[#ff096c] transition-colors"
                              required
                            >
                              <option value="">Select an area</option>
                              <option value="Web Development">
                                Web Development
                              </option>
                              <option value="Mobile Development">
                                Mobile Development
                              </option>
                              <option value="UI/UX Design">UI/UX Design</option>
                              <option value="Cloud Solutions">
                                Cloud Solutions
                              </option>
                              <option value="Digital Marketing">
                                Digital Marketing
                              </option>
                            </select>
                          </motion.div>
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.02 }}
                            className="group"
                          >
                            <Label className="group-hover:text-[#ff096c] transition-colors">
                              Project Description
                            </Label>
                            <Textarea
                              name="description"
                              value={formData.description}
                              onChange={handleInputChange}
                              className="mt-2 min-h-[150px] bg-background/50 backdrop-blur-sm border-white/10 focus:border-[#ff096c] transition-colors"
                              placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                              required
                            />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Timeline & Budget */}
                    <AnimatePresence mode="wait">
                      {currentSection === 2 && (
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                            Timeline & Budget
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              whileHover={{ scale: 1.02 }}
                              className="group"
                            >
                              <Label className="group-hover:text-[#ff096c] transition-colors">
                                Project Timeline
                              </Label>
                              <select
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleInputChange}
                                className="mt-2 w-full px-4 py-2 rounded-md bg-background/50 backdrop-blur-sm border border-white/10 focus:border-[#ff096c] transition-colors"
                                required
                              >
                                <option value="">Select timeline</option>
                                <option value="1-3 months">1-3 months</option>
                                <option value="3-6 months">3-6 months</option>
                                <option value="6-12 months">6-12 months</option>
                                <option value="12+ months">12+ months</option>
                              </select>
                            </motion.div>
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              whileHover={{ scale: 1.02 }}
                              className="group"
                            >
                              <Label className="group-hover:text-[#ff096c] transition-colors">
                                Budget Range
                              </Label>
                              <select
                                name="budget"
                                value={formData.budget}
                                onChange={handleInputChange}
                                className="mt-2 w-full px-4 py-2 rounded-md bg-background/50 backdrop-blur-sm border border-white/10 focus:border-[#ff096c] transition-colors"
                                required
                              >
                                <option value="">Select budget</option>
                                <option value="$5,000 - $10,000">
                                  $5,000 - $10,000
                                </option>
                                <option value="$10,000 - $25,000">
                                  $10,000 - $25,000
                                </option>
                                <option value="$25,000 - $50,000">
                                  $25,000 - $50,000
                                </option>
                                <option value="$50,000+">$50,000+</option>
                              </select>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* File Upload */}
                    <AnimatePresence mode="wait">
                      {currentSection === 3 && (
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff096c] to-[#8a0faf]">
                            Additional Documents
                          </h2>
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="group"
                          >
                            <Label className="group-hover:text-[#ff096c] transition-colors">
                              Upload Files (Optional)
                            </Label>
                            <motion.div
                              className="mt-2 p-8 border-2 border-dashed border-white/10 rounded-lg text-center hover:border-[#ff096c] transition-colors cursor-pointer bg-background/50 backdrop-blur-sm"
                              whileHover={{ scale: 1.02 }}
                              onHoverStart={() => setIsHovered(true)}
                              onHoverEnd={() => setIsHovered(false)}
                            >
                              <input
                                type="file"
                                name="files"
                                onChange={handleFileChange}
                                className="hidden"
                                multiple
                                id="file-upload"
                              />
                              <label
                                htmlFor="file-upload"
                                className="cursor-pointer"
                              >
                                <motion.div
                                  animate={{
                                    scale: isHovered ? 1.1 : 1,
                                    y: isHovered ? -5 : 0,
                                  }}
                                  className="flex flex-col items-center gap-2"
                                >
                                  <Upload className="w-8 h-8 text-[#ff096c]" />
                                  <span className="text-sm text-muted-foreground">
                                    Upload any relevant documents (requirements,
                                    mockups, etc.)
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    Max file size: 10MB
                                  </span>
                                </motion.div>
                              </label>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6">
                      <motion.button
                        type="button"
                        onClick={() =>
                          setCurrentSection((prev) => Math.max(0, prev - 1))
                        }
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                          currentSection === 0
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-[#ff096c]/10"
                        }`}
                        whileHover={
                          currentSection !== 0 ? { scale: 1.05 } : undefined
                        }
                        whileTap={
                          currentSection !== 0 ? { scale: 0.95 } : undefined
                        }
                      >
                        Previous
                      </motion.button>

                      <motion.button
                        type={
                          currentSection === sections.length - 1
                            ? "submit"
                            : "button"
                        }
                        onClick={() =>
                          currentSection < sections.length - 1 &&
                          setCurrentSection((prev) => prev + 1)
                        }
                        className="px-6 py-2 rounded-md bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {currentSection === sections.length - 1 ? (
                          <>
                            Submit
                            <motion.div
                              animate={{
                                x: [0, 5, 0],
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                              }}
                            >
                              <Send className="w-4 h-4" />
                            </motion.div>
                          </>
                        ) : (
                          "Next"
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default StartProjectPage;
