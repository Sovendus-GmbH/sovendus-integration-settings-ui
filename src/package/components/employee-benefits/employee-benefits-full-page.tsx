"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  Gift,
  ShoppingBag,
  Star,
  Tag,
} from "lucide-react";
import { type JSX, useEffect, useRef, useState } from "react";
import type { CountryCodes, LanguageCodes } from "sovendus-integration-types";
import { type EmployeeBenefitsSettings } from "sovendus-integration-types";

import { Button } from "../shadcn/button";
import { Card, CardContent } from "../shadcn/card";
import { CountryLanguageSelector } from "./country-language-selector";

interface SovendusEmployeeBenefitsFullPageProps {
  currentSettings?: EmployeeBenefitsSettings | undefined;
}

export function SovendusEmployeeBenefitsFullPage(
  _props: SovendusEmployeeBenefitsFullPageProps,
): JSX.Element {
  const [selectedOption, setSelectedOption] =
    useState<`${CountryCodes}-${LanguageCodes}`>();
  const [showFireworks, setShowFireworks] = useState(false);
  const [activeView, setActiveView] = useState<"selector" | "benefits">(
    "selector",
  );
  const [benefitsUrl, setBenefitsUrl] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample featured offers
  const featuredOffers = [
    {
      title: "Online Shopping",
      discount: "Up to 70% off",
      icon: <ShoppingBag className="tw:h-4 tw:w-4" />,
    },
    {
      title: "Hotel Bookings",
      discount: "25% discount",
      icon: <Star className="tw:h-4 tw:w-4" />,
    },
    {
      title: "Subscription Services",
      discount: "3 months free",
      icon: <Tag className="tw:h-4 tw:w-4" />,
    },
    // ... existing offers
  ];

  // Handle language/region selection
  useEffect(() => {
    if (selectedOption) {
      setShowFireworks(true);
      const timer = setTimeout(() => setShowFireworks(false), 3000);
      return (): void => clearTimeout(timer);
    }
    return;
  }, [selectedOption]);

  // Handle initial access to benefits
  const handleAccessBenefits = (link: string): void => {
    if (link) {
      setBenefitsUrl(link);
      setActiveView("benefits");
    }
  };

  return (
    <div className="tw:w-full tw:max-w-6xl tw:mx-auto" ref={containerRef}>
      <AnimatePresence mode="wait">
        {activeView === "selector" ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="tw:w-full"
          >
            {/* Hero Section */}
            <div className="tw:rounded-xl tw:overflow-hidden tw:bg-white tw:border tw:border-gray-200 tw:shadow-sm">
              <div className="tw:relative tw:overflow-hidden tw:bg-gradient-to-r tw:from-blue-500 tw:to-blue-600 tw:px-6 tw:py-5 tw:text-white">
                <div className="tw:flex tw:items-center">
                  <div className="tw:bg-white tw:rounded-full tw:p-2 tw:mr-3">
                    <Gift className="tw:h-6 tw:w-6 tw:text-blue-600" />
                  </div>
                  <div>
                    <h1 className="tw:text-2xl tw:font-bold">
                      Employee Benefits
                    </h1>
                    <p className="tw:text-sm tw:mt-1 tw:opacity-90">
                      Exclusive discounts and offers for your team
                    </p>
                  </div>
                </div>

                <div className="tw:absolute tw:-right-16 tw:-bottom-12 tw:opacity-10">
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="100" cy="100" r="100" fill="currentColor" />
                    <path
                      d="M40 100C40 67.9086 65.9086 42 98 42C130.091 42 156 67.9086 156 100C156 132.091 130.091 158 98 158C65.9086 158 40 132.091 40 100Z"
                      stroke="white"
                      strokeWidth="6"
                    />
                    <path
                      d="M71 100.04C71 85.1091 83.1091 73 98.04 73C112.971 73 125.08 85.1091 125.08 100.04C125.08 114.971 112.971 127.08 98.04 127.08C83.1091 127.08 71 114.971 71 100.04Z"
                      stroke="white"
                      strokeWidth="6"
                    />
                  </svg>
                </div>
              </div>

              <div className="tw:px-6 tw:py-6">
                <div className="tw:mb-6">
                  <h2 className="tw:text-xl tw:font-semibold tw:text-gray-800 tw:mb-4">
                    Select Your Region
                  </h2>
                  <p className="tw:text-gray-600 tw:mb-4">
                    Choose your country and language to access exclusive
                    employee discounts from top brands across retail, travel,
                    and services.
                  </p>

                  {/* The centralized dropdown selector */}
                  <div className="tw:max-w-lg">
                    <CountryLanguageSelector
                      selectedOption={selectedOption}
                      onOptionChange={setSelectedOption}
                      onSelectComplete={handleAccessBenefits}
                      buttonLabel="Access Employee Benefits"
                    />
                  </div>
                </div>

                {/* Featured Offers */}
                <div className="tw:mt-8">
                  <h2 className="tw:text-lg tw:font-medium tw:text-gray-800 tw:mb-4">
                    Featured Benefits
                  </h2>
                  <div className="tw:grid tw:grid-cols-1 sm:tw:grid-cols-2 md:tw:grid-cols-3 lg:tw:grid-cols-4 tw:gap-4">
                    {featuredOffers.map((offer, index) => (
                      <div
                        key={index}
                        className="tw:border tw:border-gray-200 tw:rounded-lg tw:p-4 tw:bg-white tw:shadow-sm hover:tw:shadow-md tw:transition-shadow"
                      >
                        <div className="tw:flex tw:items-center tw:mb-2">
                          <div className="tw:bg-blue-50 tw:p-2 tw:rounded-full tw:mr-3">
                            {offer.icon}
                          </div>
                          <h3 className="tw:font-medium tw:text-gray-800">
                            {offer.title}
                          </h3>
                        </div>
                        <div className="tw:flex tw:items-center tw:text-sm tw:text-green-600">
                          <CheckCircle className="tw:h-3.5 tw:w-3.5 tw:mr-1.5" />
                          <span>{offer.discount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Fireworks Animation for Selection */}
            <AnimatePresence>
              {showFireworks && (
                <motion.div
                  className="tw:fixed tw:inset-0 tw:z-10 tw:pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="tw:fireworks" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="benefits"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="tw:w-full tw:h-full tw:flex tw:flex-col"
          >
            <div className="tw:bg-white tw:rounded-xl tw:shadow-sm tw:border tw:border-gray-200 tw:mb-4 tw:p-3 tw:flex-shrink-0">
              <Button
                onClick={() => setActiveView("selector")}
                variant="outline"
                className="tw:flex tw:items-center"
              >
                <ChevronLeft className="tw:mr-2 tw:h-4 tw:w-4" />
                Back to Selection
              </Button>
            </div>

            <Card className="tw:overflow-hidden tw:rounded-xl tw:border-gray-200 tw:bg-white tw:shadow-sm tw:flex-grow tw:flex tw:flex-col">
              <CardContent className="tw:p-0 tw:flex-grow tw:flex tw:flex-col">
                <div
                  className="tw:relative tw:flex-grow"
                  style={{ height: "calc(100vh - 120px)" }}
                >
                  <iframe
                    ref={iframeRef}
                    src={benefitsUrl}
                    className="tw:absolute tw:top-0 tw:left-0 tw:w-full tw:h-full tw:border-0"
                    title="Employee Benefits"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    style={{ minHeight: "500px" }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
