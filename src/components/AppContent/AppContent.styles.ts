import styled from "styled-components";

export const Container = styled.div<{
  backgroundUrl: string;
  gradient: string;
}>`
  background: ${(props) =>
    `${props.gradient}, url(${process.env.PUBLIC_URL}${props.backgroundUrl})`};
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100vh;
  /* padding: 25px; */
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;
