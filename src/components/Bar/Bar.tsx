import * as S from './Bar.styles'

interface BarProps {
  label?: string;
  width: number;
}

export const Bar: React.FC<BarProps> = ({ label, width }) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.Max>
        <S.Value data-testid='HealthBar' width={width}></S.Value>
      </S.Max>
    </S.Container>
  )
}
