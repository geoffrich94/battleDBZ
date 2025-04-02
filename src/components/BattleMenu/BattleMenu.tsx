
import { MoveSetMenu } from "components/MoveSetMenu/MoveSetMenu";
import * as S from "./BattleMenu.styles";
import { useState } from "react";
import { Character } from "shared";

interface BattleMenuProps {
  selectedCharacter: Character;
  playableCharacterHealth: number;
  onAttack: () => void;
  onKi: () => void;
  onSenzu: () => void;
  onSignatureMove: (moveName: string) => void; // Accepts a move name
  onSpecialMove: () => void;
}

export const BattleMenu: React.FC<BattleMenuProps> = ({
  selectedCharacter,
  playableCharacterHealth,
  onAttack,
  onKi,
  onSignatureMove,
  onSpecialMove,
  onSenzu,
}) => {

  const [isHidden, setIsHidden] = useState(false)


  return (
    <>
      <S.Container isHidden={isHidden}>
        <S.Border>
          <S.Option onClick={onAttack}>Attack</S.Option>
        </S.Border>
        <S.Border>
          <S.Option onClick={() => setIsHidden((prev) => !prev)}>Abilities</S.Option>
        </S.Border>
        <S.Border>
          <S.Option onClick={onSenzu}>Items</S.Option>
        </S.Border>
      </S.Container>

      <MoveSetMenu onKi={onKi} onSpecialMove={onSpecialMove} onSignatureMove={onSignatureMove} isHidden={!isHidden} selectedCharacter={selectedCharacter} playableCharacterHealth={playableCharacterHealth} onBack={() => setIsHidden(false)} />
    </>
  );
};
