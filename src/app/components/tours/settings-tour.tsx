"use client";

import { useEffect, useRef, useState } from "react";
import type { CallBackProps, Step } from "react-joyride";
import Joyride, { STATUS } from "react-joyride";

import { loggerInfo } from "../../../package/utils";

interface SettingsTourProps {
  isEnabled?: boolean;
  onComplete?: () => void;
  onboardingState?: {
    finishedHomeTour?: boolean;
    finishedDashboardTour?: boolean;
    finishedSettingsTour?: boolean;
    finishedOptimizeTour?: boolean;
    finishedEmployeeBenefitsTour?: boolean;
  };
}

// Helper function to check if an element is visible
const isElementVisible = (element: Element): boolean => {
  if (!element) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  const isVisible = !!(
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );

  // Check for CSS visibility
  const computedStyle = window.getComputedStyle(element);
  const isStyleVisible =
    computedStyle.display !== "none" &&
    computedStyle.visibility !== "hidden" &&
    computedStyle.opacity !== "0";

  return isVisible && isStyleVisible;
};

// Find a visible element from multiple selectors
const findVisibleElement = (selectors: string[]): Element | null => {
  for (const selector of selectors) {
    try {
      const elements = document.querySelectorAll(selector);
      for (const element of elements) {
        if (isElementVisible(element)) {
          loggerInfo(`Found visible element using selector: ${selector}`);
          return element;
        }
      }
    } catch (e) {
      loggerInfo(`Error with selector ${selector}`, { error: e });
    }
  }
  return null;
};

export function SettingsTour({
  isEnabled = true,
  onComplete,
  onboardingState,
}: SettingsTourProps) {
  const [run, setRun] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<Step[]>([]);

  // Use ref to track if we've opened any UI elements
  const overlaysOpened = useRef({
    voucherNetwork: false,
    rewards: false,
    employeeBenefits: false,
    optimization: false,
  });

  // Helper function to open overlay/feature details
  const openFeatureOverlay = (featureName: string, stepIndex: number) => {
    // Only try to open if we haven't opened it before
    if (overlaysOpened.current[featureName]) {
      return;
    }

    loggerInfo(
      `Attempting to open ${featureName} overlay for tour step ${stepIndex}`,
    );
    overlaysOpened.current[featureName] = true;

    // Find and click the appropriate element to open the overlay
    setTimeout(() => {
      let selectors: string[] = [];

      switch (featureName) {
        case "voucherNetwork":
          selectors = [
            "button:contains('Configure'):first-of-type",
            "[data-feature='voucher-network'] button",
            "h2:contains('Voucher Network') + div button",
          ];
          break;
        case "rewards":
          selectors = [
            "button:contains('Configure'):nth-of-type(2)",
            "[data-feature='rewards'] button",
            "h2:contains('Rewards') + div button",
          ];
          break;
        case "employeeBenefits":
          selectors = [
            "button:contains('Configure'):nth-of-type(3)",
            "[data-feature='employee-benefits'] button",
            "h2:contains('Employee Benefits') + div button",
          ];
          break;
        case "optimization":
          selectors = [
            "button:contains('Configure'):nth-of-type(4)",
            "[data-feature='optimize'] button",
            "h2:contains('Optimize') + div button",
          ];
          break;
      }

      try {
        const element = findVisibleElement(selectors) as HTMLElement;
        if (element) {
          loggerInfo(
            `Found and clicking ${featureName} element to open overlay`,
          );
          element.click();
        } else {
          loggerInfo(
            `Could not find visible element to open ${featureName} overlay`,
          );
        }
      } catch (err) {
        loggerInfo(`Error opening ${featureName} overlay`, { error: err });
      }
    }, 500);
  };

  // Dynamic step creation based on what's visible in the DOM
  useEffect(() => {
    // Don't run if already finished
    if (onboardingState?.finishedSettingsTour || !isEnabled) {
      return;
    }

    // Allow time for all components to render
    setTimeout(() => {
      loggerInfo("Checking for visible elements to create tour steps");

      const baseSteps: Step[] = [
        {
          target: "body",
          content:
            "Welcome to Sovendus App Settings! Let's explore all the features available to boost your store's performance.",
          placement: "center",
          disableBeacon: true,
          title: "Sovendus App Settings Tour",
        },
      ];

      // Function to add steps if elements are visible
      const addStepIfElementVisible = (
        selectors: string[],
        content: string,
        placement: "top" | "bottom" | "left" | "right",
        title: string,
        spotlightClicks = false,
      ): boolean => {
        const element = findVisibleElement(selectors);
        if (element) {
          baseSteps.push({
            target: selectors[0], // Use the first selector as the target
            content,
            placement,
            title,
            spotlightClicks,
          });
          return true;
        }
        return false;
      };

      // Add steps for visible elements
      addStepIfElementVisible(
        ["h1", ".tw\\:text-3xl", "[class*='text-3xl']", ".page-title"],
        "The Sovendus App provides multiple revenue-generating and customer engagement features for your store.",
        "bottom",
        "Sovendus Integration",
      );

      addStepIfElementVisible(
        [
          "h2:contains('Voucher Network')",
          "[class*='feature-title']:contains('Voucher Network')",
          "[data-feature='voucher-network']",
        ],
        "The Voucher Network allows you to monetize your checkout page by displaying relevant voucher offers to your customers.",
        "bottom",
        "Voucher Network & Checkout Benefits",
        true,
      );

      addStepIfElementVisible(
        [
          "[class*='rewards-settings']",
          "h2:contains('Rewards')",
          "[class*='feature-title']:contains('Rewards')",
          "[data-feature='rewards']",
        ],
        "Sovendus Rewards enhances customer loyalty by offering personalized rewards in your customer account area.",
        "bottom",
        "Sovendus Rewards",
        true,
      );

      addStepIfElementVisible(
        [
          "[class*='benefits-settings']",
          "h2:contains('Employee Benefits')",
          "[class*='feature-title']:contains('Employee Benefits')",
          "[data-feature='employee-benefits']",
        ],
        "Employee Benefits provides exclusive discounts for your team members at no cost to your organization.",
        "bottom",
        "Employee Benefits",
        true,
      );

      addStepIfElementVisible(
        [
          "h2:contains('Optimize')",
          "[class*='feature-title']:contains('Optimize')",
          "[data-feature='optimize']",
        ],
        "Sovendus Optimize helps increase your conversions with intelligent on-site optimization techniques.",
        "bottom",
        "Optimization Features",
        true,
      );

      // Add final step
      baseSteps.push({
        target: "body",
        content:
          "Now you've explored all features of the Sovendus App. Click Finish to complete the tour and start configuring your integration!",
        placement: "center",
        title: "Tour Complete",
      });

      setSteps(baseSteps);
      loggerInfo(
        `Created ${baseSteps.length} tour steps based on visible elements`,
      );

      // Start the tour after steps are set
      setRun(true);
    }, 1000);
  }, [isEnabled, onboardingState]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index, action, step } = data;

    // Log all callbacks for better debugging
    loggerInfo("Settings tour callback", {
      status,
      type,
      index,
      action,
      step: step?.target,
    });

    // Update current step
    if (type === "step:after") {
      setCurrentStep(index + 1);
    }

    // Handle specific steps that require opening overlays or UI elements
    if (type === "step:before") {
      if (index >= 2 && index <= 5) {
        // Try to determine which feature we're looking at
        const targetStr = String(step?.target || "");

        if (targetStr.includes("Voucher") || targetStr.includes("voucher")) {
          openFeatureOverlay("voucherNetwork", index);
        } else if (
          targetStr.includes("Rewards") ||
          targetStr.includes("rewards")
        ) {
          openFeatureOverlay("rewards", index);
        } else if (
          targetStr.includes("Benefits") ||
          targetStr.includes("benefits")
        ) {
          openFeatureOverlay("employeeBenefits", index);
        } else if (
          targetStr.includes("Optimize") ||
          targetStr.includes("optimize")
        ) {
          openFeatureOverlay("optimization", index);
        }
      }
    }

    // Tour is finished or skipped
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      loggerInfo(
        `Settings tour ${status === STATUS.FINISHED ? "completed" : "skipped"}`,
      );
      setRun(false);
      if (onComplete) {
        onComplete();
      }
    }

    // Error handling - try to proceed to next step or scroll to element
    if (type === "error") {
      loggerInfo(`Error in tour at step ${index}: ${action}`, {
        target: step?.target,
      });

      // First, try scrolling to the element
      if (step?.target && typeof step.target === "string") {
        try {
          const el = document.querySelector(step.target);
          if (el) {
            loggerInfo("Found target element, scrolling into view");
            el.scrollIntoView({ behavior: "smooth", block: "center" });

            // Give time for scrolling before retrying
            setTimeout(() => {
              data.tour?.update({ step: index });
            }, 500);
            return;
          }
        } catch (err) {
          loggerInfo("Error trying to scroll to element", { error: err });
        }
      }

      // If scrolling fails, move to next step
      if (index < steps.length - 1) {
        data.tour?.goToStep(index + 1);
      } else if (onComplete) {
        onComplete();
      }
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      run={run}
      showProgress
      showSkipButton
      steps={steps}
      stepIndex={currentStep}
      disableScrolling={false}
      scrollToFirstStep
      scrollOffset={100}
      styles={{
        options: {
          primaryColor: "#6366F1",
          zIndex: 10000,
          arrowColor: "#fff",
        },
        buttonBack: {
          marginRight: 10,
        },
        buttonNext: {
          backgroundColor: "#6366F1",
        },
        spotlight: {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
        tooltip: {
          padding: 15,
          fontSize: "15px",
          backgroundColor: "#fff",
          borderRadius: "6px",
        },
        tooltipTitle: {
          fontSize: "16px",
          fontWeight: "bold",
          margin: "0 0 10px 0",
        },
      }}
      locale={{
        back: "Back",
        close: "Close",
        last: "Finish",
        next: "Next",
        skip: "Skip",
      }}
    />
  );
}
