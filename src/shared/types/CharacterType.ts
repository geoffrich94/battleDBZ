import { Move } from './Move'

export interface Character {
  level: number;
  maxHealth: number;
  currentHealth: number;
  maxEnergy: number;
  currentEnergy: number;
  name: string;
  img?: string;
  profileImg: string;
  characterImg: string;

  ki: number;
  kiCost: number;
  attack: number;
  defense: number;
  kiDefense: number;
  attackAccuracy: number;
  moveset: Move[];

  senzuCount: number;
  isCharging: boolean;
}