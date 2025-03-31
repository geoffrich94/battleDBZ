import { Character, Move } from "shared";

export const wait = (ms: number) => new Promise<void>(resolve => {
  setTimeout(() => {
    resolve();
  }, ms);
});

export const attack = (attacker: Character, receiver: Character) => {

  const receivedDamage = attacker.attack - (attacker.level - receiver.level) * 1.25;

  const finalDamage = receivedDamage - receiver.defense / 2;

  return finalDamage;
};

export const ki = (attacker: Character, receiver: Character) => {
  const receivedDamage = attacker.ki - (attacker.level - receiver.level) * 1.25;

  const finalDamage = receivedDamage - receiver.kiDefense / 2;

  return finalDamage;
};

export const senzu = (receiver: Character) => {
  return receiver.ki + receiver.level * 0.25;
};

// New function to calculate damage for a move
export const calculateMoveDamage = (attacker: Character, receiver: Character, move: Move) => {
  // Calculate the basic damage based on move and attack stats
  const baseDamage = move.damage + (attacker.attack - (attacker.level - receiver.level) * 1.25);

  // Apply any defense modifiers to the final damage
  const finalDamage = baseDamage - receiver.defense / 2;

  // Return the final calculated damage
  return finalDamage > 0 ? finalDamage : 0; // Avoid negative damage
};