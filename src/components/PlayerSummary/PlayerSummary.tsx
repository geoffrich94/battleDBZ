import { Bar } from 'components';
import * as S from './PlayerSummary.styles';

const red = '#202020';
const blue = '#202020';

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

      <S.ProfilePicture profilePicture={playableCharacter ? "/assets/goku-profile-pic.png" : "/assets/vegeta-profile-pic.png"} />

      <S.InnerContainer>

        <S.Info>
          <S.InfoInnerContainer>
            <S.Heading>{name}</S.Heading>
            <S.Heading>Lvl: {level}</S.Heading>
          </S.InfoInnerContainer>
        </S.Info>

        <S.Health>
          <Bar width={(health / maxHealth) * 100} label='HP' />
        </S.Health>

      </S.InnerContainer>

    </S.Container>
  )
}
