import { X } from "lucide-react";
import type { JSX } from "react";
import React from "react";

import { cn } from "../utils/utils";
import { Button } from "./shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./shadcn/dialog";

interface ConfigurationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  zoomedVersion: boolean;
}

export function ConfigurationDialog({
  open,
  onOpenChange,
  title,
  children,
  zoomedVersion,
}: ConfigurationDialogProps): JSX.Element {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("tw:max-w-[1200px] tw:max-h-[90vh] tw:overflow-y-auto", {
          zoomed: zoomedVersion,
        })}
        withClose={false}
      >
        <div
          className={cn(
            "tw:sticky tw:top-0 z-50 tw:flex tw:justify-end tw:h-[55px]",
          )}
        >
          <div className={cn("tw:flex tw:items-center tw:gap-2")}>
            <Button
              variant={"unstyled"}
              size={"unstyled"}
              onClick={(): void => onOpenChange(false)}
              className={cn(
                "tw:p-2 tw:rounded-full tw:bg-gray-100 tw:hover:bg-gray-200 tw:transition-colors",
              )}
            >
              <X style={{ width: "unset", height: "unset" }} />
              <span className={cn("tw:sr-only")}>Close</span>
            </Button>
          </div>
        </div>
        <DialogHeader className={cn("tw:pb-6 tw:mt-[-55px]")}>
          <DialogTitle className={cn("tw:text-2xl")}>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
