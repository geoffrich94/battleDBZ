import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  height: 100%;

  gap: 10px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;

  & > :first-child {
    grid-column-start: 1;
    grid-column-end: 3;
  };
`;

export const Option = styled.div`
  display: flex;
  border-radius: 5px;
  border: 1px solid black;

  background-color: #821400;

  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;

  cursor: pointer;

  &:hover {
    background-color: #fd9401;
  };
`;

