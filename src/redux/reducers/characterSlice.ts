import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "shared/character";

interface CharacterState {
  selectedCharacter: Character | null;
  aiCharacter: Character | null;
};

const initialState: CharacterState = {
  selectedCharacter: null,
  aiCharacter: null,
}

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    selectCharacter: (state, action: PayloadAction<Character>) => {
      state.selectedCharacter = action.payload
    },
    selectAICharacter: (state, action: PayloadAction<Character>) => {
      state.aiCharacter = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function. Export the action so it can be used in other files
export const { selectCharacter, selectAICharacter } = characterSlice.actions;
export default characterSlice.reducer;