import { BattleMenu, PlayerSummary, BattleAnnouncer } from "components";
import { useEffect, useState } from "react";
import { useAIOpponent, useBattleSequence } from "hooks";
import { Character, wait, BattleSequence } from "shared";
import * as S from "./Battle.styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { updatePlayerIsCharging } from "../../redux/reducers/characterSlice";

interface BattleProps {
  onGameEnd: (winner: Character) => void;
  selectedCharacter: Character;
}

export const Battle: React.FC<BattleProps> = ({
  onGameEnd,
  selectedCharacter,
}) => {
  const defaultAICharacter: Character = {
    name: "Default AI",
    level: 1,
    maxHealth: 100,
    currentHealth: 100,
    img: "/vegeta.png",
    profileImg: "",
    characterImg: "",
    ki: 0,
    kiCost: 0,
    attack: 0,
    defense: 0,
    kiDefense: 0,
    maxEnergy: 100,
    currentEnergy: 100,
    attackAccuracy: 0.75,
    moveset: [],
    senzuCount: 1,
    isCharging: false,
  };

  const aiCharacter =
    useSelector((state: RootState) => state.character.aiCharacter) ||
    defaultAICharacter;

  const playableCharacter =
    useSelector((state: RootState) => state.character.selectedCharacter) ||
    defaultAICharacter;

  const dispatch = useDispatch();

  const isCharging = useSelector(
    (state: RootState) => state.character.selectedCharacter?.isCharging
  );

  const [sequence, setSequence] = useState<BattleSequence>({
    mode: "idle", // Default action
    turn: 0, // Player starts first
  });

  const [selectedMoveName, setSelectedMoveName] = useState<string>("");

  const {
    turn,
    inSequence,
    announcerMessage,
    playerAnimation,
    npcAnimation,
    missState
  } = useBattleSequence(sequence, selectedMoveName);

  const aiSenzuCount = useSelector(
    (state: RootState) => state.character.aiCharacter?.senzuCount || 0
  );

  const aiChoice = useAIOpponent(turn, aiSenzuCount);

  // Track if AI has already made a move this turn
  const [usedAiTurn, setUsedAiTurn] = useState(false);

  useEffect(() => {
    // Trigger AI action only once during their turn
    if (turn === 1 && !inSequence && !usedAiTurn) {
      if (aiChoice) {
        setUsedAiTurn(true); // Ensure AI only acts once
        // setTimeout to simulate player waiting before choosing move
        dispatch(updatePlayerIsCharging(false));
        setSequence({ turn, mode: aiChoice as "attack" | "ki" | "senzu" });
      }
    }

    // Reset `usedAiTurn` after each turn ends (player's turn or AI's turn)
    if (turn === 0 && !inSequence) {
      setUsedAiTurn(false); // Reset after player completes their turn
    }
  }, [turn, aiChoice, inSequence, usedAiTurn, sequence, isCharging, dispatch]);

  useEffect(() => {
    if (
      playableCharacter.currentHealth === 0 ||
      aiCharacter.currentHealth === 0
    ) {
      (async () => {
        await wait(1000);
        onGameEnd(
          playableCharacter.currentHealth === 0
            ? aiCharacter
            : selectedCharacter
        );
      })();
    }
  }, [
    playableCharacter.currentHealth,
    aiCharacter.currentHealth,
    onGameEnd,
    aiCharacter,
    selectedCharacter,
  ]);

  return (
    <S.Container>
      <S.Logo />
      <S.NonPlayableCharacter>
        <S.Summary>
          <PlayerSummary
            selectedCharacter={aiCharacter}
            playableCharacter={false}
            name={aiCharacter.name}
            level={aiCharacter.level}
            health={aiCharacter.currentHealth}
            maxHealth={aiCharacter.maxHealth}
            energy={aiCharacter.currentEnergy}
            maxEnergy={aiCharacter.maxEnergy}
          />
        </S.Summary>
      </S.NonPlayableCharacter>

      <S.Characters>
        <S.GameImages>
          <S.PlayerSprite>
            <img
              alt={selectedCharacter.name}
              src={`${process.env.PUBLIC_URL || ""}${selectedCharacter.img}`}
              className={playerAnimation}
            />
             <S.AttackStatus hasMissed={missState.npc}>Missed!</S.AttackStatus>
          </S.PlayerSprite>
          <S.NPCSprite>
            <S.AttackStatus hasMissed={missState.player}>Missed!</S.AttackStatus>
            <img
              alt={aiCharacter.name}
              src={`${process.env.PUBLIC_URL || ""}${aiCharacter.img}`}
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
            health={playableCharacter.currentHealth}
            maxHealth={selectedCharacter.maxHealth}
            energy={selectedCharacter.currentEnergy}
            maxEnergy={selectedCharacter.maxEnergy}
            className={isCharging ? "charge" : ""}
            playerTurn={turn}
          />
        </S.Summary>
      </S.PlayableCharacter>

      <S.HUD>
        <S.HUDChild>
          <BattleAnnouncer
            message={
              announcerMessage || `What will ${selectedCharacter.name} do?`
            }
          />
        </S.HUDChild>
        <S.HUDChild>
          <BattleMenu
            selectedCharacter={selectedCharacter}
            playableCharacterHealth={playableCharacter.maxHealth}
            onAttack={() => setSequence({ mode: "attack", turn })}
            onKi={() => setSequence({ mode: "ki", turn })}
            onSignatureMove={(moveName: string) => {
              console.log(`Selected Signature Move: ${moveName}`);
              setSelectedMoveName(moveName); // Save the move name
              setSequence({ mode: "signatureMove", turn }); // Start sequence
            }}
            onSpecialMove={() => setSequence({ mode: "specialMove", turn })}
            onSenzu={() => setSequence({ turn, mode: "senzu" })}
            onCharge={() => {
              setSequence({ turn, mode: "charge" });
            }}
          />
        </S.HUDChild>
      </S.HUD>
    </S.Container>
  );
};
