import { type ClassValue, clsx } from "clsx";
import type {
  OptimizeCountry,
  OptimizeSettings,
  OptimizeSettingsCountries,
  SettingsType,
  SovendusAppSettings,
  VoucherNetworkLanguage,
  VoucherNetworkSettings,
  VoucherNetworkSettingsCountries,
} from "sovendus-integration-types";
import { Versions } from "sovendus-integration-types";
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
  unParsedConfig: Partial<SovendusAppSettings> | string,
): SovendusAppSettings {
  const config: SovendusAppSettings =
    typeof unParsedConfig === "string"
      ? JSON.parse(unParsedConfig)
      : unParsedConfig;
  const cleanedConfig: SovendusAppSettings = {
    version: Versions.THREE,
  };
  if (config.checkoutProducts) {
    cleanedConfig.checkoutProducts = config.checkoutProducts;
  }
  if (config.employeeBenefits) {
    cleanedConfig.employeeBenefits = config.employeeBenefits;
  }
  const optimize: {
    settingsType?: SettingsType | undefined;
    simple?: OptimizeCountry;
    countries?: OptimizeSettingsCountries["countries"];
  } = {};
  let hasOptimizeConfig = false;
  const settingsType = config.optimize?.settingsType;
  if (settingsType) {
    optimize.settingsType = settingsType;
    hasOptimizeConfig = true;
  }
  const optimizeCountries = config.optimize?.countries;
  if (optimizeCountries) {
    optimize.countries = optimizeCountries;
    hasOptimizeConfig = true;
  }
  const optimizeSimple = config.optimize?.simple;
  if (optimizeSimple) {
    optimize.simple = optimizeSimple;
    hasOptimizeConfig = true;
  }
  if (hasOptimizeConfig) {
    cleanedConfig.optimize = optimize as OptimizeSettings;
  }

  const voucherNetwork: {
    settingType?: SettingsType;
    simple?: VoucherNetworkLanguage;
    cookieTracking?: boolean;
    countries?: VoucherNetworkSettingsCountries["countries"];
  } = {};
  let hasVoucherNetworkConfig = false;
  const voucherNetworkSettingType = config.voucherNetwork?.settingType;
  if (voucherNetworkSettingType) {
    voucherNetwork.settingType = voucherNetworkSettingType;
    hasVoucherNetworkConfig = true;
  }
  const voucherNetworkSimple = config.voucherNetwork?.simple;
  if (voucherNetworkSimple) {
    voucherNetwork.simple = voucherNetworkSimple;
    hasVoucherNetworkConfig = true;
  }
  const voucherNetworkCookieTracking = config.voucherNetwork?.cookieTracking;
  if (voucherNetworkCookieTracking) {
    voucherNetwork.cookieTracking = voucherNetworkCookieTracking;
    hasVoucherNetworkConfig = true;
  }
  const voucherNetworkCountries = config.voucherNetwork?.countries;
  if (voucherNetworkCountries) {
    voucherNetwork.countries = voucherNetworkCountries;
    hasVoucherNetworkConfig = true;
  }
  if (hasVoucherNetworkConfig) {
    cleanedConfig.voucherNetwork = voucherNetwork as VoucherNetworkSettings;
  }
  return cleanedConfig;
}
