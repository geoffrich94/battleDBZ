
import { MoveSetMenu } from "components/MoveSetMenu/MoveSetMenu";
import * as S from "./BattleMenu.styles";
import { useState } from "react";
import { Character } from "shared";

interface BattleMenuProps {
  selectedCharacter: Character
  onAttack: () => void;
  onKi: () => void;
  onSenzu: () => void;
  onMove: () => void;
}

export const BattleMenu: React.FC<BattleMenuProps> = ({
  selectedCharacter,
  onAttack,
  onKi,
  onMove,
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

      <MoveSetMenu onKi={onKi} onMove={onMove} isHidden={!isHidden} selectedCharacter={selectedCharacter} onBack={() => setIsHidden(false)} />
    </>
  );
};
