import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  border-radius: 5px;
  gap: 5px;
  padding: 5px;
  align-items: center;
  background-color: white;
`;

export const Label = styled.div`
  font-size: 32px;
  font-weight: bold;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 50px;
  color: black;
`;

export const Max = styled.div`
  height: 35px;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
  flex: 1;
  background-color: lightgray;
`;

export const Value = styled.div<{ width: number }>`
  height: 100%;
  background-color: #0566fa;
  transition: 0.35s;
  width: ${({ width }) => width}%;
`;