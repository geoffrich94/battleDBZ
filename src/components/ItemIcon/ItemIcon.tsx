import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as S from './ItemIcon.styles'

interface ItemIconProps {
  isConsumable?: boolean;
  imgUrl: string;
  onClick?: () => void;
}

export const ItemIcon: React.FC<ItemIconProps> = ({ isConsumable, imgUrl, onClick }) => {

  const senzuCount = useSelector(
    (state: RootState) => state.character.selectedCharacter?.senzuCount || 0
  );
  
  return (
    <S.Border onClick={onClick}>
      <S.Container>
        <img src={imgUrl} alt='item' />
        {isConsumable ? <span>{senzuCount}</span> : <span></span>}
      </S.Container>
    </S.Border>
  )
}