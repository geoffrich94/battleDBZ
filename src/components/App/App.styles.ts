import styled from 'styled-components';

export const Container = styled.div`
  background:linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("/assets/bg.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  /* width: 100vw; */
  height: 100vh;
  padding: 25px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const Logo = styled.div`
  position: absolute;
  background: url("/assets/logo.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 255px;
  height: 100px;
  z-index: 99;
  left: 20px;
`