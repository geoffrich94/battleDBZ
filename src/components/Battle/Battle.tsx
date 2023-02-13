import { BattleMenu, PlayerSummary, BattleAnnouncer } from 'components';
import { useEffect, useState } from 'react';
import { useAIOpponent, useBattleSequence } from 'hooks';
import { npcStats, playerStats, wait } from 'shared';
import * as S from './Battle.styles';

export const Battle = () => {

  const [sequence, setSequence] = useState({});

  const {
    turn,
    inSequence,
    nonPlayableCharacterHealth,
    playableCharacterHealth,
    announcerMessage,
    playerAnimation,
    npcAnimation
  } = useBattleSequence(sequence);

  const aiChoice = useAIOpponent(turn);

  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice })
    }
  }, [turn, aiChoice, inSequence]);

  return (
    <>
      <S.NonPlayableCharacter>
        <S.Summary>
          <PlayerSummary playableCharacter={false} name={npcStats.name} level={npcStats.level} health={nonPlayableCharacterHealth} maxHealth={npcStats.maxHealth} />
        </S.Summary>
      </S.NonPlayableCharacter>

      <S.Characters>
        <S.GameImages>
          <S.PlayerSprite>
            <img alt={playerStats.name} src={playerStats.img} className={playerAnimation} />
          </S.PlayerSprite>
          <S.NPCSprite>
            <img alt={npcStats.name} src={npcStats.img} className={npcAnimation} />
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
          <BattleMenu onAttack={() => setSequence({ mode: 'attack', turn })} onKi={() => setSequence({ mode: 'ki', turn })} onSenzu={() => setSequence({ turn, mode: 'senzu' })} />
        </S.HUDChild>
      </S.HUD>
    </>
  )
}
