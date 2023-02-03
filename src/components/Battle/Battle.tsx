import { BattleAnnouncer } from 'components/BattleAnnouncer';
import { BattleMenu } from 'components/BattleMenu';
import { PlayerSummary } from 'components/PlayerSummary'
import { useState } from 'react';
import { npcStats, playerStats } from 'shared';
import * as S from './Battle.styles';

interface BattleProps {
  className?: string;
}

export const Battle: React.FC<BattleProps> = ({ className }) => {

  const [nonPlayableCharacterHealth, setNonPlayableCharacterHealth] = useState(npcStats.maxHealth);
  const [playableCharacterHealth, setPlayableCharacterHealth] = useState(playerStats.maxHealth);
  const [announcerMessage, setAnnouncerMessage] = useState('');

  return (
    // <S.Container className={className}>
    <>
      <S.NonPlayableCharacter>
        <S.Summary>
          <PlayerSummary playableCharacter={false} name={npcStats.name} level={npcStats.level} health={nonPlayableCharacterHealth} maxHealth={npcStats.maxHealth} />
        </S.Summary>
      </S.NonPlayableCharacter>

      <S.Characters>
        {/* <S.GameHeader>
          {playerStats.name} vs {npcStats.name}
        </S.GameHeader> */}
        <S.GameImages>
          <S.PlayerSprite>
            <img alt={playerStats.name} src={playerStats.img} />
          </S.PlayerSprite>
          <S.NPCSprite>
            <img alt={npcStats.name} src={npcStats.img} />
          </S.NPCSprite>
        </S.GameImages>
      </S.Characters>

      <S.PlayableCharacter>
        <S.Summary>
          <PlayerSummary playableCharacter name={playerStats.name} level={playerStats.level} health={playableCharacterHealth} maxHealth={playerStats.maxHealth} />
        </S.Summary>
      </S.PlayableCharacter>

      <S.HUD>
        <S.HUDChild>
          <BattleAnnouncer message={announcerMessage || `What will ${playerStats.name} do?`} />
        </S.HUDChild>
        <S.HUDChild>
          <BattleMenu onAttack={() => { console.log('Attack') }} onKi={() => { console.log('Ki') }} onSenzu={() => { console.log('Senzu') }} />
        </S.HUDChild>
      </S.HUD>

    </>

    // </S.Container>
  )
}
