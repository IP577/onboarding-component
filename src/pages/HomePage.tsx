import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { RootState } from "../store/store.ts"; // RootState type
import { setOnboardingComplete } from "../features/onboarding/onboardingSlice.tsx";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const onboardingState = useSelector((state: RootState) => state.onboarding);

  useEffect(() => {
    if (onboardingState.isComplete) {
      dispatch(setOnboardingComplete()); // Mark onboarding as complete
    }
  }, [onboardingState.isComplete, dispatch]);

  // If onboarding is not complete, redirect the user to the onboarding flow
  if (!onboardingState.isComplete) {
    navigate("/onboarding/step1"); // Use navigate to redirect
    return null; // Prevent the rest of the component from rendering during redirection
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Your Home Page!</h1>
      <p>Congratulations on completing the onboarding process!</p>
      <div style={{ padding: "20px", border: "1px solid #ccc" }}>
        <h2>Your Profile</h2>
        <p>
          <strong>Name:</strong> {onboardingState.personalProfile?.name}
        </p>
        <p>
          <strong>Email:</strong> {onboardingState.personalProfile?.email}
        </p>
        <p>
          <strong>Age:</strong> {onboardingState.personalProfile?.age}
        </p>
        <p>
          <strong>Profile Picture:</strong>
        </p>
        <img
          src={onboardingState.personalProfile?.profilePicture}
          alt="Profile"
          style={{ maxWidth: "100px", maxHeight: "100px", borderRadius: "50%" }}
        />
      </div>

      <div
        style={{ padding: "20px", border: "1px solid #ccc", marginTop: "20px" }}
      >
        <h2>Your Favorite Songs</h2>
        {onboardingState.favoriteSongs &&
        onboardingState.favoriteSongs.length > 0 ? (
          <ul>
            {onboardingState.favoriteSongs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
        ) : (
          <p>No favorite songs added yet.</p>
        )}
      </div>

      <div
        style={{ padding: "20px", border: "1px solid #ccc", marginTop: "20px" }}
      >
        <h2>Your Payment Information</h2>
        {onboardingState.paymentInfo ? (
          <div>
            <p>
              <strong>Card Number:</strong> **** **** ****{" "}
              {onboardingState.paymentInfo.cardNumber.slice(-4)}
            </p>
            <p>
              <strong>Expiry Date:</strong>{" "}
              {onboardingState.paymentInfo.expiryDate}
            </p>
          </div>
        ) : (
          <p>No payment information provided yet.</p>
        )}
      </div>

      <div style={{ padding: "20px", marginTop: "20px" }}>
        <button onClick={() => localStorage.clear()}>Logout</button>
      </div>
    </div>
  );
};

export default HomePage;
