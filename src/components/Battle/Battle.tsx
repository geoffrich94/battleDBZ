import { BattleMenu, PlayerSummary, BattleAnnouncer } from "components";
import { useEffect, useState } from "react";
import { useAIOpponent, useBattleSequence } from "hooks";
import { npcStats, playerStats, Character, wait, BattleSequence } from "shared";
import * as S from "./Battle.styles";

interface BattleProps {
  onGameEnd: (winner: Character) => void;
  selectedCharacter: Character;
}

export const Battle: React.FC<BattleProps> = ({ onGameEnd, selectedCharacter }) => {
  const [sequence, setSequence] = useState<BattleSequence>({
    mode: 'idle', // Default action
    turn: 0, // Player starts first
  });

  const {
    turn,
    inSequence,
    nonPlayableCharacterHealth,
    playableCharacterHealth,
    announcerMessage,
    playerAnimation,
    npcAnimation,
  } = useBattleSequence(sequence);

  const aiChoice = useAIOpponent(turn);

  // Track if AI has already made a move this turn
  const [usedAiTurn, setUsedAiTurn] = useState(false);

  useEffect(() => {
    // Trigger AI action only once during their turn
    if (turn === 1 && !inSequence && !usedAiTurn) {
      if (aiChoice) {
        setUsedAiTurn(true); // Ensure AI only acts once
        setSequence({ turn, mode: aiChoice as 'attack' | 'ki' | 'senzu' });
      }
    }

    // Reset `usedAiTurn` after each turn ends (player's turn or AI's turn)
    if (turn === 0 && !inSequence) {
      setUsedAiTurn(false); // Reset after player completes their turn
    }
  }, [turn, aiChoice, inSequence, usedAiTurn, sequence]);

  useEffect(() => {
    if (playableCharacterHealth === 0 || nonPlayableCharacterHealth === 0) {
      (async () => {
        await wait(1000);
        onGameEnd(playableCharacterHealth === 0 ? npcStats : playerStats);
      })();
    }
  }, [playableCharacterHealth, nonPlayableCharacterHealth, onGameEnd]);

  return (
    <>
      <S.Logo />
      <S.NonPlayableCharacter>
        <S.Summary>
          <PlayerSummary
            selectedCharacter={null}
            playableCharacter={false}
            name={npcStats.name}
            level={npcStats.level}
            health={nonPlayableCharacterHealth}
            maxHealth={npcStats.maxHealth}
          />
        </S.Summary>
      </S.NonPlayableCharacter>

      <S.Characters>
        <S.GameImages>
          <S.PlayerSprite>
            <img
              alt={selectedCharacter.name}
              src={`${process.env.PUBLIC_URL}${selectedCharacter.img}`}
              className={playerAnimation}
            />
          </S.PlayerSprite>
          <S.NPCSprite>
            <img
              alt={npcStats.name}
              src={`${process.env.PUBLIC_URL}${npcStats.img}`}
              className={npcAnimation}
            />
          </S.NPCSprite>
        </S.GameImages>
      </S.Characters>

      <S.PlayableCharacter>
        <S.Summary>
          <PlayerSummary
            selectedCharacter={selectedCharacter}
            name={selectedCharacter.name}
            level={selectedCharacter.level}
            health={playableCharacterHealth}
            maxHealth={selectedCharacter.maxHealth}
          />
        </S.Summary>
      </S.PlayableCharacter>

      <S.HUD>
        <S.HUDChild>
          <BattleAnnouncer
            message={announcerMessage || `What will ${selectedCharacter.name} do?`}
          />
        </S.HUDChild>
        <S.HUDChild>
          <BattleMenu
            onAttack={() => setSequence({ mode: "attack", turn })}
            onKi={() => setSequence({ mode: "ki", turn })}
            onSenzu={() => setSequence({ turn, mode: "senzu" })}
          />
        </S.HUDChild>
      </S.HUD>
    </>
  );
};
