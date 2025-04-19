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
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr; /* Automatically adds rows as needed */

  & > :first-child {
    grid-column-start: 1;
    grid-column-end: 3;
  }
`;

export const Option = styled.button`
  transform: rotate(2deg);
  height: 100%;
  width: 100%;
  display: flex;
  border: 5px solid orangered;

  background-color: #202020;

  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;

  cursor: pointer;

  &:enabled:hover::before {
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

  &:disabled {
    cursor: not-allowed; /* Prevents the button from interacting */
  }

  @media ${devices.laptop} {
    font-size: 18px;
  }
`;
