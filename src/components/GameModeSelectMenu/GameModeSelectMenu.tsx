import { useState } from "react";
import * as S from "./GameModeSelectMenu.styles";

interface GameModeSelectMenuProps {
  onStartClick: () => void;
}

export const GameModeSelectMenu: React.FC<GameModeSelectMenuProps> = ({
  onStartClick,
}) => {
  const OPTIONS = [
    {
      label: "Singleplayer",
      description: "Play solo against AI",
    },
    { label: "Online Multiplayer", description: "Compete with players online" },
    { label: "Store", description: "Buy items and upgrades" },
    { label: "Collection", description: "View your card collection" },
    { label: "Codex", description: "Learn lore and rules" },
  ];
  const DEFAULT_TEXT = "Select Game Mode";
  const [description, setDescription] = useState(DEFAULT_TEXT);

  const [isFading, setIsFading] = useState(false);

  const changeDescription = (text: string) => {
    setIsFading(true);

    setTimeout(() => {
      setDescription(text);
      setIsFading(false);
    }, 200); // matches CSS transition
  };

  return (
    <>
      <S.Logo src={`${process.env.PUBLIC_URL}/assets/logo.png`} />

      <S.MenuContainer>
        <S.ListContainer>
          {OPTIONS.map(({ label, description: desc }) => (
            <S.ListOption
              key={label}
              onClick={onStartClick}
                onMouseEnter={() => changeDescription(desc)}
            >
              {label}
            </S.ListOption>
          ))}
        </S.ListContainer>
      </S.MenuContainer>

      <S.DescriptionContainer $fading={isFading}>{description}</S.DescriptionContainer>
    </>
  );
};
