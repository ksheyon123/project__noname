import React, { useRef, RefObject, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Input } from "src/components/index";
import { useMountEffect } from "src/hooks/useMountEffect";

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
    border : 0.5px solid rgba(0, 0, 0, 0.1);
  }
`;

const CreatorPage: React.FC<IProps> = (props) => {
  const {
    width = 1000,
    height = 1000,
  } = props;

  const size = 10;
  const containerRef = useRef<HTMLDivElement>();
  const [isDraw, setIsDraw] = useState<boolean>(false);

  const drawGrid = () => {
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
  };

  useMountEffect(drawGrid);

  const setColor = (idx: number) => {
    const pixelEl = document.getElementsByClassName("pixel");
    if (!!pixelEl) {
      pixelEl[idx].setAttribute("style", "width : 10px; height : 10px; background-color : red;")
    }
  }

  const handleEl = (e: any) => {
    const blockCount = width / size;
    const coordX = Math.floor(e.clientX / size);
    const coordY = Math.floor((e.clientY - 30) / size);
    const nth = coordX + (coordY * blockCount);
    const idx = nth;
    return idx;
  }

  const handleOnMouseover = useCallback((e: any) => {
    if (!isDraw) return;
    const rsp = handleEl(e);
    setColor(rsp)
  }, [isDraw]);

  useEffect(() => {
    window.addEventListener("mousedown", (e) => {
      handleOnMouseover(e);
      setIsDraw(true)
    });
    return () => window.removeEventListener("mousedown", (e) => {
      handleOnMouseover(e);
      setIsDraw(true)
    });
  }, [isDraw]);

  useEffect(() => {
    window.addEventListener("mouseup", () => setIsDraw(false));
    return window.removeEventListener("mouseup", () => setIsDraw(false));
  }, []);

  useEffect(() => {
    const { current } = containerRef;
    if (current) {
      current.addEventListener("mouseover", handleOnMouseover);
      return () => current.removeEventListener("mouseover", handleOnMouseover);
    }
  }, [isDraw]);

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