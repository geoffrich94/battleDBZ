import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Character } from "shared";
import * as S from "./ItemsMenu.styles";

interface BattleMenuProps {
  selectedCharacter: Character;
  // playableCharacterHealth: number;
  isHidden: boolean;
  onSenzu: () => void;
  onBack: () => void;
}

export const ItemsMenu: React.FC<BattleMenuProps> = ({
  onSenzu,
  onBack,
  isHidden,
  selectedCharacter,
}) => {
  const senzuCount = useSelector(
    (state: RootState) => state.character.selectedCharacter?.senzuCount || 0
  );

  return (
    <S.Container isHidden={isHidden}>
      <S.Border>
        <S.Option onClick={onBack}>Back</S.Option>
      </S.Border>
      <S.Border>
        <S.Option
          onClick={() => {
            onSenzu();
          }}
        >
          Senzu Bean (x{senzuCount})
        </S.Option>
      </S.Border>
      <S.Border>
        <S.Option disabled={true}>Attack Capsule (x2)</S.Option>
      </S.Border>
      <S.Border>
        <S.Option disabled={true}>Defence Capsule (x2)</S.Option>
      </S.Border>
    </S.Container>
  );
};
