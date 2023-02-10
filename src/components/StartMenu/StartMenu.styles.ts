import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
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