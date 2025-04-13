export interface BattleSequence {
  mode?: 'attack' | 'ki' | 'signatureMove' | 'specialMove' | 'senzu' | 'idle';
  turn: number;
  timestamp?: number;
};