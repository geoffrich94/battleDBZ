import {
  wait,
  ki,
  senzu,
  attack,
  BattleSequence,
  Character,
  calculateMoveDamage,
} from "shared";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { updatePlayableCharacterSenzuCount, updateAiSenzuCount } from "./../redux/reducers/characterSlice";

export const useBattleSequence = (
  sequence: BattleSequence,
  selectedCharacter: Character,
  aiCharacter: Character,
  selectedMoveName: string // Add selectedMoveName as an argument
) => {
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);
  const [nonPlayableCharacterHealth, setNonPlayableCharacterHealth] = useState(
    aiCharacter.maxHealth
  );
  const [playableCharacterHealth, setPlayableCharacterHealth] = useState(
    selectedCharacter.maxHealth
  );
  const [nonPlayableCharacterEnergy, setNonPlayableCharacterEnergy] = useState(
    aiCharacter.maxEnergy
  );
  const [playableCharacterEnergy, setPlayableCharacterEnergy] = useState(
    selectedCharacter.maxEnergy
  );
  const [announcerMessage, setAnnouncerMessage] = useState("");
  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [npcAnimation, setNPCAnimation] = useState("static");

  const dispatch = useDispatch();
  const selectedCharacterSenzuCount = useSelector(
    (state: RootState) => state.character.selectedCharacter?.senzuCount || 0
  );
  const aiSenzuCount = useSelector(
    (state: RootState) => state.character.aiCharacter?.senzuCount || 0
  );

  const senzuProcessedRef = useRef(false);

  useEffect(() => {
    if (!sequence) return; // Prevents automatic execution

    const { mode, turn } = sequence;

    if (mode) {
      if (!selectedCharacter || !mode) return;

      const attacker = turn === 0 ? selectedCharacter : aiCharacter;
      const receiver = turn === 0 ? aiCharacter : selectedCharacter;

      switch (mode) {
        case "attack": {
          const damage = attack(attacker, receiver);

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has chosen to attack!`);
            await wait(1000);

            if (turn === 0) {
              setPlayerAnimation("attack");
              setTimeout(() => setPlayerAnimation("static"), 200);
            } else {
              setNPCAnimation("attack");
              setTimeout(() => setNPCAnimation("static"), 200);
            }
            await wait(100);

            if (turn === 0) {
              setNPCAnimation("damage");
              setTimeout(() => setNPCAnimation("static"), 2000);
            } else {
              setPlayerAnimation("damage");
              setTimeout(() => setPlayerAnimation("static"), 2000);
            }
            await wait(500);

            setAnnouncerMessage(`${receiver.name} felt that!`);
            turn === 0
              ? setNonPlayableCharacterHealth((h) => Math.max(0, h - damage))
              : setPlayableCharacterHealth((h) => Math.max(0, h - damage));
            await wait(2000);

            setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case "ki": {
          const damage = ki(attacker, receiver);

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has used a ki blast!`);
            await wait(1000);

            // Ki blast animation
            if (turn === 0) {
              setPlayerAnimation("ki");
              setTimeout(() => setPlayerAnimation("static"), 1000);
            } else {
              setNPCAnimation("ki");
              setTimeout(() => setNPCAnimation("static"), 1000);
            }
            await wait(1000);

            // Apply damage animation and make it last for 5 seconds
            if (turn === 0) {
              setNPCAnimation("damage");
              setTimeout(() => setNPCAnimation("static"), 2000); // Stop flashing after 5s
            } else {
              setPlayerAnimation("damage");
              setTimeout(() => setPlayerAnimation("static"), 2000);
            }
            await wait(750);

            setAnnouncerMessage(`${receiver.name} doesn't know what hit them!`);

            if (turn === 0) {
              setNonPlayableCharacterHealth((h) => Math.max(0, h - damage));
            } else {
              setPlayableCharacterHealth((h) => Math.max(0, h - damage));
            }
            await wait(2500);

            setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case "signatureMove": {
          // Find the selected signature move from the moveset
          const selectedMove = selectedCharacter.moveset.find(
            (move) => move.name === selectedMoveName && move.special !== true
          );

          if (!selectedMove) {
            setAnnouncerMessage(
              `${selectedCharacter.name} has no signature move selected!`
            );
            break;
          }

          const kiCost = selectedMove.kiCost; // Get the kiCost from the signature move

          // Check if the selected character has enough energy to use the move
          if (playableCharacterEnergy >= kiCost) {
            (async () => {
              setInSequence(true);
              setAnnouncerMessage(
                `${selectedCharacter.name} has used ${selectedMove.name}!`
              );

              // Deduct energy for the move
              setPlayableCharacterEnergy((energy) => energy - kiCost);

              // Calculate the damage using the utility function
              const damage = calculateMoveDamage(
                selectedCharacter,
                aiCharacter,
                selectedMove
              );

              await wait(1000);

              // Ki blast animation
              if (turn === 0) {
                setPlayerAnimation("ki");
                setTimeout(() => setPlayerAnimation("static"), 1000);
              } else {
                setNPCAnimation("ki");
                setTimeout(() => setNPCAnimation("static"), 1000);
              }
              await wait(1000);

              // Apply damage animation and make it last for 5 seconds
              if (turn === 0) {
                setNPCAnimation("damage");
                setTimeout(() => setNPCAnimation("static"), 2000); // Stop flashing after 5s
              } else {
                setPlayerAnimation("damage");
                setTimeout(() => setPlayerAnimation("static"), 2000);
              }
              await wait(750);

              // Apply damage to the opponent
              turn === 0
                ? setNonPlayableCharacterHealth((h) => Math.max(0, h - damage))
                : setPlayableCharacterHealth((h) => Math.max(0, h - damage));

              await wait(2500);

              setAnnouncerMessage(`Now it's ${aiCharacter.name}'s turn!`);
              await wait(1500);

              // Switch turn
              setTurn(turn === 0 ? 1 : 0);
              setInSequence(false);
            })();
          } else {
            // If not enough energy, display a message
            setAnnouncerMessage(
              `${selectedCharacter.name} doesn't have enough energy!`
            );
          }

          break;
        }

        case "specialMove": {
          // Find the special move with special: true (which is Super Kamehameha)
          const selectedMove = selectedCharacter.moveset.find(
            (move) => move.special === true
          );

          // If a special move is found, proceed
          if (selectedMove) {
            const kiCost = selectedMove.kiCost; // Get the kiCost from the special move

            // Check to see if the selected character has enough energy to make the move
            if (playableCharacterEnergy >= kiCost) {
              (async () => {
                setInSequence(true);
                setAnnouncerMessage(
                  `${selectedCharacter.name} has used ${selectedMove.name}!`
                );

                // Deduct energy for the move
                setPlayableCharacterEnergy((energy) => energy - kiCost);

                // Calculate the damage using the utility function
                const damage = calculateMoveDamage(
                  selectedCharacter,
                  aiCharacter,
                  selectedMove
                );

                await wait(1000);

                // Ki blast animation
                if (turn === 0) {
                  setPlayerAnimation("ki");
                  setTimeout(() => setPlayerAnimation("static"), 1000);
                } else {
                  setNPCAnimation("ki");
                  setTimeout(() => setNPCAnimation("static"), 1000);
                }
                await wait(1000);

                // Apply damage animation and make it last for 5 seconds
                if (turn === 0) {
                  setNPCAnimation("damage");
                  setTimeout(() => setNPCAnimation("static"), 2000); // Stop flashing after 5s
                } else {
                  setPlayerAnimation("damage");
                  setTimeout(() => setPlayerAnimation("static"), 2000);
                }
                await wait(750);

                // Apply damage to the opponent
                turn === 0
                  ? setNonPlayableCharacterHealth((h) =>
                      Math.max(0, h - damage)
                    )
                  : setPlayableCharacterHealth((h) => Math.max(0, h - damage));

                await wait(2500);

                setAnnouncerMessage(
                  `Now it's ${selectedCharacter.name}'s turn!`
                );
                await wait(1500);

                // Switch turn
                setTurn(turn === 0 ? 1 : 0);
                setInSequence(false);
              })();
            } else {
              // If not enough energy, display a message
              setAnnouncerMessage(
                `${selectedCharacter.name} doesn't have enough energy!`
              );
            }
          }

          break;
        }

        case "senzu": {
          if (mode === "senzu" && !senzuProcessedRef.current) {
            
            senzuProcessedRef.current = true; // Mark as processed

            (async () => {
              setInSequence(true);

              const currentSenzu = attacker === selectedCharacter ? selectedCharacterSenzuCount : aiSenzuCount; // capture at the time the sequence starts

              if (currentSenzu <= 0) {
                setAnnouncerMessage(
                  `${attacker.name} has run out of senzu beans.`
                );
                await wait(1500);
                setInSequence(false);
                return;
              }

              setAnnouncerMessage(`${attacker.name} has chosen to heal!`);
              dispatch(
                attacker === selectedCharacter
                  ? updatePlayableCharacterSenzuCount(currentSenzu - 1)
                  : updateAiSenzuCount(currentSenzu - 1)
              );

              const recovered = senzu(attacker);

              await wait(1000);
              (turn === 0 ? setPlayerAnimation : setNPCAnimation)("magic");
              await wait(1000);
              (turn === 0 ? setPlayerAnimation : setNPCAnimation)("static");

              await wait(500);

              setAnnouncerMessage(`${attacker.name} has recovered health.`);
              turn === 0
                ? setPlayableCharacterHealth((h) =>
                    Math.min(h + recovered, selectedCharacter.maxHealth)
                  )
                : setNonPlayableCharacterHealth((h) =>
                    Math.min(h + recovered, aiCharacter.maxHealth)
                  );

              await wait(2500);

              setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
              await wait(1500);

              setTurn(turn === 0 ? 1 : 0);
              setInSequence(false);
            })();
          } else {
            senzuProcessedRef.current = false; // Reset for next time
          }

          break;
        }

        default:
          break;
      }
    }
  }, [selectedCharacter, aiCharacter, sequence, selectedMoveName, aiSenzuCount, dispatch, selectedCharacterSenzuCount]); // ✅ Add selectedMoveName to dependencies

  return {
    turn,
    inSequence,
    nonPlayableCharacterHealth,
    playableCharacterHealth,
    nonPlayableCharacterEnergy,
    playableCharacterEnergy,
    announcerMessage,
    playerAnimation,
    npcAnimation,
  };
};

// import {
//   wait,
//   ki,
//   senzu,
//   attack,
//   BattleSequence,
//   Character,
//   calculateMoveDamage,
// } from "shared";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "redux/store";
// import {
//   updatePlayableCharacterHealth,
//   updateAiCharacterHealth,
//   updatePlayableCharacterEnergy,
// } from "./../redux/reducers/characterSlice";

// export const useBattleSequence = (
//   sequence: BattleSequence,
//   selectedMoveName: string
// ) => {
//   const [turn, setTurn] = useState(0);
//   const [inSequence, setInSequence] = useState(false);

//   const dispatch = useDispatch();

//   const selectedCharacter = useSelector(
//     (state: RootState) => state.character.selectedCharacter
//   );
//   const aiCharacter = useSelector(
//     (state: RootState) => state.character.aiCharacter
//   );

//   const aiCharacterHealth = useSelector(
//     (state: RootState) => state.character.aiCharacter?.maxHealth
//   );
//   const playableCharacterHealth = useSelector(
//     (state: RootState) => state.character.selectedCharacter?.maxHealth
//   );

//   const playableCharacterEnergy = useSelector(
//     (state: RootState) => state.character.selectedCharacter?.maxEnergy ?? 100
//   );
//   const nonPlayableCharacterEnergy = useSelector(
//     (state: RootState) => state.character.aiCharacter?.maxEnergy ?? 100
//   );

//   const [announcerMessage, setAnnouncerMessage] = useState("");
//   const [playerAnimation, setPlayerAnimation] = useState("static");
//   const [npcAnimation, setNPCAnimation] = useState("static");

//   useEffect(() => {
//     if (!sequence) return;

//     const { mode, turn } = sequence;

//     if (mode) {
//       if (!selectedCharacter || !mode) return;

//       const attacker = turn === 0 ? selectedCharacter : aiCharacter;
//       const receiver = turn === 0 ? aiCharacter : selectedCharacter;

//       if (!attacker || !receiver) {
//         return; // Exit early or handle the case where attacker or receiver is null
//       }

//       switch (mode) {
//         case "attack": {
//           const damage = attack(attacker, receiver);
//           const newPlayerCharacterHealth = Math.max(
//             0,
//             selectedCharacter.maxHealth - damage
//           );
//           const newAiCharacterHealth = Math.max(
//             0,
//             aiCharacter?.maxHealth || 100
//           );

//           (async () => {
//             setInSequence(true);
//             setAnnouncerMessage(`${attacker.name} has chosen to attack!`);
//             await wait(1000);

//             if (turn === 0) {
//               setPlayerAnimation("attack");
//               setTimeout(() => setPlayerAnimation("static"), 200);
//             } else {
//               setNPCAnimation("attack");
//               setTimeout(() => setNPCAnimation("static"), 200);
//             }
//             await wait(100);

//             if (turn === 0) {
//               setNPCAnimation("damage");
//               setTimeout(() => setNPCAnimation("static"), 2000);
//             } else {
//               setPlayerAnimation("damage");
//               setTimeout(() => setPlayerAnimation("static"), 2000);
//             }
//             await wait(500);

//             setAnnouncerMessage(`${receiver.name} felt that!`);
//             turn === 0
//               ? dispatch(
//                   updatePlayableCharacterHealth(newPlayerCharacterHealth)
//                 )
//               : dispatch(updateAiCharacterHealth(newAiCharacterHealth));
//             await wait(2000);

//             setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
//             await wait(1500);

//             setTurn(turn === 0 ? 1 : 0);
//             setInSequence(false);
//           })();

//           break;
//         }

//         case "ki": {
//           const damage = ki(attacker, receiver);

//           (async () => {
//             setInSequence(true);
//             setAnnouncerMessage(`${attacker.name} has used a ki blast!`);
//             await wait(1000);

//             // Ki blast animation
//             if (turn === 0) {
//               setPlayerAnimation("ki");
//               setTimeout(() => setPlayerAnimation("static"), 1000);
//             } else {
//               setNPCAnimation("ki");
//               setTimeout(() => setNPCAnimation("static"), 1000);
//             }
//             await wait(1000);

//             // Apply damage animation and make it last for 5 seconds
//             if (turn === 0) {
//               setNPCAnimation("damage");
//               setTimeout(() => setNPCAnimation("static"), 2000); // Stop flashing after 5s
//             } else {
//               setPlayerAnimation("damage");
//               setTimeout(() => setPlayerAnimation("static"), 2000);
//             }
//             await wait(750);

//             setAnnouncerMessage(`${receiver.name} doesn't know what hit them!`);

//             if (turn === 0) {
//               const newHealth = Math.max(
//                 0,
//                 selectedCharacter.maxHealth - damage
//               );
//               dispatch(updatePlayableCharacterHealth(newHealth));
//             } else {
//               const newHealth = Math.max(
//                 0,
//                 (aiCharacter?.maxHealth || 100) - damage
//               );
//               dispatch(updateAiCharacterHealth(newHealth));
//             }
//             await wait(2500);

//             setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
//             await wait(1500);

//             setTurn(turn === 0 ? 1 : 0);
//             setInSequence(false);
//           })();

//           break;
//         }

//         case "signatureMove": {
//           // Find the selected signature move from the moveset
//           const selectedMove = selectedCharacter.moveset.find(
//             (move) => move.name === selectedMoveName && move.special !== true
//           );

//           if (!selectedMove) {
//             setAnnouncerMessage(
//               `${selectedCharacter.name} has no signature move selected!`
//             );
//             break;
//           }

//           const kiCost = selectedMove.kiCost; // Get the kiCost from the signature move

//           // Check if the selected character has enough energy to use the move
//           if (playableCharacterEnergy >= kiCost) {
//             (async () => {
//               setInSequence(true);
//               setAnnouncerMessage(
//                 `${selectedCharacter.name} has used ${selectedMove.name}!`
//               );

//               // Deduct energy for the move
//               dispatch(
//                 updatePlayableCharacterEnergy(playableCharacterEnergy - kiCost)
//               );

//               // Calculate the damage using the utility function
//               const damage = calculateMoveDamage(
//                 selectedCharacter,
//                 aiCharacter,
//                 selectedMove
//               );

//               await wait(1000);

//               // Ki blast animation
//               if (turn === 0) {
//                 setPlayerAnimation("ki");
//                 setTimeout(() => setPlayerAnimation("static"), 1000);
//               } else {
//                 setNPCAnimation("ki");
//                 setTimeout(() => setNPCAnimation("static"), 1000);
//               }
//               await wait(1000);

//               // Apply damage animation and make it last for 5 seconds
//               if (turn === 0) {
//                 setNPCAnimation("damage");
//                 setTimeout(() => setNPCAnimation("static"), 2000); // Stop flashing after 5s
//               } else {
//                 setPlayerAnimation("damage");
//                 setTimeout(() => setPlayerAnimation("static"), 2000);
//               }
//               await wait(750);

//               // Apply damage to the opponent
//               if (turn === 0) {
//                 const newHealth = Math.max(
//                   0,
//                   selectedCharacter.maxHealth - damage
//                 );
//                 dispatch(updatePlayableCharacterHealth(newHealth));
//               } else {
//                 const newHealth = Math.max(
//                   0,
//                   (aiCharacter?.maxHealth || 100) - damage
//                 );
//                 dispatch(updateAiCharacterHealth(newHealth));
//               }
//               await wait(2500);

//               setAnnouncerMessage(`Now it's ${selectedCharacter.name}'s turn!`);
//               await wait(1500);

//               // Switch turn
//               setTurn(turn === 0 ? 1 : 0);
//               setInSequence(false);
//             })();
//           } else {
//             // If not enough energy, display a message
//             setAnnouncerMessage(
//               `${selectedCharacter.name} doesn't have enough energy!`
//             );
//           }

//           break;
//         }

//         case "specialMove": {
//           // Find the special move with special: true (which is Super Kamehameha)
//           const selectedMove = selectedCharacter.moveset.find(
//             (move) => move.special === true
//           );

//           // If a special move is found, proceed
//           if (selectedMove) {
//             const kiCost = selectedMove.kiCost; // Get the kiCost from the special move

//             // Check to see if the selected character has enough energy to make the move
//             if (playableCharacterEnergy >= kiCost) {
//               (async () => {
//                 setInSequence(true);
//                 setAnnouncerMessage(
//                   `${selectedCharacter.name} has used ${selectedMove.name}!`
//                 );

//                 // Deduct energy for the move
//                 dispatch(
//                   updatePlayableCharacterEnergy(
//                     playableCharacterEnergy - kiCost
//                   )
//                 );

//                 // Calculate the damage using the utility function
//                 const damage = calculateMoveDamage(
//                   selectedCharacter,
//                   aiCharacter,
//                   selectedMove
//                 );

//                 await wait(1000);

//                 // Ki blast animation
//                 if (turn === 0) {
//                   setPlayerAnimation("ki");
//                   setTimeout(() => setPlayerAnimation("static"), 1000);
//                 } else {
//                   setNPCAnimation("ki");
//                   setTimeout(() => setNPCAnimation("static"), 1000);
//                 }
//                 await wait(1000);

//                 // Apply damage animation and make it last for 5 seconds
//                 if (turn === 0) {
//                   setNPCAnimation("damage");
//                   setTimeout(() => setNPCAnimation("static"), 2000); // Stop flashing after 5s
//                 } else {
//                   setPlayerAnimation("damage");
//                   setTimeout(() => setPlayerAnimation("static"), 2000);
//                 }
//                 await wait(750);

//                 // Apply damage to the opponent
//                 if (turn === 0) {
//                   const newHealth = Math.max(
//                     0,
//                     selectedCharacter.maxHealth - damage
//                   );
//                   dispatch(updatePlayableCharacterHealth(newHealth));
//                 } else {
//                   const newHealth = Math.max(
//                     0,
//                     (aiCharacter?.maxHealth || 100) - damage
//                   );
//                   dispatch(updateAiCharacterHealth(newHealth));
//                 }
//                 await wait(2500);

//                 setAnnouncerMessage(
//                   `Now it's ${selectedCharacter.name}'s turn!`
//                 );
//                 await wait(1500);

//                 // Switch turn
//                 setTurn(turn === 0 ? 1 : 0);
//                 setInSequence(false);
//               })();
//             } else {
//               // If not enough energy, display a message
//               setAnnouncerMessage(
//                 `${selectedCharacter.name} doesn't have enough energy!`
//               );
//             }
//           }

//           break;
//         }

//         case "senzu": {
//           const recovered = senzu(attacker);

//           (async () => {
//             setInSequence(true);
//             setAnnouncerMessage(`${attacker.name} has chosen to heal!`);
//             await wait(1000);

//             turn === 0 ? setPlayerAnimation("magic") : setNPCAnimation("magic");
//             await wait(1000);

//             turn === 0
//               ? setPlayerAnimation("static")
//               : setNPCAnimation("static");
//             await wait(500);

//             setAnnouncerMessage(`${attacker.name} has recovered health.`);
//             if (turn === 0) {
//               const newHealth = Math.min(
//                 selectedCharacter.maxHealth + recovered,
//                 selectedCharacter.maxHealth
//               );
//               dispatch(updatePlayableCharacterHealth(newHealth));
//             } else {
//               const newHealth = Math.min(
//                 aiCharacter.maxHealth + recovered,
//                 aiCharacter.maxHealth
//               );
//               dispatch(updateAiCharacterHealth(newHealth));
//             }
//             await wait(2500);

//             setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
//             await wait(1500);

//             setTurn(turn === 0 ? 1 : 0);
//             setInSequence(false);
//           })();

//           break;
//         }

//         default:
//           break;
//       }
//     }
//   }, [selectedCharacter, aiCharacter, sequence, selectedMoveName]); // ✅ Add selectedMoveName to dependencies

//   // ✅ Return null-like state if data isn't ready yet
//   if (!selectedCharacter || !aiCharacter) {
//     return {
//       turn: 0,
//       inSequence: false,
//       aiCharacterHealth: 0,
//       playableCharacterHealth: 0,
//       nonPlayableCharacterEnergy: 0,
//       playableCharacterEnergy: 0,
//       announcerMessage: "",
//       playerAnimation: "static",
//       npcAnimation: "static",
//     };
//   }

//   return {
//     turn,
//     inSequence,
//     aiCharacterHealth,
//     playableCharacterHealth,
//     nonPlayableCharacterEnergy,
//     playableCharacterEnergy,
//     announcerMessage,
//     playerAnimation,
//     npcAnimation,
//   };
// };
