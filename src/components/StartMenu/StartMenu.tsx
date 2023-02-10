import * as S from './StartMenu.styles';

interface StartMenuProps {
  onStartClick: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ onStartClick }) => {
  return (
    <S.Container>
      <S.StartButton onClick={onStartClick}>Start Game</S.StartButton>
    </S.Container>
  );
}