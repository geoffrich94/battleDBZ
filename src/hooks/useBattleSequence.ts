/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "redux/store";

import {
  setTurn,
  setInSequence,
  setAnnouncerMessage,
} from "../redux/reducers/battleSlice";

import {
  updatePlayableCharacterHealth,
  updateAiCharacterHealth,
  updatePlayableCharacterEnergy,
  updateAiCharacterEnergy,
  applyMoveCooldown,
  applyPlayerSenzu,
  applyAiSenzu,
  updatePlayableCharacterSenzuCount,
  updateAiSenzuCount,
  updatePlayerIsCharging,
  decrementMoveCooldowns,
} from "../redux/reducers/characterSlice";


import {
  BattleSequence,
  EngineContext,
} from "shared/types";

import { runBattleSequence } from "shared/combat/battleEngine";

export const useBattleSequence = (
  sequence: BattleSequence | null,
) => {
  const dispatch = useDispatch();

  const { turn, inSequence, announcerMessage } = useSelector(
    (state: RootState) => state.battle,
  );

  const { selectedCharacter, aiCharacter } = useSelector(
    (state: RootState) => state.character,
  );

  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [npcAnimation, setNPCAnimation] = useState("static");

  const [missState, setMissState] = useState({
    player: false,
    npc: false,
  });

  /**
   * STEP 3 — ENGINE CONTEXT (ADAPTER)
   * This is the ONLY place Redux + engine touch.
   */
  const engineContext: EngineContext | null =
    selectedCharacter && aiCharacter
      ? {
          dispatch,
          turn,
          selectedCharacter,
          aiCharacter,

          setPlayerAnimation,
          setNPCAnimation,
          setMissState,

          actions: {
            setTurn,
            setInSequence,
            setAnnouncerMessage,

            updatePlayableCharacterHealth,
            updateAiCharacterHealth,

            updatePlayableCharacterEnergy,
            updateAiCharacterEnergy,

            updatePlayableCharacterSenzuCount,
            updateAiSenzuCount,

            applyPlayerSenzu,
            applyAiSenzu,

            applyMoveCooldown,
            updatePlayerIsCharging,
          },
        }
      : null;

  /**
   * Run battle engine when a new sequence arrives
   */
  useEffect(() => {
    if (!sequence || !engineContext || inSequence) return;

    runBattleSequence(sequence, engineContext);
  }, [sequence]);

  /**
   * Global cooldown decrement — runs once per turn
   */
  useEffect(() => {
    if (turn === null) return;
    dispatch(decrementMoveCooldowns());
  }, [turn]);

  return {
    turn,
    inSequence,
    announcerMessage,
    playerAnimation,
    npcAnimation,
    missState,
  };
};
