import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Show loading only on initial load/refresh, not on navigation
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
          }, 300);
          return 100;
        }
        return prev + 7;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []); // Empty dependency array = runs only once on mount/refresh

  // Don't show loading if not on home page during navigation
  const isHomePage = location.pathname === '/';
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="mb-8">
        <div className="flex gap-1 mb-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i}
              className="w-2 h-6 bg-cyan-500 animate-pulse"
              style={{ 
                animationDelay: `${i * 0.1}s`,
                opacity: i < (progress / 10) ? 1 : 0.3
              }}
            />
          ))}
        </div>
        
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 text-center">
          <div className="text-cyan-400 font-mono text-sm">
            {">_ LOADING_PORTFOLIO"}
          </div>
          <div className="text-gray-500 text-xs mt-1">
            {progress}% COMPLETE
          </div>
        </div>
      </div>
      
      <div className="text-gray-600 text-xs text-center mt-8">
        <div className="font-mono">RAFSANUL ISLAM UDOY</div>
        <div className="mt-1">CSE GRADUATE • FULL-STACK DEVELOPER</div>
      </div>
    </div>
  );
}