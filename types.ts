export interface LottoSet {
  id: string;
  front: number[]; // 5 numbers, 01-35
  back: number[];  // 2 numbers, 01-12
  timestamp: number;
  source: 'random' | 'ai';
  reason?: string; // Explanation for AI generation
}

export enum GenerationType {
  RANDOM = 'RANDOM',
  AI = 'AI'
}
