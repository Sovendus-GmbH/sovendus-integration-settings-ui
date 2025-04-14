import { CheckCircle, Cog, Gift, ShoppingBag } from "lucide-react";
import type { Dispatch, JSX, SetStateAction } from "react";
import type {
  CountryCodes,
  SovendusAppSettings,
  VoucherNetworkSettings,
} from "sovendus-integration-types";
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
import { type AdditionalSteps } from "../../ui/backend-form";
import {
  CountryOptions,
  EnabledVoucherNetworkCountries,
  isVnEnabled,
} from "./voucher-network-country-options";

interface SovendusVoucherNetworkProps {
  currentSettings: VoucherNetworkSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  additionalSteps?: AdditionalSteps["voucherNetwork"];
  defaultTab?: "configure" | "benefits" | "how-it-works";
}

export function SovendusVoucherNetwork({
  currentSettings,
  setCurrentSettings,
  additionalSteps,
  defaultTab = "configure",
}: SovendusVoucherNetworkProps): JSX.Element {
  return (
    <BaseFeatureComponent
      title="Voucher Network & Checkout Benefits: Dual Revenue Streams"
      description="Boost traffic and sales with our closed voucher network, while rewarding customers at checkout and earning extra revenue."
      gradientFrom="blue-600"
      gradientTo="indigo-600"
      mainColor="blue"
      alertMessage={
        <>
          <strong>Important:</strong> To activate Voucher Network and/or
          Checkout Benefits, contact Sovendus for a personalized demo and setup.
          Our team will guide you through the entire process.
        </>
      }
      configureContent={
        <ConfigureContent
          currentSettings={currentSettings}
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
  currentSettings,
  setCurrentSettings,
  additionalSteps,
}: {
  currentSettings: VoucherNetworkSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  additionalSteps?: AdditionalSteps["voucherNetwork"];
}): JSX.Element {
  const vnEnabled = isVnEnabled(currentSettings);

  return (
    <div className={cn("tw:space-y-6")}>
      <Alert
        className={cn(
          `${
            vnEnabled
              ? "tw:bg-green-100 tw:border-green-300"
              : "tw:bg-red-100 tw:border-red-300"
          }`,
        )}
      >
        <AlertDescription
          className={cn(
            vnEnabled
              ? "tw:text-green-800 tw:font-medium"
              : "tw:text-red-800 tw:font-medium",
          )}
        >
          <EnabledVoucherNetworkCountries currentSettings={currentSettings} />
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
              "tw:bg-blue-100 tw:p-4 tw:text-xl tw:font-semibold tw:text-blue-800",
            )}
          >
            <div className={cn("tw:flex tw:items-center")}>
              <Cog className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-blue-700")} />
              Configure Voucher Network & Checkout Benefits
            </div>
          </AccordionTrigger>
          <AccordionContent className={cn("tw:p-4 tw:bg-white")}>
            <p className={cn("tw:mb-4 tw:text-lg")}>
              Maximize your revenue potential by setting up Voucher Network and
              Checkout Benefits for multiple countries and languages. This
              configuration applies to both products, unlocking new markets and
              opportunities for growth.
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
  );
}

function BenefitsContent(): JSX.Element {
  return (
    <div className={cn("tw:space-y-6")}>
      <div className={cn("tw:grid tw:grid-cols-1 md:tw:grid-cols-3 tw:gap-6")}>
        <Card className={cn("tw:border-blue-300 tw:shadow-md")}>
          <CardHeader className={cn("tw:bg-blue-100")}>
            <CardTitle
              className={cn(
                "tw:flex tw:items-center tw:text-blue-900 tw:font-bold",
              )}
            >
              <Gift className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-blue-800")} />
              Voucher Network
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("tw:bg-white tw:mt-4")}>
            <p className={cn("tw:text-gray-800 tw:font-medium")}>
              Gain traffic and new sales through our closed voucher network with
              over 7 million online shoppers every month across Europe.
            </p>
          </CardContent>
        </Card>

        <Card className={cn("tw:border-blue-300 tw:shadow-md")}>
          <CardHeader className={cn("tw:bg-blue-100")}>
            <CardTitle
              className={cn(
                "tw:flex tw:items-center tw:text-blue-900 tw:font-bold",
              )}
            >
              <ShoppingBag
                className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-blue-800")}
              />
              Checkout Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("tw:bg-white tw:mt-4")}>
            <p className={cn("tw:text-gray-800 tw:font-medium")}>
              Generate additional revenue by displaying offers from other shops
              on your checkout page, earning commissions on partner purchases.
            </p>
          </CardContent>
        </Card>

        <Card className={cn("tw:border-blue-300 tw:shadow-md")}>
          <CardHeader className={cn("tw:bg-blue-100")}>
            <CardTitle
              className={cn(
                "tw:flex tw:items-center tw:text-blue-900 tw:font-bold",
              )}
            >
              <CheckCircle
                className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-blue-800")}
              />
              Easy Integration
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("tw:bg-white tw:mt-4")}>
            <p className={cn("tw:text-gray-800 tw:font-medium")}>
              Simple setup process for both products with a single
              configuration, requiring minimal technical resources and
              maintenance.
            </p>
          </CardContent>
        </Card>
      </div>

      <div
        className={cn(
          "tw:bg-blue-50 tw:p-6 tw:rounded-lg tw:mb-8 tw:border tw:border-blue-200 tw:shadow-md",
        )}
      >
        <div
          className={cn("tw:text-2xl tw:font-bold tw:mb-4 tw:text-blue-900")}
        >
          Key Benefits
        </div>
        <ul
          className={cn("tw:list-disc tw:pl-5 tw:space-y-3 tw:text-gray-800")}
        >
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-blue-900")}>Massive Reach:</strong>{" "}
            Connect with 7 million online shoppers monthly through our network
            of 2,300+ European partners.
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-blue-900")}>
              Performance-Based:
            </strong>{" "}
            Pay only for generated purchases in your shop, with no minimum
            contract duration.
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-blue-900")}>
              Dual Revenue Streams:
            </strong>{" "}
            Attract new customers through Voucher Network and earn additional
            revenue with Checkout Benefits.
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-blue-900")}>
              Seamless Integration:
            </strong>{" "}
            Easy setup process for both products with a single configuration and
            minimal technical requirements.
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
        "tw:bg-blue-50 tw:p-8 tw:rounded-lg tw:space-y-6 tw:border tw:border-blue-200 tw:shadow-md",
      )}
    >
      <div className={cn("tw:text-2xl tw:font-bold tw:mb-6 tw:text-blue-900")}>
        How Voucher Network & Checkout Benefits Work
      </div>
      <ol className={cn("tw:space-y-6")}>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-blue-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong className={cn("tw:text-lg tw:font-bold tw:text-blue-900")}>
              Voucher Network Integration:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              After setup, your shop's vouchers are displayed on partner
              checkout pages, attracting new customers to your store.
            </p>
          </div>
        </li>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-blue-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong className={cn("tw:text-lg tw:font-bold tw:text-blue-900")}>
              Checkout Benefits Display:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              Partner offers are shown on your checkout page, providing
              additional value to your customers and generating commission for
              you.
            </p>
          </div>
        </li>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-blue-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong className={cn("tw:text-lg tw:font-bold tw:text-blue-900")}>
              Dual Revenue Generation:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              Benefit from new customer acquisitions through your vouchers and
              earn commissions from partner sales.
            </p>
          </div>
        </li>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-blue-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong className={cn("tw:text-lg tw:font-bold tw:text-blue-900")}>
              Continuous Optimization:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              Our team works with you to refine your offers and placements for
              maximum performance and revenue.
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}
