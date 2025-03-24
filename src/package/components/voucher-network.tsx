import { motion } from "framer-motion";
import {
  CheckCircle,
  Cog,
  ExternalLink,
  Gift,
  ShoppingBag,
} from "lucide-react";
import type { Dispatch, JSX, SetStateAction } from "react";
import type {
  CountryCodes,
  SovendusAppSettings,
  VoucherNetworkSettings,
} from "sovendus-integration-types";
import { LANGUAGES_BY_COUNTRIES } from "sovendus-integration-types";

import { cn } from "../utils/utils";
import {
  type AdditionalSteps,
  DEMO_REQUEST_URL,
} from "./backend-form-style-less";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./shadcn/accordion";
import { Alert, AlertDescription } from "./shadcn/alert";
import { Button } from "./shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "./shadcn/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./shadcn/tabs";
import {
  CountryOptions,
  EnabledVoucherNetworkCountries,
  isVnEnabled,
} from "./voucher-network-country-options";

interface SovendusVoucherNetworkProps {
  currentSettings: VoucherNetworkSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  additionalSteps?: AdditionalSteps["voucherNetwork"];
}

export function SovendusVoucherNetwork({
  currentSettings,
  setCurrentSettings,
  additionalSteps,
}: SovendusVoucherNetworkProps): JSX.Element {
  const vnEnabled = isVnEnabled(currentSettings);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn("tw:space-y-6 tw:pb-8")}
    >
      <div
        className={cn(
          "tw:bg-gradient-to-r tw:from-blue-600 tw:to-indigo-600 tw:text-white tw:p-8 tw:rounded-lg tw:shadow-lg",
        )}
      >
        <div className={cn("tw:text-3xl tw:font-bold tw:mb-4 tw:text-white")}>
          Voucher Network & Checkout Benefits: Dual Revenue Streams
        </div>
        <p className={cn("tw:text-xl tw:mb-6")}>
          Boost traffic and sales with our closed voucher network, while
          rewarding customers at checkout and earning extra revenue.
        </p>
        <Button
          size="lg"
          onClick={(): void => void window.open(DEMO_REQUEST_URL, "_blank")}
          className={cn("tw:bg-white tw:text-blue-600 tw:hover:bg-blue-100")}
        >
          Schedule Your Personalized Demo
          <ExternalLink className={cn("tw:ml-2 tw:h-4 tw:w-4")} />
        </Button>
      </div>

      <Alert className={cn("tw:mb-4 tw:bg-blue-50 tw:border-blue-200")}>
        <AlertDescription className={cn("tw:text-blue-700 tw:font-semibold")}>
          <strong>Important:</strong> To activate Voucher Network and/or
          Checkout Benefits, contact Sovendus for a personalized demo and setup.
          Our team will guide you through the entire process.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="configure" className={cn("tw:w-full")}>
        <TabsList className={cn("tw:grid tw:w-full tw:grid-cols-3 tw:mb-8")}>
          <TabsTrigger
            value="configure"
            className={cn(
              "tw:text-lg tw:font-semibold tw:py-3 tw:bg-blue-100 tw:data-[state=active]:bg-blue-600 tw:data-[state=active]:text-white",
            )}
          >
            Configure
          </TabsTrigger>
          <TabsTrigger
            value="benefits"
            className={cn(
              "tw:text-lg tw:font-semibold tw:py-3 tw:bg-blue-100 tw:data-[state=active]:bg-blue-600 tw:data-[state=active]:text-white",
            )}
          >
            Key Benefits
          </TabsTrigger>
          <TabsTrigger
            value="how-it-works"
            className={cn(
              "tw:text-lg tw:font-semibold tw:py-3 tw:bg-blue-100 tw:data-[state=active]:bg-blue-600 tw:data-[state=active]:text-white",
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
                  vnEnabled
                    ? "tw:bg-green-50 tw:border-green-200"
                    : "tw:bg-red-50 tw:border-red-200"
                } tw:mt-2`,
              )}
            >
              <AlertDescription
                className={cn(
                  vnEnabled ? "tw:text-green-700" : "tw:text-red-700",
                )}
              >
                <EnabledVoucherNetworkCountries
                  currentSettings={currentSettings}
                />
              </AlertDescription>
            </Alert>
            {additionalSteps && (
              <Card className={cn("tw:border-2 tw:border-blue-500")}>
                <CardHeader>
                  <CardTitle
                    className={cn(
                      "tw:text-xl tw:font-semibold tw:flex tw:items-center",
                    )}
                  >
                    <CheckCircle
                      className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-blue-500")}
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
                  "tw:border-2 tw:border-blue-500 tw:rounded-lg tw:overflow-hidden",
                )}
              >
                <AccordionTrigger
                  className={cn(
                    "tw:bg-blue-50 tw:p-4 tw:text-xl tw:font-semibold",
                  )}
                >
                  <div className={cn("tw:flex tw:items-center")}>
                    <Cog
                      className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-blue-500")}
                    />
                    Configure Voucher Network & Checkout Benefits
                  </div>
                </AccordionTrigger>
                <AccordionContent className={cn("tw:p-4 tw:bg-white")}>
                  <p className={cn("tw:mb-4 tw:text-lg")}>
                    Maximize your revenue potential by setting up Voucher
                    Network and Checkout Benefits for multiple countries and
                    languages. This configuration applies to both products,
                    unlocking new markets and opportunities for growth.
                  </p>
                  <CountryOptions
                    currentSettings={currentSettings}
                    setCurrentSettings={setCurrentSettings}
                    countryCodes={
                      Object.keys(LANGUAGES_BY_COUNTRIES) as CountryCodes[]
                    }
                  />
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
                    className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-blue-500")}
                  />
                  Voucher Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Gain traffic and new sales through our closed voucher network
                  with over 7 million online shoppers every month.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className={cn("tw:flex tw:items-center")}>
                  <ShoppingBag
                    className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-green-500")}
                  />
                  Checkout Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Generate additional revenue by displaying offers from other
                  shops on your checkout page. Earn commissions when your
                  customers make purchases from these partner offers.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className={cn("tw:bg-gray-100 tw:p-6 tw:rounded-lg tw:mb-8")}>
            <div className={cn("tw:text-2xl tw:font-semibold tw:mb-4")}>
              Key Benefits
            </div>
            <ul className={cn("tw:list-disc tw:list-inside tw:space-y-2")}>
              <li>
                <strong>Massive Reach:</strong> Connect with 7 million online
                shoppers monthly through our network of 2,300+ European
                partners.
              </li>
              <li>
                <strong>Performance-Based:</strong> Pay only for generated
                purchases in your shop, with no minimum contract duration.
              </li>
              <li>
                <strong>Dual Revenue Streams:</strong> Attract new customers
                through Voucher Network and earn additional revenue with
                Checkout Benefits.
              </li>
              <li>
                <strong>Seamless Integration:</strong> Easy setup process for
                both products with a single configuration.
              </li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="how-it-works">
          <div
            className={cn(
              "tw:bg-gray-50 tw:p-6 tw:rounded-lg tw:mt-6 tw:space-y-4",
            )}
          >
            <div className={cn("tw:text-2xl tw:font-semibold tw:mb-4")}>
              How Voucher Network & Checkout Benefits Work
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
                    Voucher Network Integration:
                  </strong>
                  <p>
                    After setup, your shop's vouchers are displayed on partner
                    checkout pages, attracting new customers to your store.
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
                    Checkout Benefits Display:
                  </strong>
                  <p>
                    Partner offers are shown on your checkout page, providing
                    additional value to your customers and generating commission
                    for you.
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
                    Dual Revenue Generation:
                  </strong>
                  <p>
                    Benefit from new customer acquisitions through your vouchers
                    and earn commissions from partner sales.
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
                    Our team works with you to refine your offers and placements
                    for maximum performance and revenue.
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
