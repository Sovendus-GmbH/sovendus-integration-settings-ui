"use client";

import { type JSX, useEffect, useState } from "react";
import { type SovendusAppSettings } from "sovendus-integration-types";

import { SovendusBackendForm } from "../package/components/backend-form-style-less";
import { getSettings, initialSettings, saveSettings } from "./settings-util";

export function SettingsUIDemoStyleLess({
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
      />
    </main>
  );
}
