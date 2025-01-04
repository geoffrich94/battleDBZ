import * as S from "./EndMenu.styles";

interface EndMenuProps {
  winner: any;
  onStartClick: () => void;
}

export const EndMenu: React.FC<EndMenuProps> = ({ winner, onStartClick }) => {
  return (
    <S.Main>
      <S.Text>{winner.name} Wins !</S.Text>
      <S.StartButton onClick={onStartClick}>Play Again</S.StartButton>
    </S.Main>
  );
};
