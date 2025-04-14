"use client";

import {
  BarChart,
  CheckCircle,
  Cog,
  Gift,
  Globe,
  Layout,
  Monitor,
  PlusCircle,
  Users,
} from "lucide-react";
import React, {
  type Dispatch,
  type JSX,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import type {
  CountryCodes,
  RewardsSettings,
  SovendusAppSettings,
} from "sovendus-integration-types";
import { SettingsType, TriggerPages } from "sovendus-integration-types";
import { LANGUAGES_BY_COUNTRIES } from "sovendus-integration-types";

import { cn } from "../../../utils";
import { BaseFeatureComponent } from "../../common/base-feature-component";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../shadcn/accordion";
import { Alert, AlertDescription } from "../../shadcn/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/card";
import { Input } from "../../shadcn/input";
import { Label } from "../../shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn/select";
import type { AdditionalStep, AdditionalSteps } from "../../ui/backend-form";
import { CountryOptions } from "../voucher-network";
import {
  EnabledRewardsCountries,
  getAvailableTriggerPages,
  isRewardsEnabled,
} from "./rewards-options";

interface SovendusRewardsProps {
  currentRewardsSettings: RewardsSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  additionalSteps?: AdditionalSteps["rewards"];
  featureFlags?: SovendusRewardsFeatureFlags | undefined;
  defaultTab?: "configure" | "benefits" | "how-it-works";
}

export interface SovendusRewardsFeatureFlags {
  rewardsEnabled: boolean;
  triggers: {
    [TriggerPages.MY_ACCOUNT_DASHBOARD]: boolean;
    [TriggerPages.MY_ORDERS]: boolean;
    [TriggerPages.MY_ORDERS_DETAIL]: boolean;
    [TriggerPages.CUSTOM]: boolean;
  };
}

export function SovendusRewards({
  currentRewardsSettings,
  setCurrentSettings,
  additionalSteps,
  featureFlags,
  defaultTab = "configure",
}: SovendusRewardsProps): JSX.Element {
  return (
    <BaseFeatureComponent
      title="Sovendus Rewards: Enhance Customer Loyalty"
      description="Boost customer engagement and retention by offering personalized rewards in your customer account area."
      gradientFrom="teal-600"
      gradientTo="cyan-600"
      mainColor="teal"
      alertMessage={
        <>
          <strong>Important:</strong> To activate Sovendus Rewards, contact
          Sovendus for a personalized demo and setup. Our team will guide you
          through the entire process.
        </>
      }
      configureContent={
        <ConfigureContent
          currentRewardsSettings={currentRewardsSettings}
          setCurrentSettings={setCurrentSettings}
          additionalSteps={additionalSteps}
          featureFlags={featureFlags}
        />
      }
      benefitsContent={<BenefitsContent />}
      howItWorksContent={<HowItWorksContent />}
      defaultTab={defaultTab}
    />
  );
}

function ConfigureContent({
  currentRewardsSettings,
  setCurrentSettings,
  additionalSteps,
  featureFlags,
}: {
  currentRewardsSettings: RewardsSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  additionalSteps?: AdditionalSteps["rewards"];
  featureFlags?: SovendusRewardsFeatureFlags | undefined;
}): JSX.Element {
  const [selectedTriggerPages, setSelectedTriggerPages] = useState<
    TriggerPages[]
  >(
    currentRewardsSettings?.pages
      ? (Object.keys(currentRewardsSettings.pages) as TriggerPages[])
      : [],
  );
  const [activeTriggerPageTab, setActiveTriggerPageTab] = useState<
    TriggerPages | undefined
  >(selectedTriggerPages?.[0]);

  useEffect(() => {
    if (!activeTriggerPageTab && selectedTriggerPages?.length) {
      setActiveTriggerPageTab(selectedTriggerPages?.[0]);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTriggerPages]);

  return (
    <div className={cn("tw:space-y-6")}>
      <RewardsStatusAlert currentRewardsSettings={currentRewardsSettings} />

      {additionalSteps && (
        <AdditionalSetupSteps additionalSteps={additionalSteps} />
      )}

      <TriggerPagesAccordion
        selectedTriggerPages={selectedTriggerPages}
        setSelectedTriggerPages={setSelectedTriggerPages}
        currentRewardsSettings={currentRewardsSettings}
        setCurrentSettings={setCurrentSettings}
        featureFlags={featureFlags}
        activeTriggerPageTab={activeTriggerPageTab}
        setActiveTriggerPageTab={setActiveTriggerPageTab}
      />
    </div>
  );
}

function RewardsStatusAlert({
  currentRewardsSettings,
}: {
  currentRewardsSettings: RewardsSettings | undefined;
}): JSX.Element {
  const { enabled: rewardsEnabled } = isRewardsEnabled(currentRewardsSettings);

  return (
    <Alert
      className={cn(
        `${
          rewardsEnabled
            ? "tw:bg-green-100 tw:border-green-300"
            : "tw:bg-red-100 tw:border-red-300"
        }`,
      )}
    >
      <AlertDescription
        className={cn(
          rewardsEnabled
            ? "tw:text-green-800 tw:font-medium"
            : "tw:text-red-800 tw:font-medium",
        )}
      >
        <EnabledRewardsCountries currentSettings={currentRewardsSettings} />
      </AlertDescription>
    </Alert>
  );
}

function AdditionalSetupSteps({
  additionalSteps,
}: {
  additionalSteps: AdditionalStep;
}): JSX.Element {
  return (
    <Card className={cn("tw:border-2 tw:border-teal-500")}>
      <CardHeader>
        <CardTitle
          className={cn("tw:text-xl tw:font-semibold tw:flex tw:items-center")}
        >
          <CheckCircle
            className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-teal-500")}
          />
          Additional Setup Steps
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn("tw:font-semibold tw:mb-2")}>
          {additionalSteps.title}
        </div>
        <ol className={cn("tw:list-decimal tw:list-inside tw:space-y-2")}>
          {additionalSteps.subSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

function TriggerPagesAccordion({
  selectedTriggerPages,
  setSelectedTriggerPages,
  currentRewardsSettings,
  setCurrentSettings,
  featureFlags,
  activeTriggerPageTab,
  setActiveTriggerPageTab,
}: {
  selectedTriggerPages: TriggerPages[];
  setSelectedTriggerPages: Dispatch<SetStateAction<TriggerPages[]>>;
  currentRewardsSettings: RewardsSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  featureFlags?: SovendusRewardsFeatureFlags | undefined;
  activeTriggerPageTab: TriggerPages | undefined;
  setActiveTriggerPageTab: Dispatch<SetStateAction<TriggerPages | undefined>>;
}): JSX.Element {
  return (
    <Accordion
      type="single"
      defaultValue="trigger-pages"
      collapsible
      className={cn("tw:w-full tw:mt-8")}
    >
      <AccordionItem
        value="trigger-pages"
        className={cn(
          "tw:border-2 tw:border-teal-500 tw:rounded-lg tw:overflow-hidden",
        )}
      >
        <AccordionTrigger
          className={cn(
            "tw:bg-teal-100 tw:p-4 tw:text-xl tw:font-semibold tw:text-teal-800",
          )}
        >
          <div className={cn("tw:flex tw:items-center")}>
            <Cog className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-teal-700")} />
            Configure Trigger Pages
          </div>
        </AccordionTrigger>
        <AccordionContent className={cn("tw:p-4 tw:bg-white")}>
          <TriggerPagesSelector
            selectedTriggerPages={selectedTriggerPages}
            setSelectedTriggerPages={setSelectedTriggerPages}
            currentRewardsSettings={currentRewardsSettings}
            setCurrentSettings={setCurrentSettings}
            featureFlags={featureFlags}
            activeTriggerPageTab={activeTriggerPageTab}
            setActiveTriggerPageTab={setActiveTriggerPageTab}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function TriggerPagesSelector({
  selectedTriggerPages,
  setSelectedTriggerPages,
  currentRewardsSettings,
  setCurrentSettings,
  featureFlags,
  activeTriggerPageTab,
  setActiveTriggerPageTab,
}: {
  selectedTriggerPages: TriggerPages[];
  setSelectedTriggerPages: Dispatch<SetStateAction<TriggerPages[]>>;
  currentRewardsSettings: RewardsSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  featureFlags?: SovendusRewardsFeatureFlags | undefined;
  activeTriggerPageTab: TriggerPages | undefined;
  setActiveTriggerPageTab: Dispatch<SetStateAction<TriggerPages | undefined>>;
}): JSX.Element {
  const handleTriggerPageSelection = (
    triggerPage: TriggerPages,
    isSelected: boolean,
  ): void => {
    if (isSelected) {
      setSelectedTriggerPages((prev) => [...prev, triggerPage]);
      // Initialize settings for this trigger page if not exists
      setCurrentSettings((prevState) => {
        const updatedSettings = { ...prevState };
        if (!updatedSettings.rewards) {
          // @ts-expect-error - Initialize with empty pages object
          updatedSettings.rewards = { pages: {} };
        }
        // @ts-expect-error - updatedSettings.rewards is defined at this point
        if (!updatedSettings.rewards.pages) {
          // @ts-expect-error - Initialize with empty pages object
          updatedSettings.rewards.pages = {};
        }
        // Initialize with proper structure based on RewardsSettings type
        if (updatedSettings.rewards) {
          updatedSettings.rewards.pages[triggerPage] = {
            settingType: SettingsType.SIMPLE,
            simple: {
              isEnabled: true,
              trafficSourceNumber: "",
              trafficMediumNumber: "",
              // Store UI-specific settings in the iframeContainerQuerySelector
              iframeContainerQuerySelector: {
                selector: "",
                where: "none",
              },
            },
            trigger: "builtIn",
          };
        }
        return updatedSettings;
      });
    } else {
      setSelectedTriggerPages((prev) =>
        prev.filter((page) => page !== triggerPage),
      );
      // Remove settings for this trigger page
      setCurrentSettings((prevState) => {
        const updatedSettings = { ...prevState };
        if (
          updatedSettings.rewards &&
          updatedSettings.rewards.pages &&
          updatedSettings.rewards.pages[triggerPage]
        ) {
          const newPages = { ...updatedSettings.rewards.pages };
          delete newPages[triggerPage];
          updatedSettings.rewards.pages = newPages;
        }
        return updatedSettings;
      });
    }
  };

  return (
    <div className={cn("tw:space-y-6")}>
      <TriggerPagesList
        selectedTriggerPages={selectedTriggerPages}
        handleTriggerPageSelection={handleTriggerPageSelection}
        featureFlags={featureFlags}
      />

      {selectedTriggerPages.length > 0 ? (
        <PageConfigurationSection
          selectedTriggerPages={selectedTriggerPages}
          currentRewardsSettings={currentRewardsSettings}
          setCurrentSettings={setCurrentSettings}
          activeTriggerPageTab={activeTriggerPageTab}
          setActiveTriggerPageTab={setActiveTriggerPageTab}
        />
      ) : (
        <NoSelectedPagesMessage />
      )}
    </div>
  );
}

function TriggerPagesList({
  selectedTriggerPages,
  handleTriggerPageSelection,
  featureFlags,
}: {
  selectedTriggerPages: TriggerPages[];
  handleTriggerPageSelection: (
    triggerPage: TriggerPages,
    isSelected: boolean,
  ) => void;
  featureFlags?: SovendusRewardsFeatureFlags | undefined;
}): JSX.Element {
  return (
    <div className={cn("tw:mb-6")}>
      <h4 className={cn("tw:text-lg tw:font-semibold tw:mb-4")}>
        Select Trigger Pages
      </h4>
      <p className={cn("tw:text-gray-600 tw:mb-4")}>
        Choose where to display Sovendus Rewards in your customer account area:
      </p>
      <div className={cn("tw:grid tw:grid-cols-1 tw:gap-3")}>
        {getAvailableTriggerPages(featureFlags).map((page) => (
          <div
            key={page.value}
            className={cn(
              "tw:flex tw:items-center tw:p-3 tw:rounded-md tw:transition-colors",
              selectedTriggerPages.includes(page.value)
                ? "tw:bg-teal-100 tw:border tw:border-teal-300"
                : "tw:bg-white tw:border tw:border-gray-200 hover:tw:bg-gray-50",
            )}
          >
            <div className={cn("tw:flex tw:items-center")}>
              <input
                type="checkbox"
                id={`trigger-page-${page.value}`}
                checked={selectedTriggerPages.includes(page.value)}
                onChange={(e) =>
                  handleTriggerPageSelection(page.value, e.target.checked)
                }
                className={cn(
                  "tw:w-5 tw:h-5 tw:rounded tw:border-gray-300 tw:text-teal-600 focus:tw:ring-teal-500",
                )}
              />
            </div>
            <div className={cn("tw:ml-3 tw:flex tw:items-center")}>
              <page.icon
                className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-teal-500")}
              />
              <Label
                htmlFor={`trigger-page-${page.value}`}
                className={cn(
                  "tw:font-medium tw:text-gray-700 tw:cursor-pointer",
                )}
              >
                {page.label}
              </Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageConfigurationSection({
  selectedTriggerPages,
  currentRewardsSettings,
  setCurrentSettings,
  activeTriggerPageTab,
  setActiveTriggerPageTab,
}: {
  selectedTriggerPages: TriggerPages[];
  currentRewardsSettings: RewardsSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  activeTriggerPageTab: TriggerPages | undefined;
  setActiveTriggerPageTab: Dispatch<SetStateAction<TriggerPages | undefined>>;
}): JSX.Element {
  return (
    <div className={cn("tw:mt-8")}>
      <div className={cn("tw:mb-6 tw:flex tw:justify-between tw:items-center")}>
        <h4
          className={cn("tw:text-lg tw:font-semibold tw:flex tw:items-center")}
        >
          <Globe className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-teal-600")} />
          Configure Page Settings
        </h4>
        <p className={cn("tw:text-sm tw:text-gray-500")}>
          {selectedTriggerPages.length} page
          {selectedTriggerPages.length > 1 ? "s" : ""} selected
        </p>
      </div>

      <div
        className={cn(
          "tw:bg-white tw:border tw:border-gray-200 tw:rounded-lg tw:overflow-hidden",
        )}
      >
        <PageTabs
          selectedTriggerPages={selectedTriggerPages}
          activeTriggerPageTab={activeTriggerPageTab}
          setActiveTriggerPageTab={setActiveTriggerPageTab}
        />

        <PageTabContent
          selectedTriggerPages={selectedTriggerPages}
          currentRewardsSettings={currentRewardsSettings}
          setCurrentSettings={setCurrentSettings}
          activeTriggerPageTab={activeTriggerPageTab}
        />
      </div>
    </div>
  );
}

function PageTabs({
  selectedTriggerPages,
  activeTriggerPageTab,
  setActiveTriggerPageTab,
}: {
  selectedTriggerPages: TriggerPages[];
  activeTriggerPageTab: TriggerPages | undefined;
  setActiveTriggerPageTab: Dispatch<SetStateAction<TriggerPages | undefined>>;
}): JSX.Element {
  if (selectedTriggerPages.length === 0) {
    return <></>;
  }

  return (
    <div className={cn("tw:border-b tw:border-gray-200")}>
      <div className={cn("tw:flex tw:overflow-x-auto tw:scrollbar-hide")}>
        {selectedTriggerPages.map((page) => (
          <button
            key={page}
            onClick={() => setActiveTriggerPageTab(page)}
            className={cn(
              "tw:px-6 tw:py-3 tw:font-medium tw:text-sm tw:whitespace-nowrap tw:border-b-2 tw:transition-colors",
              activeTriggerPageTab === page
                ? "tw:border-teal-600 tw:text-teal-800 tw:bg-teal-100"
                : "tw:border-transparent tw:text-gray-700 hover:tw:text-gray-900 hover:tw:bg-gray-100",
            )}
          >
            {page === TriggerPages.MY_ACCOUNT_DASHBOARD && (
              <Layout className={cn("tw:inline tw:mr-2 tw:h-4 tw:w-4")} />
            )}
            {page === TriggerPages.MY_ORDERS && (
              <Gift className={cn("tw:inline tw:mr-2 tw:h-4 tw:w-4")} />
            )}
            {page === TriggerPages.MY_ORDERS_DETAIL && (
              <CheckCircle className={cn("tw:inline tw:mr-2 tw:h-4 tw:w-4")} />
            )}
            {page === TriggerPages.CUSTOM && (
              <PlusCircle className={cn("tw:inline tw:mr-2 tw:h-4 tw:w-4")} />
            )}
            {page === TriggerPages.MY_ACCOUNT_DASHBOARD
              ? "My Account Dashboard"
              : page === TriggerPages.MY_ORDERS
                ? "My Orders"
                : page === TriggerPages.MY_ORDERS_DETAIL
                  ? "Order Detail"
                  : "Custom Page"}
          </button>
        ))}
      </div>
    </div>
  );
}

function PageTabContent({
  selectedTriggerPages,
  currentRewardsSettings,
  setCurrentSettings,
  activeTriggerPageTab,
}: {
  selectedTriggerPages: TriggerPages[];
  currentRewardsSettings: RewardsSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  activeTriggerPageTab: TriggerPages | undefined;
}): JSX.Element {
  const handleRenderLocationChange = (
    triggerPage: TriggerPages,
    value: string,
  ): void => {
    setCurrentSettings((prevState) => {
      const updatedSettings = { ...prevState };
      if (
        updatedSettings.rewards &&
        updatedSettings.rewards.pages &&
        updatedSettings.rewards.pages[triggerPage]
      ) {
        const pageSettings = updatedSettings.rewards.pages[triggerPage];

        // Update the settings based on the type
        if (
          pageSettings.settingType === SettingsType.SIMPLE &&
          pageSettings.simple
        ) {
          // Store the render location in the selector property
          // We'll use a special format: "renderLocation:value"
          const selector = `renderLocation:${value}`;

          updatedSettings.rewards.pages[triggerPage] = {
            ...pageSettings,
            simple: {
              ...pageSettings.simple,
              iframeContainerQuerySelector: {
                selector: selector,
                where: "none",
              },
            },
          };
        }
      }
      return updatedSettings;
    });
  };

  const handleCustomSelectorChange = (
    triggerPage: TriggerPages,
    value: string,
  ): void => {
    setCurrentSettings((prevState) => {
      const updatedSettings = { ...prevState };
      if (
        updatedSettings.rewards &&
        updatedSettings.rewards.pages &&
        updatedSettings.rewards.pages[triggerPage]
      ) {
        const pageSettings = updatedSettings.rewards.pages[triggerPage];

        // Update the settings based on the type
        if (
          pageSettings.settingType === SettingsType.SIMPLE &&
          pageSettings.simple
        ) {
          // Get the current render location from the selector
          const currentSelector =
            pageSettings.simple.iframeContainerQuerySelector?.selector || "";
          const renderLocation = currentSelector.startsWith("renderLocation:")
            ? currentSelector.split(":")[1]
            : "main-content";

          // Store both values in the selector property
          // Format: "renderLocation:value|customSelector:value"
          const selector = `renderLocation:${renderLocation}|customSelector:${value}`;

          updatedSettings.rewards.pages[triggerPage] = {
            ...pageSettings,
            simple: {
              ...pageSettings.simple,
              iframeContainerQuerySelector: {
                selector: selector,
                where: "none",
              },
            },
          };
        }
      }
      return updatedSettings;
    });
  };

  return (
    <div className={cn("tw:p-4")}>
      {selectedTriggerPages.map((page) => (
        <div
          key={page}
          className={cn(
            activeTriggerPageTab === page ? "tw:block" : "tw:hidden",
          )}
        >
          <div className={cn("tw:space-y-6")}>
            <RenderLocationSelector
              page={page}
              currentRewardsSettings={currentRewardsSettings}
              handleRenderLocationChange={handleRenderLocationChange}
            />

            {/* @ts-expect-error - Custom property for UI purposes */}
            {currentRewardsSettings?.pages?.[page]?.renderLocation ===
              "custom" && (
              <CustomSelectorInput
                page={page}
                currentRewardsSettings={currentRewardsSettings}
                handleCustomSelectorChange={handleCustomSelectorChange}
              />
            )}

            <CountrySettingsSection
              page={page}
              currentRewardsSettings={currentRewardsSettings}
              setCurrentSettings={setCurrentSettings}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function RenderLocationSelector({
  page,
  currentRewardsSettings,
  handleRenderLocationChange,
}: {
  page: TriggerPages;
  currentRewardsSettings: RewardsSettings | undefined;
  handleRenderLocationChange: (
    triggerPage: TriggerPages,
    value: string,
  ) => void;
}): JSX.Element {
  // Extract render location from the selector
  const renderLocation =
    ((): string => {
      const selector =
        currentRewardsSettings?.pages?.[page]?.settingType ===
        SettingsType.SIMPLE
          ? currentRewardsSettings?.pages?.[page]?.simple
              ?.iframeContainerQuerySelector?.selector || ""
          : "";

      if (selector.includes("renderLocation:")) {
        const match = selector.match(/renderLocation:([^|]+)/);
        return match && match[1] ? match[1] : "main-content";
      }
      return "main-content";
    })() || "main-content";

  return (
    <div>
      <Label
        htmlFor={`render-location-${page}`}
        className={cn(
          "tw:text-sm tw:font-medium tw:text-gray-700 tw:mb-1.5 tw:block",
        )}
      >
        Render Location
      </Label>
      <Select
        onValueChange={(value) => handleRenderLocationChange(page, value)}
        value={renderLocation}
      >
        <SelectTrigger
          id={`render-location-${page}`}
          className={cn("tw:w-full")}
        >
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sidebar">Sidebar</SelectItem>
          <SelectItem value="main-content">Main Content</SelectItem>
          <SelectItem value="modal">Modal Window</SelectItem>
          <SelectItem value="custom">Custom Element</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function CustomSelectorInput({
  page,
  currentRewardsSettings,
  handleCustomSelectorChange,
}: {
  page: TriggerPages;
  currentRewardsSettings: RewardsSettings | undefined;
  handleCustomSelectorChange: (
    triggerPage: TriggerPages,
    value: string,
  ) => void;
}): JSX.Element {
  // Extract custom selector from the selector
  const customSelector =
    ((): string => {
      const selector =
        currentRewardsSettings?.pages?.[page]?.settingType ===
        SettingsType.SIMPLE
          ? currentRewardsSettings?.pages?.[page]?.simple
              ?.iframeContainerQuerySelector?.selector || ""
          : "";

      if (selector.includes("customSelector:")) {
        const match = selector.match(/customSelector:([^|]+)/);
        return match && match[1] ? match[1] : "";
      }
      return "";
    })() || "";

  return (
    <div>
      <Label
        htmlFor={`custom-selector-${page}`}
        className={cn(
          "tw:text-sm tw:font-medium tw:text-gray-700 tw:mb-1.5 tw:block",
        )}
      >
        Custom CSS Selector
      </Label>
      <Input
        id={`custom-selector-${page}`}
        value={customSelector}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleCustomSelectorChange(page, e.target.value)
        }
        placeholder="Enter CSS selector (e.g., #rewards-container)"
        className={cn("tw:w-full")}
      />
    </div>
  );
}

function CountrySettingsSection({
  page,
  currentRewardsSettings,
  setCurrentSettings,
}: {
  page: TriggerPages;
  currentRewardsSettings: RewardsSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
}): JSX.Element {
  return (
    <div
      className={cn(
        "tw:bg-gray-50 tw:p-4 tw:rounded-lg tw:border tw:border-gray-200",
      )}
    >
      <h5
        className={cn(
          "tw:text-md tw:font-medium tw:mb-4 tw:text-gray-700 tw:flex tw:items-center",
        )}
      >
        <Globe className={cn("tw:mr-2 tw:h-4 tw:w-4 tw:text-teal-600")} />
        Country-Specific Settings
      </h5>

      <CountryOptions
        currentSettings={currentRewardsSettings?.pages?.[page]}
        setCurrentSettings={(newSettings) => {
          setCurrentSettings((prevState) => {
            const updatedSettings = { ...prevState };
            if (updatedSettings.rewards && updatedSettings.rewards.pages) {
              // @ts-expect-error - We're updating the settings with a compatible object
              updatedSettings.rewards.pages[page] = newSettings;
            }
            return updatedSettings;
          });
        }}
        countryCodes={Object.keys(LANGUAGES_BY_COUNTRIES) as CountryCodes[]}
      />
    </div>
  );
}

function NoSelectedPagesMessage(): JSX.Element {
  return (
    <div className={cn("tw:text-center tw:py-10 tw:text-gray-500")}>
      <div
        className={cn(
          "tw:mx-auto tw:w-12 tw:h-12 tw:rounded-full tw:bg-gray-100 tw:flex tw:items-center tw:justify-center tw:mb-4",
        )}
      >
        <Monitor className={cn("tw:h-6 tw:w-6 tw:text-gray-400")} />
      </div>
      <h3 className={cn("tw:text-lg tw:font-medium tw:text-gray-900")}>
        No pages selected
      </h3>
      <p className={cn("tw:mt-2 tw:text-sm tw:text-gray-500")}>
        Select at least one trigger page to configure Sovendus Rewards.
      </p>
    </div>
  );
}

function BenefitsContent(): JSX.Element {
  return (
    <div className={cn("tw:space-y-6")}>
      <div className={cn("tw:grid tw:grid-cols-1 md:tw:grid-cols-3 tw:gap-6")}>
        <Card
          className={cn("tw:border-teal-300 tw:shadow-md tw:overflow-hidden")}
        >
          <CardHeader className={cn("tw:bg-teal-100")}>
            <CardTitle
              className={cn(
                "tw:flex tw:items-center tw:text-teal-900 tw:font-bold",
              )}
            >
              <Gift className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-teal-800")} />
              Enhanced Engagement
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("tw:bg-white tw:p-4")}>
            <p className={cn("tw:text-gray-800 tw:font-medium")}>
              Increase customer interaction and time spent in the account area
              with personalized rewards that drive repeat visits.
            </p>
          </CardContent>
        </Card>

        <Card
          className={cn("tw:border-teal-300 tw:shadow-md tw:overflow-hidden")}
        >
          <CardHeader className={cn("tw:bg-teal-100")}>
            <CardTitle
              className={cn(
                "tw:flex tw:items-center tw:text-teal-900 tw:font-bold",
              )}
            >
              <Users className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-teal-800")} />
              Loyalty Boost
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("tw:bg-white tw:p-4")}>
            <p className={cn("tw:text-gray-800 tw:font-medium")}>
              Foster customer loyalty by offering exclusive deals and rewards to
              registered users, encouraging repeat purchases.
            </p>
          </CardContent>
        </Card>

        <Card
          className={cn("tw:border-teal-300 tw:shadow-md tw:overflow-hidden")}
        >
          <CardHeader className={cn("tw:bg-teal-100")}>
            <CardTitle
              className={cn(
                "tw:flex tw:items-center tw:text-teal-900 tw:font-bold",
              )}
            >
              <BarChart
                className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-teal-800")}
              />
              Revenue Growth
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("tw:bg-white tw:p-4")}>
            <p className={cn("tw:text-gray-800 tw:font-medium")}>
              Generate additional revenue streams through the rewards program
              while improving overall customer lifetime value.
            </p>
          </CardContent>
        </Card>
      </div>

      <div
        className={cn(
          "tw:bg-teal-50 tw:p-6 tw:rounded-lg tw:mb-8 tw:border tw:border-teal-200 tw:shadow-md",
        )}
      >
        <div
          className={cn("tw:text-2xl tw:font-bold tw:mb-4 tw:text-teal-900")}
        >
          Key Benefits
        </div>
        <ul
          className={cn("tw:list-disc tw:pl-5 tw:space-y-3 tw:text-gray-800")}
        >
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-teal-900")}>
              Increased Engagement:
            </strong>{" "}
            Keep customers coming back to their account area, increasing session
            time by up to 30%.
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-teal-900")}>
              Enhanced Loyalty:
            </strong>{" "}
            Build stronger relationships with your customers, improving
            retention rates by 15-20%.
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-teal-900")}>
              Additional Revenue:
            </strong>{" "}
            Generate new income streams through the rewards program with no
            upfront costs.
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-teal-900")}>
              Seamless Integration:
            </strong>{" "}
            Easy setup with your existing customer account area requiring
            minimal development effort.
          </li>
        </ul>
      </div>
    </div>
  );
}

function HowItWorksContent(): JSX.Element {
  return (
    <div
      className={cn(
        "tw:bg-teal-50 tw:p-8 tw:rounded-lg tw:space-y-6 tw:border tw:border-teal-200 tw:shadow-md",
      )}
    >
      <div className={cn("tw:text-2xl tw:font-bold tw:mb-6 tw:text-teal-900")}>
        How Sovendus Rewards Works
      </div>
      <ol className={cn("tw:space-y-6")}>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-teal-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong className={cn("tw:text-lg tw:font-bold tw:text-teal-900")}>
              Integration Setup:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              We work with you to seamlessly integrate Sovendus Rewards into
              your customer account area, ensuring it matches your site's design
              and user experience.
            </p>
          </div>
        </li>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-teal-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong className={cn("tw:text-lg tw:font-bold tw:text-teal-900")}>
              Personalized Rewards:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              Customers receive tailored offers and rewards when they log into
              their account, enhancing their shopping experience and encouraging
              repeat visits.
            </p>
          </div>
        </li>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-teal-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong className={cn("tw:text-lg tw:font-bold tw:text-teal-900")}>
              Ongoing Optimization:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              Our team continuously monitors performance and optimizes the
              rewards program to maximize engagement and revenue.
            </p>
          </div>
        </li>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-teal-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong className={cn("tw:text-lg tw:font-bold tw:text-teal-900")}>
              Performance Tracking:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              Access detailed analytics to track customer engagement and the
              performance of your rewards program.
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}
