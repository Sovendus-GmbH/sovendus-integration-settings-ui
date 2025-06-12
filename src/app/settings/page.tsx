"use client";

import { type JSX } from "react";
import {
  type SovendusAppSettings,
  TriggerPages,
} from "sovendus-integration-types";

import { SovendusBackendForm } from "../../package";
import type { SovendusBackendFormFeatureFlags } from "../../package/components/ui/backend-form";
import { AdminBar } from "../components/admin-bar";
import { AdminDashboard } from "../components/mock-admin-dashboard";
import { EmployeeBenefitsTour } from "../components/tours/employee-benefits-tour";
import { OptimizeTour } from "../components/tours/optimize-tour";
import { SettingsTour } from "../components/tours/settings-tour";
import { useOnboardingState } from "../onboarding-util";
import {
  clearSettings,
  initialSettings,
  saveSettings,
  useSettings,
} from "../settings-util";

export default function SettingsUIDemo({
  initialSettings: _initialSettings,
  featureFlags = {
    employeeBenefits: {
      addToSidebar: true,
      showWidgetOnDashboard: true,
      isEnabled: true,
    },
    rewards: {
      rewardsEnabled: true,
      triggers: {
        [TriggerPages.MY_ACCOUNT_DASHBOARD]: true,
        [TriggerPages.MY_ORDERS]: true,
        [TriggerPages.MY_ORDERS_DETAIL]: true,
        [TriggerPages.CUSTOM]: true,
      },
    },
  },
  urlPrefix = "",
  clearStorage = clearSettings,
  onboardingState: externalOnboardingState,
  activeTour = "settings", // Can be "settings", "optimize", or "employee-benefits"
}: {
  initialSettings?: SovendusAppSettings;
  featureFlags?: SovendusBackendFormFeatureFlags;
  urlPrefix?: string;
  clearStorage: () => void;
  onboardingState?: {
    finishedHomeTour?: boolean;
    finishedDashboardTour?: boolean;
    finishedSettingsTour?: boolean;
    finishedOptimizeTour?: boolean;
    finishedEmployeeBenefitsTour?: boolean;
  };
  activeTour?: string;
}): JSX.Element {
  const { currentSettings } = useSettings(_initialSettings || initialSettings);
  const { onboardingState, updateOnboardingState } = useOnboardingState(
    externalOnboardingState,
  );

  if (!currentSettings) {
    return <></>;
  }

  const handleSettingsTourComplete = (): void => {
    updateOnboardingState({ finishedSettingsTour: true });
  };

  const handleOptimizeTourComplete = (): void => {
    updateOnboardingState({ finishedOptimizeTour: true });
  };

  const handleEmployeeBenefitsTourComplete = (): void => {
    updateOnboardingState({ finishedEmployeeBenefitsTour: true });
  };

  return (
    <>
      <AdminBar pageName="Sovendus App Settings" clearStorage={clearStorage} />
      <AdminDashboard page="settings" urlPrefix={urlPrefix}>
        <SovendusBackendForm
          currentStoredSettings={currentSettings}
          saveSettings={saveSettings}
          callSaveOnLoad={true}
          featureFlags={featureFlags}
        />
      </AdminDashboard>

      {/* Settings Tour */}
      <SettingsTour
        isEnabled={
          activeTour === "settings" && !onboardingState.finishedSettingsTour
        }
        onComplete={handleSettingsTourComplete}
        onboardingState={onboardingState}
      />

      {/* Import the new tour components */}
      <OptimizeTour
        isEnabled={
          activeTour === "optimize" && !onboardingState.finishedOptimizeTour
        }
        onComplete={handleOptimizeTourComplete}
        onboardingState={onboardingState}
      />

      <EmployeeBenefitsTour
        isEnabled={
          activeTour === "employee-benefits" &&
          !onboardingState.finishedEmployeeBenefitsTour
        }
        onComplete={handleEmployeeBenefitsTourComplete}
        onboardingState={onboardingState}
      />
    </>
  );
}
