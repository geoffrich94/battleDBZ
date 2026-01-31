import {
  charge,
  wait,
  EngineContext,
} from "shared";

export async function runCharge(ctx: EngineContext) {
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

  dispatch(actions.setInSequence(true));

  dispatch(
    actions.setAnnouncerMessage(`${attacker.name} is charging up energy!`),
  );

  await wait(500);

  const energyGained = charge(attacker);

  if (turn === 0) {
    dispatch(
      actions.updatePlayableCharacterEnergy(
        attacker.currentEnergy + energyGained,
      ),
    );
    setPlayerAnimation("charge");
  } else {
    dispatch(
      actions.updateAiCharacterEnergy(
        attacker.currentEnergy + energyGained,
      ),
    );
    setNPCAnimation("charge");
  }

  await wait(2000);

  if (turn === 0) {
    setPlayerAnimation("static");
  } else {
    setNPCAnimation("static");
  }

  // Turn handoff
  dispatch(actions.setTurn());
  dispatch(actions.setInSequence(false));
}
