import { useState, useEffect } from "react";
import { FiDownload, FiMail, FiPhone, FiMapPin, FiChevronDown } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaInstagram, FaCode } from "react-icons/fa";

export default function Hero() {
  // Mouse position tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: e.clientX, 
        y: e.clientY 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Stronger movement calculation
  const calculateMovement = (sensitivity = 0.1, offset = 0) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const moveX = ((mousePosition.x - centerX) / centerX) * sensitivity * 100;
    const moveY = ((mousePosition.y - centerY) / centerY) * sensitivity * 100;
    
    return {
      x: moveX * (1 + offset * 0.3),
      y: moveY * (1 + offset * 0.3)
    };
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Rafsanul_CV.pdf';
    link.download = 'Rafsanul_Islam_Udoy_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEmail = () => window.open('mailto:rafsanthekod@gmail.com');
  const handleCall = () => window.open('tel:+8801648431726');

  // Get movement values
  const move1 = calculateMovement(0.4, 0);
  const move2 = calculateMovement(0.3, 1);
  const move3 = calculateMovement(0.2, 2);
  const move4 = calculateMovement(0.15, 3);

  return (
    <div 
      className="min-h-screen bg-black text-white overflow-hidden relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* MAIN GLOW EFFECT - VERY VISIBLE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Large central glow */}
        <div 
          className="absolute rounded-full transition-all duration-300"
          style={{
            width: '600px',
            height: '600px',
            background: `radial-gradient(circle, 
              rgba(139, 92, 246, 0.4) 0%, 
              rgba(59, 130, 246, 0.3) 30%, 
              rgba(6, 182, 212, 0.2) 50%, 
              transparent 70%
            )`,
            filter: 'blur(80px)',
            left: `${mousePosition.x - 300}px`,
            top: `${mousePosition.y - 300}px`,
            opacity: isHovering ? 0.8 : 0.6,
            transform: `scale(${isHovering ? 1.2 : 1})`
          }}
        />
        
        {/* Secondary glow */}
        <div 
          className="absolute rounded-full transition-all duration-500"
          style={{
            width: '400px',
            height: '400px',
            background: `radial-gradient(circle, 
              rgba(236, 72, 153, 0.3) 0%, 
              rgba(245, 158, 11, 0.2) 40%, 
              transparent 70%
            )`,
            filter: 'blur(60px)',
            left: `${mousePosition.x - 200 + move2.x}px`,
            top: `${mousePosition.y - 200 + move2.y}px`,
            opacity: 0.4
          }}
        />
      </div>

      {/* FLOATING PARTICLES - More visible */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(25)].map((_, i) => {
          const size = 2 + (i % 3);
          const speed = 2 + (i % 4);
          return (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: `radial-gradient(circle, 
                  ${i % 3 === 0 ? 'rgba(139, 92, 246, 0.8)' : 
                    i % 3 === 1 ? 'rgba(59, 130, 246, 0.8)' : 
                    'rgba(6, 182, 212, 0.8)'})`,
                left: `${5 + (i * 7) % 90}%`,
                top: `${10 + (i * 5) % 80}%`,
                transform: `translate(
                  ${move4.x * (0.5 + i * 0.02)}px, 
                  ${move4.y * (0.5 + i * 0.02)}px
                )`,
                animationDuration: `${speed}s`,
                animationDelay: `${i * 0.1}s`,
                boxShadow: `0 0 ${10 + i % 15}px ${
                  i % 3 === 0 ? 'rgba(139, 92, 246, 0.5)' : 
                  i % 3 === 1 ? 'rgba(59, 130, 246, 0.5)' : 
                  'rgba(6, 182, 212, 0.5)'
                }`
              }}
            />
          );
        })}
      </div>

      {/* MOUSE TRAIL EFFECT */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute w-8 h-8 rounded-full border-2 border-purple-500/50 transition-all duration-100"
          style={{
            left: `${mousePosition.x - 16}px`,
            top: `${mousePosition.y - 16}px`,
            transform: `scale(${isHovering ? 1.5 : 1}) rotate(${move1.x * 0.5}deg)`
          }}
        />
        <div 
          className="absolute w-4 h-4 rounded-full bg-blue-500/30 transition-all duration-150"
          style={{
            left: `${mousePosition.x - 8}px`,
            top: `${mousePosition.y - 8}px`,
            transform: `scale(${isHovering ? 2 : 1})`
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20">
        <div className="min-h-screen flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* LEFT COLUMN - STRONGER EFFECTS */}
            <div className="space-y-8">
              {/* Badge with glow effect */}
              <div 
                className="inline-block"
                style={{
                  transform: `translate(${move4.x * 0.5}px, ${move4.y * 0.5}px) rotate(${move4.x * 0.1}deg)`
                }}
              >
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/40 backdrop-blur-lg shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      style={{
                        animation: `pulse 1s infinite`,
                        boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)'
                      }}
                    />
                    <span className="text-sm font-medium text-purple-300">
                      Open for Opportunities
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Name with STRONG parallax */}
              <div className="space-y-2 overflow-visible">
                <h1 
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-transform duration-300"
                  style={{
                    transform: `translate3d(${move1.x * 0.3}px, ${move1.y * 0.3}px, 0)`
                  }}
                >
                  <div className="text-white drop-shadow-lg">Rafsanul Islam</div>
                  <div 
                    className="mt-2 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-gradient drop-shadow-lg"
                    style={{
                      transform: `translate3d(${move2.x * 0.4}px, ${move2.y * 0.4}px, 0)`,
                      textShadow: `0 0 30px rgba(139, 92, 246, 0.5)`
                    }}
                  >
                    Udoy
                  </div>
                </h1>
                
                <h2 
                  className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-300 transition-transform duration-300"
                  style={{
                    transform: `translate3d(${move3.x * 0.3}px, ${move3.y * 0.3}px, 0)`,
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
                  }}
                >
                  Frontend Developer & CSE Graduate
                </h2>
              </div>
              
              {/* Contact Info with glow */}
              <div className="flex flex-wrap items-center gap-4">
                {[
                  { icon: <FiMapPin />, text: "BRAC University Graduate", color: "text-purple-300", bg: "bg-purple-500/10" },
                  { icon: <FiPhone />, text: "01648 4331726", color: "text-blue-300", bg: "bg-blue-500/10" },
                  { icon: <FiMail />, text: "rafsanthekod@gmail.com", color: "text-cyan-300", bg: "bg-cyan-500/10" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${item.bg} backdrop-blur-sm border border-white/10 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                    style={{
                      transform: `translate3d(${move3.x * (0.15 * (index + 1))}px, ${move3.y * (0.15 * (index + 1))}px, 0)`
                    }}
                    onClick={index === 1 ? handleCall : index === 2 ? handleEmail : undefined}
                  >
                    <div className={`${item.color} text-lg`}>
                      {item.icon}
                    </div>
                    <span className={`${item.color} text-sm`}>{item.text}</span>
                  </div>
                ))}
              </div>
              
              {/* Bio with highlight effect */}
              <div className="space-y-4">
                {[
                  "CSE graduate from BRAC University with expertise in web development, machine learning, and team coordination.",
                  "Currently working as Junior IT Executive at PrimelT, managing web content and client solutions.",
                  "Skilled in React, Node.js, Python, Laravel, and full-stack development."
                ].map((text, index) => (
                  <div 
                    key={index}
                    className="relative group"
                    style={{
                      transform: `translate3d(${move4.x * (0.08 * (index + 1))}px, ${move4.y * (0.08 * (index + 1))}px, 0)`
                    }}
                  >
                    <p className="text-lg text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300 relative z-10">
                      {text}
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  </div>
                ))}
              </div>
              
              {/* GLOWING BUTTONS */}
              <div className="flex flex-wrap gap-4 pt-6">
                {[
                  { 
                    icon: <FiDownload />, 
                    text: "Download CV", 
                    onClick: handleDownloadCV,
                    style: "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:from-purple-700 hover:to-blue-700",
                    move: move1
                  },
                  { 
                    icon: <FiMail />, 
                    text: "Email Me", 
                    onClick: handleEmail,
                    style: "bg-gray-900/50 border border-gray-700 shadow-lg shadow-gray-900/30 hover:shadow-gray-900/50 hover:bg-gray-800",
                    move: move2
                  },
                  { 
                    icon: <FiPhone />, 
                    text: "Call Now", 
                    onClick: handleCall,
                    style: "bg-gradient-to-r from-green-600/30 to-emerald-600/30 border border-green-700/50 text-green-300 shadow-lg shadow-green-900/30 hover:shadow-green-900/50 hover:bg-green-600/40",
                    move: move3
                  }
                ].map((btn, index) => (
                  <button
                    key={index}
                    onClick={btn.onClick}
                    className={`px-6 py-3 rounded-full text-white font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-110 active:scale-95 ${btn.style}`}
                    style={{
                      transform: `translate3d(${btn.move.x * 0.2}px, ${btn.move.y * 0.2}px, 0) rotate(${btn.move.x * 0.05}deg)`
                    }}
                  >
                    {btn.icon}
                    {btn.text}
                  </button>
                ))}
              </div>
              
              {/* SOCIAL LINKS with orbitting effect */}
              <div className="pt-10">
                <p 
                  className="text-gray-400 mb-6 text-lg"
                  style={{
                    transform: `translate3d(${move4.x * 0.15}px, ${move4.y * 0.15}px, 0)`
                  }}
                >
                  Connect with me:
                </p>
                <div className="relative flex justify-center lg:justify-start">
                  <div 
                    className="absolute w-48 h-48 rounded-full border border-purple-500/20"
                    style={{
                      transform: `translate(${move3.x * 0.1}px, ${move3.y * 0.1}px) rotate(${move3.x * 0.2}deg)`
                    }}
                  />
                  {[
                    { icon: <FaGithub />, href: "https://github.com/Rafsanul", label: "GitHub", color: "hover:text-white", angle: 0 },
                    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/rafsanul-islam-70833a27a/", label: "LinkedIn", color: "hover:text-blue-400", angle: 90 },
                    { icon: <FaCode />, href: "https://leetcode.com/u/Rafsanthekod/", label: "LeetCode", color: "hover:text-yellow-400", angle: 180 },
                    { icon: <FaInstagram />, href: "https://www.instagram.com/rafsan_i_udoy/", label: "Instagram", color: "hover:text-pink-400", angle: 270 }
                  ].map((social, index) => {
                    const radius = 100;
                    const angle = social.angle * (Math.PI / 180);
                    const x = radius * Math.cos(angle + move4.x * 0.001);
                    const y = radius * Math.sin(angle + move4.y * 0.001);
                    
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute group"
                        style={{
                          transform: `translate(${x + move3.x * 0.15}px, ${y + move3.y * 0.15}px)`
                        }}
                      >
                        <div className={`text-4xl text-gray-500 ${social.color} transition-all duration-500 group-hover:scale-150 group-hover:-translate-y-3`}>
                          {social.icon}
                        </div>
                        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                          {social.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
              
              {/* GLOWING STATS */}
              <div className="grid grid-cols-3 gap-4 pt-16">
                {[
                  { label: "Projects", value: "15+", color: "from-purple-400 to-pink-400", shadow: "shadow-purple-500/20" },
                  { label: "Experience", value: "2+ Years", color: "from-blue-400 to-cyan-400", shadow: "shadow-blue-500/20" },
                  { label: "Skills", value: "12+", color: "from-green-400 to-emerald-400", shadow: "shadow-green-500/20" }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className={`text-center p-4 rounded-xl bg-gray-900/30 border border-gray-800 backdrop-blur-lg ${stat.shadow} hover:shadow-lg transition-all duration-300 hover:scale-110`}
                    style={{
                      transform: `translate3d(${move4.x * (0.1 * (index + 1))}px, ${move4.y * (0.1 * (index + 1))}px, 0) rotate(${move4.x * 0.02}deg)`
                    }}
                  >
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* RIGHT COLUMN - 3D AVATAR WITH STRONG EFFECTS */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* STRONG GLOW AROUND AVATAR */}
                <div 
                  className="absolute -inset-12 rounded-full transition-all duration-500"
                  style={{
                    background: `radial-gradient(circle, 
                      rgba(139, 92, 246, 0.4) 0%, 
                      rgba(59, 130, 246, 0.3) 30%, 
                      transparent 60%
                    )`,
                    filter: 'blur(50px)',
                    transform: `scale(${1.3 + Math.abs(move1.x) * 0.002}) rotate(${move1.x * 0.1}deg)`,
                    opacity: 0.8
                  }}
                />
                
                {/* 3D AVATAR CONTAINER */}
                <div 
                  className="relative"
                  style={{
                    transform: `perspective(1000px) 
                      rotateY(${move1.x * 0.4}deg) 
                      rotateX(${-move1.y * 0.4}deg)
                      translateZ(${Math.abs(move1.x) * 0.1}px)`
                  }}
                >
                  {/* Avatar with gradient border */}
                  <div className="relative w-72 h-72">
                    {/* Animated border */}
                    <div 
                      className="absolute -inset-1 rounded-full"
                      style={{
                        background: 'conic-gradient(from 0deg, #8b5cf6, #3b82f6, #06b6d4, #8b5cf6)',
                        animation: 'spin 3s linear infinite',
                        filter: 'blur(10px)',
                        opacity: 0.7
                      }}
                    />
                    
                    {/* Main avatar */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900">
                      <div className="w-full h-full flex items-center justify-center">
                        <div 
                          className="text-7xl font-bold text-white transition-transform duration-300 hover:scale-125"
                          style={{
                            transform: `translate3d(${move2.x * 0.2}px, ${move2.y * 0.2}px, 0)`,
                            textShadow: '0 0 30px rgba(255, 255, 255, 0.5)'
                          }}
                        >
                          UD
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating tech orbs */}
                  {[
                    { text: "React", emoji: "⚛️", color: "bg-blue-500/20", distance: 100, speed: 0.3 },
                    { text: "Node.js", emoji: "🚀", color: "bg-green-500/20", distance: 120, speed: 0.4 },
                    { text: "Python", emoji: "🐍", color: "bg-yellow-500/20", distance: 140, speed: 0.5 }
                  ].map((tech, index) => {
                    const time = Date.now() * 0.001 * tech.speed;
                    const angle = time + (index * Math.PI * 2) / 3;
                    const x = Math.cos(angle) * tech.distance + move3.x * 0.2;
                    const y = Math.sin(angle) * tech.distance + move3.y * 0.2;
                    
                    return (
                      <div
                        key={index}
                        className={`absolute ${tech.color} backdrop-blur-lg border border-white/20 rounded-full p-3 shadow-lg`}
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(${x}px, ${y}px)`,
                          animation: `orbit ${8 + index * 2}s linear infinite`
                        }}
                      >
                        <div className="text-xl">{tech.emoji}</div>
                        <div className="text-xs mt-1 text-white/80">{tech.text}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          transform: `translate(-50%, ${move4.y * 0.3}px)`
        }}
      >
        <span className="text-sm text-gray-400">Scroll to explore</span>
        <div className="w-8 h-12 border-2 border-purple-500/50 rounded-full flex justify-center p-2">
          <div 
            className="w-1 h-3 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full animate-bounce"
            style={{
              animationDuration: '1.5s'
            }}
          />
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .hover-glow {
          transition: all 0.3s ease;
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 30px currentColor;
        }
      `}</style>
    </div>
  );
}