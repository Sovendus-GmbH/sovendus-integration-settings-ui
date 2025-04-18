import "./app.css";

import { Award, BarChart2, Gift, ShoppingBagIcon } from "lucide-react";
import type { JSX } from "react";
import React, { useEffect, useMemo, useState } from "react";
import { type SovendusAppSettings } from "sovendus-integration-types";

import { cleanConfig, cn, loggerInfo } from "../../utils";
import { SovendusCheckoutProducts } from "../features/checkout-products";
import { SovendusEmployeeBenefitsProductCard } from "../features/employee-benefits";
import {
  type SovendusEmployeeBenefitsFeatureFlags,
  SovendusEmployeeBenefitsSettings,
} from "../features/employee-benefits/employee-benefits-settings";
import {
  EnabledOptimizeCountries,
  SovendusOptimize,
} from "../features/optimize";
import { EnabledRewardsCountries, isRewardsEnabled } from "../features/rewards";
import {
  SovendusRewards,
  type SovendusRewardsFeatureFlags,
} from "../features/rewards/rewards";
import {
  EnabledVoucherNetworkCountries,
  SovendusVoucherNetwork,
} from "../features/voucher-network";
import { Footer } from "../layout";
import { Alert, AlertDescription, AlertTitle } from "../shadcn/alert";
import { ConfigurationDialog } from "./confirmation-dialog";
import { Notification } from "./notification";
import { ProductCard } from "./product-card";

export interface AdditionalStep {
  title: string;
  subSteps: string[];
}

export interface AdditionalSteps {
  checkoutProducts?: AdditionalStep;
  optimize?: AdditionalStep;
  voucherNetwork?: AdditionalStep;
  rewards?: AdditionalStep;
}

export interface SovendusBackendFormFeatureFlags {
  rewards?: SovendusRewardsFeatureFlags;
  employeeBenefits?: SovendusEmployeeBenefitsFeatureFlags;
}

export interface SovendusBackendFormProps {
  currentStoredSettings: SovendusAppSettings;
  saveSettings: (data: SovendusAppSettings) => Promise<SovendusAppSettings>;
  additionalSteps?: AdditionalSteps;
  zoomedVersion?: boolean;
  callSaveOnLoad: boolean;
  debug?: boolean;
  featureFlags?: SovendusBackendFormFeatureFlags;
}

export type AvailableProducts =
  | "voucherNetwork"
  | "optimize"
  | "checkoutProducts"
  | "employeeBenefits"
  | "rewards";

export const DEMO_REQUEST_URL =
  "https://online.sovendus.com/kontakt/demo-tour-kontaktformular/#";

export function SovendusBackendForm({
  currentStoredSettings: _currentStoredSettings,
  saveSettings,
  additionalSteps,
  zoomedVersion = false,
  callSaveOnLoad,
  debug = false,
  featureFlags,
}: SovendusBackendFormProps): JSX.Element {
  const [currentStoredSettings, setCurrentStoredSettings] =
    useState<SovendusAppSettings>(() => cleanConfig(_currentStoredSettings));
  const [currentSettings, setCurrentSettings] = useState<SovendusAppSettings>(
    currentStoredSettings,
  );
  if (debug) {
    loggerInfo("Current settings:", currentSettings);
    loggerInfo("Current stored settings:", currentStoredSettings);
  }
  const [activeConfig, setActiveConfig] = useState<
    AvailableProducts | undefined
  >(undefined);
  const [activeTab, setActiveTab] = useState<
    "configure" | "benefits" | "how-it-works"
  >("configure");
  const [notificationState, setNotificationState] = useState<{
    message: string;
    type: "success" | "error" | "loading";
  } | null>(null);
  useSettingsSaveOnLoad(saveSettings, currentStoredSettings, callSaveOnLoad);
  return useMemo(() => {
    const buttonsDisabled = notificationState?.type === "loading";
    const handleSave = async (open: boolean): Promise<void> => {
      if (!open) {
        const hasUnsavedChanges =
          JSON.stringify(currentSettings) !==
          JSON.stringify(currentStoredSettings);
        const prevActiveConfig = activeConfig;
        try {
          setActiveConfig(undefined);
          if (hasUnsavedChanges) {
            setNotificationState({
              message: "Saving settings...",
              type: "loading",
            });
            const updatedSettings = await saveSettings(currentSettings);
            setCurrentStoredSettings(updatedSettings);
            setCurrentSettings(updatedSettings);
            setNotificationState({
              message: "Settings saved successfully",
              type: "success",
            });
          }
        } catch (error) {
          setActiveConfig(prevActiveConfig);
          setNotificationState({
            message: `Failed to save settings, error: ${
              (error as Error)?.message || JSON.stringify(error)
            }`,
            type: "error",
          });
        }
      }
    };

    const getVoucherNetworkStatus = (): {
      active: boolean;
      details: JSX.Element;
    } => {
      const enabledCountries =
        currentSettings.voucherNetwork?.countries?.ids &&
        Object.entries(currentSettings.voucherNetwork.countries.ids)
          .filter(
            ([_, country]) =>
              country.languages &&
              Object.values(country.languages).some((lang) => lang.isEnabled),
          )
          .map(([code]) => code);

      const isActive = enabledCountries?.length
        ? enabledCountries.length > 0
        : false;

      return {
        active: isActive,
        details: (
          <EnabledVoucherNetworkCountries
            currentSettings={currentSettings.voucherNetwork}
          />
        ),
      };
    };

    const getOptimizeStatus = (): {
      active: boolean;
      details: React.JSX.Element;
    } => {
      const isGlobalEnabled =
        currentSettings.optimize?.simple?.optimizeId &&
        currentSettings.optimize?.simple?.isEnabled;
      const enabledCountries =
        currentSettings.optimize?.countries &&
        Object.entries(currentSettings.optimize?.countries.ids)
          .filter(([_, data]) => data.isEnabled)
          .map(([code]) => code);

      const isActive =
        isGlobalEnabled ||
        (enabledCountries?.length && enabledCountries.length > 0) ||
        false;

      return {
        active: isActive,
        details: (
          <EnabledOptimizeCountries
            currentSettings={currentSettings.optimize}
          />
        ),
      };
    };

    const getCheckoutProductsStatus = (): {
      active: boolean;
      details: React.JSX.Element;
    } => {
      return {
        active: currentSettings.checkoutProducts || false,
        details: (
          <p
            className={cn(
              "tw:text-sm",
              currentSettings.checkoutProducts
                ? "tw:text-green-600"
                : "tw:text-red-600",
            )}
          >
            {currentSettings.checkoutProducts
              ? "Ready to receive traffic from partner shops."
              : "Not active"}
          </p>
        ),
      };
    };

    const getRewardsStatus = (): {
      active: boolean;
      details: JSX.Element;
    } => {
      const { enabled } = isRewardsEnabled(currentSettings.rewards);

      return {
        active: enabled,
        details: (
          <EnabledRewardsCountries currentSettings={currentSettings.rewards} />
        ),
      };
    };

    return (
      <div
        className={cn("tw:container tw:mx-auto tw:p-6 tw:space-y-8", {
          zoomed: zoomedVersion,
        })}
      >
        <div className={cn("tw:flex tw:justify-between tw:items-center")}>
          <div className={cn("tw:text-4xl tw:font-bold")}>Sovendus App</div>
        </div>

        <Alert className={cn("tw:bg-blue-50 tw:border-blue-200")}>
          <AlertTitle className={cn("tw:text-blue-700 tw:font-semibold")}>
            <strong>Welcome to your Sovendus configuration dashboard.</strong>
          </AlertTitle>
          <AlertDescription className={cn("tw:text-blue-700 tw:font-semibold")}>
            To get started or make changes to your setup, please contact
            Sovendus for a personalized demo and configuration process.
          </AlertDescription>
        </Alert>

        <div className={cn("tw:grid tw:gap-6")}>
          {featureFlags?.employeeBenefits?.isEnabled ? (
            <SovendusEmployeeBenefitsProductCard
              setCurrentSettings={setCurrentSettings}
              currentSettings={currentSettings.employeeBenefits}
              buttonsDisabled={buttonsDisabled}
              setActiveConfig={setActiveConfig}
              setActiveTab={setActiveTab}
            />
          ) : (
            <></>
          )}

          <ProductCard
            title="Voucher Network & Checkout Benefits"
            description="Drive sales with post-purchase vouchers and earn revenue from partner offers"
            icon={<Gift className={cn("tw:h-6 tw:w-6 tw:text-blue-500")} />}
            status={getVoucherNetworkStatus()}
            buttonsDisabled={buttonsDisabled}
            metrics={[
              { label: "Network Reach", value: "7M+" },
              { label: "Partner Shops", value: "2,300+" },
              { label: "Available Countries", value: "14" },
            ]}
            onConfigure={(): void => {
              setActiveTab("configure");
              setActiveConfig("voucherNetwork");
            }}
            onLearnMore={(): void => {
              setActiveTab("benefits");
              setActiveConfig("voucherNetwork");
            }}
          />

          {featureFlags?.rewards?.rewardsEnabled ? (
            <ProductCard
              title="Sovendus Rewards"
              description="Enhance customer loyalty with personalized rewards in the account area"
              icon={<Award className={cn("tw:h-6 tw:w-6 tw:text-teal-500")} />}
              status={getRewardsStatus()}
              buttonsDisabled={buttonsDisabled}
              metrics={[
                { label: "Customer Engagement", value: "+20%" },
                { label: "Repeat Purchases", value: "+15%" },
                { label: "Account Logins", value: "+30%" },
              ]}
              onConfigure={(): void => {
                setActiveTab("configure");
                setActiveConfig("rewards");
              }}
              onLearnMore={(): void => {
                setActiveTab("benefits");
                setActiveConfig("rewards");
              }}
            />
          ) : (
            <></>
          )}

          <ProductCard
            title="Optimize"
            description="Boost conversions with intelligent on-site optimization"
            icon={
              <BarChart2 className={cn("tw:h-6 tw:w-6 tw:text-green-500")} />
            }
            status={getOptimizeStatus()}
            buttonsDisabled={buttonsDisabled}
            metrics={[
              { label: "Conversion Boost", value: "10%" },
              { label: "Bounce Rate Reduction", value: "5%" },
              { label: "Newsletter Sign-up Boost ", value: "15%" },
            ]}
            onConfigure={(): void => {
              setActiveTab("configure");
              setActiveConfig("optimize");
            }}
            onLearnMore={(): void => {
              setActiveTab("benefits");
              setActiveConfig("optimize");
            }}
          />

          <ProductCard
            title="Checkout Products"
            description="Reach 24 million potential customers a month with your product"
            icon={
              <ShoppingBagIcon
                className={cn("tw:h-6 tw:w-6 tw:text-purple-500")}
              />
            }
            status={getCheckoutProductsStatus()}
            buttonsDisabled={buttonsDisabled}
            metrics={[
              { label: "Annual Orders", value: "3.6M+" },
              { label: "Conversion Rate", value: "1-3%" },
              { label: "Ad Impressions", value: "185M+" },
            ]}
            onConfigure={(): void => {
              setActiveTab("configure");
              setActiveConfig("checkoutProducts");
            }}
            onLearnMore={(): void => {
              setActiveTab("benefits");
              setActiveConfig("checkoutProducts");
            }}
          />
        </div>
        <Footer />

        {notificationState && (
          <Notification
            message={notificationState.message}
            type={notificationState.type}
          />
        )}
        <ConfigurationDialog
          open={activeConfig === "voucherNetwork"}
          onOpenChange={(open): void => void handleSave(open)}
          zoomedVersion={zoomedVersion}
        >
          <SovendusVoucherNetwork
            currentSettings={currentSettings.voucherNetwork}
            setCurrentSettings={setCurrentSettings}
            additionalSteps={additionalSteps?.voucherNetwork}
            defaultTab={activeTab}
          />
        </ConfigurationDialog>

        {featureFlags?.rewards?.rewardsEnabled ? (
          <ConfigurationDialog
            open={activeConfig === "rewards"}
            onOpenChange={(open): void => void handleSave(open)}
            zoomedVersion={zoomedVersion}
          >
            <SovendusRewards
              currentRewardsSettings={currentStoredSettings.rewards}
              setCurrentSettings={setCurrentSettings}
              additionalSteps={additionalSteps?.rewards}
              featureFlags={featureFlags?.rewards}
              defaultTab={activeTab}
            />
          </ConfigurationDialog>
        ) : (
          <></>
        )}

        {featureFlags?.employeeBenefits?.isEnabled ? (
          <ConfigurationDialog
            open={activeConfig === "employeeBenefits"}
            onOpenChange={(open): void => void handleSave(open)}
            zoomedVersion={zoomedVersion}
          >
            <SovendusEmployeeBenefitsSettings
              currentSettings={currentSettings.employeeBenefits}
              featureFlags={featureFlags?.employeeBenefits}
              setCurrentSettings={setCurrentSettings}
              defaultTab={activeTab}
            />
          </ConfigurationDialog>
        ) : (
          <></>
        )}

        <ConfigurationDialog
          open={activeConfig === "optimize"}
          onOpenChange={(open): void => void handleSave(open)}
          zoomedVersion={zoomedVersion}
        >
          <SovendusOptimize
            currentOptimizeSettings={currentSettings.optimize}
            savedOptimizeSettings={currentStoredSettings.optimize}
            setCurrentSettings={setCurrentSettings}
            additionalSteps={additionalSteps?.optimize}
            defaultTab={activeTab}
          />
        </ConfigurationDialog>

        <ConfigurationDialog
          open={activeConfig === "checkoutProducts"}
          onOpenChange={(open): void => void handleSave(open)}
          zoomedVersion={zoomedVersion}
        >
          <SovendusCheckoutProducts
            enabled={currentSettings.checkoutProducts || false}
            setCurrentSettings={setCurrentSettings}
            additionalSteps={additionalSteps?.checkoutProducts}
            defaultTab={activeTab}
          />
        </ConfigurationDialog>
      </div>
    );
  }, [
    notificationState,
    zoomedVersion,
    featureFlags?.employeeBenefits,
    featureFlags?.rewards,
    currentSettings,
    activeConfig,
    activeTab,
    additionalSteps?.voucherNetwork,
    additionalSteps?.rewards,
    additionalSteps?.optimize,
    additionalSteps?.checkoutProducts,
    currentStoredSettings,
    saveSettings,
  ]);
}

function useSettingsSaveOnLoad(
  saveSettings: (data: SovendusAppSettings) => Promise<SovendusAppSettings>,
  currentStoredSettings: SovendusAppSettings,
  callSaveOnLoad: boolean,
): void {
  useEffect(() => {
    // Save settings in case there any settings migrations
    if (callSaveOnLoad) {
      void saveSettings(currentStoredSettings);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
