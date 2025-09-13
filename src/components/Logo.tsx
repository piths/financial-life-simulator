import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} flex-shrink-0`}>
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Background Circle with subtle gradient */}
          <circle cx="100" cy="100" r="90" fill="url(#bgGradient)" stroke="url(#borderGradient)" strokeWidth="3"/>
          
          {/* Main Dollar Sign - Modern and bold */}
          <path d="M100 50 L100 150 M80 60 L120 60 M80 140 L120 140" stroke="url(#dollarGradient)" strokeWidth="10" strokeLinecap="round"/>
          
          {/* Growth Arrow - Clean and modern */}
          <path d="M130 70 L155 45 L145 45 L145 35 L165 35 L165 55 L175 55" stroke="url(#arrowGradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          
          {/* Chart Bars - Representing financial growth */}
          <rect x="35" y="130" width="10" height="25" fill="url(#chartGradient)" rx="3"/>
          <rect x="50" y="120" width="10" height="35" fill="url(#chartGradient)" rx="3"/>
          <rect x="65" y="110" width="10" height="45" fill="url(#chartGradient)" rx="3"/>
          
          {/* Subtle sparkles for premium feel */}
          <circle cx="60" cy="60" r="2" fill="url(#sparkleGradient)"/>
          <circle cx="140" cy="80" r="1.5" fill="url(#sparkleGradient)"/>
          <circle cx="45" cy="90" r="1.5" fill="url(#sparkleGradient)"/>
          <circle cx="155" cy="110" r="2" fill="url(#sparkleGradient)"/>
          
          {/* Gradients */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#1e293b', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#0f172a', stopOpacity:1}} />
            </linearGradient>
            
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#3b82f6', stopOpacity:0.8}} />
              <stop offset="100%" style={{stopColor:'#1d4ed8', stopOpacity:0.8}} />
            </linearGradient>
            
            <linearGradient id="dollarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#10b981', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#059669', stopOpacity:1}} />
            </linearGradient>
            
            <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#f59e0b', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#d97706', stopOpacity:1}} />
            </linearGradient>
            
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#8b5cf6', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#7c3aed', stopOpacity:1}} />
            </linearGradient>
            
            <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#fbbf24', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#f59e0b', stopOpacity:1}} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${textSizeClasses[size]} bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent`}>
            FinanceSim
          </span>
          <span className={`text-xs text-gray-500 -mt-1 ${size === 'sm' ? 'hidden' : ''}`}>
            Life Simulator
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
