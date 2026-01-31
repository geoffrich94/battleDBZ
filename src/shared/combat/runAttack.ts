import { attack, wait, getAnnouncerMessage } from "shared";
import { EngineContext } from "shared/types";

export async function runAttack(ctx: EngineContext) {
  const {
    dispatch,
    turn,
    selectedCharacter,
    aiCharacter,
    setPlayerAnimation,
    setNPCAnimation,
    setMissState,
    actions,
  } = ctx;

  const attacker = turn === 0 ? selectedCharacter : aiCharacter;
  const receiver = turn === 0 ? aiCharacter : selectedCharacter;

  const result = attack(attacker, receiver);

  dispatch(actions.setInSequence(true));

  if (turn === 0) {
    setPlayerAnimation("attack");
    setTimeout(() => setPlayerAnimation("static"), 200);
  } else {
    setNPCAnimation("attack");
    setTimeout(() => setNPCAnimation("static"), 200);
  }

  if (result.missed) {
    await wait(200);
    setMissState(
      turn === 0
        ? { player: true, npc: false }
        : { player: false, npc: true },
    );
    await wait(1000);
    setMissState({ player: false, npc: false });
  }

  await wait(500);
  dispatch(
    actions.setAnnouncerMessage(
      getAnnouncerMessage(attacker.name, "Attack", result),
    ),
  );

  if (!result.missed) {
    await wait(500);
    turn === 0
      ? dispatch(actions.updateAiCharacterHealth(result.damage))
      : dispatch(actions.updatePlayableCharacterHealth(result.damage));
  }

  await wait(1500);
  dispatch(actions.setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`));
  await wait(1000);

  dispatch(actions.setTurn());
  dispatch(actions.setInSequence(false));
}
