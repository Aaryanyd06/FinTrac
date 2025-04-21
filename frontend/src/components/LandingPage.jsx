import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import ImageCarousel from "./ImageCarousel";
import GitHubStarNavButton from "./GitHubStarNavButton";

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
            {/* GitHub Star Button in Navigation */}
            <div className="hidden md:block mr-2">
              <GitHubStarNavButton />
            </div>
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

              {/* Show GitHub star button for mobile only */}
              <div className="mt-6 md:hidden">
                <GitHubStarNavButton className="justify-center" />
              </div>
            </motion.div>

            {/* Right side - Image Carousel (replaces the illustration) */}
            <motion.div
              className="w-full lg:w-1/2 lg:pl-4 xl:pl-8 mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ImageCarousel />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Updated Footer */}
      <motion.footer
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md py-4 shadow-inner relative z-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-0 flex items-center">
              &copy; 2025 Expense Tracker • Made with{" "}
              <span className="text-red-500 mx-1 animate-pulse">❤️</span>
              by Kabilan S
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Social media links */}
              <a
                href="https://github.com/S-KABILAN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/kabilan-s-3aab74256/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Terms, Privacy, Contact links */}
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
                href="https://kabilan-portfolio.vercel.app/"
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
