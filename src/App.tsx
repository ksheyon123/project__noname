import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/index";
import { Layout } from "./components/index";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <MainPage />
          </Layout>
        }
      />
    </Routes>
  )
}

export { App };
