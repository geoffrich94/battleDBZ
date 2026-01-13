import { MoveSetMenu, ItemsMenu, ItemIcon } from "components";
import * as S from "./BattleMenu.styles";
import { useState } from "react";
import { Character } from "shared";

interface BattleMenuProps {
  selectedCharacter: Character;
  playableCharacterHealth: number;
  onAttack: () => void;
  onKi: () => void;
  onSenzu: () => void;
  onCharge: () => void;
  onSignatureMove: (moveName: string) => void;
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
  onCharge
}) => {
  const [activeMenu, setActiveMenu] = useState<
    "default" | "abilities" | "items"
  >("default");

  return (
    <S.Container>
      <S.ItemIconContainer>
        <ItemIcon imgUrl="assets/senzu-bean.png" onClick={onSenzu} isConsumable />
        <ItemIcon imgUrl="assets/ki-blast.png" onClick={onKi}/>
      </S.ItemIconContainer>

      {/* Battle Menu */}
      {activeMenu === "default" && (
        <S.BattleMenuContainer>
          <S.Border>
            <S.Option onClick={onAttack}>Attack</S.Option>
          </S.Border>
          <S.Border>
            <S.Option onClick={() => setActiveMenu("abilities")}>
              Abilities
            </S.Option>
          </S.Border>
          <S.Border>
            <S.Option onClick={onCharge}>Charge Up</S.Option>
          </S.Border>
          <S.Border>
            <S.Option onClick={() => setActiveMenu("items")}>Items</S.Option>
          </S.Border>
        </S.BattleMenuContainer>
      )}

      {/* Abilities Menu */}
      {activeMenu === "abilities" && (
        <MoveSetMenu
          onKi={onKi}
          onSpecialMove={onSpecialMove}
          onSignatureMove={onSignatureMove}
          isHidden={false}
          selectedCharacter={selectedCharacter}
          playableCharacterHealth={playableCharacterHealth}
          onBack={() => setActiveMenu("default")}
        />
      )}

      {/* Items Menu */}
      {activeMenu === "items" && (
        <ItemsMenu
          selectedCharacter={selectedCharacter}
          isHidden={false}
          onSenzu={onSenzu}
          onBack={() => setActiveMenu("default")}
        />
      )}
    </S.Container>
  );
};
