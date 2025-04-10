"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Gift,
  Globe,
  Info,
  ShoppingBag,
  Star,
  Tag,
} from "lucide-react";
import { type JSX, useEffect, useRef, useState } from "react";
import { CountryCodes, LanguageCodes } from "sovendus-integration-types";
import {
  type EmployeeBenefitsSettings,
  LANGUAGES_BY_COUNTRIES,
} from "sovendus-integration-types";

import { loggerError } from "../../utils/utils";
import { Button } from "../shadcn/button";
import { Card, CardContent } from "../shadcn/card";
import { Label } from "../shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";

interface SovendusEmployeeBenefitsFullPageProps {
  currentSettings?: EmployeeBenefitsSettings | undefined;
}

export function SovendusEmployeeBenefitsFullPage(
  _props: SovendusEmployeeBenefitsFullPageProps,
): JSX.Element {
  const [selectedOption, setSelectedOption] =
    useState<`${CountryCodes}-${LanguageCodes}`>();
  const [showFireworks, setShowFireworks] = useState(false);
  const [activeView, setActiveView] = useState<"selector" | "benefits">(
    "selector",
  );
  const [benefitsUrl, setBenefitsUrl] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample featured offers
  const featuredOffers = [
    {
      title: "Online Shopping",
      discount: "Up to 70% off",
      icon: <ShoppingBag className="tw:h-4 tw:w-4" />,
    },
    {
      title: "Hotel Bookings",
      discount: "25% discount",
      icon: <Star className="tw:h-4 tw:w-4" />,
    },
    {
      title: "Subscription Services",
      discount: "3 months free",
      icon: <Tag className="tw:h-4 tw:w-4" />,
    },
    {
      title: "Electronics",
      discount: "Special employee pricing",
      icon: <Info className="tw:h-4 tw:w-4" />,
    },
  ];

  // Get rewards link based on the selected country/language
  const getRewardsLink = (): string => {
    if (!selectedOption) {
      return "";
    }

    const [country, language] = selectedOption?.split("-") as [
      CountryCodes,
      LanguageCodes,
    ];

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

  // Handle language/region selection
  useEffect(() => {
    if (selectedOption) {
      setShowFireworks(true);
      const timer = setTimeout(() => setShowFireworks(false), 3000);
      return (): void => clearTimeout(timer);
    }
    return;
  }, [selectedOption]);

  // Handle initial access to benefits
  const handleAccessBenefits = (): void => {
    const link = getRewardsLink();
    if (link) {
      setBenefitsUrl(link);
      setActiveView("benefits");
    }
  };

  return (
    <div className="tw:w-full tw:max-w-6xl tw:mx-auto" ref={containerRef}>
      <AnimatePresence mode="wait">
        {activeView === "selector" ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="tw:w-full"
          >
            <Card className="tw:overflow-hidden tw:rounded-xl tw:border-gray-200 tw:bg-white tw:shadow-sm">
              <CardContent className="tw:p-0">
                {/* Simple header */}
                <div className="tw:bg-gradient-to-r tw:from-teal-600 tw:to-teal-700 tw:px-6 tw:py-5 tw:text-white">
                  <div className="tw:flex tw:items-center tw:justify-between">
                    <div className="tw:flex tw:items-center">
                      <Gift className="tw:mr-3 tw:h-6 tw:w-6 tw:text-white" />
                      <div>
                        <h2 className="tw:text-xl tw:font-bold">
                          Employee Benefits Portal
                        </h2>
                        <p className="tw:text-sm tw:mt-1 tw:opacity-90">
                          Access exclusive discounts for your team
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simplified benefits selection - focused on CTA */}
                <div className="tw:px-6 tw:py-6 tw:flex tw:flex-col md:tw:flex-row tw:gap-6 tw:items-start">
                  {/* Left: Brief explanation */}
                  <div className="tw:flex-1">
                    <h3 className="tw:text-lg tw:font-semibold tw:text-gray-800 tw:mb-2">
                      Exclusive Employee Discounts
                    </h3>
                    <p className="tw:text-gray-600 tw:mb-4">
                      Access thousands of discounts from top brands across
                      retail, travel, and services.
                    </p>

                    <div className="tw:flex tw:flex-wrap tw:gap-3 tw:mb-6">
                      {[
                        "Up to 70% off",
                        "Travel deals",
                        "Food & drinks",
                        "Entertainment",
                      ].map((tag, idx) => (
                        <span
                          key={idx}
                          className="tw:bg-teal-50 tw:text-teal-700 tw:text-xs tw:font-medium tw:py-1 tw:px-2 tw:rounded-full tw:border tw:border-teal-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="tw:hidden md:tw:block tw:mt-4">
                      <div className="tw:text-sm tw:text-gray-600 tw:space-y-2">
                        <div className="tw:flex tw:items-center">
                          <CheckCircle className="tw:h-4 tw:w-4 tw:mr-2 tw:text-teal-500" />
                          <span>Exclusive discounts for employees</span>
                        </div>
                        <div className="tw:flex tw:items-center">
                          <CheckCircle className="tw:h-4 tw:w-4 tw:mr-2 tw:text-teal-500" />
                          <span>No fees or hidden costs</span>
                        </div>
                        <div className="tw:flex tw:items-center">
                          <CheckCircle className="tw:h-4 tw:w-4 tw:mr-2 tw:text-teal-500" />
                          <span>Updated with new offers regularly</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Region selection with CTA */}
                  <div className="tw:w-full md:tw:w-80 tw:bg-gray-50 tw:rounded-lg tw:p-5 tw:border tw:border-gray-200">
                    <div className="tw:mb-5">
                      <div className="tw:flex tw:items-center tw:mb-3">
                        <Globe className="tw:mr-2 tw:h-5 tw:w-5 tw:text-teal-600" />
                        <h3 className="tw:font-medium tw:text-gray-800">
                          Select Your Region
                        </h3>
                      </div>

                      <Label
                        htmlFor="region-select"
                        className="tw:mb-1.5 tw:block tw:text-sm tw:text-gray-700"
                      >
                        Where are you located?
                      </Label>
                      <Select
                        onValueChange={
                          setSelectedOption as (value: string) => void
                        }
                        value={selectedOption || ""}
                      >
                        <SelectTrigger
                          id="region-select"
                          className="tw:bg-white tw:border-gray-300 focus:tw:border-teal-500 focus:tw:ring-teal-500"
                        >
                          <SelectValue placeholder="Choose location" />
                        </SelectTrigger>
                        <SelectContent className="tw:max-h-60">
                          {Object.entries(LANGUAGES_BY_COUNTRIES).map(
                            ([countryCode, languages]) =>
                              Object.entries(languages).map(
                                ([langCode, name]) => (
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
                                ),
                              ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleAccessBenefits}
                      disabled={!selectedOption}
                      className="tw:w-full tw:bg-teal-600 hover:tw:bg-teal-700 tw:text-white 
                        tw:py-2.5 tw:font-medium tw:flex tw:items-center tw:justify-center tw:shadow-sm"
                    >
                      View My Benefits
                      <ChevronRight className="tw:ml-2 tw:h-5 tw:w-5" />
                    </Button>

                    {selectedOption && (
                      <div className="tw:flex tw:items-center tw:justify-center tw:text-sm tw:text-teal-600 tw:mt-3">
                        <CheckCircle className="tw:mr-1.5 tw:h-4 tw:w-4" />
                        <span>Ready to view benefits</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fireworks Animation for Selection */}
            <AnimatePresence>
              {showFireworks && (
                <motion.div
                  className="tw:fixed tw:inset-0 tw:z-10 tw:pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="tw:fireworks" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="benefits"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="tw:w-full tw:h-full tw:flex tw:flex-col"
          >
            <div className="tw:bg-white tw:rounded-xl tw:shadow-sm tw:border tw:border-gray-200 tw:mb-4 tw:p-3 tw:flex-shrink-0">
              <Button
                onClick={() => setActiveView("selector")}
                variant="outline"
                className="tw:flex tw:items-center tw:bg-white tw:border-teal-200 tw:text-teal-700 hover:tw:bg-teal-50"
              >
                <ChevronLeft className="tw:mr-2 tw:h-4 tw:w-4" />
                Back to Selection
              </Button>
            </div>

            {/* Improved iframe container with better mobile handling */}
            <Card className="tw:overflow-hidden tw:rounded-xl tw:border-gray-200 tw:bg-white tw:shadow-sm tw:flex-grow tw:flex tw:flex-col">
              <CardContent className="tw:p-0 tw:flex-grow tw:flex tw:flex-col">
                <div
                  className="tw:relative tw:flex-grow"
                  style={{ height: "calc(100vh - 120px)" }}
                >
                  <iframe
                    ref={iframeRef}
                    src={benefitsUrl}
                    className="tw:absolute tw:top-0 tw:left-0 tw:w-full tw:h-full tw:border-0"
                    title="Employee Benefits"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    style={{ minHeight: "500px" }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
