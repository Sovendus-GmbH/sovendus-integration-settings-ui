import type { Dispatch, JSX, SetStateAction } from "react";
import type {
  CountryCodes,
  LanguageCodes,
  SovendusAppSettings,
  VoucherNetworkLanguage,
  VoucherNetworkSettings,
  VoucherNetworkSettingsCountries,
} from "sovendus-integration-types";
import {
  LANGUAGES_BY_COUNTRIES,
  SettingsType,
} from "sovendus-integration-types";

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
  currentSettings: VoucherNetworkSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  countryCodes: CountryCodes[];
};

export function CountryOptions({
  currentSettings,
  setCurrentSettings,
  countryCodes,
}: CountryOptionsProps): JSX.Element {
  const getCountryStatus = (
    countryKey: CountryCodes,
    languageKey: LanguageCodes,
  ): string => {
    const country =
      currentSettings?.countries?.ids?.[countryKey]?.languages[languageKey];
    if (!country?.trafficMediumNumber || !country?.trafficSourceNumber) {
      return "Not configured";
    }
    if (!country?.isEnabled) {
      return "Disabled";
    }
    return `Source: ${country.trafficSourceNumber}, Medium: ${country.trafficMediumNumber}`;
  };

  const isCountryEnabled = (
    country: VoucherNetworkLanguage | undefined,
    isEnabled?: boolean,
  ): boolean => {
    const _isEnabled = !!(
      (isEnabled !== undefined ? isEnabled : country?.isEnabled) &&
      country?.trafficSourceNumber &&
      country?.trafficMediumNumber
    );
    return _isEnabled;
  };
  const handleEnabledChange = (
    countryKey: CountryCodes,
    languageKey: LanguageCodes,
    checked: boolean,
  ): void => {
    setCurrentSettings((prevState) => {
      const element =
        prevState.voucherNetwork?.countries?.ids?.[countryKey]?.languages?.[
          languageKey
        ];
      if (element) {
        const newState: SovendusAppSettings = {
          ...prevState,
          voucherNetwork: {
            ...prevState.voucherNetwork,
            countries: {
              fallBackIds: undefined,
              iframeContainerQuerySelector: undefined,
              ...prevState.voucherNetwork?.countries,
              ids: {
                ...prevState.voucherNetwork?.countries?.ids,
                [countryKey]: {
                  ...prevState.voucherNetwork?.countries?.ids?.[countryKey],
                  languages: {
                    ...prevState.voucherNetwork?.countries?.ids?.[countryKey]
                      ?.languages,
                    [languageKey]: {
                      ...element,
                      isEnabled: checked,
                    },
                  },
                },
              },
            },
          } as VoucherNetworkSettingsCountries,
        };
        return newState;
      }
      return prevState;
    });
  };
  const handleIdChange = (
    countryKey: CountryCodes,
    languageKey: LanguageCodes,
    field: "trafficSourceNumber" | "trafficMediumNumber",
    value: string,
  ): void => {
    setCurrentSettings((prevState) => {
      const newValue = parseInt(`${value}`, 10);
      const cleanedValue = isNaN(parseInt(String(newValue), 10))
        ? ""
        : String(newValue);
      const element =
        prevState.voucherNetwork?.countries?.ids?.[countryKey]?.languages?.[
          languageKey
        ];
      if (element?.[field] !== cleanedValue) {
        const newElement: VoucherNetworkLanguage = {
          iframeContainerQuerySelector: undefined,
          trafficMediumNumber: "",
          trafficSourceNumber: "",
          isEnabled: false,
          ...element,
          [field]: cleanedValue,
        };
        const isEnabled = isCountryEnabled(newElement, true);
        const newState: SovendusAppSettings = {
          ...prevState,
          voucherNetwork: {
            ...prevState.voucherNetwork,
            settingType: SettingsType.COUNTRY,
            cookieTracking: true,
            countries: {
              ...prevState.voucherNetwork?.countries,
              fallBackIds: undefined,
              iframeContainerQuerySelector: undefined,
              ids: {
                ...prevState.voucherNetwork?.countries?.ids,
                [countryKey]: {
                  ...prevState.voucherNetwork?.countries?.ids?.[countryKey],
                  languages: {
                    ...prevState.voucherNetwork?.countries?.ids?.[countryKey]
                      ?.languages,
                    [languageKey]: {
                      ...newElement,
                      isEnabled,
                    },
                  },
                },
              },
            },
          } as VoucherNetworkSettingsCountries,
        };
        return newState;
      }
      return prevState;
    });
  };
  return (
    <Accordion type="single" collapsible className={cn("tw:w-full")}>
      {countryCodes.map((countryKey) =>
        Object.entries(LANGUAGES_BY_COUNTRIES[countryKey]).map(
          ([languageKey, countryName]) => (
            <CountrySettings
              key={`${countryKey}-${languageKey}`}
              countryKey={countryKey}
              languageKey={languageKey as LanguageCodes}
              countryName={countryName}
              currentSettings={currentSettings}
              getCountryStatus={getCountryStatus}
              isCountryEnabled={isCountryEnabled}
              handleEnabledChange={handleEnabledChange}
              handleIdChange={handleIdChange}
            />
          ),
        ),
      )}
    </Accordion>
  );
}

function CountrySettings({
  countryName,
  currentSettings,
  countryKey,
  languageKey,
  getCountryStatus,
  isCountryEnabled,
  handleEnabledChange,
  handleIdChange,
}: {
  countryKey: CountryCodes;
  languageKey: LanguageCodes;
  countryName: string;
  currentSettings: VoucherNetworkSettings | undefined;
  getCountryStatus: (
    countryKey: CountryCodes,
    languageKey: LanguageCodes,
  ) => string;
  isCountryEnabled: (language: VoucherNetworkLanguage | undefined) => boolean;
  handleEnabledChange: (
    countryKey: CountryCodes,
    languageKey: LanguageCodes,
    checked: boolean,
  ) => void;
  handleIdChange: (
    countryKey: CountryCodes,
    languageKey: LanguageCodes,
    field: "trafficSourceNumber" | "trafficMediumNumber",
    value: string,
  ) => void;
}): JSX.Element {
  const currentElement =
    currentSettings?.countries?.ids?.[countryKey]?.languages?.[languageKey];
  const isEnabled = isCountryEnabled(currentElement);
  const trafficSourceNumber = parseInt(
    currentElement?.trafficSourceNumber || "",
  );
  const trafficMediumNumber = parseInt(
    currentElement?.trafficMediumNumber || "",
  );
  return (
    <AccordionItem value={countryKey} key={countryKey}>
      <AccordionTrigger>
        <div
          className={cn("tw:flex tw:items-center tw:justify-between tw:w-full")}
        >
          <span>{countryName}</span>
          <div className={cn("tw:flex tw:items-center tw:space-x-2")}>
            <span className={cn("tw:text-sm tw:text-muted-foreground")}>
              {getCountryStatus(countryKey, languageKey)}
            </span>
            {isEnabled && (
              <Badge
                variant={"default"}
                className={cn(
                  "tw:ml-2 tw:bg-green-100 tw:text-green-800 tw:hover:bg-green-100",
                )}
              >
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
              checked={isEnabled}
              onCheckedChange={(checked): void =>
                handleEnabledChange(countryKey, languageKey, checked)
              }
            />
            <label htmlFor={`${countryKey}-enabled`}>
              Enable for {countryName}
            </label>
          </div>
          <div className={cn("tw:grid tw:grid-cols-2 tw:gap-4")}>
            <div className={cn("tw:space-y-2")}>
              <Label htmlFor={`${countryKey}-source`}>
                Traffic Source Number
              </Label>
              <Input
                id={`${countryKey}-source`}
                value={trafficSourceNumber || ""}
                onChange={(e): void =>
                  handleIdChange(
                    countryKey,
                    languageKey,
                    "trafficSourceNumber",
                    e.target.value,
                  )
                }
                placeholder="Enter Traffic Source Number"
              />
            </div>
            <div className={cn("tw:space-y-2")}>
              <Label htmlFor={`${countryKey}-medium`}>
                Traffic Medium Number
              </Label>
              <Input
                id={`${countryKey}-medium`}
                value={trafficMediumNumber || ""}
                onChange={(e): void =>
                  handleIdChange(
                    countryKey,
                    languageKey,
                    "trafficMediumNumber",
                    e.target.value,
                  )
                }
                placeholder="Enter Traffic Medium Number"
              />
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export function EnabledVoucherNetworkCountries({
  currentSettings,
}: {
  currentSettings: VoucherNetworkSettings | undefined;
}): JSX.Element {
  const enabledLocales: string[] = [];
  if (currentSettings?.countries?.ids) {
    for (const [countryCode, country] of Object.entries(
      currentSettings.countries.ids,
    )) {
      if (country.languages) {
        for (const [languageKey, language] of Object.entries(
          country.languages,
        )) {
          if (
            language.isEnabled &&
            language.trafficMediumNumber &&
            language.trafficSourceNumber
          ) {
            const countryName = LANGUAGES_BY_COUNTRIES[
              countryCode as CountryCodes
            ][languageKey as LanguageCodes] as string;

            enabledLocales.push(countryName);
          }
        }
      }
    }
  }
  return (
    <p
      className={cn(
        "tw:text-sm",
        isVnEnabled(currentSettings) ? "tw:text-green-600" : "tw:text-red-600",
      )}
    >
      {enabledLocales.length > 0 ? (
        <>
          <span>Enabled for: </span>
          {enabledLocales.join(", ")}
        </>
      ) : (
        <span>No countries enabled</span>
      )}
    </p>
  );
}

export function isVnEnabled(
  currentSettings: VoucherNetworkSettings | undefined,
  isEnabled?: boolean,
): boolean {
  return currentSettings?.countries?.ids
    ? Object.values(currentSettings.countries?.ids).some((country) =>
        Object.values(country.languages)?.some(
          (lang) =>
            (isEnabled !== undefined ? isEnabled : lang.isEnabled) &&
            lang.trafficMediumNumber &&
            lang.trafficSourceNumber,
        ),
      )
    : false;
}
