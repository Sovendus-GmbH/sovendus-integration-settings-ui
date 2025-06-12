"use client";

import { useEffect, useRef, useState } from "react";
import type { CallBackProps, Step } from "react-joyride";
import Joyride, { STATUS } from "react-joyride";

import { loggerInfo } from "../../../package/utils";

interface OptimizeTourProps {
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

export function OptimizeTour({
  isEnabled = true,
  onComplete,
  onboardingState,
}: OptimizeTourProps) {
  const [run, setRun] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const configOpened = useRef(false);
  const countryOptionsOpened = useRef(false);

  // Steps focusing on the Optimize feature
  const steps: Step[] = [
    {
      target: "body",
      content:
        "Let's explore Sovendus Optimize - a powerful feature that can boost your store's conversion rates.",
      placement: "center",
      disableBeacon: true,
      title: "Optimize Feature Tour",
    },
    {
      target: "h2:contains('Optimize'), div:contains('Optimize')",
      content:
        "Sovendus Optimize helps you boost conversions with intelligent on-site optimization techniques.",
      placement: "bottom",
      title: "Conversion Optimization",
      spotlightClicks: true,
    },
    {
      target: "div:contains('Conversion Boost'), div:contains('10%')",
      content:
        "With Sovendus Optimize, you can achieve up to 10% conversion boost by intelligently presenting offers to visitors.",
      placement: "bottom",
      title: "Conversion Boost",
    },
    {
      target: "div:contains('Bounce Rate Reduction'), div:contains('5%')",
      content:
        "Optimize can help reduce bounce rates by up to 5% by engaging visitors with personalized content.",
      placement: "bottom",
      title: "Reduced Bounce Rates",
    },
    {
      target: "div:contains('Newsletter Sign-up Boost'), div:contains('15%')",
      content:
        "Increase newsletter sign-ups by up to 15% with targeted opt-in prompts and incentives.",
      placement: "bottom",
      title: "Newsletter Growth",
    },
    {
      target: "button:contains('Configure'), a:contains('Configure')",
      content:
        "Click here to configure Sovendus Optimize for your store and start boosting conversions.",
      placement: "bottom",
      title: "Configuration",
      spotlightClicks: true,
    },
    {
      target: "div:contains('Current Configuration')",
      content:
        "This section shows your current Optimize configuration. You'll need to enable it for specific countries to start seeing results.",
      placement: "top",
      title: "Current Settings",
    },
    {
      target:
        "button:contains('Add Country'), button:contains('Select Country')",
      content:
        "Click here to add countries where you want to enable the Optimize feature.",
      placement: "bottom",
      title: "Country Selection",
      spotlightClicks: true,
    },
    {
      target: "[role=dialog], [class*=dialog], [class*=modal]",
      content:
        "Select the countries where you want to activate Optimize, and configure specific settings for each country.",
      placement: "center",
      title: "Country Configuration",
    },
    {
      target: "body",
      content:
        "You've now explored the Optimize feature and learned how to configure it for your store. Click Finish to complete this tour!",
      placement: "center",
      title: "Tour Complete",
    },
  ];

  // Helper function to open the Configure overlay
  const openConfigureOverlay = () => {
    if (configOpened.current) {
      return;
    }

    loggerInfo("Attempting to open Optimize configure overlay");
    configOpened.current = true;

    setTimeout(() => {
      try {
        const configButton = document.querySelector(
          "h2:contains('Optimize') + div button:contains('Configure'), div:contains('Optimize') button:contains('Configure')",
        ) as HTMLElement;
        if (configButton) {
          loggerInfo("Found and clicking Optimize Configure button");
          configButton.click();
        } else {
          loggerInfo("Could not find Optimize Configure button");
        }
      } catch (err) {
        loggerInfo("Error opening Optimize configure overlay", { error: err });
      }
    }, 500);
  };

  // Helper function to open country selection dialog
  const openCountrySelection = () => {
    if (countryOptionsOpened.current) {
      return;
    }

    loggerInfo("Attempting to open country selection dialog");
    countryOptionsOpened.current = true;

    setTimeout(() => {
      try {
        const addCountryButton = document.querySelector(
          "button:contains('Add Country'), button:contains('Select Country')",
        ) as HTMLElement;
        if (addCountryButton) {
          loggerInfo("Found and clicking Add Country button");
          addCountryButton.click();
        } else {
          loggerInfo("Could not find Add Country button");
        }
      } catch (err) {
        loggerInfo("Error opening country selection dialog", { error: err });
      }
    }, 500);
  };

  // Start the tour as soon as the component mounts, if enabled
  useEffect(() => {
    if (isEnabled && !onboardingState?.finishedOptimizeTour) {
      loggerInfo("Starting Optimize feature tour");
      setRun(true);
    }
  }, [isEnabled, onboardingState]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index, action } = data;

    // Log important events
    if (status || type === "step:before" || type === "error") {
      loggerInfo("Optimize tour callback", { status, type, index, action });
    }

    // Update current step
    if (type === "step:after") {
      setCurrentStep(index + 1);
    }

    // Handle steps that require opening overlays
    if (type === "step:before") {
      // At the Configure step, open the configure overlay
      if (index === 5) {
        openConfigureOverlay();
      }
      // At the country selection step, open the dialog
      else if (index === 7) {
        openCountrySelection();
      }
    }

    // Tour is finished or skipped
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      loggerInfo(
        `Optimize tour ${status === STATUS.FINISHED ? "completed" : "skipped"}`,
      );
      setRun(false);
      if (onComplete) {
        onComplete();
      }
    }

    // Error handling for target not mounted
    if (type === "error") {
      loggerInfo(`Error in tour at step ${index}`, { action });
      // Try to continue to the next step
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
