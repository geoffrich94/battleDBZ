import { Character, Move } from "shared";

export const wait = (ms: number) => new Promise<void>(resolve => {
  setTimeout(() => {
    resolve();
  }, ms);
});

export const attack = (attacker: Character, receiver: Character, critChance: number) => {
  const randomFactor = Math.random() * (1.0 - 0.85) + 0.85; // Random factor between 0.85 and 1.0
  console.log(randomFactor)

  const isCritical = Math.random() < critChance; // True if we roll a critical hit

  const critMultiplier = isCritical ? 1.5 : 1.0; // 1.5x damage if crit, otherwise 1.0x

  // Calculate the damage from the attacker's attack stat, reduced by the receiver's defense
  const receivedDamage = (attacker.attack - receiver.defense)  * randomFactor * critMultiplier;

  // Ensure the damage is at least 0 (can't have negative damage)
  return Math.max(0, receivedDamage);
};

export const ki = (attacker: Character, receiver: Character, critChance: number) => {

  const randomFactor = Math.random() * (1.0 - 0.85) + 0.85; // Random factor between 0.85 and 1.0
  console.log(randomFactor)

  const isCritical = Math.random() < critChance; // True if we roll a critical hit

  const critMultiplier = isCritical ? 1.5 : 1.0; // 1.5x damage if crit, otherwise 1.0x

  const receivedDamage = ((attacker.ki - receiver.kiDefense) * 1.5) * randomFactor * critMultiplier;

  // Ensure the damage is at least 0 (can't have negative damage)
  return Math.max(0, receivedDamage);

};

export const senzu = (receiver: Character) => {
  return {
    maxHealth: receiver.maxHealth,
    maxEnergy: receiver.maxEnergy
  };
};

export const charge = (receiver: Character) => {
  return 50;
};

// New function to calculate damage for a move
export const calculateMoveDamage = (attacker: Character, receiver: Character, move: Move, critChance: number) => {

  const randomFactor = Math.random() * (1.0 - 0.85) + 0.85; // Random factor between 0.85 and 1.0
  console.log(randomFactor)

  const isCritical = Math.random() < critChance; // True if we roll a critical hit
  console.log(isCritical)

  const critMultiplier = isCritical ? 1.5 : 1.0; // 1.5x damage if crit, otherwise 1.0x

  const damage = ((attacker.attack * move.damage) / receiver.defense) * randomFactor * critMultiplier

  // Return the final calculated damage
  return damage > 0 ? { damage: Math.round(damage), isCritical } : 0; // Avoid negative damage
};


