"use client";

import {
  ArrowRight,
  Globe,
  Presentation,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";
import { type Dispatch, type JSX, type SetStateAction, useState } from "react";
import type { CountryCodes, LanguageCodes } from "sovendus-integration-types";
import {
  type EmployeeBenefitsSettings,
  type SovendusAppSettings,
} from "sovendus-integration-types";

import { cn } from "../../../utils";
import { Button } from "../../shadcn";
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/card";
import type { AvailableProducts } from "../../ui/backend-form";
import { CountryLanguageSelector } from "./country-language-selector";

interface SovendusEmployeeBenefitsProps {
  // TODO display state of current integration
  currentSettings: EmployeeBenefitsSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  setActiveConfig: Dispatch<SetStateAction<AvailableProducts | undefined>>;
  setActiveTab?: Dispatch<
    SetStateAction<"configure" | "benefits" | "how-it-works">
  >;
  buttonsDisabled: boolean;
}

export function SovendusEmployeeBenefitsProductCard({
  buttonsDisabled,
  setActiveConfig,
  setActiveTab,
}: SovendusEmployeeBenefitsProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<
    `${CountryCodes}-${LanguageCodes}` | undefined
  >();
  return (
    <Card
      className={cn(
        "tw:border-2 tw:border-blue-500 tw:overflow-hidden tw:shadow-lg tw:transition-all hover:tw:shadow-xl",
      )}
    >
      <CardHeader
        className={cn(
          "tw:bg-gradient-to-r tw:from-blue-500 tw:to-blue-600 tw:text-white",
        )}
      >
        <CardTitle
          className={cn("tw:flex tw:items-center tw:text-xl tw:font-semibold")}
        >
          <Sparkles className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-white")} />
          Employee Benefits Portal
        </CardTitle>
      </CardHeader>

      <CardContent className={cn("tw:p-6")}>
        <div
          className={cn(
            "tw:flex tw:flex-wrap tw:gap-4 tw:justify-between tw:mb-6",
          )}
        >
          <div className={cn("tw:flex-1 tw:min-w-[200px]")}>
            <div className={cn("tw:flex tw:items-center tw:mb-2")}>
              <div
                className={cn("tw:bg-blue-100 tw:p-2 tw:rounded-full tw:mr-3")}
              >
                <Tag className={cn("tw:h-5 tw:w-5 tw:text-blue-600")} />
              </div>
              <h3 className={cn("tw:font-medium")}>Exclusive Discounts</h3>
            </div>
            <p className={cn("tw:text-sm tw:text-gray-600 tw:pl-11")}>
              Up to 70% off from premium brands
            </p>
          </div>

          <div className={cn("tw:flex-1 tw:min-w-[200px]")}>
            <div className={cn("tw:flex tw:items-center tw:mb-2")}>
              <div
                className={cn("tw:bg-blue-100 tw:p-2 tw:rounded-full tw:mr-3")}
              >
                <Users className={cn("tw:h-5 tw:w-5 tw:text-blue-600")} />
              </div>
              <h3 className={cn("tw:font-medium")}>All Employees</h3>
            </div>
            <p className={cn("tw:text-sm tw:text-gray-600 tw:pl-11")}>
              Available for your entire team
            </p>
          </div>

          <div className={cn("tw:flex-1 tw:min-w-[200px]")}>
            <div className={cn("tw:flex tw:items-center tw:mb-2")}>
              <div
                className={cn("tw:bg-blue-100 tw:p-2 tw:rounded-full tw:mr-3")}
              >
                <Globe className={cn("tw:h-5 tw:w-5 tw:text-blue-600")} />
              </div>
              <h3 className={cn("tw:font-medium")}>International</h3>
            </div>
            <p className={cn("tw:text-sm tw:text-gray-600 tw:pl-11")}>
              Available in 14 countries
            </p>
          </div>
        </div>

        <div className={cn("tw:border-t tw:border-gray-100 tw:pt-4 tw:mb-4")}>
          <div
            className={cn("tw:grid tw:grid-cols-12 tw:gap-4 tw:items-center")}
          >
            <div className={cn("tw:col-span-7")}>
              <h3 className={cn("tw:text-lg tw:font-semibold tw:mb-2")}>
                Try it now!
              </h3>
              <p className={cn("tw:text-gray-700")}>
                Select your region below to access exclusive discounts from top
                brands for your employees:
              </p>
            </div>
            <div
              className={cn("tw:col-span-5 tw:flex tw:justify-end tw:gap-3")}
            >
              <Button
                variant="outline"
                className={cn("tw:text-blue-600 tw:font-medium")}
                disabled={buttonsDisabled}
                onClick={(): void => {
                  if (setActiveTab) {
                    setActiveTab("benefits");
                  }
                  setActiveConfig("employeeBenefits");
                }}
              >
                Learn More
                <Presentation className={cn("tw:ml-1 tw:h-4 tw:w-4")} />
              </Button>
              <Button
                className={cn("tw:bg-blue-600 tw:text-white")}
                disabled={buttonsDisabled}
                onClick={(): void => {
                  if (setActiveTab) {
                    setActiveTab("configure");
                  }
                  setActiveConfig("employeeBenefits");
                }}
              >
                Configure
                <ArrowRight className={cn("tw:ml-1 tw:h-4 tw:w-4")} />
              </Button>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "tw:bg-blue-50 tw:p-5 tw:rounded-lg tw:border tw:border-blue-200 tw:shadow-sm",
          )}
        >
          <CountryLanguageSelector
            selectedOption={selectedOption}
            onOptionChange={setSelectedOption}
            onSelectComplete={(link) => {
              if (link) {
                window.open(link, "_blank");
              }
            }}
            compact={false}
          />
        </div>
      </CardContent>
    </Card>
  );
}
