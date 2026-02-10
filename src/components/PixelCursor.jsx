import { useEffect, useState } from 'react';

export default function PixelCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY }];
        // Keep only last 8 positions
        return newTrail.slice(-8);
      });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    // Detect hover on interactive elements
    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Add event listeners to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Trail effect particles
  const renderTrail = () => {
    return trail.map((pos, index) => {
      const size = (index / trail.length) * 8 + 2; // Smaller as it gets older
      const opacity = index / trail.length * 0.5; // Fade out
      
      return (
        <div
          key={index}
          className="fixed pointer-events-none"
          style={{
            left: pos.x,
            top: pos.y,
            width: `${size}px`,
            height: `${size}px`,
            transform: 'translate(-50%, -50%)',
            backgroundColor: `rgba(0, 170, 255, ${opacity})`,
            zIndex: 9998,
          }}
        />
      );
    });
  };

  return (
    <>
      {/* Trail Effect */}
      {renderTrail()}
      
      {/* Main Cursor */}
      <div
        className="fixed pointer-events-none z-9999"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.1s ease',
        }}
      >
        {/* Outer Pixel Square */}
        <div
          className="absolute"
          style={{
            width: '24px',
            height: '24px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'transparent',
            border: '2px solid #00aaff',
            boxShadow: `
              0 0 10px #00aaff,
              0 0 20px #00aaff,
              inset 0 0 10px #00aaff
            `,
            animation: 'pulse 1.5s infinite',
          }}
        />
        
        {/* Inner Pixel Square - Changes on click/hover */}
        <div
          className="absolute"
          style={{
            width: clicked ? '16px' : hovered ? '20px' : '12px',
            height: clicked ? '16px' : hovered ? '20px' : '12px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: hovered ? '#ff00aa' : '#00aaff',
            transition: 'all 0.15s ease',
            boxShadow: hovered 
              ? '0 0 15px #ff00aa, 0 0 30px #ff00aa' 
              : '0 0 10px #00aaff, 0 0 20px #00aaff',
          }}
        />
        
        {/* Pixel Corners */}
        <div
          className="absolute"
          style={{
            width: '24px',
            height: '24px',
            transform: 'translate(-50%, -50%)',
            background: `
              linear-gradient(90deg, #00aaff 1px, transparent 1px) 0 0 / 6px 6px,
              linear-gradient(#00aaff 1px, transparent 1px) 0 0 / 6px 6px
            `,
            opacity: 0.5,
          }}
        />
        
        {/* Animated Scan Lines */}
        <div
          className="absolute"
          style={{
            width: '24px',
            height: '2px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(90deg, transparent, #00aaff, transparent)',
            animation: 'scan 0.8s linear infinite',
          }}
        />
        
        {/* Crosshair Lines */}
        <div
          className="absolute"
          style={{
            width: '24px',
            height: '1px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#00aaff',
            opacity: 0.7,
          }}
        />
        <div
          className="absolute"
          style={{
            width: '1px',
            height: '24px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#00aaff',
            opacity: 0.7,
          }}
        />
        
        {/* Click Animation */}
        {clicked && (
          <>
            <div
              className="absolute rounded-full"
              style={{
                width: '30px',
                height: '30px',
                transform: 'translate(-50%, -50%)',
                border: '1px solid #ff00aa',
                animation: 'clickRipple 0.3s ease-out',
              }}
            />
            <div
              className="absolute"
              style={{
                width: '20px',
                height: '20px',
                transform: 'translate(-50%, -50%)',
                border: '2px solid #ff00aa',
                animation: 'clickRipple 0.5s ease-out',
              }}
            />
          </>
        )}
        
        {/* Hover Indicator */}
        {hovered && (
          <div
            className="absolute rounded-full"
            style={{
              width: '40px',
              height: '40px',
              transform: 'translate(-50%, -50%)',
              border: '1px dashed #00ffaa',
              animation: 'spin 2s linear infinite',
              opacity: 0.3,
            }}
          />
        )}
      </div>
      
      {/* Add animations to global CSS */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes scan {
          0% { transform: translate(-50%, -50%) translateX(-12px); }
          100% { transform: translate(-50%, -50%) translateX(12px); }
        }
        
        @keyframes clickRipple {
          0% { 
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
          }
          100% { 
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </>
  );
}