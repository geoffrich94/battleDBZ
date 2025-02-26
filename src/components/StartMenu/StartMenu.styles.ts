import styled from "styled-components";
import { devices } from "theme";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const Logo = styled.div`
  background: url("${process.env.PUBLIC_URL}/assets/logo.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 500px;
  height: 220px;
  z-index: 99;

  @media ${devices.laptop} {
    width: 800px;
    height: 300px;
  }
`;

export const StartButton = styled.button`
  border: none;
  outline: none;
  padding: 15px;
  font-size: 18px;
  width: auto;
  cursor: pointer;
  border-radius: 50px;
  color: white;
  background-color: transparent;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  display: inline-block;
  animation: scaleAnimation 2s ease-in-out infinite,
    glowAnimation 3s ease-in-out infinite alternate;

  &:hover {
    animation: scaleAnimation 1s ease-in-out infinite,
      glowAnimation 2s ease-in-out infinite alternate;
  }

  @keyframes scaleAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2); // Increase the scale
    }
    100% {
      transform: scale(1); // Decrease back to original scale
    }
  }

  @keyframes glowAnimation {
    0% {
      text-shadow: 0 0 5px yellow, 0 0 10px yellow, 0 0 15px yellow,
        0 0 20px orange, 0 0 25px orange, 0 0 30px orange, 0 0 35px orange;
    }
    50% {
      text-shadow: 0 0 5px white, 0 0 10px white, 0 0 15px white,
        0 0 20px yellow, 0 0 25px yellow, 0 0 30px yellow, 0 0 35px yellow;
    }
    100% {
      text-shadow: 0 0 5px yellow, 0 0 10px yellow, 0 0 15px yellow,
        0 0 20px orange, 0 0 25px orange, 0 0 30px orange, 0 0 35px orange;
    }
  }
`;
