import { ArrowLeft, ArrowRight, CheckCircle, ShoppingBag } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { type JSX, useEffect, useMemo, useState } from "react";

import { cn } from "../utils/utils";
import { ConfigurationDialog } from "./configuration-dialog";
import { Alert, AlertDescription } from "./shadcn/alert";
import { Button } from "./shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "./shadcn/card";
import { Progress } from "./shadcn/progress";

interface TestingStepsProps {
  type: "Voucher Network" | "Optimize" | "Checkout Products";
  open: boolean;
  setActiveDialog: Dispatch<
    SetStateAction<
      | "voucherNetwork"
      | "optimize"
      | "checkoutProducts"
      | "TestingSteps"
      | "contactForm"
      | null
    >
  >;
}

export function TestingStepsDialog({
  type,
  open,
  setActiveDialog,
}: TestingStepsProps): JSX.Element {
  function onOpenChange(open: boolean): void {
    setActiveDialog(open ? "TestingSteps" : null);
  }
  const [setupGuideCompleted, setSetupGuideCompleted] = useState<boolean>();
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

  //   const configurationContent = (
  //     <div className={cn("tw:space-y-6")}>
  //       <Alert
  //         className={cn(
  //           `${vnEnabled ? "tw:bg-green-50 tw:border-green-200" : "tw:bg-red-50 tw:border-red-200"} tw:mt-2`,
  //         )}
  //       >
  //         <AlertDescription
  //           className={cn(vnEnabled ? "tw:text-green-700" : "tw:text-red-700")}
  //         >
  //           <EnabledVoucherNetworkCountries currentSettings={currentSettings} />
  //         </AlertDescription>
  //       </Alert>

  //       {additionalSteps && (
  //         <Card className={cn("tw:border-2 tw:border-blue-500")}>
  //           <CardHeader>
  //             <CardTitle
  //               className={cn("tw:text-xl tw:font-semibold tw:flex tw:items-center")}
  //             >
  //               <CheckCircle className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-blue-500")} />
  //               Additional Setup Steps
  //             </CardTitle>
  //           </CardHeader>
  //           <CardContent>
  //             <h4 className={cn("tw:font-semibold tw:mb-2")}>
  //               {additionalSteps.title}
  //             </h4>
  //             <ol className={cn("tw:list-decimal tw:list-inside tw:space-y-2")}>
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
  //           className={cn("tw:border-2 tw:border-blue-500 tw:rounded-lg tw:overflow-hidden")}
  //         >
  //           <AccordionTrigger
  //             className={cn("tw:bg-blue-50 tw:p-4 tw:text-xl tw:font-semibold")}
  //           >
  //             <div className={cn("tw:flex tw:items-center")}>
  //               <Cog className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-blue-500")} />
  //               Configure Voucher Network & Checkout Benefits
  //             </div>
  //           </AccordionTrigger>
  //           <AccordionContent className={cn("tw:p-4 tw:bg-white")}>
  //             <p className={cn("tw:mb-4 tw:text-lg")}>
  //               Maximize your revenue potential by setting up Voucher Network and
  //               Checkout Benefits for multiple countries and languages. This
  //               configuration applies to both products, unlocking new markets and
  //               opportunities for growth.
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
  //   );

  const setupGuideContent = (
    <div className={cn("tw:space-y-6")}>
      {/* Progress indicator */}
      <div className={cn("tw:mb-6 tw:space-y-2")}>
        <div className={cn("tw:flex tw:justify-between tw:text-sm")}>
          <span>Setup Progress</span>
          <span>{Math.round(totalProgress)}% Complete</span>
        </div>
        <Progress value={totalProgress} className={cn("tw:h-2")} />
      </div>

      {/* Step indicators */}
      <div className={cn("tw:grid tw:grid-cols-3 tw:gap-4 tw:mb-8")}>
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            onClick={(): void => handleStepClick(step)}
            className={cn(
              "tw:relative tw:flex tw:flex-col tw:items-center tw:p-4 tw:rounded-lg tw:cursor-pointer tw:transition-all",
              currentStep === step
                ? "tw:bg-blue-50 tw:border-2 tw:border-blue-500"
                : steps[step].completed
                  ? "tw:bg-green-50 tw:border-2 tw:border-green-500"
                  : "tw:bg-gray-50 tw:border-2 tw:border-gray-200",
              "tw:hover:border-blue-300",
            )}
          >
            <div
              className={cn(
                "tw:w-8 tw:h-8 tw:rounded-full tw:flex tw:items-center tw:justify-center tw:mb-2",
                currentStep === step
                  ? "tw:bg-blue-500 tw:text-white"
                  : steps[step].completed
                    ? "tw:bg-green-500 tw:text-white"
                    : "tw:bg-gray-200 tw:text-gray-600",
              )}
            >
              {steps[step].completed ? (
                <CheckCircle className={cn("tw:h-5 tw:w-5")} />
              ) : (
                step
              )}
            </div>
            <span
              className={cn(
                "tw:text-sm tw:font-medium tw:text-center",
                currentStep === step
                  ? "tw:text-blue-700"
                  : steps[step].completed
                    ? "tw:text-green-700"
                    : "tw:text-gray-600",
              )}
            >
              {step === 1
                ? "Shopify Integration"
                : step === 2
                  ? "Configure"
                  : "Testing"}
            </span>
            {steps[step].viewed && !steps[step].completed && (
              <span className={cn("tw:text-xs tw:text-blue-600 tw:mt-1")}>
                In Progress
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className={cn("tw:mt-8")} id="step-content">
        {currentStep === 1 && <ShopifyIntegrationStep />}
        {currentStep === 2 && <div className={cn("tw:space-y-6")}>Config</div>}
        {currentStep === 3 && <TestingStep />}
      </div>

      {/* Navigation buttons */}
      <div
        className={cn("tw:flex tw:justify-between tw:mt-6 tw:pt-4 tw:border-t")}
      >
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={currentStep === 1}
          className={cn("tw:gap-2")}
        >
          <ArrowLeft className={cn("tw:h-4 tw:w-4")} />
          Previous
        </Button>

        <Button
          onClick={goToNextStep}
          className={cn(
            "tw:gap-2",
            currentStep === 3 && steps[3]?.completed ? "tw:bg-green-600" : "",
          )}
        >
          {currentStep === 3 ? "Complete Setup" : "Next"}
          {currentStep < 3 && <ArrowRight className={cn("tw:h-4 tw:w-4")} />}
        </Button>
      </div>
    </div>
  );

  return (
    <ConfigurationDialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Testing Steps - ${type}`}
      zoomedVersion={false}
    >
      {setupGuideContent}
    </ConfigurationDialog>
  );
}

// export function TestingSteps({
//   type,
//   open,
//   setActiveDialog,
// }: TestingStepsProps): JSX.Element {

//   return (
//     <div className={cn("space-y-6")}>
//       <Card className={cn("border-2 border-blue-500")}>
//         <CardHeader>
//           <CardTitle className={cn("text-xl font-semibold flex items-center")}>
//             <CheckCircle className={cn("w-6 h-6 mr-2 text-blue-500")} />
//             Testing Your Integration
//           </CardTitle>
//         </CardHeader>
//         <CardContent className={cn("space-y-4")}>
//           <p className={cn("text-lg")}>
//             To test the integration, ensure the following:
//           </p>

//           <ul className={cn("list-disc list-inside space-y-3")}>
//             <li>
//               The Shopify App (new version) is not yet recognized by the
//               Self-Test Extension, so no data will be displayed there.
//             </li>

//             <li>
//               Instead, verify that the Sovendus integration is visible on the
//               "Thank You" page of your store.
//             </li>

//             <li>
//               Ensure that the position of the Sovendus banner matches the
//               position shown in the example image provided below.
//             </li>
//           </ul>

//           <Alert className={cn("bg-green-50 border-green-200")}>
//             <AlertDescription className={cn("text-green-800")}>
//               <strong>Tip:</strong> Complete a test order in your store to
//               verify the integration is working correctly on the order
//               confirmation page.
//             </AlertDescription>
//           </Alert>
//         </CardContent>
//       </Card>

//       <div className={cn("mt-6")}>
//         <h3 className={cn("text-lg font-semibold mb-3")}>
//           Example Image for Shopify App Integration
//         </h3>
//         <div className={cn("flex justify-center")}>
//           <img
//             src="https://raw.githubusercontent.com/Sovendus-GmbH/Sovendus-Voucher-Network-and-Checkout-Benefits-App-for-Shopify/main/Shopify-App.png"
//             alt="Example Shopify Integration"
//             className={cn(
//               "max-w-full h-auto rounded-lg shadow-lg border-2 border-gray-200",
//             )}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

export function ShopifyIntegrationStep(): JSX.Element {
  return (
    <div className={cn("tw:space-y-6")}>
      <Card className={cn("tw:border-2 tw:border-blue-500")}>
        <CardHeader>
          <CardTitle
            className={cn(
              "tw:text-xl tw:font-semibold tw:flex tw:items-center",
            )}
          >
            <ShoppingBag
              className={cn("tw:w-6 tw:h-6 tw:mr-2 tw:text-blue-500")}
            />
            Shopify Integration
          </CardTitle>
        </CardHeader>
        <CardContent className={cn("tw:space-y-4")}>
          <p className={cn("tw:text-lg")}>
            Follow these steps to integrate Sovendus with your Shopify store:
          </p>

          <ol className={cn("tw:list-decimal tw:list-inside tw:space-y-4")}>
            <li className={cn("tw:p-2 tw:bg-gray-50 tw:rounded")}>
              <strong>Install the Sovendus App:</strong> Go to the Shopify App
              Store and search for "Sovendus Voucher Network and Checkout
              Benefits" or use the direct link provided by your Sovendus
              representative.
            </li>

            <li className={cn("tw:p-2 tw:bg-gray-50 tw:rounded")}>
              <strong>Authorize the App:</strong> Click "Add app" and authorize
              it to access your Shopify store data.
            </li>

            <li className={cn("tw:p-2 tw:bg-gray-50 tw:rounded")}>
              <strong>Configure Settings:</strong> Once installed, you'll be
              redirected to the app's configuration page where you can enter
              your Sovendus credentials.
            </li>

            <li className={cn("tw:p-2 tw:bg-gray-50 tw:rounded")}>
              <strong>Customize Appearance:</strong> Adjust the appearance
              settings to match your store's design.
            </li>
          </ol>

          <Alert className={cn("tw:bg-yellow-50 tw:border-yellow-200")}>
            <AlertDescription className={cn("tw:text-yellow-800")}>
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
    <div className={cn("tw:space-y-6")}>
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
            Testing Your Integration
          </CardTitle>
        </CardHeader>
        <CardContent className={cn("tw:space-y-4")}>
          <p className={cn("tw:text-lg")}>
            To test the integration, ensure the following:
          </p>

          <ul className={cn("tw:list-disc tw:list-inside tw:space-y-3")}>
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

          <Alert className={cn("tw:bg-green-50 tw:border-green-200")}>
            <AlertDescription className={cn("tw:text-green-800")}>
              <strong>Tip:</strong> Complete a test order in your store to
              verify the integration is working correctly on the order
              confirmation page.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className={cn("tw:mt-6")}>
        <h3 className={cn("tw:text-lg tw:font-semibold tw:mb-3")}>
          Example Image for Shopify App Integration
        </h3>
        <div className={cn("tw:flex tw:justify-center")}>
          <img
            src="https://raw.githubusercontent.com/Sovendus-GmbH/Sovendus-Voucher-Network-and-Checkout-Benefits-App-for-Shopify/main/Shopify-App.png"
            alt="Example Shopify Integration"
            className={cn(
              "tw:max-w-full tw:h-auto tw:rounded-lg tw:shadow-lg tw:border-2 tw:border-gray-200",
            )}
          />
        </div>
      </div>
    </div>
  );
}
