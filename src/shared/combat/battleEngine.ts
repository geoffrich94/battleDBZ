import {
  BattleSequence,
  EngineContext,
} from "shared";
import { runAttack } from "./runAttack";
import { runKi } from "./runKi";
import { runSignatureMove } from "./runSignatureMove";
import { runSpecialMove } from "./runSpecialMove";
import { runCharge } from "./runCharge";
import { runSenzu } from "./runSenzu";

export async function runBattleSequence(
  sequence: BattleSequence,
  ctx: EngineContext,
) {
  const { mode } = sequence;

  switch (mode) {
    case "attack":
      return runAttack(ctx);

    case "ki":
      return runKi(ctx);

    case "signatureMove":
      return runSignatureMove(sequence, ctx);

    case "specialMove":
      return runSpecialMove(sequence, ctx);

    case "charge":
      return runCharge(ctx);

    case "senzu":
      return runSenzu(ctx);

    default:
      return;
  }
}
