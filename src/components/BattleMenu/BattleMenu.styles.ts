import styled from "styled-components";
import { devices } from "theme";

export const Container = styled.div`
  position: relative;
  height: 100%;
`;

export const Border = styled.div`
  transform: rotate(-2deg);
  background-color: orangered;
  height: 75%;
  width: 100%;
`;

export const BattleMenuContainer = styled.div`
  box-sizing: border-box;
  height: 100%;

  gap: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;

  & > :first-child:nth-last-child(odd) {
    grid-column: span 2;
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

export const IconContainer = styled.div`
  display: flex;
  position: absolute;
  top: -50px;
  font-size: 22px;
  font-weight: bold;
  color: white;

  & div {
    display: flex;
    align-items: center;
  }
`;

export const ItemIconContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  column-gap: 20px;
  position: absolute;
  top: -90px;
`;
