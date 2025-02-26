import { characters } from "shared";
import * as S from './CharacterSelectionMenu.styles'

interface CharacterSelectionMenuProps {
  onCharacterSelect: (characterImg: string, characterName: string) => void;
}

export const CharacterSelectionMenu: React.FC<CharacterSelectionMenuProps> = ({ onCharacterSelect }) => {
  return (
    <>
      <S.Container>
        {characters.map((character, idx) => (
          <S.Border key={idx}>
            <S.CharacterSelectionIcon onClick={() => onCharacterSelect(character.characterImg, character.name)}
              profilePicture={character.profileImg}
            />
          </S.Border>
        ))}
      </S.Container>
    </>
  )
}
