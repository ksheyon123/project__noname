import { useState } from "react";

interface IProps {
  func: () => void;
}

export const useToggler = (func: IProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return {
    toggle
  }
}