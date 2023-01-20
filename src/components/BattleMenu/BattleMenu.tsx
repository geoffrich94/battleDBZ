import * as S from './BattleMenu.styles'

interface BattleMenuProps {
  onAttack: () => void;
  onKi: () => void;
  onSenzu: () => void;
}

export const BattleMenu: React.FC<BattleMenuProps> = ({ onAttack, onKi, onSenzu }) => {
  return (
    <S.Container>
      <S.Option onClick={onAttack}>Attack</S.Option>
      <S.Option onClick={onKi}>Ki</S.Option>
      <S.Option onClick={onSenzu}>Senzu</S.Option>
    </S.Container>
  )
}
