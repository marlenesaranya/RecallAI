import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 32 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      
      {/* Outer Hexagon */}
      <path 
        d="M50 5 L89 27.5 V72.5 L50 95 L11 72.5 V27.5 L50 5Z" 
        stroke="url(#logoGradient)" 
        strokeWidth="2" 
        className="opacity-40"
      />
      
      {/* Inner Hexagon (slightly smaller) */}
      <path 
        d="M50 15 L80 32.5 V67.5 L50 85 L20 67.5 V32.5 L50 15Z" 
        stroke="url(#logoGradient)" 
        strokeWidth="1.5" 
        className="opacity-20"
      />

      {/* Connecting Lines (The X shape from the image) */}
      <g filter="url(#glow)">
        <line x1="25" y1="35" x2="75" y2="65" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
        <line x1="25" y1="65" x2="75" y2="35" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
        
        {/* Central Node */}
        <circle cx="50" cy="50" r="6" fill="#6366f1" className="opacity-80" />
        <circle cx="50" cy="50" r="3" fill="white" />
        
        {/* Outer Nodes */}
        <circle cx="25" cy="35" r="4" fill="#6366f1" />
        <circle cx="25" cy="35" r="1.5" fill="white" />
        
        <circle cx="75" cy="65" r="4" fill="#6366f1" />
        <circle cx="75" cy="65" r="1.5" fill="white" />
        
        <circle cx="25" cy="65" r="4" fill="#a855f7" />
        <circle cx="25" cy="65" r="1.5" fill="white" />
        
        <circle cx="75" cy="35" r="4" fill="#a855f7" />
        <circle cx="75" cy="35" r="1.5" fill="white" />

        {/* Top and Bottom Nodes */}
        <circle cx="50" cy="20" r="3" fill="#6366f1" className="opacity-60" />
        <circle cx="50" cy="20" r="1" fill="white" />
        
        <circle cx="50" cy="80" r="3" fill="#a855f7" className="opacity-60" />
        <circle cx="50" cy="80" r="1" fill="white" />
      </g>
    </svg>
  );
};
