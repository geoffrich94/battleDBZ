import { useState } from 'react';
import styles from './styles.module.css';
import { Battle, StartMenu } from 'components';

export const App = () => {
  const [mode, setmode] = useState('start');

  return (
    <div className={styles.main}>
      {mode === 'start' && <StartMenu onStartClick={() => setmode('battle')} />}
      {mode === 'battle' && <Battle />}
      {mode === 'gameOver' && <>Game Over</>}
    </div>
  )
}

