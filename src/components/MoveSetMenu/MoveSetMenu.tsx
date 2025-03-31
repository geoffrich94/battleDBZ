import { Character } from "shared";
import * as S from "./MoveSetMenu.styles";

interface MoveSetMenuProps {
  isHidden: boolean;
  selectedCharacter: Character;
  onKi: () => void;
  onBack: () => void;
  onMove: () => void;
}

export const MoveSetMenu: React.FC<MoveSetMenuProps> = ({
  isHidden,
  selectedCharacter,
  onKi,
  onMove,
  onBack,
}) => {
  return (
    <S.Container isHidden={isHidden}>
      <S.Border>
        <S.Option onClick={onBack}>Back</S.Option> {/* <-- Calls onBack */}
      </S.Border>
      <S.Border>
        <S.Option onClick={onKi}>Ki Blast</S.Option>
      </S.Border>
      {selectedCharacter.moveset.map((move) => (
        <S.Border>
          <S.Option onClick={onMove}>{move.name}</S.Option>
        </S.Border>
      ))}
    </S.Container>
  );
};
