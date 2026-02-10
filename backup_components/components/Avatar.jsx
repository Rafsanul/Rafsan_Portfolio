// src/components/Avatar.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Avatar = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculateRotation = () => {
    const x = (mousePosition.y / window.innerHeight - 0.5) * 15;
    const y = (mousePosition.x / window.innerWidth - 0.5) * 15;
    return { x, y };
  };

  const rotation = calculateRotation();

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Multiple glow effects */}
      <motion.div 
        className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      {/* Main avatar container with 3D tilt */}
      <motion.div
        className="relative z-10"
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        {/* Avatar circle with gradient border */}
        <div className="relative">
          <motion.div 
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 opacity-70 blur"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative w-64 h-64 rounded-full border-4 border-transparent overflow-hidden bg-gradient-to-br from-gray-900 to-black">
            {/* Your image goes here - replace with your photo */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-blue-600/30">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
                className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              >
                UD
              </motion.div>
            </div>
            
            {/* Animated rings */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{ background: 'conic-gradient(from 0deg, #8b5cf6, #3b82f6, #8b5cf6)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

        {/* Floating tech icons */}
        <motion.div 
          className="absolute -top-8 -right-8 w-14 h-14 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
        >
          <span className="text-blue-300 text-sm">⚛️</span>
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-10 -left-10 w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        >
          <span className="text-purple-300 text-sm">🚀</span>
        </motion.div>
        
        <motion.div 
          className="absolute top-1/2 -right-12 w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center"
          animate={{ 
            x: [0, 15, 0],
            rotate: [0, 15, 0]
          }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}
        >
          <span className="text-cyan-300 text-sm">💻</span>
        </motion.div>
      </motion.div>

      {/* Orbiting elements */}
      <motion.div
        className="absolute top-1/4 left-1/4"
        animate={{ 
          rotate: 360,
          x: [0, 100, 0, -100, 0],
          y: [0, 50, 100, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-3 h-3 rounded-full bg-purple-500/50"></div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/3 right-1/3"
        animate={{ 
          rotate: -360,
          x: [0, -80, 0, 80, 0],
          y: [0, -40, -80, -40, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
      </motion.div>
    </div>
  );
};

export default Avatar;