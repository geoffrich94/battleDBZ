import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "shared/types";


interface CharacterState {
  selectedCharacter: Character | null;
  selectedCharacterBase: Character | null;
  aiCharacter: Character | null;
  aiCharacterBase: Character | null;
};

const initialState: CharacterState = {
  selectedCharacter: null,
  selectedCharacterBase: null,
  aiCharacter: null,
  aiCharacterBase: null
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    selectCharacter: (state, action: PayloadAction<Character>) => {
      state.selectedCharacter = action.payload;
      state.selectedCharacterBase = action.payload;
    },
    selectAICharacter: (state, action: PayloadAction<Character>) => {
      state.aiCharacter = action.payload;
      state.aiCharacterBase = action.payload;
    },
    deSelectCharacter: (state) => {
      state.selectedCharacter = null;
      state.selectedCharacter = null;
    },
    deSelectAICharacter:(state) => {
      state.aiCharacter = null;
      state.aiCharacterBase = null;
    },
    updatePlayableCharacterHealth: (state, action: PayloadAction<number>) => {
      if (state.selectedCharacter) {
        state.selectedCharacter.currentHealth =  Math.max(0, state.selectedCharacter.currentHealth - action.payload )
      }
    },
    updateAiCharacterHealth: (state, action: PayloadAction<number>) => {
      if (state.aiCharacter) {
       state.aiCharacter.currentHealth = Math.max(0, state.aiCharacter.currentHealth - action.payload )
      }
    },
    updatePlayableCharacterEnergy: (state, action: PayloadAction<number>) => {
      if (state.selectedCharacter) {
        state.selectedCharacter.currentEnergy = action.payload;
      }
    },
    updateAiCharacterEnergy: (state, action: PayloadAction<number>) => {
      if (state.aiCharacter) {
        state.aiCharacter.currentEnergy = action.payload;
      }
    },
    applyPlayerSenzu: (state) => {
      if (state.selectedCharacter) {
        state.selectedCharacter.currentHealth = state.selectedCharacter.maxHealth;
      }
      if (state.selectedCharacter) {
        state.selectedCharacter.currentEnergy = state.selectedCharacter.maxEnergy;
      }
    },
    applyAiSenzu: (state) => {
      if (state.aiCharacter) {
        state.aiCharacter.currentHealth = state.aiCharacter.maxHealth;
      }
      if (state.aiCharacter) {
        state.aiCharacter.currentEnergy = state.aiCharacter.maxEnergy;
      }
    },
    updatePlayableCharacterSenzuCount: (state, action: PayloadAction<number>) => {
      if (state.selectedCharacter) {
        state.selectedCharacter.senzuCount = action.payload;
      }
    },
    updateAiSenzuCount: (state, action: PayloadAction<number>) => {
      if (state.aiCharacter) {
        state.aiCharacter.senzuCount = action.payload;
      }
    },
    updatePlayerIsCharging: (state, action) => {
      if (state.selectedCharacter) {
        state.selectedCharacter.isCharging = action.payload;
      }
    },
    updatePlayableCharacterDefense: (state, action) => {
      if (state.selectedCharacter) {
        state.selectedCharacter.defense = action.payload;
      }
    },
    updateAiCharacterDefense: (state, action) => {
      if (state.aiCharacter) {
        state.aiCharacter.defense = action.payload;
      }
    },
    resetCharacters: (state) => {
      if (state.selectedCharacterBase)
    state.selectedCharacter = JSON.parse(JSON.stringify(state.selectedCharacterBase));

  if (state.aiCharacterBase)
    state.aiCharacter = JSON.parse(JSON.stringify(state.aiCharacterBase));
    }
  },
});

// Action creators are generated for each case reducer function. Export the action so it can be used in other files
export const {
  selectCharacter,
  selectAICharacter,
  deSelectCharacter,
  deSelectAICharacter,
  updatePlayableCharacterHealth,
  updateAiCharacterHealth,
  updatePlayableCharacterEnergy,
  updateAiCharacterEnergy,
  applyPlayerSenzu,
  applyAiSenzu,
  updatePlayableCharacterSenzuCount,
  updateAiSenzuCount,
  updatePlayableCharacterDefense,
  updateAiCharacterDefense,
  updatePlayerIsCharging,
  resetCharacters
} = characterSlice.actions;

export default characterSlice.reducer;
