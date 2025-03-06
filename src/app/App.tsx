import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "../components/Shared/Layout/Layout";
import { NotFound } from "../pages/NotFound/NotFound";
import { Workouts } from "../pages/Workouts/Workouts";
import { Home } from "../pages/Home/Home";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/workouts">
            <Route path="" element={<Workouts />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
