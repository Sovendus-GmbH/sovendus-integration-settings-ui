import { Gift, Layout, PlusCircle } from "lucide-react";
import type { ElementType, JSX } from "react";
import type { CountryCodes, LanguageCodes } from "sovendus-integration-types";
import { TriggerPages } from "sovendus-integration-types";
import {
  LANGUAGES_BY_COUNTRIES,
  type RewardsSettings,
} from "sovendus-integration-types";

import { cn } from "../utils/utils";
import type { SovendusRewardsFeatureFlags } from "./rewards";

export function EnabledRewardsCountries({
  currentSettings,
}: {
  currentSettings: RewardsSettings | undefined;
}): JSX.Element {
  const { enabled, enabledLocales } = isRewardsEnabled(currentSettings);
  return (
    <p
      className={cn(
        "tw:text-sm",
        enabled ? "tw:text-green-600" : "tw:text-red-600",
      )}
    >
      {enabled ? (
        <>
          <span>Enabled for: </span>
          {Object.entries(enabledLocales).map(([pageType, page]) => (
            <span key={pageType}>
              {page.description}: {page.enabledLocales.join(", ")}
            </span>
          ))}
        </>
      ) : (
        <span>No countries enabled</span>
      )}
    </p>
  );
}

type EnabledLocales = {
  [pageType in TriggerPages]?: {
    description: string;
    enabledLocales: string[];
  };
};

export function isRewardsEnabled(
  currentSettings: RewardsSettings | undefined,
  isEnabled?: boolean,
): { enabled: boolean; enabledLocales: EnabledLocales } {
  const enabledLocales: EnabledLocales = {};
  if (currentSettings?.pages) {
    for (const [pageType, pageSettings] of Object.entries(
      currentSettings.pages,
    )) {
      if (pageSettings?.countries?.ids) {
        for (const [countryCode, country] of Object.entries(
          pageSettings.countries.ids,
        )) {
          if (country.languages) {
            for (const [languageKey, language] of Object.entries(
              country.languages,
            )) {
              if (
                (isEnabled !== undefined ? isEnabled : language.isEnabled) &&
                language.trafficMediumNumber &&
                language.trafficSourceNumber
              ) {
                const countryName = LANGUAGES_BY_COUNTRIES[
                  countryCode as CountryCodes
                ][languageKey as LanguageCodes] as string;

                if (!enabledLocales[pageType as TriggerPages]) {
                  enabledLocales[pageType as TriggerPages] = {
                    description: pageType,
                    enabledLocales: [],
                  };
                }
                enabledLocales[pageType as TriggerPages]!.enabledLocales.push(
                  countryName,
                );
              }
            }
          }
        }
      }
    }
  }

  return {
    enabled: Object.values(enabledLocales).some(
      (page) => page.enabledLocales.length > 0,
    ),
    enabledLocales,
  };
}

export function getAvailableTriggerPages(
  featureFlags: SovendusRewardsFeatureFlags | undefined,
): {
  id: TriggerPages;
  label: string;
  icon: ElementType;
}[] {
  return [
    ...(featureFlags?.triggers?.myAccountDashboard
      ? [
          {
            id: TriggerPages.MY_ACCOUNT_DASHBOARD,
            label: "My Account Dashboard",
            icon: Layout,
          },
        ]
      : []),
    { id: TriggerPages.MY_ORDERS, label: "My Orders Page", icon: Gift },
    {
      id: TriggerPages.MY_ORDERS_DETAIL,
      label: "My Order Detail Page",
      icon: Gift,
    },
    { id: TriggerPages.CUSTOM, label: "Custom Page", icon: PlusCircle },
  ];
}
