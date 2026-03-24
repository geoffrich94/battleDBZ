import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import {
  selectCharacter,
  selectAICharacter,
  deSelectCharacter,
  deSelectAICharacter,
} from "../../redux/reducers/characterSlice";
import { characters } from "shared/character";
import * as S from "./CharacterSelection.styles";
import { CharacterSelectionMenu } from "components";
import { useState, useEffect } from "react";
import { socket } from "../../multiplayer/socket";

interface CharacterSelectionProps {
  onStartClick: () => void;
  mode: "singleplayer" | "multiplayer";
  role?: "player1" | "player2";
}

export const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  onStartClick,
  mode,
  role,
}) => {
  const dispatch = useDispatch();

  const selectedCharacter = useSelector(
    (state: RootState) => state.character.selectedCharacter
  );

  const aiCharacter = useSelector(
    (state: RootState) => state.character.aiCharacter
  );

  // Only used in SINGLEPLAYER
  const [selectionStep, setSelectionStep] = useState<"player" | "ai">("player");

  // =========================
  // MULTIPLAYER: LISTEN FOR OPPONENT
  // =========================
  useEffect(() => {
    if (mode !== "multiplayer") return;

    const handleOpponentSelection = (character: any) => {
      console.log("Opponent selected:", character);

      if (role === "player1") {
        dispatch(selectAICharacter(character));
      } else {
        dispatch(selectCharacter(character));
      }
    };

    socket.on("opponent_selected", handleOpponentSelection);

    return () => {
      socket.off("opponent_selected", handleOpponentSelection);
    };
  }, [mode, role, dispatch]);

  // =========================
  // CHARACTER SELECT
  // =========================
  const handleCharacterSelection = (
    characterImg: string,
    characterName: string
  ) => {
    const chosenCharacter = characters.find(
      (char) =>
        char.characterImg === characterImg &&
        char.name === characterName
    );

    if (!chosenCharacter) return;

    // =========================
    // SINGLEPLAYER LOGIC
    // =========================
    if (mode === "singleplayer") {
      if (selectionStep === "player") {
        dispatch(selectCharacter(chosenCharacter));
        setSelectionStep("ai");
      } else {
        dispatch(selectAICharacter(chosenCharacter));
      }
    }

    // =========================
    // MULTIPLAYER LOGIC
    // =========================
    if (mode === "multiplayer") {
      // Prevent re-selecting
      if (
        (role === "player1" && selectedCharacter) ||
        (role === "player2" && aiCharacter)
      ) {
        return;
      }

      if (role === "player1") {
        dispatch(selectCharacter(chosenCharacter));
      } else {
        dispatch(selectAICharacter(chosenCharacter));
      }

      // 🔥 Send to server
      socket.emit("character_selected", {
        character: chosenCharacter,
      });
    }
  };

  // =========================
  // REMOVE CHARACTER
  // =========================
  const removeCharacter = () => {
    if (mode === "singleplayer") {
      if (selectionStep === "ai") {
        dispatch(deSelectCharacter());
        dispatch(deSelectAICharacter());
        setSelectionStep("player");
      }
    }

    // Optional: handle multiplayer cancel later
  };

  // =========================
  // UI
  // =========================
  return (
    <>
      <S.Logo />

      <S.ImgContainter>
        <S.StyledCharacterImage
          src={
            selectedCharacter?.characterImg ||
            "assets/empty-character-pic.png"
          }
          alt={selectedCharacter?.name}
        />
        <S.StyledCharacterImage
          src={
            aiCharacter?.characterImg ||
            "assets/empty-character-pic.png"
          }
          alt={aiCharacter?.name}
        />
      </S.ImgContainter>

      <S.CharacterNameContainer>
        <S.CharacterName>
          {selectedCharacter?.name || "?"}
        </S.CharacterName>
        <S.CharacterName>
          {aiCharacter?.name || "?"}
        </S.CharacterName>
      </S.CharacterNameContainer>

      <S.VersusLogo src="assets/vs-logo.png" />

      <CharacterSelectionMenu
        onCharacterSelect={handleCharacterSelection}
        selectionStep={selectionStep}
      />

      <S.OptionsContainer>
        <S.OptionBorder className="with-right">
          <S.Option
            className="with-right"
            onClick={removeCharacter}
          >
            Cancel
          </S.Option>
        </S.OptionBorder>

        <S.OptionBorder className="with-left with-right">
          <S.Option
            className="with-left with-right"
            onClick={onStartClick}
            disabled={!selectedCharacter || !aiCharacter}
          >
            Start Game
          </S.Option>
        </S.OptionBorder>

        <S.OptionBorder className="with-left">
          <S.Option className="with-left" disabled>
            Items
          </S.Option>
        </S.OptionBorder>
      </S.OptionsContainer>
    </>
  );
};