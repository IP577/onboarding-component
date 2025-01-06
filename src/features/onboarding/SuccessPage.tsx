import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(
      "onboardingState",
      JSON.stringify({ isComplete: true })
    );
  }, []);

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <h1>Onboarding Complete!</h1>
      <p>Congratulations, your onboarding process is complete.</p>
      <button onClick={goToHome}>Go to Home</button>
    </div>
  );
};

export default SuccessPage;
