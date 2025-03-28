import { motion } from "framer-motion";
import {
  BarChart,
  CheckCircle,
  Cog,
  ExternalLink,
  Globe,
  Target,
} from "lucide-react";
import type { Dispatch, JSX, SetStateAction } from "react";
import type {
  CountryCodes,
  OptimizeCountry,
  OptimizeSettings,
  OptimizeSettingsSimple,
  SovendusAppSettings,
} from "sovendus-integration-types";
import { SettingsType } from "sovendus-integration-types";
import { COUNTRIES } from "sovendus-integration-types";

import { cn } from "../utils/utils";
import type { AdditionalSteps } from "./backend-form-style-less";
import {
  CountryOptions,
  EnabledOptimizeCountries,
  isOptimizeElementEnabled,
  isOptimizeEnabled,
} from "./optimize-country-options";
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
import { Switch } from "./shadcn/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./shadcn/tabs";

interface SovendusOptimizeProps {
  currentOptimizeSettings: OptimizeSettings | undefined;
  savedOptimizeSettings: OptimizeSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  additionalSteps?: AdditionalSteps["optimize"];
  openContactForm: () => void;
  openSetupGuide: () => void;
}

export function SovendusOptimize({
  currentOptimizeSettings,
  setCurrentSettings,
  additionalSteps,
  openContactForm,
  openSetupGuide,
}: SovendusOptimizeProps): JSX.Element {
  const handleGlobalChange = (value: string | number): void => {
    setCurrentSettings((prevState) => {
      const newSettings: OptimizeCountry = {
        ...prevState.optimize?.simple,
        isEnabled: !!value,
        optimizeId: String(value),
      };
      newSettings.isEnabled = isOptimizeElementEnabled(newSettings, !!value);
      return {
        ...prevState,
        optimize: {
          ...prevState.optimize,
          settingsType: SettingsType.SIMPLE,
          simple: newSettings,
        } as OptimizeSettingsSimple,
      } satisfies SovendusAppSettings;
    });
  };

  const handleGlobalToggle = (value: boolean): void => {
    setCurrentSettings((prevState) => {
      const newSettings: OptimizeCountry = {
        optimizeId: "",
        ...prevState.optimize?.simple,
        isEnabled: value && !!prevState.optimize?.simple?.optimizeId,
      };
      newSettings.isEnabled = isOptimizeElementEnabled(newSettings, !!value);
      return {
        ...prevState,
        optimize: {
          ...prevState.optimize,
          settingsType: SettingsType.SIMPLE,
          simple: newSettings,
        } as OptimizeSettingsSimple,
      } satisfies SovendusAppSettings;
    });
  };

  const handleGlobalOptimizeIdChange = (value: SettingsType): void => {
    setCurrentSettings(
      (prevState): SovendusAppSettings => ({
        ...prevState,
        optimize: {
          ...prevState.optimize,
          settingsType: value,
        } as OptimizeSettings,
      }),
    );
  };
  const optimizeEnabled = isOptimizeEnabled(currentOptimizeSettings);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn("tw:space-y-6 tw:pb-8")}
    >
      <div
        className={cn(
          "tw:bg-gradient-to-r tw:from-green-600 tw:to-teal-600 tw:text-white tw:p-8 tw:rounded-lg tw:shadow-lg",
        )}
      >
        <div className={cn("ttw:ext-3xl tw:font-bold tw:mb-4 tw:text-white")}>
          Optimize: Supercharge Your Conversions
        </div>
        <p className={cn("tw:text-xl tw:mb-6")}>
          Transform passive visitors into active customers and reduce bounce
          rates with Sovendus Optimize. Boost your conversion rates and build
          long-term customer relationships.
        </p>
        <Button
          size="lg"
          onClick={openContactForm}
          className={cn("tw:w-full tw:sm:w-auto tw:mt-4")}
        >
          Schedule Your Personalized Demo
          <ExternalLink className={cn("tw:ml-2 tw:h-4 tw:w-4")} />
        </Button>
      </div>

      <Alert className={cn("tw:mb-4 tw:bg-blue-50 tw:border-blue-200")}>
        <AlertDescription className={cn("tw:text-blue-700 tw:font-semibold")}>
          <strong>Important:</strong> To activate and configure Optimize,
          contact Sovendus for a personalized demo and setup. Our team will
          guide you through the entire process.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="configure" className={cn("tw:w-full")}>
        <TabsList className={cn("tw:grid tw:w-full tw:grid-cols-3 tw:mb-8")}>
          <TabsTrigger
            value="configure"
            className={cn(
              "tw:text-lg tw:font-semibold tw:py-3 tw:bg-green-100 tw:data-[state=active]:bg-green-600 tw:data-[state=active]:text-white",
            )}
          >
            Configure
          </TabsTrigger>
          <TabsTrigger
            value="benefits"
            className={cn(
              "tw:text-lg tw:font-semibold tw:py-3 tw:bg-green-100 tw:data-[state=active]:bg-green-600 tw:data-[state=active]:text-white",
            )}
          >
            Key Benefits
          </TabsTrigger>
          <TabsTrigger
            value="how-it-works"
            className={cn(
              "tw:text-lg tw:font-semibold tw:py-3 tw:bg-green-100 tw:data-[state=active]:bg-green-600 tw:data-[state=active]:text-white",
            )}
          >
            How It Works
          </TabsTrigger>
        </TabsList>
        <TabsContent value="configure">
          <div className={cn("tw:space-y-6")}>
            <Alert
              className={`${
                optimizeEnabled
                  ? "tw:bg-green-50 tw:border-green-200"
                  : "tw:bg-red-50 tw:border-red-200"
              } tw:mt-2`}
            >
              <AlertDescription
                className={
                  optimizeEnabled ? "tw:text-green-700" : "tw:text-red-700"
                }
              >
                <EnabledOptimizeCountries
                  currentSettings={currentOptimizeSettings}
                />
              </AlertDescription>
            </Alert>
            {additionalSteps && (
              <Card className={cn("tw:border-2 tw:border-green-500")}>
                <CardHeader>
                  <CardTitle
                    className={cn(
                      "tw:text-xl tw:font-semibold tw:flex tw:items-center",
                    )}
                  >
                    <CheckCircle
                      className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-green-500")}
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
              defaultValue="optimize-settings"
              collapsible
              className={cn("tw:w-full tw:mt-8")}
            >
              <AccordionItem
                value="optimize-settings"
                className={cn(
                  "tw:border-2 tw:border-green-500 tw:rounded-lg tw:overflow-hidden",
                )}
              >
                <AccordionTrigger
                  className={cn(
                    "tw:bg-green-50 tw:p-4 tw:text-xl tw:font-semibold",
                  )}
                >
                  <div className={cn("tw:flex tw:items-center")}>
                    <Cog
                      className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-green-500")}
                    />
                    Configure Optimize Settings
                  </div>
                </AccordionTrigger>
                <AccordionContent className={cn("tw:p-4 tw:bg-white")}>
                  <Tabs
                    defaultValue={
                      currentOptimizeSettings?.settingsType || "simple"
                    }
                    onValueChange={(value): void =>
                      handleGlobalOptimizeIdChange(value as SettingsType)
                    }
                    className={cn("tw:border tw:rounded-md")}
                  >
                    <TabsList
                      className={cn("tw:grid tw:w-full tw:grid-cols-2 tw:mb-2")}
                    >
                      <TabsTrigger
                        value="simple"
                        className={cn(
                          "tw:data-[state=active]:bg-green-100 tw:data-[state=active]:text-green-800 tw:data-[state=active]:border-b-2",
                        )}
                      >
                        Global Optimize ID
                      </TabsTrigger>
                      <TabsTrigger
                        value="country"
                        className={cn(
                          "tw:data-[state=active]:bg-green-100 tw:data-[state=active]:text-green-800 tw:data-[state=active]:border-b-2",
                        )}
                      >
                        Country-specific Optimize ID's
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="simple" className={cn("tw:p-4")}>
                      <Alert className={cn("tw:bg-blue-50 tw:border-blue-200")}>
                        <AlertDescription className={cn("text-blue-700")}>
                          Use one Optimize ID for all countries
                        </AlertDescription>
                      </Alert>
                      <div className={cn("tw:space-y-4 tw:mt-4")}>
                        <div
                          className={cn("tw:flex tw:items-center tw:space-x-2")}
                        >
                          <Switch
                            id="simple-id-enabled"
                            checked={
                              currentOptimizeSettings?.simple?.isEnabled ||
                              false
                            }
                            onCheckedChange={(checked): void =>
                              handleGlobalToggle(checked)
                            }
                          />
                          <Label htmlFor="simple-id-enabled">
                            Enable Global ID
                          </Label>
                        </div>
                        <div className={cn("tw:space-y-2")}>
                          <Label htmlFor="simple-id">Global Optimize ID</Label>
                          <Input
                            id="simple-id"
                            value={
                              currentOptimizeSettings?.simple?.optimizeId || ""
                            }
                            onChange={(e): void =>
                              handleGlobalChange(e.target.value)
                            }
                            placeholder="Enter Global Optimize ID"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="country" className={cn("tw:p-4")}>
                      <Alert className={cn("tw:bg-blue-50 tw:border-blue-200")}>
                        <AlertDescription className={cn("tw:text-blue-700")}>
                          Use different Optimize ID's for each country
                        </AlertDescription>
                      </Alert>
                      <div className={cn("tw:space-y-4 tw:mt-4")}>
                        <CountryOptions
                          currentSettings={currentOptimizeSettings}
                          setCurrentSettings={setCurrentSettings}
                          countryCodes={
                            Object.keys(COUNTRIES) as CountryCodes[]
                          }
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        <TabsContent value="benefits">
          <div
            className={cn(
              "tw:grid tw:grid-cols-1 tw:md:grid-cols-3 tw:gap-6 tw:mb-8",
            )}
          >
            <Card>
              <CardHeader>
                <CardTitle className={cn("tw:flex tw:items-center")}>
                  <Target
                    className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-red-500")}
                  />
                  Precision Targeting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Deliver the right offer to the right customer at the perfect
                  moment, based on user behavior and traffic sources.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className={cn("tw:flex tw:items-center")}>
                  <BarChart
                    className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-blue-500")}
                  />
                  Data-Driven Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Leverage powerful analytics to gain deeper insights, optimize
                  your strategies, and continuously enhance your shop's
                  performance by understanding customer behavior.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className={cn("tw:flex tw:items-center")}>
                  <Globe
                    className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-green-500")}
                  />
                  Seamless Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Easy integration into any online shop, with customized design
                  to match your brand.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className={cn("tw:bg-gray-100 tw:p-6 tw:rounded-lg tw:mb-8")}>
            <div className={cn("tw:text-2xl tw:font-semibold tw:mb-4")}>
              Key Benefits
            </div>
            <ol className={cn("tw:list-disc tw:list-inside tw:space-y-2")}>
              <li>Increase conversion rates by up to 10%</li>
              <li>Reduce cart abandonment by 5%</li>
              <li>Boost newsletter sign-ups by 15%</li>
              <li>Performance-based pricing with no hidden costs</li>
              <li>No minimum contract duration</li>
            </ol>
          </div>
        </TabsContent>
        <TabsContent value="how-it-works">
          <div
            className={cn(
              "tw:bg-gray-50 tw:p-6 tw:rounded-lg tw:mt-6 tw:space-y-4",
            )}
          >
            <div className={cn("tw:text-2xl tw:font-semibold tw:mb-4")}>
              How Optimize Works
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
                    Intelligent Analysis:
                  </strong>
                  <p>
                    Our system analyzes user behavior, traffic sources, and
                    on-site interactions in real-time.
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
                    Targeted Interventions:
                  </strong>
                  <p>
                    Sovendus Optimize is designed to intelligently analyze user
                    behavior and implement targeted interventions to enhance
                    user engagement and reduce bounce and cart abandonment
                    rates.
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
                    Conversion Boost:
                  </strong>
                  <p>
                    By focusing on personalized strategies, Sovendus Optimize
                    helps businesses reduce bounce and cart abandonment rates,
                    driving higher conversions and improving overall customer
                    retention.
                  </p>
                </div>
              </li>
              <li className={cn("tw:flex tw:items-start")}>
                <CheckCircle
                  className={cn(
                    "tw:mr-2 tw:h-5 w-5 tw:text-green-500 tw:mt-1 tw:flex-shrink-0",
                  )}
                />
                <div>
                  <strong className={cn("tw:text-lg")}>
                    Continuous Optimization:
                  </strong>
                  <p>
                    Our team works with you to refine strategies and improve
                    performance based on ongoing data analysis.
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
