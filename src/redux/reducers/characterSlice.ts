import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "shared/character";

interface CharacterState {
  selectedCharacter: Character | null;
  aiCharacter: Character | null;
}

const initialState: CharacterState = {
  selectedCharacter: null,
  aiCharacter: null,
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    selectCharacter: (state, action: PayloadAction<Character>) => {
      state.selectedCharacter = action.payload;
    },
    selectAICharacter: (state, action: PayloadAction<Character>) => {
      state.aiCharacter = action.payload;
    },
    deSelectCharacter: (state) => {
      state.selectedCharacter = null;
    },
    deSelectAICharacter:(state) => {
      state.aiCharacter = null;
    },
    updatePlayableCharacterHealth: (state, action: PayloadAction<number>) => {
      if (state.selectedCharacter) {
        state.selectedCharacter.maxHealth = action.payload;
      }
    },
    updateAiCharacterHealth: (state, action: PayloadAction<number>) => {
      if (state.aiCharacter) {
        state.aiCharacter.maxHealth = action.payload;
      }
    },
    updatePlayableCharacterEnergy: (state, action: PayloadAction<number>) => {
      if (state.selectedCharacter) {
        state.selectedCharacter.maxEnergy = action.payload;
      }
    },
    updateAiCharacterEnergy: (state, action: PayloadAction<number>) => {
      if (state.aiCharacter) {
        state.aiCharacter.maxEnergy = action.payload;
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
    updatePlayerIsCharging: (state, action) => {
      if (state.selectedCharacter) {
        state.selectedCharacter.isCharging = action.payload;
      }
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
  updatePlayableCharacterSenzuCount,
  updateAiSenzuCount,
  updatePlayableCharacterDefense,
  updateAiCharacterDefense,
  updatePlayerIsCharging
} = characterSlice.actions;

export default characterSlice.reducer;
