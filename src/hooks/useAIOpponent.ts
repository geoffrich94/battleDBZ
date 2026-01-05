import { useState, useEffect } from "react";

export const useAIOpponent = (turn: number, aiSenzuCount: number) => {

  const [aiChoice, setAIChoice] = useState('');

  useEffect(() => {
    if (turn === 1) {
      const options = ['attack', 'ki'];

      // Only add "senzu" if the AI has senzu beans left
      if (aiSenzuCount > 0) {
        options.push("senzu");
      }

      const randomChoice = options[Math.floor(Math.random() * options.length)];
      setAIChoice(randomChoice);
    } else {
      setAIChoice(''); // Clear choice when it's not AI's turn
    }
  }, [turn, aiSenzuCount]);

  return aiChoice;

};