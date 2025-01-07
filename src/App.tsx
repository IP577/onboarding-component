import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/LoginPage.tsx";
import PersonalProfileForm from "./features/onboarding/PersonalProfile.tsx";
import FavoriteSongsForm from "./features/onboarding/FavoriteSongs.tsx";
import PaymentInformationForm from "./features/onboarding/PaymentInfo.tsx";
import SuccessPage from "./features/onboarding/SuccessPage.tsx";
import Home from "./pages/HomePage.tsx";
import { RootState } from "./store/store.ts";

const App: React.FC = () => {
  const onboardingState = useSelector((state: RootState) => state.onboarding);
  const isLoggedIn = useSelector(
    (state: RootState) => state.onboarding.isLoggedIn
  );
  const initialRoute = (() => {
    if (!isLoggedIn) return "/login";
    if (onboardingState && isLoggedIn) {
      return `/onboarding/${onboardingState.currentStep}`;
    }
    return "/home";
  })();

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to={initialRoute} />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/onboarding/step1"
          element={
            isLoggedIn ? <PersonalProfileForm /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/onboarding/step2"
          element={
            isLoggedIn ? <FavoriteSongsForm /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/onboarding/step3"
          element={
            isLoggedIn ? <PaymentInformationForm /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/onboarding/success"
          element={isLoggedIn ? <SuccessPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
