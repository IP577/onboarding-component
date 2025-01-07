import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OnboardingState {
  personalProfile: {
    name: string;
    age: number;
    email: string;
    profilePicture: string | null;
  } | null;
  favoriteSongs: string[];
  paymentDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  } | null;
  currentStep: number; // Tracks current step
  isCompleted: boolean; // Indicates if onboarding is completed
  isLoggedIn: boolean; // Tracks if the user is logged in
}

const initialState: OnboardingState = {
  personalProfile: null,
  favoriteSongs: [],
  paymentDetails: null,
  currentStep: 1,
  isCompleted: false,
  isLoggedIn: false, // Default to false
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setPersonalProfile(
      state,
      action: PayloadAction<OnboardingState["personalProfile"]>
    ) {
      state.personalProfile = action.payload;
      state.currentStep = 2; // Advance to step 2
    },
    setFavoriteSongs(state, action: PayloadAction<string[]>) {
      state.favoriteSongs = action.payload;
      state.currentStep = 3; // Advance to step 3
    },
    setPaymentDetails(
      state,
      action: PayloadAction<OnboardingState["paymentDetails"]>
    ) {
      state.paymentDetails = action.payload;
      state.isCompleted = true; // Mark onboarding as completed
    },
    setLoggedInStatus(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload; // Update logged-in status
    },
    resetOnboardingState: () => initialState,
  },
});

export const {
  setPersonalProfile,
  setFavoriteSongs,
  setPaymentDetails,
  setLoggedInStatus,
  resetOnboardingState,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
