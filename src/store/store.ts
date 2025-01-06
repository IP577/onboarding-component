import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import onboardingReducer from "../features/onboarding/onboardingSlice.tsx";

const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
