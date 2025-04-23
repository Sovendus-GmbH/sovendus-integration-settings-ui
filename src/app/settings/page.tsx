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
}: {
  initialSettings?: SovendusAppSettings;
  featureFlags?: SovendusBackendFormFeatureFlags;
  urlPrefix?: string;
  clearStorage: () => void;
}): JSX.Element {
  const { currentSettings } = useSettings(_initialSettings || initialSettings);

  if (!currentSettings) {
    return <></>;
  }

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
    </>
  );
}
