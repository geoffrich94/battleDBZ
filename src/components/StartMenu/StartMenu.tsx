import * as S from "./StartMenu.styles";

interface StartMenuProps {
  onStartClick: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ onStartClick }) => {
  return (
    <>
      <S.Container>
        <S.Logo src={`${process.env.PUBLIC_URL}/assets/logo.png`} />
        <S.StartButton onClick={onStartClick}>
          Click here to Start Game
        </S.StartButton>
      </S.Container>

      <S.CompanyLogo src={`${process.env.PUBLIC_URL}/assets/companylogo.png`}/>
    </>
  );
};
