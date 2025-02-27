import { Character } from "shared";
import * as S from "./EndMenu.styles";

interface EndMenuProps {
  winner: Character | null;
  onStartClick: () => void;
}

export const EndMenu: React.FC<EndMenuProps> = ({ winner, onStartClick }) => {
  return (
    <S.Main>
        <S.Container>
      
        <S.ProfilePicture profilePicture={`/assets/${winner?.name}-profile-pic.png`} />
      
            <S.InnerContainer>
      
              <S.Info>
                <S.InfoInnerContainer>
                  <S.Heading>{winner?.name} Wins !</S.Heading>
                </S.InfoInnerContainer>
              </S.Info>
      
              <S.StartButton onClick={onStartClick}>Play Again</S.StartButton>
      
            </S.InnerContainer>
      
          </S.Container>
          
    </S.Main>
  );
};
