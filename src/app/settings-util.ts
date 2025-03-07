import { type SovendusAppSettings, Versions } from "sovendus-integration-types";

import { loggerInfo } from "../utils/utils";

export const initialSettings: SovendusAppSettings = {
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

export function getSettings(
  _initialSettings: SovendusAppSettings,
): SovendusAppSettings {
  if (typeof window === "undefined") {
    throw new Error("getSettings() should only be called in the browser");
  }
  const settings = localStorage.getItem("sovendus-settings");
  if (settings) {
    loggerInfo("Loaded settings from local storage:", JSON.parse(settings));
    return JSON.parse(settings) as SovendusAppSettings;
  }
  return _initialSettings;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function saveSettings(
  newSettings: SovendusAppSettings,
): Promise<SovendusAppSettings> {
  loggerInfo("Saving settings:", newSettings);
  localStorage.setItem("sovendus-settings", JSON.stringify(newSettings));
  return newSettings;
}
