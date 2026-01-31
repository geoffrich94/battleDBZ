import { Dispatch } from "@reduxjs/toolkit";

export interface EngineContext {
  dispatch: Dispatch;

  turn: number;
  selectedCharacter: any;
  aiCharacter: any;

  // UI hooks
  setPlayerAnimation: (state: string) => void;
  setNPCAnimation: (state: string) => void;
  setMissState: (state: { player: boolean; npc: boolean }) => void;

  // Battle actions
  actions: {
    setTurn: () => any;
    setInSequence: (value: boolean) => any;
    setAnnouncerMessage: (msg: string) => any;

    updatePlayableCharacterHealth: (value: number) => any;
    updateAiCharacterHealth: (value: number) => any;
    updatePlayableCharacterEnergy: (value: number) => any;
    updateAiCharacterEnergy: (value: number) => any;

    applyMoveCooldown: (payload: any) => any;

    applyPlayerSenzu: () => any;
    applyAiSenzu: () => any;
    updatePlayableCharacterSenzuCount: (value: number) => any;
    updateAiSenzuCount: (value: number) => any;

    updatePlayerIsCharging: (value: boolean) => any;
  };
}
