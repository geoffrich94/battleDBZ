export interface Move {
  name: string;
  kiCost: number;
  damage: number;
  accuracy: number;
  critChance?: number;
  special?: boolean;
}
