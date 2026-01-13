import { useState } from "react";
import * as S from "./AppContent.styles";
import { Battle, EndMenu, StartMenu, CharacterSelection, GameModeSelectMenu } from "components";
import { Character } from "shared";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import {
  startBattle,
  setTurn,
  setInSequence,
  setAnnouncerMessage
} from "../../redux/reducers/battleSlice";

import { resetCharacters } from "../../redux/reducers/characterSlice";

export const AppContent = () => {
  const dispatch = useDispatch();

  const [mode, setMode] = useState<
    "start" | "gameModeSelect" | "characterSelection" | "battle" | "gameOver"
  >("start");

  const [winner, setWinner] = useState<Character | null>(null);

  const selectedCharacter = useSelector(
    (state: RootState) => state.character.selectedCharacter
  );

  const handlePlayAgain = () => {
    dispatch(resetCharacters());
    dispatch(setTurn());
    dispatch(setInSequence(false));
    dispatch(setAnnouncerMessage(""));
    setWinner(null);
    setMode("battle");
  };

  const handleStartBattle = () => {
    dispatch(startBattle());
    setMode("battle");
  };

  const handleGameEnd = (winner: Character) => {
    setWinner(winner);
    setMode("gameOver");
  };

  const backgroundMap = {
    start: "/assets/startscreen.jpg",
    gameModeSelect: "/assets/startscreen.jpg",
    characterSelection: "/assets/bg-character-select.jpg",
    battle: "/assets/bg-battle.png",
    gameOver: "/assets/bg-battle.png"
  };

  const gradientMap = {
    start: "linear-gradient(0deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
    gameModeSelect: "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
    characterSelection: "linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))",
    battle: "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2))",
    gameOver: "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2))"
  };

  return (
    <S.Container
      backgroundUrl={backgroundMap[mode]}
      gradient={gradientMap[mode]}
    >
      {mode === "start" && (
        <StartMenu onStartClick={() => setMode("gameModeSelect")} />
      )}

      {mode === "gameModeSelect" && (
        <GameModeSelectMenu onStartClick={() => setMode("characterSelection")}/>
      )}

      {mode === "characterSelection" && (
        <CharacterSelection onStartClick={handleStartBattle} />
      )}

      {mode === "battle" && selectedCharacter && (
        <Battle
          selectedCharacter={selectedCharacter}
          onGameEnd={handleGameEnd}
        />
      )}

      {mode === "gameOver" && (
        <EndMenu
          winner={winner}
          onStartClick={handlePlayAgain}
        />
      )}
    </S.Container>
  );
};
