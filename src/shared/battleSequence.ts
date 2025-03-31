export interface BattleSequence {
  mode?: 'attack' | 'ki' | 'move01' | 'senzu' | 'idle';
  turn: number;
};