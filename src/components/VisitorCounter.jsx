import { useState, useEffect } from 'react';
import { FiEye, FiUsers } from 'react-icons/fi';

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Get current count from localStorage or start from 1
    const savedCount = localStorage.getItem('visitorCount');
    let newCount = 1;
    
    if (savedCount) {
      newCount = parseInt(savedCount) + 1;
    }
    
    // Save to localStorage
    localStorage.setItem('visitorCount', newCount.toString());
    setCount(newCount);
    
    // Show with animation
    setTimeout(() => setIsVisible(true), 500);
    
    // Animate count up
    const timer = setTimeout(() => {
      setCount(newCount);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="fixed bottom-24 right-4 z-40">
      <div className={`transform transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 hover:border-cyan-500 transition-all group">
          <div className="flex items-center gap-2">
            <div className="relative">
              <FiEye className="text-cyan-400 text-lg group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div>
              <div className="text-white font-mono text-sm">VISITORS</div>
              <div className="text-cyan-300 font-bold text-lg">{formatNumber(count)}</div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-2 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
              style={{ width: `${Math.min(count * 2, 100)}%` }}
            />
          </div>
          
          {/* Info text */}
          <div className="mt-1 text-gray-500 text-xs text-center">
            {count === 1 ? 'First visitor!' : 'Thanks for visiting!'}
          </div>
        </div>
      </div>
    </div>
  );
}