import React, { useState } from "react";
import styled from "styled-components";



const StyledPalette = styled.div`

`;

const Palette: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const r = 255;
  const g = 255;
  const b = 255;
  const colorBook = [r, g, b];
  return (
    <StyledPalette>
      <div className="item">
        { }
      </div>
      {
        toggle && (
          <div className="item-list">

          </div>
        )
      }

    </StyledPalette>
  )
}

export { Palette }