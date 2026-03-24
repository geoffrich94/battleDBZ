import { useState } from "react";
import * as S from "./GameModeSelectMenu.styles";
import { AppMode } from "shared";

interface GameModeSelectMenuProps {
 onStartClick: (mode: AppMode) => void;
}

export const GameModeSelectMenu: React.FC<GameModeSelectMenuProps> = ({
  onStartClick,
}) => {
  const OPTIONS: { label: string; description: string; mode: AppMode }[] = [
    {
      label: "Singleplayer",
      description: "Play solo against AI",
      mode: "characterSelection",
    },
    {
      label: "Online Multiplayer",
      description: "Compete with players online",
      mode: "multiplayer",
    },
    {
      label: "Store",
      description: "Buy items and upgrades",
      mode: "characterSelection",
    },
    {
      label: "Collection",
      description: "View your card collection",
      mode: "characterSelection",
    },
    {
      label: "Codex",
      description: "Learn lore and rules",
      mode: "characterSelection",
    },
  ];
  const DEFAULT_TEXT = "Select Game Mode";
  const [description, setDescription] = useState(DEFAULT_TEXT);

  const [isFading, setIsFading] = useState(false);

  const changeDescription = (text: string) => {
    setIsFading(true);

    setTimeout(() => {
      setDescription(text);
      setIsFading(false);
    }, 200);
  };

  return (
    <>
      <S.Logo src={`${process.env.PUBLIC_URL}/assets/logo.png`} />

      <S.MenuContainer>
        <S.ListContainer>
          {OPTIONS.map(({ label, description, mode }) => (
            <S.ListOption
              key={label}
              onClick={() => onStartClick(mode)}
              onMouseEnter={() => changeDescription(description)}
            >
              {label}
            </S.ListOption>
          ))}
        </S.ListContainer>
      </S.MenuContainer>

      <S.DescriptionContainer $fading={isFading}>
        {description}
      </S.DescriptionContainer>
    </>
  );
};
