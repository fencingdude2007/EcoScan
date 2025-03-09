import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Background = () => {
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
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-30 rounded-full blur-3xl animate-cloud" />
        <div className="absolute top-20 right-20 w-24 h-24 bg-white opacity-20 rounded-full blur-3xl animate-cloud" />
        <div className="absolute bottom-10 left-20 w-16 h-16 bg-green-300 opacity-40 rounded-full blur-xl animate-leaf" />
      </motion.div>

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
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Background
          </h2>

          <p className="text-gray-700 mb-4">
            The idea for EcoScan was born out of a simple question: <strong>How can we make sustainable shopping easier for everyone?</strong> Many consumers want to make eco-friendly choices but struggle to find reliable information on a product’s environmental impact. Researching sustainability factors—such as materials, production methods, and carbon footprint—can be time-consuming and inconsistent.
          </p>
          
          <p className="text-gray-700 mb-4">
            To solve this, we developed <strong>EcoScan</strong>, an AI-powered tool that simplifies the process. By analyzing product details and assigning an eco-friendliness score (1–100), EcoScan provides a quick, intuitive way for users to assess the sustainability of their purchases.
          </p>
          
          <p className="text-gray-700">
            Our mission is to bridge the gap between technology and sustainability, making informed shopping decisions effortless. Through our web app and Chrome extension, we aim to integrate sustainability into everyday life—one product at a time.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Background;