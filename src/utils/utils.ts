import { type ClassValue, clsx } from "clsx";
import type { SovendusAppSettings } from "sovendus-integration-types";
import {
  defaultSovendusAppSettings,
  Versions,
} from "sovendus-integration-types";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function loggerError(message: string, ...other: unknown[]): void {
  // eslint-disable-next-line no-console
  console.error(`[Sovendus App Settings] - ${message}`, ...other);
}

export function loggerInfo(message: string, ...other: unknown[]): void {
  // eslint-disable-next-line no-console
  console.log(`[Sovendus App Settings] - ${message}`, ...other);
}

export function cleanConfig(
  config: Partial<SovendusAppSettings>,
): SovendusAppSettings {
  const cleanedConfig: SovendusAppSettings = {
    checkoutProducts:
      config.checkoutProducts || defaultSovendusAppSettings.checkoutProducts,
    optimize: {
      settingsType:
        config.optimize?.settingsType ||
        defaultSovendusAppSettings.optimize.settingsType,
    },
    voucherNetwork: {
      cookieTracking:
        config.voucherNetwork?.cookieTracking ||
        defaultSovendusAppSettings.voucherNetwork.cookieTracking,
      settingType:
        config.voucherNetwork?.settingType ||
        defaultSovendusAppSettings.voucherNetwork.settingType,
    },
    employeeBenefits:
      config.employeeBenefits || defaultSovendusAppSettings.employeeBenefits,
    version: Versions.THREE,
  };

  const optimizeCountries = config.optimize?.countries;
  if (optimizeCountries) {
    cleanedConfig.optimize.countries = optimizeCountries;
  }
  const optimizeSimple = config.optimize?.simple;
  if (optimizeSimple) {
    cleanedConfig.optimize.simple = optimizeSimple;
  }

  const voucherNetworkCountries = config.voucherNetwork?.countries;
  if (voucherNetworkCountries) {
    cleanedConfig.voucherNetwork.countries = voucherNetworkCountries;
  }
  const voucherNetworkSimple = config.voucherNetwork?.simple;
  if (voucherNetworkSimple) {
    cleanedConfig.voucherNetwork.simple = voucherNetworkSimple;
  }

  return cleanedConfig;
}
