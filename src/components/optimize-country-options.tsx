import type { Dispatch, JSX, SetStateAction } from "react";
import type {
  CountryCodes,
  OptimizeCountry,
  OptimizeSettings,
  OptimizeSettingsCountries,
  SovendusAppSettings,
} from "sovendus-integration-types";
import { COUNTRIES, SettingsType } from "sovendus-integration-types";

import { cn } from "../utils/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./shadcn/accordion";
import { Badge } from "./shadcn/badge";
import { Input } from "./shadcn/input";
import { Label } from "./shadcn/label";
import { Switch } from "./shadcn/switch";

type CountryOptionsProps = {
  currentSettings: OptimizeSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  countryCodes: CountryCodes[];
};

export function CountryOptions({
  currentSettings,
  setCurrentSettings,
  countryCodes,
}: CountryOptionsProps): JSX.Element {
  const getCountryStatus = (countryKey: CountryCodes): string => {
    const country = currentSettings?.countries?.ids?.[countryKey];
    if (!country?.optimizeId) {
      return "Not configured";
    }
    if (!country.isEnabled) {
      return "Disabled";
    }
    return `Optimize ID: ${country.optimizeId}`;
  };

  const handleEnabledChange = (
    countryKey: CountryCodes,
    checked: boolean,
  ): void => {
    setCurrentSettings((prevState) => {
      return {
        ...prevState,
        optimize: {
          settingsType: SettingsType.COUNTRY,
          ...prevState.optimize,
          countries: {
            fallBackEnabled: false,
            fallBackId: undefined,
            ...prevState.optimize?.countries?.ids,
            ids: {
              ...prevState.optimize?.countries?.ids,
              [countryKey]: {
                ...prevState.optimize?.countries?.ids[countryKey],
                isEnabled: isOptimizeElementEnabled(
                  prevState.optimize?.countries?.ids[countryKey],
                  checked,
                ),
              },
            },
          },
        } as OptimizeSettingsCountries,
      } satisfies SovendusAppSettings;
    });
  };

  const handleCountryChange = (
    countryKey: CountryCodes,
    newOptimizeId: string | number,
  ): void => {
    const newOptimizeIdString = String(newOptimizeId);
    setCurrentSettings((prevState) => {
      if (
        prevState.optimize?.countries?.ids[countryKey]?.optimizeId !==
        newOptimizeIdString
      ) {
        const newCountrySettings = {
          ...prevState.optimize?.countries?.ids[countryKey],
          optimizeId: newOptimizeIdString,
          isEnabled: !!newOptimizeIdString,
        };
        newCountrySettings.isEnabled = isOptimizeElementEnabled(
          newCountrySettings,
          !!newOptimizeIdString,
        );

        return {
          ...prevState,
          optimize: {
            ...prevState.optimize,
            settingsType: SettingsType.COUNTRY,
            countries: {
              fallBackEnabled: false,
              fallBackId: undefined,
              ...prevState.optimize?.countries?.ids,
              ids: {
                ...prevState.optimize?.countries?.ids,
                [countryKey]: newCountrySettings,
              },
            },
          } as OptimizeSettingsCountries,
        } satisfies SovendusAppSettings;
      }
      return prevState;
    });
  };

  return (
    <Accordion type="single" collapsible className={cn("tw:w-full")}>
      {countryCodes.map((countryKey) => (
        <AccordionItem value={countryKey} key={countryKey}>
          <AccordionTrigger>
            <div
              className={cn(
                "tw:flex tw:items-center tw:justify-between tw:w-full",
              )}
            >
              <span>{COUNTRIES[countryKey]}</span>
              <div className={cn("tw:flex tw:items-center tw:space-x-2")}>
                <span className={cn("tw:text-sm tw:text-muted-foreground")}>
                  {getCountryStatus(countryKey)}
                </span>
                {isOptimizeElementEnabled(
                  currentSettings?.countries?.ids[countryKey],
                ) && (
                  <Badge variant="outline" className={cn("tw:ml-2")}>
                    Enabled
                  </Badge>
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className={cn("tw:space-y-4 tw:mx-1")}>
              <div className={cn("tw:flex tw:items-center tw:space-x-2")}>
                <Switch
                  id={`${countryKey}-enabled`}
                  checked={
                    currentSettings?.countries?.ids[countryKey]?.isEnabled ||
                    false
                  }
                  onCheckedChange={(checked): void =>
                    handleEnabledChange(countryKey, checked)
                  }
                />
                <label htmlFor={`${countryKey}-enabled`}>
                  Enable for {COUNTRIES[countryKey]}
                </label>
              </div>
              <div className={cn("tw:space-y-2")}>
                <Label htmlFor={`${countryKey}-id`}>Optimize ID</Label>
                <Input
                  id={`${countryKey}-id`}
                  value={
                    currentSettings?.countries?.ids[countryKey]?.optimizeId ||
                    ""
                  }
                  onChange={(e): void =>
                    handleCountryChange(countryKey, e.target.value)
                  }
                  placeholder="Enter Optimize ID"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function EnabledOptimizeCountries({
  currentSettings,
}: {
  currentSettings: OptimizeSettings | undefined;
}): JSX.Element {
  let statusMessage: string;
  if (isOptimizeSimpleEnabled(currentSettings)) {
    statusMessage = `Enabled in all Countries (${currentSettings?.simple!.optimizeId})`;
  } else if (
    currentSettings?.countries?.ids &&
    currentSettings?.settingsType === SettingsType.COUNTRY
  ) {
    const enabledCountries = currentSettings?.countries?.ids
      ? Object.entries(currentSettings?.countries?.ids)
          .filter(
            ([countryKey, data]) =>
              isOptimizeElementEnabled(data) &&
              COUNTRIES[countryKey as CountryCodes],
          )
          .map(([countryKey]) => COUNTRIES[countryKey as CountryCodes])
          .join(", ")
      : undefined;
    statusMessage = enabledCountries
      ? `Enabled for: ${enabledCountries}`
      : "No countries enabled";
  } else {
    statusMessage = "No countries enabled";
  }

  return (
    <p
      className={cn(
        "tw:text-sm",
        isOptimizeEnabled(currentSettings)
          ? "tw:text-green-600"
          : "tw:text-red-600",
      )}
    >
      {statusMessage}
    </p>
  );
}

export function isOptimizeElementEnabled(
  currentSettings: OptimizeCountry | undefined,
  newEnableState?: boolean,
): boolean {
  if (
    currentSettings?.optimizeId &&
    typeof currentSettings.optimizeId !== "string"
  ) {
    throw new Error("optimizeId must be a string");
  }
  return !!(
    (newEnableState !== undefined
      ? newEnableState
      : currentSettings?.isEnabled) &&
    currentSettings?.optimizeId &&
    !/^\d+$/.test(currentSettings.optimizeId)
  );
}

export function isOptimizeEnabled(
  currentSettings: OptimizeSettings | undefined,
): boolean {
  return !!(
    isOptimizeSimpleEnabled(currentSettings) ||
    isOptimizeCountryEnabled(currentSettings)
  );
}

export function isOptimizeCountryEnabled(
  currentSettings: OptimizeSettings | undefined,
): boolean {
  return !!(
    currentSettings?.settingsType === SettingsType.COUNTRY &&
    currentSettings?.countries?.ids &&
    Object.values(currentSettings.countries.ids).some((country) =>
      isOptimizeElementEnabled(country),
    )
  );
}

export function isOptimizeSimpleEnabled(
  currentSettings: OptimizeSettings | undefined,
): boolean {
  return !!(
    currentSettings?.settingsType === SettingsType.SIMPLE &&
    isOptimizeElementEnabled(currentSettings?.simple)
  );
}
