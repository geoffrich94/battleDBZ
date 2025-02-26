import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "shared/character";

interface CharacterState {
  selectedCharacter: Character | null;
};

const initialState: CharacterState = {
  selectedCharacter: null,
}

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    selectCharacter: (state, action: PayloadAction<Character>) => {
      state.selectedCharacter = action.payload
    }
  }
})

// Action creators are generated for each case reducer function. Export the action so it can be used in other files
export const { selectCharacter } = characterSlice.actions;
export default characterSlice.reducer;