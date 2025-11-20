import React from 'react';

// A new component for the logo icon (turtle shell + circle)
const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        viewBox="0 0 60 100" // Kept the viewbox, adjusted elements inside
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="url(#titleGradient)"
        aria-hidden="true" // It's decorative
    >
        {/* Circle part of the logo */}
        <circle cx="30" cy="15" r="15" />
        {/* Shell part of the logo, positioned below the circle */}
        <path d="M30 35 C 0 40, 0 70, 30 100 C 60 70, 60 40, 30 35 Z" />
    </svg>
);


const HeroSection: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center p-4 overflow-hidden relative bg-gradient-to-br from-[#0D1A2E] to-[#122340]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,209,33,0.05)_0%,_transparent_50%)]"></div>

      <div className="hero-content text-center flex flex-col items-center z-10">
        
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter flex items-center justify-center h-[1.2em]">
            {/* Gradient definition for SVG */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f1f5f9" /> {/* Corresponds to slate-100 */}
                        <stop offset="100%" stopColor="#94a3b8" /> {/* Corresponds to slate-400 */}
                    </linearGradient>
                </defs>
            </svg>
            
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">NET</span>
            <LogoIcon className="h-[0.8em] w-auto mx-1 sm:mx-2 relative" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">ZEN</span>
        </h1>
        
        <p className="max-w-xl text-lg md:text-xl text-slate-300 my-10 px-4 leading-relaxed">
          Terlambat sadar itu memang pahit. Sebelum hoax dan scam menguras dompet, latih instingmu di sini!
        </p>

        <button onClick={onStart} className="cta-button bg-[#A8D121] text-[#0D1A2E] font-bold py-3 px-10 rounded-full text-xl hover:bg-blue-500 active:bg-blue-600 transform hover:scale-105 active:scale-95 transition-all duration-300">
          Mulai
        </button>
      </div>
    </section>
  );
}

export default HeroSection;