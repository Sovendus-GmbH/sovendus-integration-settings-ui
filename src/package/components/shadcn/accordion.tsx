import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "../../utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("tw:border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className={cn("tw:flex")}>
    {/* Use asChild to render a custom element */}
    <AccordionPrimitive.Trigger asChild ref={ref} {...props}>
      <div
        className={cn(
          "tw:flex tw:flex-1 tw:items-center tw:justify-between tw:py-4 tw:text-sm tw:font-medium tw:transition-all tw:hover:underline tw:text-left tw:[&[data-state=open]>svg]:tw:rotate-180 tw:cursor-pointer",
          className,
        )}
      >
        {children}
        <ChevronDown className="tw:h-4 tw:w-4 tw:shrink-0 tw:text-muted-foreground tw:transition-transform tw:duration-200" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="tw:overflow-hidden tw:text-sm tw:data-[state=closed]:animate-accordion-up tw:data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("tw:pb-4 tw:pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
