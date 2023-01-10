import { Bar } from 'components';
import styles from './styles.module.css'

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
    <div style={{ backgroundColor: playableCharacter ? red : blue }} className={styles.main}>

      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.level}>Lvl: {level}</div>
      </div>

      <div className={styles.health}>
        <Bar label='HP' value={health} maxValue={maxHealth} />
      </div>

    </div>
  )
}
