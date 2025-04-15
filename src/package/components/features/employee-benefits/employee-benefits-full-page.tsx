"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  CheckCircle,
  Gift,
  Globe,
  ShoppingBag,
  Sparkles,
  Zap,
} from "lucide-react";
import { type JSX, useState } from "react";
import type { CountryCodes, LanguageCodes } from "sovendus-integration-types";
import { type EmployeeBenefitsSettings } from "sovendus-integration-types";

import { CountryLanguageSelector } from "./country-language-selector";

interface SovendusEmployeeBenefitsFullPageProps {
  currentSettings?: EmployeeBenefitsSettings | undefined;
}

export function SovendusEmployeeBenefitsFullPage({
  currentSettings,
}: SovendusEmployeeBenefitsFullPageProps): JSX.Element {
  const [selectedOption, setSelectedOption] =
    useState<`${CountryCodes}-${LanguageCodes}`>();
  if (!currentSettings?.addToSidebar) {
    return <></>;
  }
  const featuredOffers = [
    {
      title: "Online Shopping",
      discount: "Up to 70% off",
      description: "Exclusive discounts on top brands",
      icon: <ShoppingBag className="tw:h-5 tw:w-5 tw:text-blue-500" />,
      color: "tw:bg-blue-50",
    },
    {
      title: "Travel & Hotels",
      discount: "25% discount",
      description: "Special rates on hotels and flights",
      icon: <Globe className="tw:h-5 tw:w-5 tw:text-green-500" />,
      color: "tw:bg-green-50",
    },
    {
      title: "Premium Services",
      discount: "3 months free",
      description: "Extended trials on premium subscriptions",
      icon: <Award className="tw:h-5 tw:w-5 tw:text-purple-500" />,
      color: "tw:bg-purple-50",
    },
    {
      title: "Fast Delivery",
      discount: "Free shipping",
      description: "No-cost delivery on eligible orders",
      icon: <Zap className="tw:h-5 tw:w-5 tw:text-amber-500" />,
      color: "tw:bg-amber-50",
    },
  ];

  const handleAccessBenefits = (link: string): void => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key="selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="tw:w-full tw:h-full tw:overflow-auto"
        >
          {/* Compact Hero Section */}
          <div className="tw:rounded-lg tw:overflow-hidden tw:bg-white tw:border tw:border-gray-200 tw:shadow-md">
            <div className="tw:relative tw:overflow-hidden tw:bg-gradient-to-r tw:from-blue-600 tw:to-indigo-600 tw:px-6 tw:py-4 tw:text-white">
              <div className="tw:flex tw:items-center tw:justify-between">
                <div className="tw:flex tw:items-center">
                  <div className="tw:bg-white tw:rounded-full tw:p-2 tw:mr-3 tw:shadow-md">
                    <Gift className="tw:h-5 tw:w-5 tw:text-blue-600" />
                  </div>
                  <div>
                    <h1 className="tw:text-xl tw:font-bold">
                      Employee Benefits
                    </h1>
                    <p className="tw:text-sm tw:opacity-90">
                      Exclusive discounts for your team
                    </p>
                  </div>
                </div>
                <div className="tw:hidden md:tw:block">
                  <Sparkles className="tw:h-5 tw:w-5 tw:text-yellow-300 tw:opacity-80 floating" />
                </div>
              </div>
            </div>

            <div className="tw:px-6 tw:py-4">
              <div className="tw:mb-4">
                <h2 className="tw:text-lg tw:font-semibold tw:text-gray-800 tw:mb-2">
                  Select Your Region
                </h2>
                <p className="tw:text-gray-600 tw:mb-3 tw:text-sm">
                  Choose your country to access exclusive employee discounts
                  from top brands.
                </p>

                {/* Enhanced dropdown selector with animation */}
                <div className="tw:relative">
                  {!selectedOption && (
                    <div className="tw:absolute tw:inset-0 tw:rounded-md tw:animate-pulse tw:bg-blue-200 tw:opacity-30 tw:pointer-events-none" />
                  )}
                  <CountryLanguageSelector
                    selectedOption={selectedOption}
                    onOptionChange={setSelectedOption}
                    onSelectComplete={handleAccessBenefits}
                    buttonLabel="Access Employee Benefits"
                  />
                </div>
              </div>

              {/* Compact Featured Offers */}
              <div className="tw:mt-6">
                <h2 className="tw:text-base tw:font-semibold tw:text-gray-800 tw:mb-3 tw:flex tw:items-center">
                  <Award className="tw:mr-2 tw:h-4 tw:w-4 tw:text-blue-500" />
                  Featured Benefits
                </h2>
                <div className="tw:grid tw:grid-cols-2 md:tw:grid-cols-4 tw:gap-3">
                  {featuredOffers.map((offer, index) => (
                    <div
                      key={index}
                      className="tw:border tw:border-gray-200 tw:rounded-md tw:p-3 tw:bg-white tw:shadow-sm hover:tw:shadow-md tw:transition-all tw:duration-300"
                    >
                      <div className="tw:flex tw:items-center tw:mb-2">
                        <div
                          className={`${offer.color} tw:p-2 tw:rounded-full tw:mr-2`}
                        >
                          {offer.icon}
                        </div>
                        <h3 className="tw:font-medium tw:text-gray-800 tw:text-sm">
                          {offer.title}
                        </h3>
                      </div>
                      <div className="tw:flex tw:items-center tw:text-xs tw:font-medium tw:text-green-600">
                        <CheckCircle className="tw:h-3 tw:w-3 tw:mr-1" />
                        <span>{offer.discount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
