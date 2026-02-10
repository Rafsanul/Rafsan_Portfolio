import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      // Switch to light
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      // Switch to dark
      setIsDark(true);
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-24 right-4 z-40 p-3 rounded-full bg-black/80 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-500 transition-all group"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="relative">
        {isDark ? (
          <FiSun className="text-yellow-400 text-xl group-hover:rotate-90 transition-transform" />
        ) : (
          <FiMoon className="text-cyan-400 text-xl group-hover:rotate-12 transition-transform" />
        )}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-cyan-500 group-hover:w-6 transition-all duration-300" />
      </div>
    </button>
  );
}