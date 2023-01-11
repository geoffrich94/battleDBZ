import styled from "styled-components";

export const Container = styled.div<{ backgroundColor: string }>`
  width: 500px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0px 0px 3px black;

  background-color: ${({ backgroundColor }) => backgroundColor};
  color: white;

  padding: 25px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Heading = styled.div`
  font-size: 32px;
`;

export const Health = styled.div``