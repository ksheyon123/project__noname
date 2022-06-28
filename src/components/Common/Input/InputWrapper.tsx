import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Input } from "./Input";

interface IProps {
  value: string | number;
  handleOnChange: Dispatch<SetStateAction<number | string>>;
  placeHolder?: string;
  width?: number;
}

const StyledInputWrapper = styled.div<{ width: number; }>`
  border : 1px solid #AAA;
  border-radius: 4px;
  width : ${props => props.width}px;
`;

const InputWrapper: React.FC<IProps> = (props) => {

  const {
    value,
    handleOnChange,
    placeHolder,
    width = 120,
  } = props;

  return (
    <StyledInputWrapper width={width}>
      <Input placeHolder={placeHolder} value={value} handleOnChange={handleOnChange} />
    </StyledInputWrapper>
  )
}

export { InputWrapper }