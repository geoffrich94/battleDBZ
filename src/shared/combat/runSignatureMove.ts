import {
  calculateMoveDamage,
  wait,
  getAnnouncerMessage,
  BattleSequence,
  EngineContext,
  Move,
} from "shared";

export async function runSignatureMove(
  sequence: BattleSequence,
  ctx: EngineContext,
) {
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

  const { selectedMoveName } = sequence;

  if (!selectedMoveName) return;

  const attacker = turn === 0 ? selectedCharacter : aiCharacter;
  const receiver = turn === 0 ? aiCharacter : selectedCharacter;

  const selectedMove = attacker.moveset.find(
    (move: Move) => move.name === selectedMoveName && move.category === "signature",
  );

  if (!selectedMove) return;

  if (attacker.currentEnergy < selectedMove.kiCost) {
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
          attacker.currentEnergy - selectedMove.kiCost,
        ),
      )
    : dispatch(
        actions.updateAiCharacterEnergy(
          attacker.currentEnergy - selectedMove.kiCost,
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

  const result = calculateMoveDamage(attacker, receiver, selectedMove);

  if (result.missed) {
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
      getAnnouncerMessage(attacker.name, selectedMove.name, result),
    ),
  );

  if (!result.missed) {
    await wait(500);
    turn === 0
      ? dispatch(actions.updateAiCharacterHealth(result.damage))
      : dispatch(actions.updatePlayableCharacterHealth(result.damage));
  }

  await wait(2000);

  dispatch(
    actions.applyMoveCooldown({
      target: turn === 0 ? "player" : "ai",
      category: "signature",
    }),
  );

  dispatch(
    actions.setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`),
  );
  await wait(1500);

  dispatch(actions.setTurn());
  dispatch(actions.setInSequence(false));
}
