import React from 'react';
import { LottoSet } from '../types';
import { Ball } from './Ball';
import { formatDate } from '../utils';

interface LotteryTicketProps {
  set: LottoSet;
  onDelete?: (id: string) => void;
  showDetails?: boolean;
}

export const LotteryTicket: React.FC<LotteryTicketProps> = ({ set, onDelete, showDetails = true }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 mb-4 relative overflow-hidden">
      {/* Decorative background accent */}
      <div className={`absolute top-0 left-0 w-1 h-full ${set.source === 'ai' ? 'bg-purple-500' : 'bg-orange-500'}`}></div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
        <div className="flex items-center gap-2">
           <span className={`text-xs font-bold px-2 py-1 rounded ${set.source === 'ai' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
             {set.source === 'ai' ? 'AI 灵感' : '随机选号'}
           </span>
           <span className="text-slate-400 text-xs">{formatDate(set.timestamp)}</span>
        </div>
        {onDelete && (
          <button 
            onClick={() => onDelete(set.id)}
            className="text-slate-300 hover:text-red-400 transition-colors absolute top-4 right-4 sm:static"
            aria-label="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-4 mb-3 justify-center sm:justify-start">
        {set.front.map((num, idx) => (
          <Ball key={`f-${idx}`} number={num} type="front" index={idx} />
        ))}
        {set.back.map((num, idx) => (
          <Ball key={`b-${idx}`} number={num} type="back" index={idx + 5} />
        ))}
      </div>

      {set.reason && (
        <div className="mt-2 text-sm text-purple-700 bg-purple-50 p-2 rounded-lg italic">
          ✨ {set.reason}
        </div>
      )}
    </div>
  );
};
