import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledLayout = styled.div`
  @media screen and (max-width : 1920px) {
    width : 1920px;
    height : 100vh;
  }

  @media screen and (max-width : 1200px) {
    width : 1200px;
    height : 100vh;
  }

  @media screen and (max-width : 800px) {
    width : 800px;
    height : 600px;
  }

  @media screen and (max-width : 420px) {
    width : 420px;
    height : 100vh;
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