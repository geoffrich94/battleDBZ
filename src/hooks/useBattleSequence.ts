import {
  wait,
  ki,
  senzu,
  attack,
  BattleSequence,
  Character,
  calculateMoveDamage,
} from "shared";
import { useEffect, useState } from "react";

export const useBattleSequence = (
  sequence: BattleSequence,
  selectedCharacter: Character,
  aiCharacter: Character
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
  // Set the max energy of the playable character to the character states max energy
  const [playableCharacterEnergy, setPlayableCharacterEnergy] = useState(
    selectedCharacter.maxEnergy
  );
  const [announcerMessage, setAnnouncerMessage] = useState("");
  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [npcAnimation, setNPCAnimation] = useState("static");

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

            turn === 0
              ? setPlayerAnimation("attack")
              : setNPCAnimation("attack");
            await wait(100);

            turn === 0
              ? setNPCAnimation("damage")
              : setPlayerAnimation("damage");
            await wait(500);

            turn === 0
              ? setNPCAnimation("damage")
              : setPlayerAnimation("damage");
            await wait(750);

            turn === 0
              ? setNPCAnimation("static")
              : setPlayerAnimation("static");
            setAnnouncerMessage(`${receiver.name} felt that!`);
            turn === 0
              ? setNonPlayableCharacterHealth((h) =>
                  h - damage > 0 ? h - damage : 0
                )
              : setPlayableCharacterHealth((h) =>
                  h - damage > 0 ? h - damage : 0
                );
            await wait(2000);

            setAnnouncerMessage(`Now its ${receiver.name}'s turn!`);
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
            setAnnouncerMessage(`${attacker.name} has used a ki blast`);
            await wait(1000);

            turn === 0 ? setPlayerAnimation("ki") : setNPCAnimation("ki");
            await wait(1000);

            turn === 0
              ? setPlayerAnimation("static")
              : setNPCAnimation("static");
            await wait(500);

            turn === 0
              ? setNPCAnimation("damage")
              : setPlayerAnimation("damage");
            await wait(750);

            turn === 0
              ? setNPCAnimation("static")
              : setPlayerAnimation("static");
            setAnnouncerMessage(`${receiver.name} doesn't know what hit them!`);
            turn === 0
              ? setNonPlayableCharacterHealth((h) =>
                  h - damage > 0 ? h - damage : 0
                )
              : setPlayableCharacterHealth((h) =>
                  h - damage > 0 ? h - damage : 0
                ); // We don't want a negative HP.
            await wait(2500);

            setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case "signatureMove": {
          // Get the first move in the selected character's moveset
          const selectedMove = selectedCharacter.moveset[0]; // First move in the moveset
          const kiCost = selectedMove.kiCost;

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

              // Set animation for the attack
              turn === 0 ? setPlayerAnimation("ki") : setNPCAnimation("ki");
              await wait(1000);

              // Set animation for damage
              turn === 0
                ? setPlayerAnimation("static")
                : setNPCAnimation("static");
              await wait(500);

              turn === 0
                ? setNPCAnimation("damage")
                : setPlayerAnimation("damage");
              await wait(750);

              turn === 0
                ? setNPCAnimation("static")
                : setPlayerAnimation("static");
              setAnnouncerMessage(
                `${selectedCharacter.name} landed the attack!`
              );

              // Apply damage to the opponent
              turn === 0
                ? setNonPlayableCharacterHealth((h) =>
                    h - damage > 0 ? h - damage : 0
                  )
                : setPlayableCharacterHealth((h) =>
                    h - damage > 0 ? h - damage : 0
                  );

              await wait(2500);

              setAnnouncerMessage(`Now it's ${selectedCharacter.name}'s turn!`);
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
          const selectedMove = selectedCharacter.moveset[1];
          console.log(selectedMove);
          const kiCost = selectedCharacter.moveset[1].kiCost;

          // Check to see if the selected character has enough energy to make the move
          if (playableCharacterEnergy >= kiCost) {
            (async () => {
              // Set the state so that the battle sequence is currently in sequence/progess
              setInSequence(true);
              // Set the suitable announcer message
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

              // Set animation for the attack
              turn === 0 ? setPlayerAnimation("ki") : setNPCAnimation("ki");
              await wait(1000);

              // Set animation for damage
              turn === 0
                ? setPlayerAnimation("static")
                : setNPCAnimation("static");
              await wait(500);

              turn === 0
                ? setNPCAnimation("damage")
                : setPlayerAnimation("damage");
              await wait(750);

              turn === 0
                ? setNPCAnimation("static")
                : setPlayerAnimation("static");
              setAnnouncerMessage(
                `${selectedCharacter.name} landed the attack!`
              );

              // Apply damage to the opponent
              turn === 0
                ? setNonPlayableCharacterHealth((h) =>
                    h - damage > 0 ? h - damage : 0
                  )
                : setPlayableCharacterHealth((h) =>
                    h - damage > 0 ? h - damage : 0
                  );

              await wait(2500);

              setAnnouncerMessage(`Now it's ${selectedCharacter.name}'s turn!`);
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

        case "senzu": {
          const recovered = senzu(attacker);

          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has chosen to heal!`);
            await wait(1000);

            turn === 0 ? setPlayerAnimation("magic") : setNPCAnimation("magic");
            await wait(1000);

            turn === 0
              ? setPlayerAnimation("static")
              : setNPCAnimation("static");
            await wait(500);

            setAnnouncerMessage(`${attacker.name} has recovered health.`);
            turn === 0
              ? setPlayableCharacterHealth((h) =>
                  h + recovered <= attacker.maxHealth
                    ? h + recovered
                    : attacker.maxHealth
                )
              : setNonPlayableCharacterHealth((h) =>
                  h + recovered <= attacker.maxHealth
                    ? h + recovered
                    : attacker.maxHealth
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
  }, [selectedCharacter, aiCharacter, sequence]);

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
