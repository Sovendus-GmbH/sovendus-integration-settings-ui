"use client";

import { motion } from "framer-motion";
import { CheckCircle, Cog, ExternalLink, Gift } from "lucide-react";
import type { Dispatch, JSX, SetStateAction } from "react";
import type {
  CountryCodes,
  SovendusAppSettings,
  VoucherNetworkSettings,
} from "sovendus-integration-types";
import { LANGUAGES_BY_COUNTRIES } from "sovendus-integration-types";

import { cn } from "../utils/utils";
import { type AdditionalSteps, DEMO_REQUEST_URL } from "./backend-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./shadcn/accordion";
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
}

export function SovendusRewards({
  currentRewardsSettings,
  setCurrentSettings,
  additionalSteps,
}: SovendusRewardsProps): JSX.Element {
  const rewardsEnabled = isVnEnabled(currentRewardsSettings);

  const handleTriggerPageChange = (value: string): void => {
    setCurrentSettings((prevState) => ({
      ...prevState,
      rewards: {
        ...prevState.rewards,
        triggerPage: value,
      },
    }));
  };

  const handleRenderLocationChange = (value: string): void => {
    setCurrentSettings((prevState) => ({
      ...prevState,
      rewards: {
        ...prevState.rewards,
        renderLocation: value,
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

            <Accordion
              type="single"
              defaultValue="step1"
              collapsible
              className={cn("tw:w-full tw:mt-8")}
            >
              <AccordionItem
                value="step1"
                className={cn(
                  "tw:border-2 tw:border-teal-500 tw:rounded-lg tw:overflow-hidden",
                )}
              >
                <AccordionTrigger
                  className={cn(
                    "tw:bg-teal-50 tw:p-4 tw:text-xl tw:font-semibold",
                  )}
                >
                  <div className={cn("tw:flex tw:items-center")}>
                    <Cog
                      className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-teal-500")}
                    />
                    Configure Sovendus Rewards
                  </div>
                </AccordionTrigger>
                <AccordionContent className={cn("tw:p-4 tw:bg-white")}>
                  <p className={cn("tw:mb-4 tw:text-lg")}>
                    Set up Sovendus Rewards for your customer account area,
                    enhancing engagement and loyalty.
                  </p>
                  <div className={cn("tw:mt-6")}>
                    <h4 className={cn("tw:text-lg tw:font-semibold tw:mb-2")}>
                      Trigger / Render Settings
                    </h4>
                    <div className={cn("tw:space-y-4")}>
                      <div>
                        <Label
                          htmlFor="trigger-page"
                          className={cn(
                            "tw:text-sm tw:font-medium tw:text-gray-700",
                          )}
                        >
                          Trigger Page
                        </Label>
                        <Select
                          onValueChange={handleTriggerPageChange}
                          value={currentRewardsSettings?.triggerPage}
                        >
                          <SelectTrigger
                            id="trigger-page"
                            className={cn("tw:mt-2")}
                          >
                            <SelectValue placeholder="Select trigger page" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dashboard">Dashboard</SelectItem>
                            <SelectItem value="account">
                              Account Page
                            </SelectItem>
                            <SelectItem value="orders">Orders Page</SelectItem>
                            <SelectItem value="custom">Custom Page</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label
                          htmlFor="render-location"
                          className={cn(
                            "tw:text-sm tw:font-medium tw:text-gray-700",
                          )}
                        >
                          Render Location
                        </Label>
                        <Select
                          onValueChange={handleRenderLocationChange}
                          value={currentRewardsSettings?.renderLocation}
                        >
                          <SelectTrigger
                            id="render-location"
                            className={cn("tw:mt-2")}
                          >
                            <SelectValue placeholder="Select render location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sidebar">Sidebar</SelectItem>
                            <SelectItem value="main-content">
                              Main Content
                            </SelectItem>
                            <SelectItem value="modal">Modal</SelectItem>
                            <SelectItem value="custom">
                              Custom Element
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {currentRewardsSettings?.renderLocation === "custom" && (
                      <div>
                        <Label
                          htmlFor="custom-selector"
                          className={cn(
                            "tw:text-sm tw:font-medium tw:text-gray-700",
                          )}
                        >
                          Custom CSS Selector
                        </Label>
                        <Input
                          id="custom-selector"
                          placeholder="#rewards-container"
                          value={currentRewardsSettings?.customSelector || ""}
                          onChange={(e): void => {
                            setCurrentSettings((prevState) => ({
                              ...prevState,
                              rewards: {
                                ...prevState.rewards,
                                customSelector: e.target.value,
                              },
                            }));
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className={cn("tw:mt-6")}>
                    <h4 className={cn("tw:text-lg tw:font-semibold tw:mb-2")}>
                      Country-Specific Settings
                    </h4>
                    <CountryOptions
                      currentSettings={currentRewardsSettings}
                      setCurrentSettings={setCurrentSettings}
                      countryCodes={
                        Object.keys(LANGUAGES_BY_COUNTRIES) as CountryCodes[]
                      }
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
