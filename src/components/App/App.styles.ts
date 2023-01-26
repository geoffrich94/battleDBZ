import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(
    90deg,
    rgba(24, 161, 203, 1) 0%,
    rgba(255, 255, 255, 1) 35%,
    rgba(255, 255, 255, 1) 65%,
    rgba(253, 172, 0, 1) 100%
  );
  /* width: 100vw; */
  height: 100vh;
  padding: 25px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;