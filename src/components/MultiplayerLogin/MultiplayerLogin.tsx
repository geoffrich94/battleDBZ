import { useEffect, useState } from "react";
import { socket } from "../../multiplayer/socket";
import { Modal } from "components/Modal";
import { MatchData } from "shared/types";

interface MultiplayerLoginProps {
  onMatchFound: (data: MatchData) => void;
}

export const MultiplayerLogin: React.FC<MultiplayerLoginProps> = ({
  onMatchFound,
}) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const handleMatchFound = (data: MatchData) => {
      console.log("MATCH FOUND RECEIVED:", data);
      onMatchFound(data); // Tell MultiplayerLayout to switch screen
    };

    const handlePlayerDisconnected = (data: { message: string }) => {
      // Display the server-provided message
      alert(data.message);
    };

    socket.on("match_found", handleMatchFound);
    socket.on("player_disconnected", handlePlayerDisconnected);

    return () => {
      socket.off("match_found", handleMatchFound);
      socket.off("player_disconnected", handlePlayerDisconnected);
    };
  }, [onMatchFound]);

  const handleFindMatch = () => {
    if (!username.trim()) return;

    console.log("Connecting socket...");

    if (!socket.connected) {
      socket.connect();
    }

    console.log("Emitting find_match");
    socket.emit("find_match", { username });
  };

  return (
    <Modal
      username={username}
      setUsername={setUsername}
      onLogin={handleFindMatch}
    />
  );
};
