"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Cog,
  ExternalLink,
  Gift,
  Globe,
  Layout,
  Monitor,
  PlusCircle,
} from "lucide-react";
import { type Dispatch, type JSX, type SetStateAction, useState } from "react";
import type {
  CountryCodes,
  SovendusAppSettings,
  VoucherNetworkSettings,
} from "sovendus-integration-types";
import { LANGUAGES_BY_COUNTRIES } from "sovendus-integration-types";

import { cn } from "../utils/utils";
import { type AdditionalSteps, DEMO_REQUEST_URL } from "./backend-form";
import { Alert, AlertDescription } from "./shadcn/alert";
import { Button } from "./shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "./shadcn/card";
import { Input } from "./shadcn/input";
import { Label } from "./shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcn/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./shadcn/tabs";
import {
  CountryOptions,
  EnabledVoucherNetworkCountries,
  isVnEnabled,
} from "./voucher-network-country-options";

interface SovendusRewardsProps {
  currentRewardsSettings: VoucherNetworkSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  additionalSteps?: AdditionalSteps["rewards"];
  featureFlags?: SovendusRewardsFeatureFlags;
}

export interface SovendusRewardsFeatureFlags {
  rewardsEnabled: boolean;
  triggers: {
    dashboard;
    account;
    orders;
    custom;
  };
}

export function SovendusRewards({
  currentRewardsSettings,
  setCurrentSettings,
  additionalSteps,
  featureFlags,
}: SovendusRewardsProps): JSX.Element {
  const rewardsEnabled = isVnEnabled(currentRewardsSettings);
  const [selectedTriggerPages, setSelectedTriggerPages] = useState<string[]>(
    currentRewardsSettings?.triggerPages
      ? Object.keys(currentRewardsSettings.triggerPages)
      : [],
  );
  const [activeTriggerPageTab, setActiveTriggerPageTab] = useState<string>(
    selectedTriggerPages.length > 0 ? selectedTriggerPages[0] : "",
  );

  const handleTriggerPageSelection = (
    triggerPage: string,
    isSelected: boolean,
  ): void => {
    if (isSelected) {
      setSelectedTriggerPages((prev) => [...prev, triggerPage]);
      // Initialize settings for this trigger page if not exists
      setCurrentSettings((prevState) => ({
        ...prevState,
        rewards: {
          ...prevState.rewards,
          triggerPages: {
            ...prevState.rewards?.triggerPages,
            [triggerPage]: {
              renderLocation: "main-content",
              customSelector: "",
              countries: { ids: {} },
            },
          },
        },
      }));
    } else {
      setSelectedTriggerPages((prev) =>
        prev.filter((page) => page !== triggerPage),
      );
      // Remove this trigger page from settings
      setCurrentSettings((prevState) => {
        const newTriggerPages = { ...prevState.rewards?.triggerPages };
        delete newTriggerPages[triggerPage];
        return {
          ...prevState,
          rewards: {
            ...prevState.rewards,
            triggerPages: newTriggerPages,
          },
        };
      });
    }
  };

  const handleRenderLocationChange = (
    triggerPage: string,
    value: string,
  ): void => {
    setCurrentSettings((prevState) => ({
      ...prevState,
      rewards: {
        ...prevState.rewards,
        triggerPages: {
          ...prevState.rewards?.triggerPages,
          [triggerPage]: {
            ...prevState.rewards?.triggerPages?.[triggerPage],
            renderLocation: value,
          },
        },
      },
    }));
  };

  const handleCustomSelectorChange = (
    triggerPage: string,
    value: string,
  ): void => {
    setCurrentSettings((prevState) => ({
      ...prevState,
      rewards: {
        ...prevState.rewards,
        triggerPages: {
          ...prevState.rewards?.triggerPages,
          [triggerPage]: {
            ...prevState.rewards?.triggerPages?.[triggerPage],
            customSelector: value,
          },
        },
      },
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn("tw:space-y-6 tw:pb-8")}
    >
      <div
        className={cn(
          "tw:bg-gradient-to-r tw:from-teal-600 tw:to-cyan-600 tw:text-white tw:p-8 tw:rounded-lg tw:shadow-lg",
        )}
      >
        <div className={cn("tw:text-3xl tw:font-bold tw:mb-4 tw:text-white")}>
          Sovendus Rewards: Enhance Customer Loyalty
        </div>
        <p className={cn("tw:text-xl tw:mb-6")}>
          Boost customer engagement and retention by offering personalized
          rewards in your customer account area.
        </p>
        <Button
          size="lg"
          onClick={(): void => void window.open(DEMO_REQUEST_URL, "_blank")}
          className={cn("tw:bg-white tw:text-teal-600 tw:hover:bg-teal-100")}
        >
          Schedule Your Personalized Demo
          <ExternalLink className={cn("tw:ml-2 tw:h-4 tw:w-4")} />
        </Button>
      </div>

      <Alert className={cn("tw:mb-4 tw:bg-teal-50 tw:border-teal-200")}>
        <AlertDescription className={cn("tw:text-teal-700 tw:font-semibold")}>
          <strong>Important:</strong> To activate Sovendus Rewards, contact
          Sovendus for a personalized demo and setup. Our team will guide you
          through the entire process.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="configure" className={cn("tw:w-full")}>
        <TabsList className={cn("tw:grid tw:w-full tw:grid-cols-3 tw:mb-8")}>
          <TabsTrigger
            value="configure"
            className={cn(
              "tw:text-lg tw:font-semibold tw:py-3 tw:bg-teal-100 tw:data-[state=active]:bg-teal-600 tw:data-[state=active]:text-white",
            )}
          >
            Configure
          </TabsTrigger>
          <TabsTrigger
            value="benefits"
            className={cn(
              "tw:text-lg tw:font-semibold tw:py-3 tw:bg-teal-100 tw:data-[state=active]:bg-teal-600 tw:data-[state=active]:text-white",
            )}
          >
            Key Benefits
          </TabsTrigger>
          <TabsTrigger
            value="how-it-works"
            className={cn(
              "tw:text-lg tw:font-semibold tw:py-3 tw:bg-teal-100 tw:data-[state=active]:bg-teal-600 tw:data-[state=active]:text-white",
            )}
          >
            How It Works
          </TabsTrigger>
        </TabsList>
        <TabsContent value="configure">
          <div className={cn("tw:space-y-6")}>
            <Alert
              className={cn(
                `${
                  rewardsEnabled
                    ? "tw:bg-green-50 tw:border-green-200"
                    : "tw:bg-red-50 tw:border-red-200"
                } tw:mt-2`,
              )}
            >
              <AlertDescription
                className={cn(
                  rewardsEnabled ? "tw:text-green-700" : "tw:text-red-700",
                )}
              >
                <EnabledVoucherNetworkCountries
                  currentSettings={currentRewardsSettings}
                />
              </AlertDescription>
            </Alert>
            {additionalSteps && (
              <Card className={cn("tw:border-2 tw:border-teal-500")}>
                <CardHeader>
                  <CardTitle
                    className={cn(
                      "tw:text-xl tw:font-semibold tw:flex tw:items-center",
                    )}
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
                  <ol
                    className={cn(
                      "tw:list-decimal tw:list-inside tw:space-y-2",
                    )}
                  >
                    {additionalSteps.subSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}

            <Card
              className={cn(
                "tw:overflow-hidden tw:border-2 tw:border-teal-500",
              )}
            >
              <CardHeader className={cn("tw:bg-teal-50 tw:pb-4")}>
                <CardTitle
                  className={cn(
                    "tw:flex tw:items-center tw:text-xl tw:font-semibold",
                  )}
                >
                  <Cog
                    className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-teal-600")}
                  />
                  Configure Sovendus Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className={cn("tw:p-6")}>
                <p className={cn("tw:mb-6 tw:text-lg tw:text-gray-700")}>
                  Set up Sovendus Rewards for your customer account area,
                  enhancing engagement and loyalty.
                </p>

                <div
                  className={cn(
                    "tw:mb-8 tw:bg-gray-50 tw:p-6 tw:rounded-lg tw:border tw:border-gray-200",
                  )}
                >
                  <h4
                    className={cn(
                      "tw:text-lg tw:font-semibold tw:mb-4 tw:flex tw:items-center",
                    )}
                  >
                    <Monitor
                      className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-teal-600")}
                    />
                    Select Trigger Pages
                  </h4>
                  <p className={cn("tw:text-gray-600 tw:mb-4")}>
                    Choose which pages in your customer account area should
                    display rewards:
                  </p>

                  <div
                    className={cn(
                      "tw:grid tw:grid-cols-1 md:tw:grid-cols-2 tw:gap-4",
                    )}
                  >
                    {[
                      { id: "dashboard", label: "Dashboard", icon: Layout },
                      {
                        id: "account",
                        label: "Account Page",
                        icon: CheckCircle,
                      },
                      { id: "orders", label: "Orders Page", icon: Gift },
                      { id: "custom", label: "Custom Page", icon: PlusCircle },
                    ].map((page) => (
                      <div
                        key={page.id}
                        className={cn(
                          "tw:flex tw:items-center tw:p-3 tw:rounded-md tw:transition-colors",
                          selectedTriggerPages.includes(page.id)
                            ? "tw:bg-teal-100 tw:border tw:border-teal-300"
                            : "tw:bg-white tw:border tw:border-gray-200 hover:tw:bg-gray-50",
                        )}
                      >
                        <div className={cn("tw:flex tw:items-center")}>
                          <input
                            type="checkbox"
                            id={`trigger-page-${page.id}`}
                            checked={selectedTriggerPages.includes(page.id)}
                            onChange={(e) =>
                              handleTriggerPageSelection(
                                page.id,
                                e.target.checked,
                              )
                            }
                            className={cn(
                              "tw:w-5 tw:h-5 tw:rounded tw:border-gray-300 tw:text-teal-600 focus:tw:ring-teal-500",
                            )}
                          />
                        </div>
                        <div className={cn("tw:ml-3 tw:flex tw:items-center")}>
                          <page.icon
                            className={cn(
                              "tw:mr-2 tw:h-5 tw:w-5 tw:text-teal-500",
                            )}
                          />
                          <Label
                            htmlFor={`trigger-page-${page.id}`}
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

                {selectedTriggerPages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn("tw:mt-8")}
                  >
                    <div
                      className={cn(
                        "tw:mb-6 tw:flex tw:justify-between tw:items-center",
                      )}
                    >
                      <h4
                        className={cn(
                          "tw:text-lg tw:font-semibold tw:flex tw:items-center",
                        )}
                      >
                        <Globe
                          className={cn(
                            "tw:mr-2 tw:h-5 tw:w-5 tw:text-teal-600",
                          )}
                        />
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
                      <div
                        className={cn(
                          "tw:flex tw:overflow-x-auto tw:border-b tw:border-gray-200",
                        )}
                      >
                        {selectedTriggerPages.map((page) => (
                          <button
                            key={page}
                            onClick={() => setActiveTriggerPageTab(page)}
                            className={cn(
                              "tw:px-6 tw:py-3 tw:font-medium tw:text-sm tw:whitespace-nowrap tw:border-b-2 tw:transition-colors",
                              activeTriggerPageTab === page
                                ? "tw:border-teal-500 tw:text-teal-600 tw:bg-teal-50"
                                : "tw:border-transparent tw:text-gray-500 hover:tw:text-gray-700 hover:tw:bg-gray-50",
                            )}
                          >
                            {page === "dashboard" && (
                              <Layout
                                className={cn(
                                  "tw:inline tw:mr-2 tw:h-4 tw:w-4",
                                )}
                              />
                            )}
                            {page === "account" && (
                              <CheckCircle
                                className={cn(
                                  "tw:inline tw:mr-2 tw:h-4 tw:w-4",
                                )}
                              />
                            )}
                            {page === "orders" && (
                              <Gift
                                className={cn(
                                  "tw:inline tw:mr-2 tw:h-4 tw:w-4",
                                )}
                              />
                            )}
                            {page === "custom" && (
                              <PlusCircle
                                className={cn(
                                  "tw:inline tw:mr-2 tw:h-4 tw:w-4",
                                )}
                              />
                            )}
                            {page.charAt(0).toUpperCase() + page.slice(1)} Page
                          </button>
                        ))}
                      </div>

                      <div className={cn("tw:p-6")}>
                        {selectedTriggerPages.map((page) => (
                          <div
                            key={page}
                            className={cn(
                              "tw:space-y-6",
                              activeTriggerPageTab === page
                                ? "tw:block"
                                : "tw:hidden",
                            )}
                          >
                            <div
                              className={cn(
                                "tw:bg-gray-50 tw:p-4 tw:rounded-lg tw:border tw:border-gray-200",
                              )}
                            >
                              <h5
                                className={cn(
                                  "tw:text-md tw:font-medium tw:mb-4 tw:text-gray-700",
                                )}
                              >
                                Display Location for{" "}
                                {page.charAt(0).toUpperCase() + page.slice(1)}{" "}
                                Page
                              </h5>

                              <div
                                className={cn(
                                  "tw:grid tw:grid-cols-1 md:tw:grid-cols-2 tw:gap-x-6 tw:gap-y-4",
                                )}
                              >
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
                                    onValueChange={(value) =>
                                      handleRenderLocationChange(page, value)
                                    }
                                    value={
                                      currentRewardsSettings?.triggerPages?.[
                                        page
                                      ]?.renderLocation || ""
                                    }
                                  >
                                    <SelectTrigger
                                      id={`render-location-${page}`}
                                      className={cn("tw:w-full")}
                                    >
                                      <SelectValue placeholder="Select location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="sidebar">
                                        Sidebar
                                      </SelectItem>
                                      <SelectItem value="main-content">
                                        Main Content
                                      </SelectItem>
                                      <SelectItem value="modal">
                                        Modal Window
                                      </SelectItem>
                                      <SelectItem value="custom">
                                        Custom Element
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                {currentRewardsSettings?.triggerPages?.[page]
                                  ?.renderLocation === "custom" && (
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
                                      placeholder="#rewards-container"
                                      value={
                                        currentRewardsSettings?.triggerPages?.[
                                          page
                                        ]?.customSelector || ""
                                      }
                                      onChange={(e): void => {
                                        handleCustomSelectorChange(
                                          page,
                                          e.target.value,
                                        );
                                      }}
                                      className={cn("tw:w-full")}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>

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
                                <Globe
                                  className={cn(
                                    "tw:mr-2 tw:h-4 tw:w-4 tw:text-teal-600",
                                  )}
                                />
                                Country-Specific Settings
                              </h5>

                              <CountryOptions
                                currentSettings={
                                  currentRewardsSettings?.triggerPages?.[page]
                                }
                                setCurrentSettings={(newSettings) => {
                                  setCurrentSettings((prevState) => ({
                                    ...prevState,
                                    rewards: {
                                      ...prevState.rewards,
                                      triggerPages: {
                                        ...prevState.rewards?.triggerPages,
                                        [page]: newSettings,
                                      },
                                    },
                                  }));
                                }}
                                countryCodes={
                                  Object.keys(
                                    LANGUAGES_BY_COUNTRIES,
                                  ) as CountryCodes[]
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedTriggerPages.length === 0 && (
                  <div
                    className={cn("tw:text-center tw:py-10 tw:text-gray-500")}
                  >
                    <div
                      className={cn(
                        "tw:mx-auto tw:w-12 tw:h-12 tw:rounded-full tw:bg-gray-100 tw:flex tw:items-center tw:justify-center tw:mb-4",
                      )}
                    >
                      <Monitor
                        className={cn("tw:h-6 tw:w-6 tw:text-gray-400")}
                      />
                    </div>
                    <h3
                      className={cn(
                        "tw:text-lg tw:font-medium tw:text-gray-900",
                      )}
                    >
                      No pages selected
                    </h3>
                    <p className={cn("tw:mt-2 tw:text-sm tw:text-gray-500")}>
                      Select at least one trigger page to configure Sovendus
                      Rewards.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="benefits">
          <div
            className={cn(
              "tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-6 tw:mb-8",
            )}
          >
            <Card>
              <CardHeader>
                <CardTitle className={cn("tw:flex tw:items-center")}>
                  <Gift
                    className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-teal-500")}
                  />
                  Enhanced Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Increase customer interaction and time spent in the account
                  area with personalized rewards.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className={cn("tw:flex tw:items-center")}>
                  <Gift
                    className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-green-500")}
                  />
                  Loyalty Boost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Foster customer loyalty by offering exclusive deals and
                  rewards to registered users.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className={cn("tw:bg-gray-100 tw:p-6 tw:rounded-lg tw:mb-8")}>
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center text-teal-600")}>
                  <CheckCircle className={cn("mr-2 h-5 w-5")} />
                  Seamless Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Easily integrate rewards into your existing customer account
                  area with flexible placement options.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="how-it-works">
          <div
            className={cn(
              "tw:bg-gray-50 tw:p-6 tw:rounded-lg tw:mt-6 tw:space-y-4",
            )}
          >
            <div className={cn("tw:text-2xl tw:font-semibold tw:mb-4")}>
              How Sovendus Rewards Works
            </div>
            <ol className={cn("tw:space-y-4")}>
              <li className={cn("tw:flex tw:items-start")}>
                <CheckCircle
                  className={cn(
                    "tw:mr-2 tw:h-5 tw:w-5 tw:text-green-500 tw:mt-1 tw:flex-shrink-0",
                  )}
                />
                <div>
                  <strong className={cn("tw:text-lg")}>
                    Integration Setup:
                  </strong>
                  <p>
                    We work with you to seamlessly integrate Sovendus Rewards
                    into your customer account area, ensuring it matches your
                    site's design and user experience.
                  </p>
                </div>
              </li>
              <li className={cn("tw:flex tw:items-start")}>
                <CheckCircle
                  className={cn(
                    "tw:mr-2 tw:h-5 tw:w-5 tw:text-green-500 tw:mt-1 tw:flex-shrink-0",
                  )}
                />
                <div>
                  <strong className={cn("tw:text-lg")}>
                    Personalized Offers:
                  </strong>
                  <p>
                    When customers log in, they see tailored reward offers based
                    on their preferences and purchase history.
                  </p>
                </div>
              </li>
              <li className={cn("tw:flex tw:items-start")}>
                <CheckCircle
                  className={cn(
                    "tw:mr-2 tw:h-5 tw:w-5 tw:text-green-500 tw:mt-1 tw:flex-shrink-0",
                  )}
                />
                <div>
                  <strong className={cn("tw:text-lg")}>
                    Customer Interaction:
                  </strong>
                  <p>
                    Users can browse and claim rewards directly from their
                    account dashboard or designated areas, increasing engagement
                    with your platform.
                  </p>
                </div>
              </li>
              <li className={cn("tw:flex tw:items-start")}>
                <CheckCircle
                  className={cn(
                    "tw:mr-2 tw:h-5 tw:w-5 tw:text-green-500 tw:mt-1 tw:flex-shrink-0",
                  )}
                />
                <div>
                  <strong className={cn("tw:text-lg")}>
                    Continuous Optimization:
                  </strong>
                  <p>
                    Our team regularly analyzes performance data to refine the
                    reward offerings and maximize customer satisfaction and
                    retention.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
