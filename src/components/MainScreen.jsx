// MainScreen.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Link as LinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MainScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const Leaf = ({ delay }) => (
    <motion.div
      className="absolute text-green-400"
      style={{
        fontSize: '24px',
        rotate: Math.random() * 360,
      }}
      initial={{
        x: Math.random() * window.innerWidth,
        y: -50,
        opacity: 0,
      }}
      animate={{
        y: window.innerHeight + 50,
        opacity: [0, 0.7, 0],
        rotate: Math.random() * 360,
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      🍃
    </motion.div>
  );

  const Cloud = ({ delay, size }) => (
    <motion.div
      className="absolute text-white/50"
      style={{
        fontSize: `${size}px`,
      }}
      initial={{
        x: -200,
        y: Math.random() * 200,
        opacity: 0,
      }}
      animate={{
        x: window.innerWidth + 200,
        opacity: [0, 0.5, 0],
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      ☁️
    </motion.div>
  );

  const WaterRipple = ({ delay, position }) => (
    <motion.div
      className="absolute rounded-full border border-blue-300/30"
      style={{
        width: 0,
        height: 0,
        ...position,
      }}
      animate={{
        width: 100,
        height: 100,
        opacity: [0.5, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!link.trim()) {
      setError('Please enter a valid URL');
      return;
    }
  
    setIsLoading(true);
    setError('');
  
    try {
        console.log('Sending request to backend:', link);
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: link }),
      });
  
      console.log('Response received:', response);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Data received:', data);
      navigate('/results', { state: { productData: data.product, analysis: data.analysis } });
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Error analyzing URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 overflow-hidden"
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <Leaf key={`leaf-${i}`} delay={i * 2} />
        ))}
        {[...Array(5)].map((_, i) => (
          <Cloud
            key={`cloud-${i}`}
            delay={i * 5}
            size={Math.random() * 40 + 30}
          />
        ))}
        {[...Array(3)].map((_, i) => (
          <WaterRipple
            key={`ripple-${i}`}
            delay={i * 2}
            position={{
              left: Math.random() * window.innerWidth,
              top: Math.random() * window.innerHeight,
            }}
          />
        ))}
      </div>

      <motion.button
        className="fixed top-6 left-6 z-50 p-2 rounded-full bg-green-500/20 backdrop-blur-sm hover:bg-green-500/40 transition-colors"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-gray-800" />
        ) : (
          <Menu className="w-6 h-6 text-gray-800" />
        )}
      </motion.button>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed top-0 left-0 h-full w-64 bg-green-800/95 backdrop-blur-md z-40"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="p-6 space-y-8 mt-20">
              <motion.a
                href="/about"
                className="block text-xl text-white hover:text-green-200 transition-colors"
                whileHover={{ x: 10 }}
              >
                About Us
              </motion.a>
              <motion.a
                href="/background"
                className="block text-xl text-white hover:text-green-200 transition-colors"
                whileHover={{ x: 10 }}
              >
                Background
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-gray-800 mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        >
          EcoScan
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl blur opacity-50"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="relative flex items-center">
              <LinkIcon className="absolute left-4 text-gray-600 w-5 h-5" />
              <input
                type="url"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                  setError('');
                }}
                placeholder="Enter your link here..."
                className="w-full py-4 pl-12 pr-4 text-gray-800 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-300 focus:outline-none focus:border-green-500 transition-all"
                required
                disabled={isLoading}
              />
              <motion.button
                type="submit"
                className="absolute right-2 px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white font-medium"
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? 'Analyzing...' : 'Submit'}
              </motion.button>
            </div>
          </div>
          {error && (
            <motion.p
              className="text-red-500 mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}
        </motion.form>

        <motion.div
          className="absolute bottom-10 text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Powered by Environmental Evaluator Technologies
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MainScreen;
