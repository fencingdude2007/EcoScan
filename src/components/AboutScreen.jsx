import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();

  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 relative overflow-hidden"
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-4 py-8 relative">
        <motion.button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center text-gray-800 hover:text-green-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </motion.button>

        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">About Us</h2>
          <p className="text-gray-700 text-lg">
            At EcoScan, we believe that sustainable choices should be simple and accessible. Our team—
            <strong>Alexander Gu, Arjun Pagidi, Aidan Lee,</strong> and <strong>Spencer Wang</strong>
            —created EcoScan to help consumers make informed, eco-friendly purchasing decisions without the hassle of extensive research.
          </p>
          <p className="text-gray-700 text-lg mt-4">
            EcoScan analyzes product information and assigns an eco-friendliness score (1–100) using AI-powered insights. Whether you're using our web app or our Chrome extension, you’ll get a clear, data-driven assessment of how sustainable a product is—all in just a few clicks.
          </p>
          <p className="text-gray-700 text-lg mt-4">
            We’re passionate about using technology to drive positive change, and EcoScan is our step toward a more environmentally conscious world. Join us in making sustainable shopping effortless!
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;