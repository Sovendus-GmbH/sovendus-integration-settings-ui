import { ChevronRight, ExternalLink } from "lucide-react";
import type { JSX } from "react";
import React from "react";

import { cn } from "../utils/utils";
import { Badge } from "./shadcn/badge";
import { Button } from "./shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "./shadcn/card";

interface ProductCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: {
    active: boolean;
    details: React.ReactNode;
  };
  metrics: {
    label: string;
    value: string;
  }[];
  onConfigure: () => void;
  requestDemoHref: string;
  buttonsDisabled: boolean;
}

export function ProductCard({
  title,
  description,
  icon,
  status,
  metrics,
  onConfigure,
  requestDemoHref,
  buttonsDisabled,
}: ProductCardProps): JSX.Element {
  return (
    <Card className={cn("tw:w-full")}>
      <CardHeader className={cn("tw:border-b")}>
        <div className={cn("tw:flex tw:items-start tw:justify-between")}>
          <div className={cn("tw:space-y-1")}>
            <CardTitle className={cn("tw:flex tw:items-center tw:text-2xl")}>
              {icon}
              <span className={cn("tw:ml-2")}>{title}</span>
            </CardTitle>
            <p
              className={cn("tw:text-sm tw:text-muted-foreground tw:max-w-2xl")}
            >
              {description}
            </p>
          </div>
          <Badge
            variant={status.active ? "default" : "secondary"}
            className={cn(
              "tw:ml-4",
              status.active
                ? "tw:bg-green-100 tw:text-green-800 tw:hover:bg-green-100"
                : "tw:bg-gray-100 tw:text-gray-800 tw:hover:bg-gray-100",
            )}
          >
            {status.active ? "Active" : "Not Active"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className={cn("tw:pt-6")}>
        <div
          className={cn(
            "tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-4",
          )}
        >
          <div className={cn("tw:flex tw:flex-wrap tw:gap-8")}>
            {metrics.map((metric, index) => (
              <div key={index} className={cn("tw:space-y-1")}>
                <p className={cn("tw:text-sm tw:text-muted-foreground")}>
                  {metric.label}
                </p>
                <p className={cn("tw:text-2xl tw:font-bold")}>{metric.value}</p>
              </div>
            ))}
          </div>
          <div className={cn("tw:flex tw:gap-2")}>
            <Button
              variant="outline"
              onClick={(): void => void window.open(requestDemoHref, "_blank")}
            >
              Request Demo Tour
              <ExternalLink className={cn("tw:ml-2 tw:h-4 tw:w-4")} />
            </Button>
            <Button onClick={onConfigure} disabled={buttonsDisabled}>
              Configure
              <ChevronRight className={cn("tw:ml-2 tw:h-4 tw:w-4")} />
            </Button>
          </div>
        </div>
        {status.details && (
          <div className={cn("tw:mt-4 tw:p-4 tw:bg-gray-50 tw:rounded-lg")}>
            <h4 className={cn("tw:text-sm tw:font-semibold tw:mb-2")}>
              Current Configuration
            </h4>
            {status.details}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
