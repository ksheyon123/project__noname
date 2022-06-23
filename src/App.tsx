import React, { ReactNode, useEffect } from 'react';
import { useRecoilValue } from "recoil";
import { Routes, Route } from "react-router-dom";
import { getPrivateKey } from "src/apis/localStorage";
import { PrivateLoginType } from "src/constants/types";

const PrivateRoute = ({ children, isLoggedIn }: PrivateLoginType) => {

  useEffect(() => {

  }, [isLoggedIn]);

  return (
    <>
      {children}
    </>
  )
}

const App = () => {

  const privKey = getPrivateKey();
  const isLoggedIn = !!privKey;

  return (
    <Routes>
      <Route path="/" element={<></>} />
      <PrivateRoute isLoggedIn={isLoggedIn}>
        <></>
      </PrivateRoute>
    </Routes>
  );
}

export default App;
