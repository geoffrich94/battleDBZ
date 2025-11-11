import styled from 'styled-components';
import { devices } from "theme";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-bottom: 125px;
`
export const Border = styled.div`
  transform: rotate(-2deg);
  background-color: #202020;
`;

export const CharacterSelectionIcon = styled.button<{ profilePicture: string }>`
  transform: rotate(2deg);
  border: 5px solid #202020;
  background-color: orangered;
  box-shadow: inset 0 0 15px black;
  width: 75px;
  height: 75px;
  background-image: url(${({ profilePicture }) =>
    `${process.env.PUBLIC_URL}${profilePicture}`});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media ${devices.laptop} {
    width: 125px;
    height: 125px;
  }

  &:hover {
    cursor: pointer;
    background-color: #EABA12;
    box-shadow: inset 0 0 15px black, 0 0 50px #EABA12;
  }

  &:active {
    background-color: #EABA12;
    box-shadow: inset 0 0 15px black, 0 0 50px #EABA12;
  }
`