import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import Onboarding from "./features/onboarding/Onboarding.tsx";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isOnboardingComplete = localStorage.getItem("onboardingState")
    ? JSON.parse(localStorage.getItem("onboardingState") || "").isComplete
    : false;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                isLoggedIn
                  ? isOnboardingComplete
                    ? "/home"
                    : "/onboarding/step1"
                  : "/login"
              }
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/onboarding/*" element={<Onboarding />} />
      </Routes>
    </Router>
  );
};

export default App;
