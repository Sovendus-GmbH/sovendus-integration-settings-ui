"use client";

import { CheckCircle, ExternalLink, Gift, Settings, Tag } from "lucide-react";
import { type Dispatch, type JSX, type SetStateAction } from "react";
import {
  type EmployeeBenefitsSettings,
  type SovendusAppSettings,
  Versions,
} from "sovendus-integration-types";

import { Card, CardContent } from "../shadcn/card";
import { Label } from "../shadcn/label";
import { Switch } from "../shadcn/switch";
import { SovendusEmployeeBenefitsSelector } from "./employee-benefits";

interface SovendusEmployeeBenefitsProps {
  currentSettings: EmployeeBenefitsSettings | undefined;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  featureFlags: SovendusEmployeeBenefitsFeatureFlags | undefined;
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
}: SovendusEmployeeBenefitsProps): JSX.Element {
  const handleWidgetEnableChange = (checked: boolean): void => {
    setCurrentSettings((prevState) => ({
      ...prevState,
      employeeBenefits: {
        addToSidebar: false,
        isEnabled: true,
        ...prevState.employeeBenefits,
        showWidgetOnDashboard: checked,
      },
    }));
  };

  const handleSidebarEnableChange = (checked: boolean): void => {
    setCurrentSettings((prevState) => ({
      ...prevState,
      employeeBenefits: {
        showWidgetOnDashboard: false,
        isEnabled: true,
        ...prevState.employeeBenefits,
        addToSidebar: checked,
      },
      version: Versions.THREE,
    }));
  };

  return (
    <Card className="tw:w-full tw:overflow-hidden tw:rounded-lg tw:border-gray-200 tw:bg-white">
      {/* Main Content */}
      <CardContent className="tw:p-0">
        {/* Header Section */}
        <div className="tw:relative tw:overflow-hidden tw:bg-gradient-to-r tw:from-blue-500 tw:to-blue-600 tw:px-6 tw:py-5 tw:text-white">
          <div className="tw:absolute tw:right-0 tw:top-0 tw:h-32 tw:w-32 tw:opacity-10">
            <svg viewBox="0 0 100 100" fill="white">
              <path d="M50 12.5c-20.7 0-37.5 16.8-37.5 37.5S29.3 87.5 50 87.5 87.5 70.7 87.5 50 70.7 12.5 50 12.5zm0 68.8c-17.3 0-31.2-14-31.2-31.2S32.7 18.8 50 18.8 81.2 32.7 81.2 50 67.3 81.2 50 81.2z" />
              <path d="M50 31.2c-10.3 0-18.8 8.4-18.8 18.8S39.7 68.8 50 68.8 68.8 60.3 68.8 50 60.3 31.2 50 31.2zm0 31.3c-6.9 0-12.5-5.6-12.5-12.5S43.1 37.5 50 37.5 62.5 43.1 62.5 50 56.9 62.5 50 62.5z" />
            </svg>
          </div>

          <div className="tw:flex tw:items-center">
            <div className="tw:mr-3 tw:rounded-full tw:bg-white tw:p-2">
              <Gift className="tw:h-5 tw:w-5 tw:text-blue-500" />
            </div>
            <div>
              <h2 className="tw:text-lg tw:font-semibold">Employee Benefits</h2>
              <p className="tw:mt-1 tw:text-sm tw:opacity-90">
                Exclusive discounts for your team
              </p>
            </div>
          </div>
        </div>

        {/* Main Benefit Explanation */}
        <div className="tw:px-6 tw:py-4">
          <div className="tw:mb-4 tw:flex tw:flex-col tw:gap-3 tw:rounded-lg tw:bg-gray-50 tw:p-4">
            <div className="tw:flex tw:items-start">
              <Tag className="tw:mr-3 tw:h-5 tw:w-5 tw:flex-shrink-0 tw:text-blue-500" />
              <div>
                <h3 className="tw:font-medium tw:text-gray-800">
                  What Your Employees Get
                </h3>
                <p className="tw:mt-1 tw:text-sm tw:text-gray-600">
                  Access to thousands of exclusive discounts from top brands
                  across retail, travel, and services.
                </p>
              </div>
            </div>

            <div className="tw:ml-8 tw:grid tw:grid-cols-2 tw:gap-2">
              {[
                "Brand discounts up to 70%",
                "Travel & leisure savings",
                "Weekly updated offers",
                "Exclusive employee deals",
              ].map((benefit, index) => (
                <div key={index} className="tw:flex tw:items-center tw:text-sm">
                  <CheckCircle className="tw:mr-1.5 tw:h-3.5 tw:w-3.5 tw:text-green-500" />
                  <span className="tw:text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Region Selection & Get Vouchers */}
          <SovendusEmployeeBenefitsSelector />

          {/* Configuration Options - Redesigned */}
          <div className="tw:mt-6 tw:rounded-lg tw:border tw:border-gray-200 tw:bg-white tw:shadow-sm">
            <div className="tw:flex tw:items-center tw:border-b tw:border-gray-100 tw:bg-gray-50 tw:px-4 tw:py-3">
              <Settings className="tw:mr-2.5 tw:h-4.5 tw:w-4.5 tw:text-blue-600" />
              <h3 className="tw:font-medium tw:text-gray-800">
                Configuration & Integration
              </h3>
            </div>

            <div className="tw:p-4">
              {/* Display Options - Enhanced UI */}
              <div className="tw:mb-5">
                <div className="tw:mb-2.5 tw:flex tw:items-center tw:justify-between">
                  <h4 className="tw:text-sm tw:font-medium tw:text-gray-700">
                    Display Options
                  </h4>
                  <span
                    className={`
                    tw:text-xs tw:px-2 tw:py-0.5 tw:rounded-full 
                    ${
                      featureFlags?.showWidgetOnDashboard ||
                      featureFlags?.addToSidebar
                        ? "tw:bg-green-100 tw:text-green-800"
                        : "tw:bg-gray-100 tw:text-gray-500"
                    }
                  `}
                  >
                    {featureFlags?.showWidgetOnDashboard ||
                    featureFlags?.addToSidebar
                      ? "Available"
                      : "Not Available"}
                  </span>
                </div>

                {featureFlags?.showWidgetOnDashboard ||
                featureFlags?.addToSidebar ? (
                  <div className="tw:grid tw:gap-3 tw:md:grid-cols-2">
                    {featureFlags?.showWidgetOnDashboard && (
                      <div className="tw:group tw:flex tw:flex-col tw:justify-between tw:rounded-lg tw:border tw:border-gray-200 tw:bg-white tw:p-3 tw:transition-all hover:tw:border-blue-200 hover:tw:shadow-sm">
                        <div className="tw:mb-2">
                          <div className="tw:flex tw:items-center">
                            <div className="tw:mr-2 tw:flex tw:h-8 tw:w-8 tw:flex-shrink-0 tw:items-center tw:justify-center tw:rounded tw:bg-blue-50 tw:text-blue-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  x="3"
                                  y="3"
                                  width="18"
                                  height="18"
                                  rx="2"
                                  ry="2"
                                ></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                              </svg>
                            </div>
                            <div>
                              <Label
                                htmlFor="dashboard-display"
                                className="tw:block tw:text-sm tw:font-medium tw:text-gray-700"
                              >
                                Dashboard Widget
                              </Label>
                              <p className="tw:text-xs tw:text-gray-500">
                                Show benefits on employee dashboard
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="tw:flex tw:items-center tw:justify-between">
                          <div className="tw:text-xs tw:text-gray-500">
                            {currentSettings?.showWidgetOnDashboard
                              ? "Enabled"
                              : "Disabled"}
                          </div>
                          <Switch
                            id="dashboard-display"
                            checked={
                              currentSettings?.showWidgetOnDashboard || false
                            }
                            onCheckedChange={handleWidgetEnableChange}
                            className="tw:bg-gray-200 data-[state=checked]:tw:bg-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    {featureFlags?.addToSidebar && (
                      <div className="tw:group tw:flex tw:flex-col tw:justify-between tw:rounded-lg tw:border tw:border-gray-200 tw:bg-white tw:p-3 tw:transition-all hover:tw:border-blue-200 hover:tw:shadow-sm">
                        <div className="tw:mb-2">
                          <div className="tw:flex tw:items-center">
                            <div className="tw:mr-2 tw:flex tw:h-8 tw:w-8 tw:flex-shrink-0 tw:items-center tw:justify-center tw:rounded tw:bg-blue-50 tw:text-blue-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  x="3"
                                  y="3"
                                  width="18"
                                  height="18"
                                  rx="2"
                                ></rect>
                                <path d="M9 3v18"></path>
                              </svg>
                            </div>
                            <div>
                              <Label
                                htmlFor="sidebar-display"
                                className="tw:block tw:text-sm tw:font-medium tw:text-gray-700"
                              >
                                Navigation Menu
                              </Label>
                              <p className="tw:text-xs tw:text-gray-500">
                                Add to sidebar navigation
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="tw:flex tw:items-center tw:justify-between">
                          <div className="tw:text-xs tw:text-gray-500">
                            {currentSettings?.addToSidebar
                              ? "Enabled"
                              : "Disabled"}
                          </div>
                          <Switch
                            id="sidebar-display"
                            checked={currentSettings?.addToSidebar || false}
                            onCheckedChange={handleSidebarEnableChange}
                            className="tw:bg-gray-200 data-[state=checked]:tw:bg-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="tw:flex tw:rounded-lg tw:border tw:border-gray-200 tw:bg-gray-50 tw:p-3">
                    <div className="tw:mr-3 tw:flex tw:h-9 tw:w-9 tw:flex-shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:bg-gray-200 tw:text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    </div>
                    <div>
                      <h5 className="tw:mb-1 tw:text-sm tw:font-medium tw:text-gray-700">
                        No Display Options Available
                      </h5>
                      <p className="tw:text-xs tw:text-gray-600">
                        Contact your administrator to enable dashboard widget or
                        navigation menu options.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Integration Resources - Enhanced UI */}
              <div></div>
              <h4 className="tw:mb-2.5 tw:text-sm tw:font-medium tw:text-gray-700">
                Integration Resources
              </h4>

              <div className="tw:grid tw:gap-3 tw:md:grid-cols-2">
                <a
                  href="https://docs.sovendus.com/employee-benefits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tw:group tw:flex tw:items-center tw:rounded-lg tw:border tw:border-gray-200 tw:bg-white tw:p-3 tw:transition-all hover:tw:border-blue-200 hover:tw:shadow-sm hover:tw:bg-blue-50"
                >
                  <div className="tw:mr-3 tw:flex tw:h-8 tw:w-8 tw:flex-shrink-0 tw:items-center tw:justify-center tw:rounded tw:bg-blue-50 tw:text-blue-600 tw:group-hover:tw:bg-blue-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <div className="tw:flex-1">
                    <div className="tw:flex tw:items-center tw:justify-between">
                      <div className="tw:text-sm tw:font-medium tw:text-gray-700 tw:group-hover:tw:text-blue-700">
                        Documentation
                      </div>
                      <ExternalLink className="tw:h-3.5 tw:w-3.5 tw:text-gray-400 tw:group-hover:tw:text-blue-600" />
                    </div>
                    <p className="tw:text-xs tw:text-gray-500 tw:group-hover:tw:text-blue-600">
                      Integration guides and setup info
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:techsupport@sovendus.com"
                  className="tw:group tw:flex tw:items-center tw:rounded-lg tw:border tw:border-gray-200 tw:bg-white tw:p-3 tw:transition-all hover:tw:border-blue-200 hover:tw:shadow-sm hover:tw:bg-blue-50"
                >
                  <div className="tw:mr-3 tw:flex tw:h-8 tw:w-8 tw:flex-shrink-0 tw:items-center tw:justify-center tw:rounded tw:bg-blue-50 tw:text-blue-600 tw:group-hover:tw:bg-blue-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="tw:flex-1">
                    <div className="tw:flex tw:items-center tw:justify-between">
                      <div className="tw:text-sm tw:font-medium tw:text-gray-700 tw:group-hover:tw:text-blue-700">
                        Get Support
                      </div>
                      <ExternalLink className="tw:h-3.5 tw:w-3.5 tw:text-gray-400 tw:group-hover:tw:text-blue-600" />
                    </div>
                    <p className="tw:text-xs tw:text-gray-500 tw:group-hover:tw:text-blue-600">
                      Contact our integration team
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Information tooltip about vouchers - Optional extra information */}
          <div className="tw:mt-4 tw:flex tw:items-center tw:justify-center tw:text-xs tw:text-gray-500">
            <svg
              className="tw:mr-1.5 tw:h-3.5 tw:w-3.5 tw:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            Voucher availability varies by region and is updated regularly
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
