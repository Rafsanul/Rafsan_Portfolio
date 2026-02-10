import { useState, useEffect, useRef } from "react";
import { 
  FiDownload, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCpu, 
  FiCode, 
  FiCamera, 
  FiPlay, 
  FiMapPin as FiTravel, 
  FiArrowRight, 
  FiAward, 
  FiFileText,
  FiBook,
  FiUsers,
  FiStar,
  FiNavigation
} from "react-icons/fi";
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaTerminal 
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchText, setGlitchText] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [particles, setParticles] = useState([]);
  const [graduationImageError, setGraduationImageError] = useState(false);
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const name = "Rafsanul Islam Udoy";
  const title = "Computer Science & Engineering Graduate";

  // Mouse tracking - UNCHANGED
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

  // Update particles animation - UNCHANGED
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

  // Text glitch effect - ONLY for badge - UNCHANGED
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

  // Fixed: Background Animation with DOTS instead of boxes - UNCHANGED
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
            // Draw connecting line from dot to cursor - MODIFIED: Thinner and more transparent
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(mousePosition.x, mousePosition.y);
            // Changed from 0.1-0.4 to 0.05-0.2 opacity and from 1.0 to 0.3 line width
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.05 + pulse * 0.15})`;
            ctx.lineWidth = 0.3; // Changed from 1.0 to 0.3
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

  // Particle canvas drawing - UNCHANGED
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

  // UPDATED CV DOWNLOAD FUNCTION WITH ERROR HANDLING - UNCHANGED
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

  // Handle Internship Certificate Download
  const handleDownloadInternshipCert = () => {
    const certUrl = '/CERTIFICATE OF INTERNSHIP.pdf';
    
    fetch(certUrl)
      .then(response => {
        if (response.ok) {
          const link = document.createElement('a');
          link.href = certUrl;
          link.download = 'Rafsanul_Islam_Internship_Certificate.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log('Internship certificate download started successfully');
        } else {
          console.error('Certificate file not found');
          alert('Internship certificate is currently unavailable. Please email me at rafsanthekod@gmail.com to request it.');
          window.open('mailto:rafsanthekod@gmail.com?subject=Request for Internship Certificate');
        }
      })
      .catch(error => {
        console.error('Error downloading certificate:', error);
        const link = document.createElement('a');
        link.href = certUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  // Handle FCBU Promotion Certificate Download
  const handleDownloadFCBUCert = () => {
    const certUrl = '/Rafsanul Islam Udoy FCBU Promotion.pdf';
    
    fetch(certUrl)
      .then(response => {
        if (response.ok) {
          const link = document.createElement('a');
          link.href = certUrl;
          link.download = 'Rafsanul_Islam_Udoy_FCBU_Promotion_Certificate.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log('FCBU Promotion certificate download started successfully');
        } else {
          console.error('FCBU certificate file not found');
          alert('FCBU Promotion certificate is currently unavailable. Please email me at rafsanthekod@gmail.com to request it.');
          window.open('mailto:rafsanthekod@gmail.com?subject=Request for FCBU Promotion Certificate');
        }
      })
      .catch(error => {
        console.error('Error downloading FCBU certificate:', error);
        const link = document.createElement('a');
        link.href = certUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  // Pixel movement - UNCHANGED
  const pixelMoveX = ((mousePosition.x / window.innerWidth) - 0.5) * 40;
  const pixelMoveY = ((mousePosition.y / window.innerHeight) - 0.5) * 40;

  // Updated Hobbies Data
  const photographyPhotos = [
    { id: 1, src: '/DSC04769.JPG', title: 'Architectural Beauty', category: 'Urban', desc: 'Modern architecture photography' },
    { id: 2, src: '/IMG_20220218_165319_395.jpg', title: 'Golden Hour', category: 'Nature', desc: 'Sunset photography with natural lighting' },
    { id: 3, src: '/DSC04786.JPG', title: 'Urban Landscape', category: 'City', desc: 'Cityscape photography' },
    { id: 4, src: '/DSC08199.JPG', title: 'City Lights', category: 'Urban', desc: 'Night city photography' },
    { id: 5, src: '/DSC08206.JPG', title: 'Urban Symmetry', category: 'Architecture', desc: 'Architectural symmetry' },
    { id: 6, src: '/DSC08217.JPG', title: 'Modern Structure', category: 'Architecture', desc: 'Contemporary building design' },
    { id: 7, src: '/DSC00393.JPG', title: 'Natural Beauty', category: 'Nature', desc: 'Natural landscape' },
    { id: 8, src: '/DSC03095.JPG', title: 'Scenic View', category: 'Landscape', desc: 'Beautiful scenic photography' },
    { id: 9, src: '/Screenshot 2026-02-09 201429.png', title: 'Creative Shot', category: 'Creative', desc: 'Artistic photography' },
  ];

  const travelPhotos = [
    { id: 1, src: '/DSC04227.JPG', title: 'Cox\'s Bazar Beach', location: 'Cox\'s Bazar', year: '2023' },
    { id: 2, src: '/DSC04245.JPG', title: 'Cox\'s Bazar Sunset', location: 'Cox\'s Bazar', year: '2023' },
    { id: 3, src: '/Screenshot 2026-02-09 192350.png', title: 'Bandarban Hills', location: 'Bandarban', year: '2023' },
    { id: 4, src: '/DSC05502.jpg', title: 'Saint Martin Island', location: 'Saint Martin', year: '2022' },
  ];

  const games = [
    { title: 'Dota 2', hours: '500+', role: 'Carry/Support', rank: '2000 MMR', icon: '⚔️' },
    { title: 'Valorant', hours: '300+', role: 'Duelist', rank: 'Gold', icon: '🎯' },
    { title: 'Assassin\'s Creed', hours: '150+', role: 'Story Mode', rank: 'Completed', icon: '🗡️' },
    { title: 'Ghost Recon', hours: '120+', role: 'Tactical', rank: 'Specialist', icon: '🎖️' },
    { title: 'Far Cry 5', hours: '100+', role: 'Story Mode', rank: '100%', icon: '🔫' },
    { title: 'Minecraft', hours: '150+', role: 'Builder', rank: 'Creative', icon: '⛏️' },
    { title: 'Call of Duty', hours: '100+', role: 'Multiplayer', rank: 'Prestige', icon: '🎮' },
    { title: 'Snake Game', hours: '50+', role: 'Developer', rank: 'High Score: 250', icon: '🐍' },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-mono">
      {/* Background Canvas with DOTS instead of boxes - UNCHANGED */}
      <canvas
        ref={bgCanvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      
      {/* Particle Trail Canvas - UNCHANGED */}
      <canvas
        ref={particleCanvasRef}
        className="fixed inset-0 pointer-events-none z-1"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      
      {/* Pixel Grid Overlay - UNCHANGED */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 170, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 170, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Glitch Effect Overlay - UNCHANGED */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* Main Hero Section - UNCHANGED */}
        <div className="min-h-screen flex items-center">
          <div className="container mx-auto px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* LEFT COLUMN - PIXEL STYLE - UNCHANGED */}
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
                
                {/* Pixel Bio - UPDATED - NOW AS BUTTONS WITH 50% TRANSPARENCY */}
                <div className="space-3">
                  {/* First line - About page link AS BUTTON */}
                  <Link to="/about" className="block">
                    <div 
                      className="relative group cursor-pointer bg-gray-900/50 border-2 border-gray-800 rounded-lg pl-4 pr-4 py-3 hover:border-cyan-500 hover:bg-gray-900/70 transition-all duration-300"
                      style={{
                        transform: `translate(${pixelMoveX * 0.03}px, ${pixelMoveY * 0.03}px)`
                      }}
                    >
                      <p className="text-lg text-gray-400 font-mono group-hover:text-cyan-300 transition-all flex items-center justify-between">
                        <span>
                          {">_ "}<span className="text-green-400 group-hover:text-green-300">JUNIOR_IT_EXECUTIVE_AT_PRIMEIT</span>
                        </span>
                        <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </p>
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
                    </div>
                  </Link>
                  
                  {/* Second line - Skills page link AS BUTTON */}
                  <Link to="/skills" className="block mt-3">
                    <div 
                      className="relative group cursor-pointer bg-gray-900/50 border-2 border-gray-800 rounded-lg pl-4 pr-4 py-3 hover:border-cyan-500 hover:bg-gray-900/70 transition-all duration-300"
                      style={{
                        transform: `translate(${pixelMoveX * 0.06}px, ${pixelMoveY * 0.06}px)`
                      }}
                    >
                      <p className="text-lg text-gray-400 font-mono group-hover:text-cyan-300 transition-all flex items-center justify-between">
                        <span>
                          {">_ SKILLS: "}<span className="text-cyan-400 group-hover:text-cyan-300">REACT_NODEJS_PYTHON_LARAVEL</span>
                        </span>
                        <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </p>
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
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
              
              {/* RIGHT COLUMN - YOUR IMAGE WITH PIXEL TRAIL EFFECT - UNCHANGED */}
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

        {/* =========================================== */}
        {/* ACHIEVEMENTS SECTION - ADDED BETWEEN HERO AND HOBBIES */}
        {/* =========================================== */}
        <div className="py-20 border-t border-gray-800 bg-gradient-to-b from-black via-black/95 to-black">
          <div className="container mx-auto px-4">
            {/* Achievements Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-yellow-500 animate-pulse" />
                <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-wider">
                  <span className="text-yellow-400">&lt;</span>
                  KEY_ACHIEVEMENTS
                  <span className="text-yellow-400">/&gt;</span>
                </h2>
                <div className="w-3 h-3 bg-yellow-500 animate-pulse" />
              </div>
              <p className="text-gray-400 text-lg font-mono max-w-2xl mx-auto">
                {">_ Milestones and accomplishments in my academic and professional journey."}
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {/* Graduation Achievement */}
              <div className="group bg-gray-900/30 border-2 border-gray-800 rounded-xl p-6 hover:border-yellow-500 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl text-yellow-400">
                    <FiBook />
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-400 font-mono">GRADUATION</h3>
                </div>
                
                <p className="text-gray-400 mb-6 leading-relaxed font-mono">
                  Successfully completed Bachelor of Science in Computer Science & Engineering from BRAC University.
                </p>
                
                {/* Graduation Photo */}
                <div className="mb-6">
                  <div className="aspect-video bg-gradient-to-br from-yellow-900/20 to-black rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-yellow-500/50 transition-colors relative">
                    <img 
                      src="/Graduate.jpg" 
                      alt="BRAC University Graduation"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log("Graduation image not found");
                        setGraduationImageError(true);
                        e.target.style.display = 'none';
                      }}
                    />
                    
                    {graduationImageError && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl text-yellow-400 mb-2">🎓</div>
                          <div className="text-yellow-300 font-mono">BRAC UNIVERSITY GRADUATION</div>
                          <div className="text-gray-400 text-sm mt-1">Class of 2024</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="text-yellow-300 font-bold">BRAC UNIVERSITY</div>
                        <div className="text-gray-300 text-sm">B.Sc. in Computer Science & Engineering</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    <span className="text-gray-400 text-sm font-mono">DECEMBER 2024</span>
                  </div>
                  <div className="text-yellow-400 font-mono text-sm">
                    CGPA: 3.00/4.00
                  </div>
                </div>

                {/* Pixel corners */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-yellow-500 opacity-50" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-yellow-500 opacity-50" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-yellow-500 opacity-50" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-yellow-500 opacity-50" />
              </div>

              {/* FCBU Senior Executive Achievement */}
              <div className="group bg-gray-900/30 border-2 border-gray-800 rounded-xl p-6 hover:border-green-500 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl text-green-400">
                    <FiUsers />
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 font-mono">FCBU_SENIOR_EXECUTIVE</h3>
                </div>
                
                <p className="text-gray-400 mb-6 leading-relaxed font-mono">
                  Senior Executive in Administration and Creative Department at Football Club of BRAC University (FCBU).
                </p>
                
                {/* FCBU Certificate Preview */}
                <div className="mb-6">
                  <div className="aspect-video bg-gradient-to-br from-green-900/20 to-black rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-green-500/50 transition-colors relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl text-green-400 mb-4">⚽</div>
                        <div className="text-green-300 font-mono text-xl">FCBU PROMOTION CERTIFICATE</div>
                        <div className="text-gray-400 mt-2">Senior Executive - Administration & Creative</div>
                      </div>
                    </div>
                    
                    {/* Certificate Preview Effect */}
                    <div className="absolute inset-0 border-4 border-green-500/10 rounded-lg transform rotate-2 scale-95"></div>
                    <div className="absolute inset-0 border-4 border-green-500/5 rounded-lg transform -rotate-1 scale-95"></div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="text-green-300 font-bold">FOOTBALL CLUB OF BRAC UNIVERSITY</div>
                        <div className="text-gray-300 text-sm">Administration & Creative Department</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-gray-400 text-sm font-mono">FCBU_APPOINTMENT</span>
                  </div>
                  <button
                    onClick={handleDownloadFCBUCert}
                    className="text-green-400 hover:text-green-300 font-mono text-sm flex items-center gap-2 group-hover:gap-3 transition-all px-4 py-2 border border-green-500/30 rounded-lg hover:border-green-500 hover:bg-green-500/10"
                  >
                    <FiDownload /> DOWNLOAD_CERTIFICATE
                  </button>
                </div>

                {/* Pixel corners */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-green-500 opacity-50" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-green-500 opacity-50" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-green-500 opacity-50" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-green-500 opacity-50" />
              </div>

              {/* Government Scholarship Achievement */}
              <div className="group bg-gray-900/30 border-2 border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl text-blue-400">
                    <FiStar />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-400 font-mono">GOVERNMENT_SCHOLARSHIP</h3>
                </div>
                
                <p className="text-gray-400 mb-6 leading-relaxed font-mono">
                  Awarded by Government of Bangladesh for outstanding academic performance in PSC (Primary School Certificate) Examination.
                </p>
                
                {/* Scholarship Preview */}
                <div className="mb-6">
                  <div className="aspect-video bg-gradient-to-br from-blue-900/20 to-black rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-blue-500/50 transition-colors relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl text-blue-400 mb-4">🏆</div>
                        <div className="text-blue-300 font-mono text-xl">GOVERNMENT SCHOLARSHIP</div>
                        <div className="text-gray-400 mt-2">Awarded by Government of Bangladesh</div>
                      </div>
                    </div>
                    
                    {/* Award Effect */}
                    <div className="absolute inset-0 border-4 border-blue-500/10 rounded-lg transform rotate-1 scale-95"></div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="text-blue-300 font-bold">GOVERNMENT OF BANGLADESH</div>
                        <div className="text-gray-300 text-sm">PSC Examination Excellence Award</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-gray-400 text-sm font-mono">NATIONAL_LEVEL_ACHIEVEMENT</span>
                  </div>
                  <div className="text-blue-400 font-mono text-sm px-4 py-2 border border-blue-500/30 rounded-lg">
                    MERIT_BASED_AWARD
                  </div>
                </div>

                {/* Pixel corners */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-blue-500 opacity-50" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-blue-500 opacity-50" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-blue-500 opacity-50" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-blue-500 opacity-50" />
              </div>

              {/* Internship Certificate */}
              <div className="group bg-gray-900/30 border-2 border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl text-purple-400">
                    <FiAward />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-400 font-mono">INTERNSHIP_CERTIFICATE</h3>
                </div>
                
                <p className="text-gray-400 mb-6 leading-relaxed font-mono">
                  Successfully completed internship program with certification in Information Technology.
                </p>
                
                {/* Certificate Preview */}
                <div className="mb-6">
                  <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-black rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-purple-500/50 transition-colors relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl text-purple-400 mb-4">📄</div>
                        <div className="text-purple-300 font-mono text-xl">CERTIFICATE OF INTERNSHIP</div>
                        <div className="text-gray-400 mt-2">Validated Professional Experience</div>
                      </div>
                    </div>
                    
                    {/* PDF Preview Effect */}
                    <div className="absolute inset-0 border-4 border-purple-500/10 rounded-lg transform rotate-2 scale-95"></div>
                    <div className="absolute inset-0 border-4 border-purple-500/5 rounded-lg transform -rotate-1 scale-95"></div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="text-purple-300 font-bold">GAO Tek Inc.</div>
                        <div className="text-gray-300 text-sm">Internship Completion Certificate</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    <span className="text-gray-400 text-sm font-mono">JANUARY 2024</span>
                  </div>
                  <button
                    onClick={handleDownloadInternshipCert}
                    className="text-purple-400 hover:text-purple-300 font-mono text-sm flex items-center gap-2 group-hover:gap-3 transition-all px-4 py-2 border border-purple-500/30 rounded-lg hover:border-purple-500 hover:bg-purple-500/10"
                  >
                    <FiDownload /> DOWNLOAD_CERTIFICATE
                  </button>
                </div>

                {/* Pixel corners */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-purple-500 opacity-50" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-purple-500 opacity-50" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-purple-500 opacity-50" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-purple-500 opacity-50" />
              </div>
            </div>

            {/* Achievements Stats */}
            <div className="bg-gray-900/30 border-2 border-gray-800 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6 text-center font-mono">
                ACHIEVEMENTS_SUMMARY
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "DEGREE_COMPLETED", value: "B.Sc. CSE", color: "text-yellow-400", icon: "🎓" },
                  { label: "UNIVERSITY", value: "BRAC", color: "text-yellow-300", icon: "🏛️" },
                  { label: "SCHOLARSHIP", value: "GOVT_AWARDED", color: "text-blue-400", icon: "🏆" },
                  { label: "CLUB_POSITION", value: "SENIOR_EXEC", color: "text-green-400", icon: "⚽" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className={`text-2xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                    <div className="text-gray-400 text-sm font-mono">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* =========================================== */}
            {/* MOUNTAIN CLIMBING ACHIEVEMENT SECTION */}
            {/* =========================================== */}
            <div className="mt-16 bg-gradient-to-r from-gray-900/50 to-black/50 border-2 border-orange-500/30 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl text-orange-400">
                    <FiNavigation />
                  </div>
                  <h3 className="text-3xl font-bold text-orange-400 font-mono">
                    MOUNTAINEERING_ACHIEVEMENT
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed font-mono">
                      {">_ Successfully summited Saka Haphong, the tallest hill in Bangladesh (1,052 meters/3,451 feet)."}
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                        <span className="text-orange-300 font-mono">LOCATION: BANDARBAN, CHITTAGONG HILL TRACTS</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                        <span className="text-orange-300 font-mono">ELEVATION: 1,052 METERS (3,451 FEET)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                        <span className="text-orange-300 font-mono">DIFFICULTY LEVEL: CHALLENGING</span>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-4 bg-gradient-to-r from-orange-900/20 to-black/30 border border-orange-500/20 rounded-lg">
                      <p className="text-gray-400 font-mono text-sm">
                        {">_ The journey to the summit involved navigating through dense forests, steep inclines, and challenging terrain, testing both physical endurance and mental resilience."}
                      </p>
                    </div>
                  </div>
                  
                  {/* Summit Photo */}
                  <div className="relative group">
                    <div className="aspect-video rounded-xl overflow-hidden border-4 border-gray-800 group-hover:border-orange-500 transition-all duration-300">
                      <img 
                        src="/481299800_1742039989703335_8793475252929561539_n.jpg" 
                        alt="Saka Haphong Summit - Tallest Hill in Bangladesh"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="text-orange-300 font-bold text-xl font-mono">SAKA HAPHONG SUMMIT</div>
                          <div className="text-gray-300 text-sm">Highest Point in Bangladesh • 1,052m</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pixel corners */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-orange-500" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-orange-500" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-orange-500" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-orange-500" />
                  </div>
                </div>
              </div>
              
              {/* Bottom gradient border */}
              <div className="h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 animate-pulse" />
            </div>

            {/* Scroll Indicator */}
            <div className="text-center mt-12">
              <div className="text-gray-500 text-sm font-mono animate-blink">
                {">_ SCROLL_TO_CONTINUE"}
              </div>
              <div className="w-8 h-12 border-2 border-gray-700 rounded-full mx-auto mt-4 relative">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-yellow-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================== */}
        {/* HOBBIES SECTION - AFTER ACHIEVEMENTS */}
        {/* =========================================== */}
        <div className="py-20 border-t border-gray-800 bg-gradient-to-b from-black via-black/95 to-black">
          <div className="container mx-auto px-4">
            {/* Hobbies Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-cyan-500 animate-pulse" />
                <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-wider">
                  <span className="text-cyan-400">&lt;</span>
                  PERSONAL_HOBBIES
                  <span className="text-cyan-400">/&gt;</span>
                </h2>
                <div className="w-3 h-3 bg-purple-500 animate-pulse" />
              </div>
              <p className="text-gray-400 text-lg font-mono max-w-2xl mx-auto">
                {">_ Exploring creativity beyond code through photography, gaming, and travel."}
              </p>
            </div>

            {/* Hobbies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {/* Photography Card */}
              <div className="group bg-gray-900/30 border-2 border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl text-purple-400">
                    <FiCamera />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-400 font-mono">PHOTOGRAPHY</h3>
                </div>
                
                <p className="text-gray-400 mb-6 leading-relaxed font-mono">
                  Capturing moments through lens. Urban, nature, and portrait photography.
                </p>
                
                {/* Photo Grid Preview with Actual Images - 9 images */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {photographyPhotos.slice(0, 9).map((photo) => (
                    <div 
                      key={photo.id}
                      className="aspect-square rounded overflow-hidden border border-gray-700 group-hover:border-purple-500/50 transition-colors relative"
                    >
                      <img 
                        src={photo.src} 
                        alt={photo.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log(`Image ${photo.src} not found`);
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-black">
                              <span class="text-purple-400 text-2xl">📸</span>
                            </div>
                          `;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-1 left-1 right-1">
                          <div className="text-purple-300 text-xs font-mono truncate bg-black/70 p-1 rounded">
                            {photo.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm font-mono">
                    {photographyPhotos.length} PHOTOS
                  </span>
                  <div className="text-purple-400 font-mono text-sm">
                    MULTIPLE_CATEGORIES
                  </div>
                </div>

                {/* Pixel corners */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-purple-500 opacity-50" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-purple-500 opacity-50" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-purple-500 opacity-50" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-purple-500 opacity-50" />
              </div>

              {/* Gaming Card - UPDATED */}
              <div className="group bg-gray-900/30 border-2 border-gray-800 rounded-xl p-6 hover:border-cyan-500 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl text-cyan-400">
                    <FiPlay />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-400 font-mono">GAMING</h3>
                </div>
                
                <p className="text-gray-400 mb-6 leading-relaxed font-mono">
                  Competitive and casual gaming enthusiast. Always up for a challenge!
                </p>
                
                {/* Updated Games List with 8 games */}
                <div className="space-y-3 mb-6">
                  {games.map((game, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-black/40 rounded border border-gray-800 group-hover:border-cyan-500/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{game.icon}</span>
                        <div>
                          <div className="text-gray-300 text-sm font-mono">{game.title}</div>
                          <div className="text-gray-500 text-xs">{game.role}</div>
                        </div>
                      </div>
                      <div className="text-cyan-300 text-xs font-mono bg-cyan-500/10 px-2 py-1 rounded">
                        {game.rank}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm font-mono">
                    {games.length} GAMES
                  </span>
                  <span className="text-cyan-400 font-mono text-sm">
                    HOURS: 1500+
                  </span>
                </div>

                {/* Pixel corners */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-500 opacity-50" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-500 opacity-50" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-500 opacity-50" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-500 opacity-50" />
              </div>

              {/* Traveling Card - UPDATED */}
              <div className="group bg-gray-900/30 border-2 border-gray-800 rounded-xl p-6 hover:border-green-500 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl text-green-400">
                    <FiTravel />
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 font-mono">TRAVELING</h3>
                </div>
                
                <p className="text-gray-400 mb-6 leading-relaxed font-mono">
                  Exploring beautiful destinations across Bangladesh.
                </p>
                
                {/* Travel Photos Preview with Actual Images */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {travelPhotos.map((photo) => (
                    <div 
                      key={photo.id}
                      className="aspect-square rounded overflow-hidden border border-gray-700 group-hover:border-green-500/50 transition-colors relative"
                    >
                      <img 
                        src={photo.src} 
                        alt={photo.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log(`Image ${photo.src} not found`);
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-900/20 to-black">
                              <span class="text-green-400 text-2xl">✈️</span>
                            </div>
                          `;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-1 left-1 right-1">
                          <div className="text-green-300 text-xs font-mono truncate bg-black/70 p-1 rounded">
                            {photo.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm font-mono">
                    {travelPhotos.length} DESTINATIONS
                  </span>
                  <div className="text-green-400 font-mono text-sm">
                    BANGLADESH_EXPLORED
                  </div>
                </div>

                {/* Pixel corners */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-green-500 opacity-50" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-green-500 opacity-50" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-green-500 opacity-50" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-green-500 opacity-50" />
              </div>
            </div>

            {/* Hobbies Stats */}
            <div className="bg-gray-900/30 border-2 border-gray-800 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6 text-center font-mono">
                HOBBIES_IN_NUMBERS
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "PHOTOS_TAKEN", value: "500+", color: "text-purple-400", icon: "📸" },
                  { label: "GAMING_HOURS", value: "1500+", color: "text-cyan-400", icon: "🎮" },
                  { label: "DESTINATIONS", value: "3+", color: "text-green-400", icon: "🌎" },
                  { label: "HIGHEST_RANK", value: "2000 MMR", color: "text-yellow-400", icon: "🏆" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                    <div className="text-gray-400 text-sm font-mono">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Cursor Blink - UNCHANGED */}
      <div className="fixed bottom-8 right-8 text-cyan-400 animate-pulse font-mono">
        _▌
      </div>
    </div>
  );
}