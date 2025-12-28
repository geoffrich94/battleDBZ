import styled from "styled-components";
import { devices } from "theme";

export const Logo = styled.img`
  position: absolute;
  z-index: 99;
  left: 100px;
  top: 50px;
  width: 250px;

  @media ${devices.laptop} {
    width: 300px;
  }
`;

export const MenuContainer = styled.div`
  color: white;
  position: absolute;
  z-index: 99;
  left: 100px;
  bottom: 150px;
`;

export const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  list-style: none;
  margin: 0;
`
export const ListOption = styled.li`
  font-size: 18px;
  cursor: pointer;
  position: relative;

  display: flex;
  align-items: center;

  /* default color */
  color: #fff;

  /* animate color change */
  transition: color 1s ease;

  &:hover {
    color: #000;
  }

  &:hover::before {
    content: "";
    width: 35px;
    height: 35px;
    background: url("${process.env.PUBLIC_URL}/assets/dragonball.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: absolute;
    left: -50px;
    top: 50%;
    transform: translateY(-50%);
  }
`;


export const DescriptionContainer =  styled.div<{ $fading: boolean }>`
  display: flex;
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-bottom: 50px;
  z-index: 98;
  border-top: 5px solid #202020;
  border-bottom: 5px solid #202020;
  background-color: #ff4013;
  padding: 10px 140px;
  font-size: 18px;
  color: white;
  opacity: ${({ $fading }) => ($fading ? 0 : 1)};
  transform: ${({ $fading }) =>
    $fading ? "translateY(6px)" : "translateY(0)"};
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

