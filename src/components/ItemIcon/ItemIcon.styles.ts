import styled from "styled-components";

export const Border = styled.div`
  display: flex;
  position: relative;
  transform: rotate(-5deg);
  background-color: orangered;
  height: 60px;
  width: 60px;
`

export const Container = styled.button`
  position: relative;

  transform: rotate(5deg);
  height: 100%;
  width: 100%;
  display: flex;
  border: 5px solid orangered;

  background-color: #202020;

  align-items: center;
  justify-content: center;
  color: white;

  cursor: pointer;

  & img {
    width: 50%;
    height: 50%;
  }

  & span {
    position: absolute;
    top: 2px;
    right: 7px;

    font-size: 16px;
    font-weight: bold;
  }
`