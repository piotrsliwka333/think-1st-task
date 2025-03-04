import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "../pages/Home/Home";
import { Layout } from "../components/Layout/Layout";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
