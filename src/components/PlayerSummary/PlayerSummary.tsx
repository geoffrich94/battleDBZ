import { Bar } from 'components';
import * as S from './PlayerSummary.styles';

const red = '#821200';
const blue = '#1953cb';

interface PlayerSummaryProps {
  playableCharacter?: boolean;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
}

export const PlayerSummary: React.FC<PlayerSummaryProps> = ({ playableCharacter, name, level, health, maxHealth }) => {
  return (
    <S.Container backgroundColor={playableCharacter ? red : blue}>

      <S.Info>
        <S.Heading>{name}</S.Heading>
        <S.Heading>Lvl: {level}</S.Heading>
      </S.Info>

      <S.Health>
        <Bar label='HP' value={health} maxValue={maxHealth} />
      </S.Health>

    </S.Container>
  )
}
