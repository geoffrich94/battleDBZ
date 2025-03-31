import styled from "styled-components";
import { devices } from "theme";

export const Border = styled.div`
  transform: rotate(-2deg);
  background-color: orangered;
  height: 75%;
  width: 100%;
`;

export const Container = styled.div<{ isHidden: boolean }>`
  box-sizing: border-box;
  height: 100%;

  gap: 10px;
  display: ${({ isHidden }) => (isHidden ? "none" : "grid")};
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;

  /* If there are an odd number of children, the first spans both columns */
  & > :first-child:nth-last-child(odd) {
    grid-column: span 2;
  }
`;

export const Option = styled.div`
  transform: rotate(2deg);
  height: 90%;
  display: flex;
  border: 5px solid orangered;

  background-color: #202020;

  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;

  cursor: pointer;

  &:hover:before {
    content: "";
    width: 35px;
    height: 35px;
    background: url("${process.env.PUBLIC_URL}/assets/dragonball.png");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    position: absolute;
    left: 10px;
  }

  @media ${devices.laptop} {
    font-size: 18px;
  }
`;
