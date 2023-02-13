import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 5px;
  padding: 5px;
  margin: 10px 0px;
  align-items: center;
`;

export const Label = styled.div`
  font-size: 15px;
  font-weight: bold;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 50px;
  color: #FFCC00;
`;

export const Max = styled.div`
  height: 15px;
  overflow: hidden;
  box-sizing: border-box;
  flex: 1;
  background-color: lightgray;
  border: 3px ridge #FFCC00;
`;

export const Value = styled.div<{ width: number }>`
  height: 100%;
  background-color: lawngreen;
  transition: 0.35s;
  width: ${({ width }) => width}%;
`;