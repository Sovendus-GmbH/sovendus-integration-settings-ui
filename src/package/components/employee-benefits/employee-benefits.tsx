"use client";

import { Gift, Globe, Sparkles, Tag, Zap } from "lucide-react";
import { type JSX, useEffect, useState } from "react";
import type { CountryCodes, LanguageCodes } from "sovendus-integration-types";

import { CountryLanguageSelector } from "./country-language-selector";

type SovendusEmployeeBenefitsSelectorProps =
  | {
      countryCode?: never;
      languageCode?: never;
      hideTitle?: boolean;
    }
  | {
      countryCode: CountryCodes;
      languageCode: LanguageCodes;
      hideTitle?: boolean;
    };

export function SovendusEmployeeBenefitsSelector({
  countryCode,
  languageCode,
  hideTitle = false,
}: SovendusEmployeeBenefitsSelectorProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<
    `${CountryCodes}-${LanguageCodes}` | undefined
  >(countryCode && languageCode ? `${countryCode}-${languageCode}` : undefined);
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Add a highlight effect when component mounts
  useEffect(() => {
    setIsHighlighted(true);
    const timer = setTimeout(() => setIsHighlighted(false), 1500);
    return (): void => clearTimeout(timer);
  }, []);

  // Determine if we should show a pulsing effect on the CTA
  const showPulsingEffect = !selectedOption;

  // Benefits data with icons
  const benefits = [
    {
      icon: <Tag className="tw:h-4 tw:w-4 tw:text-blue-600" />,
      text: "Brand discounts up to 70%",
    },
    {
      icon: <Globe className="tw:h-4 tw:w-4 tw:text-blue-600" />,
      text: "Travel & leisure savings",
    },
    {
      icon: <Zap className="tw:h-4 tw:w-4 tw:text-blue-600" />,
      text: "Weekly updated offers",
    },
    {
      icon: <Gift className="tw:h-4 tw:w-4 tw:text-blue-600" />,
      text: "Exclusive employee deals",
    },
  ];

  return (
    <div
      className={`tw:rounded-lg tw:border tw:shadow-md tw:overflow-hidden tw:transition-all tw:duration-300 ${isHighlighted ? "tw:border-blue-400 tw:shadow-blue-100" : "tw:border-blue-100"}`}
    >
      {/* Header with gradient background */}
      <div className="tw:bg-gradient-to-r tw:from-blue-500 tw:to-blue-600 tw:px-4 tw:py-3 tw:text-white">
        <div className="tw:flex tw:items-center tw:justify-between">
          <div className="tw:flex tw:items-center">
            <div className="tw:flex tw:h-8 tw:w-8 tw:flex-shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:bg-white">
              <Gift className="tw:h-4 tw:w-4 tw:text-blue-500" />
            </div>
            <div className="tw:ml-3">
              <h3 className="tw:font-medium tw:text-white">
                Employee Benefits by Sovendus
              </h3>
              <p className="tw:text-xs tw:text-blue-100 tw:mt-0.5">
                Exclusive discounts for your team
              </p>
            </div>
          </div>
          <Sparkles className="tw:h-5 tw:w-5 tw:text-yellow-200" />
        </div>
      </div>

      {/* Content area */}
      <div className="tw:bg-white tw:p-4">
        {!hideTitle && (
          <p className="tw:text-sm tw:text-gray-600 tw:mb-4">
            Access exclusive discounts and offers for employees. Select your
            region to view personalized deals tailored to your location.
          </p>
        )}

        {/* Benefits list with improved styling */}
        {!hideTitle && (
          <div className="tw:mb-4 tw:grid tw:grid-cols-2 tw:gap-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="tw:flex tw:items-center tw:bg-blue-50 tw:rounded-md tw:p-2 tw:text-sm tw:text-blue-800"
              >
                <div className="tw:mr-2 tw:flex-shrink-0">{benefit.icon}</div>
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Country selector with state management */}
        <div
          className={`${!hideTitle ? "tw:mt-4" : ""} ${showPulsingEffect ? "tw:relative" : ""}`}
        >
          {showPulsingEffect && (
            <div className="tw:absolute tw:inset-0 tw:rounded-md tw:animate-pulse tw:bg-blue-200 tw:opacity-30 tw:pointer-events-none" />
          )}
          <CountryLanguageSelector
            selectedOption={selectedOption}
            onOptionChange={(option) => {
              setSelectedOption(option);
            }}
            onSelectComplete={(link) => {
              if (link) {
                window.open(link, "_blank");
              }
            }}
            buttonLabel="Access Employee Benefits"
          />
        </div>
      </div>
    </div>
  );
}
