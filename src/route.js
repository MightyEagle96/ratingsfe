import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import MyVotes from "./pages/MyVotes";
import ResultsPage from "./pages/ResultsPage";
import VotePage from "./pages/VotePage";

function MainRoutes() {
  const routes = [
    { path: "/", component: HomePage },
    { path: "/about", component: AboutPage },
    { path: "/vote", component: VotePage },
    { path: "/myVotes", component: MyVotes },
    { path: "/results", component: ResultsPage },
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
