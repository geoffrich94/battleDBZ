import { useState } from 'react';
import * as S from './App.styles';
import { Battle, StartMenu } from 'components';

export const App = () => {
  const [mode, setmode] = useState('start');

  return (
    <S.Container>
      <S.Logo />
      {mode === 'start' && <StartMenu onStartClick={() => setmode('battle')} />}
      {mode === 'battle' && <Battle />}
      {mode === 'gameOver' && <>Game Over</>}
    </S.Container>
  )
}

