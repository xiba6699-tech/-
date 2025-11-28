import { LottoSet } from './types';

// Helper to pad numbers with zero (e.g., 1 -> "01")
export const formatNumber = (num: number): string => {
  return num.toString().padStart(2, '0');
};

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Generic function to pick N unique random numbers from a range [min, max]
export const pickRandomNumbers = (count: number, min: number, max: number): number[] => {
  const nums = new Set<number>();
  while (nums.size < count) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    nums.add(randomNum);
  }
  return Array.from(nums).sort((a, b) => a - b);
};

// Generate a standard random Lotto set
export const generateRandomLottoSet = (): LottoSet => {
  return {
    id: generateId(),
    front: pickRandomNumbers(5, 1, 35),
    back: pickRandomNumbers(2, 1, 12),
    timestamp: Date.now(),
    source: 'random',
  };
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
