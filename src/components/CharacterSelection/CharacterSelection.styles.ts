import styled from "styled-components";
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

export const Heading = styled.h1`
  text-align: center;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  font-weight: bold;
  color: red;
  text-shadow: -1px -1px 0 white, /* Thin white border */ 1px -1px 0 white,
    -1px 1px 0 white, 1px 1px 0 white, -3px -3px 0 black,
    /* Thicker black border */ 3px -3px 0 black, -3px 3px 0 black,
    3px 3px 0 black;
`;

export const ImgContainter = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: space-around;
  box-sizing: border-box;
`;

export const StyledCharacterImage = styled.img`
  position: relative;
  bottom: 0;
  width: 40%;
  height: 50%;

  @media ${devices.laptop} {
    width: 30%;
    height: 40%;
  }

  &:first-child {
    left: 0;
  }

  &:last-child {
    right: 0;
    transform: scaleX(-1);
  }
`;

export const CharacterNameContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-bottom: 275px;
  z-index: 98;
  border-top: 5px solid #202020;
  border-bottom: 5px solid #202020;
  background-color: orangered;
  padding: 5px;
`;

export const CharacterName = styled.h1`
  font-family: "Arial Black";
  font-size: 20px;
  color: white;
  margin: 0px;
  letter-spacing: 5px;

  @media ${devices.laptop} {
    width: auto;
    font-size: 40px;
    text-shadow: -1px -1px 0 white, /* Thin white border */ 1px -1px 0 white,
      -1px 1px 0 white, 1px 1px 0 white, -3px -3px 0 black,
      /* Thicker black border */ 3px -3px 0 black, -3px 3px 0 black,
      3px 3px 0 black;
  }
`;

export const VersusLogo = styled.img`
  position: absolute;
  z-index: 99;
  top: 10%;
  width: 20%;

  // @media ${devices.laptop} {
  //   width: auto;
  // }
`;

// Container
export const OptionsContainer = styled.div`
  position: absolute;
  bottom 0;
  display: flex;
  /* column-gap: 60px; */
  width: 100%;
  justify-content: space-between;
`;

export const OptionBorder = styled.div`
  flex-basis: 33.3%;
  background: #202020;
  position: relative;
  height: 100px;
  outline: none;
  border: none;
  z-index: 1;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20px;
  color: white;
  display: flex;

  &:first-child::after {
    content: "";
    position: absolute;
    top: 0px;
    right: -54px; /* 49 + border width */
    width: 0;
    height: 0;
    border-bottom: 110px solid transparent;
    border-left: 55px solid #202020;
    border-left-color: #202020;
    z-index: -1;
     pointer-events: none;
  }

  &:nth-child(2)::before {
    content: "";
    position: absolute;
    top: 0px;
    left: -54px;
    width: 0;
    height: 0;
    border-top: 110px solid transparent;
    border-right: 55px solid #202020;
    z-index: -1;
     pointer-events: none;
  }

  &:nth-child(2)::after {
    content: "";
    position: absolute;
    top: 0px;
    right: -54px;
    width: 0;
    height: 0;
    border-bottom: 110px solid transparent;
    border-left: 55px solid #202020;
    z-index: -1;
     pointer-events: none;

    &:hover {
      backgound: green;
    }
  }

  &:last-child::before {
    content: "";
    position: absolute;
    top: 0px;
    left: -54px;
    width: 0;
    height: 0;
    border-top: 110px solid transparent;
    border-right: 55px solid #202020;
    z-index: -1;
     pointer-events: none;

    /* Fake border */
    box-shadow: inset 5px 0 0 0 blue;
  }
`;

export const Option = styled.button`
  width: 100%;
  background: orangered;
  position: relative;
  height: 90%;
  align-self: center;
  cursor: pointer;
  outline: none;
  border: none;
  z-index: 99;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
  color: white;
  overflow-y: clip;

  ${({ disabled }) => disabled && `
    cursor: not-allowed;
  `}

  &:hover {
    background-color: #EABA12;

    &:first-child::after {
      border-left-color: #EABA12;
    }

    &:nth-child(2)::before {
      border-right-color: #EABA12;
    }

    &:nth-child(2)::after {
      border-left-color: #EABA12;
    }

    &:last-child::before {
      border-right-color: #EABA12;
    }
  }

  

  &:first-child::after {
    content: "";
    position: absolute;
    top: 0px;
    right: -54px; /* 49 + border width */
    width: 0;
    height: 0;
    border-bottom: 110px solid transparent;
    border-left: 55px solid #EABA12;
    border-left-color: #EABA12;
    z-index: -1;
     pointer-events: none;
  }

  &:nth-child(2)::before {
    content: "";
    position: absolute;
    top: 0px;
    left: -54px;
    width: 0;
    height: 0;
    border-top: 110px solid transparent;
    border-right: 55px solid #EABA12;
    z-index: -1;
     pointer-events: none;
  }

  &:nth-child(2)::after {
    content: "";
    position: absolute;
    top: 0px;
    right: -54px;
    width: 0;
    height: 0;
    border-bottom: 110px solid transparent;
    border-left: 55px solid #EABA12;
    z-index: -1;
     pointer-events: none;

    &:hover {
      backgound: green;
    }
  }

  &:last-child::before {
    content: "";
    position: absolute;
    top: 0px;
    left: -54px;
    width: 0;
    height: 0;
    border-top: 110px solid transparent;
    border-right: 55px solid orangered;
    z-index: -1;
     pointer-events: none;

    /* Fake border */
    box-shadow: inset 5px 0 0 0 blue;
  }
`;
