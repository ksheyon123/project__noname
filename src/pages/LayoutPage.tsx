import React from "react";
import styled from "styled-components";
import Store from "electron-store";
import { Button, Input } from "src/components/index";

const StyledLayoutPage = styled.div`
  height : 100%;
  & > div.select-size {
    display: grid;
    align-content: center;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr;
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
        height : 280px;
        border : 1px solid #AAA;
        border-radius : 5px;
        @media screen and (max-width : 800px) {
          height : 160px;
        }
      }
    }
    @media screen and (max-width : 800px) {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 1fr 1fr 1fr;

    }
  }
`;

const LayoutPage: React.FC = () => {

  const store = new Store();

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

      </div>
    </StyledLayoutPage>
  )
}

export { LayoutPage }