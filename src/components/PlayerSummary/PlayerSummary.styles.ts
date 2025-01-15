import styled from "styled-components";

export const Container = styled.div<{ backgroundColor: string }>`
  transform: skewX(20deg);
  width: 500px;
  /* height: 150px; */
  border: 4px ridge #ffcc00;
  box-shadow: inset 0 0 15px orangered;

  background-color: ${({ backgroundColor }) => backgroundColor};
  color: white;
  /* 
  padding: 10px 20px; */
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const ProfilePicture = styled.div<{ profilePicture: string }>`
  width: 22%;
  background: url(${({ profilePicture }) =>
    `${process.env.PUBLIC_URL}${profilePicture}`});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  transform: skewX(-20deg);
`;

export const InnerContainer = styled.div`
  transform: skewX(-20deg);
  padding: 0px 5px 0px 20px;
  width: 70%;
`;

export const Info = styled.div`
  background: orangered;
  padding: 5px 10px;
  transform: skewX(20deg);
`;

export const InfoInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  transform: skewX(-20deg);
`;

export const Heading = styled.div`
  font-size: 16px;
`;

export const Health = styled.div``;
