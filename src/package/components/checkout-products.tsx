import { motion } from "framer-motion";
import {
  CheckCircle,
  CreditCard,
  ExternalLink,
  Package,
  Users,
} from "lucide-react";
import { type Dispatch, type JSX, type SetStateAction } from "react";
import type { SovendusAppSettings } from "sovendus-integration-types";

import { cn } from "../utils/utils";
import { Alert, AlertDescription } from "./shadcn/alert";
import { Button } from "./shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "./shadcn/card";
import { Label } from "./shadcn/label";
import { Switch } from "./shadcn/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./shadcn/tabs";
import { AdditionalSteps } from "./backend-form-style-less";

interface SovendusCheckoutProductsProps {
  enabled: boolean;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  additionalSteps?: AdditionalSteps["checkoutProducts"];
  openContactForm: () => void;
  openSetupGuide: () => void;
}

export function SovendusCheckoutProducts({
  enabled,
  setCurrentSettings,
  additionalSteps,
  openContactForm,
  openSetupGuide,
}: SovendusCheckoutProductsProps): JSX.Element {
  const onStateChange = (checked: boolean): void => {
    setCurrentSettings((prevState) => ({
      ...prevState,
      checkoutProducts: checked,
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
          "tw:bg-gradient-to-r tw:from-purple-600 tw:to-indigo-600 tw:text-white tw:p-8 tw:rounded-lg tw:shadow-lg",
        )}
      >
        <div className={cn("tw:text-3xl tw:font-bold tw:mb-4 tw:text-white")}>
          Checkout Products: Your Gateway to Exponential Growth
        </div>
        <p className={cn("tw:text-xl tw:mb-6")}>
          Market your products to a network of over 24 million active online
          shoppers every month and see an increase in new customers and sales.
        </p>
        <Button
          size="lg"
          onClick={openContactForm}
          className={cn(
            "tw:bg-white tw:text-purple-600 tw:hover:bg-purple-100",
          )}
        >
          Schedule Your Personalized Demo
          <ExternalLink className={cn("tw:ml-2 tw:h-4 tw:w-4")} />
        </Button>
      </div>

      <Alert className={cn("tw:mb-4 tw:bg-blue-50 tw:border-blue-200")}>
        <AlertDescription className={cn("tw:text-blue-700 tw:font-semibold")}>
          <strong>Important:</strong> The first step to activate Checkout
          Products is to contact Sovendus for a personalized demo and setup. Our
          team will guide you through the entire process.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="configure" className={cn("tw:w-full")}>
        <TabsList className={cn("tw:grid tw:w-full tw:grid-cols-3 tw:mb-8")}>
          <TabsTrigger
            value="configure"
            className={cn(
              "tw:text-lg tw:font-semibold tw:py-3 tw:bg-purple-100 tw:data-[state=active]:bg-purple-600 tw:data-[state=active]:text-white",
            )}
          >
            Configure
          </TabsTrigger>
          <TabsTrigger
            value="benefits"
            className={cn(
              "tw:text-lg tw:font-semibold tw:py-3 tw:bg-purple-100 tw:data-[state=active]:bg-purple-600 tw:data-[state=active]:text-white",
            )}
          >
            Key Benefits
          </TabsTrigger>
          <TabsTrigger
            value="how-it-works"
            className={cn(
              "tw:text-lg tw:font-semibold tw:py-3 tw:bg-purple-100 tw:data-[state=active]:bg-purple-600 tw:data-[state=active]:text-white",
            )}
          >
            How It Works
          </TabsTrigger>
        </TabsList>
        <TabsContent value="configure">
          <div className={cn("tw:space-y-6")}>
            {additionalSteps && (
              <Card className={cn("tw:border-2 tw:border-purple-500")}>
                <CardHeader>
                  <CardTitle
                    className={cn(
                      "tw:text-xl tw:font-semibold tw:flex tw:items-center",
                    )}
                  >
                    <CheckCircle
                      className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-purple-500")}
                    />
                    Additional Setup Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={cn("tw:font-semibold tw:mb-2")}>
                    {additionalSteps.title}
                  </div>
                  <div
                    className={cn(
                      "tw:list-decimal tw:list-inside tw:space-y-2",
                    )}
                  >
                    {additionalSteps.subSteps.map((step, index) => (
                      <div key={index}>{step}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div
              className={cn(
                "tw:flex tw:items-center tw:space-x-4 tw:pt-4 tw:ml-2",
              )}
            >
              <Switch
                id="checkout-products-enabled"
                checked={enabled}
                onCheckedChange={onStateChange}
              />
              <Label
                htmlFor="checkout-products-enabled"
                className={cn("tw:text-lg tw:font-semibold")}
              >
                Enable Sovendus Checkout Products
              </Label>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="benefits">
          <div
            className={cn(
              "tw:grid tw:grid-cols-1 tw:md:grid-cols-3 tw:gap-6 tw:mt-6",
            )}
          >
            <Card>
              <CardHeader>
                <CardTitle
                  className={cn("tw:flex tw:items-center tw:text-blue-600")}
                >
                  <Users className={cn("tw:mr-2 tw:h-5 tw:w-5")} />
                  Massive Reach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Tap into a network of 300+ partner shops and 185 million
                  annual ad impressions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle
                  className={cn("tw:flex tw:items-center tw:text-green-600")}
                >
                  <Package className={cn("tw:mr-2 tw:h-5 tw:w-5")} />
                  High Conversion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Experience a 1-3% order rate, contributing to 3.6 million
                  orders across our network yearly.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle
                  className={cn("tw:flex tw:items-center tw:text-purple-600")}
                >
                  <CreditCard className={cn("tw:mr-2 tw:h-5 tw:w-5")} />
                  Risk-Free Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Generate additional income with zero risk, no setup costs, and
                  no minimum contract duration.
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
              How Checkout Products Works
            </div>
            <div className={cn("tw:space-y-4")}>
              <div className={cn("tw:flex tw:items-start")}>
                <CheckCircle
                  className={cn(
                    "tw:mr-2 tw:h-5 tw:w-5 tw:text-green-500 tw:mt-1 tw:flex-shrink-0",
                  )}
                />
                <div>
                  <strong className={cn("tw:text-lg")}>
                    Seamless Integration:
                  </strong>
                  <p>
                    After your personalized setup with Sovendus, your offers
                    will appear on partner shops' checkout pages, presented as
                    exclusive deals to their customers.
                  </p>
                </div>
              </div>
              <div className={cn("tw:flex tw:items-start")}>
                <CheckCircle
                  className={cn(
                    "tw:mr-2 tw:h-5 tw:w-5 tw:text-green-500 tw:mt-1 tw:flex-shrink-0",
                  )}
                />
                <div>
                  <strong className={cn("tw:text-lg")}>Smart Targeting:</strong>
                  <p>
                    Through data-based targeting, our algorithm presents your
                    offers to the most relevant customers based on their
                    shopping behavior and preferences.
                  </p>
                </div>
              </div>
              <div className={cn("tw:flex tw:items-start")}>
                <CheckCircle
                  className={cn(
                    "tw:mr-2 tw:h-5 tw:w-5 tw:text-green-500 tw:mt-1 tw:flex-shrink-0",
                  )}
                />
                <div>
                  <strong className={cn("tw:text-lg")}>Traffic Boost:</strong>
                  <p>
                    Interested customers click through to your shop, potentially
                    becoming new, high-intent customers and increasing your
                    sales.
                  </p>
                </div>
              </div>
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
                    Our team works with you to continuously refine and optimize
                    your campaigns for maximum performance.
                  </p>
                </div>
              </li>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
