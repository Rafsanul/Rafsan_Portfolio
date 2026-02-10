import { Link, useLocation } from "react-router-dom";
import { 
  FiHome, 
  FiUser, 
  FiFolder, 
  FiCode, 
  FiMail, 
  FiMenu, 
  FiX
} from "react-icons/fi";
import { FaGamepad } from "react-icons/fa"; // Gamepad from FontAwesome
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Desktop nav items (always visible)
  const desktopNavItems = [
    { path: "/", icon: <FiHome />, label: "HOME" },
    { path: "/about", icon: <FiUser />, label: "Work_Experiences" },
    { path: "/pixel-game", icon: <FaGamepad />, label: "PIXEL_GAME" },
  ];

  // Hamburger menu items
  const hamburgerItems = [
    { path: "/projects", icon: <FiFolder />, label: "PROJECTS" },
    { path: "/skills", icon: <FiCode />, label: "SKILLS" },
    { path: "/contact", icon: <FiMail />, label: "CONTACT" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-cyan-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand with Cute Image */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 border-2 border-cyan-500 flex items-center justify-center overflow-hidden rounded-sm relative group-hover:border-cyan-300 transition-colors">
              {/* Your cute Eren image */}
              <img 
                src="/Eren.jpg" 
                alt="Logo" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  // Fallback if image doesn't load
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <span class="text-cyan-400 font-bold text-sm">UD</span>
                  `;
                }}
              />
              
              {/* Pixel corner decoration */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />
              
              {/* Scan line effect */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-cyan-500/50 animate-pulse" />
            </div>
            <span className="text-white font-mono font-bold tracking-wider group-hover:text-cyan-300 transition-colors">
              RAFSAN<span className="text-cyan-400 group-hover:text-cyan-300">UL</span>
            </span>
          </Link>

          {/* Desktop Navigation - Only HOME and ABOUT */}
          <div className="hidden md:flex items-center gap-1">
            {desktopNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-mono text-sm tracking-wider transition-all ${
                  location.pathname === item.path
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </div>
              </Link>
            ))}
            
            {/* Hamburger button for extra items */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 text-cyan-400 p-2 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition-colors flex items-center gap-2"
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              <span className="text-sm font-mono">MORE</span>
            </button>
          </div>

          {/* Mobile Menu Button - Shows always on mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cyan-400 p-2 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition-colors"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Hamburger Dropdown Menu - Shows only on desktop when clicked */}
        {isOpen && (
          <div className="hidden md:block absolute top-full right-4 mt-2 bg-black/95 border border-cyan-500/20 rounded-lg p-3 backdrop-blur-lg shadow-xl min-w-48">
            <div className="mb-2">
              <div className="text-gray-500 text-xs font-mono mb-1">EXPLORE_MORE</div>
              <div className="h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"></div>
            </div>
            
            <div className="space-y-1">
              {hamburgerItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded font-mono text-sm transition-all group ${
                    location.pathname === item.path
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`${
                        location.pathname === item.path ? 'text-cyan-400' : 'text-gray-500'
                      } group-hover:text-cyan-300`}>
                        {item.icon}
                      </div>
                      {item.label}
                    </div>
                    
                    {/* Current page indicator */}
                    {location.pathname === item.path && (
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Navigation - Shows all items on mobile */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-black/90 border border-cyan-500/20 rounded-lg p-4 backdrop-blur-lg">
            <div className="space-y-1">
              {[...desktopNavItems, ...hamburgerItems].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-mono text-sm mb-1 transition-all ${
                    location.pathname === item.path
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}