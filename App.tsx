import React, { useState, useEffect } from 'react';
import { generateRandomLottoSet } from './utils';
import { LottoSet } from './types';
import { LotteryTicket } from './components/LotteryTicket';
import { GeneratorControls } from './components/GeneratorControls';
import { AIGenerator } from './components/AIGenerator';

const App: React.FC = () => {
  const [history, setHistory] = useState<LottoSet[]>([]);
  
  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('lotto_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history whenever it changes
  useEffect(() => {
    localStorage.setItem('lotto_history', JSON.stringify(history));
  }, [history]);

  const handleRandomGenerate = (count: number) => {
    const newSets: LottoSet[] = [];
    for (let i = 0; i < count; i++) {
      newSets.push(generateRandomLottoSet());
    }
    // Add new sets to the top
    setHistory(prev => [...newSets, ...prev]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAIGenerated = (sets: LottoSet[]) => {
    setHistory(prev => [...sets, ...prev]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleClearHistory = () => {
    if (window.confirm('确定要清空所有历史记录吗？')) {
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 bg-opacity-90 backdrop-blur-sm shadow-sm">
        <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              乐
            </div>
            <h1 className="text-lg font-bold text-slate-800">超级大乐透选号</h1>
          </div>
          <div className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded">
            Front: 5/35 + Back: 2/12
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6">
        
        {/* AI Section */}
        <AIGenerator onGenerated={handleAIGenerated} />

        {/* Manual Controls */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            快速随机
          </h3>
          <GeneratorControls onGenerate={handleRandomGenerate} />
        </div>

        {/* Results / History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              选号记录 ({history.length})
            </h3>
            {history.length > 0 && (
              <button 
                onClick={handleClearHistory}
                className="text-xs text-red-500 hover:text-red-700 font-medium"
              >
                清空记录
              </button>
            )}
          </div>
          
          {history.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-400 mb-2">暂无选号记录</p>
              <button 
                onClick={() => handleRandomGenerate(1)}
                className="text-orange-600 font-medium hover:underline text-sm"
              >
                试试手气，生成一注
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map(set => (
                <LotteryTicket 
                  key={set.id} 
                  set={set} 
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <footer className="text-center text-slate-400 text-xs py-6 pb-24 sm:pb-6">
        <p>祝您好运！Good Luck!</p>
        <p className="mt-1 opacity-60">Results are for entertainment only.</p>
        
        <div className="mt-6 mx-auto max-w-xs bg-slate-100 rounded-lg p-3 text-slate-600 border border-slate-200">
           <div className="font-bold mb-1">📱 安装到手机 (安卓/iOS)</div>
           <p className="scale-90 origin-top">点击浏览器菜单 <span className="inline-block px-1 border border-slate-300 rounded bg-white mx-1">⋮</span> 或 <span className="inline-block px-1 border border-slate-300 rounded bg-white mx-1">share</span></p>
           <p className="scale-90">选择 <strong>“添加到主屏幕”</strong> 即可</p>
        </div>
      </footer>
    </div>
  );
};

export default App;