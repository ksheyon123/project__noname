import React from "react";
import styled from "styled-components";
import { Input } from "src/components/index";

const StyledCreatorPage = styled.div`
  width : 100%;
  height : 100%;
  & > div.wrap-tools {
    position: fixed;
    top : 0px;
    z-index: 9999;
    display: flex;
    align-items: center;
    width : 100%;
    height : 30px;
    background-color: white;
    & > div {
      display: flex;
    }
  }

  & > div.wrap-canvas {
    width : 100%;
    height : 100%;
  }
`;

const CreatorPage: React.FC = () => {
  return (
    <StyledCreatorPage>
      <div className="wrap-tools">
        <div >
          <Input placeHolder="Row Pixel" value="" handleOnChange={() => { }} />
          <span>X</span>
          <Input placeHolder="Col Pixel" value="" handleOnChange={() => { }} />
        </div>
      </div>
      <div className="wrap-canvas">

      </div>
    </StyledCreatorPage>
  )
}

export { CreatorPage }