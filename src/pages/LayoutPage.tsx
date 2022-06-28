import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "src/components/index";
import { PATHNAME } from "src/constants/index";

const StyledLayoutPage = styled.div`
  display: flex;
  & > div.select-size {
    display: grid;
    align-content : center;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr;
    align-content: center;
    grid-gap: 10px;
    width : 60%;
    height : 100%;
    padding : 10px;
   
    & > div.screen {
      display: flex;
      flex-direction: column;
      text-align: center;
      &:before {
        content : " ";
        padding : 20px;
        height : 60px;
        border : 1px solid #AAA;
        border-radius : 5px;
      }
    }
    
  }
  & > div.input-size {
    width : 40%;
    height : 100%;
    border-left : 1px solid #AAA;
  }
  @media screen and (max-width : 800px) {
      height : 600px;
    }
`;

const LayoutPage: React.FC = () => {

  const navigate = useNavigate();

  return (
    <StyledLayoutPage>
      <div className="select-size">
        <div className="screen">
          <span>1000 by 1000</span>
        </div>
        <div className="screen">
          <span>1500 by 1500</span>
        </div>
        <div className="screen">
          <span>2000 by 2000</span>
        </div>
      </div>
      <div className="input-size">
        <div>
          <Input placeHolder={"Row Pixel"} value={""} handleOnChange={() => { }} />
        </div>
        <div>
          <Input placeHolder={"Col Pixel"} value={""} handleOnChange={() => { }} />
        </div>
        <div>
          <Button
            name="확인"
            handleOnClick={() => {
              navigate(PATHNAME.NFT)
            }} />
        </div>
      </div>
    </StyledLayoutPage>
  )
}

export { LayoutPage }