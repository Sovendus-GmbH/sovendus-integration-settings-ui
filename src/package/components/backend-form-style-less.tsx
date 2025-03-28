import { BarChart2, Gift, ShoppingBagIcon } from "lucide-react";
import type { JSX } from "react";
import React, { useEffect, useMemo, useState } from "react";
import { type SovendusAppSettings } from "sovendus-integration-types";

import { cleanConfig, cn, loggerInfo } from "../utils/utils";
import { SovendusCheckoutProducts } from "./checkout-products";
import { ConfigurationDialog } from "./configuration-dialog";
import { ContactFormDialog } from "./contact-form-dialog";
import { Footer } from "./footer";
import { Notification } from "./notification";
import { SovendusOptimize } from "./optimize";
import { EnabledOptimizeCountries } from "./optimize-country-options";
import { ProductCard } from "./product-card";
import { Alert, AlertDescription, AlertTitle } from "./shadcn/alert";
import { TestingStepsDialog } from "./testing-steps";
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
  debug?: boolean;
}

export function SovendusBackendForm({
  currentStoredSettings: _currentStoredSettings,
  saveSettings,
  additionalSteps,
  zoomedVersion = false,
  callSaveOnLoad,
  debug = false,
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
  const [activeDialog, setActiveDialog] = useState<
    | "voucherNetwork"
    | "optimize"
    | "checkoutProducts"
    | "TestingSteps"
    | "contactForm"
    | null
  >(null);
  const [notificationState, setNotificationState] = useState<{
    message: string;
    type: "success" | "error" | "loading";
  } | null>(null);

  useSettingsSaveOnLoad(saveSettings, currentStoredSettings, callSaveOnLoad);

  return useMemo(() => {
    const openContactForm = (): void => {
      setActiveDialog("contactForm");
    };
    const openSetupGuide = (): void => {
      setActiveDialog("TestingSteps");
    };

    const buttonsDisabled = notificationState?.type === "loading";
    const handleSave = async (open: boolean): Promise<void> => {
      if (!open) {
        const hasUnsavedChanges =
          JSON.stringify(currentSettings) !==
          JSON.stringify(currentStoredSettings);
        const prevActiveConfig = activeDialog;
        try {
          setActiveDialog(null);
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
          setActiveDialog(prevActiveConfig);
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
            onConfigure={(): void => setActiveDialog("voucherNetwork")}
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
            onConfigure={(): void => setActiveDialog("optimize")}
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
            onConfigure={(): void => setActiveDialog("checkoutProducts")}
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
          open={activeDialog === "voucherNetwork"}
          onOpenChange={(open): void => void handleSave(open)}
          title="Configure Voucher Network & Checkout Benefits"
          zoomedVersion={zoomedVersion}
        >
          <SovendusVoucherNetwork
            currentSettings={currentSettings.voucherNetwork}
            setCurrentSettings={setCurrentSettings}
            additionalSteps={additionalSteps?.voucherNetwork}
            openContactForm={openContactForm}
            openSetupGuide={openSetupGuide}
          />
        </ConfigurationDialog>

        <ConfigurationDialog
          open={activeDialog === "optimize"}
          onOpenChange={(open): void => void handleSave(open)}
          title="Configure Optimize"
          zoomedVersion={zoomedVersion}
        >
          <SovendusOptimize
            currentOptimizeSettings={currentSettings.optimize}
            savedOptimizeSettings={currentStoredSettings.optimize}
            setCurrentSettings={setCurrentSettings}
            additionalSteps={additionalSteps?.optimize}
            openContactForm={openContactForm}
            openSetupGuide={openSetupGuide}
          />
        </ConfigurationDialog>

        <ConfigurationDialog
          open={activeDialog === "checkoutProducts"}
          onOpenChange={(open): void => void handleSave(open)}
          title="Configure Checkout Products"
          zoomedVersion={zoomedVersion}
        >
          <SovendusCheckoutProducts
            enabled={currentSettings.checkoutProducts || false}
            setCurrentSettings={setCurrentSettings}
            additionalSteps={additionalSteps?.checkoutProducts}
            openContactForm={openContactForm}
            openSetupGuide={openSetupGuide}
          />
        </ConfigurationDialog>
        <ContactFormDialog
          open={activeDialog === "contactForm"}
          setActiveDialog={setActiveDialog}
        />
        <TestingStepsDialog
          type={String(activeDialog)}
          open={activeDialog === "TestingSteps"}
          setActiveDialog={setActiveDialog}
        />
      </div>
    );
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationState, activeDialog, currentSettings, currentStoredSettings]);
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
