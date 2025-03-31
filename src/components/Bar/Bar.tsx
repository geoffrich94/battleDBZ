import * as S from './Bar.styles'

interface BarProps {
  label?: string;
  width: number;
  color: string;
}

export const Bar: React.FC<BarProps> = ({ label, width, color }) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.Max>
        <S.Value data-testid='HealthBar' width={width} color={color}></S.Value>
      </S.Max>
    </S.Container>
  )
}
