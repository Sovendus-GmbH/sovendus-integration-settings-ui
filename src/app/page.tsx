"use client";

import "sovendus-integration-settings-ui/style.css";

import { type JSX, useState } from "react";
import { SovendusSettings } from "sovendus-integration-settings-ui";
import { type SovendusAppSettings, Versions } from "sovendus-integration-types";

const initialSettings: SovendusAppSettings = {
  voucherNetwork: {
    settingType: undefined,
    cookieTracking: false,
  },
  optimize: {
    settingsType: undefined,
  },
  checkoutProducts: false,
  employeeBenefits: {
    isEnabled: false,
    addToSidebar: false,
    showWidgetOnDashboard: false,
  },
  version: Versions.THREE,
};

export default function Home(): JSX.Element {
  const [currentSettings] = useState<SovendusAppSettings>(() => {
    try {
      const savedData = localStorage.getItem("sovendus-settings");
      return savedData
        ? (JSON.parse(savedData) as SovendusAppSettings)
        : initialSettings;
    } catch {
      return initialSettings;
    }
  });
  const saveSettings = async (
    newSettings: SovendusAppSettings,
    // eslint-disable-next-line @typescript-eslint/require-await
  ): Promise<SovendusAppSettings> => {
    // eslint-disable-next-line no-console
    console.log("Saving settings:", newSettings);
    localStorage.setItem("sovendus-settings", JSON.stringify(newSettings));

    return newSettings;
  };

  return (
    <main className="min-h-screen p-4">
      <SovendusSettings
        currentStoredSettings={currentSettings}
        saveSettings={saveSettings}
      />
    </main>
  );
}
