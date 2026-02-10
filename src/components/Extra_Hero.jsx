import { useState, useEffect, useRef } from "react";
import { FiDownload, FiMail, FiPhone, FiMapPin, FiCpu, FiCode } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaInstagram, FaTerminal } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchText, setGlitchText] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const name = "Rafsanul Islam Udoy";
  const title = "Computer Science & Engineering Graduate";

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add particle on mouse move
      if (particles.length < 50) { // Limit particles
        const newParticle = {
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          life: 100,
          color: Math.random() > 0.5 ? '#0af' : '#f0a'
        };
        setParticles(prev => [...prev, newParticle].slice(-100)); // Keep last 100 particles
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [particles.length]);

  // Update particles animation
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.speedX,
            y: p.y + p.speedY,
            life: p.life - 1,
            size: p.size * 0.99
          }))
          .filter(p => p.life > 0 && p.size > 0.5)
      );
    }, 16); // ~60fps
    
    return () => clearInterval(interval);
  }, []);

  // Text glitch effect - ONLY for badge
  useEffect(() => {
    const glitchChars = "01_#%&@$*";
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const chars = Array.from({ length: 3 }, () => 
          glitchChars[Math.floor(Math.random() * glitchChars.length)]
        ).join('');
        setGlitchText(chars);
        setTimeout(() => setGlitchText(""), 100);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Enhanced Background Animation with DOTS instead of boxes
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    
    // Matrix rain characters
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const columns = Math.floor(canvas.width / 25); // Slightly fewer columns
    const drops = Array(columns).fill(0);
    const speeds = Array(columns).fill().map(() => Math.random() * 2 + 1.5); // Slower speed
    const colors = Array(columns).fill().map(() => {
      const hue = Math.random() * 60 + 180; // Blue to cyan range
      return `hsl(${hue}, 80%, 60%)`; // Less saturation
    });
    
    const draw = () => {
      time += 0.01;
      
      // Clear with very subtle fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw DOTS at grid intersections (instead of boxes)
      const gridSize = 40;
      ctx.fillStyle = 'rgba(0, 170, 255, 0.15)';
      
      for (let x = gridSize; x < canvas.width; x += gridSize) {
        for (let y = gridSize; y < canvas.height; y += gridSize) {
          // Pulsing effect
          const pulse = Math.sin(time * 2 + x * 0.01 + y * 0.01) * 0.5 + 0.5;
          const size = pulse * 1.5; // Small dots
          
          // Draw dot
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw connection lines from dots to cursor (subtle)
          const distance = Math.sqrt(Math.pow(x - mousePosition.x, 2) + Math.pow(y - mousePosition.y, 2));
          if (distance < 120 && Math.random() > 0.8) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(mousePosition.x, mousePosition.y);
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 + pulse * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
          
          // Connect nearby dots with very subtle lines
          if (x + gridSize < canvas.width && Math.random() > 0.7) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + gridSize, y);
            ctx.strokeStyle = `rgba(0, 170, 255, ${0.05})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
          
          if (y + gridSize < canvas.height && Math.random() > 0.7) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + gridSize);
            ctx.strokeStyle = `rgba(0, 170, 255, ${0.05})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      }
      
      // Draw subtle matrix rain (reduced opacity)
      ctx.font = '14px monospace';
      drops.forEach((drop, i) => {
        const x = i * 25;
        const y = drop;
        
        // Draw character with reduced opacity
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = colors[i].replace(')', ', 0.3)').replace('hsl', 'hsla'); // 30% opacity
        ctx.fillText(char, x, y);
        
        // Draw very subtle trail
        for (let j = 0; j < 6; j++) {
          const trailY = y - j * 20;
          const opacity = 1 - j * 0.15;
          ctx.fillStyle = `rgba(0, 255, 255, ${opacity * 0.1})`; // Very faint
          const trailChar = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(trailChar, x, trailY);
        }
        
        // Move drop down
        drops[i] += speeds[i];
        
        // Reset if off screen or randomly
        if (drops[i] > canvas.height || Math.random() > 0.995) {
          drops[i] = 0;
          speeds[i] = Math.random() * 2 + 1.5;
        }
      });
      
      // Draw floating particles (reduced count and opacity)
      for (let i = 0; i < 12; i++) {
        const x = (Math.sin(time * 0.3 + i) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.4 + i) * 0.5 + 0.5) * canvas.height;
        const size = Math.sin(time + i) * 1.5 + 3;
        
        // Main particle
        ctx.fillStyle = i % 3 === 0 ? 'rgba(0, 170, 255, 0.3)' : 
                        i % 3 === 1 ? 'rgba(255, 0, 170, 0.3)' : 
                        'rgba(170, 0, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Very subtle glow effect
        ctx.fillStyle = i % 3 === 0 ? 'rgba(0, 170, 255, 0.05)' : 
                        i % 3 === 1 ? 'rgba(255, 0, 170, 0.05)' : 
                        'rgba(170, 0, 255, 0.05)';
        ctx.beginPath();
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Add subtle cursor interaction with dots
      if (mousePosition.x > 0 && mousePosition.y > 0) {
        // Very faint glow around cursor
        const gradient = ctx.createRadialGradient(
          mousePosition.x, mousePosition.y, 0,
          mousePosition.x, mousePosition.y, 80
        );
        gradient.addColorStop(0, 'rgba(0, 170, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 170, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mousePosition.x, mousePosition.y, 80, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => cancelAnimationFrame(animationId);
  }, [mousePosition]);

  // Particle canvas drawing
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x - 1, particle.y - 1, particle.size, particle.size);
        
        // Pixel glow effect
        ctx.fillStyle = `${particle.color}80`;
        ctx.fillRect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size * 2, particle.size * 2);
      });
    };
    
    draw();
  }, [particles]);

  // UPDATED CV DOWNLOAD FUNCTION WITH ERROR HANDLING
  const handleDownloadCV = () => {
    const cvUrl = '/Rafsanul_CV.pdf';
    
    // First, check if the file exists
    fetch(cvUrl)
      .then(response => {
        if (response.ok) {
          // File exists - download it
          const link = document.createElement('a');
          link.href = cvUrl;
          link.download = 'Rafsanul_Islam_Udoy_CV.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Optional: Show success message
          console.log('CV download started successfully');
        } else {
          // File doesn't exist - show user-friendly error
          console.error('CV file not found on server (Status:', response.status, ')');
          alert('CV file is currently unavailable. Please email me at rafsanthekod@gmail.com to request my resume.');
          
          // Open email as fallback
          window.open('mailto:rafsanthekod@gmail.com?subject=Request for CV&body=Hello Rafsanul, I would like to request your CV.');
        }
      })
      .catch(error => {
        console.error('Error checking/downloading CV:', error);
        
        // Try alternative method - open in new tab
        const link = document.createElement('a');
        link.href = cvUrl;
        link.target = '_blank'; // Open in new tab
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // If still fails, show message after a delay
        setTimeout(() => {
          alert('If download didn\'t start, the CV file might not be available. Please contact me directly at rafsanthekod@gmail.com');
        }, 1500);
      });
  };

  const handleEmail = () => window.open('mailto:rafsanthekod@gmail.com');
  const handleCall = () => window.open('tel:+8801648431726');

  // Pixel movement
  const pixelMoveX = ((mousePosition.x / window.innerWidth) - 0.5) * 40;
  const pixelMoveY = ((mousePosition.y / window.innerHeight) - 0.5) * 40;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-mono">
      {/* Enhanced Background Canvas with DOTS */}
      <canvas
        ref={bgCanvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-70"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      
      {/* Subtle gradient overlay for better content visibility */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
      
      {/* Particle Trail Canvas */}
      <canvas
        ref={particleCanvasRef}
        className="fixed inset-0 pointer-events-none z-1"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      
      {/* VERY subtle grid overlay (just for reference) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 170, 255, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 170, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Glitch Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-3">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="min-h-screen flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* LEFT COLUMN - PIXEL STYLE */}
            <div className="space-y-8">
              {/* Pixel Badge with glitch */}
              <div 
                className="inline-block pixel-border"
                style={{
                  transform: `translate(${pixelMoveX * 0.1}px, ${pixelMoveY * 0.1}px)`
                }}
              >
                <div className="inline-flex items-center px-4 py-2 bg-black border-2 border-cyan-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 animate-pulse" />
                    <span className="text-sm font-bold text-cyan-300 tracking-wider">
                      {glitchText || ">_ AVAILABLE_FOR_OPPORTUNITIES"}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Pixel Art Name */}
              <div className="space-y-2">
                <div className="relative">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">
                    <div className="text-white pixel-text">
                      RAFSANUL ISLAM
                    </div>
                    <div className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 pixel-text">
                      UDOY
                    </div>
                  </h1>
                  
                  {/* Pixel overlay effect */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="h-1 w-full bg-cyan-500 animate-pulse" />
                  </div>
                </div>
                
                {/* Clean Title - UPDATED */}
                <div className="relative">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wider">
                    <span className="text-gray-400">{">_ "}</span>
                    <span className="text-cyan-300">COMPUTER SCIENCE & ENGINEERING GRADUATE</span>
                  </h2>
                </div>
              </div>
              
              {/* Pixel Contact Info */}
              <div className="flex flex-wrap items-center gap-4">
                {[
                  { icon: <FiCpu />, text: "BRAC_UNIVERSITY_GRADUATE", color: "text-purple-400", bg: "bg-purple-500/10" },
                  { icon: <FiPhone />, text: "01648_4331726", color: "text-blue-400", bg: "bg-blue-500/10" },
                  { icon: <FiMapPin />, text: "rafsanthekod@gmail.com", color: "text-cyan-400", bg: "bg-cyan-500/10" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-2 px-3 py-2 border border-gray-800 ${item.bg} cursor-pointer hover:border-cyan-500 transition-all`}
                    style={{
                      transform: `translate(${pixelMoveX * (0.05 * (index + 1))}px, ${pixelMoveY * (0.05 * (index + 1))}px)`
                    }}
                    onClick={index === 1 ? handleCall : index === 2 ? handleEmail : undefined}
                  >
                    <div className={`${item.color}`}>{item.icon}</div>
                    <span className={`text-sm ${item.color} font-mono`}>{item.text}</span>
                  </div>
                ))}
              </div>
              
              {/* Pixel Bio - UPDATED (Only 2 lines) - NOW CLICKABLE */}
              <div className="space-4">
                {/* First line - About page link */}
                <Link to="/about" className="block">
                  <div 
                    className="relative group cursor-pointer"
                    style={{
                      transform: `translate(${pixelMoveX * 0.03}px, ${pixelMoveY * 0.03}px)`
                    }}
                  >
                    <p className="text-lg text-gray-400 font-mono py-2 border-l-2 border-gray-800 pl-4 group-hover:border-cyan-500 group-hover:text-cyan-300 transition-all">
                      {">_ "}<span className="text-green-400 group-hover:text-green-300">JUNIOR_IT_EXECUTIVE_AT_PRIMEIT</span>
                    </p>
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
                
                {/* Second line - Skills page link */}
                <Link to="/skills" className="block">
                  <div 
                    className="relative group cursor-pointer"
                    style={{
                      transform: `translate(${pixelMoveX * 0.06}px, ${pixelMoveY * 0.06}px)`
                    }}
                  >
                    <p className="text-lg text-gray-400 font-mono py-2 border-l-2 border-gray-800 pl-4 group-hover:border-cyan-500 group-hover:text-cyan-300 transition-all">
                      {">_ SKILLS: "}<span className="text-cyan-400 group-hover:text-cyan-300">REACT_NODEJS_PYTHON_LARAVEL</span>
                    </p>
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </div>
              
              {/* Pixel Buttons */}
              <div className="flex flex-wrap gap-4 pt-6">
                {[
                  { 
                    icon: <FiDownload />, 
                    text: "DOWNLOAD_CV", 
                    onClick: handleDownloadCV,
                    style: "bg-gradient-to-r from-cyan-600 to-blue-600 border-2 border-cyan-500 hover:from-cyan-700 hover:to-blue-700",
                    move: pixelMoveX
                  },
                  { 
                    icon: <FiCode />, 
                    text: "EMAIL_ME", 
                    onClick: handleEmail,
                    style: "bg-gray-900 border-2 border-gray-700 hover:border-cyan-500",
                    move: pixelMoveY
                  },
                  { 
                    icon: <FiPhone />, 
                    text: "CALL_NOW", 
                    onClick: handleCall,
                    style: "bg-green-900/30 border-2 border-green-700 text-green-300 hover:border-cyan-500",
                    move: pixelMoveX * 0.5
                  }
                ].map((btn, index) => (
                  <button
                    key={index}
                    onClick={btn.onClick}
                    className={`px-6 py-3 text-white font-bold font-mono tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95 ${btn.style}`}
                    style={{
                      transform: `translate(${btn.move * 0.1}px, ${pixelMoveY * 0.1}px)`
                    }}
                  >
                    {btn.icon}
                    {btn.text}
                  </button>
                ))}
              </div>
              
              {/* Pixel Social Links */}
              <div className="pt-10">
                <p className="text-gray-400 mb-6 font-mono tracking-wider">
                  {">_ CONNECT_WITH_ME:"}
                </p>
                <div className="flex gap-8">
                  {[
                    { icon: <FaGithub />, href: "https://github.com/Rafsanul", label: "GITHUB", color: "hover:text-white", pixel: 0 },
                    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/rafsanul-islam-70833a27a/", label: "LINKEDIN", color: "hover:text-blue-400", pixel: 1 },
                    { icon: <FaTerminal />, href: "https://leetcode.com/u/Rafsanthekod/", label: "LEETCODE", color: "hover:text-yellow-400", pixel: 2 },
                    { icon: <FaInstagram />, href: "https://www.instagram.com/rafsan_i_udoy/", label: "INSTAGRAM", color: "hover:text-pink-400", pixel: 3 }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex flex-col items-center"
                      style={{
                        transform: `translate(${pixelMoveX * (0.05 * (index + 1))}px, ${pixelMoveY * (0.05 * (index + 1))}px)`
                      }}
                    >
                      <div className={`text-4xl text-gray-500 ${social.color} transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-2 pixel-icon`}>
                        {social.icon}
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="text-xs text-gray-500 group-hover:text-white transition-colors font-mono opacity-0 group-hover:opacity-100">
                          {social.label}
                        </div>
                        <div className="w-0 h-1 bg-cyan-500 group-hover:w-full transition-all duration-300" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Pixel Stats */}
              <div className="grid grid-cols-3 gap-4 pt-10">
                {[
                  { label: "PROJECTS", value: "15+", color: "from-cyan-400 to-blue-400", border: "border-cyan-500/30" },
                  { label: "EXPERIENCE", value: "2+ YEARS", color: "from-blue-400 to-purple-400", border: "border-blue-500/30" },
                  { label: "SKILLS", value: "12+", color: "from-purple-400 to-pink-400", border: "border-purple-500/30" }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className={`text-center p-4 border-2 ${stat.border} bg-black/50 backdrop-blur-sm transition-all hover:scale-105 hover:border-cyan-500`}
                    style={{
                      transform: `translate(${pixelMoveX * (0.04 * (index + 1))}px, ${pixelMoveY * (0.04 * (index + 1))}px)`
                    }}
                  >
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-mono`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm mt-1 font-mono tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* RIGHT COLUMN - YOUR IMAGE WITH PIXEL TRAIL EFFECT */}
            <div className="flex justify-center lg:justify-end -mt-80">
              <div 
                className="relative"
                style={{
                  transform: `perspective(1000px) rotateY(${pixelMoveX * 0.3}deg) rotateX(${-pixelMoveY * 0.3}deg)`
                }}
              >
                {/* Larger Pixel Frame */}
                <div className="absolute -inset-6 border-4 border-cyan-500/30 animate-pulse" />
                
                {/* Pixel Grid Background */}
                <div className="absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(90deg,transparent_19px, rgba(0,170,255,0.1)_20px),linear-gradient(transparent_19px, rgba(0,170,255,0.1)_20px)]" />
                
                {/* Your Image Container */}
                <div className="relative w-80 h-80 border-4 border-gray-800 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black group">
                  
                  {/* Your Image */}
                  <img 
                    src="/Rafsanthekod.jpg" 
                    alt="Rafsanul Islam Udoy"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    onLoad={() => {
                      console.log("Image loaded successfully");
                      setImageLoaded(true);
                    }}
                    onError={(e) => {
                      console.log("Image not found, showing fallback");
                      setImageError(true);
                    }}
                  />
                  
                  {/* Fallback if image fails to load */}
                  {imageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-900/20 to-purple-900/20">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-cyan-400 mb-2 pixel-text">UD</div>
                        <div className="text-lg text-gray-300 font-mono">RAF SAN UL</div>
                        <div className="text-sm text-cyan-300 font-mono mt-1">IS LAM U DOY</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Pixel Overlay Grid */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(0, 170, 255, 0.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(0, 170, 255, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '15px 15px'
                  }} />
                  
                  {/* Subtle color enhancement overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
                  
                  {/* Pixel Corners - Larger */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500" />
                  
                  {/* Scan Line Effect */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse" />
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 transition-all duration-300" />
                </div>
                
                {/* Image Badge */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black border-2 border-cyan-500">
                  <span className="text-cyan-300 font-mono text-sm font-bold tracking-wider">
                    {">_ RAFSANUL_ISLAM"}
                  </span>
                </div>
                
                {/* PIXEL TRAIL ANIMATION UNDER IMAGE - KEPT AS REQUESTED */}
                <div className="absolute -bottom-24 left-0 right-0 h-20 overflow-hidden pointer-events-none">
                  {/* Particle container */}
                  <div className="relative w-full h-full">
                    {/* Pixel Grid Background */}
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: `linear-gradient(90deg, rgba(0,170,255,0.2) 1px, transparent 1px),
                                       linear-gradient(rgba(0,170,255,0.2) 1px, transparent 1px)`,
                      backgroundSize: '10px 10px'
                    }} />
                    
                    {/* Mouse-reactive pixels */}
                    <div className="absolute inset-0">
                      {/* Animated pixels that follow mouse */}
                      {Array.from({ length: 20 }).map((_, i) => {
                        const offsetX = Math.sin(Date.now() * 0.001 + i * 0.5) * 20;
                        const offsetY = Math.cos(Date.now() * 0.001 + i * 0.5) * 10;
                        
                        return (
                          <div
                            key={i}
                            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{
                              left: `calc(50% + ${offsetX + (mousePosition.x / window.innerWidth - 0.5) * 40}px)`,
                              top: `${i * 8 + offsetY}px`,
                              animation: `pulse 1s infinite ${i * 0.1}s`,
                              opacity: 0.7 - (i * 0.03)
                            }}
                          />
                        );
                      })}
                      
                      {/* Classic Cyber Cursor */}
                      <div 
                        className="absolute"
                        style={{
                          left: `calc(${(mousePosition.x / window.innerWidth) * 100}% - 20px)`,
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                      >
                        {/* Outer ring */}
                        <div 
                          className="absolute w-10 h-10 border-2 border-cyan-400 rounded-full animate-pulse"
                          style={{
                            boxShadow: '0 0 20px #0af, 0 0 40px #0af'
                          }}
                        />
                        
                        {/* Crosshair */}
                        <div className="relative w-6 h-6">
                          {/* Vertical line */}
                          <div 
                            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-cyan-400 transform -translate-x-1/2"
                            style={{
                              boxShadow: '0 0 10px #0af'
                            }}
                          />
                          
                          {/* Horizontal line */}
                          <div 
                            className="absolute left-0 right-0 top-1/2 h-0.5 bg-cyan-400 transform -translate-y-1/2"
                            style={{
                              boxShadow: '0 0 10px #0af'
                            }}
                          />
                          
                          {/* Center dot */}
                          <div 
                            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                            style={{
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',
                              boxShadow: '0 0 15px #0af, 0 0 30px #0af'
                            }}
                          />
                        </div>
                        
                        {/* Pulsing glow */}
                        <div 
                          className="absolute w-16 h-16 border border-cyan-300 rounded-full animate-ping"
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            opacity: 0.3
                          }}
                        />
                      </div>
                      
                      {/* Trail effect - UPDATED */}
                      <div 
                        className="absolute w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-sm"
                        style={{
                          left: `calc(${(mousePosition.x / window.innerWidth) * 100}% - 12px)`,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          opacity: 0.4
                        }}
                      />
                    </div>
                    
                    {/* Bottom scanning line */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                      style={{
                        transform: `translateX(${(mousePosition.x / window.innerWidth - 0.5) * 20}px)`,
                        animation: 'scan 2s linear infinite',
                        boxShadow: '0 0 8px #0af'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Cursor Blink */}
      <div className="fixed bottom-8 right-8 text-cyan-400 animate-pulse font-mono">
        _▌
      </div>
    </div>
  );
}















// different code but also cool
import { useState, useEffect, useRef } from "react";
import { FiDownload, FiMail, FiPhone, FiMapPin, FiCpu, FiCode } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaInstagram, FaTerminal } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchText, setGlitchText] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const name = "Rafsanul Islam Udoy";
  const title = "Computer Science & Engineering Graduate";

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add particle on mouse move
      if (particles.length < 50) { // Limit particles
        const newParticle = {
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          life: 100,
          color: Math.random() > 0.5 ? '#0af' : '#f0a'
        };
        setParticles(prev => [...prev, newParticle].slice(-100)); // Keep last 100 particles
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [particles.length]);

  // Update particles animation
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.speedX,
            y: p.y + p.speedY,
            life: p.life - 1,
            size: p.size * 0.99
          }))
          .filter(p => p.life > 0 && p.size > 0.5)
      );
    }, 16); // ~60fps
    
    return () => clearInterval(interval);
  }, []);

  // Text glitch effect - ONLY for badge
  useEffect(() => {
    const glitchChars = "01_#%&@$*";
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const chars = Array.from({ length: 3 }, () => 
          glitchChars[Math.floor(Math.random() * glitchChars.length)]
        ).join('');
        setGlitchText(chars);
        setTimeout(() => setGlitchText(""), 100);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Fixed: Background Animation with DOTS instead of boxes
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    
    // Matrix rain characters
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(0);
    const speeds = Array(columns).fill().map(() => Math.random() * 3 + 2);
    const colors = Array(columns).fill().map(() => {
      const hue = Math.random() * 60 + 180; // Blue to cyan range
      return `hsl(${hue}, 100%, 70%)`;
    });
    
    const draw = () => {
      time += 0.01;
      
      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw DOTS at grid intersections instead of square boxes
      const gridSize = 40;
      
      // Draw small dots at grid intersections
      ctx.fillStyle = 'rgba(0, 170, 255, 0.3)';
      for (let x = gridSize; x < canvas.width; x += gridSize) {
        for (let y = gridSize; y < canvas.height; y += gridSize) {
          // Calculate distance first
          const distance = Math.sqrt(Math.pow(x - mousePosition.x, 2) + Math.pow(y - mousePosition.y, 2));
          const pulse = Math.sin(time * 2 + distance * 0.01) * 0.5 + 0.5;
          const size = pulse * 2; // Small dots instead of boxes
          
          // Draw dot
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          
          // Mouse interaction for dots
          if (distance < 150) {
            // Draw connecting line from dot to cursor
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(mousePosition.x, mousePosition.y);
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 + pulse * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Make dot pulse brighter when cursor is near
            ctx.fillStyle = `rgba(0, 255, 255, ${0.3 + pulse * 0.4})`;
            ctx.beginPath();
            ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Reset to normal color
            ctx.fillStyle = 'rgba(0, 170, 255, 0.3)';
          }
        }
      }
      
      // Draw matrix rain
      ctx.font = '16px monospace';
      drops.forEach((drop, i) => {
        const x = i * 20;
        const y = drop;
        
        // Draw character
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = colors[i];
        ctx.fillText(char, x, y);
        
        // Draw trail
        for (let j = 0; j < 10; j++) {
          const trailY = y - j * 20;
          const opacity = 1 - j * 0.1;
          ctx.fillStyle = `rgba(0, 255, 255, ${opacity * 0.3})`;
          const trailChar = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(trailChar, x, trailY);
        }
        
        // Move drop down
        drops[i] += speeds[i];
        
        // Reset if off screen or randomly
        if (drops[i] > canvas.height || Math.random() > 0.995) {
          drops[i] = 0;
          speeds[i] = Math.random() * 3 + 2;
        }
      });
      
      // Draw floating particles
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time * 0.5 + i) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.7 + i) * 0.5 + 0.5) * canvas.height;
        const size = Math.sin(time + i) * 2 + 4;
        
        ctx.fillStyle = i % 3 === 0 ? '#0af' : i % 3 === 1 ? '#f0a' : '#a0f';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.fillStyle = i % 3 === 0 ? 'rgba(0, 170, 255, 0.1)' : i % 3 === 1 ? 'rgba(255, 0, 170, 0.1)' : 'rgba(170, 0, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(x, y, size * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => cancelAnimationFrame(animationId);
  }, [mousePosition]);

  // Particle canvas drawing
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x - 1, particle.y - 1, particle.size, particle.size);
        
        // Pixel glow effect
        ctx.fillStyle = `${particle.color}80`;
        ctx.fillRect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size * 2, particle.size * 2);
      });
    };
    
    draw();
  }, [particles]);

  // UPDATED CV DOWNLOAD FUNCTION WITH ERROR HANDLING
  const handleDownloadCV = () => {
    const cvUrl = '/Rafsanul_CV.pdf';
    
    // First, check if the file exists
    fetch(cvUrl)
      .then(response => {
        if (response.ok) {
          // File exists - download it
          const link = document.createElement('a');
          link.href = cvUrl;
          link.download = 'Rafsanul_Islam_Udoy_CV.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Optional: Show success message
          console.log('CV download started successfully');
        } else {
          // File doesn't exist - show user-friendly error
          console.error('CV file not found on server (Status:', response.status, ')');
          alert('CV file is currently unavailable. Please email me at rafsanthekod@gmail.com to request my resume.');
          
          // Open email as fallback
          window.open('mailto:rafsanthekod@gmail.com?subject=Request for CV&body=Hello Rafsanul, I would like to request your CV.');
        }
      })
      .catch(error => {
        console.error('Error checking/downloading CV:', error);
        
        // Try alternative method - open in new tab
        const link = document.createElement('a');
        link.href = cvUrl;
        link.target = '_blank'; // Open in new tab
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // If still fails, show message after a delay
        setTimeout(() => {
          alert('If download didn\'t start, the CV file might not be available. Please contact me directly at rafsanthekod@gmail.com');
        }, 1500);
      });
  };

  const handleEmail = () => window.open('mailto:rafsanthekod@gmail.com');
  const handleCall = () => window.open('tel:+8801648431726');

  // Pixel movement
  const pixelMoveX = ((mousePosition.x / window.innerWidth) - 0.5) * 40;
  const pixelMoveY = ((mousePosition.y / window.innerHeight) - 0.5) * 40;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-mono">
      {/* Background Canvas with DOTS instead of boxes */}
      <canvas
        ref={bgCanvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      
      {/* Particle Trail Canvas */}
      <canvas
        ref={particleCanvasRef}
        className="fixed inset-0 pointer-events-none z-1"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      
      {/* Pixel Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 170, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 170, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Glitch Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="min-h-screen flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* LEFT COLUMN - PIXEL STYLE */}
            <div className="space-y-8">
              {/* Pixel Badge with glitch */}
              <div 
                className="inline-block pixel-border"
                style={{
                  transform: `translate(${pixelMoveX * 0.1}px, ${pixelMoveY * 0.1}px)`
                }}
              >
                <div className="inline-flex items-center px-4 py-2 bg-black border-2 border-cyan-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 animate-pulse" />
                    <span className="text-sm font-bold text-cyan-300 tracking-wider">
                      {glitchText || ">_ AVAILABLE_FOR_OPPORTUNITIES"}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Pixel Art Name */}
              <div className="space-y-2">
                <div className="relative">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">
                    <div className="text-white pixel-text">
                      RAFSANUL ISLAM
                    </div>
                    <div className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 pixel-text">
                      UDOY
                    </div>
                  </h1>
                  
                  {/* Pixel overlay effect */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="h-1 w-full bg-cyan-500 animate-pulse" />
                  </div>
                </div>
                
                {/* Clean Title - UPDATED */}
                <div className="relative">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wider">
                    <span className="text-gray-400">{">_ "}</span>
                    <span className="text-cyan-300">COMPUTER SCIENCE & ENGINEERING GRADUATE</span>
                  </h2>
                </div>
              </div>
              
              {/* Pixel Contact Info */}
              <div className="flex flex-wrap items-center gap-4">
                {[
                  { icon: <FiCpu />, text: "BRAC_UNIVERSITY_GRADUATE", color: "text-purple-400", bg: "bg-purple-500/10" },
                  { icon: <FiPhone />, text: "01648_4331726", color: "text-blue-400", bg: "bg-blue-500/10" },
                  { icon: <FiMapPin />, text: "rafsanthekod@gmail.com", color: "text-cyan-400", bg: "bg-cyan-500/10" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-2 px-3 py-2 border border-gray-800 ${item.bg} cursor-pointer hover:border-cyan-500 transition-all`}
                    style={{
                      transform: `translate(${pixelMoveX * (0.05 * (index + 1))}px, ${pixelMoveY * (0.05 * (index + 1))}px)`
                    }}
                    onClick={index === 1 ? handleCall : index === 2 ? handleEmail : undefined}
                  >
                    <div className={`${item.color}`}>{item.icon}</div>
                    <span className={`text-sm ${item.color} font-mono`}>{item.text}</span>
                  </div>
                ))}
              </div>
              
              {/* Pixel Bio - UPDATED (Only 2 lines) - NOW CLICKABLE */}
              <div className="space-4">
                {/* First line - About page link */}
                <Link to="/about" className="block">
                  <div 
                    className="relative group cursor-pointer"
                    style={{
                      transform: `translate(${pixelMoveX * 0.03}px, ${pixelMoveY * 0.03}px)`
                    }}
                  >
                    <p className="text-lg text-gray-400 font-mono py-2 border-l-2 border-gray-800 pl-4 group-hover:border-cyan-500 group-hover:text-cyan-300 transition-all">
                      {">_ "}<span className="text-green-400 group-hover:text-green-300">JUNIOR_IT_EXECUTIVE_AT_PRIMEIT</span>
                    </p>
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
                
                {/* Second line - Skills page link */}
                <Link to="/skills" className="block">
                  <div 
                    className="relative group cursor-pointer"
                    style={{
                      transform: `translate(${pixelMoveX * 0.06}px, ${pixelMoveY * 0.06}px)`
                    }}
                  >
                    <p className="text-lg text-gray-400 font-mono py-2 border-l-2 border-gray-800 pl-4 group-hover:border-cyan-500 group-hover:text-cyan-300 transition-all">
                      {">_ SKILLS: "}<span className="text-cyan-400 group-hover:text-cyan-300">REACT_NODEJS_PYTHON_LARAVEL</span>
                    </p>
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </div>
              
              {/* Pixel Buttons */}
              <div className="flex flex-wrap gap-4 pt-6">
                {[
                  { 
                    icon: <FiDownload />, 
                    text: "DOWNLOAD_CV", 
                    onClick: handleDownloadCV,
                    style: "bg-gradient-to-r from-cyan-600 to-blue-600 border-2 border-cyan-500 hover:from-cyan-700 hover:to-blue-700",
                    move: pixelMoveX
                  },
                  { 
                    icon: <FiCode />, 
                    text: "EMAIL_ME", 
                    onClick: handleEmail,
                    style: "bg-gray-900 border-2 border-gray-700 hover:border-cyan-500",
                    move: pixelMoveY
                  },
                  { 
                    icon: <FiPhone />, 
                    text: "CALL_NOW", 
                    onClick: handleCall,
                    style: "bg-green-900/30 border-2 border-green-700 text-green-300 hover:border-cyan-500",
                    move: pixelMoveX * 0.5
                  }
                ].map((btn, index) => (
                  <button
                    key={index}
                    onClick={btn.onClick}
                    className={`px-6 py-3 text-white font-bold font-mono tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95 ${btn.style}`}
                    style={{
                      transform: `translate(${btn.move * 0.1}px, ${pixelMoveY * 0.1}px)`
                    }}
                  >
                    {btn.icon}
                    {btn.text}
                  </button>
                ))}
              </div>
              
              {/* Pixel Social Links */}
              <div className="pt-10">
                <p className="text-gray-400 mb-6 font-mono tracking-wider">
                  {">_ CONNECT_WITH_ME:"}
                </p>
                <div className="flex gap-8">
                  {[
                    { icon: <FaGithub />, href: "https://github.com/Rafsanul", label: "GITHUB", color: "hover:text-white", pixel: 0 },
                    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/rafsanul-islam-70833a27a/", label: "LINKEDIN", color: "hover:text-blue-400", pixel: 1 },
                    { icon: <FaTerminal />, href: "https://leetcode.com/u/Rafsanthekod/", label: "LEETCODE", color: "hover:text-yellow-400", pixel: 2 },
                    { icon: <FaInstagram />, href: "https://www.instagram.com/rafsan_i_udoy/", label: "INSTAGRAM", color: "hover:text-pink-400", pixel: 3 }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex flex-col items-center"
                      style={{
                        transform: `translate(${pixelMoveX * (0.05 * (index + 1))}px, ${pixelMoveY * (0.05 * (index + 1))}px)`
                      }}
                    >
                      <div className={`text-4xl text-gray-500 ${social.color} transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-2`}>
                        {social.icon}
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="text-xs text-gray-500 group-hover:text-white transition-colors font-mono opacity-0 group-hover:opacity-100">
                          {social.label}
                        </div>
                        <div className="w-0 h-1 bg-cyan-500 group-hover:w-full transition-all duration-300" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Pixel Stats */}
              <div className="grid grid-cols-3 gap-4 pt-10">
                {[
                  { label: "PROJECTS", value: "15+", color: "from-cyan-400 to-blue-400", border: "border-cyan-500/30" },
                  { label: "EXPERIENCE", value: "2+ YEARS", color: "from-blue-400 to-purple-400", border: "border-blue-500/30" },
                  { label: "SKILLS", value: "12+", color: "from-purple-400 to-pink-400", border: "border-purple-500/30" }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className={`text-center p-4 border-2 ${stat.border} bg-black/50 backdrop-blur-sm transition-all hover:scale-105 hover:border-cyan-500`}
                    style={{
                      transform: `translate(${pixelMoveX * (0.04 * (index + 1))}px, ${pixelMoveY * (0.04 * (index + 1))}px)`
                    }}
                  >
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-mono`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm mt-1 font-mono tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* RIGHT COLUMN - YOUR IMAGE WITH PIXEL TRAIL EFFECT */}
            <div className="flex justify-center lg:justify-end -mt-80">
              <div 
                className="relative"
                style={{
                  transform: `perspective(1000px) rotateY(${pixelMoveX * 0.3}deg) rotateX(${-pixelMoveY * 0.3}deg)`
                }}
              >
                {/* Larger Pixel Frame */}
                <div className="absolute -inset-6 border-4 border-cyan-500/30 animate-pulse" />
                
                {/* Pixel Grid Background */}
                <div className="absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(90deg,transparent_19px, rgba(0,170,255,0.1)_20px),linear-gradient(transparent_19px, rgba(0,170,255,0.1)_20px)]" />
                
                {/* Your Image Container */}
                <div className="relative w-80 h-80 border-4 border-gray-800 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black group">
                  
                  {/* Your Image */}
                  <img 
                    src="/Rafsanthekod.jpg" 
                    alt="Rafsanul Islam Udoy"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    onLoad={() => {
                      console.log("Image loaded successfully");
                      setImageLoaded(true);
                    }}
                    onError={(e) => {
                      console.log("Image not found, showing fallback");
                      setImageError(true);
                    }}
                  />
                  
                  {/* Fallback if image fails to load */}
                  {imageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-900/20 to-purple-900/20">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-cyan-400 mb-2 pixel-text">UD</div>
                        <div className="text-lg text-gray-300 font-mono">RAF SAN UL</div>
                        <div className="text-sm text-cyan-300 font-mono mt-1">IS LAM U DOY</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Pixel Overlay Grid */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(0, 170, 255, 0.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(0, 170, 255, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '15px 15px'
                  }} />
                  
                  {/* Subtle color enhancement overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
                  
                  {/* Pixel Corners - Larger */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500" />
                  
                  {/* Scan Line Effect */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse" />
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 transition-all duration-300" />
                </div>
                
                {/* Image Badge */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black border-2 border-cyan-500">
                  <span className="text-cyan-300 font-mono text-sm font-bold tracking-wider">
                    {">_ RAFSANUL_ISLAM"}
                  </span>
                </div>
                
                {/* PIXEL TRAIL ANIMATION UNDER IMAGE - KEPT AS REQUESTED */}
                <div className="absolute -bottom-24 left-0 right-0 h-20 overflow-hidden pointer-events-none">
                  {/* Particle container */}
                  <div className="relative w-full h-full">
                    {/* Pixel Grid Background */}
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: `linear-gradient(90deg, rgba(0,170,255,0.2) 1px, transparent 1px),
                                       linear-gradient(rgba(0,170,255,0.2) 1px, transparent 1px)`,
                      backgroundSize: '10px 10px'
                    }} />
                    
                    {/* Mouse-reactive pixels */}
                    <div className="absolute inset-0">
                      {/* Animated pixels that follow mouse */}
                      {Array.from({ length: 20 }).map((_, i) => {
                        const offsetX = Math.sin(Date.now() * 0.001 + i * 0.5) * 20;
                        const offsetY = Math.cos(Date.now() * 0.001 + i * 0.5) * 10;
                        
                        return (
                          <div
                            key={i}
                            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{
                              left: `calc(50% + ${offsetX + (mousePosition.x / window.innerWidth - 0.5) * 40}px)`,
                              top: `${i * 8 + offsetY}px`,
                              animation: `pulse 1s infinite ${i * 0.1}s`,
                              opacity: 0.7 - (i * 0.03)
                            }}
                          />
                        );
                      })}
                      
                      {/* Classic Cyber Cursor */}
                      <div 
                        className="absolute"
                        style={{
                          left: `calc(${(mousePosition.x / window.innerWidth) * 100}% - 20px)`,
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                      >
                        {/* Outer ring */}
                        <div 
                          className="absolute w-10 h-10 border-2 border-cyan-400 rounded-full animate-pulse"
                          style={{
                            boxShadow: '0 0 20px #0af, 0 0 40px #0af'
                          }}
                        />
                        
                        {/* Crosshair */}
                        <div className="relative w-6 h-6">
                          {/* Vertical line */}
                          <div 
                            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-cyan-400 transform -translate-x-1/2"
                            style={{
                              boxShadow: '0 0 10px #0af'
                            }}
                          />
                          
                          {/* Horizontal line */}
                          <div 
                            className="absolute left-0 right-0 top-1/2 h-0.5 bg-cyan-400 transform -translate-y-1/2"
                            style={{
                              boxShadow: '0 0 10px #0af'
                            }}
                          />
                          
                          {/* Center dot */}
                          <div 
                            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                            style={{
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',
                              boxShadow: '0 0 15px #0af, 0 0 30px #0af'
                            }}
                          />
                        </div>
                        
                        {/* Pulsing glow */}
                        <div 
                          className="absolute w-16 h-16 border border-cyan-300 rounded-full animate-ping"
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            opacity: 0.3
                          }}
                        />
                      </div>
                      
                      {/* Trail effect - UPDATED */}
                      <div 
                        className="absolute w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-sm"
                        style={{
                          left: `calc(${(mousePosition.x / window.innerWidth) * 100}% - 12px)`,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          opacity: 0.4
                        }}
                      />
                    </div>
                    
                    {/* Bottom scanning line */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                      style={{
                        transform: `translateX(${(mousePosition.x / window.innerWidth - 0.5) * 20}px)`,
                        animation: 'scan 2s linear infinite',
                        boxShadow: '0 0 8px #0af'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Cursor Blink */}
      <div className="fixed bottom-8 right-8 text-cyan-400 animate-pulse font-mono">
        _▌
      </div>
    </div>
  );
}