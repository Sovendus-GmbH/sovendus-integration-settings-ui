"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, ExternalLink, Gift } from "lucide-react";
import {
  type Dispatch,
  type JSX,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { LanguageCodes } from "sovendus-integration-types";
import { CountryCodes } from "sovendus-integration-types";
import {
  type EmployeeBenefitsSettings,
  LANGUAGES_BY_COUNTRIES,
  type SovendusAppSettings,
  Versions,
} from "sovendus-integration-types";

import { cn, loggerError } from "../utils/utils";
import { Button } from "./shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "./shadcn/card";
import { Label } from "./shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcn/select";
import { Switch } from "./shadcn/switch";

interface SovendusEmployeeBenefitsProps {
  currentSettings: EmployeeBenefitsSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  featureFlags: SovendusEmployeeBenefitsFeatureFlags | undefined;
}

export interface SovendusEmployeeBenefitsFeatureFlags {
  isEnabled: boolean;
  showWidgetOnDashboard: boolean;
  addToSidebar: boolean;
}

export function SovendusEmployeeBenefits({
  currentSettings,
  setCurrentSettings,
  featureFlags,
}: SovendusEmployeeBenefitsProps): JSX.Element {
  const [selectedOption, setSelectedOption] =
    useState<`${CountryCodes}-${LanguageCodes}`>();
  const [showFireworks, setShowFireworks] = useState(false);

  const handleWidgetEnableChange = (checked: boolean): void => {
    setCurrentSettings((prevState) => ({
      ...prevState,
      employeeBenefits: {
        addToSidebar: false,
        isEnabled: true,
        ...prevState.employeeBenefits,
        showWidgetOnDashboard: checked,
      },
    }));
  };

  const handleSidebarEnableChange = (checked: boolean): void => {
    setCurrentSettings((prevState) => ({
      ...prevState,
      employeeBenefits: {
        showWidgetOnDashboard: false,
        isEnabled: true,
        ...prevState.employeeBenefits,
        addToSidebar: checked,
      },
      version: Versions.THREE,
    }));
  };

  const getRewardsLink = (): string => {
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
      //   [CountryCodes.FI]:
      //     "https://sovendus.com/campaign/directlink/1827b293-a928-4997-9edb-0b9cc4a58b8c",
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
      //   [CountryCodes.PT]: "",
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

  useEffect(() => {
    if (selectedOption) {
      setShowFireworks(true);
      const timer = setTimeout(() => setShowFireworks(false), 3000);
      return (): void => clearTimeout(timer);
    }
    return;
  }, [selectedOption]);

  return (
    <Card
      className={cn(
        "tw:w-full tw:overflow-hidden tw:shadow-lg",
        "tw:bg-gradient-to-br tw:from-orange-50 tw:via-orange-100 tw:to-orange-200 tw:border-orange-300",
      )}
    >
      <CardHeader
        className={cn("tw:border-b tw:border-orange-300 tw:bg-orange-100")}
      >
        <CardTitle
          className={cn(
            "tw:flex tw:items-center tw:text-2xl tw:text-orange-900 tw:font-bold tw:mb-4",
          )}
        >
          <Gift className={cn("tw:h-6 tw:w-6 tw:mr-2 tw:text-orange-500")} />
          <span className={cn("tw:ml-2")}>Sovendus Employee Benefits</span>
        </CardTitle>
      </CardHeader>
      <CardContent className={cn("tw:pt-6 tw:pb-4 tw:relative tw:px-6")}>
        <AnimatePresence>
          {showFireworks && (
            <motion.div
              className={cn(
                "tw:absolute tw:inset-0 tw:pointer-events-none tw:z-10",
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={cn("tw:fireworks")} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className={cn("tw:space-y-6")}>
          <div
            className={cn("tw:flex tw:flex-col tw:lg:flex-row tw:lg:space-x-8")}
          >
            <div className={cn("tw:lg:w-1/2 tw:space-y-4")}>
              <h3
                className={cn(
                  "tw:text-2xl tw:text-orange-900 tw:font-bold tw:mb-4",
                )}
              >
                Exclusive Employee Benefits
              </h3>
              <p className={cn("tw:text-lg tw:text-orange-800 tw:mb-6")}>
                Unlock a world of savings with thousands of incredible deals
                across Europe!
              </p>
              <ul className={cn("tw:text-sm tw:space-y-2")}>
                <li
                  className={cn("tw:flex tw:items-center tw:text-orange-700")}
                >
                  <CheckCircle
                    className={cn("tw:h-4 tw:w-4 tw:mr-2 tw:text-green-500")}
                  />
                  Enjoy substantial discounts on top brands
                </li>
                <li
                  className={cn("tw:flex tw:items-center tw:text-orange-700")}
                >
                  <CheckCircle
                    className={cn("tw:h-4 tw:w-4 tw:mr-2 tw:text-green-500")}
                  />
                  Discover new offers weekly for continuous savings
                </li>
                <li
                  className={cn("tw:flex tw:items-center tw:text-orange-700")}
                >
                  <CheckCircle
                    className={cn("tw:h-4 tw:w-4 tw:mr-2 tw:text-green-500")}
                  />
                  Access employee-exclusive deals and promotions
                </li>
              </ul>
            </div>
            <div className={cn("tw:lg:w-1/2 tw:space-y-4 tw:mt-6 tw:lg:mt-0")}>
              <h3
                className={cn(
                  "tw:text-2xl tw:text-orange-900 tw:font-bold tw:mb-4",
                )}
              >
                Get Your voucher code now!
              </h3>
              <div className={cn("tw:space-y-2")}>
                <Label
                  htmlFor="country-lang-select"
                  className={cn("tw:text-orange-800 tw:font-semibold")}
                >
                  Select Your Region
                </Label>
                <Select
                  onValueChange={setSelectedOption as (value: string) => void}
                >
                  <SelectTrigger
                    id="country-lang-select"
                    className={cn(
                      "tw:bg-white tw:border-orange-400 tw:focus:ring-orange-500 tw:text-orange-800",
                    )}
                  >
                    <SelectValue placeholder="Choose to view available offers" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(LANGUAGES_BY_COUNTRIES).map(
                      ([countryCode, languages]) =>
                        Object.entries(languages).map(([langCode, name]) => (
                          <SelectItem
                            key={`${countryCode}-${langCode}`}
                            value={`${countryCode}-${langCode}`}
                          >
                            <span className={cn("tw:flex tw:items-center")}>
                              <img
                                src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                                alt={`${name} flag`}
                                className={cn(
                                  "tw:mr-2 tw:h-4 tw:w-6 tw:object-cover",
                                )}
                              />
                              {name}
                            </span>
                          </SelectItem>
                        )),
                    )}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={(): void =>
                  void window.open(getRewardsLink(), "_blank")
                }
                disabled={!selectedOption}
                className={cn(
                  "tw:w-full tw:bg-orange-500 tw:hover:bg-orange-600 tw:text-white tw:transition-all tw:duration-300",
                  "tw:disabled:bg-gray-300 tw:disabled:text-gray-500 tw:disabled:cursor-not-allowed",
                  "tw:enabled:hover:scale-105 tw:enabled:hover:shadow-lg",
                  "tw:text-lg tw:font-semibold tw:py-3 tw:rounded-md",
                )}
              >
                {selectedOption
                  ? "Get Your Exclusive Vouchers"
                  : "Select a Region to Continue"}
                <ExternalLink className={cn("tw:ml-2 tw:h-5 tw:w-5")} />
              </Button>
            </div>
          </div>

          <div
            className={cn(
              "tw:mt-8 tw:bg-white tw:bg-opacity-70 tw:rounded-lg p-6 tw:shadow-md",
            )}
          >
            <h4
              className={cn(
                "tw:text-xl tw:font-semibold tw:text-orange-800 tw:mb-3",
              )}
            >
              Provide your employees free access to amazing benefits via:
            </h4>
            <div
              className={cn(
                featureFlags?.addToSidebar ||
                  featureFlags?.showWidgetOnDashboard
                  ? "tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-4"
                  : "",
              )}
            >
              {featureFlags?.addToSidebar ||
              featureFlags?.showWidgetOnDashboard ? (
                <div
                  className={cn(
                    "tw:bg-orange-50 tw:rounded-lg tw:p-4 tw:transition-all tw:hover:shadow-md tw:border tw:border-orange-200",
                  )}
                >
                  <h5
                    className={cn(
                      "tw:text-sm tw:font-semibold tw:text-orange-700 tw:mb-2",
                    )}
                  >
                    Display Options
                  </h5>
                  <div className={cn("tw:flex tw:flex-col tw:space-y-2")}>
                    {featureFlags?.showWidgetOnDashboard ? (
                      <div
                        className={cn(
                          "tw:flex tw:items-center tw:justify-between",
                        )}
                      >
                        <Label
                          htmlFor="employee-benefits-widget"
                          className={cn("tw:text-sm tw:text-orange-600")}
                        >
                          Show on dashboard
                        </Label>
                        <Switch
                          id="employee-benefits-widget"
                          checked={
                            currentSettings?.showWidgetOnDashboard || false
                          }
                          onCheckedChange={handleWidgetEnableChange}
                          className={cn(
                            "tw:bg-orange-200 tw:data-[state=checked]:bg-orange-500",
                          )}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {featureFlags?.addToSidebar ? (
                      <div
                        className={cn(
                          "tw:flex tw:items-center tw:justify-between",
                        )}
                      >
                        <Label
                          htmlFor="employee-benefits-sidebar"
                          className={cn("tw:text-sm tw:text-orange-600")}
                        >
                          Add to sidebar
                        </Label>
                        <Switch
                          id="employee-benefits-sidebar"
                          checked={currentSettings?.addToSidebar || false}
                          onCheckedChange={handleSidebarEnableChange}
                          className={cn(
                            "tw:bg-orange-200 tw:data-[state=checked]:bg-orange-500",
                          )}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div
                className={cn(
                  "tw:bg-orange-50 tw:rounded-lg tw:p-4 tw:transition-all tw:hover:shadow-md tw:border tw:border-orange-200",
                )}
              >
                <h5
                  className={cn(
                    "tw:text-sm tw:font-semibold tw:text-orange-700 tw:mb-2",
                  )}
                >
                  Other Integration Options
                </h5>
                <ul
                  className={cn(
                    "tw:text-sm tw:text-orange-600 tw:space-y-2 tw:mb-3",
                  )}
                >
                  <li className={cn("tw:flex tw:items-center")}>
                    <CheckCircle
                      className={cn("tw:h-3 tw:w-3 tw:mr-2 tw:text-green-500")}
                    />
                    Seamless integration with your existing ERP, CRM, or HR
                    systems
                  </li>
                  <li className={cn("tw:flex tw:items-center")}>
                    <CheckCircle
                      className={cn("tw:h-3 tw:w-3 tw:mr-2 tw:text-green-500")}
                    />
                    Flexible plugin options for various platforms
                  </li>
                </ul>
                <a
                  href="https://docs.sovendus.com/employee-benefits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "tw:text-sm tw:text-orange-500 tw:hover:text-orange-700 tw:underline tw:flex tw:items-center",
                  )}
                >
                  Learn More About Integration Options
                  <ExternalLink className={cn("tw:ml-1 tw:h-3 tw:w-3")} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
