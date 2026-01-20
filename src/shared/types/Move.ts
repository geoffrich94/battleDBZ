export type MoveCategory = "signature" | "special";
export interface Move {
  name: string;
  kiCost: number;
  damage: number;
  accuracy: number;
  critChance?: number;
  category: MoveCategory;
};
