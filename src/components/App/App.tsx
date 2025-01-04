import { useState } from "react";
import * as S from "./App.styles";
import { Battle, EndMenu, StartMenu } from "components";
import { characterStats } from "shared/characters";

export const App = () => {
  const [mode, setMode] = useState("start");
  const [winner, setWinner] = useState<characterStats | undefined>(undefined);

  return (
    <S.Container
      backgroundUrl={
        mode === "start" ? "/assets/startscreen.jpg" : "/assets/bg.png"
      }
      gradient={
        mode === "start"
          ? "linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5))"
          : "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2))"
      }
    >
      {mode === "start" && <StartMenu onStartClick={() => setMode("battle")} />}
      {mode === "battle" && (
        <Battle
          onGameEnd={(winner: characterStats) => {
            setWinner(winner);
            setMode("gameOver");
          }}
        />
      )}
      {mode === "gameOver" && (
        <EndMenu
          winner={winner}
          onStartClick={() => {
            setWinner(undefined);
            setMode("battle");
          }}
        />
      )}
    </S.Container>
  );
};
