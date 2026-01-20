import React from "react";
import * as S from "./CooldownSkillIcon.styles";

interface CooldownSkillIconProps {
  turnsRemaining: number;
  maxTurns: number;
}

export const CooldownSkillIcon: React.FC<CooldownSkillIconProps> = ({
  turnsRemaining,
  maxTurns,
}) => {
  const percent = turnsRemaining > 0 ? (turnsRemaining / maxTurns) * 100 : 0;

  return (
    <S.Skill percent={percent} />
  );
};
