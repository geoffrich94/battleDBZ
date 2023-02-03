import * as S from './BattleMenu.styles'

interface BattleMenuProps {
  onAttack: () => void;
  onKi: () => void;
  onSenzu: () => void;
}

export const BattleMenu: React.FC<BattleMenuProps> = ({ onAttack, onKi, onSenzu }) => {
  return (
    <S.Container>
      <S.Border>
        <S.Option onClick={onAttack}>Attack</S.Option>
      </S.Border>
      <S.Border>
        <S.Option onClick={onKi}>Ki</S.Option>
      </S.Border>
      <S.Border>
        <S.Option onClick={onSenzu}>Senzu</S.Option>
      </S.Border>
    </S.Container>
  )
}
