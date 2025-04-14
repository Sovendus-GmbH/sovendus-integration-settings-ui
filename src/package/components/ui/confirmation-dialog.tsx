import { X } from "lucide-react";
import type { JSX } from "react";
import React from "react";

import { cn } from "../../utils";
import { Button } from "../shadcn/button";
import { Dialog, DialogContent } from "../shadcn/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../shadcn/tooltip";

interface ConfigurationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  zoomedVersion: boolean;
}

export function ConfigurationDialog({
  open,
  onOpenChange,
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
            "tw:sticky tw:top-0 tw:z-[51] tw:flex tw:justify-end tw:h-[55px] tw:mr-[5px]",
          )}
        >
          <div className={cn("tw:flex tw:items-center tw:gap-2")}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={"unstyled"}
                    size={"unstyled"}
                    onClick={(): void => onOpenChange(false)}
                    className={cn(
                      "tw:p-2 tw:rounded-full tw:bg-green-200 tw:hover:bg-green-300 tw:transition-colors",
                    )}
                  >
                    <X style={{ width: "unset", height: "unset" }} />
                    <span className={cn("tw:sr-only")}>Close</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save and close</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className=" tw:mt-[-70px]">
          {/* <DialogHeader className={cn("tw:pb-6 tw:mt-[-55px]")}>
          <DialogTitle className={cn("tw:text-2xl")}>{title}</DialogTitle>
          </DialogHeader> */}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
