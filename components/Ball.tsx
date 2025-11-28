import React from 'react';
import { formatNumber } from '../utils';

interface BallProps {
  number: number;
  type: 'front' | 'back';
  index: number; // for animation delay
}

export const Ball: React.FC<BallProps> = ({ number, type, index }) => {
  const baseClasses = "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white font-bold text-lg sm:text-xl shadow-md ball-anim";
  const colorClasses = type === 'front' 
    ? "bg-gradient-to-br from-red-500 to-red-600 border-2 border-red-400" 
    : "bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-blue-400";
    
  return (
    <div 
      className={`${baseClasses} ${colorClasses}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {formatNumber(number)}
    </div>
  );
};
