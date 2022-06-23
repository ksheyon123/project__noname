import { ReactNode } from "react";

export type PrivateLoginType = {
  children: ReactNode;
  isLoggedIn: boolean;
}