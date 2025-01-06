import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  PersonalProfile,
  OnboardingState,
  PaymentInfo,
} from "../../types/types.ts";

export const savePersonalProfile = createAsyncThunk(
  "onboarding/savePersonalProfile",
  async (profile: PersonalProfile) => {
    return new Promise<PersonalProfile>((resolve) => {
      setTimeout(() => {
        localStorage.setItem("personalProfile", JSON.stringify(profile));
        resolve(profile);
      }, 1000);
    });
  }
);

export const saveFavoriteSongs = createAsyncThunk(
  "onboarding/saveFavoriteSongs",
  async (songs: string[]) => {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        localStorage.setItem("favoriteSongs", JSON.stringify(songs));
        resolve(songs);
      }, 1000);
    });
  }
);

export const savePaymentInfo = createAsyncThunk(
  "onboarding/savePaymentInfo",
  async (paymentInfo: PaymentInfo) => {
    return new Promise<PaymentInfo>((resolve) => {
      setTimeout(() => {
        localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
        resolve(paymentInfo);
      }, 1000);
    });
  }
);

const initialState: OnboardingState = {
  currentStep: 1,
  personalProfile: null,
  favoriteSongs: [],
  paymentInfo: null,
  isComplete: false,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setPersonalProfile(state, action: PayloadAction<PersonalProfile>) {
      state.personalProfile = action.payload;
      state.currentStep = 2;
    },
    setFavoriteSongs(state, action: PayloadAction<string[]>) {
      state.favoriteSongs = action.payload;
      state.currentStep = 3;
    },
    setPaymentInfo(state, action: PayloadAction<PaymentInfo>) {
      state.paymentInfo = action.payload;
      state.currentStep = 4;
    },
    setOnboardingComplete(state) {
      state.isComplete = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(savePersonalProfile.fulfilled, (state, action) => {
        state.personalProfile = action.payload;
        state.currentStep = 2;
      })
      .addCase(saveFavoriteSongs.fulfilled, (state, action) => {
        state.favoriteSongs = action.payload;
        state.currentStep = 3;
      })
      .addCase(savePaymentInfo.fulfilled, (state, action) => {
        state.paymentInfo = action.payload;
        state.currentStep = 4;
        state.isComplete = true;
      });
  },
});

export const {
  setPersonalProfile,
  setFavoriteSongs,
  setPaymentInfo,
  setOnboardingComplete,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
