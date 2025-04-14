import { BarChart, CheckCircle, Cog, Globe, Target } from "lucide-react";
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
import { Switch } from "../../shadcn/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shadcn/tabs";
import { type AdditionalSteps } from "../../ui/backend-form";
import {
  CountryOptions,
  EnabledOptimizeCountries,
  isOptimizeElementEnabled,
  isOptimizeEnabled,
} from "./optimize-country-options";

interface SovendusOptimizeProps {
  currentOptimizeSettings: OptimizeSettings | undefined;
  savedOptimizeSettings: OptimizeSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  additionalSteps?: AdditionalSteps["optimize"];
  defaultTab?: "configure" | "benefits" | "how-it-works";
}

export function SovendusOptimize({
  currentOptimizeSettings,
  setCurrentSettings,
  additionalSteps,
  defaultTab = "configure",
}: SovendusOptimizeProps): JSX.Element {
  return (
    <BaseFeatureComponent
      title="Optimize: Supercharge Your Conversions"
      description="Transform passive visitors into active customers and reduce bounce rates with Sovendus Optimize. Boost your conversion rates and build long-term customer relationships."
      gradientFrom="green-600"
      gradientTo="teal-600"
      mainColor="green"
      alertMessage={
        <>
          <strong>Important:</strong> To activate and configure Optimize,
          contact Sovendus for a personalized demo and setup. Our team will
          guide you through the entire process.
        </>
      }
      configureContent={
        <ConfigureContent
          currentOptimizeSettings={currentOptimizeSettings}
          setCurrentSettings={setCurrentSettings}
          additionalSteps={additionalSteps}
        />
      }
      benefitsContent={<BenefitsContent />}
      howItWorksContent={<HowItWorksContent />}
      defaultTab={defaultTab}
    />
  );
}

function ConfigureContent({
  currentOptimizeSettings,
  setCurrentSettings,
  additionalSteps,
}: {
  currentOptimizeSettings: OptimizeSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  additionalSteps?: AdditionalSteps["optimize"];
}): JSX.Element {
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
    <div className={cn("tw:space-y-6")}>
      <Alert
        className={`${
          optimizeEnabled
            ? "tw:bg-green-100 tw:border-green-300"
            : "tw:bg-red-100 tw:border-red-300"
        }`}
      >
        <AlertDescription
          className={
            optimizeEnabled
              ? "tw:text-green-800 tw:font-medium"
              : "tw:text-red-800 tw:font-medium"
          }
        >
          <EnabledOptimizeCountries currentSettings={currentOptimizeSettings} />
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
            <ol className={cn("tw:list-decimal tw:list-inside tw:space-y-2")}>
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
              "tw:bg-green-100 tw:p-4 tw:text-xl tw:font-semibold tw:text-green-800",
            )}
          >
            <div className={cn("tw:flex tw:items-center")}>
              <Cog className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-green-700")} />
              Configure Optimize Settings
            </div>
          </AccordionTrigger>
          <AccordionContent className={cn("tw:p-4 tw:bg-white")}>
            <Tabs
              defaultValue={currentOptimizeSettings?.settingsType || "simple"}
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
                    "tw.data-[state=active]:bg-green-100 tw.data-[state=active]:text-green-800 tw.data-[state=active]:border-b-2",
                  )}
                >
                  Global Optimize ID
                </TabsTrigger>
                <TabsTrigger
                  value="country"
                  className={cn(
                    "tw.data-[state=active]:bg-green-100 tw.data-[state=active]:text-green-800 tw.data-[state=active]:border-b-2",
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
                  <div className={cn("tw:flex tw:items-center tw:space-x-2")}>
                    <Switch
                      id="simple-id-enabled"
                      checked={
                        currentOptimizeSettings?.simple?.isEnabled || false
                      }
                      onCheckedChange={(checked): void =>
                        handleGlobalToggle(checked)
                      }
                    />
                    <Label htmlFor="simple-id-enabled">Enable Global ID</Label>
                  </div>
                  <div className={cn("tw:space-y-2")}>
                    <Label htmlFor="simple-id">Global Optimize ID</Label>
                    <Input
                      id="simple-id"
                      value={currentOptimizeSettings?.simple?.optimizeId || ""}
                      onChange={(e): void => handleGlobalChange(e.target.value)}
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
                    countryCodes={Object.keys(COUNTRIES) as CountryCodes[]}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function BenefitsContent(): JSX.Element {
  return (
    <>
      <div
        className={cn(
          "tw:grid tw:grid-cols-1 tw:md:grid-cols-3 tw:gap-6 tw:mb-8",
        )}
      >
        <Card>
          <CardHeader>
            <CardTitle className={cn("tw:flex tw:items-center")}>
              <Target className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-red-500")} />
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
              Leverage powerful analytics to gain deeper insights, optimize your
              strategies, and continuously enhance your shop's performance by
              understanding customer behavior.
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
              Easy integration into any online shop, with customized design to
              match your brand.
            </p>
          </CardContent>
        </Card>
      </div>

      <div
        className={cn(
          "tw:bg-green-50 tw:p-6 tw:rounded-lg tw:mb-8 tw:border tw:border-green-200 tw:shadow-md",
        )}
      >
        <div
          className={cn(
            "tw:text-2xl tw:font-semibold tw:mb-4 tw:text-green-900",
          )}
        >
          Key Benefits
        </div>
        <ol
          className={cn("tw:list-disc tw:pl-5 tw:space-y-3 tw:text-gray-800")}
        >
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-green-900")}>
              Conversion Boost:
            </strong>{" "}
            Increase conversion rates by up to 10%
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-green-900")}>
              Reduced Abandonment:
            </strong>{" "}
            Reduce cart abandonment by 5%
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-green-900")}>
              Newsletter Growth:
            </strong>{" "}
            Boost newsletter sign-ups by 15%
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-green-900")}>
              Transparent Pricing:
            </strong>{" "}
            Performance-based pricing with no hidden costs
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-green-900")}>Flexible Terms:</strong>{" "}
            No minimum contract duration
          </li>
        </ol>
      </div>
    </>
  );
}

function HowItWorksContent(): JSX.Element {
  return (
    <div
      className={cn(
        "tw:bg-green-50 tw:p-8 tw:rounded-lg tw:space-y-6 tw:border tw:border-green-200 tw:shadow-md",
      )}
    >
      <div className={cn("tw:text-2xl tw:font-bold tw:mb-6 tw:text-green-900")}>
        How Optimize Works
      </div>
      <ol className={cn("tw:space-y-6")}>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-green-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong className={cn("tw:text-lg tw:font-bold tw:text-green-900")}>
              Intelligent Analysis:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              Our system analyzes user behavior, traffic sources, and on-site
              interactions in real-time.
            </p>
          </div>
        </li>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-green-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong className={cn("tw:text-lg tw:font-bold tw:text-green-900")}>
              Targeted Interventions:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              Sovendus Optimize is designed to intelligently analyze user
              behavior and implement targeted interventions to enhance user
              engagement and reduce bounce and cart abandonment rates.
            </p>
          </div>
        </li>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-green-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong className={cn("tw:text-lg tw:font-bold tw:text-green-900")}>
              Conversion Boost:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              By focusing on personalized strategies, Sovendus Optimize helps
              businesses reduce bounce and cart abandonment rates, driving
              higher conversions and improving overall customer retention.
            </p>
          </div>
        </li>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-green-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong className={cn("tw:text-lg tw:font-bold tw:text-green-900")}>
              Continuous Optimization:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              Our team works with you to refine strategies and improve
              performance based on ongoing data analysis.
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}
