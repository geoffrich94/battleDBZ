import styled from 'styled-components'
import { devices } from "theme";

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

export const Button = styled.button`
  z-index: 1000;
  border: 4px solid orangered;
  outline: none;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 50px;
  color: white;
  background-color: #202020;

  &:hover {
    background-color: orangered;
  }

  @media ${devices.laptop} {
    font-size: 18px;
    padding: 15px;
    width: 200px;
  }
`

export const Heading = styled.h1`
  text-align: center;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  font-weight: bold;
  color: red;
  text-shadow:
    -1px -1px 0 white,  /* Thin white border */
     1px -1px 0 white,
    -1px  1px 0 white,
     1px  1px 0 white,
    -3px -3px 0 black,  /* Thicker black border */
     3px -3px 0 black,
    -3px  3px 0 black,
     3px  3px 0 black;
`

export const ImgContainter = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: space-around;
  box-sizing: border-box;
`

export const StyledCharacterImage = styled.img`
  position: relative;
  bottom: 0px;
  width: 40%;
  height: 50%;

  @media ${devices.laptop} {
    width: 35%;
    height: 40%;
  }

  &:first-child {
    left: 0; 
  }

  &:last-child {
    right: 0; 
  }
`;

export const CharacterNameContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: absolute;
  bottom: 30%;
  z-index: 98;
  border-top: 5px solid #202020;
  border-bottom: 5px solid #202020;
  background-color: orangered;
  padding: 10px;
`

export const CharacterName = styled.h1`
  font-family: "Arial Black";
  font-size: 20px;
  color: white;
  margin: 0px;
  letter-spacing: 5px;

  @media ${devices.laptop} {
    width: auto;
    font-size: 60px;
    text-shadow:
      -1px -1px 0 white,  /* Thin white border */
      1px -1px 0 white,
      -1px  1px 0 white,
      1px  1px 0 white,
      -5px -5px 0 black,  /* Thicker black border */
      5px -5px 0 black,
      -5px  5px 0 black,
      5px  5px 0 black;
    }
`

export const VersusLogo = styled.img`
  position: absolute;
  z-index: 99;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 15%;

  @media ${devices.laptop} {
    width: auto;
  }
`