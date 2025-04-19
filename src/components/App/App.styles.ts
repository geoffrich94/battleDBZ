import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }
`;

export default GlobalStyle;