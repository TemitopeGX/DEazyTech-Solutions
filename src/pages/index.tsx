import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const HomePage: React.FC = () => {
  // Auto-scroll logic for services carousel
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let direction: "right" | "left" = "right";
    let frame: number;
    function autoScroll() {
      if (!el) return;
      if (direction === "right") {
        el.scrollLeft += 1;
        if (el.scrollLeft + el.offsetWidth >= el.scrollWidth)
          direction = "left";
      } else {
        el.scrollLeft -= 1;
        if (el.scrollLeft <= 0) direction = "right";
      }
      frame = requestAnimationFrame(autoScroll);
    }
    frame = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <Head>
        <title>DEAZY Tech Solutions - Custom Software Development</title>
        <meta
          name="description"
          content="Empowering Business Growth with Innovative Software. DEAZY Tech Solutions delivers custom, secure, and scalable digital platforms for organizations."
        />
      </Head>
      {/* Hero Section - EduGram style */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-[#f5f6fa] to-[#e9eafc] overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 py-16">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
              Empower Your <span className="text-[#ff096c]">Business</span> with
              the <span className="text-[#8a0faf]">Future</span> of{" "}
              <span className="text-[#4e10d3]">Software</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-8">
              DEAZY Tech Solutions delivers world-class custom software, web,
              and mobile solutions, helping organizations grow and innovate in a
              digital world.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/start-project"
                className="px-7 py-3 bg-gradient-to-r from-[#ff096c] to-[#8a0faf] rounded-full text-white font-semibold shadow-md hover:opacity-90 transition-all"
              >
                Start Your Project
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3 border-2 border-[#8a0faf] rounded-full text-[#8a0faf] font-semibold hover:bg-[#8a0faf] hover:text-white transition-all"
              >
                Contact Us
              </Link>
            </div>
            <div className="flex gap-8 mt-2">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#15181e]">
                  100+
                </div>
                <div className="text-xs text-gray-500">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#15181e]">
                  5+
                </div>
                <div className="text-xs text-gray-500">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#15181e]">
                  24/7
                </div>
                <div className="text-xs text-gray-500">Support</div>
              </div>
            </div>
          </div>
          {/* Right: Hero Image */}
          <div className="flex-1 flex justify-center items-center relative min-w-[340px] md:min-w-[480px]">
            <div className="rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white md:-ml-16 -ml-6">
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
                alt="Programmer at work"
                width={520}
                height={600}
                className="object-cover w-[340px] h-[400px] md:w-[520px] md:h-[600px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      {/* Services Section - Clean Grid Layout */}
      <section className="py-24 bg-[#f8f9fd]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-4 text-[#ff096c] font-medium">
              Services we offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We deliver a full spectrum of digital solutions to help your
              business grow and succeed in a digital world.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
            {/* Software Development */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10"
                    stroke="#8a0faf"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 21h8M12 17v4"
                    stroke="#ff096c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">Software Development</h3>
              <p className="text-gray-600 text-base">
                Custom software, LMS, eCommerce, enterprise apps, and automation
                tools.
              </p>
            </div>
            {/* Mobile App Development */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="7"
                    y="2"
                    width="10"
                    height="20"
                    rx="2"
                    stroke="#8a0faf"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="18" r="1" fill="#ff096c" />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">Mobile App Development</h3>
              <p className="text-gray-600 text-base">
                Native and cross-platform apps for Android and iOS.
              </p>
            </div>
            {/* Web Development */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="16"
                    rx="2"
                    stroke="#8a0faf"
                    strokeWidth="2"
                  />
                  <path d="M3 8h18" stroke="#ff096c" strokeWidth="2" />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">Web Development</h3>
              <p className="text-gray-600 text-base">
                High-performance websites and web apps focused on security and
                UX.
              </p>
            </div>
            {/* IT Consulting & Digital Transformation */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 20v-6M12 4v2M4 12h2m12 0h2M7.76 7.76l1.42 1.42M16.24 16.24l1.42 1.42M7.76 16.24l1.42-1.42M16.24 7.76l1.42-1.42"
                    stroke="#8a0faf"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="12" r="3" fill="#ff096c" />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">
                IT Consulting & Digital Transformation
              </h3>
              <p className="text-gray-600 text-base">
                Expert advice and solutions to automate and optimize your
                operations.
              </p>
            </div>
            {/* Support & Maintenance */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 20v-4M8 20v-4M16 20v-4M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"
                    stroke="#8a0faf"
                    strokeWidth="2"
                  />
                  <rect
                    x="4"
                    y="8"
                    width="16"
                    height="12"
                    rx="2"
                    stroke="#ff096c"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">Support & Maintenance</h3>
              <p className="text-gray-600 text-base">
                Ongoing support, updates, and troubleshooting for smooth
                performance.
              </p>
            </div>
            {/* UI/UX Design */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="4"
                    stroke="#8a0faf"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="12" r="4" fill="#ff096c" />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">UI/UX Design</h3>
              <p className="text-gray-600 text-base">
                Intuitive and engaging user interface and experience design for
                web and mobile apps.
              </p>
            </div>
            {/* Cloud Solutions */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 18a4 4 0 1 1 0-8 5.5 5.5 0 0 1 10.9 1.5A4.5 4.5 0 1 1 18 18H6z"
                    stroke="#8a0faf"
                    strokeWidth="2"
                    fill="#ff096c"
                  />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">Cloud Solutions</h3>
              <p className="text-gray-600 text-base">
                Scalable cloud infrastructure, migration, and integration for
                modern businesses.
              </p>
            </div>
            {/* Digital Marketing */}
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:shadow-2xl min-h-[320px] min-w-[300px] max-w-[400px] mx-auto">
              <span className="text-5xl mb-6 text-[#8a0faf]">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M4 4h16v16H4z" stroke="#8a0faf" strokeWidth="2" />
                  <path d="M8 12h8M8 16h5" stroke="#ff096c" strokeWidth="2" />
                  <circle cx="8" cy="8" r="1.5" fill="#ff096c" />
                </svg>
              </span>
              <h3 className="text-xl font-bold mb-3">Digital Marketing</h3>
              <p className="text-gray-600 text-base">
                Online marketing, SEO, and social media strategies to grow your
                brand.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Trusted By Companies Section - Continuous Scrolling Logos (Online Images) */}
      <section className="py-14 bg-white border-t border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-4 text-[#8a0faf] font-medium">
              Trusted by leading companies
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our Clients & Partners
            </h3>
          </div>
          <div className="relative overflow-hidden w-full">
            <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
              {/* Online logo images */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                alt="Google"
                className="h-12 w-auto object-contain transition-all"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
                alt="Microsoft"
                className="h-12 w-auto object-contain transition-all"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png"
                alt="Slack"
                className="h-12 w-auto object-contain transition-all"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
                alt="IBM"
                className="h-12 w-auto object-contain transition-all"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="Amazon"
                className="h-12 w-auto object-contain transition-all"
              />
              {/* Repeat for infinite effect */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                alt="Google"
                className="h-12 w-auto object-contain transition-all"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
                alt="Microsoft"
                className="h-12 w-auto object-contain transition-all"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png"
                alt="Slack"
                className="h-12 w-auto object-contain transition-all"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
                alt="IBM"
                className="h-12 w-auto object-contain transition-all"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="Amazon"
                className="h-12 w-auto object-contain transition-all"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Tech Stack Section with Tabs */}
      <section className="py-14 bg-[#f8f9fd] border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-4 text-[#4e10d3] font-medium">
              Tech Stack
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Technologies We Use
            </h3>
          </div>
          {/* Tabs */}
          {(() => {
            const tabs = [
              { label: "Frontend", key: "frontend" },
              { label: "Backend", key: "backend" },
              { label: "Database", key: "database" },
              { label: "Tools", key: "tools" },
              { label: "Design", key: "design" },
            ];
            const logos = {
              frontend: [
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                  alt: "React",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
                  alt: "Next.js",
                  extra: "bg-white rounded-lg p-2",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
                  alt: "Vue.js",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
                  alt: "Angular",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                  alt: "JavaScript",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
                  alt: "TypeScript",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                  alt: "HTML5",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                  alt: "CSS3",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
                  alt: "Tailwind CSS",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
                  alt: "Bootstrap",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
                  alt: "Material UI",
                },
              ],
              backend: [
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                  alt: "Node.js",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
                  alt: "Express.js",
                  extra: "bg-white rounded-lg p-2",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
                  alt: "NestJS",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                  alt: "Python",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
                  alt: "Django",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
                  alt: "PHP",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
                  alt: "Laravel",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
                  alt: "Java",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
                  alt: "Go",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
                  alt: "Ruby",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
                  alt: "Swift",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
                  alt: "Kotlin",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
                  alt: "Dart",
                },
              ],
              database: [
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
                  alt: "MySQL",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
                  alt: "MongoDB",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
                  alt: "PostgreSQL",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
                  alt: "Redis",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
                  alt: "SQLite",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
                  alt: "Firebase",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg",
                  alt: "MariaDB",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
                  alt: "Oracle",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
                  alt: "SQL Server",
                },
              ],
              tools: [
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
                  alt: "Git",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
                  alt: "GitHub",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
                  alt: "GitLab",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
                  alt: "VS Code",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
                  alt: "Webpack",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
                  alt: "Docker",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
                  alt: "Kubernetes",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aws/aws-original.svg",
                  alt: "AWS",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
                  alt: "Google Cloud",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
                  alt: "Azure",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
                  alt: "Jenkins",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg",
                  alt: "ESLint",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg",
                  alt: "Babel",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg",
                  alt: "Heroku",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
                  alt: "Jest",
                },
              ],
              design: [
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
                  alt: "Figma",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg",
                  alt: "Sketch",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/adobephotoshop/adobephotoshop-plain.svg",
                  alt: "Photoshop",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/adobexd/adobexd-plain.svg",
                  alt: "Adobe XD",
                },
                {
                  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/adobeillustrator/adobeillustrator-plain.svg",
                  alt: "Illustrator",
                },
              ],
            } as const;
            const [activeTab, setActiveTab] =
              useState<keyof typeof logos>("frontend");
            return (
              <>
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() =>
                        setActiveTab(tab.key as keyof typeof logos)
                      }
                      className={`px-6 py-2 rounded-full font-semibold border transition-all text-base md:text-lg focus:outline-none ${
                        activeTab === tab.key
                          ? "bg-gradient-to-r from-[#ff096c] to-[#8a0faf] text-white shadow-md"
                          : "bg-white text-[#4e10d3] border-[#8a0faf] hover:bg-[#f3eafd]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 min-w-[320px]">
                  {[...logos[activeTab]].map((logo: any, idx: number) => (
                    <img
                      key={logo.alt + idx}
                      src={logo.src}
                      alt={logo.alt}
                      className={`h-12 w-auto object-contain ${
                        "extra" in logo ? logo.extra : ""
                      }`}
                    />
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </section>
      {/* Development & Design Approach Section - Horizontal Stepper */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-4 text-[#8a0faf] font-medium">
              Our Process
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our Development & Design Approach
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We follow a proven, collaborative process to deliver high-quality,
              user-focused digital solutions.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-stretch justify-between gap-10 md:gap-0 relative">
            {/* Connecting line for horizontal stepper */}
            <div
              className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#ff096c]/20 to-[#8a0faf]/20 z-0"
              style={{ transform: "translateY(-50%)" }}
            />
            {[
              {
                icon: (
                  <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#8a0faf"
                      strokeWidth="2"
                      fill="#f3eafd"
                    />
                    <path
                      d="M8 12h8M12 8v8"
                      stroke="#ff096c"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ),
                title: "Discovery & Consultation",
                desc: "We start by understanding your business goals, challenges, and requirements through in-depth consultation.",
              },
              {
                icon: (
                  <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#8a0faf"
                      strokeWidth="2"
                      fill="#f3eafd"
                    />
                    <path
                      d="M7 17l5-5 5 5"
                      stroke="#ff096c"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: "Planning & Strategy",
                desc: "Our team crafts a tailored project plan, defining milestones, deliverables, and timelines for success.",
              },
              {
                icon: (
                  <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#8a0faf"
                      strokeWidth="2"
                      fill="#f3eafd"
                    />
                    <rect
                      x="8"
                      y="8"
                      width="8"
                      height="8"
                      rx="2"
                      stroke="#ff096c"
                      strokeWidth="2"
                    />
                  </svg>
                ),
                title: "UI/UX Design",
                desc: "We create intuitive, engaging designs focused on user experience and your brand identity.",
              },
              {
                icon: (
                  <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#8a0faf"
                      strokeWidth="2"
                      fill="#f3eafd"
                    />
                    <path
                      d="M8 16l4-8 4 8"
                      stroke="#ff096c"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: "Development",
                desc: "Our engineers build robust, scalable solutions using the latest technologies and best practices.",
              },
              {
                icon: (
                  <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#8a0faf"
                      strokeWidth="2"
                      fill="#f3eafd"
                    />
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="#ff096c"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: "Testing & Quality Assurance",
                desc: "Comprehensive testing ensures your product is secure, reliable, and ready for launch.",
              },
              {
                icon: (
                  <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#8a0faf"
                      strokeWidth="2"
                      fill="#f3eafd"
                    />
                    <path
                      d="M12 8v4l3 3"
                      stroke="#ff096c"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: "Deployment & Support",
                desc: "We launch your solution and provide ongoing support and maintenance for continuous improvement.",
              },
            ].map((step, idx, arr) => (
              <div
                key={step.title}
                className="relative z-10 flex-1 flex flex-col items-center text-center px-2 md:px-4 mb-10 md:mb-0"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg border-2 border-[#e9eafc] mb-4 relative z-10">
                  {step.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm mb-0">{step.desc}</p>
                {/* Vertical line for mobile */}
                {idx < arr.length - 1 && (
                  <div
                    className="block md:hidden absolute left-1/2 top-full w-1 h-10 bg-gradient-to-b from-[#ff096c]/20 to-[#8a0faf]/20"
                    style={{ transform: "translateX(-50%)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  );
};

export default HomePage;
