export interface BattleSequence {
  mode?: 'attack' | 'ki' | 'signatureMove' | 'specialMove' | 'senzu' | 'charge' | 'idle';
  turn: number;
  timestamp?: number;
};