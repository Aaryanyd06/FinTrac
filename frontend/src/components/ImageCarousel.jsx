import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dashboardImg from "../assets/dashboard-img.png";
import expensesImg from "../assets/expenses-img.png";
import budgetImg from "../assets/budget-img.png";
import reportsImg from "../assets/reports-img.png";
import categoriesImg from "../assets/settings-img.png";
import profileImg from "../assets/profile-img.png";

// App screenshots with actual images
const appScreenshots = [
  {
    id: 1,
    title: "Dashboard Overview",
    description: "Main dashboard with expense summary and charts",
    image: dashboardImg,
  },
  {
    id: 2,
    title: "Expense Management",
    description: "Track all your expenses with ease",
    image: expensesImg,
  },
  {
    id: 3,
    title: "Budget Planning",
    description: "Set and manage your monthly budgets",
    image: budgetImg,
  },
  {
    id: 4,
    title: "Financial Reports",
    description: "Analyze your spending with detailed reports",
    image: reportsImg,
  },
  {
    id: 5,
    title: "Category Management",
    description: "Organize expenses with custom categories",
    image: categoriesImg,
  },
  {
    id: 6,
    title: "Profile Settings",
    description: "Personalize your account settings",
    image: profileImg,
  },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % appScreenshots.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            {/* Screenshot image */}
            <img
              src={appScreenshots[currentIndex].image}
              alt={appScreenshots[currentIndex].title}
              className="object-cover object-top"
              style={{ maxWidth: "100%", display: "block" }}
            />

            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4 text-white">
              <h3 className="text-base sm:text-lg font-bold">
                {appScreenshots[currentIndex].title}
              </h3>
              <p className="text-xs sm:text-sm opacity-90">
                {appScreenshots[currentIndex].description}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {appScreenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
