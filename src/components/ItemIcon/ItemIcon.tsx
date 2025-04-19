import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as S from './ItemIcon.styles'

interface ItemIconProps {
  imgUrl: string;
  onClick?: () => void;
}

export const ItemIcon: React.FC<ItemIconProps> = ({ imgUrl, onClick }) => {

  const senzuCount = useSelector(
    (state: RootState) => state.character.selectedCharacter?.senzuCount || 0
  );
  
  return (
    <S.Border onClick={onClick}>
      <S.Container>
        <img src={imgUrl} alt='item' />
        <span>{senzuCount}</span>
      </S.Container>
    </S.Border>
  )
}