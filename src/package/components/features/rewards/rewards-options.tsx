import { Gift, Layout, PlusCircle } from "lucide-react";
import type { ElementType, JSX } from "react";
import type { CountryCodes, LanguageCodes } from "sovendus-integration-types";
import { TriggerPages } from "sovendus-integration-types";
import {
  LANGUAGES_BY_COUNTRIES,
  type RewardsSettings,
} from "sovendus-integration-types";

import { cn } from "../../../utils";
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
                    description: getPageTypeDescription(
                      pageType as TriggerPages,
                    ),
                    enabledLocales: [],
                  };
                }
                enabledLocales[pageType as TriggerPages]?.enabledLocales.push(
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
    enabled: Object.keys(enabledLocales).length > 0,
    enabledLocales,
  };
}

export function getAvailableTriggerPages(
  featureFlags?: SovendusRewardsFeatureFlags,
): {
  value: TriggerPages;
  label: string;
  icon: ElementType;
}[] {
  const pages = [
    {
      value: TriggerPages.MY_ACCOUNT_DASHBOARD,
      label: "My Account Dashboard",
      icon: Layout,
      enabled: featureFlags?.triggers?.[TriggerPages.MY_ACCOUNT_DASHBOARD],
    },
    {
      value: TriggerPages.MY_ORDERS,
      label: "My Orders",
      icon: Gift,
      enabled: featureFlags?.triggers?.[TriggerPages.MY_ORDERS],
    },
    {
      value: TriggerPages.MY_ORDERS_DETAIL,
      label: "Order Detail",
      icon: Gift,
      enabled: featureFlags?.triggers?.[TriggerPages.MY_ORDERS_DETAIL],
    },
    {
      value: TriggerPages.CUSTOM,
      label: "Custom Page",
      icon: PlusCircle,
      enabled: featureFlags?.triggers?.[TriggerPages.CUSTOM],
    },
  ];

  return pages.filter((page) => page.enabled !== false);
}

function getPageTypeDescription(pageType: TriggerPages): string {
  switch (pageType) {
    case TriggerPages.MY_ACCOUNT_DASHBOARD:
      return "My Account Dashboard";
    case TriggerPages.MY_ORDERS:
      return "My Orders";
    case TriggerPages.MY_ORDERS_DETAIL:
      return "Order Detail";
    case TriggerPages.CUSTOM:
      return "Custom Page";
    default:
      return pageType;
  }
}
