import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/index";
const StyledPage = styled.div`
  width : 100%;
  height : 100%;
`;

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <StyledPage>
      <Button name="Go Back" handleOnClick={() => {
        navigate(-1)
      }} />
    </StyledPage>
  )
}

export { MainPage } 