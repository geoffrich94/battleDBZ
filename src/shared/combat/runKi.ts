import {
  ki,
  wait,
  getAnnouncerMessage,
  EngineContext,
} from "shared";

export async function runKi(ctx: EngineContext) {
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

  if (attacker.currentEnergy < attacker.kiCost) {
    dispatch(
      actions.setAnnouncerMessage(
        `${attacker.name} doesn't have enough energy!`,
      ),
    );
    return;
  }

  dispatch(actions.setInSequence(true));

  // Deduct energy
  turn === 0
    ? dispatch(
        actions.updatePlayableCharacterEnergy(
          attacker.currentEnergy - attacker.kiCost,
        ),
      )
    : dispatch(
        actions.updateAiCharacterEnergy(
          attacker.currentEnergy - attacker.kiCost,
        ),
      );

  // Animation
  if (turn === 0) {
    setPlayerAnimation("ki");
    setTimeout(() => setPlayerAnimation("static"), 1000);
  } else {
    setNPCAnimation("ki");
    setTimeout(() => setNPCAnimation("static"), 1000);
  }

  await wait(1000);

  const result = ki(attacker, receiver);

  // Miss handling
  if (result.missed) {
    setMissState(
      turn === 0
        ? { player: true, npc: false }
        : { player: false, npc: true },
    );
    await wait(1000);
    setMissState({ player: false, npc: false });
  }

  // Announcer
  await wait(500);
  dispatch(
    actions.setAnnouncerMessage(
      getAnnouncerMessage(attacker.name, "Ki Blast", result),
    ),
  );

  // Damage
  if (!result.missed) {
    await wait(500);
    turn === 0
      ? dispatch(actions.updateAiCharacterHealth(result.damage))
      : dispatch(actions.updatePlayableCharacterHealth(result.damage));
  }

  // Turn handoff
  await wait(2000);
  dispatch(
    actions.setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`),
  );
  await wait(1500);

  dispatch(actions.setTurn());
  dispatch(actions.setInSequence(false));
}
