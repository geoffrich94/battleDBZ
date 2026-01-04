
import { resolveAttack } from "shared/helpers";
import { AttackResult, Character, Move } from "shared/types";

export const calculateMoveDamage = (
  attacker: Character,
  receiver: Character,
  move: Move
): AttackResult => {
  const randomFactor = Math.random() * 0.15 + 0.85;

  const baseDamage =
    ((attacker.attack * move.damage) / receiver.defense) *
    randomFactor;

  return resolveAttack({
    baseDamage,
    characterAccuracy: attacker.attackAccuracy,
    moveAccuracy: move.accuracy,
    critChance: 0.25,
  });
};
