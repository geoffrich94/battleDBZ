import { AttackResult, Character, resolveAttack } from "shared";

export const ki = (
  attacker: Character,
  receiver: Character
): AttackResult => {
  const randomFactor = Math.random() * 0.15 + 0.85;

  const baseDamage =
    (attacker.ki - receiver.kiDefense) * 1.5 * randomFactor;

  return resolveAttack({
    baseDamage,
    characterAccuracy: attacker.attackAccuracy,
    moveAccuracy: 0.9,
    critChance: 0.25,
  });
};
