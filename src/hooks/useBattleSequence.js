import {
  wait,
  ki,
  senzu,
  attack,
  playerStats,
  npcStats,
} from 'shared';
import { useEffect, useState } from 'react';

export const useBattleSequence = sequence => {
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);
  const [nonPlayableCharacterHealth, setNonPlayableCharacterHealth] = useState(npcStats.maxHealth);
  const [playableCharacterHealth, setPlayableCharacterHealth] = useState(playerStats.maxHealth);
  const [announcerMessage, setAnnouncerMessage] = useState('');
  const [playerAnimation, setPlayerAnimation] = useState('static');
  const [npcAnimation, setNPCAnimation] = useState('static');

  useEffect(() => {

    const { mode, turn } = sequence;

    if (mode) {

      const attacker = turn === 0 ? playerStats : npcStats;
      const receiver = turn === 0 ? npcStats : playerStats;

      switch (mode) {
        case 'attack': {

          const damage = attack(attacker, receiver);

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has chosen to attack!`);

            await wait(1000);

            turn === 0 ? setPlayerAnimation('attack') : setNPCAnimation('attack');
            await wait(100);

            turn === 0 ? setPlayerAnimation('static') : setNPCAnimation('static');
            await wait(500);

            turn === 0 ? setNPCAnimation('damage') : setPlayerAnimation('damage');
            await wait(750);

            turn === 0 ? setNPCAnimation('static') : setPlayerAnimation('static');
            setAnnouncerMessage(`${receiver.name} felt that!`);
            turn === 0 ? setNonPlayableCharacterHealth(h => (h - damage > 0 ? h - damage : 0)) : setPlayableCharacterHealth('static');
            await wait(2000);

            setAnnouncerMessage(`Now its ${receiver.name}'s turn!`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case 'ki': {
          const damage = ki(attacker, receiver);

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has used a ki blast`);
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('ki')
              : setNPCAnimation('ki');
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('static')
              : setNPCAnimation('static');
            await wait(500);

            turn === 0
              ? setNPCAnimation('damage')
              : setPlayerAnimation('damage');
            await wait(750);

            turn === 0
              ? setNPCAnimation('static')
              : setPlayerAnimation('static');
            setAnnouncerMessage(
              `${receiver.name} doesn't know what hit them!`,
            );
            turn === 0
              ? setNonPlayableCharacterHealth(h => (h - damage > 0 ? h - damage : 0))
              : setPlayableCharacterHealth(h => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.
            await wait(2500);

            setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case 'senzu': {
          const recovered = senzu({ receiver: attacker });

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has chosen to heal!`);
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('magic')
              : setNPCAnimation('magic');
            await wait(1000);

            turn === 0
              ? setPlayerAnimation('static')
              : setNPCAnimation('static');
            await wait(500);

            setAnnouncerMessage(`${attacker.name} has recovered health.`);
            turn === 0
              ? setPlayableCharacterHealth(h =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              )
              : setNonPlayableCharacterHealth(h =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              ); // We don't want to set HP more than the max
            await wait(2500);

            setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        default:
          break;
      }
    }
  }, [sequence]);

  return {
    turn,
    inSequence,
    nonPlayableCharacterHealth,
    playableCharacterHealth,
    announcerMessage,
    playerAnimation,
    npcAnimation
  }
}