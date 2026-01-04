import { AttackResult, Character, resolveAttack } from "shared";

export const attack = (
  attacker: Character,
  receiver: Character
): AttackResult => {
  const randomFactor = Math.random() * 0.15 + 0.85;

  const baseDamage =
    (attacker.attack - receiver.defense) * randomFactor;

  return resolveAttack({
    baseDamage,
    characterAccuracy: attacker.attackAccuracy,
    moveAccuracy: 1,
    critChance: 0.25,
  });
};
