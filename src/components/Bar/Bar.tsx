import * as S from './Bar.styles'

interface BarProps {
  label: string;
  value: number;
  maxValue: number;
}

export const Bar: React.FC<BarProps> = ({ label, value, maxValue }) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.Max>
        <S.Value width={(value / maxValue) * 100}></S.Value>
      </S.Max>
    </S.Container >
  )
}
