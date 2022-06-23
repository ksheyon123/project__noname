import React, { ReactNode, useEffect } from 'react';
import { useRecoilValue } from "recoil";
import { Routes, Route } from "react-router-dom";
import { Layout } from "src/components/index";
import { getPrivateKey } from "src/apis/localStorage";
import { PrivateLoginType } from "src/constants/types";
import { MainPage } from "src/pages/index";

const PrivateRoute = ({ children, isLoggedIn }: PrivateLoginType) => {

  useEffect(() => {

  }, [isLoggedIn]);

  return (
    <Layout>
      {children}
    </Layout>
  )
}

const App = () => {

  const privKey = getPrivateKey();
  const isLoggedIn = !!privKey;

  return (
    <Routes>
      <Route path="/" element={<></>} />

      <Route path="/main" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <MainPage />
        </PrivateRoute>
      } />

    </Routes>
  );
}

export default App;
