import { Character, AttackResult } from "shared";

export const charge = (receiver: Character) => {
  return 50;
};

export const getAnnouncerMessage = (
  attackerName: string,
  actionName: string,
  result: AttackResult
) => {
  if (result.missed) {
    return `${attackerName}'s ${actionName} missed!`;
  }

  if (result.isCritical) {
    return `Critical hit! ${attackerName}'s ${actionName} was devastating!`;
  }

  return `${attackerName} used ${actionName}!`;
};

export const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
