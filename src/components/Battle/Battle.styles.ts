import styled, { keyframes } from "styled-components";
// import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
import { devices } from "theme";

export const Container = styled.div`
 height: 100%;
 width: 100%^;
 padding 10px 30px;
 display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;

const flash = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const glow = keyframes`
  0% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(10); 
  }
  50% {
    filter: brightness(1); 
  }
  75% {
    filter: brightness(10); 
  }
  100% {
    filter: brightness(1);
  }
`;

export const Logo = styled.div`
  position: absolute;
  background: url("${process.env.PUBLIC_URL}/assets/logo.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 125px;
  height: 50px;
  z-index: 99;
  left: 20px;

  @media ${devices.laptop} {
    width: 255px;
    height: 100px;
  }
`;

export const Summary = styled.div`
  display: flex;
  align-items: flex - end;
  justify-content: flex - start;
`;

export const NonPlayableCharacter = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;

  & ${Summary} {
    align-items: flex-start;
    justify-content: flex-end;
  }
`;

export const PlayableCharacter = styled.div`
  position: relative;
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`;

export const TurnTag = styled.div`
  position: absolute;
  top: -10px;
  right: 10px;

  background-color: #2ecc71; /* green */
  color: #102b18;

  border: 2px solid #1e8449;
  text-shadow: 0 1px 0 rgba(255,255,255,0.3);


  padding: 6px 12px;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;

  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

export const HUD = styled.div`
  gap: 25px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const HUDChild = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  height: 100px;

  @media ${devices.laptop} {
    height: 200px;
  }
`;

export const GameHeader = styled.div`
  font-size: 48px;
  color: #fdac00;
  text-shadow: 0px 0px 5px #7f0000;
  font-family: "Press Start 2P", cursive;
`;

export const GameImages = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const Characters = styled.div`
  width: 100%;
  text-align: center;

  & ${GameImages} img {
    max-height: 25vh;
    min-height: 100px;
  }

  @media ${devices.laptop} {
    & ${GameImages} img {
      max-height: 25vh;
      min-height: 150px;
    }
  }
`;

export const PlayerSprite = styled.div`
  display: flex;

  & img.static {
    transform: translateX(0px);
    transform: translateY(0px);
    transition: 0.5s;
  }
  & img.attack {
    transition: 0.1s;
    transform: translateX(100px);
  }
  & img.ki {
    animation: ${glow} 0.5s linear infinite;
  }
  & img.damage {
    opacity: 1;
    animation: ${flash} 0.3s 0.3s infinite;
  }
`;

export const NPCSprite = styled.div`
  display: flex;

  & img {
    transform: scaleX(-1);
    transition: 0.5s;
  }

  & img.static {
    transform: scaleX(-1) translateX(0px) translateY(0px);
    transition: 0.5s;
  }

  & img.attack {
    transform: scaleX(-1) translateX(100px) translateY(0px);
    transition: 0.1s;
  }
  & img.damage {
    transform: scaleX(-1) translateX(0px) translateY(0px);
    animation: ${flash} 0.3s infinite;
  }
`;

export const AttackStatus = styled.span<{ hasMissed: boolean }>`

  margin: 0px 20px;
  transform: ${({ hasMissed }) => (hasMissed ? "translateY(0)" : "translateY(6px)")};

  opacity: ${({ hasMissed }) => (hasMissed ? 1 : 0)};
  visibility: ${({ hasMissed }) => (hasMissed ? "visible" : "hidden")};

  transition:
    opacity 0.35s ease,
    transform 0.35s ease,
    visibility 0.35s ease;

  pointer-events: none;

  font-size: 25px;
  font-weight: bold;
  color: white;
`;

