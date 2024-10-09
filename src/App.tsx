import { GlobalCssPriority } from "./GlobalCssPriority";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";

export const App = () => {
  return (
    <GlobalCssPriority>
      <Router basename="/RepoFinder">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/error-page" element={<ErrorPage />} />
        </Routes>
      </Router>
    </GlobalCssPriority>
  );
};
