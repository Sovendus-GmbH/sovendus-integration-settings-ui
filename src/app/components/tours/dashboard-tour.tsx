"use client";

import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";
import type { CallBackProps, Status, Step } from "react-joyride";
import Joyride, { STATUS } from "react-joyride";

import { loggerError, loggerInfo } from "../../../package/utils";

interface DashboardTourProps {
  isEnabled?: boolean;
  onComplete?: () => void;
  onboardingState?: {
    finishedHomeTour?: boolean;
    finishedDashboardTour?: boolean;
    finishedSettingsTour?: boolean;
  };
}

export function DashboardTour({
  isEnabled = true,
  onComplete,
  onboardingState,
}: DashboardTourProps): JSX.Element | null {
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  // Use refs to track initialization state
  const initialized = useRef(false);
  const checkingElements = useRef(false);
  const [elementsReady, setElementsReady] = useState(false);

  // Check if the sidebar element is ready before starting the tour - only once
  useEffect(() => {
    // Skip if already initialized or not enabled
    if (initialized.current || !isEnabled || checkingElements.current) {
      return;
    }

    // Skip if tour already completed
    if (onboardingState?.finishedDashboardTour) {
      return;
    }

    initialized.current = true;
    checkingElements.current = true;
    loggerInfo("Initializing dashboard tour - one time setup");

    const checkForElements = () => {
      try {
        const sidebarElement = document.querySelector(
          ".tw\\:sidebar-sovendus-app",
        );

        if (sidebarElement) {
          loggerInfo("Dashboard tour elements found and ready");
          setElementsReady(true);
          checkingElements.current = false;
          return true; // Elements found
        } else {
          loggerInfo("Waiting for dashboard tour elements to load...");
          return false; // Still waiting for elements
        }
      } catch (error) {
        loggerError("Error checking for elements:", error);
        loggerInfo("Error checking for elements in dashboard tour", { error });
        return false;
      }
    };

    // Initial check
    if (!checkForElements()) {
      // Set up interval to check for elements
      const checkInterval = setInterval(() => {
        if (checkForElements()) {
          clearInterval(checkInterval);
        }
      }, 500);

      // Clean up interval after 10 seconds max (20 attempts)
      setTimeout(() => {
        if (checkingElements.current) {
          clearInterval(checkInterval);
          checkingElements.current = false;
          loggerInfo(
            "Dashboard tour elements check timed out after 10 seconds",
          );
        }
      }, 10000);
    }

    // Clean up function
    return (): void => {
      checkingElements.current = false;
    };
  }, [isEnabled, onboardingState?.finishedDashboardTour]);

  // Set up steps only once when elements are ready
  useEffect(() => {
    // Don't run if already finished or elements not ready
    if (onboardingState?.finishedDashboardTour || !elementsReady) {
      return;
    }

    // Set up steps only once
    if (steps.length > 0) {
      return;
    }

    loggerInfo("Setting up dashboard tour steps");
    const tourSteps: Step[] = [
      {
        target: "body", // Initial step targeting the whole page
        content:
          "This is a demo admin dashboard to showcase Sovendus integration features. In a real environment, this would be your shop's admin panel.",
        placement: "center",
        disableBeacon: true,
      },
      {
        target: ".tw\\:sidebar-sovendus-app", // Target the Sovendus App sidebar item
        content:
          "Click here to set up Sovendus features and enhance your store's revenue opportunities!",
        placement: "right",
      },
    ];

    setSteps(tourSteps);

    // Start tour only once when steps are set up and elements are ready
    if (isEnabled && elementsReady) {
      loggerInfo("Starting dashboard tour");
      setRun(true);
    }
  }, [
    elementsReady,
    isEnabled,
    onboardingState?.finishedDashboardTour,
    steps.length,
  ]);

  const handleJoyrideCallback = (data: CallBackProps): void => {
    const { status, type, index, action, step } = data;

    // Avoid excessive logging except for key events
    if (status || type === "step:before" || type === "error") {
      loggerInfo("Dashboard tour callback", {
        status,
        type,
        action,
        index,
        step: step?.target,
      });
    }

    // Tour is finished or skipped
    if (([STATUS.FINISHED, STATUS.SKIPPED] as Status[]).includes(status)) {
      loggerInfo(
        `Dashboard tour ${status === STATUS.FINISHED ? "completed" : "skipped"}`,
      );
      setRun(false);
      if (onComplete) {
        onComplete();
      }
    }

    // If last step reached (Sovendus App settings), we'll redirect programmatically
    if (type === "step:after" && index === steps.length - 1) {
      // Allow some time for the user to see the highlight before redirecting
      loggerInfo("Redirecting to settings page after dashboard tour");
      setTimeout(() => {
        window.location.href = `${window.location.pathname.replace(/\/$/, "")}/settings`;
      }, 1000);
    }

    // Error handling - if target not found, try to continue
    if (type === "error" && action === "start") {
      loggerInfo(`Error with step ${index}, trying to continue...`, {
        error: "Target not found",
      });
      // Skip to next step that hopefully has a valid target
      const nextIndex = index + 1;
      if (nextIndex < steps.length) {
        data.tour?.goToStep(nextIndex);
      }
    }
  };

  // Don't render anything until elements are ready
  if (!elementsReady) {
    return null;
  }

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      locale={{
        last: "Setup Sovendus",
        next: "Next",
        skip: "Skip",
        back: "Back",
      }}
      steps={steps}
      styles={{
        options: {
          primaryColor: "#6366F1", // Match your primary color
          zIndex: 10000,
        },
        buttonBack: {
          marginRight: 10,
        },
      }}
    />
  );
}
