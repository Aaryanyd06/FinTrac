import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// Animated background component
const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    // Resize canvas to match window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Create particles
    function initParticles() {
      particles = [];
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 20000),
        50
      );

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        const primaryColor = darkMode
          ? "rgba(139, 92, 246,"
          : "rgba(79, 70, 229,";
        ctx.fillStyle = `${primaryColor} ${particle.opacity})`;
        ctx.fill();

        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      // Draw connecting lines between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = 0.15 * (1 - distance / 100);
            const lineColor = darkMode
              ? "rgba(139, 92, 246,"
              : "rgba(79, 70, 229,";
            ctx.strokeStyle = `${lineColor} ${opacity})`;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

const FeatureItem = ({ icon, title, delay }) => (
  <motion.div
    className="flex items-center p-3 space-x-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ scale: 1.03 }}
  >
    <div className="text-primary-500 flex-shrink-0 p-2 bg-primary-50 dark:bg-primary-900/20 rounded-md">
      {icon}
    </div>
    <span className="text-gray-800 dark:text-gray-200 text-sm md:text-base font-medium">
      {title}
    </span>
  </motion.div>
);

// Add prop validation
FeatureItem.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

const LandingPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800 relative overflow-hidden">
      <AnimatedBackground />

      {/* Enhanced floating shapes with better gradients */}
      <div className="absolute top-[15%] right-[10%] w-40 sm:w-64 h-40 sm:h-64 bg-gradient-to-br from-primary-300/20 to-purple-300/10 dark:from-primary-600/10 dark:to-purple-600/5 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-[25%] left-[10%] w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-tr from-blue-300/15 to-purple-300/10 dark:from-blue-600/10 dark:to-purple-600/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[15%] right-[20%] w-36 sm:w-56 h-36 sm:h-56 bg-gradient-to-bl from-primary-200/15 to-yellow-300/10 dark:from-primary-700/10 dark:to-yellow-600/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-[25%] left-[15%] w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-r from-green-200/15 to-blue-300/10 dark:from-green-700/10 dark:to-blue-600/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>

      {/* Header */}
      <motion.header
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-sm py-3 sm:py-4 sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative flex items-center justify-center mr-2 h-8 w-8 sm:h-9 sm:w-9">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-purple-500 rounded-lg opacity-90"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg opacity-80 animate-pulse"></div>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white relative z-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
              <span className="hidden sm:inline">Expense</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-purple-500">
                Tracker
              </span>
            </h1>
          </motion.div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.button
              onClick={toggleDarkMode}
              className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 p-1 rounded-full"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              )}
            </motion.button>
            <motion.div
              className="flex items-center space-x-2 sm:space-x-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Link
                  to="/login"
                  className="py-1.5 px-3 sm:px-4 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-xs sm:text-sm font-medium"
                >
                  Log in
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/signup"
                  className="py-1.5 px-3 sm:px-4 bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm transition-colors"
                >
                  Sign Up
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="flex-1 flex items-center relative z-1">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            {/* Left side - Text content */}
            <motion.div
              className="w-full lg:w-1/2 lg:pr-4 xl:pr-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs rounded-full font-medium tracking-wide mb-2">
                  Personal Finance Made Simple
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
                Manage Your Expenses{" "}
                <span className="text-primary-600 dark:text-primary-400 relative">
                  Effortlessly
                  <span className="absolute bottom-1 left-0 w-full h-2 bg-primary-200 dark:bg-primary-900/50 -z-10"></span>
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-base sm:text-lg">
                Take control of your finances with our simple yet powerful
                expense tracking tool. Monitor spending, set budgets, and
                achieve your financial goals.
              </p>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
                <FeatureItem
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm3.707-8.707l-1.414 1.414C5.9 4.91 7.11 6.61 8.5 8.5c.78.75 2.03 2.5 4.5 2.5a4.5 4.5 0 004.5-4.5c0-2.47-1.75-3.72-2.5-4.5-1.89-1.39-3.59-2.6-5.8-4.23l-1.414 1.414C10.59 1.61 12.79 3 14 4c1.27 1.17 2 2.14 2 3.5a2.5 2.5 0 01-2.5 2.5c-1.36 0-2.33-.73-3.5-2-1-1.21-2.39-3.41-4.79-5.97z" />
                    </svg>
                  }
                  title="Simple Expense Tracking"
                  delay={0.1}
                />
                <FeatureItem
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  }
                  title="Budget Management"
                  delay={0.2}
                />
                <FeatureItem
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                  }
                  title="Custom Categories"
                  delay={0.3}
                />
                <FeatureItem
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762z" />
                    </svg>
                  }
                  title="Insightful Reports"
                  delay={0.3}
                />
              </div>

              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full xs:w-auto"
                >
                  <Link
                    to="/signup"
                    className="btn btn-primary py-2 sm:py-2.5 px-4 sm:px-6 text-center rounded-lg shadow-md hover:shadow-lg transition-all duration-200 block text-sm sm:text-base w-full"
                  >
                    Get Started — It&apos;s Free
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full xs:w-auto"
                >
                  <Link
                    to="/login"
                    className="btn btn-outline py-2 sm:py-2.5 px-4 sm:px-6 text-center rounded-lg border-2 block hover:bg-gray-50 dark:hover:bg-gray-800 text-sm sm:text-base w-full"
                  >
                    Sign In
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Image */}
            <motion.div
              className="w-full lg:w-1/2 lg:pl-4 xl:pl-8 mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl transform transition-all hover:scale-[1.02] duration-300">
                {/* Main dashboard illustration */}
                <div className="relative aspect-[16/9] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM3OTI2ZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdi02aC02djZoNnptNiAwaDZ2LTZoLTZ2NnptLTEyIDBoLTZ2Nmg2di02em0tNi02aC02djZoNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>

                  {/* Dashboard content */}
                  <div className="relative w-full h-full flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md overflow-hidden z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-20 h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                        <div className="w-20 h-4 rounded bg-primary-200 dark:bg-primary-900"></div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 p-4">
                      {/* Left sidebar */}
                      <div className="hidden sm:block w-1/4 space-y-2 pr-2">
                        <div className="w-full h-8 rounded bg-primary-500 opacity-80"></div>
                        <div className="w-full h-6 rounded bg-gray-200 dark:bg-gray-700"></div>
                        <div className="w-full h-6 rounded bg-gray-200 dark:bg-gray-700"></div>
                        <div className="w-full h-6 rounded bg-gray-200 dark:bg-gray-700"></div>
                        <div className="w-full h-6 rounded bg-gray-200 dark:bg-gray-700"></div>
                      </div>

                      {/* Main content */}
                      <div className="flex-1 space-y-4">
                        {/* Stats cards */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-900">
                            <div className="w-8 h-8 mb-2 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center">
                              <div className="w-4 h-4 rounded-full bg-green-500"></div>
                            </div>
                            <div className="w-12 h-3 mb-1 bg-green-200 dark:bg-green-800 rounded"></div>
                            <div className="w-16 h-5 bg-green-300 dark:bg-green-700 rounded"></div>
                          </div>
                          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900">
                            <div className="w-8 h-8 mb-2 rounded-full bg-red-200 dark:bg-red-800 flex items-center justify-center">
                              <div className="w-4 h-4 rounded-full bg-red-500"></div>
                            </div>
                            <div className="w-12 h-3 mb-1 bg-red-200 dark:bg-red-800 rounded"></div>
                            <div className="w-16 h-5 bg-red-300 dark:bg-red-700 rounded"></div>
                          </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="w-full h-4 mb-3 rounded bg-gray-200 dark:bg-gray-700"></div>
                          <div className="flex items-end h-24 space-x-2">
                            <div className="w-1/12 rounded-t h-1/3 bg-primary-300 dark:bg-primary-700"></div>
                            <div className="w-1/12 rounded-t h-1/2 bg-primary-400 dark:bg-primary-600"></div>
                            <div className="w-1/12 rounded-t h-3/4 bg-primary-500 dark:bg-primary-500"></div>
                            <div className="w-1/12 rounded-t h-2/3 bg-primary-600 dark:bg-primary-400"></div>
                            <div className="w-1/12 rounded-t h-full bg-primary-700 dark:bg-primary-300"></div>
                            <div className="w-1/12 rounded-t h-1/3 bg-primary-600 dark:bg-primary-400"></div>
                            <div className="w-1/12 rounded-t h-2/3 bg-primary-500 dark:bg-primary-500"></div>
                            <div className="w-1/12 rounded-t h-1/2 bg-primary-400 dark:bg-primary-600"></div>
                            <div className="w-1/12 rounded-t h-1/3 bg-primary-300 dark:bg-primary-700"></div>
                          </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <div className="w-1/3 h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                              <div className="w-16 h-4 rounded bg-primary-200 dark:bg-primary-800"></div>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                              <div className="w-1/4 h-3 rounded bg-gray-200 dark:bg-gray-700"></div>
                              <div className="w-12 h-3 rounded bg-green-200 dark:bg-green-800"></div>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                              <div className="w-1/3 h-3 rounded bg-gray-200 dark:bg-gray-700"></div>
                              <div className="w-16 h-3 rounded bg-red-200 dark:bg-red-800"></div>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                              <div className="w-1/5 h-3 rounded bg-gray-200 dark:bg-gray-700"></div>
                              <div className="w-14 h-3 rounded bg-gray-200 dark:bg-gray-700"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-2 right-2 w-14 h-14 bg-yellow-300 dark:bg-yellow-600 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute bottom-10 left-4 w-8 h-8 bg-primary-400 dark:bg-primary-500 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
                  <div className="absolute top-1/3 right-1/4 w-10 h-10 bg-green-400 dark:bg-green-500 rounded-full opacity-20 animate-pulse animation-delay-4000"></div>
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/30 to-transparent pointer-events-none"></div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary-200 dark:bg-primary-800/30 rounded-full z-[-1]"></div>
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary-300/30 dark:bg-primary-700/20 rounded-full z-[-1]"></div>

                {/* Floating expense icons */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center transform rotate-12 animate-float">
                  <svg
                    className="w-6 h-6 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center transform -rotate-6 animate-float animation-delay-2000">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md py-4 shadow-inner relative z-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2 sm:mb-0">
              &copy; {new Date().getFullYear()} Expense Tracker. All rights
              reserved.
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-xs sm:text-sm"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-xs sm:text-sm"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-xs sm:text-sm"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Add CSS for animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(var(--rotation)); }
          50% { transform: translateY(-10px) rotate(var(--rotation)); }
          100% { transform: translateY(0px) rotate(var(--rotation)); }
        }
        .animate-float {
          --rotation: 12deg;
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
          --rotation: -6deg;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
          --rotation: 3deg;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
          --rotation: -4deg;
        }
        
        /* Extra small screen breakpoint */
        @media (min-width: 475px) {
          .xs\\:flex-row {
            flex-direction: row;
          }
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .xs\\:w-auto {
            width: auto;
          }
        }
        
        .bg-grid-primary-500\\/\\[0\\.05\\] {
          background-image: linear-gradient(to right, var(--tw-gradient-stops)),
                            linear-gradient(to bottom, var(--tw-gradient-stops));
          --tw-gradient-from: theme('colors.primary.500') var(--tw-gradient-from-position);
          --tw-gradient-stops: var(--tw-gradient-from), transparent var(--tw-gradient-via-position);
          opacity: 0.05;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
