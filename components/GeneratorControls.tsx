import React from 'react';

interface GeneratorControlsProps {
  onGenerate: (count: number) => void;
}

export const GeneratorControls: React.FC<GeneratorControlsProps> = ({ onGenerate }) => {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <button
        onClick={() => onGenerate(1)}
        className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-orange-300 hover:shadow-md transition-all active:scale-95 group"
      >
        <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🎲</span>
        <span className="text-sm font-medium text-slate-700">生成 1 注</span>
      </button>
      <button
        onClick={() => onGenerate(5)}
        className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-orange-300 hover:shadow-md transition-all active:scale-95 group"
      >
        <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">⚡️</span>
        <span className="text-sm font-medium text-slate-700">生成 5 注</span>
      </button>
      <button
        onClick={() => onGenerate(10)}
        className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-orange-300 hover:shadow-md transition-all active:scale-95 group"
      >
        <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🔥</span>
        <span className="text-sm font-medium text-slate-700">生成 10 注</span>
      </button>
    </div>
  );
};
