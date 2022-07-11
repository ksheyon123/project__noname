import React, { useRef, RefObject, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import { useMountEffect, usePrevious } from "src/hooks/index";
import ic_arrow from "src/assets/arrow-pointer-solid.svg";

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
    & > img {
      width : 20px;
      height  : 20px;
      cursor : pointer;
    }
    & > div {
      display: flex;
      
    }
  }
  & > div.wrap-canvas {
    position : relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width : 100vw;
    height : 100vh;
    margin-top : 30px;
    overflow: hidden;
  }
  .pixel {
    border : 0.5px solid rgba(0, 0, 0, 0.1);
  }
`;

const StyledCanvas = styled.canvas<{ ratio: number; }>`
    transform: scale(${props => props.ratio});
`;

const CreatorPage: React.FC<IProps> = (props) => {
  const {
    width = 1000,
    height = 1000,
  } = props;

  const size = 10;
  const divRef = useRef<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>();
  const [isDrag, setDrag] = useState<boolean>(false);
  const [isKeyDown, setIsKeyDown] = useState<boolean>(false);
  const [ratio, setRatio] = useState<number>(1);

  let gridData = new Object();

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
      ctx.lineWidth = 0.5
      ctx.strokeStyle = "rgba(230, 230, 230)";
      ctx.beginPath();
      ctx.rect(0, 0, height, width);

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
  }, [canvasRef]);

  const handleOnMouseMove = useCallback((e: any) => {
    const { coordX, coordY } = getCurrentPosition(e);
    if (isDrag) return;
    if (!isKeyDown) return;
    const blockCount = width / size;
    const xIdx = Math.floor((coordX / ratio) / size);
    const yIdx = Math.floor((coordY / ratio) / size);
    setColor(xIdx, yIdx);
    const idx = xIdx + (yIdx * blockCount);
    gridData = {
      ...gridData,
      [idx]: {
        r: 0,
        g: 0,
        b: 0,
        h: 0.01,
      }
    }
  }, [isDrag, isKeyDown, ratio]);

  const setColor = useCallback((x: number, y: number) => {
    const { current } = canvasRef;
    if (!!current) {
      const ctx = current.getContext("2d");
      if (!!ctx) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(100, 100, 100)";
        ctx.fillRect(x * size, y * size, size, size);
        ctx.closePath();
      }
    }
  }, [canvasRef]);

  useEffect(() => {
    const { current } = canvasRef;
    if (!!current) {
      current.addEventListener("mousedown", () => setIsKeyDown(true));
      current.addEventListener("mouseup", () => setIsKeyDown(false));
      current.addEventListener("mousemove", handleOnMouseMove);

      return () => {
        current.removeEventListener("mousedown", () => setIsKeyDown(true));
        current.removeEventListener("mouseup", () => setIsKeyDown(false));
        current.removeEventListener("mousemove", handleOnMouseMove)
      };
    };
  }, [isKeyDown]);

  const handleOnWheel = useCallback((e: WheelEvent) => {
    if (e.deltaY > 0) {
      setRatio(ratio - 0.003);
    }

    if (e.deltaY < 0) {
      setRatio(ratio + 0.003);
    }
  }, [ratio]);

  useEffect(() => {
    const { current } = canvasRef;
    if (!!current) {
      current?.addEventListener("wheel", handleOnWheel);
      return () => current?.removeEventListener("wheel", handleOnWheel);
    }
  }, [ratio]);

  return (
    <StyledCreatorPage ref={divRef as RefObject<HTMLDivElement>} >
      <div className="wrap-tools">
        <img
          src={ic_arrow}
          onClick={() => setDrag(!isDrag)}
          alt="arrow"
        />
        <div>
        </div>
      </div>
      <div className="wrap-canvas" >
        <Draggable disabled={!isDrag} >
          <div>
            <StyledCanvas
              ref={canvasRef as RefObject<HTMLCanvasElement>}
              width={width}
              height={height}
              ratio={ratio}
            />
          </div>
        </Draggable>
      </div>
    </StyledCreatorPage>
  )
}

export { CreatorPage }