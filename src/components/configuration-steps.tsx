"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Cog,
  ExternalLink,
  Gift,
  ShoppingBag,
} from "lucide-react";
import type { Dispatch, JSX, SetStateAction } from "react";
import { useEffect, useMemo, useState } from "react";
import type {
  CountryCodes,
  SovendusAppSettings,
  VoucherNetworkSettings,
} from "sovendus-integration-types";
import { LANGUAGES_BY_COUNTRIES } from "sovendus-integration-types";

import { cn } from "../utils/utils";
import type { AdditionalSteps } from "./backend-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./shadcn/accordion";
import { Alert, AlertDescription } from "./shadcn/alert";
import { Button } from "./shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "./shadcn/card";
import { Progress } from "./shadcn/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./shadcn/tabs";
import {
  CountryOptions,
  EnabledVoucherNetworkCountries,
  isVnEnabled,
} from "./voucher-network-country-options";

interface SovendusVoucherNetworkProps {
  currentSettings: VoucherNetworkSettings;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  additionalSteps?: AdditionalSteps["voucherNetwork"];
  openContactForm: () => void;
}

export function SovendusVoucherNetwork({
  currentSettings,
  setCurrentSettings,
  additionalSteps,
  openContactForm,
}: SovendusVoucherNetworkProps): JSX.Element {
  const [setupGuideCompleted, setSetupGuideCompleted] = useState<boolean>(
    () => {
      try {
        return localStorage.getItem("setupGuideCompleted") === "true";
      } catch {
        return false;
      }
    },
  );
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [steps, setSteps] = useState<{
    [key: number]: { completed: boolean; viewed: boolean };
  }>(() => {
    try {
      const savedProgress = localStorage.getItem("sovendusSetupProgress");
      const initialState = {
        1: { completed: false, viewed: false },
        2: { completed: false, viewed: false },
        3: { completed: false, viewed: false },
      };
      return savedProgress ? JSON.parse(savedProgress) : initialState;
    } catch {
      return {
        1: { completed: false, viewed: false },
        2: { completed: false, viewed: false },
        3: { completed: false, viewed: false },
      };
    }
  });
  const [activeTab, setActiveTab] = useState<
    "configure" | "benefits" | "how-it-works" | "setup"
  >(setupGuideCompleted ? "configure" : "setup");

  const vnEnabled = isVnEnabled(currentSettings);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sovendusSetupProgress", JSON.stringify(steps));
  }, [steps]);

  // Set initial active tab based on setup guide completion
  useEffect(() => {
    setActiveTab(setupGuideCompleted ? "configure" : "setup");
  }, [setupGuideCompleted]);

  useEffect(() => {
    localStorage.setItem("setupGuideCompleted", String(setupGuideCompleted));
  }, [setupGuideCompleted]);

  useEffect(() => {
    // Find the main content container and scroll to top
    const contentContainer = document.querySelector(".overflow-y-auto");
    if (contentContainer) {
      contentContainer.scrollTop = 0;
    }

    // Mark the current step as viewed
    setSteps((prev) => ({
      ...prev,
      [currentStep]: { ...prev[currentStep], viewed: true },
    }));
  }, [currentStep]);

  const handleStepClick = (step: number): void => {
    // Mark the step as viewed when clicked
    setSteps((prev) => ({
      ...prev,
      [step]: { ...prev[step], viewed: true },
    }));
    setCurrentStep(step);
  };

  const goToNextStep = (): void => {
    // Mark current step as completed
    setSteps((prev) => ({
      ...prev,
      [currentStep]: { ...prev[currentStep], completed: true, viewed: true },
    }));

    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      completeSetup();
    }
  };

  const goToPreviousStep = (): void => {
    if (currentStep > 1) {
      // Mark current step as incomplete when going back
      setSteps((prev) => ({
        ...prev,
        [currentStep]: { ...prev[currentStep], completed: false },
      }));
      setCurrentStep((prev) => prev - 1);
    }
  };

  const completeSetup = (): void => {
    setSetupGuideCompleted(true);
    setActiveTab("configure");
  };

  const restartSetup = (): void => {
    setSetupGuideCompleted(false);
    setCurrentStep(1);
    setSteps({
      1: { completed: false, viewed: true },
      2: { completed: false, viewed: false },
      3: { completed: false, viewed: false },
    });
    setActiveTab("setup");
  };

  const totalProgress = useMemo(() => {
    if (currentStep === 1) {
      return 0;
    }
    const completedSteps = Object.values(steps).filter(
      (step) => step.completed,
    ).length;
    return (completedSteps / 3) * 100;
  }, [steps, currentStep]);

  const configurationContent = (
    <div className={cn("space-y-6")}>
      <Alert
        className={cn(
          `${vnEnabled ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"} mt-2`,
        )}
      >
        <AlertDescription
          className={cn(vnEnabled ? "text-green-700" : "text-red-700")}
        >
          <EnabledVoucherNetworkCountries currentSettings={currentSettings} />
        </AlertDescription>
      </Alert>

      {additionalSteps && (
        <Card className={cn("border-2 border-blue-500")}>
          <CardHeader>
            <CardTitle
              className={cn("text-xl font-semibold flex items-center")}
            >
              <CheckCircle className={cn("w-6 h-6 mr-2 text-blue-500")} />
              Additional Setup Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className={cn("font-semibold mb-2")}>
              {additionalSteps.title}
            </h4>
            <ol className={cn("list-decimal list-inside space-y-2")}>
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
        className={cn("w-full mt-8")}
      >
        <AccordionItem
          value="step1"
          className={cn("border-2 border-blue-500 rounded-lg overflow-hidden")}
        >
          <AccordionTrigger
            className={cn("bg-blue-50 p-4 text-xl font-semibold")}
          >
            <div className={cn("flex items-center")}>
              <Cog className={cn("w-6 h-6 mr-2 text-blue-500")} />
              Configure Voucher Network & Checkout Benefits
            </div>
          </AccordionTrigger>
          <AccordionContent className={cn("p-4 bg-white")}>
            <p className={cn("mb-4 text-lg")}>
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

  const setupGuideContent = (
    <div className={cn("space-y-6")}>
      {/* Progress indicator */}
      <div className={cn("mb-6 space-y-2")}>
        <div className={cn("flex justify-between text-sm")}>
          <span>Setup Progress</span>
          <span>{Math.round(totalProgress)}% Complete</span>
        </div>
        <Progress value={totalProgress} className={cn("h-2")} />
      </div>

      {/* Step indicators */}
      <div className={cn("grid grid-cols-3 gap-4 mb-8")}>
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            onClick={(): void => handleStepClick(step)}
            className={cn(
              "relative flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all",
              currentStep === step
                ? "bg-blue-50 border-2 border-blue-500"
                : steps[step].completed
                  ? "bg-green-50 border-2 border-green-500"
                  : "bg-gray-50 border-2 border-gray-200",
              "hover:border-blue-300",
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mb-2",
                currentStep === step
                  ? "bg-blue-500 text-white"
                  : steps[step].completed
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600",
              )}
            >
              {steps[step].completed ? (
                <CheckCircle className={cn("h-5 w-5")} />
              ) : (
                step
              )}
            </div>
            <span
              className={cn(
                "text-sm font-medium text-center",
                currentStep === step
                  ? "text-blue-700"
                  : steps[step].completed
                    ? "text-green-700"
                    : "text-gray-600",
              )}
            >
              {step === 1
                ? "Shopify Integration"
                : step === 2
                  ? "Configure"
                  : "Testing"}
            </span>
            {steps[step].viewed && !steps[step].completed && (
              <span className={cn("text-xs text-blue-600 mt-1")}>
                In Progress
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className={cn("mt-8")} id="step-content">
        {currentStep === 1 && <ShopifyIntegrationStep />}
        {currentStep === 2 && (
          <div className={cn("space-y-6")}>{configurationContent}</div>
        )}
        {currentStep === 3 && <TestingStep />}
      </div>

      {/* Navigation buttons */}
      <div className={cn("flex justify-between mt-6 pt-4 border-t")}>
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={currentStep === 1}
          className={cn("gap-2")}
        >
          <ArrowLeft className={cn("h-4 w-4")} />
          Previous
        </Button>

        <Button
          onClick={goToNextStep}
          className={cn(
            "gap-2",
            currentStep === 3 && steps[3]?.completed ? "bg-green-600" : "",
          )}
        >
          {currentStep === 3 ? "Complete Setup" : "Next"}
          {currentStep < 3 && <ArrowRight className={cn("h-4 w-4")} />}
        </Button>
      </div>
    </div>
  );

  const benefitsContent = (
    <div>
      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 mb-8")}>
        <Card>
          <CardHeader>
            <CardTitle className={cn("flex items-center")}>
              <Gift className={cn("mr-2 h-5 w-5 text-blue-500")} />
              Voucher Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Gain traffic and new sales through our closed voucher network with
              over 7 million online shoppers every month.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className={cn("flex items-center")}>
              <ShoppingBag className={cn("mr-2 h-5 w-5 text-green-500")} />
              Checkout Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Generate additional revenue by displaying offers from other shops
              on your checkout page. Earn commissions when your customers make
              purchases from these partner offers.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className={cn("bg-gray-100 p-6 rounded-lg mb-8")}>
        <h3 className={cn("text-2xl font-semibold mb-4")}>Key Benefits</h3>
        <ul className={cn("list-disc list-inside space-y-2")}>
          <li>
            <strong>Massive Reach:</strong> Connect with 7 million online
            shoppers monthly through our network of 2,300+ European partners.
          </li>
          <li>
            <strong>Performance-Based:</strong> Pay only for generated purchases
            in your shop, with no minimum contract duration.
          </li>
          <li>
            <strong>Dual Revenue Streams:</strong> Attract new customers through
            Voucher Network and earn additional revenue with Checkout Benefits.
          </li>
          <li>
            <strong>Seamless Integration:</strong> Easy setup process for both
            products with a single configuration.
          </li>
        </ul>
      </div>
    </div>
  );

  const howItWorksContent = (
    <div className={cn("bg-gray-50 p-6 rounded-lg mt-6 space-y-4")}>
      <h3 className={cn("text-2xl font-semibold mb-4")}>
        How Voucher Network & Checkout Benefits Work
      </h3>
      <ol className={cn("space-y-4")}>
        <li className={cn("flex items-start")}>
          <CheckCircle
            className={cn("mr-2 h-5 w-5 text-green-500 mt-1 flex-shrink-0")}
          />
          <div>
            <strong className={cn("text-lg")}>
              Voucher Network Integration:
            </strong>
            <p>
              After setup, your shop's vouchers are displayed on partner
              checkout pages, attracting new customers to your store.
            </p>
          </div>
        </li>
        <li className={cn("flex items-start")}>
          <CheckCircle
            className={cn("mr-2 h-5 w-5 text-green-500 mt-1 flex-shrink-0")}
          />
          <div>
            <strong className={cn("text-lg")}>
              Checkout Benefits Display:
            </strong>
            <p>
              Partner offers are shown on your checkout page, providing
              additional value to your customers and generating commission for
              you.
            </p>
          </div>
        </li>
        <li className={cn("flex items-start")}>
          <CheckCircle
            className={cn("mr-2 h-5 w-5 text-green-500 mt-1 flex-shrink-0")}
          />
          <div>
            <strong className={cn("text-lg")}>Dual Revenue Generation:</strong>
            <p>
              Benefit from new customer acquisitions through your vouchers and
              earn commissions from partner sales.
            </p>
          </div>
        </li>
        <li className={cn("flex items-start")}>
          <CheckCircle
            className={cn("mr-2 h-5 w-5 text-green-500 mt-1 flex-shrink-0")}
          />
          <div>
            <strong className={cn("text-lg")}>Continuous Optimization:</strong>
            <p>
              Our team works with you to refine your offers and placements for
              maximum performance and revenue.
            </p>
          </div>
        </li>
      </ol>
    </div>
  );

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
          onClick={openContactForm}
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

      {/* // <Tabs defaultValue="configure" className={cn("tw:w-full")}>
      //   <TabsList className={cn("tw:grid tw:w-full tw:grid-cols-3 tw:mb-8")}>
      //     <TabsTrigger
      //       value="configure"
      //       className={cn(
      //         "tw:text-lg tw:font-semibold tw:py-3 tw:bg-blue-100 tw:data-[state=active]:bg-blue-600 tw:data-[state=active]:text-white",
      //       )}
      //     >
      //       Configure
      //     </TabsTrigger>
      //     <TabsTrigger
      //       value="benefits"
      //       className={cn(
      //         "tw:text-lg tw:font-semibold tw:py-3 tw:bg-blue-100 tw:data-[state=active]:bg-blue-600 tw:data-[state=active]:text-white",
      //       )}
      //     >
      //       Key Benefits
      //     </TabsTrigger>
      //     <TabsTrigger
      //       value="how-it-works"
      //       className={cn(
      //         "tw:text-lg tw:font-semibold tw:py-3 tw:bg-blue-100 tw:data-[state=active]:bg-blue-600 tw:data-[state=active]:text-white",
      //       )}
      //     >
      //       How It Works
      //     </TabsTrigger>
      //   </TabsList>
      //   <TabsContent value="configure">
      //     <div className={cn("tw:space-y-6")}>
      //       <Alert
      //         className={cn(
      //           `${
      //             vnEnabled
      //               ? "tw:bg-green-50 tw:border-green-200"
      //               : "tw:bg-red-50 tw:border-red-200"
      //           } tw:mt-2`,
      //         )}
      //       >
      //         <AlertDescription
      //           className={cn(
      //             vnEnabled ? "tw:text-green-700" : "tw:text-red-700",
      //           )}
      //         >
      //           <EnabledVoucherNetworkCountries
      //             currentSettings={currentSettings}
      //           />
      //         </AlertDescription>
      //       </Alert>
      //       {additionalSteps && (
      //         <Card className={cn("tw:border-2 tw:border-blue-500")}>
      //           <CardHeader>
      //             <CardTitle
      //               className={cn(
      //                 "tw:text-xl tw:font-semibold tw:flex tw:items-center",
      //               )}
      //             >
      //               <CheckCircle
      //                 className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-blue-500")}
      //               />
      //               Additional Setup Steps
      //             </CardTitle>
      //           </CardHeader>
      //           <CardContent>
      //             <div className={cn("tw:font-semibold tw:mb-2")}>
      //               {additionalSteps.title}
      //             </div>
      //             <ol
      //               className={cn(
      //                 "tw:list-decimal tw:list-inside tw:space-y-2",
      //               )}
      //             >
      //               {additionalSteps.subSteps.map((step, index) => (
      //                 <li key={index}>{step}</li>
      //               ))}
      //             </ol>
      //           </CardContent>
      //         </Card>
      //       )}

      //       <Accordion
      //         type="single"
      //         defaultValue="step1"
      //         collapsible
      //         className={cn("tw:w-full tw:mt-8")}
      //       >
      //         <AccordionItem
      //           value="step1"
      //           className={cn(
      //             "tw:border-2 tw:border-blue-500 tw:rounded-lg tw:overflow-hidden",
      //           )}
      //         >
      //           <AccordionTrigger
      //             className={cn(
      //               "tw:bg-blue-50 tw:p-4 tw:text-xl tw:font-semibold",
      //             )}
      //           >
      //             <div className={cn("tw:flex tw:items-center")}>
      //               <Cog
      //                 className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-blue-500")}
      //               />
      //               Configure Voucher Network & Checkout Benefits
      //             </div>
      //           </AccordionTrigger>
      //           <AccordionContent className={cn("tw:p-4 tw:bg-white")}>
      //             <p className={cn("tw:mb-4 tw:text-lg")}>
      //               Maximize your revenue potential by setting up Voucher
      //               Network and Checkout Benefits for multiple countries and
      //               languages. This configuration applies to both products,
      //               unlocking new markets and opportunities for growth.
      //             </p>
      //             <CountryOptions
      //               currentSettings={currentSettings}
      //               setCurrentSettings={setCurrentSettings}
      //               countryCodes={
      //                 Object.keys(LANGUAGES_BY_COUNTRIES) as CountryCodes[]
      //               }
      //             />
      //           </AccordionContent>
      //         </AccordionItem>
      //       </Accordion>
      //     </div>
      //   </TabsContent>
      //   <TabsContent value="benefits">
      //     <div
      //       className={cn(
      //         "tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-6 tw:mb-8",
      //       )}
      //     >
      //       <Card>
      //         <CardHeader>
      //           <CardTitle className={cn("tw:flex tw:items-center")}>
      //             <Gift
      //               className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-blue-500")}
      //             />
      //             Voucher Network
      //           </CardTitle>
      //         </CardHeader>
      //         <CardContent>
      //           <p>
      //             Gain traffic and new sales through our closed voucher network
      //             with over 7 million online shoppers every month.
      //           </p>
      //         </CardContent>
      //       </Card>
      //       <Card>
      //         <CardHeader>
      //           <CardTitle className={cn("tw:flex tw:items-center")}>
      //             <ShoppingBag
      //               className={cn("tw:mr-2 tw:h-5 tw:w-5 tw:text-green-500")}
      //             />
      //             Checkout Benefits
      //           </CardTitle>
      //         </CardHeader>
      //         <CardContent>
      //           <p>
      //             Generate additional revenue by displaying offers from other
      //             shops on your checkout page. Earn commissions when your
      //             customers make purchases from these partner offers.
      //           </p>
      //         </CardContent>
      //       </Card>
      //     </div>
      //     <div className={cn("tw:bg-gray-100 tw:p-6 tw:rounded-lg tw:mb-8")}>
      //       <div className={cn("tw:text-2xl tw:font-semibold tw:mb-4")}>
      //         Key Benefits
      //       </div>
      //       <ul className={cn("tw:list-disc tw:list-inside tw:space-y-2")}>
      //         <li>
      //           <strong>Massive Reach:</strong> Connect with 7 million online
      //           shoppers monthly through our network of 2,300+ European
      //           partners.
      //         </li>
      //         <li>
      //           <strong>Performance-Based:</strong> Pay only for generated
      //           purchases in your shop, with no minimum contract duration.
      //         </li>
      //         <li>
      //           <strong>Dual Revenue Streams:</strong> Attract new customers
      //           through Voucher Network and earn additional revenue with
      //           Checkout Benefits.
      //         </li>
      //         <li>
      //           <strong>Seamless Integration:</strong> Easy setup process for
      //           both products with a single configuration.
      //         </li>
      //       </ul>
      //     </div>
      //   </TabsContent>
      //   <TabsContent value="how-it-works">
      //     <div
      //       className={cn(
      //         "tw:bg-gray-50 tw:p-6 tw:rounded-lg tw:mt-6 tw:space-y-4",
      //       )}
      //     >
      //       <div className={cn("tw:text-2xl tw:font-semibold tw:mb-4")}>
      //         How Voucher Network & Checkout Benefits Work
      //       </div>
      //       <ol className={cn("tw:space-y-4")}>
      //         <li className={cn("tw:flex tw:items-start")}>
      //           <CheckCircle
      //             className={cn(
      //               "tw:mr-2 tw:h-5 tw:w-5 tw:text-green-500 tw:mt-1 tw:flex-shrink-0",
      //             )}
      //           />
      //           <div>
      //             <strong className={cn("tw:text-lg")}>
      //               Voucher Network Integration:
      //             </strong>
      //             <p>
      //               After setup, your shop's vouchers are displayed on partner
      //               checkout pages, attracting new customers to your store.
      //             </p>
      //           </div>
      //         </li>
      //         <li className={cn("tw:flex tw:items-start")}>
      //           <CheckCircle
      //             className={cn(
      //               "tw:mr-2 tw:h-5 tw:w-5 tw:text-green-500 tw:mt-1 tw:flex-shrink-0",
      //             )}
      //           />
      //           <div>
      //             <strong className={cn("tw:text-lg")}>
      //               Checkout Benefits Display:
      //             </strong>
      //             <p>
      //               Partner offers are shown on your checkout page, providing
      //               additional value to your customers and generating commission
      //               for you.
      //             </p>
      //           </div>
      //         </li>
      //         <li className={cn("tw:flex tw:items-start")}>
      //           <CheckCircle
      //             className={cn(
      //               "tw:mr-2 tw:h-5 tw:w-5 tw:text-green-500 tw:mt-1 tw:flex-shrink-0",
      //             )}
      //           />
      //           <div>
      //             <strong className={cn("tw:text-lg")}>
      //               Dual Revenue Generation:
      //             </strong>
      //             <p>
      //               Benefit from new customer acquisitions through your vouchers
      //               and earn commissions from partner sales.
      //             </p>
      //           </div>
      //         </li>
      //         <li className={cn("tw:flex tw:items-start")}>
      //           <CheckCircle
      //             className={cn(
      //               "tw:mr-2 tw:h-5 tw:w-5 tw:text-green-500 tw:mt-1 tw:flex-shrink-0",
      //             )}
      //           />
      //           <div>
      //             <strong className={cn("tw:text-lg")}>
      //               Continuous Optimization:
      //             </strong>
      //             <p>
      //               Our team works with you to refine your offers and placements
      //               for maximum performance and revenue.
      //             </p>
      //           </div>
      //         </li>
      //       </ol>
      //     </div>
      //   </TabsContent>
      // </Tabs> */}
      {/* Main content with tabs */}
      {!setupGuideCompleted ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-500" />
              Setup Guide
            </h2>
            <Button
              onClick={() => setSetupGuideCompleted(true)}
              variant="outline"
              className="gap-2"
            >
              <Cog className="h-4 w-4" />
              Skip to Configuration
            </Button>
          </div>
          {setupGuideContent}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Cog className="h-6 w-6 text-blue-500" />
              Configuration
            </h2>
            <Button
              onClick={restartSetup}
              variant="outline"
              className="flex items-center gap-2 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
            >
              <BookOpen className="h-4 w-4" />
              Restart Setup Guide
            </Button>
          </div>

          <Tabs defaultValue="configure" className={cn("w-full")}>
            <TabsList className={cn("grid w-full grid-cols-3 mb-8")}>
              <TabsTrigger
                value="configure"
                className={cn(
                  "text-lg font-semibold py-3 bg-blue-100 data-[state=active]:bg-blue-600 data-[state=active]:text-white",
                )}
              >
                Configure
              </TabsTrigger>
              <TabsTrigger
                value="benefits"
                className={cn(
                  "text-lg font-semibold py-3 bg-blue-100 data-[state=active]:bg-blue-600 data-[state=active]:text-white",
                )}
              >
                Key Benefits
              </TabsTrigger>
              <TabsTrigger
                value="how-it-works"
                className={cn(
                  "text-lg font-semibold py-3 bg-blue-100 data-[state=active]:bg-blue-600 data-[state=active]:text-white",
                )}
              >
                How It Works
              </TabsTrigger>
            </TabsList>

            <TabsContent value="configure">{configurationContent}</TabsContent>

            <TabsContent value="benefits">{benefitsContent}</TabsContent>

            <TabsContent value="how-it-works">{howItWorksContent}</TabsContent>
          </Tabs>
        </div>
      )}
    </motion.div>
  );
}

function ShopifyIntegrationStep(): JSX.Element {
  return (
    <div className={cn("space-y-6")}>
      <Card className={cn("border-2 border-blue-500")}>
        <CardHeader>
          <CardTitle className={cn("text-xl font-semibold flex items-center")}>
            <ShoppingBag className={cn("w-6 h-6 mr-2 text-blue-500")} />
            Shopify Integration
          </CardTitle>
        </CardHeader>
        <CardContent className={cn("space-y-4")}>
          <p className={cn("text-lg")}>
            Follow these steps to integrate Sovendus with your Shopify store:
          </p>

          <ol className={cn("list-decimal list-inside space-y-4")}>
            <li className={cn("p-2 bg-gray-50 rounded")}>
              <strong>Install the Sovendus App:</strong> Go to the Shopify App
              Store and search for "Sovendus Voucher Network and Checkout
              Benefits" or use the direct link provided by your Sovendus
              representative.
            </li>

            <li className={cn("p-2 bg-gray-50 rounded")}>
              <strong>Authorize the App:</strong> Click "Add app" and authorize
              it to access your Shopify store data.
            </li>

            <li className={cn("p-2 bg-gray-50 rounded")}>
              <strong>Configure Settings:</strong> Once installed, you'll be
              redirected to the app's configuration page where you can enter
              your Sovendus credentials.
            </li>

            <li className={cn("p-2 bg-gray-50 rounded")}>
              <strong>Customize Appearance:</strong> Adjust the appearance
              settings to match your store's design.
            </li>
          </ol>

          <Alert className={cn("bg-yellow-50 border-yellow-200")}>
            <AlertDescription className={cn("text-yellow-800")}>
              <strong>Note:</strong> You'll need the Traffic Source and Traffic
              Medium numbers provided by your Sovendus account manager to
              complete the configuration.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

function TestingStep(): JSX.Element {
  return (
    <div className={cn("space-y-6")}>
      <Card className={cn("border-2 border-blue-500")}>
        <CardHeader>
          <CardTitle className={cn("text-xl font-semibold flex items-center")}>
            <CheckCircle className={cn("w-6 h-6 mr-2 text-blue-500")} />
            Testing Your Integration
          </CardTitle>
        </CardHeader>
        <CardContent className={cn("space-y-4")}>
          <p className={cn("text-lg")}>
            To test the integration, ensure the following:
          </p>

          <ul className={cn("list-disc list-inside space-y-3")}>
            <li>
              The Shopify App (new version) is not yet recognized by the
              Self-Test Extension, so no data will be displayed there.
            </li>

            <li>
              Instead, verify that the Sovendus integration is visible on the
              "Thank You" page of your store.
            </li>

            <li>
              Ensure that the position of the Sovendus banner matches the
              position shown in the example image provided below.
            </li>
          </ul>

          <Alert className={cn("bg-green-50 border-green-200")}>
            <AlertDescription className={cn("text-green-800")}>
              <strong>Tip:</strong> Complete a test order in your store to
              verify the integration is working correctly on the order
              confirmation page.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className={cn("mt-6")}>
        <h3 className={cn("text-lg font-semibold mb-3")}>
          Example Image for Shopify App Integration
        </h3>
        <div className={cn("flex justify-center")}>
          <img
            src="https://raw.githubusercontent.com/Sovendus-GmbH/Sovendus-Voucher-Network-and-Checkout-Benefits-App-for-Shopify/main/Shopify-App.png"
            alt="Example Shopify Integration"
            className={cn(
              "max-w-full h-auto rounded-lg shadow-lg border-2 border-gray-200",
            )}
          />
        </div>
      </div>
    </div>
  );
}
