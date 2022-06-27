import React from "react";
import styled from "styled-components";

interface IProps {
  name: string;
  handleOnClick: () => void;
}

const StyledButton = styled.button`
  border : none;
  background-color : transparent;
  padding : 15px 20px;
`;

const Button: React.FC<IProps> = (props) => {

  const {
    name,
    handleOnClick
  } = props;

  return (
    <StyledButton onClick={() => handleOnClick()}>
      <span>{name}</span>
    </StyledButton>
  )
}

export { Button }