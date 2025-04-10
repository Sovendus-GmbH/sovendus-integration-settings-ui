"use client";

import { CheckCircle, ChevronRight, Gift, Globe } from "lucide-react";
import { type JSX, useState } from "react";
import { LanguageCodes } from "sovendus-integration-types";
import { CountryCodes } from "sovendus-integration-types";
import { LANGUAGES_BY_COUNTRIES } from "sovendus-integration-types";

import { loggerError } from "../../utils/utils";
import { Button } from "../shadcn/button";
import { Label } from "../shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";

type SovendusEmployeeBenefitsSelectorProps =
  | {
      countryCode?: never;
      languageCode?: never;
    }
  | {
      countryCode: CountryCodes;
      languageCode: LanguageCodes;
    };

export function SovendusEmployeeBenefitsSelector({
  countryCode,
  languageCode,
}: SovendusEmployeeBenefitsSelectorProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<
    `${CountryCodes}-${LanguageCodes}` | undefined
  >(countryCode && languageCode && `${countryCode}-${languageCode}`);

  const getRewardsLink = (): string => {
    const [country, language] = selectedOption?.split("-") as [
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
    setSelectedOption(undefined);
    return "";
  };

  return (
    <div className="tw:mb-4 tw:rounded-lg tw:border tw:border-blue-100 tw:bg-blue-50 tw:p-4">
      <div className="tw:flex tw:items-center">
        <Gift className="tw:mr-3 tw:h-5 tw:w-5 tw:text-blue-600" />
        <h3 className="tw:font-medium tw:text-blue-800">
          Employee Benefits by Sovendus
        </h3>
      </div>

      <p className="tw:mt-2 tw:text-sm tw:text-blue-700">
        Access exclusive discounts and offers for employees. Select your region
        to view personalized deals.
      </p>

      <div className="tw:mt-3 tw:grid tw:grid-cols-2 tw:gap-2">
        {[
          "Brand discounts up to 70%",
          "Travel & leisure savings",
          "Weekly updated offers",
          "Exclusive employee deals",
        ].map((benefit, index) => (
          <div
            key={index}
            className="tw:flex tw:items-center tw:text-xs tw:text-blue-700"
          >
            <CheckCircle className="tw:mr-1.5 tw:h-3 tw:w-3 tw:text-blue-500" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      <div className="tw:mt-4 tw:space-y-3">
        <div>
          <Label
            htmlFor="region-select"
            className="tw:mb-1.5 tw:block tw:text-sm tw:text-blue-700"
          >
            Select your region:
          </Label>
          <Select onValueChange={setSelectedOption as (value: string) => void}>
            <SelectTrigger
              id="region-select"
              className="tw:h-9 tw:border-blue-200 tw:bg-white tw:text-gray-800 focus:tw:ring-blue-400"
            >
              <SelectValue placeholder="Choose your location" />
            </SelectTrigger>
            <SelectContent className="tw:max-h-60">
              {Object.entries(LANGUAGES_BY_COUNTRIES).map(
                ([countryCode, languages]) =>
                  Object.entries(languages).map(([langCode, name]) => (
                    <SelectItem
                      key={`${countryCode}-${langCode}`}
                      value={`${countryCode}-${langCode}`}
                    >
                      <div className="tw:flex tw:items-center">
                        <img
                          src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                          alt={`${name} flag`}
                          className="tw:mr-2 tw:h-3.5 tw:w-5 tw:rounded-sm tw:border tw:border-gray-100"
                        />
                        <span>{name}</span>
                      </div>
                    </SelectItem>
                  )),
              )}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={(): void => void window.open(getRewardsLink(), "_blank")}
          disabled={!selectedOption}
          className={`
                  tw:flex tw:w-full tw:items-center tw:justify-center
                  tw:rounded-md tw:bg-blue-600 tw:py-2 tw:text-sm tw:font-medium tw:text-white
                  tw:transition-all tw:duration-200
                  hover:tw:bg-blue-700 focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-blue-500 focus:tw:ring-offset-2
                  disabled:tw:bg-gray-300 disabled:tw:text-gray-500 disabled:tw:cursor-not-allowed
                `}
        >
          {selectedOption
            ? "Access Employee Discounts"
            : "Select a Region First"}
          <ChevronRight className="tw:ml-2 tw:h-4 tw:w-4" />
        </Button>

        {selectedOption && (
          <p className="tw:text-center tw:text-xs tw:text-blue-600">
            <CheckCircle className="tw:mr-1 tw:inline-block tw:h-3 tw:w-3" />
            Opens in a new window with immediate access
          </p>
        )}

        <div className="tw:mt-2 tw:flex tw:items-center tw:justify-center tw:text-xs tw:text-blue-600">
          <Globe className="tw:mr-1.5 tw:h-3.5 tw:w-3.5" />
          <span>Offers vary by region and are updated regularly</span>
        </div>
      </div>
    </div>
  );
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
