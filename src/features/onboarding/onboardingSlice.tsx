import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OnboardingState {
  currentStep: number;
  personalProfile: {
    name: string;
    age: number;
    email: string;
    profilePicture: string;
  };
  favoriteSongs: string[];
  paymentInfo: { cardNumber: string; expiryDate: string; cvv: string };
  isComplete: boolean;
}

const initialState: OnboardingState = {
  currentStep: 1,
  personalProfile: { name: "", age: 0, email: "", profilePicture: "" },
  favoriteSongs: [],
  paymentInfo: { cardNumber: "", expiryDate: "", cvv: "" },
  isComplete: false,
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
    },
    setFavoriteSongs(state, action: PayloadAction<string[]>) {
      state.favoriteSongs = action.payload;
    },
    setPaymentInfo(
      state,
      action: PayloadAction<OnboardingState["paymentInfo"]>
    ) {
      state.paymentInfo = action.payload;
    },
    goToStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    completeOnboarding(state) {
      state.isComplete = true;
    },
  },
});

export const {
  setPersonalProfile,
  setFavoriteSongs,
  setPaymentInfo,
  goToStep,
  completeOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
