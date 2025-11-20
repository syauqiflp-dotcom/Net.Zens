import React from 'react';

const DigitalShield: React.FC = () => {
    const shieldPath = "M12 2L4 5v6.09c0 4.97 3.58 9.38 8 10.91c4.42-1.53 8-5.94 8-10.91V5L12 2z";
    // Total path length is ~65
    const pathLength = 65;

    return (
        <svg 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="shieldTitle"
            role="img"
        >
            <title id="shieldTitle">Digital Protection Shield</title>
            <defs>
                <linearGradient id="shieldFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g>
                {/* Main Shield Body */}
                <path 
                    d={shieldPath} 
                    fill="url(#shieldFill)" 
                    stroke="#A8D121" 
                    strokeWidth="1"
                />

                {/* Animated "Lightning" border */}
                <path
                    d={shieldPath}
                    fill="none"
                    stroke="#A8D121"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="15 50" /* A longer dash for the streak, and a longer gap for the rest of the path */
                    filter="url(#glow)"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to={`-${pathLength}`} /* Animate over the total path length */
                        dur="0.6s" /* Faster animation for a lightning effect */
                        repeatCount="indefinite"
                    />
                </path>

                {/* Checkmark Icon */}
                <path 
                    d="M9 12.5l2 2l4-4" 
                    stroke="#A8D121" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                />
            </g>
        </svg>
    );
};

export default DigitalShield;