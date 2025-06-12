"use client";

import { useEffect, useState } from "react";
import type { CallBackProps, Step } from "react-joyride";
import Joyride, { STATUS } from "react-joyride";

import { loggerInfo } from "../../../package/utils";

interface EmployeeBenefitsTourProps {
  isEnabled?: boolean;
  onComplete?: () => void;
  onboardingState?: {
    finishedHomeTour?: boolean;
    finishedDashboardTour?: boolean;
    finishedSettingsTour?: boolean;
    finishedEmployeeBenefitsTour?: boolean;
  };
}

export function EmployeeBenefitsTour({
  isEnabled = true,
  onComplete,
  onboardingState,
}: EmployeeBenefitsTourProps) {
  const [run, setRun] = useState(false);

  // Steps focusing on the Employee Benefits feature
  const steps: Step[] = [
    {
      target: "body",
      content:
        "Let's explore Sovendus Employee Benefits - a valuable feature that enhances your team's experience.",
      placement: "center",
      disableBeacon: true,
      title: "Employee Benefits Tour",
    },
    {
      target:
        "h2:contains('Employee Benefits'), div:contains('Employee Benefits'):first",
      content:
        "Sovendus Employee Benefits provides your employees with exclusive discounts and offers from top brands at no cost to your organization.",
      placement: "bottom",
      title: "What Are Employee Benefits?",
    },
    {
      target: ".tw\\:benefits-settings, div:contains('Dashboard Widget')",
      content:
        "You can choose to display Employee Benefits on your dashboard or add them to the sidebar navigation for easy access.",
      placement: "bottom",
      title: "Display Options",
    },
    {
      target:
        "div:contains('Exclusive Discounts'), div:contains('Employee Satisfaction')",
      content:
        "Offering Employee Benefits can boost morale and retention with valuable perks at no cost to your business.",
      placement: "top",
      title: "Key Advantages",
    },
    {
      target: "div:contains('Global Availability')",
      content:
        "Employee Benefits are available in 14 countries, ensuring your international teams can access the same great benefits.",
      placement: "top",
      title: "Global Access",
    },
    {
      target: "button:contains('Configure'), a:contains('Configure')",
      content:
        "Click here to configure Employee Benefits for your team and start providing them with exclusive offers.",
      placement: "bottom",
      title: "Configuration",
    },
  ];

  // Start the tour as soon as the component mounts, if enabled
  useEffect(() => {
    if (isEnabled && !onboardingState?.finishedEmployeeBenefitsTour) {
      loggerInfo("Starting Employee Benefits feature tour");
      setRun(true);
    }
  }, [isEnabled, onboardingState]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index, step } = data;

    // Log important events
    if (status || type === "step:before" || type === "error") {
      loggerInfo("Employee Benefits tour callback", {
        status,
        type,
        index,
        step: step?.target,
      });
    }

    // Tour is finished or skipped
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      loggerInfo(
        `Employee Benefits tour ${status === STATUS.FINISHED ? "completed" : "skipped"}`,
      );
      setRun(false);
      if (onComplete) {
        onComplete();
      }
    }

    // Error handling for target not mounted
    if (type === "error") {
      // Try to continue to the next step
      const nextIndex = index + 1;
      if (nextIndex < steps.length) {
        data.tour?.goToStep(nextIndex);
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
      disableScrolling={false}
      styles={{
        options: {
          primaryColor: "#3B82F6", // Blue color for Employee Benefits
          zIndex: 10000,
          arrowColor: "#fff",
        },
        buttonBack: {
          marginRight: 10,
        },
        buttonNext: {
          backgroundColor: "#3B82F6",
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
