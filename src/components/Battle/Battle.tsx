import { PlayerSummary } from 'components/PlayerSummary'
import { useState } from 'react';
import { npcStats, playerStats } from 'shared/characters';
import styles from './styles.module.css'

export const Battle = () => {

  const [nonPlayableCharacterHealth, setNonPlayableCharacterHealth] = useState(npcStats.maxHealth);
  const [playableCharacterHealth, setPlayableCharacterHealth] = useState(playerStats.maxHealth);

  return (
    <div className={styles.main}>
      <div className={styles.nonPlayableCharacter}>
        <div className={styles.summary}>
          <PlayerSummary playableCharacter={false} name={npcStats.name} level={npcStats.level} health={nonPlayableCharacterHealth} maxHealth={npcStats.maxHealth} />
        </div>
      </div>
      <div className={styles.playableCharacter}>
        <div className={styles.summary}>
          <PlayerSummary playableCharacter name={playerStats.name} level={playerStats.level} health={playableCharacterHealth} maxHealth={playerStats.maxHealth} />
        </div>
      </div>
    </div>
  )
}
