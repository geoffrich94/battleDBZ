import styled from "styled-components";
import { devices } from "theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 99;
  left: 100px;
  bottom: 200px;
`;

export const Logo = styled.img`
  width: 400px;
  @media ${devices.laptop} {
    width: 500px;
  }
`;

export const CompanyLogo = styled.img`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 200px;
  @media ${devices.laptop} {
    width: 300px;
  }
`;

export const StartButton = styled.button`
  z-index: 99;
  left: 100px;
  bottom: 150px;

  border: none;
  outline: none;
  padding: 15px;
  font-size: 18px;
  width: auto;
  cursor: pointer;
  border-radius: 50px;
  color: white;
  background-color: transparent;
  font-family: "Montserrat", sans-serif;
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
