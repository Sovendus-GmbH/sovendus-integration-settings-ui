import React from "react";
import { createRoot } from "react-dom/client";
import type { SovendusAppSettings } from "sovendus-integration-types";

import { SovendusBackendForm } from "./components/backend-form";
import { loggerError, loggerInfo } from "./utils/utils";

export function loadSettingsUi(
  currentSettings: SovendusAppSettings,
  saveSettings: (
    saveSettings: SovendusAppSettings,
  ) => Promise<SovendusAppSettings>,
  settingsContainerId: string,
): void {
  loggerInfo("Loaded settings", currentSettings);
  const container = document.getElementById(settingsContainerId);
  if (!container) {
    loggerError(`Container with id ${settingsContainerId} not found`);
    return;
  }

  const root = createRoot(container);
  root.render(
    React.createElement(SovendusBackendForm, {
      currentStoredSettings: currentSettings,
      saveSettings,
      callSaveOnLoad: false,
    }),
  );
}
