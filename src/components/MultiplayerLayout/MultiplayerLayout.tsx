import { useState, useEffect } from "react";
import { socket } from "multiplayer/socket";
import { MultiplayerLogin, CharacterSelection } from "components";
import * as S from "./MultiplayerLayout.styles";
import { MatchData } from "shared/types";

interface MultiplayerLayoutProps {
  onExit: () => void;
}

type MultiplayerMode =
  | "login"
  | "matchmaking"
  | "characterSelection"
  | "battle"
  | "gameOver";

export const MultiplayerLayout: React.FC<MultiplayerLayoutProps> = () => {
  const [mpMode, setMpMode] = useState<MultiplayerMode>("login");
  const [matchData, setMatchData] = useState<MatchData | null>(null);

  useEffect(() => {
    const handleStartBattle = () => {
      console.log("🔥 Both players ready → starting battle");
      setMpMode("battle");
    };

    socket.on("start_battle", handleStartBattle);

    return () => {
      socket.off("start_battle", handleStartBattle);
    };
  }, []);

  // Disconnect when leaving multiplayer completely
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  const backgroundMap = {
    login: "/assets/multiplayerbg.jpg",
    matchmaking: "/assets/startscreen.jpg",
    characterSelection: "/assets/bg-character-select.jpg",
    battle: "/assets/bg-battle.png",
    gameOver: "/assets/bg-battle.png",
  };

  const gradientMap = {
    login: "linear-gradient(0deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
    matchmaking: "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
    characterSelection:
      "linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))",
    battle: "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2))",
    gameOver: "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2))",
  };

  return (
    <S.Container
      backgroundUrl={backgroundMap[mpMode]}
      gradient={gradientMap[mpMode]}
    >
      {mpMode === "login" && (
        <MultiplayerLogin
          onMatchFound={(data: MatchData) => {
            setMatchData(data);
            setMpMode("characterSelection");
          }}
        />
      )}
      {mpMode === "characterSelection" && matchData && (
        <CharacterSelection
          mode="multiplayer"
          role={matchData.role}
          onStartClick={() => setMpMode("battle")}
        />
      )}
    </S.Container>
  );
};
