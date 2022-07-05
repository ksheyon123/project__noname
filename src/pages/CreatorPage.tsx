import React, { useRef, RefObject, useEffect, useState, useCallback, MouseEvent } from "react";
import styled from "styled-components";
import { Input } from "src/components/index";
import { useMountEffect } from "src/hooks/useMountEffect";

interface IProps {
  width?: number;
  height?: number;
}

const StyledCreatorPage = styled.div`
  width : 100%;
  height : 100%;
  & > div.wrap-tools {
    position : fixed;
    top : 0px;
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
    position : relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top : 30px;
    overflow: hidden;
  }
  .pixel {
    border : 0.5px solid rgba(0, 0, 0, 0.1);
  }
`;

const StyledCanvas = styled.div<{ width: number; height: number; ratio: number; }>`
  position :relative;
  top : 0px;
  left : 0px;
  width : ${props => props.width + "px"};
  height : ${props => props.height + "px"};
  transform: scale(${props => props.ratio});
  transform-origin: left top;
`;

const CreatorPage: React.FC<IProps> = (props) => {
  const {
    width = 1000,
    height = 1000,
  } = props;

  const size = 10;
  const divRef = useRef<HTMLDivElement>();
  const canvasCRef = useRef<HTMLDivElement>();
  const canvasRef = useRef<HTMLDivElement>();
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [ratio, setRatio] = useState<number>(1);

  useEffect(() => {
    const { current } = divRef;
    if (current) {
      current.addEventListener("wheel", (e) => {
        e.preventDefault();
      })
    }

  }, []);

  const drawGrid = () => {
    const { current } = canvasRef;
    if (!!current) {
      for (let i = 0; i < height / size; i++) {

        const flexEl = document.createElement("div");
        flexEl.style.display = "flex";
        flexEl.className = "row";
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

  const handleEl = useCallback((e: MouseEventInit) => {
    console.log(e.clientX);
    console.log(ratio);
    if (e.clientX && e.clientY) {
      const blockCount = width / size;
      const coordX = Math.floor(e.clientX / size);
      const coordY = Math.floor(((e.clientY - 30)) / size);
      const nth = coordX + (coordY * blockCount);
      const idx = nth;
      return idx;
    }
    return 0;
  }, [ratio]);

  const handleOnMouseover = useCallback((e: any) => {
    if (!isDraw) return;
    const rsp = handleEl(e);
    setColor(rsp)
  }, [isDraw]);

  useEffect(() => {
    const { current } = canvasRef;
    if (!!current) {
      current.addEventListener("mousedown", (e: MouseEventInit) => {
        handleOnMouseover(e);
        setIsDraw(true)
      });
      return () => current.removeEventListener("mousedown", (e: MouseEventInit) => {
        handleOnMouseover(e);
        setIsDraw(true)
      });
    }
  }, [isDraw]);

  useEffect(() => {
    const { current } = canvasRef;
    if (!!current) {
      current.addEventListener("mouseup", () => setIsDraw(false));
      return current.removeEventListener("mouseup", () => setIsDraw(false));
    }

  }, []);


  useEffect(() => {
    const { current } = canvasRef;
    if (current) {
      current.addEventListener("mouseover", handleOnMouseover);
      return () => current.removeEventListener("mouseover", handleOnMouseover);
    }
  }, [isDraw]);

  const handleOnWheel = useCallback((e: WheelEvent) => {
    if (e.deltaY > 0) {
      setRatio(ratio - 0.02);
    }

    if (e.deltaY < 0) {
      setRatio(ratio + 0.02);
    }
  }, [ratio]);

  useEffect(() => {
    const { current } = canvasCRef;
    current?.addEventListener("wheel", handleOnWheel);
    return () => current?.removeEventListener("wheel", handleOnWheel);
  }, [ratio]);

  return (
    <StyledCreatorPage ref={divRef as RefObject<HTMLDivElement>}>
      <div className="wrap-tools">

      </div>
      <div
        ref={canvasCRef as RefObject<HTMLDivElement>}
        className="wrap-canvas"
      >
        <StyledCanvas
          id="canvas"
          ref={canvasRef as RefObject<HTMLDivElement>}
          width={width}
          height={height}
          ratio={ratio}
        />
      </div>
    </StyledCreatorPage>
  )
}

export { CreatorPage }