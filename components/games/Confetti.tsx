import React from 'react';

const CONFETTI_COUNT = 150;

const Confetti: React.FC = () => {
  const confetti = Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}vw`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
      backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
      transform: `rotate(${Math.random() * 360}deg)`,
    };
    return <div key={i} className="confetti-piece" style={style}></div>;
  });

  return <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">{confetti}</div>;
};

export default Confetti;
