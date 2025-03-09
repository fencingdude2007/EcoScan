import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ResultsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productData, analysis, carbonScore } = location.state || {};

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

  if (!productData || !analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Results Found</h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 relative overflow-hidden"
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
    >
      {/* Cloud and Leaf Animations */}
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
            Analysis Results
          </h2>

          {/* Display Carbon Friendliness Score */}
          {carbonScore && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Carbon-Friendliness Score</h3>
              <p className="text-green-600 text-lg font-bold">{carbonScore}</p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Product Information</h3>
            <p className="text-gray-600">
              <strong>Title:</strong> {productData.title}
            </p>
            {productData.details && Object.keys(productData.details).length > 0 && (
              <div className="mt-2">
                <h4 className="text-lg font-medium text-gray-700">Details:</h4>
                <ul className="list-disc pl-5">
                  {Object.entries(productData.details).map(([key, value]) => (
                    <li key={key} className="text-gray-600">
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Carbon Friendliness Analysis
            </h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-900 text-lg font-bold">Analysis Details</p>
              <div className="text-gray-800 whitespace-pre-line">
                {analysis.split("\n").map((line, index) => {
                  const formattedLine = line.replace(
                    /\*\*(.*?)\*\*/g,
                    "<strong>$1</strong>"
                  );
                  return <p key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultsScreen;
