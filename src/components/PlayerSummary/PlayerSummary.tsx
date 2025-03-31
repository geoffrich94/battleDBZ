import { Bar } from 'components';
import * as S from './PlayerSummary.styles';
import { Character } from 'shared';

const red = '#202020';
const blue = '#202020';

interface PlayerSummaryProps {
  selectedCharacter?: Character | null;
  playableCharacter?: boolean;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
}

export const PlayerSummary: React.FC<PlayerSummaryProps> = ({ selectedCharacter, playableCharacter, name, level, health, maxHealth, energy, maxEnergy }) => {
  return (
    <S.Container>

      <S.ProfilePicture profilePicture={selectedCharacter ? selectedCharacter.name.toLowerCase() : "vegeta"} />

      <S.InnerContainer>

        <S.Info>
          <S.InfoInnerContainer>
            <S.Heading>{name}</S.Heading>
            <S.Heading>Lvl: {level}</S.Heading>
          </S.InfoInnerContainer>
        </S.Info>

        <S.Health>
          <Bar width={(health / maxHealth) * 100} label='HP' color='lawngreen'/>
          <Bar width={(energy/ maxEnergy) * 100} label='EP' color='blue'/>
        </S.Health>

      </S.InnerContainer>

    </S.Container>
  )
}
