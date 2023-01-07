import React, { useState } from 'react';
import styles from './styles.module.css';
import { StartMenu } from '../StartMenu/index';

export const App = () => {
  const [mode, setmode] = useState('start');

  return (
    <div className={styles.main}>
      {mode === 'start' && <StartMenu onStartClick={() => setmode('battle')} />}
      {mode === 'battle' && <>Battle Mode</>}
      {mode === 'gameOver' && <>Game Over</>}
    </div>
  )
}

