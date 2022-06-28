import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface IProps {
  value: number | string;
  handleOnChange: Dispatch<SetStateAction<number | string>>;
  placeHolder?: string;
}

const StyledInput = styled.input`
  width : 100%;
  padding : 3px 5px;
  border : none;
  &:focus {
    outline: none;
  }
`;

const Input: React.FC<IProps> = (props) => {

  const {
    value,
    handleOnChange,
    placeHolder = "",
  } = props;

  return (
    <StyledInput
      value={value}
      onChange={(e) => {
        handleOnChange(e.target.value)
      }}
      placeholder={placeHolder}
    />
  )
}

export { Input }