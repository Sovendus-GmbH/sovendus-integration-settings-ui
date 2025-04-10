"use client";

import { type JSX } from "react";
import { type SovendusAppSettings } from "sovendus-integration-types";

import { SovendusBackendForm } from "../../package/components/backend-form";
import { AdminDashboard } from "../components/mock-admin-dashboard";
import { initialSettings, saveSettings, useSettings } from "../settings-util";

export default function SettingsUIDemo({
  initialSettings: _initialSettings,
}: {
  initialSettings?: SovendusAppSettings;
}): JSX.Element {
  const { currentSettings } = useSettings(_initialSettings || initialSettings);

  if (!currentSettings) {
    return <></>;
  }

  return (
    <AdminDashboard page="settings">
      <SovendusBackendForm
        currentStoredSettings={currentSettings}
        saveSettings={saveSettings}
        callSaveOnLoad={true}
        featureFlags={{
          employeeBenefits: {
            addToSidebar: true,
            showWidgetOnDashboard: true,
            isEnabled: true,
          },
          rewards: {
            rewardsEnabled: true,
            triggers: {
              account: true,
              custom: true,
              dashboard: true,
              orders: true,
            },
          },
        }}
      />
    </AdminDashboard>
  );
}
