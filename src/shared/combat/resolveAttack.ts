import { AttackResult } from 'shared/types/AttackResult';

interface ResolveAttackParams {
  baseDamage: number;
  characterAccuracy: number;
  moveAccuracy: number;
  critChance: number;
}

export const resolveAttack = ({
  baseDamage,
  characterAccuracy,
  moveAccuracy,
  critChance,
}: ResolveAttackParams): AttackResult => {
  const finalAccuracy = characterAccuracy * moveAccuracy;
  const missChance = Math.round(Math.random() * 100) / 100;

  if (missChance > finalAccuracy) {
    return {
      damage: 0,
      missed: true,
      isCritical: false,
    };
  }

  const isCritical = Math.random() < critChance;
  const critMultiplier = isCritical ? 1.5 : 1;

  return {
    damage: Math.max(0, Math.round(baseDamage * critMultiplier)),
    missed: false,
    isCritical,
  };
};