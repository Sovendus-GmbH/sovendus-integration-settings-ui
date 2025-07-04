"use client";

import { type JSX } from "react";
import {
  type SovendusAppSettings,
  TriggerPages,
} from "sovendus-integration-types";

import { SovendusBackendForm } from "../../package";
import type {
  AdditionalSteps,
  SovendusBackendFormFeatureFlags,
} from "../../package/components/ui/backend-form";
import { AdminBar } from "../components/admin-bar";
import { AdminDashboard } from "../components/mock-admin-dashboard";
import {
  clearSettings,
  initialSettings,
  saveSettings,
  useSettings,
} from "../settings-util";
import ShopifyVoucherNetworkSteps from "./additional-steps";

export default function SettingsUIDemo({
  initialSettings: _initialSettings,
  featureFlags = {
    employeeBenefits: {
      addToSidebar: false,
      showWidgetOnDashboard: false,
      isEnabled: false,
    },
    rewards: {
      rewardsEnabled: false,
      triggers: {
        [TriggerPages.MY_ACCOUNT_DASHBOARD]: false,
        [TriggerPages.MY_ORDERS]: false,
        [TriggerPages.MY_ORDERS_DETAIL]: false,
        [TriggerPages.CUSTOM]: false,
      },
    },
  },
  urlPrefix = "",
  clearStorage = clearSettings,
}: {
  initialSettings?: SovendusAppSettings;
  featureFlags?: SovendusBackendFormFeatureFlags;
  urlPrefix?: string;
  clearStorage: () => void;
}): JSX.Element {
  const { currentSettings } = useSettings(_initialSettings || initialSettings);

  if (!currentSettings) {
    return <></>;
  }
  const additionalSteps: AdditionalSteps = {
    optimize: {
      title: "Activate the Sovendus App Storefront Script",
      subSteps: [
        'In your Shopify backend click on "Online Store" and then on "Themes"',
        'On your current theme click on "Customize"',
        'Click on "App embeds" on the left in the sidebar',
        'Enable the Storefront Script for the Sovendus App and click on "Save"',
      ],
    },
    // voucherNetwork: {
    //   title: "Add the Sovendus App to your checkout page",
    //   subSteps: [
    //     'Go to "Settings" -> "Checkout" -> click on "Customize" to customize your checkout pages',
    //     'Click on "Checkout" in the top middle and then on "Thank you"',
    //     'Click on "Section at the left in the sidebar"',
    //     'Bilder',
    //     'Click on "Add App block" on the bottom left, then on "Sovendus App" and then "Save"',
    //     'Click on "Thank you" in the top middle and then on "Order status"',
    //     'Click on "Add App block" on the bottom left, then on "Sovendus App" and then "Save"',
    //   ],
    // },
    voucherNetwork: {
      title: "Add the Sovendus App to your checkout page",
      subSteps: <ShopifyVoucherNetworkSteps />,
    },
  };
  return (
    <>
      <AdminBar pageName="Sovendus App Settings" clearStorage={clearStorage} />
      <AdminDashboard page="settings" urlPrefix={urlPrefix}>
        <SovendusBackendForm
          currentStoredSettings={currentSettings}
          saveSettings={saveSettings}
          additionalSteps={additionalSteps}
          callSaveOnLoad={true}
          featureFlags={featureFlags}
        />
      </AdminDashboard>
    </>
  );
}
