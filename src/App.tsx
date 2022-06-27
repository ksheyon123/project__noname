import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { Layout } from "src/components/index";
import { getPrivateKey } from "src/apis/localStorage";
import { PrivateLoginType } from "src/constants/types";
import { PATHNAME } from "src/constants/index";
import { LoginPage, MainPage, CreatorPage } from "src/pages/index";

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
      <Route path={PATHNAME.ROOT} element={<LoginPage />} />
      <Route path={PATHNAME.GAME} element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <MainPage />
        </PrivateRoute>
      } />
      <Route path={PATHNAME.NFT} element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <CreatorPage />
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default App;
