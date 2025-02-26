import styled from "styled-components";
import { devices } from "theme";

export const Container = styled.div`
  transform: rotate(3deg);

  height: 100%;
  padding: 25px;
  /* border-radius: 10px; */
  box-sizing: border-box;

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid orangered;
  background-color: #202020;
`;

export const Message = styled.div`
  text-align: center;
  font-size: 16px;

  @media ${devices.laptop} {
    font-size: 20px;
  }
`;

export const Border = styled.div`
  transform: rotate(-3deg);
  background-color: orangered;
  height: 75%;
  width: 100%;
`