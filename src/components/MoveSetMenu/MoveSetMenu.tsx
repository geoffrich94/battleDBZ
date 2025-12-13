import { Character } from "shared";
import * as S from "./MoveSetMenu.styles";

interface MoveSetMenuProps {
  isHidden: boolean;
  selectedCharacter: Character;
  playableCharacterHealth: number;
  onKi: () => void;
  onBack: () => void;
  onSignatureMove: (moveName: string) => void;
  onSpecialMove: () => void;
}

export const MoveSetMenu: React.FC<MoveSetMenuProps> = ({
  isHidden,
  selectedCharacter,
  playableCharacterHealth,
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
          playableCharacterHealth < selectedCharacter.maxHealth * 0.2;

        const handleMoveClick = () => {
          if (move.special) {
            onSpecialMove();
          } else {
            onSignatureMove(move.name);
          }
        };

        return (
          <S.Border key={index}>
            <S.Option
              disabled={isLastMove && !isHealthLow}
              onClick={handleMoveClick}
            >
              {move.name}
            </S.Option>
          </S.Border>
        );
      })}
    </S.Container>
  );
};
