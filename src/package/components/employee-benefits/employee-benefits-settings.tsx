"use client";

import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Gift,
  Settings,
  Tag,
} from "lucide-react";
import {
  type Dispatch,
  type JSX,
  type ReactNode,
  type SetStateAction,
  useState,
} from "react";
import type { CountryCodes, LanguageCodes } from "sovendus-integration-types";
import {
  type EmployeeBenefitsSettings,
  type SovendusAppSettings,
  Versions,
} from "sovendus-integration-types";

import { Card, CardContent } from "../shadcn/card";
import { Label } from "../shadcn/label";
import { Switch } from "../shadcn/switch";
import { CountryLanguageSelector } from "./country-language-selector";

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
  const [expandedSections, setExpandedSections] = useState({
    benefits: false,
    configuration: false,
    resources: false,
  });
  const [selectedOption, setSelectedOption] = useState<
    `${CountryCodes}-${LanguageCodes}` | undefined
  >();

  const toggleSection = (section: keyof typeof expandedSections): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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

  // Unified component for section headers to reduce repetition
  const SectionHeader = ({
    id,
    icon,
    title,
  }: {
    id: keyof typeof expandedSections;
    icon: ReactNode;
    title: string;
  }): JSX.Element => (
    <button
      onClick={() => toggleSection(id)}
      className="tw:flex tw:w-full tw:items-center tw:justify-between tw:rounded-md tw:bg-gray-50 tw:px-3 tw:py-2 tw:text-left tw:text-sm tw:font-medium tw:text-gray-700 hover:tw:bg-gray-100"
    >
      <div className="tw:flex tw:items-center">
        <span className="tw:mr-2 tw:text-blue-500">{icon}</span>
        <span>{title}</span>
      </div>
      {expandedSections[id] ? (
        <ChevronUp className="tw:h-4 tw:w-4 tw:text-gray-500" />
      ) : (
        <ChevronDown className="tw:h-4 tw:w-4 tw:text-gray-500" />
      )}
    </button>
  );

  // Compact display option component to reduce repetition
  const DisplayOption = ({
    id,
    icon,
    title,
    description,
    checked,
    onChange,
  }: {
    id: string;
    icon: ReactNode;
    title: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }): JSX.Element => (
    <div className="tw:flex tw:items-center tw:justify-between tw:rounded-md tw:border tw:border-gray-200 tw:bg-white tw:p-2.5">
      <div className="tw:flex tw:items-center">
        <div className="tw:mr-2 tw:flex tw:h-7 tw:w-7 tw:flex-shrink-0 tw:items-center tw:justify-center tw:rounded tw:bg-blue-50 tw:text-blue-600">
          {icon}
        </div>
        <div>
          <Label
            htmlFor={id}
            className="tw:block tw:text-sm tw:font-medium tw:text-gray-700"
          >
            {title}
          </Label>
          <p className="tw:text-xs tw:text-gray-500">{description}</p>
        </div>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="tw:bg-gray-200 data-[state=checked]:tw:bg-blue-500"
      />
    </div>
  );

  return (
    <Card className="tw:w-full tw:overflow-hidden tw:rounded-lg tw:border-gray-200 tw:bg-white">
      <CardContent className="tw:p-0">
        {/* Streamlined Header with merged text */}
        <div className="tw:bg-gradient-to-r tw:from-blue-500 tw:to-blue-600 tw:px-3 tw:py-2 tw:text-white">
          <div className="tw:flex tw:items-center">
            <div className="tw:mr-2 tw:flex tw:h-6 tw:w-6 tw:flex-shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:bg-white tw:p-1">
              <Gift className="tw:h-3.5 tw:w-3.5 tw:text-blue-500" />
            </div>
            <h2 className="tw:text-base tw:font-medium">
              Employee Benefits
              <span className="tw:ml-1 tw:text-xs tw:font-normal tw:opacity-80">
                • Exclusive discounts for teams
              </span>
            </h2>
          </div>
        </div>

        {/* Compact Main Content with simplified spacing */}
        <div className="tw:space-y-2 tw:px-3 tw:py-3">
          {/* Use the compact dropdown selector */}
          <div className="tw:rounded-lg tw:border tw:border-blue-100 tw:bg-blue-50 tw:p-3">
            <p className="tw:mb-2 tw:text-sm tw:text-blue-700">
              Select your region to view personalized employee discounts:
            </p>

            <CountryLanguageSelector
              selectedOption={selectedOption}
              onOptionChange={setSelectedOption}
              onSelectComplete={(link) => {
                if (link) {
                  window.open(link, "_blank");
                }
              }}
              compact={true}
            />
          </div>

          {/* Unified Section Headers & Content */}
          <div>
            <SectionHeader
              id="benefits"
              icon={<Tag className="tw:h-4 tw:w-4" />}
              title="Benefit Details"
            />

            {expandedSections.benefits && (
              <div className="tw:mt-1.5 tw:rounded-md tw:bg-gray-50 tw:p-2.5">
                <p className="tw:mb-1.5 tw:text-xs tw:text-gray-600">
                  Exclusive discounts from top brands across retail, travel, and
                  services.
                </p>
                <div className="tw:grid tw:grid-cols-2 tw:gap-1.5">
                  {[
                    "Brand discounts up to 70%",
                    "Travel & leisure savings",
                    "Weekly updated offers",
                    "Exclusive employee deals",
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="tw:flex tw:items-center tw:text-xs"
                    >
                      <CheckCircle className="tw:mr-1 tw:h-3 tw:w-3 tw:text-green-500" />
                      <span className="tw:text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <SectionHeader
              id="configuration"
              icon={<Settings className="tw:h-4 tw:w-4" />}
              title="Display Options"
            />

            {expandedSections.configuration && (
              <div className="tw:mt-1.5">
                {featureFlags?.showWidgetOnDashboard ||
                featureFlags?.addToSidebar ? (
                  <div className="tw:space-y-2">
                    {featureFlags?.showWidgetOnDashboard && (
                      <DisplayOption
                        id="dashboard-display"
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
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
                        }
                        title="Dashboard Widget"
                        description="Show benefits on dashboard"
                        checked={
                          currentSettings?.showWidgetOnDashboard || false
                        }
                        onChange={handleWidgetEnableChange}
                      />
                    )}

                    {featureFlags?.addToSidebar && (
                      <DisplayOption
                        id="sidebar-display"
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
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
                        }
                        title="Navigation Menu"
                        description="Add to sidebar"
                        checked={currentSettings?.addToSidebar || false}
                        onChange={handleSidebarEnableChange}
                      />
                    )}
                  </div>
                ) : (
                  <div className="tw:mt-1.5 tw:flex tw:rounded-md tw:border tw:border-gray-200 tw:bg-gray-50 tw:p-2.5">
                    <div className="tw:mr-2 tw:flex tw:h-7 tw:w-7 tw:flex-shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:bg-gray-200 tw:text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
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
                      <h5 className="tw:text-xs tw:font-medium tw:text-gray-700">
                        No Display Options Available
                      </h5>
                      <p className="tw:text-xs tw:text-gray-600">
                        Contact administrator to enable options.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <SectionHeader
              id="resources"
              icon={<ExternalLink className="tw:h-4 tw:w-4" />}
              title="Resources"
            />

            {expandedSections.resources && (
              <div className="tw:mt-1.5 tw:flex tw:gap-2">
                <a
                  href="https://docs.sovendus.com/employee-benefits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tw:flex tw:flex-1 tw:items-center tw:rounded-md tw:border tw:border-gray-200 tw:bg-white tw:p-2 tw:transition-all hover:tw:border-blue-200 hover:tw:bg-blue-50"
                >
                  <div className="tw:flex tw:flex-col">
                    <div className="tw:flex tw:items-center">
                      <svg
                        className="tw:mr-1.5 tw:h-3.5 tw:w-3.5 tw:text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
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
                      <div className="tw:text-sm tw:font-medium tw:text-gray-700">
                        Docs
                      </div>
                    </div>
                    <p className="tw:text-xs tw:text-gray-500">Setup guides</p>
                  </div>
                </a>

                <a
                  href="mailto:techsupport@sovendus.com"
                  className="tw:flex tw:flex-1 tw:items-center tw:rounded-md tw:border tw:border-gray-200 tw:bg-white tw:p-2 tw:transition-all hover:tw:border-blue-200 hover:tw:bg-blue-50"
                >
                  <div className="tw:flex tw:flex-col">
                    <div className="tw:flex tw:items-center">
                      <svg
                        className="tw:mr-1.5 tw:h-3.5 tw:w-3.5 tw:text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
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
                      <div className="tw:text-sm tw:font-medium tw:text-gray-700">
                        Support
                      </div>
                    </div>
                    <p className="tw:text-xs tw:text-gray-500">Contact us</p>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
