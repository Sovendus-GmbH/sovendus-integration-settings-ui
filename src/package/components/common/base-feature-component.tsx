import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { JSX, ReactNode } from "react";
import React from "react";

import { cn } from "../../utils";
import { Alert, AlertDescription } from "../shadcn/alert";
import { Button } from "../shadcn/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shadcn/tabs";
import { DEMO_REQUEST_URL } from "../ui/backend-form";

interface BaseFeatureComponentProps {
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  mainColor: string;
  alertMessage?: ReactNode;
  configureContent: ReactNode;
  benefitsContent: ReactNode;
  howItWorksContent: ReactNode;
  buttonLabel?: string;
  defaultTab?: "configure" | "benefits" | "how-it-works";
}

// Utility function to map mainColor to Tailwind classes
const colorClasses = {
  green: {
    text: "tw:text-green-700",
    hoverBg: "hover:tw:bg-green-50",
    activeBg: "tw:data-[state=active]:bg-green-600",
  },
  blue: {
    text: "tw:text-blue-700",
    hoverBg: "hover:tw:bg-blue-50",
    activeBg: "tw:data-[state=active]:bg-blue-600",
  },
  purple: {
    text: "tw:text-purple-700",
    hoverBg: "hover:tw:bg-purple-50",
    activeBg: "tw:data-[state=active]:bg-purple-600",
  },
  teal: {
    text: "tw:text-teal-700",
    hoverBg: "hover:tw:bg-teal-50",
    activeBg: "tw:data-[state=active]:bg-teal-600",
  },
  default: {
    text: "tw:text-blue-700",
    hoverBg: "hover:tw:bg-blue-50",
    activeBg: "tw:data-[state=active]:bg-blue-600",
  },
};

export function BaseFeatureComponent({
  title,
  description,
  gradientFrom: _gradientFrom,
  gradientTo: _gradientTo,
  mainColor,
  alertMessage,
  configureContent,
  benefitsContent,
  howItWorksContent,
  buttonLabel = "Schedule Your Personalized Demo",
  defaultTab = "configure",
}: BaseFeatureComponentProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn("tw:space-y-6 tw:pb-8")}
    >
      {/* Header with gradient background */}
      <div
        className={cn(
          `tw:text-white tw:p-8 tw:rounded-lg tw:shadow-lg`,
          `tw:relative tw:overflow-hidden`,
        )}
        style={{
          background:
            mainColor === "green"
              ? "linear-gradient(to right, #16a34a, #059669)"
              : mainColor === "blue"
                ? "linear-gradient(to right, #2563eb, #4f46e5)"
                : mainColor === "purple"
                  ? "linear-gradient(to right, #9333ea, #7c3aed)"
                  : mainColor === "teal"
                    ? "linear-gradient(to right, #0d9488, #0891b2)"
                    : "linear-gradient(to right, #3b82f6, #6366f1)",
        }}
      >
        <div className={cn("tw:text-3xl tw:font-bold tw:mb-4 tw:text-white")}>
          {title}
        </div>
        <p className={cn("tw:text-xl tw:mb-6")}>{description}</p>
        <Button
          size="lg"
          onClick={(): void => void window.open(DEMO_REQUEST_URL, "_blank")}
          className={cn(
            `tw:bg-white ${colorClasses[mainColor]?.text || colorClasses.default.text} hover:tw:bg-${mainColor}-50 tw:font-bold tw:border-2 tw:border-white tw:shadow-md tw:transition-all tw:duration-300`,
          )}
        >
          {buttonLabel}
          <ExternalLink
            className={cn(
              `tw:ml-2 tw:h-4 tw:w-4 ${colorClasses[mainColor]?.text || colorClasses.default.text}`,
            )}
          />
        </Button>
      </div>

      {/* Alert message */}
      {alertMessage && (
        <Alert
          className={cn(
            `tw:mb-4 tw:bg-${mainColor}-100 tw:border-${mainColor}-300 tw:border-2`,
          )}
        >
          <AlertDescription
            className={cn(`tw:text-${mainColor}-900 tw:font-bold`)}
          >
            {alertMessage}
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs defaultValue={defaultTab} className={cn("tw:w-full tw:mt-10")}>
        <TabsList
          className={cn(
            "tw:grid tw:w-full tw:grid-cols-3 tw:mb-8 tw:gap-1 tw:p-1 tw:bg-gray-100 tw:rounded-lg tw:mt-2",
          )}
        >
          <TabsTrigger
            value="configure"
            className={cn(
              "tw:text-lg tw:font-semibold tw:py-3 tw:rounded-md tw:transition-all tw:duration-200",
              "tw:bg-white",
              colorClasses[mainColor]?.text || colorClasses.default.text,
              colorClasses[mainColor]?.hoverBg || colorClasses.default.hoverBg,
              colorClasses[mainColor]?.activeBg ||
                colorClasses.default.activeBg,
              "tw:data-[state=active]:text-white tw:data-[state=active]:shadow-md",
            )}
          >
            Configure
          </TabsTrigger>
          <TabsTrigger
            value="benefits"
            className={cn(
              "tw:text-lg tw:font-semibold tw:py-3 tw:rounded-md tw:transition-all tw:duration-200",
              "tw:bg-white",
              colorClasses[mainColor]?.text || colorClasses.default.text,
              colorClasses[mainColor]?.hoverBg || colorClasses.default.hoverBg,
              colorClasses[mainColor]?.activeBg ||
                colorClasses.default.activeBg,
              "tw:data-[state=active]:text-white tw:data-[state=active]:shadow-md",
            )}
          >
            Key Benefits
          </TabsTrigger>
          <TabsTrigger
            value="how-it-works"
            className={cn(
              "tw:text-lg tw:font-semibold tw:py-3 tw:rounded-md tw:transition-all tw:duration-200",
              "tw:bg-white",
              colorClasses[mainColor]?.text || colorClasses.default.text,
              colorClasses[mainColor]?.hoverBg || colorClasses.default.hoverBg,
              colorClasses[mainColor]?.activeBg ||
                colorClasses.default.activeBg,
              "tw:data-[state=active]:text-white tw:data-[state=active]:shadow-md",
            )}
          >
            How It Works
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="configure"
          className={cn("tw:bg-white tw:rounded-lg")}
        >
          {configureContent}
        </TabsContent>
        <TabsContent
          value="benefits"
          className={cn("tw:bg-white tw:rounded-lg")}
        >
          {benefitsContent}
        </TabsContent>
        <TabsContent
          value="how-it-works"
          className={cn("tw:bg-white tw:rounded-lg")}
        >
          {howItWorksContent}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
