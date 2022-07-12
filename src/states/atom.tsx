import { atom } from "recoil";

export const rgbColorState = atom<any>({
  key: "rgbColorState",
  default: {
    r: 255,
    g: 255,
    b: 255
  }
})