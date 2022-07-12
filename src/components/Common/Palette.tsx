import React, { useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { SketchPicker } from "react-color";
import { rgbColorState } from "src/states/atom";

const StyledPalette = styled.div<{ color: string; }>`
  position : relative;
  & > div.color {
    position: relative;
    display: flex;
    align-items : center;
    & > div.selected-color {
      width : 20px;
      height : 20px;
      border-radius: 50%;
      background-color: ${props => props.color};
      margin-right : 10px;
    }
    & > div.selected-color-hex {

    }
  }
  & > div.palette {
    position : absolute;
  }
`;

const Palette: React.FC = () => {
  const setRgbColor = useSetRecoilState(rgbColorState);
  const [toggle, setToggle] = useState<boolean>(false);
  const [value, setValue] = useState<any>("#000");

  const handleChangeComplete = (color: any) => {
    const {
      r,
      g,
      b
    } = color.rgb;
    console.log(color);
    setValue(color.hex);
    setRgbColor({
      r,
      g,
      b
    });
  };

  return (
    <StyledPalette color={value}>
      <div
        className="color"
        onClick={() => setToggle(!toggle)}
      >
        <div className="selected-color" />
        <div className="selected-color-hex">
          {value}
        </div>
      </div>

      <div className="palette">
        <SketchPicker
          onChange={handleChangeComplete}
        />
      </div>
    </StyledPalette>
  )
}

export { Palette }