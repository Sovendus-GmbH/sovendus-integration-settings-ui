import { X } from "lucide-react";
import type { JSX } from "react";
import React from "react";

import { cn } from "../../utils";
import { Button } from "../shadcn/button";
import { Dialog, DialogContent, DialogTitle } from "../shadcn/dialog";
import { VisuallyHidden } from "../shadcn/visually-hidden";

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
          </div>
        </div>
        <VisuallyHidden>
          <DialogTitle>Configuration Dialog</DialogTitle>
        </VisuallyHidden>
        <div className=" tw:mt-[-70px]">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
