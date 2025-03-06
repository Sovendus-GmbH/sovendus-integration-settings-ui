import "./app.css";

import { BarChart2, Gift, ShoppingBagIcon } from "lucide-react";
import type { JSX } from "react";
import React, { useEffect, useMemo, useState } from "react";
import { type SovendusAppSettings, Versions } from "sovendus-integration-types";

import { cn } from "../utils/utils";
import { SovendusCheckoutProducts } from "./checkout-products";
import { ConfigurationDialog } from "./confirmation-dialog";
import { Footer } from "./footer";
import { Notification } from "./notification";
import { SovendusOptimize } from "./optimize";
import { EnabledOptimizeCountries } from "./optimize-country-options";
import { ProductCard } from "./product-card";
import { Alert, AlertDescription, AlertTitle } from "./shadcn/alert";
import { SovendusVoucherNetwork } from "./voucher-network";
import { EnabledVoucherNetworkCountries } from "./voucher-network-country-options";

export interface AdditionalStep {
  title: string;
  subSteps: string[];
}

export interface AdditionalSteps {
  checkoutProducts?: AdditionalStep;
  optimize?: AdditionalStep;
  voucherNetwork?: AdditionalStep;
}

export interface SovendusBackendFormProps {
  currentStoredSettings: SovendusAppSettings;
  saveSettings: (data: SovendusAppSettings) => Promise<SovendusAppSettings>;
  additionalSteps?: AdditionalSteps;
  zoomedVersion?: boolean;
  callSaveOnLoad: boolean;
}

export const DEMO_REQUEST_URL =
  "https://online.sovendus.com/kontakt/demo-tour-kontaktformular/#";

export function sanitizeSettings(
  settings: SovendusAppSettings,
): SovendusAppSettings {
  const sanitizedSettings: SovendusAppSettings = {
    checkoutProducts: settings.checkoutProducts || false,
    version: Versions.THREE,
    voucherNetwork: { cookieTracking: false, settingType: undefined },
    optimize: settings.optimize || { settingsType: undefined },
    employeeBenefits: {
      isEnabled: settings.employeeBenefits?.isEnabled || false,
      showWidgetOnDashboard:
        settings.employeeBenefits?.showWidgetOnDashboard || false,
      addToSidebar: settings.employeeBenefits?.addToSidebar || false,
    },
  };

  if (settings.voucherNetwork) {
    sanitizedSettings.voucherNetwork = {
      ...sanitizedSettings.voucherNetwork,
      ...settings.voucherNetwork,
      settingType: "country",
    };
  }

  return sanitizedSettings;
}

export function SovendusBackendForm({
  currentStoredSettings: _currentStoredSettings,
  saveSettings,
  additionalSteps,
  zoomedVersion = false,
  callSaveOnLoad,
}: SovendusBackendFormProps): JSX.Element {
  const [currentStoredSettings, setCurrentStoredSettings] =
    useState<SovendusAppSettings>(sanitizeSettings(_currentStoredSettings));
  const [currentSettings, setCurrentSettings] = useState<SovendusAppSettings>(
    currentStoredSettings,
  );
  const [activeConfig, setActiveConfig] = useState<
    "voucherNetwork" | "optimize" | "checkoutProducts" | null
  >(null);
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
          setActiveConfig(null);
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
        currentSettings.optimize.countries &&
        Object.entries(currentSettings.optimize.countries.ids)
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
        active: currentSettings.checkoutProducts,
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
            onConfigure={(): void => setActiveConfig("voucherNetwork")}
            requestDemoHref={DEMO_REQUEST_URL}
          />

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
            onConfigure={(): void => setActiveConfig("optimize")}
            requestDemoHref={DEMO_REQUEST_URL}
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
            onConfigure={(): void => setActiveConfig("checkoutProducts")}
            requestDemoHref={DEMO_REQUEST_URL}
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
          title="Configure Voucher Network & Checkout Benefits"
          zoomedVersion={zoomedVersion}
        >
          <SovendusVoucherNetwork
            currentSettings={currentSettings.voucherNetwork}
            setCurrentSettings={setCurrentSettings}
            additionalSteps={additionalSteps?.voucherNetwork}
          />
        </ConfigurationDialog>

        <ConfigurationDialog
          open={activeConfig === "optimize"}
          onOpenChange={(open): void => void handleSave(open)}
          title="Configure Optimize"
          zoomedVersion={zoomedVersion}
        >
          <SovendusOptimize
            currentOptimizeSettings={currentSettings.optimize}
            savedOptimizeSettings={currentStoredSettings.optimize}
            setCurrentSettings={setCurrentSettings}
            additionalSteps={additionalSteps?.optimize}
          />
        </ConfigurationDialog>

        <ConfigurationDialog
          open={activeConfig === "checkoutProducts"}
          onOpenChange={(open): void => void handleSave(open)}
          title="Configure Checkout Products"
          zoomedVersion={zoomedVersion}
        >
          <SovendusCheckoutProducts
            enabled={currentSettings.checkoutProducts}
            setCurrentSettings={setCurrentSettings}
            additionalSteps={additionalSteps?.checkoutProducts}
          />
        </ConfigurationDialog>
      </div>
    );
  }, [
    notificationState,
    zoomedVersion,
    activeConfig,
    currentSettings,
    additionalSteps,
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
    if (callSaveOnLoad){
      void saveSettings(currentStoredSettings);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
