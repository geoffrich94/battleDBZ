import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as S from './ItemIcon.styles'

interface ItemIconProps {
  isSenzu?: boolean;
  isAttackCapsule?: boolean;
  isDefenceCapsule?: boolean;
  imgUrl: string;
  onClick?: () => void;
}

export const ItemIcon: React.FC<ItemIconProps> = ({ isSenzu, isAttackCapsule, isDefenceCapsule, imgUrl, onClick }) => {

  const senzuCount = useSelector(
    (state: RootState) => state.character.selectedCharacter?.senzuCount || 0
  );
  
  return (
    <S.Border onClick={onClick}>
      <S.Container>
        <img src={imgUrl} alt='item' />
        {isSenzu ? <span>{senzuCount}</span> : <span></span>}
        {isAttackCapsule ? <span>1</span> : <span></span>}
        {isDefenceCapsule ? <span>1</span> : <span></span>}
      </S.Container>
    </S.Border>
  )
}