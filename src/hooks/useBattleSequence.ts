import {
  wait,
  ki,
  attack,
  BattleSequence,
  calculateMoveDamage,
  charge,
} from "shared";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import {
  updatePlayableCharacterSenzuCount,
  updateAiSenzuCount,
  updatePlayerIsCharging,
  updateAiCharacterHealth,
  updatePlayableCharacterHealth,
  updatePlayableCharacterEnergy,
  updateAiCharacterEnergy,
  applyPlayerSenzu,
  applyAiSenzu,
} from "./../redux/reducers/characterSlice";
import {
  setTurn,
  setInSequence,
  setAnnouncerMessage,
} from "./../redux/reducers/battleSlice";

export const useBattleSequence = (
  sequence: BattleSequence,
  selectedMoveName: string // Add selectedMoveName as an argument
) => {
  const dispatch = useDispatch();

  const { turn, inSequence, announcerMessage } = useSelector(
    (state: RootState) => state.battle
  );
  const { selectedCharacter, aiCharacter } = useSelector(
    (state: RootState) => state.character
  );
  const selectCharacterMoveset = useSelector(
    (state: RootState) => state.character.selectedCharacter?.moveset
  );

  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [npcAnimation, setNPCAnimation] = useState("static");

  const selectedCharacterSenzuCount = useSelector(
    (state: RootState) => state.character.selectedCharacter?.senzuCount || 0
  );
  const aiSenzuCount = useSelector(
    (state: RootState) => state.character.aiCharacter?.senzuCount || 0
  );

  const senzuProcessedRef = useRef(false);
  const hasChargedRef = useRef(false);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!sequence || inSequence) return; // Prevents automatic execution

    const { mode, turn } = sequence;

    if (mode) {
      if (!selectedCharacter || !aiCharacter || !mode) return;

      const attacker = turn === 0 ? selectedCharacter : aiCharacter;
      const receiver = turn === 0 ? aiCharacter : selectedCharacter;

      switch (mode) {
        case "attack": {
          const damage = attack(attacker, receiver, 0.25);
          console.log('attack damage dealt: ', damage);

          (async () => {
            dispatch(setInSequence(true));
            dispatch(
              setAnnouncerMessage(`${attacker?.name} has chosen to attack!`)
            );
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

            dispatch(setAnnouncerMessage(`${receiver?.name} felt that!`));
            turn === 0
              ? dispatch(updateAiCharacterHealth(damage))
              : dispatch(updatePlayableCharacterHealth(damage));
            await wait(2000);

            dispatch(setAnnouncerMessage(`Now it's ${receiver?.name}'s turn!`));
            await wait(1500);

            dispatch(setTurn());
            dispatch(setInSequence(false));
          })();

          break;
        }

        case "ki": {
          const damage = ki(attacker, receiver, 0.25);

          const kiCost = selectedCharacter.kiCost;

          if (selectedCharacter.currentEnergy >= kiCost) {
            (async () => {
              dispatch(setInSequence(true));
              dispatch(
                setAnnouncerMessage(`${attacker.name} has used a ki blast!`)
              );
              await wait(1000);

              // Deduct energy for the move
              turn === 0
                ? dispatch(
                    updatePlayableCharacterEnergy(
                      selectedCharacter.currentEnergy - kiCost
                    )
                  )
                : dispatch(
                    updateAiCharacterEnergy(aiCharacter.currentEnergy - kiCost)
                  );

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

              dispatch(
                setAnnouncerMessage(
                  `${receiver.name} doesn't know what hit them!`
                )
              );

              turn === 0
                ? dispatch(updateAiCharacterHealth(damage))
                : dispatch(updatePlayableCharacterHealth(damage));

              await wait(2500);

              dispatch(
                setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`)
              );
              await wait(1500);

              dispatch(setTurn());
              dispatch(setInSequence(false));
            })();
          } else {
            // If not enough energy, display a message
            dispatch(
              setAnnouncerMessage(
                `${selectedCharacter.name} doesn't have enough energy!`
              )
            );
          }

          break;
        }

        case "signatureMove": {
          // Find the selected signature move from the moveset
          const selectedMove = selectCharacterMoveset?.find(
            (move) => move.name === selectedMoveName && move.special !== true
          );

          console.log(selectedMove);

          if (!selectedMove) {
            dispatch(
              setAnnouncerMessage(
                `${selectedCharacter.name} has no signature move selected!`
              )
            );
            break;
          }

          const kiCost = selectedMove.kiCost; // Get the kiCost from the signature move

          // Check if the selected character has enough energy to use the move
          if (selectedCharacter.maxEnergy >= kiCost) {
            (async () => {
              dispatch(setInSequence(true));
              dispatch(
                setAnnouncerMessage(
                  `${selectedCharacter.name} has used ${selectedMove.name}!`
                )
              );

              // Deduct energy for the move
              turn === 0
                ? dispatch(
                    updatePlayableCharacterEnergy(
                      selectedCharacter.currentEnergy - kiCost
                    )
                  )
                : dispatch(
                    updateAiCharacterEnergy(aiCharacter.currentEnergy - kiCost)
                  );

              // Calculate damage
              const damage = calculateMoveDamage(
                selectedCharacter,
                aiCharacter,
                selectedMove,
                0.25 // critChance
              );
               console.log('signature damage dealt: ', damage);

              if (damage !== 0) {

                await wait(1000);
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
                  ? dispatch(updateAiCharacterHealth(damage))
                  : dispatch(updatePlayableCharacterHealth(damage));
                await wait(2500);

                dispatch(
                  setAnnouncerMessage(`Now it's ${aiCharacter.name}'s turn!`)
                );
                await wait(1500);

                // Switch turn
                dispatch(setTurn());
                dispatch(setInSequence(false));
              }
            })();
          } else {
            // If not enough energy, display a message
            dispatch(
              setAnnouncerMessage(
                `${selectedCharacter.name} doesn't have enough energy!`
              )
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
            if (selectedCharacter.maxEnergy >= kiCost) {
              (async () => {
                dispatch(setInSequence(true));
                dispatch(
                  setAnnouncerMessage(
                    `${selectedCharacter.name} has used ${selectedMove.name}!`
                  )
                );

                // Deduct energy for the move
                turn === 0
                  ? dispatch(
                      updatePlayableCharacterEnergy(
                        selectedCharacter.currentEnergy - kiCost
                      )
                    )
                  : dispatch(
                      updateAiCharacterEnergy(
                        aiCharacter.currentEnergy - kiCost
                      )
                    );

                // Calculate damage
                const damage = calculateMoveDamage(
                  selectedCharacter,
                  aiCharacter,
                  selectedMove,
                  0.25 // critChance
                );

                if (damage !== 0) {
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
                    ? dispatch(updateAiCharacterHealth(damage))
                    : dispatch(updatePlayableCharacterHealth(damage));

                  await wait(2500);

                  dispatch(
                    setAnnouncerMessage(
                      `Now it's ${selectedCharacter.name}'s turn!`
                    )
                  );
                  await wait(1500);

                  // Switch turn
                  dispatch(setTurn());
                  dispatch(setInSequence(false));
                }
              })();
            } else {
              // If not enough energy, display a message
              dispatch(
                setAnnouncerMessage(
                  `${selectedCharacter.name} doesn't have enough energy!`
                )
              );
            }
          }

          break;
        }

        case "senzu": {
          if (mode === "senzu" && !senzuProcessedRef.current) {
            senzuProcessedRef.current = true; // Mark as processed

            (async () => {
              dispatch(setInSequence(true));

              const currentSenzu =
                attacker === selectedCharacter
                  ? selectedCharacterSenzuCount
                  : aiSenzuCount; // capture at the time the sequence starts

              if (currentSenzu <= 0) {
                dispatch(
                  setAnnouncerMessage(
                    `${attacker.name} has run out of senzu beans.`
                  )
                );
                await wait(1500);
                dispatch(setInSequence(false));
                return;
              }

              dispatch(
                setAnnouncerMessage(`${attacker.name} has chosen to heal!`)
              );
              dispatch(
                attacker === selectedCharacter
                  ? updatePlayableCharacterSenzuCount(currentSenzu - 1)
                  : updateAiSenzuCount(currentSenzu - 1)
              );

              await wait(1000);
              (turn === 0 ? setPlayerAnimation : setNPCAnimation)("magic");
              await wait(1000);
              (turn === 0 ? setPlayerAnimation : setNPCAnimation)("static");

              await wait(500);

              dispatch(
                setAnnouncerMessage(
                  `${attacker.name} has recovered health and energy.`
                )
              );

              turn === 0
                ? dispatch(applyPlayerSenzu())
                : dispatch(applyAiSenzu());

              await wait(2500);

              dispatch(
                setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`)
              );
              await wait(1500);

              dispatch(setTurn());
              dispatch(setInSequence(false));
            })();
          } else {
            senzuProcessedRef.current = false; // Reset for next time
          }

          break;
        }

        case "charge": {
          // DO NOT run this effect again while a sequence is already running
          if (inSequence) return;

          // Prevent repeating the same turn twice
          if (hasRunRef.current) return;
          hasRunRef.current = true;

          const runChargeSequence = async () => {
            dispatch(setInSequence(true));

            // Begin charge animation
            if (turn === 0 && !hasChargedRef.current) {
              hasChargedRef.current = true;
              dispatch(updatePlayerIsCharging(true));
            }

            dispatch(
              setAnnouncerMessage(`${attacker.name} is charging up energy!`)
            );
            await wait(500);

            const chargeUp = charge(attacker);

            if (turn === 0) {
              dispatch(
                updatePlayableCharacterEnergy(
                  selectedCharacter.currentEnergy + chargeUp
                )
              );
              setPlayerAnimation("charge");
            } else {
              dispatch(
                updateAiCharacterEnergy(aiCharacter.currentEnergy + chargeUp)
              );
              setNPCAnimation("charge");
            }

            await wait(2500);

            // End charge state
            if (turn === 0) {
              dispatch(updatePlayerIsCharging(false));
              hasChargedRef.current = false;
            }

            // Switch turns
            dispatch(setTurn());

            // END the sequence
            dispatch(setInSequence(false));

            // Finally release the lock
            hasRunRef.current = false;
          };

          runChargeSequence();
          break;
        }

        default:
          break;
      }
    }
  }, [sequence, selectedMoveName]);

  return {
    turn,
    inSequence,
    announcerMessage,
    playerAnimation,
    npcAnimation,
  };
};
