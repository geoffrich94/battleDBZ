import { useState, useEffect } from "react";

export const useAIOpponent = turn => {

  const [aiChoice, setAIChoice] = useState('');

  useEffect(() => {
    if (turn === 1) {
      const options = ['attack', 'ki', 'senzu'];
      return setAIChoice(options[Math.floor(Math.random() * options.length)]);
    }
    setAIChoice('');
  }, [turn]);

  return aiChoice;

};