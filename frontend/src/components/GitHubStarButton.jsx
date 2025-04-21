import { useState } from "react";
import { motion } from "framer-motion";

const GitHubStarButton = ({ className = "" }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // GitHub repository URL
  const repoUrl = "https://github.com/kabilan-s/expense-tracker";

  const handleClick = () => {
    setIsAnimating(true);
    window.open(repoUrl, "_blank");

    // Reset animation after it completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative">
        {/* GitHub logo */}
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
          />
        </svg>

        {/* Star icon with animation */}
        <motion.span
          className="absolute top-0 right-0 -mr-1 -mt-1 flex items-center justify-center"
          animate={
            isAnimating
              ? {
                  scale: [1, 1.5, 0.8, 1.2, 1],
                  rotate: [0, 15, -15, 10, 0],
                }
              : {}
          }
          transition={{ duration: 0.7 }}
        >
          <svg
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </motion.span>
      </span>
      <span>Star on GitHub</span>
    </motion.button>
  );
};

export default GitHubStarButton;
