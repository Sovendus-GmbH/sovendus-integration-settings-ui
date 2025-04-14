"use client";

import { CheckCircle, Globe, Settings, Users } from "lucide-react";
import { type Dispatch, type JSX, type SetStateAction } from "react";
import {
  type EmployeeBenefitsSettings,
  type SovendusAppSettings,
} from "sovendus-integration-types";

import { cn } from "../../../utils";
import { BaseFeatureComponent } from "../../common/base-feature-component";
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/card";
import { Label } from "../../shadcn/label";
import { Switch } from "../../shadcn/switch";

interface SovendusEmployeeBenefitsProps {
  currentSettings: EmployeeBenefitsSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  featureFlags: SovendusEmployeeBenefitsFeatureFlags | undefined;
  defaultTab?: "configure" | "benefits" | "how-it-works";
}

export interface SovendusEmployeeBenefitsFeatureFlags {
  isEnabled: boolean;
  showWidgetOnDashboard: boolean;
  addToSidebar: boolean;
}

export function SovendusEmployeeBenefitsSettings({
  currentSettings,
  setCurrentSettings,
  featureFlags,
  defaultTab = "configure",
}: SovendusEmployeeBenefitsProps): JSX.Element {
  // Use the BaseFeatureComponent to render the UI
  return (
    <BaseFeatureComponent
      title="Employee Benefits: Enhance Your Team's Experience"
      description="Provide your employees with exclusive discounts and offers from top brands at no cost to your organization."
      gradientFrom="blue-500"
      gradientTo="indigo-500"
      mainColor="blue"
      alertMessage={
        <>
          <strong>Important:</strong> To activate Employee Benefits, contact
          Sovendus for a personalized setup. Our team will guide you through the
          entire process to get your employees access to exclusive offers.
        </>
      }
      configureContent={
        <ConfigureContent
          setCurrentSettings={setCurrentSettings}
          currentSettings={currentSettings}
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
  currentSettings,
  featureFlags,
  setCurrentSettings,
}: {
  currentSettings: EmployeeBenefitsSettings | undefined;
  featureFlags: SovendusEmployeeBenefitsFeatureFlags | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
}): JSX.Element {
  const handleSidebarToggle = (checked: boolean): void => {
    setCurrentSettings((prevState) => ({
      ...prevState,
      employeeBenefits: {
        showWidgetOnDashboard: false,
        ...prevState.employeeBenefits,
        addToSidebar: checked,
        isEnabled: checked,
      },
    }));
  };

  const handleDashboardWidgetToggle = (checked: boolean): void => {
    setCurrentSettings((prevState) => ({
      ...prevState,
      employeeBenefits: {
        addToSidebar: false,
        ...prevState.employeeBenefits,
        showWidgetOnDashboard: checked,
        isEnabled: checked,
      },
    }));
  };

  return (
    <div className={cn("tw:space-y-6")}>
      {(featureFlags?.showWidgetOnDashboard || featureFlags?.addToSidebar) && (
        <Card
          className={cn("tw:border-2 tw:border-blue-500 tw:overflow-hidden")}
        >
          <CardHeader className={cn("tw:bg-blue-50")}>
            <CardTitle className={cn("tw:flex tw:items-center")}>
              <Settings
                className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-blue-600")}
              />
              Display Options
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("tw:p-6 tw:space-y-4")}>
            {featureFlags?.showWidgetOnDashboard && (
              <div
                className={cn(
                  "tw:flex tw:items-center tw:justify-between tw:p-3 tw:border tw:border-gray-200 tw:rounded-md",
                )}
              >
                <div>
                  <Label
                    htmlFor="dashboard-display"
                    className={cn("tw:font-medium")}
                  >
                    Dashboard Widget
                  </Label>
                  <p className={cn("tw:text-sm tw:text-gray-600")}>
                    Show benefits on dashboard
                  </p>
                </div>
                <Switch
                  id="dashboard-display"
                  checked={currentSettings?.showWidgetOnDashboard || false}
                  onCheckedChange={handleDashboardWidgetToggle}
                />
              </div>
            )}

            {featureFlags?.addToSidebar && (
              <div
                className={cn(
                  "tw:flex tw:items-center tw:justify-between tw:p-3 tw:border tw:border-gray-200 tw:rounded-md",
                )}
              >
                <div>
                  <Label
                    htmlFor="sidebar-display"
                    className={cn("tw:font-medium")}
                  >
                    Navigation Menu
                  </Label>
                  <p className={cn("tw:text-sm tw:text-gray-600")}>
                    Add to sidebar navigation
                  </p>
                </div>
                <Switch
                  id="sidebar-display"
                  checked={currentSettings?.addToSidebar || false}
                  onCheckedChange={handleSidebarToggle}
                />
              </div>
            )}
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
          className={cn("tw:border-blue-300 tw:shadow-md tw:overflow-hidden")}
        >
          <CardHeader className={cn("tw:bg-blue-100")}>
            <CardTitle
              className={cn(
                "tw:flex tw:items-center tw:text-blue-900 tw:font-bold",
              )}
            >
              <CheckCircle
                className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-blue-800")}
              />
              Exclusive Discounts
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("tw:bg-white tw:mt-4")}>
            <p className={cn("tw:text-gray-800 tw:font-medium")}>
              Offer your employees special discounts and deals from top brands
              across multiple categories, enhancing your benefits package.
            </p>
          </CardContent>
        </Card>

        <Card
          className={cn("tw:border-blue-300 tw:shadow-md tw:overflow-hidden")}
        >
          <CardHeader className={cn("tw:bg-blue-100")}>
            <CardTitle
              className={cn(
                "tw:flex tw:items-center tw:text-blue-900 tw:font-bold",
              )}
            >
              <Users className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-blue-800")} />
              Employee Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("tw:bg-white tw:mt-4")}>
            <p className={cn("tw:text-gray-800 tw:font-medium")}>
              Boost employee satisfaction and retention by providing valuable
              perks that extend beyond the workplace.
            </p>
          </CardContent>
        </Card>

        <Card
          className={cn("tw:border-blue-300 tw:shadow-md tw:overflow-hidden")}
        >
          <CardHeader className={cn("tw:bg-blue-100")}>
            <CardTitle
              className={cn(
                "tw:flex tw:items-center tw:text-blue-900 tw:font-bold",
              )}
            >
              <Globe className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-blue-800")} />
              Global Availability
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("tw:bg-white tw:mt-4")}>
            <p className={cn("tw:text-gray-800 tw:font-medium")}>
              Available in 14 countries, ensuring your international teams can
              access the same great benefits no matter where they're located.
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
            <strong className={cn("tw:text-blue-900")}>
              Employee Satisfaction:
            </strong>{" "}
            Boost morale and retention with valuable perks at no cost.
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-blue-900")}>
              Competitive Edge:
            </strong>{" "}
            Enhance your benefits package to attract top talent.
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-blue-900")}>Fresh Content:</strong>{" "}
            Regularly updated offers keep employees engaged and coming back.
          </li>
          <li className={cn("tw:font-medium")}>
            <strong className={cn("tw:text-blue-900")}>
              Easy Implementation:
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
        "tw:bg-blue-50 tw:p-8 tw:rounded-lg tw:mt-6 tw:space-y-6 tw:border tw:border-blue-200 tw:shadow-md",
      )}
    >
      <div className={cn("tw:text-2xl tw:font-bold tw:mb-6 tw:text-blue-900")}>
        How Employee Benefits Works
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
              Simple Integration:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              We provide seamless integration options that work with your
              existing employee portal or dashboard.
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
              Personalized Access:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              Employees can access country-specific offers tailored to their
              location and preferences.
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
              Regular Updates:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              Our team continuously refreshes available offers and promotions to
              keep the content relevant.
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
              Usage Analytics:
            </strong>
            <p className={cn("tw:text-gray-800 tw:font-medium tw:mt-1")}>
              Optional reporting tools to help you understand the impact and
              value of the program.
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}
