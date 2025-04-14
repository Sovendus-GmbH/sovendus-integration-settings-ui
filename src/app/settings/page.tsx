"use client";

import { type JSX } from "react";
import {
  type SovendusAppSettings,
  TriggerPages,
} from "sovendus-integration-types";

import { SovendusBackendForm } from "../../package";
import type { SovendusBackendFormFeatureFlags } from "../../package/components/ui/backend-form";
import { AdminDashboard } from "../components/mock-admin-dashboard";
import { initialSettings, saveSettings, useSettings } from "../settings-util";

export default function SettingsUIDemo({
  initialSettings: _initialSettings,
  featureFlags = {
    employeeBenefits: {
      addToSidebar: true,
      showWidgetOnDashboard: true,
      isEnabled: false,
    },
    rewards: {
      rewardsEnabled: false,
      triggers: {
        [TriggerPages.MY_ACCOUNT_DASHBOARD]: true,
        [TriggerPages.MY_ORDERS]: true,
        [TriggerPages.MY_ORDERS_DETAIL]: true,
        [TriggerPages.CUSTOM]: true,
      },
    },
  },
  urlPrefix = "",
}: {
  initialSettings?: SovendusAppSettings;
  featureFlags?: SovendusBackendFormFeatureFlags;
  urlPrefix?: string;
}): JSX.Element {
  const { currentSettings } = useSettings(_initialSettings || initialSettings);

  if (!currentSettings) {
    return <></>;
  }

  return (
    <AdminDashboard page="settings" urlPrefix={urlPrefix}>
      <SovendusBackendForm
        currentStoredSettings={currentSettings}
        saveSettings={saveSettings}
        callSaveOnLoad={true}
        featureFlags={featureFlags}
      />
    </AdminDashboard>
  );
}
