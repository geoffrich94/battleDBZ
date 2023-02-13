import { characterStats } from "./characters";

export const wait = (ms: number) => new Promise<void>(resolve => {
  setTimeout(() => {
    resolve();
  }, ms);
});

export const attack = (attacker: characterStats, receiver: characterStats) => {

  console.log(attacker.attack, attacker.level, receiver.level);

  const receivedDamage = attacker.attack - (attacker.level - receiver.level) * 1.25;

  const finalDamage = receivedDamage - receiver.defense / 2;

  return finalDamage;
};

export const ki = (attacker: characterStats, receiver: characterStats) => {
  const receivedDamage = attacker.ki - (attacker.level - receiver.level) * 1.25;

  const finalDamage = receivedDamage - receiver.kiDefense / 2;

  return finalDamage;
};

export const senzu = (receiver: characterStats) => {
  return receiver.ki + receiver.level * 0.25;
};