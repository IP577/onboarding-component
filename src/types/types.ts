export interface PersonalProfile {
  name: string;
  age: number;
  email: string;
  profilePicture?: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface OnboardingState {
  currentStep: number;
  isComplete: boolean;
  personalProfile: PersonalProfile | null;
  favoriteSongs: string[];
  paymentInfo: PaymentInfo | null;
}
