import React, { useState } from "react";
import Head from "next/head";
import {
  FaCode,
  FaMobile,
  FaLaptopCode,
  FaTools,
  FaRocket,
  FaCalendar,
  FaUpload,
  FaDollarSign,
  FaUser,
} from "react-icons/fa";
import { IconType } from "react-icons";

interface ExpertiseArea {
  icon: IconType;
  title: string;
  description: string;
  skills: string[];
}

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

  const expertiseAreas: ExpertiseArea[] = [
    {
      icon: FaCode,
      title: "Software Development",
      description:
        "Custom software solutions that enhance business efficiency and productivity.",
      skills: [
        "Learning Management Systems",
        "Enterprise Applications",
        "eCommerce Platforms",
        "Custom Software",
        "API Integration",
      ],
    },
    {
      icon: FaMobile,
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile applications for Android and iOS.",
      skills: [
        "iOS Development",
        "Android Development",
        "React Native",
        "Flutter",
        "Mobile UI/UX",
      ],
    },
    {
      icon: FaLaptopCode,
      title: "Web Development",
      description: "High-performance websites and web applications.",
      skills: ["React.js", "Next.js", "Node.js", "PHP/Laravel", "WordPress"],
    },
    {
      icon: FaTools,
      title: "IT Consulting",
      description: "Expert technology advice and digital transformation.",
      skills: [
        "Digital Strategy",
        "Process Automation",
        "System Integration",
        "Tech Architecture",
        "Cloud Solutions",
      ],
    },
  ];

  const timelineOptions = [
    "Less than 1 month",
    "1-3 months",
    "3-6 months",
    "6+ months",
    "Ongoing support",
  ];

  const budgetRanges = [
    "Less than $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000+",
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <>
      <Head
        children={
          <>
            <title>Start Your Project - DEAZY Tech Solutions</title>
            <meta
              name="description"
              content="Submit your project requirements and get started with DEAZY Tech Solutions."
            />
          </>
        }
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#15181e] to-[#4e10d3] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Start Your Project
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Tell us about your project and let our experts help you bring
                your vision to life. We'll get back to you within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Project Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaUser className="text-[#8a0faf] mr-2" size={20} />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaRocket className="text-[#8a0faf] mr-2" size={20} />
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Select Expertise Area
                      </label>
                      <select
                        name="expertise"
                        value={formData.expertise}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                        required
                      >
                        <option value="">Select an area</option>
                        {expertiseAreas.map((area, index) => (
                          <option key={index} value={area.title}>
                            {area.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Project Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                        placeholder="Describe your project requirements, goals, and any specific features you need..."
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline and Budget */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaCalendar className="text-[#8a0faf] mr-2" size={20} />
                    Timeline & Budget
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Project Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                        required
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8a0faf] focus:border-transparent"
                        required
                      >
                        <option value="">Select budget</option>
                        {budgetRanges.map((range, index) => (
                          <option key={index} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* File Attachments */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaUpload className="text-[#8a0faf] mr-2" size={20} />
                    Additional Documents
                  </h3>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Upload Files (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        name="files"
                        onChange={handleFileChange}
                        multiple
                        className="w-full"
                        accept=".pdf,.doc,.docx,.txt,.zip,.rar"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Upload any relevant documents (requirements, mockups,
                        etc.). Max file size: 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                >
                  <FaRocket size={20} />
                  <span>Submit Project Request</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default StartProjectPage;
