import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/index";
import { PATHNAME } from "src/constants/index";
const StyledLoginPage = styled.div`

`;

const LoginPage: React.FC = () => {

  const navigate = useNavigate();

  return (
    <StyledLoginPage>
      <Button name="Go To GAME" handleOnClick={() => {
        navigate(PATHNAME.GAME);
      }} />
      <Button name="Go To NFT" handleOnClick={() => {
        navigate(PATHNAME.NFT);
      }} />
    </StyledLoginPage>
  )
}

export { LoginPage }