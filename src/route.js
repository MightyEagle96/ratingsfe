import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import VotePage from "./pages/VotePage";

function MainRoutes() {
  const routes = [
    { path: "/", component: HomePage },
    { path: "/about", component: AboutPage },
    { path: "/vote", component: VotePage },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((c) => (
          <Route path={c.path} element={<c.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
