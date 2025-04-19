import styled, { keyframes } from "styled-components";
import { devices } from "theme";

// Keyframe to animate the angle of the conic-gradient
const glow = keyframes`
  0% {
    --angle: 0deg;
  }
  100% {
    --angle: 360deg;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content; 
`;


export const Container = styled.div`
  position: relative; /* This ensures proper stacking context for content */
  transform: skewX(20deg);
  width: 300px;
  height: 75px;
  border: 4px ridge #ffcc00;
  box-shadow: inset 0 0 15px orangered;
  background-color: #202020;
  color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  overflow: visible;
  padding: 0; 
  z-index: 1; /* Ensures the content stays above the background */

  @media ${devices.laptop} {
    width: 600px;
    height: 125px;
  }
`;

// New background wrapper to separate the background from the content stack
export const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Ensures the background stays behind the content */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AnimatedBackground = styled.div`
  position: absolute;
  width: calc(100% + 5px);
  height: calc(100% + 5px);
  z-index: 0; /* Make sure the animated background stays behind */
  padding: 5px;
  
  &.charge {
    animation: ${glow} 1s linear infinite;
    background-image: conic-gradient(from var(--angle), transparent 60%, #00f 80%, transparent 100%);
    filter: blur(0.25rem); 
    transform: skewX(20deg);
  }
`;

export const InnerContent = styled.div`
  position: relative; /* This keeps the content above the background */
  z-index: 2; /* Ensures content stays above */
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const ProfilePicture = styled.div<{ profilePicture: string }>`
  width: 20%;
  background: url(${({ profilePicture }) =>
    `${
      process.env.PUBLIC_URL || ""
    }/assets/${profilePicture}-profile-pic.png`});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  transform: skewX(-20deg);
`;

export const InnerContainer = styled.div`
  transform: skewX(-20deg);
  padding: 0px 5px 0px 20px;
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const Info = styled.div`
  background: orangered;
  padding: 5px 10px;
  transform: skewX(20deg);
  display: none;

  @media ${devices.laptop} {
    display: block;
  }
`;

export const InfoInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  transform: skewX(-20deg);
`;

export const Heading = styled.div`
  font-size: 16px;
`;

export const Health = styled.div``;
