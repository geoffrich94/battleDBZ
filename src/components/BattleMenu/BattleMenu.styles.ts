import styled from "styled-components";

export const Border = styled.div`
  transform: rotate(-2deg);
  background-color: orangered;
  height: 75%;
  width: 100%;
`;

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
  }
`;

export const Option = styled.div`
  transform: rotate(2deg);
  height: 90%;
  display: flex;
  border: 5px solid orangered;

  background-color: #202020;

  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;

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
`;
