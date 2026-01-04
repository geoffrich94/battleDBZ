import {
  wait,
  ki,
  attack,
  BattleSequence,
  calculateMoveDamage,
  charge,
  MissState,
  getAnnouncerMessage,
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

  const [missState, setMissState] = useState<MissState>({
    player: false,
    npc: false,
  });

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
          const result = attack(attacker, receiver);

          const { damage, missed, isCritical } = result;

          (async () => {
            dispatch(setInSequence(true));

            // ATTACK animation (always plays first)
            if (turn === 0) {
              setPlayerAnimation("attack");
              setTimeout(() => setPlayerAnimation("static"), 200);
            } else {
              setNPCAnimation("attack");
              setTimeout(() => setNPCAnimation("static"), 200);
            }

            // Show Missed text if attack missed
            if (missed) {
              // Wait 0.2s so the "Missed!" text appears slightly after attack starts
              await wait(200);
              if (turn === 0) {
                setMissState({ player: true, npc: false });
              } else {
                setMissState({ player: false, npc: true });
              }

              // Keep the missed text (NOT ANNOUCNER MESSAGE) visible for 1 second
              await wait(1000);

              // Hide missed text
              setMissState({ player: false, npc: false });
            }

            // Wait 0.5s for announcer message
            await wait(500);

            // Announce action or miss or critical hit
            dispatch(
              setAnnouncerMessage(
                getAnnouncerMessage(attacker.name, "Attack", result)
              )
            );

            // Only apply damage animation if hit
            if (!missed) {
              await wait(500); // small delay after announcement
              if (turn === 0) {
                setNPCAnimation("damage");
                setTimeout(() => setNPCAnimation("static"), 2000);
                dispatch(updateAiCharacterHealth(damage));
              } else {
                setPlayerAnimation("damage");
                setTimeout(() => setPlayerAnimation("static"), 2000);
                dispatch(updatePlayableCharacterHealth(damage));
              }

              await wait(1000);
              dispatch(setAnnouncerMessage(`${receiver.name} felt that!`));
            }

            await wait(2000);

            // Turn handoff
            dispatch(setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`));
            await wait(1500);

            dispatch(setTurn());
            dispatch(setInSequence(false));
          })();

          break;
        }

        case "ki": {
          const result = ki(attacker, receiver);

          const kiCost = selectedCharacter.kiCost;

          if (selectedCharacter.currentEnergy >= kiCost) {
            (async () => {
              dispatch(setInSequence(true));
              dispatch(
                setAnnouncerMessage(
                  getAnnouncerMessage(attacker.name, "Ki Blast", result)
                )
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

              // Show Missed text if missed
              if (result.missed) {
                await wait(200); // small delay
                if (turn === 0) setMissState({ player: true, npc: false });
                else setMissState({ player: false, npc: true });

                await wait(1000);
                setMissState({ player: false, npc: false });
              }

              // Only apply damage animation if hit
              if (!result.missed) {
                await wait(500); // small delay after announcement
                if (turn === 0) {
                  setNPCAnimation("damage");
                  setTimeout(() => setNPCAnimation("static"), 2000);
                  dispatch(updateAiCharacterHealth(result.damage));
                } else {
                  setPlayerAnimation("damage");
                  setTimeout(() => setPlayerAnimation("static"), 2000);
                  dispatch(updatePlayableCharacterHealth(result.damage));
                }

                await wait(1000);
                dispatch(setAnnouncerMessage(`${receiver.name} felt that!`));
              }

              turn === 0
                ? dispatch(updateAiCharacterHealth(result.damage))
                : dispatch(updatePlayableCharacterHealth(result.damage));

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
          const selectedMove = selectCharacterMoveset?.find(
            (move) => move.name === selectedMoveName && move.special !== true
          );

          if (!selectedMove) {
            dispatch(
              setAnnouncerMessage(
                `${selectedCharacter.name} has no signature move selected!`
              )
            );
            break;
          }

          const kiCost = selectedMove.kiCost;
          const result = calculateMoveDamage(
            selectedCharacter,
            aiCharacter,
            selectedMove
          );

          if (selectedCharacter.currentEnergy < kiCost) {
            dispatch(
              setAnnouncerMessage(
                `${selectedCharacter.name} doesn't have enough energy!`
              )
            );
            break;
          }

          (async () => {
            dispatch(setInSequence(true));

            // Deduct energy
            turn === 0
              ? dispatch(
                  updatePlayableCharacterEnergy(
                    selectedCharacter.currentEnergy - kiCost
                  )
                )
              : dispatch(
                  updateAiCharacterEnergy(aiCharacter.currentEnergy - kiCost)
                );

            // Attack animation
            if (turn === 0) {
              setPlayerAnimation("ki");
              setTimeout(() => setPlayerAnimation("static"), 1000);
            } else {
              setNPCAnimation("ki");
              setTimeout(() => setNPCAnimation("static"), 1000);
            }
            await wait(1000);

            // Show Missed text if missed
            if (result.missed) {
              await wait(200); // small delay
              if (turn === 0) setMissState({ player: true, npc: false });
              else setMissState({ player: false, npc: true });

              await wait(1000);
              setMissState({ player: false, npc: false });
            }

            // Announcer message
            await wait(500);
            dispatch(
              setAnnouncerMessage(
                getAnnouncerMessage(attacker.name, selectedMove.name, result)
              )
            );

            // Apply damage only if hit
            if (!result.missed) {
              await wait(500); // small delay after announcer
              if (turn === 0) {
                setNPCAnimation("damage");
                setTimeout(() => setNPCAnimation("static"), 2000);
                dispatch(updateAiCharacterHealth(result.damage));
              } else {
                setPlayerAnimation("damage");
                setTimeout(() => setPlayerAnimation("static"), 2000);
                dispatch(updatePlayableCharacterHealth(result.damage));
              }

              await wait(1000);
              dispatch(setAnnouncerMessage(`${receiver.name} felt that!`));
            }

            await wait(2000);

            // Handoff turn
            dispatch(setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`));
            await wait(1500);

            dispatch(setTurn());
            dispatch(setInSequence(false));
          })();

          break;
        }

        case "specialMove": {
          const selectedMove = selectedCharacter.moveset.find(
            (move) => move.special === true
          );

          if (!selectedMove) break; // No special move available

          const kiCost = selectedMove.kiCost;
          const result = calculateMoveDamage(
            selectedCharacter,
            aiCharacter,
            selectedMove
          );

          if (selectedCharacter.currentEnergy < kiCost) {
            dispatch(
              setAnnouncerMessage(
                `${selectedCharacter.name} doesn't have enough energy!`
              )
            );
            break;
          }

          (async () => {
            dispatch(setInSequence(true));

            // Deduct energy
            turn === 0
              ? dispatch(
                  updatePlayableCharacterEnergy(
                    selectedCharacter.currentEnergy - kiCost
                  )
                )
              : dispatch(
                  updateAiCharacterEnergy(aiCharacter.currentEnergy - kiCost)
                );

            // Attack animation
            if (turn === 0) {
              setPlayerAnimation("ki");
              setTimeout(() => setPlayerAnimation("static"), 1000);
            } else {
              setNPCAnimation("ki");
              setTimeout(() => setNPCAnimation("static"), 1000);
            }
            await wait(1000);

            // Show Missed text if missed
            if (result.missed) {
              await wait(200); // small delay
              if (turn === 0) setMissState({ player: true, npc: false });
              else setMissState({ player: false, npc: true });

              await wait(1000);
              setMissState({ player: false, npc: false });
            }

            // Announcer message
            await wait(500);
            dispatch(
              setAnnouncerMessage(
                getAnnouncerMessage(attacker.name, selectedMove.name, result)
              )
            );

            // Apply damage only if hit
            if (!result.missed) {
              await wait(500); // small delay after announcer
              if (turn === 0) {
                setNPCAnimation("damage");
                setTimeout(() => setNPCAnimation("static"), 2000);
                dispatch(updateAiCharacterHealth(result.damage));
              } else {
                setPlayerAnimation("damage");
                setTimeout(() => setPlayerAnimation("static"), 2000);
                dispatch(updatePlayableCharacterHealth(result.damage));
              }

              await wait(1000);
              dispatch(setAnnouncerMessage(`${receiver.name} felt that!`));
            }

            await wait(2000);

            // Handoff turn
            dispatch(setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`));
            await wait(1500);

            dispatch(setTurn());
            dispatch(setInSequence(false));
          })();

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
    missState,
  };
};
