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
import { useState } from "react";

interface CharacterSelectionProps {
  onStartClick: () => void;
}

export const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  onStartClick,
}) => {
  const dispatch = useDispatch();

  const selectedCharacter = useSelector(
    (state: RootState) => state.character.selectedCharacter
  );
  const aiCharacter = useSelector(
    (state: RootState) => state.character.aiCharacter
  );

  // Track selection step: First, select Player → then AI
  const [selectionStep, setSelectionStep] = useState<"player" | "ai">("player");

  const handleCharacterSelection = (
    characterImg: string,
    characterName: string
  ) => {
    const chosenCharacter = characters.find(
      (char) =>
        char.characterImg === characterImg && char.name === characterName
    );

    if (!chosenCharacter) return;

    if (selectionStep === "player") {
      dispatch(selectCharacter(chosenCharacter));
      setSelectionStep("ai"); // Move to selecting AI character next
    } else if (selectionStep === "ai") {
      dispatch(selectAICharacter(chosenCharacter)); // ✅ Allow AI selection without checking !== selectedCharacter
    }
  };

  const removeCharacter = () => {
    console.log('Remove Character')
    if (selectionStep === "ai") {
      dispatch(deSelectCharacter());
      dispatch(deSelectAICharacter());
      setSelectionStep("player"); // Move to selecting AI character next
    }
  }

  return (
    <>
      <S.Logo />

      <S.ImgContainter>
          <S.StyledCharacterImage
            src={selectedCharacter?.characterImg || "assets/empty-character-pic.png"}
            alt={selectedCharacter?.name}
          />
          <S.StyledCharacterImage
            src={aiCharacter?.characterImg || "assets/empty-character-pic.png" }
            alt={aiCharacter?.name}
          />
      </S.ImgContainter>

      <S.CharacterNameContainer>
        <S.CharacterName>{selectedCharacter?.name || "?"}</S.CharacterName>
        <S.CharacterName>{aiCharacter?.name || "?"}</S.CharacterName>
      </S.CharacterNameContainer>

      <S.VersusLogo src="assets/vs-logo.png" />

      <CharacterSelectionMenu
        onCharacterSelect={handleCharacterSelection}
        selectionStep={selectionStep}
      />

      <S.OptionsContainer>
        <S.OptionBorder className="with-right"><S.Option className="with-right" onClick={removeCharacter}>Cancel</S.Option></S.OptionBorder>
        <S.OptionBorder className="with-left with-right"><S.Option className="with-left with-right" onClick={onStartClick}
        disabled={!selectedCharacter || !aiCharacter}>Start Game</S.Option></S.OptionBorder>
        <S.OptionBorder className="with-left"><S.Option className="with-left" disabled>Items</S.Option></S.OptionBorder>
      </S.OptionsContainer>
    </>
  );
};
