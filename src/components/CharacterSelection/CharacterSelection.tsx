import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { selectCharacter } from '../../redux/reducers/characterSlice'; 
import { characters } from 'shared/character';
import * as S from './CharacterSelection.styles';
import { CharacterSelectionMenu } from 'components'

interface CharacterSelectionProps {
  onStartClick: () => void;
}

export const CharacterSelection: React.FC<CharacterSelectionProps> = ({ onStartClick }) => {

  const dispatch = useDispatch();
  const selectedCharacter = useSelector((state: RootState) => state.character.selectedCharacter);

  const handleCharacterSelection = (characterImg: string, characterName: string) => {
    const chosenCharacter = characters.find((char) => char.characterImg === characterImg && char.name === characterName);
    if (chosenCharacter) {
      dispatch(selectCharacter(chosenCharacter));
    }
  };

  return (
    <>
      <S.Logo />
      <S.Button onClick={onStartClick} disabled={!selectedCharacter}>Start Game</S.Button>
      <S.ImgContainter>
        {selectedCharacter && (
          <S.StyledCharacterImage src={selectedCharacter.characterImg} alt={selectedCharacter.name} />
        )}
        <S.StyledCharacterImage alt="goku" src="assets/vegeta-character-pic.png" />
      </S.ImgContainter>
      <S.CharacterNameContainer>
        <S.CharacterName>{selectedCharacter?.name || "?"}</S.CharacterName>
        <S.CharacterName>
          Vegeta
        </S.CharacterName>
      </S.CharacterNameContainer>
      <S.VersusLogo src="assets/vs-logo.png" />
      <CharacterSelectionMenu onCharacterSelect={handleCharacterSelection} />
    </>
  )
}