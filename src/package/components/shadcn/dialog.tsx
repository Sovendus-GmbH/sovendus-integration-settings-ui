import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { JSX } from "react";
import React from "react";

import { cn } from "../../utils";

const Dialog = Root;

const DialogTrigger = Trigger;

const DialogPortal = Portal;

const DialogClose = Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof Overlay>,
  React.ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
  <Overlay
    ref={ref}
    className={cn(
      "tw:fixed tw:inset-0 tw:z-48 tw:bg-black/80  tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content> & {
    withClose?: boolean;
  }
>(({ className, children, withClose, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <Content
      ref={ref}
      className={cn(
        "tw:fixed tw:left-[50%] tw:top-[50%] tw:z-49 tw:grid tw:w-full tw:translate-x-[-50%] tw:translate-y-[-50%] tw:gap-4 tw:border tw:bg-background tw:p-6 tw:shadow-lg tw:duration-200 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[state=closed]:slide-out-to-left-1/2 tw:data-[state=closed]:slide-out-to-top-[48%] tw:data-[state=open]:slide-in-from-left-1/2 tw:data-[state=open]:slide-in-from-top-[48%] tw:sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      {withClose ? (
        <Close className="tw:absolute tw:right-4 tw:top-4 tw:rounded-sm tw:opacity-70 tw:ring-offset-tw:background tw:transition-opacity tw:hover:opacity-100 tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2 tw:disabled:pointer-events-none tw:data-[state=open]:bg-accent tw:data-[state=open]:text-muted-foreground">
          <X className={cn("tw:h-4 tw:w-4")} />
          <span className="tw:sr-only">Close</span>
        </Close>
      ) : (
        <></>
      )}
    </Content>
  </DialogPortal>
));
DialogContent.displayName = Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div
    className={cn(
      "tw:flex tw:flex-col tw:space-y-1.5 tw:text-center tw:sm:text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div
    className={cn(
      "tw:flex tw:flex-col-reverse tw:sm:flex-row tw:sm:justify-end tw:sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title
    ref={ref}
    className={cn(
      "tw:text-lg tw:font-semibold tw:leading-none tw:tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={cn("tw:text-sm tw:text-muted-tw:foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
