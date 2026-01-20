import { Character } from "shared";
import * as S from "./MoveSetMenu.styles";
import { CooldownSkillIcon } from "components/CooldownSkillIcon/CooldownSkillIcon";

interface MoveSetMenuProps {
  isHidden: boolean;
  selectedCharacter: Character;
  onKi: () => void;
  onBack: () => void;
  onSignatureMove: (moveName: string) => void;
  onSpecialMove: () => void;
}

export const MoveSetMenu: React.FC<MoveSetMenuProps> = ({
  isHidden,
  selectedCharacter,
  onKi,
  onBack,
  onSignatureMove,
  onSpecialMove,
}) => {
  return (
    <S.Container isHidden={isHidden}>
      <S.Border>
        <S.Option onClick={onBack}>Back</S.Option>
      </S.Border>
      <S.Border>
        <S.Option onClick={onKi}>Ki Blast</S.Option>
      </S.Border>
      {selectedCharacter.moveset.map((move, index) => {
        const isLastMove = index === selectedCharacter.moveset.length - 1;
        const isHealthLow =
          selectedCharacter.currentHealth < selectedCharacter.maxHealth * 0.2;
        const cooldown =
          move.category === "special"
            ? selectedCharacter.moveCooldown.special
            : selectedCharacter.moveCooldown.signature;

        const isDisabled =
          cooldown > 0 ||
          selectedCharacter.currentEnergy < move.kiCost ||
          (isLastMove && !isHealthLow);

        const handleMoveClick = () => {
          if (isDisabled) return;

          if (move.category === "special") {
            onSpecialMove();
          } else {
            onSignatureMove(move.name);
          }
        };

        return (
          <S.Border key={index}>
            <S.Option disabled={isDisabled} onClick={handleMoveClick}>
              {move.name}
              {cooldown > 0 && (
                <CooldownSkillIcon
                  turnsRemaining={cooldown}
                  maxTurns={move.category === "special" ? 5 : 3}
                />
              )}
            </S.Option>
          </S.Border>
        );
      })}
    </S.Container>
  );
};
