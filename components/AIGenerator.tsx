import React, { useState } from 'react';
import { generateAILuckyNumbers } from '../services/geminiService';
import { LottoSet } from '../types';

interface AIGeneratorProps {
  onGenerated: (sets: LottoSet[]) => void;
}

const SUGGESTIONS = [
  "昨晚梦见金色锦鲤",
  "结婚纪念日",
  "看见双彩虹",
  "路上捡到钱",
  "心情特别好",
  "升职加薪"
];

export const AIGenerator: React.FC<AIGeneratorProps> = ({ onGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const sets = await generateAILuckyNumbers(prompt);
      onGenerated(sets);
      setPrompt('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (text: string) => {
    setPrompt(text);
  };

  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg mb-8">
      <div className="flex items-center gap-2 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-300"><path d="M21 12a9 9 0 1 1-6.219-8.56"/><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M9.5 15a3.5 3.5 0 0 0 5 0"/></svg>
        <h2 className="text-xl font-bold">AI 幸运选号</h2>
      </div>
      <p className="text-indigo-100 text-sm mb-4">
        输入您的梦境、幸运词或当下的心情，AI 将为您解析专属幸运号码。
      </p>

      {/* Suggestions Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {SUGGESTIONS.map((text) => (
          <button
            key={text}
            type="button"
            onClick={() => handleSuggestionClick(text)}
            disabled={isLoading}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-indigo-100 hover:text-white text-xs rounded-full transition-colors border border-white/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {text}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleAISubmit} className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="例如：昨晚梦见一条金龙在云中飞翔..."
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/20 transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-yellow-400 text-indigo-900 rounded-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          )}
        </button>
      </form>
    </div>
  );
};