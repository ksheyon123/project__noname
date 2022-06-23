import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledLayout = styled.div`
  @media screen and (max-width : 1920px) {
    width : 1920px;
    height : 100vh;
    background-color: white;
  }

  @media screen and (max-width : 1200px) {
    width : 1200px;
    height : 100vh;
    background-color: pink;
  }

  @media screen and (max-width : 800px) {
    width : 800px;
    height : 628px;
    background-color: blue;
  }

  @media screen and (max-width : 420px) {
    width : 420px;
    height : 100vh;
    background-color: red;
  }
`;

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StyledLayout>
      {children}
    </StyledLayout>
  )
}

export { Layout }