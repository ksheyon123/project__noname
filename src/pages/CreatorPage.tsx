import React, { useRef, RefObject, useEffect } from "react";
import styled from "styled-components";
import { Input } from "src/components/index";

interface IProps {
  width?: number;
  height?: number;
}

const StyledCreatorPage = styled.div<{ width: number; height: number; }>`
  width : 100%;
  height : 100%;
  & > div.wrap-tools {
    display: flex;
    align-items: center;
    width : 100%;
    height : 30px;
    border-bottom : 1px solid #EEE;
    & > div {
      display: flex;
    }
  }

  & > div.wrap-canvas {
    width : 100%;
    height : calc(100% - 30px);
    overflow : scroll;
    & > div.container {
      width : ${props => props.width + "px"};
      height : ${props => props.height + "px"};
    }
  }
  .pixel {
        border : 0.5px solid rgba(0, 0, 0, 0.03);
      }
`;

const CreatorPage: React.FC<IProps> = (props) => {
  const {
    width = 1000,
    height = 1000,
  } = props;

  const size = 100;
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const { current } = containerRef;
    if (!!current) {
      for (let i = 0; i < height / size; i++) {
        const flexEl = document.createElement("div");
        flexEl.style.display = "flex";

        for (let j = 0; j < width / size; j++) {
          const divEl = document.createElement("div");
          divEl.style.width = size + "px";
          divEl.style.height = size + "px";
          divEl.classList.add("pixel");
          flexEl.appendChild(divEl)
        }

        current.appendChild(flexEl);
      }

    }
  }, [containerRef]);

  return (
    <StyledCreatorPage
      width={width}
      height={height}
    >
      <div className="wrap-tools">

      </div>
      <div className="wrap-canvas">
        <div
          ref={containerRef as RefObject<HTMLDivElement>}
          className="container"
        />
      </div>
    </StyledCreatorPage>
  )
}

export { CreatorPage }