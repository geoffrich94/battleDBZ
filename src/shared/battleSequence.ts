export interface BattleSequence {
  mode?: 'attack' | 'ki' | 'signatureMove' | 'specialMove' | 'senzu' | 'charge' | 'idle';
  turn: number;
  timestamp?: number;
};

export interface AttackResult {
  damage: number;
  missed: boolean;
  isCritical: boolean;
}

export interface MissState {
  player: boolean;
  npc: boolean
}