import { CheckCircle, CreditCard, Package, Users } from "lucide-react";
import { type Dispatch, type JSX, type SetStateAction } from "react";
import type { SovendusAppSettings } from "sovendus-integration-types";

import { cn } from "../../../utils";
import { BaseFeatureComponent } from "../../common/base-feature-component";
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/card";
import { Label } from "../../shadcn/label";
import { Switch } from "../../shadcn/switch";
import { type AdditionalSteps } from "../../ui/backend-form";

interface SovendusCheckoutProductsProps {
  enabled: boolean;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  additionalSteps?: AdditionalSteps["checkoutProducts"];
  defaultTab?: "configure" | "benefits" | "how-it-works";
}

export function SovendusCheckoutProducts({
  enabled,
  setCurrentSettings,
  additionalSteps,
  defaultTab = "configure",
}: SovendusCheckoutProductsProps): JSX.Element {
  const handleToggle = (checked: boolean): void => {
    setCurrentSettings((prevState) => ({
      ...prevState,
      checkoutProducts: checked,
    }));
  };

  return (
    <BaseFeatureComponent
      title="Checkout Products: Enhance Your Checkout Experience"
      description="Offer additional products and services to your customers during checkout to increase average order value and customer satisfaction."
      gradientFrom="purple-600"
      gradientTo="indigo-600"
      mainColor="purple"
      alertMessage={
        <>
          <strong>Important:</strong> To activate Checkout Products, contact
          Sovendus for a personalized demo and setup. Our team will guide you
          through the entire process.
        </>
      }
      configureContent={
        <ConfigureContent
          enabled={enabled}
          handleToggle={handleToggle}
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
  enabled,
  handleToggle,
  additionalSteps,
}: {
  enabled: boolean;
  handleToggle: (checked: boolean) => void;
  additionalSteps?: AdditionalSteps["checkoutProducts"];
}): JSX.Element {
  return (
    <div className={cn("tw:space-y-6")}>
      <Card
        className={cn(
          "tw:border-2 tw:border-purple-600 tw:shadow-md tw:overflow-hidden",
        )}
      >
        <CardHeader
          className={cn("tw:bg-purple-200 tw:border-b tw:border-purple-300")}
        >
          <CardTitle
            className={cn(
              "tw:flex tw:items-center tw:text-purple-900 tw:font-bold",
            )}
          >
            <CreditCard
              className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-purple-800")}
            />
            Checkout Products Settings
          </CardTitle>
        </CardHeader>
        <CardContent className={cn("tw:p-6 tw:bg-white")}>
          <div
            className={cn(
              "tw:flex tw:items-center tw:justify-between tw:p-4 tw:border tw:border-gray-300 tw:rounded-md tw:bg-gray-50",
            )}
          >
            <div>
              <Label
                htmlFor="checkout-products"
                className={cn("tw:font-bold tw:text-gray-900 tw:text-base")}
              >
                Enable Checkout Products
              </Label>
              <p
                className={cn(
                  "tw:text-sm tw:text-gray-800 tw:mt-1 tw:font-medium",
                )}
              >
                Handles conversion tracking for Checkout Products.
              </p>
            </div>
            <Switch
              id="checkout-products"
              checked={enabled}
              onCheckedChange={handleToggle}
            />
          </div>
        </CardContent>
      </Card>

      {additionalSteps && (
        <Card className={cn("tw:border-2 tw:border-purple-600 tw:shadow-md")}>
          <CardHeader
            className={cn("tw:bg-purple-200 tw:border-b tw:border-purple-300")}
          >
            <CardTitle
              className={cn(
                "tw:text-xl tw:font-bold tw:flex tw:items-center tw:text-purple-900",
              )}
            >
              <CheckCircle
                className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-purple-800")}
              />
              Additional Setup Steps
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("tw:p-6 tw:bg-white")}>
            <div className={cn("tw:font-bold tw:mb-3 tw:text-gray-900")}>
              {additionalSteps.title}
            </div>
            <ol
              className={cn(
                "tw:list-decimal tw:list-inside tw:space-y-3 tw:text-gray-800",
              )}
            >
              {additionalSteps.subSteps.map((step, index) => (
                <li key={index} className={cn("tw:font-medium")}>
                  {step}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function BenefitsContent(): JSX.Element {
  return (
    <div className={cn("tw:space-y-6")}>
      <div className={cn("tw:grid tw:grid-cols-1 md:tw:grid-cols-3 tw:gap-6")}>
        <Card
          className={cn("tw:border-purple-300 tw:shadow-md tw:overflow-hidden")}
        >
          <CardHeader className={cn("tw:bg-purple-100")}>
            <CardTitle
              className={cn(
                "tw:flex tw:items-center tw:text-purple-900 tw:font-bold",
              )}
            >
              <CreditCard
                className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-purple-800")}
              />
              Increased Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("tw:bg-white tw:p-4")}>
            <p className={cn("tw:text-gray-800 tw:font-medium")}>
              Boost your average order value by offering complementary products
              at the perfect moment in the customer journey.
            </p>
          </CardContent>
        </Card>

        <Card
          className={cn("tw:border-purple-300 tw:shadow-md tw:overflow-hidden")}
        >
          <CardHeader className={cn("tw:bg-purple-100")}>
            <CardTitle
              className={cn(
                "tw:flex tw:items-center tw:text-purple-900 tw:font-bold",
              )}
            >
              <Package
                className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-purple-800")}
              />
              Curated Offerings
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("tw:bg-white tw:p-4")}>
            <p className={cn("tw:text-gray-800 tw:font-medium")}>
              Present carefully selected products that enhance your customers'
              primary purchases, improving their overall shopping experience.
            </p>
          </CardContent>
        </Card>

        <Card
          className={cn("tw:border-purple-300 tw:shadow-md tw:overflow-hidden")}
        >
          <CardHeader className={cn("tw:bg-purple-100")}>
            <CardTitle
              className={cn(
                "tw:flex tw:items-center tw:text-purple-900 tw:font-bold",
              )}
            >
              <Users
                className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-purple-800")}
              />
              Enhanced Customer Experience
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("tw:bg-white tw:p-4")}>
            <p className={cn("tw:text-gray-800 tw:font-medium")}>
              Provide additional value to your customers by offering relevant
              products they might have forgotten or didn't know they needed.
            </p>
          </CardContent>
        </Card>
      </div>

      <div
        className={cn(
          "tw:bg-purple-50 tw:p-6 tw:rounded-lg tw:mb-8 tw:border tw:border-purple-200 tw:shadow-md",
        )}
      >
        <div
          className={cn("tw:text-2xl tw:font-bold tw:mb-4 tw:text-purple-900")}
        >
          Key Benefits
        </div>
        <ul
          className={cn("tw:list-disc tw:pl-5 tw:space-y-3 tw:text-gray-800")}
        >
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-purple-900")}>Increased AOV:</strong>{" "}
            Boost average order value by 12-15% with strategically offered
            add-ons.
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-purple-900")}>
              Higher Conversion:
            </strong>{" "}
            Improve checkout conversion with relevant product suggestions.
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-purple-900")}>
              Customer Satisfaction:
            </strong>{" "}
            Enhance the shopping experience by providing valuable product
            recommendations.
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-purple-900")}>
              Easy Integration:
            </strong>{" "}
            Simple setup with minimal technical requirements.
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
        "tw:bg-purple-50 tw:p-8 tw:rounded-lg tw:mt-6 tw:space-y-6 tw:border tw:border-purple-200 tw:shadow-md",
      )}
    >
      <div
        className={cn("tw:text-2xl tw:font-bold tw:mb-6 tw:text-purple-900")}
      >
        How Checkout Products Works
      </div>
      <ol className={cn("tw:space-y-6")}>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-purple-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong
              className={cn("tw:text-lg tw:font-bold tw:text-purple-900")}
            >
              Strategic Placement:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              Carefully positioned product offers appear during the checkout
              process, catching customers at the perfect moment in their
              shopping journey.
            </p>
          </div>
        </li>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-purple-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong
              className={cn("tw:text-lg tw:font-bold tw:text-purple-900")}
            >
              Intelligent Selection:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              Our system analyzes the customer's cart and behavior to suggest
              the most relevant additional products, maximizing the chance of
              add-on purchases.
            </p>
          </div>
        </li>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-purple-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong
              className={cn("tw:text-lg tw:font-bold tw:text-purple-900")}
            >
              Seamless Experience:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              The additional product offers integrate smoothly into your
              existing checkout flow, maintaining your brand's look and feel
              without disrupting the purchase process.
            </p>
          </div>
        </li>
        <li className={cn("tw:flex tw:items-start")}>
          <CheckCircle
            className={cn(
              "tw:mr-3 tw:h-6 tw:w-6 tw:text-purple-700 tw:mt-1 tw:flex-shrink-0",
            )}
          />
          <div>
            <strong
              className={cn("tw:text-lg tw:font-bold tw:text-purple-900")}
            >
              Performance Optimization:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              Continuous analysis and refinement of product offerings based on
              performance data to maximize attachment rates and revenue.
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}
