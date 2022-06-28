import React from "react";
import styled from "styled-components";
import { Button } from "src/components/index";

const StyledLayoutPage = styled.div`
  & > div.select-size {
    display: grid;
    align-content : center;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;

    @media screen and (max-width : 800px) {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 1fr 1fr;
    }

    & > div.screen {
      display: flex;
      flex-direction: column;
      &:before {
        content : ",";
        height : 280px;
        border : 1px solid #AAA;
        border-radius : 5px;
      }
    }
  }
  
`;

const LayoutPage: React.FC = () => {

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
    </StyledLayoutPage>
  )
}

export { LayoutPage }