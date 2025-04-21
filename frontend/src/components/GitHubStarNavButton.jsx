import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const GitHubStarNavButton = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [stars, setStars] = useState([]);

  // GitHub repository URL
  const repoUrl = "https://github.com/S-KABILAN/Expense-Tracker";

  // Generate stars when hovered
  useEffect(() => {
    if (isHovered) {
      const newStars = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50, // Random position around the button
        y: Math.random() * 100 - 50,
        scale: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * 360,
      }));
      setStars(newStars);
    } else {
      setStars([]);
    }
  }, [isHovered]);

  const handleClick = () => {
    window.open(repoUrl, "_blank");
  };

  return (
    <div className="relative">
      {/* Animated stars that appear on hover */}
      <AnimatePresence>
        {isHovered &&
          stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute pointer-events-none"
              initial={{
                opacity: 0,
                scale: 0,
                x: 0,
                y: 0,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, star.scale, 0],
                x: [0, star.x, star.x * 2],
                y: [0, star.y, star.y * 2],
                rotate: [0, star.rotation, star.rotation * 2],
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
              style={{
                top: "50%",
                left: "50%",
                zIndex: 10,
              }}
            >
              <svg
                className="w-3 h-3 text-yellow-400 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Button with star icon */}
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center space-x-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center">
          <motion.svg
            className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-400"
            animate={
              isHovered ? { rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] } : {}
            }
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </motion.svg>
          Give repo a star
        </span>
      </motion.button>
    </div>
  );
};

GitHubStarNavButton.propTypes = {
  className: PropTypes.string,
};

export default GitHubStarNavButton;
