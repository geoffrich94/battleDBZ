import { BattleMenu, PlayerSummary, BattleAnnouncer } from "components";
import { useEffect, useState } from "react";
import { useAIOpponent, useBattleSequence } from "hooks";
import { Character, wait, BattleSequence } from "shared";
import * as S from "./Battle.styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { updatePlayerIsCharging } from '../../redux/reducers/characterSlice';

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
    img: "/vegeta.png",
    profileImg: "",
    characterImg: "",
    ki: 0,
    attack: 0,
    defense: 0,
    kiDefense: 0,
    maxEnergy: 100,
    moveset: [],
    senzuCount: 1,
    isCharging: false,
  };

  const aiCharacter =
    useSelector((state: RootState) => state.character.aiCharacter) ||
    defaultAICharacter;

  const dispatch = useDispatch();

  const isCharging =
  useSelector((state: RootState) => state.character.selectedCharacter?.isCharging)

  const [sequence, setSequence] = useState<BattleSequence>({
    mode: "idle", // Default action
    turn: 0, // Player starts first
  });

  const [selectedMoveName, setSelectedMoveName] = useState<string>("");

  const {
    turn,
    inSequence,
    nonPlayableCharacterHealth,
    playableCharacterHealth,
    nonPlayableCharacterEnergy,
    playableCharacterEnergy,
    announcerMessage,
    playerAnimation,
    npcAnimation,
  } = useBattleSequence(
    sequence,
    selectedCharacter,
    aiCharacter,
    selectedMoveName
  );

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
        dispatch(updatePlayerIsCharging(false))
          setSequence({ turn, mode: aiChoice as "attack" | "ki" | "senzu" });
       
      }
    }

    // Reset `usedAiTurn` after each turn ends (player's turn or AI's turn)
    if (turn === 0 && !inSequence) {
      setUsedAiTurn(false); // Reset after player completes their turn
    }
  }, [turn, aiChoice, inSequence, usedAiTurn, sequence, isCharging]);

  useEffect(() => {
    if (playableCharacterHealth === 0 || nonPlayableCharacterHealth === 0) {
      (async () => {
        await wait(1000);
        onGameEnd(
          playableCharacterHealth === 0 ? aiCharacter : selectedCharacter
        );
      })();
    }
  }, [
    playableCharacterHealth,
    nonPlayableCharacterHealth,
    onGameEnd,
    aiCharacter,
    selectedCharacter,
  ]);

  return (
    <>
      <S.Logo />
      <S.NonPlayableCharacter>
        <S.Summary>
          <PlayerSummary
            selectedCharacter={aiCharacter}
            playableCharacter={false}
            name={aiCharacter.name}
            level={aiCharacter.level}
            health={nonPlayableCharacterHealth}
            maxHealth={aiCharacter.maxHealth}
            energy={nonPlayableCharacterEnergy}
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
          </S.PlayerSprite>
          <S.NPCSprite>
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
            health={playableCharacterHealth}
            maxHealth={selectedCharacter.maxHealth}
            energy={playableCharacterEnergy}
            maxEnergy={selectedCharacter.maxEnergy}
            className={isCharging ? 'charge' : ''}
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
            playableCharacterHealth={playableCharacterHealth}
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
                setSequence({ turn, mode: "charge" })
                // setIsCharging(true)
              }
            }
            
          />
        </S.HUDChild>
      </S.HUD>
    </>
  );
};

// import { BattleMenu, PlayerSummary, BattleAnnouncer } from "components";
// import { useEffect, useState } from "react";
// import { useAIOpponent, useBattleSequence } from "hooks";
// import { Character, wait, BattleSequence } from "shared";
// import * as S from "./Battle.styles";
// import { useSelector } from "react-redux";
// import { RootState } from "redux/store";

// interface BattleProps {
//   onGameEnd: (winner: Character) => void;
// }

// export const Battle: React.FC<BattleProps> = ({
//   onGameEnd,
// }) => {
//   const defaultCharacter: Character = {
//     name: "Default Character",
//     level: 1,
//     maxHealth: 100,
//     img: "/vegeta.png",
//     profileImg: "",
//     characterImg: "",
//     ki: 0,
//     attack: 0,
//     defense: 0,
//     kiDefense: 0,
//     maxEnergy: 100,
//     moveset: [],
//     senzuCount: 1,
//   };

//   const selectedCharacter = useSelector((state: RootState) => state.character.selectedCharacter) || defaultCharacter;
//   const aiCharacter = useSelector((state: RootState) => state.character.aiCharacter) || defaultCharacter;

//   const [sequence, setSequence] = useState<BattleSequence>({
//     mode: "idle",
//     turn: 0, 
//   });

//   const [selectedMoveName, setSelectedMoveName] = useState<string>("");

//   const {
//     turn,
//     inSequence,
//     aiCharacterHealth,
//     playableCharacterHealth,
//     nonPlayableCharacterEnergy,
//     playableCharacterEnergy,
//     announcerMessage,
//     playerAnimation,
//     npcAnimation,
//   } = useBattleSequence(
//     sequence,
//     selectedMoveName
//   );

//   const aiChoice = useAIOpponent(turn);

//   // Track if AI has already made a move this turn
//   const [usedAiTurn, setUsedAiTurn] = useState(false);

//   useEffect(() => {
//     // Trigger AI action only once during their turn
//     if (turn === 1 && !inSequence && !usedAiTurn) {
//       if (aiChoice) {
//         setUsedAiTurn(true); // Ensure AI only acts once
//         setSequence({ turn, mode: aiChoice as "attack" | "ki" | "senzu" });
//       }
//     }

//     // Reset `usedAiTurn` after each turn ends (player's turn or AI's turn)
//     if (turn === 0 && !inSequence) {
//       setUsedAiTurn(false); // Reset after player completes their turn
//     }
//   }, [turn, aiChoice, inSequence, usedAiTurn, sequence]);

//   useEffect(() => {
//     if (playableCharacterHealth === 0 || aiCharacterHealth === 0) {
//       (async () => {
//         await wait(1000);
//         onGameEnd(
//           playableCharacterHealth === 0 ? aiCharacter : selectedCharacter
//         );
//       })();
//     }
//   }, [
//     playableCharacterHealth,
//     aiCharacterHealth,
//     onGameEnd,
//     aiCharacter,
//     selectedCharacter,
//   ]);

//   return (
//     <>
//       <S.Logo />
//       <S.NonPlayableCharacter>
//         <S.Summary>
//           <PlayerSummary
//             selectedCharacter={aiCharacter}
//             playableCharacter={false}
//             name={aiCharacter.name}
//             level={aiCharacter.level}
//             health={aiCharacterHealth ?? aiCharacter.maxHealth}
//             maxHealth={aiCharacter.maxHealth}
//             energy={nonPlayableCharacterEnergy}
//             maxEnergy={aiCharacter.maxEnergy}
//           />
//         </S.Summary>
//       </S.NonPlayableCharacter>

//       <S.Characters>
//         <S.GameImages>
//           <S.PlayerSprite>
//             <img
//               alt={selectedCharacter.name}
//               src={`${process.env.PUBLIC_URL || ""}${selectedCharacter.img}`}
//               className={playerAnimation}
//             />
//           </S.PlayerSprite>
//           <S.NPCSprite>
//             <img
//               alt={aiCharacter.name}
//               src={`${process.env.PUBLIC_URL || ""}${aiCharacter.img}`}
//               className={npcAnimation}
//             />
//           </S.NPCSprite>
//         </S.GameImages>
//       </S.Characters>

//       <S.PlayableCharacter>
//         <S.Summary>
//           <PlayerSummary
//             selectedCharacter={selectedCharacter}
//             name={selectedCharacter.name}
//             level={selectedCharacter.level}
//             health={playableCharacterHealth ?? selectedCharacter.maxHealth}
//             maxHealth={selectedCharacter.maxHealth}
//             energy={playableCharacterEnergy}
//             maxEnergy={selectedCharacter.maxEnergy}
//           />
//         </S.Summary>
//       </S.PlayableCharacter>

//       <S.HUD>
//         <S.HUDChild>
//           <BattleAnnouncer
//             message={
//               announcerMessage || `What will ${selectedCharacter.name} do?`
//             }
//           />
//         </S.HUDChild>
//         <S.HUDChild>
//           <BattleMenu
//             selectedCharacter={selectedCharacter}
//             playableCharacterHealth={playableCharacterHealth ?? selectedCharacter.maxHealth}
//             onAttack={() => setSequence({ mode: "attack", turn })}
//             onKi={() => setSequence({ mode: "ki", turn })}
//             onSignatureMove={(moveName: string) => {
//               console.log(`Selected Signature Move: ${moveName}`);
//               setSelectedMoveName(moveName); // Save the move name
//               setSequence({ mode: "signatureMove", turn }); // Start sequence
//             }}
//             onSpecialMove={() => setSequence({ mode: "specialMove", turn })}
//             onSenzu={() => setSequence({ turn, mode: "senzu" })}
//           />
//         </S.HUDChild>
//       </S.HUD>
//     </>
//   );
// };

