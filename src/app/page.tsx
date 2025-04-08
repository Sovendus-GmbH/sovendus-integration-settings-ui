"use client";

import "../package/components/app.css";

import { type JSX, useEffect, useState } from "react";
import { type SovendusAppSettings } from "sovendus-integration-types";

import { SovendusBackendForm } from "../package/components/backend-form";
import { getSettings, initialSettings, saveSettings } from "./settings-util";

export default function SettingsUIDemo({
  initialSettings: _initialSettings,
}: {
  initialSettings?: SovendusAppSettings;
}): JSX.Element {
  const [currentSettings, setCurrentSettings] = useState<SovendusAppSettings>();

  useEffect(() => {
    setCurrentSettings(getSettings(_initialSettings || initialSettings));
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentSettings) {
    return <></>;
  }

  return (
    <main className="min-h-screen p-4">
      <SovendusBackendForm
        currentStoredSettings={currentSettings}
        saveSettings={saveSettings}
        callSaveOnLoad={true}
        featureFlags={{
          employeeBenefits: {
            addToSidebar: false,
            showWidgetOnDashboard: false,
            isEnabled: true,
          },
          rewards: {
            rewardsEnabled: true,
          },
        }}
      />
    </main>
  );
}
