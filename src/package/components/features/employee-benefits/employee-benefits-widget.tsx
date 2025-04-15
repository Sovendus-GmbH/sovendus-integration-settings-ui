"use client";

import { type JSX } from "react";
import type { CountryCodes, LanguageCodes } from "sovendus-integration-types";

import { initialSettings, useSettings } from "../../../../app/settings-util";
import { SovendusEmployeeBenefitsSelector } from "./employee-benefits";

type SovendusEmployeeBenefitsWidgetProps =
  | {
      countryCode?: never;
      languageCode?: never;
    }
  | {
      countryCode: CountryCodes;
      languageCode: LanguageCodes;
    };

export function SovendusEmployeeBenefitsWidget({
  countryCode,
  languageCode,
}: SovendusEmployeeBenefitsWidgetProps): JSX.Element {
  const { currentSettings } = useSettings(initialSettings);

  if (!currentSettings) {
    return <></>;
  }
  if (!currentSettings.employeeBenefits?.showWidgetOnDashboard) {
    return <></>;
  }
  if (countryCode && languageCode) {
    return (
      <SovendusEmployeeBenefitsSelector
        countryCode={countryCode}
        languageCode={languageCode}
        hideTitle={false}
      />
    );
  }
  return <SovendusEmployeeBenefitsSelector hideTitle={false} />;
}
