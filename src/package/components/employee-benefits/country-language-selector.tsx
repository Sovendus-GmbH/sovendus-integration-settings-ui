"use client";

import { ChevronLeft, Globe } from "lucide-react";
import { type JSX, useEffect, useState } from "react";
import {
  COUNTRIES,
  CountryCodes,
  LanguageCodes,
} from "sovendus-integration-types";
import { LANGUAGES_BY_COUNTRIES } from "sovendus-integration-types";

import { loggerError } from "../../utils/utils";
import { Button } from "../shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";

interface CountryLanguageSelectorProps {
  selectedOption?: `${CountryCodes}-${LanguageCodes}` | undefined;
  onOptionChange: (
    option: `${CountryCodes}-${LanguageCodes}` | undefined,
  ) => void;
  onSelectComplete?: (link: string) => void;
  compact?: boolean;
  buttonLabel?: string;
}

export function CountryLanguageSelector({
  selectedOption,
  onOptionChange,
  onSelectComplete,
  compact = false,
  buttonLabel = "View Available Benefits",
}: CountryLanguageSelectorProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selectionStep, setSelectionStep] = useState<"country" | "language">(
    "country",
  );
  const [selectedCountry, setSelectedCountry] = useState<CountryCodes | null>(
    selectedOption ? (selectedOption.split("-")[0] as CountryCodes) : null,
  );

  // Get rewards link based on the selected country/language
  const getRewardsLink = (): string => {
    if (!selectedOption) {
      return "";
    }

    const [country, language] = selectedOption.split("-") as [
      CountryCodes,
      LanguageCodes,
    ];
    const countryData = linksByCountry[country];
    if (typeof countryData === "string") {
      return countryData;
    }
    if (typeof countryData === "object" && language) {
      const link = countryData[language];
      if (link) {
        return link;
      }
    }
    loggerError(
      `SovendusEmployeeBenefits: No link found for country ${country} and language ${language}`,
    );
    return "";
  };

  // Handle country selection
  const handleCountrySelect = (country: CountryCodes): void => {
    setSelectedCountry(country);
    const languages = LANGUAGES_BY_COUNTRIES[country];

    // If country has only one language, auto-select it
    if (languages && Object.keys(languages).length === 1) {
      const languageCode = Object.keys(languages)[0] as LanguageCodes;
      onOptionChange(`${country}-${languageCode}`);
      setIsOpen(false);
    } else {
      // Otherwise, move to language selection
      setSelectionStep("language");
    }
  };

  // Handle language selection
  const handleLanguageSelect = (
    country: CountryCodes,
    languageCode: LanguageCodes,
  ): void => {
    onOptionChange(`${country}-${languageCode}`);
    setIsOpen(false);
    setSelectionStep("country"); // Reset for next open
  };

  // Back to country selection
  const handleBackToCountries = (): void => {
    setSelectionStep("country");
  };

  // Format display text for selected option
  const getDisplayText = (): JSX.Element => {
    if (!selectedOption) {
      return <span>Choose region</span>;
    }

    const [country, language] = selectedOption.split("-") as [
      CountryCodes,
      LanguageCodes,
    ];
    const languageName = LANGUAGES_BY_COUNTRIES[country][language];

    return (
      <span className="tw:flex tw:items-center">
        <span className="tw:mr-1.5 tw:text-lg">{getCountryFlag(country)}</span>
        <span>{`${country}${languageName !== country ? ` - ${languageName}` : ""}`}</span>
      </span>
    );
  };

  // Reset to country view when popover closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectionStep("country");
      }, 300);
    }
  }, [isOpen]);

  // Update selected country when external option changes
  useEffect(() => {
    if (selectedOption) {
      setSelectedCountry(selectedOption.split("-")[0] as CountryCodes);
    }
  }, [selectedOption]);

  return (
    <div className="tw:w-full tw:space-y-3">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className={`tw:w-full tw:justify-between tw:border-blue-200 ${
              compact ? "tw:px-3 tw:py-1.5 tw:text-sm" : "tw:px-4 tw:py-2"
            }`}
          >
            <div className="tw:flex tw:items-center tw:gap-2">
              <Globe className="tw:h-4 tw:w-4 tw:text-blue-500" />
              {getDisplayText()}
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tw:h-4 tw:w-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="tw:w-[280px] sm:tw:w-[320px] tw:p-0 tw:overflow-hidden"
          align="start"
        >
          {selectionStep === "country" ? (
            <div className="tw:max-h-[350px] tw:overflow-y-auto">
              <div className="tw:sticky tw:top-0 tw:z-10 tw:bg-gray-50 tw:px-3 tw:py-2 tw:border-b tw:border-gray-100">
                <h4 className="tw:font-medium tw:text-base tw:text-gray-700">
                  Select Country
                </h4>
              </div>
              <div className="tw:p-2">
                {Object.keys(LANGUAGES_BY_COUNTRIES).map((countryCode) => (
                  <button
                    key={countryCode}
                    onClick={() =>
                      handleCountrySelect(countryCode as CountryCodes)
                    }
                    className="tw:flex tw:items-center tw:w-full tw:px-3 tw:py-2.5 tw:mb-0.5 tw:rounded-md tw:transition-colors tw:text-left hover:tw:bg-gray-50"
                  >
                    <span className="tw:text-xl tw:mr-3 tw:flex-shrink-0">
                      {getCountryFlag(countryCode as CountryCodes)}
                    </span>
                    <span className="tw:text-sm tw:font-medium tw:text-gray-800">
                      {COUNTRIES[countryCode as CountryCodes]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            selectedCountry && (
              <div className="tw:max-h-[350px] tw:overflow-y-auto">
                <div className="tw:sticky tw:top-0 tw:z-10 tw:bg-blue-50 tw:px-3 tw:py-3 tw:border-b tw:border-blue-100">
                  <button
                    onClick={handleBackToCountries}
                    className="tw:inline-flex tw:items-center tw:mb-2 tw:px-2 tw:py-1 tw:rounded-md tw:text-blue-600 tw:text-sm hover:tw:bg-blue-100"
                  >
                    <ChevronLeft className="tw:h-3.5 tw:w-3.5 tw:mr-1" />
                    Back to countries
                  </button>
                  <div className="tw:flex tw:items-center">
                    <span className="tw:text-2xl tw:mr-3">
                      {getCountryFlag(selectedCountry)}
                    </span>
                    <h4 className="tw:font-medium tw:text-base tw:text-gray-800">
                      {selectedCountry}
                    </h4>
                  </div>
                </div>
                <div className="tw:p-2">
                  <p className="tw:px-3 tw:py-2 tw:text-sm tw:text-gray-500">
                    Choose your language:
                  </p>
                  {Object.entries(LANGUAGES_BY_COUNTRIES[selectedCountry]).map(
                    ([langCode, langName]) => (
                      <button
                        key={`${selectedCountry}-${langCode}`}
                        onClick={() =>
                          handleLanguageSelect(
                            selectedCountry,
                            langCode as LanguageCodes,
                          )
                        }
                        className="tw:flex tw:items-center tw:w-full tw:py-3 tw:px-4 tw:mb-1 tw:rounded-md
                        tw:bg-white tw:border tw:border-gray-100 hover:tw:bg-blue-50 hover:tw:border-blue-200"
                      >
                        <span className="tw:text-sm tw:font-medium tw:text-gray-800">
                          {langName}
                        </span>
                      </button>
                    ),
                  )}
                </div>
              </div>
            )
          )}
        </PopoverContent>
      </Popover>

      {/* Action Button - Always visible */}
      <Button
        className={`tw:w-full tw:justify-center tw:gap-1 ${selectedOption ? "tw:bg-blue-600 tw:text-white hover:tw:bg-blue-700" : "tw:bg-blue-100 tw:text-blue-700 hover:tw:bg-blue-200"} ${
          compact ? "tw:py-1.5 tw:text-sm" : ""
        }`}
        onClick={() => {
          if (selectedOption && onSelectComplete) {
            const link = getRewardsLink();
            if (link) {
              onSelectComplete(link);
            }
          } else {
            // If no country is selected, open the dropdown
            setIsOpen(true);
          }
        }}
      >
        <Globe className={compact ? "tw:h-3.5 tw:w-3.5" : "tw:h-4 tw:w-4"} />
        <span>{selectedOption ? buttonLabel : "Select Your Region"}</span>
      </Button>
    </div>
  );
}

// Helper function to get country flags
function getCountryFlag(countryCode: CountryCodes): string {
  const flagEmojis: {
    [country in CountryCodes]: string;
  } = {
    [CountryCodes.DE]: "🇩🇪",
    [CountryCodes.AT]: "🇦🇹",
    [CountryCodes.CH]: "🇨🇭",
    [CountryCodes.FR]: "🇫🇷",
    [CountryCodes.IT]: "🇮🇹",
    [CountryCodes.NL]: "🇳🇱",
    [CountryCodes.GB]: "🇬🇧",
    [CountryCodes.ES]: "🇪🇸",
    [CountryCodes.BE]: "🇧🇪",
    [CountryCodes.DK]: "🇩🇰",
    [CountryCodes.IE]: "🇮🇪",
    [CountryCodes.NO]: "🇳🇴",
    [CountryCodes.PL]: "🇵🇱",
    [CountryCodes.SE]: "🇸🇪",
  };

  return flagEmojis[countryCode] || "🌐";
}

const linksByCountry: {
  [country in CountryCodes]:
    | string
    | {
        [language in LanguageCodes]?: string;
      };
} = {
  [CountryCodes.DE]:
    "https://sovendus.com/campaign/directlink/37258fe9-b7bc-40a9-88dc-8b57098d2445",
  [CountryCodes.AT]:
    "https://sovendus.com/campaign/directlink/64469b39-4268-4611-9dab-88ac63550f37",
  [CountryCodes.BE]: {
    [LanguageCodes.FR]:
      "https://sovendus.com/campaign/directlink/fdafcb18-b07f-4d7c-a52a-8f6c73b7fdd9",
    [LanguageCodes.NL]:
      "https://sovendus.com/campaign/directlink/df205a6f-a358-471c-9332-52eea5c5ff48",
  },
  [CountryCodes.DK]:
    "https://sovendus.com/campaign/directlink/285632f0-ec83-4871-a277-2b8c3eef6108",
  [CountryCodes.FR]:
    "https://sovendus.com/campaign/directlink/335b5b71-b63e-4566-bc28-be4af0e3813b",
  [CountryCodes.IE]:
    "https://sovendus.com/campaign/directlink/8d778134-8af1-4576-806f-81c5c95d73b3",
  [CountryCodes.IT]:
    "https://sovendus.com/campaign/directlink/e98c91a3-cea2-41d5-ae06-65d62e19c565",
  [CountryCodes.NL]:
    "https://sovendus.com/campaign/directlink/23682cb6-2471-4fcc-a043-447f2b2d128c",
  [CountryCodes.NO]:
    "https://sovendus.com/campaign/directlink/bdfcf862-49f1-4003-82c4-473ba87c8c29",
  [CountryCodes.PL]:
    "https://sovendus.com/campaign/directlink/891bb4df-ea48-43ff-86f2-32514b8fbb68",
  [CountryCodes.ES]:
    "https://sovendus.com/campaign/directlink/880d5cfc-ed58-46aa-b907-dfade732e60c",
  [CountryCodes.SE]:
    "https://sovendus.com/campaign/directlink/eb8ac7e7-8135-4328-b3a4-90e43f9e8a95",
  [CountryCodes.CH]: {
    [LanguageCodes.DE]:
      "https://sovendus.com/campaign/directlink/2e7f5cf0-7fbe-4f1a-9337-ff5e214f049b",
    [LanguageCodes.FR]:
      "https://sovendus.com/campaign/directlink/9a7e13af-9bfc-4a0c-8f3b-f4aeed11a39a",
    [LanguageCodes.IT]:
      "https://sovendus.com/campaign/directlink/b2af35cd-339a-4f67-a9c3-89fcde9df5c1",
  },
  [CountryCodes.GB]:
    "https://sovendus.com/campaign/directlink/ddd1da8f-cae9-488a-9ab1-90b8f5692853",
};
