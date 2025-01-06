import React from "react";
import { Route, Routes } from "react-router-dom";
import PersonalProfile from "./PersonalProfile.tsx";
import FavoriteSongs from "./FavoriteSongs.tsx";
import PaymentInfo from "./PaymentInfo.tsx";
import SuccessPage from "./SuccessPage.tsx";

const Onboarding = () => (
  <Routes>
    <Route path="/step1" element={<PersonalProfile />} />
    <Route path="/step2" element={<FavoriteSongs />} />
    <Route path="/step3" element={<PaymentInfo />} />
    <Route path="/step4" element={<SuccessPage />} />
  </Routes>
);

export default Onboarding;
