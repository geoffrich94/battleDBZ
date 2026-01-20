import styled from "styled-components";

export const Skill = styled.div<{ percent: number }>`
  position:absolute;
  right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f5f5f5;
  border: 2px solid #ffffff;
  box-shadow:
    inset 0 0 0 2px #dcdcdc,
    0 2px 4px rgba(0, 0, 0, 0.4);

  overflow: hidden;

  /* Stopwatch top button */
  &::after {
    content: "";
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 6px;
    background: #ffffff;
    border-radius: 3px 3px 0 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  }

  /* Cooldown overlay */
  &::before {
    content: "";
    position: absolute;
    inset: 2px;
    border-radius: 50%;
    background: conic-gradient(
      orangered ${({ percent }) => percent}%,
      rgba(255, 255, 255, 0.2) ${({ percent }) => percent}%
    );
    z-index: 1;
  }
`;

