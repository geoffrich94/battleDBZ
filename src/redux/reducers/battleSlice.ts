import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BattleSequence } from "shared";

interface BattleState {
    turn: number;
    status: "idle" | "in_progress" | "paused" | "finished";
    inSequence: boolean;
    announcerMessage: string;
    log: string[];
    currentBattleSequence?: BattleSequence;
}

const initialState: BattleState = {
    turn: 0,
    status: "idle",
    inSequence: false,
    announcerMessage: "",
    log: [],
    currentBattleSequence: undefined,
}

export const battleSlice = createSlice({
    name: "battle",
    initialState,
    reducers: {
        startBattle: (state) => {
            state.status = "in_progress";
            state.turn = 0;
            state.inSequence = false;
            state.announcerMessage = "The fight begins!";
            state.log = ["Battle started!"];
            state.currentBattleSequence = undefined;
        },
        setTurn: (state) => {
            state.turn = state.turn === 0 ? 1 : 0;
        },
        setInSequence: (state, action: PayloadAction<boolean>) => {
            state.inSequence = action.payload;
        },
        setAnnouncerMessage: (state, action: PayloadAction<string>) => {
            state.announcerMessage = action.payload;
        },
        // setCurrentBattleSequence: (state, action: PayloadAction<BattleSequence>) => {
        //     state.currentBattleSequence = action.payload;
        // }
    }
})

// Action creators are generated for each case reducer function. Export the action so it can be used in other files
export const {
  startBattle,
  setTurn,
  setInSequence,
  setAnnouncerMessage
} = battleSlice.actions;

export default battleSlice.reducer;