import {
  wait,
  EngineContext,
} from "shared";

export async function runSenzu(ctx: EngineContext) {
  const {
    dispatch,
    turn,
    selectedCharacter,
    aiCharacter,
    setPlayerAnimation,
    setNPCAnimation,
    actions,
  } = ctx;

  const attacker = turn === 0 ? selectedCharacter : aiCharacter;
  const receiver = turn === 0 ? aiCharacter : selectedCharacter;

  if (attacker.senzuCount <= 0) {
    dispatch(
      actions.setAnnouncerMessage(
        `${attacker.name} has no senzu beans left!`,
      ),
    );
    return;
  }

  dispatch(actions.setInSequence(true));

  dispatch(
    actions.setAnnouncerMessage(`${attacker.name} uses a Senzu Bean!`),
  );

  // Consume senzu
  turn === 0
    ? dispatch(
        actions.updatePlayableCharacterSenzuCount(
          attacker.senzuCount - 1,
        ),
      )
    : dispatch(
        actions.updateAiSenzuCount(
          attacker.senzuCount - 1,
        ),
      );

  await wait(1000);

  // Heal animation
  if (turn === 0) {
    setPlayerAnimation("magic");
  } else {
    setNPCAnimation("magic");
  }

  await wait(1500);

  // Apply effects
  turn === 0
    ? dispatch(actions.applyPlayerSenzu())
    : dispatch(actions.applyAiSenzu());

  if (turn === 0) {
    setPlayerAnimation("static");
  } else {
    setNPCAnimation("static");
  }

  await wait(1500);

  // Turn handoff
  dispatch(
    actions.setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`),
  );
  await wait(1500);

  dispatch(actions.setTurn());
  dispatch(actions.setInSequence(false));
}
