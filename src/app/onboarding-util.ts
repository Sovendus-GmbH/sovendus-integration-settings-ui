import React from "react";

import { loggerError } from "../package";

// Onboarding state management for tours

export interface OnboardingState {
  finishedHomeTour: boolean;
  finishedDashboardTour: boolean;
  finishedSettingsTour: boolean;
  finishedOptimizeTour: boolean;
  finishedEmployeeBenefitsTour: boolean;
}

const STORAGE_KEY = "sovendus-onboarding-state";

export const defaultOnboardingState: OnboardingState = {
  finishedHomeTour: false,
  finishedDashboardTour: false,
  finishedSettingsTour: false,
  finishedOptimizeTour: false,
  finishedEmployeeBenefitsTour: false,
};

/**
 * Get the current onboarding state from localStorage
 */
export function getOnboardingState(): OnboardingState {
  if (typeof window === "undefined") {
    return defaultOnboardingState;
  }

  try {
    const storedState = localStorage.getItem(STORAGE_KEY);
    if (storedState) {
      return JSON.parse(storedState) as OnboardingState;
    }
  } catch (e) {
    loggerError("Error getting onboarding state from localStorage", e);
  }

  return defaultOnboardingState;
}

/**
 * Save the onboarding state to localStorage
 */
export function saveOnboardingState(
  state: Partial<OnboardingState>,
): OnboardingState {
  if (typeof window === "undefined") {
    return defaultOnboardingState;
  }

  try {
    const currentState = getOnboardingState();
    const newState = { ...currentState, ...state };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    return newState;
  } catch (e) {
    loggerError("Error saving onboarding state to localStorage", e);
    return defaultOnboardingState;
  }
}

/**
 * Reset the onboarding state to defaults
 */
export function resetOnboardingState(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    loggerError("Error resetting onboarding state in localStorage", e);
  }
}

/**
 * Custom React hook for managing onboarding state
 */
export function useOnboardingState(initialState?: Partial<OnboardingState>): {
  onboardingState: OnboardingState;
  updateOnboardingState: (newState: Partial<OnboardingState>) => void;
  resetOnboardingState: () => void;
} {
  const [state, setState] = React.useState<OnboardingState>(() => {
    if (initialState) {
      return { ...defaultOnboardingState, ...initialState };
    }
    return getOnboardingState();
  });

  // Effect to sync state to localStorage
  React.useEffect(() => {
    saveOnboardingState(state);
  }, [state]);

  return {
    onboardingState: state,
    updateOnboardingState: (newState: Partial<OnboardingState>): void => {
      setState((prevState) => ({ ...prevState, ...newState }));
    },
    resetOnboardingState: (): void => {
      resetOnboardingState();
      setState(defaultOnboardingState);
    },
  };
}
