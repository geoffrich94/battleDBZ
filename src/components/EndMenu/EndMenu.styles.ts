import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.h1`
  color: white;
  font-size: 100px;
`;

export const StartButton = styled.button`
  border: 4px solid orangered;
  outline: none;
  padding: 15px;
  font-size: 18px;
  width: 200px;
  cursor: pointer;
  border-radius: 50px;
  color: white;
  background-color: #202020;

  &:hover {
    background-color: orangered;
  }
`;
