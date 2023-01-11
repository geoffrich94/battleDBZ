import { PlayerSummary } from 'components/PlayerSummary'
import { useState } from 'react';
import { npcStats, playerStats } from 'shared/characters';
import * as S from './Battle.styles';

export const Battle = () => {

  const [nonPlayableCharacterHealth, setNonPlayableCharacterHealth] = useState(npcStats.maxHealth);
  const [playableCharacterHealth, setPlayableCharacterHealth] = useState(playerStats.maxHealth);

  return (
    <S.Container>
      <S.NonPlayableCharacter>
        <S.Summary>
          <PlayerSummary playableCharacter={false} name={npcStats.name} level={npcStats.level} health={nonPlayableCharacterHealth} maxHealth={npcStats.maxHealth} />
        </S.Summary>
      </S.NonPlayableCharacter>
      <S.PlayableCharacter>
        <S.Summary>
          <PlayerSummary playableCharacter name={playerStats.name} level={playerStats.level} health={playableCharacterHealth} maxHealth={playerStats.maxHealth} />
        </S.Summary>
      </S.PlayableCharacter>
    </S.Container>
  )
}
