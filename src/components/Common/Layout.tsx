import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledLayout = styled.div`
  width : 600px;
  height : 778px;
`;

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StyledLayout>
      {children}
    </StyledLayout>
  )
}

export { Layout }