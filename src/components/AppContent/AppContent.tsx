import { useState } from "react";
import * as S from "./AppContent.styles";
import { Battle, EndMenu, StartMenu, CharacterSelection } from "components";
import { Character } from "shared";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const AppContent = () => {
  const [mode, setMode] = useState("start");
  const [winner, setWinner] = useState<Character | null>(null);

  const selectedCharacter = useSelector((state: RootState) => state.character.selectedCharacter);
  
  const backgroundUrl = (() => {
    switch (mode) {
      case "start":
        return "/assets/startscreen.jpg";
      case "characterSelection":
        return "/assets/bg-character-select.jpg";
      case "battle":
        return "/assets/bg-battle.png";
      default:
        return "/assets/bg-battle.png";
    }
  })();
  
  const gradient = (() => {
    switch (mode) {
      case "start":
        return "linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5))";
      case "characterSelection":
        return "linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))";
      case "battle":
        return "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2))";
      default:
        return "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2))";
    }
  })();

  return ( 
    <S.Container backgroundUrl={backgroundUrl} gradient={gradient}>
      {mode === "start" && <StartMenu onStartClick={() => setMode("characterSelection")} />}
      {mode === "characterSelection" && <CharacterSelection onStartClick={() => setMode("battle")} />}
      {mode === "battle" && selectedCharacter && (
        <Battle
          selectedCharacter={selectedCharacter}
          onGameEnd={(winner: Character) => {
            setWinner(winner);
            setMode("gameOver");
          }}
        />
      )}
      {mode === "gameOver" && (
        <EndMenu
          winner={winner}
          onStartClick={() => {
            setWinner(null);
            setMode("battle");
          }}
        />
      )}
    </S.Container>
  );
};
