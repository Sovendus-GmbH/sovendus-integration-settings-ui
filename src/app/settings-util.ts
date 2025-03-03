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

export function getSettings(): SovendusAppSettings {
  const settings = localStorage.getItem("sovendus-settings");
  if (settings) {
    // eslint-disable-next-line no-console
    console.log("Loaded settings from local storage:", JSON.parse(settings));
    return JSON.parse(settings) as SovendusAppSettings;
  }
  return initialSettings;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function saveSettings(
  newSettings: SovendusAppSettings,
): Promise<SovendusAppSettings> {
  // eslint-disable-next-line no-console
  console.log("Saving settings:", newSettings);
  localStorage.setItem("sovendus-settings", JSON.stringify(newSettings));
  return newSettings;
}
