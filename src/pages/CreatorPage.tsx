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

  const size = 100;
  const divRef = useRef<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>();
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
    const ctx = current?.getContext("2d");
    if (!!ctx) {
      // begin draw
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < height / size; i++) {
        ctx.moveTo(i * size, 0);
        ctx.lineTo(i * size, height);
        ctx.moveTo(0, i * size);
        ctx.lineTo(width, i * size);
        ctx.stroke();
      }
      ctx.closePath();
    }
  };

  useMountEffect(drawGrid);

  const getCurrentPosition = useCallback((e: MouseEventInit) => {
    const { current } = canvasRef;
    let coordX = 0;
    let coordY = 0;
    if (!!e) {
      const {
        clientX = 0,
        clientY = 0
      } = e;
      const rect = current!.getBoundingClientRect();
      coordX = clientX - rect.left;
      coordY = clientY - rect.top;

    }
    return {
      coordX,
      coordY
    }
  }, [canvasRef])

  const handleEl = useCallback((e: MouseEventInit) => {
    const { coordX, coordY } = getCurrentPosition(e);
    const blockCount = width / size;
    const xIdx = Math.floor(coordX / size);
    const yIdx = Math.floor(coordY / size);
    const idx = xIdx + (yIdx * blockCount);
    return idx;
  }, []);

  const handleOnMouseover = useCallback((e: any) => {
    if (!isDraw) return;
    const rsp = handleEl(e);
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
    // const { current } = canvasCRef;
    // current?.addEventListener("wheel", handleOnWheel);
    // return () => current?.removeEventListener("wheel", handleOnWheel);
  }, [ratio]);

  return (
    <StyledCreatorPage ref={divRef as RefObject<HTMLDivElement>}>
      <div className="wrap-tools">

      </div>
      <div
        className="wrap-canvas"
      >
        <canvas
          ref={canvasRef as RefObject<HTMLCanvasElement>}
          width={width}
          height={height}
        />
      </div>
    </StyledCreatorPage>
  )
}

export { CreatorPage }