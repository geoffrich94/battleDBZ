import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Text = styled.h1`
  color: white;
  font-size: 5rem;
  text-align: center;
`;

export const StartButton = styled.button`
  align-self: center;
  border: none;
  outline: none;
  padding: 15px;
  font-size: 2rem;
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

export const Container = styled.div`

  transform: skewX(20deg);
  width: 50%;
  height: 25%;
  border: 4px ridge #ffcc00;
  box-shadow: inset 0 0 15px orangered;

  background-color: black;
  color: white;
  /* 
  padding: 10px 20px; */
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const ProfilePicture = styled.div<{ profilePicture: string }>`
  width: 22%;
  position: relative;
  left 30px;
  background: url(${({ profilePicture }) =>
    `${process.env.PUBLIC_URL}${profilePicture}`});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  transform: skewX(-20deg);
`;

export const InnerContainer = styled.div`
  transform: skewX(-20deg);
  padding: 0px 5px 0px 20px;
  width: 55%;
  display: flex;
  flex-direction: column;
`;

export const Info = styled.div`
  background: orangered;
  padding: 10px;
  transform: skewX(20deg);
  width: 100%;
`;

export const InfoInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  transform: skewX(-20deg);
`;

export const Heading = styled.div`
  font-size: 2rem;
`;

export const Health = styled.div``;
