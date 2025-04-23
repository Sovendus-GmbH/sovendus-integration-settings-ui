import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { type SovendusAppSettings, Versions } from "sovendus-integration-types";

import { loggerInfo } from "../package";

export const initialSettings: SovendusAppSettings = {
  version: Versions.THREE,
};

export function useSettings(_initialSettings?: SovendusAppSettings): {
  currentSettings: SovendusAppSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings | undefined>>;
} {
  const [currentSettings, setCurrentSettings] = useState<SovendusAppSettings>();

  useEffect(() => {
    setCurrentSettings(getSettings(_initialSettings || initialSettings));
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    currentSettings,
    setCurrentSettings,
  };
}

export function getSettings(
  _initialSettings?: SovendusAppSettings,
): SovendusAppSettings {
  if (typeof window === "undefined") {
    throw new Error("getSettings() should only be called in the browser");
  }
  const settings = localStorage.getItem("sovendus-settings");
  if (settings) {
    loggerInfo("Loaded settings from local storage:", JSON.parse(settings));
    return JSON.parse(settings) as SovendusAppSettings;
  }
  return _initialSettings || initialSettings;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function saveSettings(
  newSettings: SovendusAppSettings,
): Promise<SovendusAppSettings> {
  loggerInfo("Saving settings:", newSettings);
  localStorage.setItem("sovendus-settings", JSON.stringify(newSettings));
  return newSettings;
}

export function clearSettings(): void {
  localStorage.removeItem("sovendus-settings");
}
