import { Character } from "shared";
import * as S from "./MoveSetMenu.styles";
import { PlayableCharacter } from '../Battle/Battle.styles';

interface MoveSetMenuProps {
  isHidden: boolean;
  selectedCharacter: Character;
  playableCharacterHealth: number;
  onKi: () => void;
  onBack: () => void;
  onSignatureMove: () => void;
  onSpecialMove: () => void;
}

export const MoveSetMenu: React.FC<MoveSetMenuProps> = ({
  isHidden,
  selectedCharacter,
  playableCharacterHealth,
  onKi,
  onSignatureMove,
  onSpecialMove,
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
      {selectedCharacter.moveset.map((move, index) => {
  console.log(`Move: ${move.name}, Index: ${index}, Health: ${playableCharacterHealth}, Disabled: ${index === 1 && playableCharacterHealth < (selectedCharacter.maxHealth * 0.2)}`);

  return (
    <S.Border key={index}>
      <S.Option 
        disabled={index === 1 && playableCharacterHealth > (selectedCharacter.maxHealth * 0.2)}
        onClick={index === 0 ? onSignatureMove : onSpecialMove}
      >
        {move.name}
      </S.Option>
    </S.Border>
  );
})}

    </S.Container>
  );
};
