import styled from "styled-components";
import { devices } from "theme/breakpoints";

export const Border = styled.div`
  transform: rotate(-2deg);
  background-color: orangered;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Option = styled.div`
  transform: rotate(2deg);
  height: 300px;
  width: 350px;
  border: 5px solid orangered;

  background-color: #202020;
  display: flex;
  padding: 50px;

  color: white;
  font-size: 14px;

  @media ${devices.laptop} {
    font-size: 18px;
  }
`;

export const Container = styled.div`
  transform: rotate(-2deg);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

export const Logo = styled.img`
  width: 125px;
  margin: 0px auto 20px;
  @media ${devices.laptop} {
    width: 175px;
  }
`;

export const Title = styled.span`
  text-align: center;
  margin-bottom: 8px;
  font-size: 14px;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: block;
  font-size: 12px;
  color: #9da3ae;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #3a404a;
  background: #23272f;
  color: #ffffff;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: orangered;
  }
`;

export const Button = styled.button`
  padding: 12px;
  background: orangered;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 18px;
  transition:
    background-color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out,
    transform 0.3s ease;

  &:hover {
    background-color: #eaba12;
  }
`;
