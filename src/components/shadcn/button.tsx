import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../utils/utils";

const buttonVariants = cva(
  "tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:whitespace-nowrap tw:rounded-md tw:text-base tw:font-medium tw:transition-colors tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "tw:bg-primary tw:text-primary-foreground tw:shadow tw:hover:bg-primary/90",
        destructive:
          "tw:bg-destructive tw:text-destructive-foreground tw:shadow-sm tw:hover:bg-destructive/90",
        outline:
          "tw:border tw:border-input tw:bg-background tw:shadow-sm tw:hover:bg-accent tw:hover:text-accent-foreground",
        secondary:
          "tw:bg-secondary tw:text-secondary-foreground tw:shadow-sm hover:bg-secondary/80",
        ghost: "tw:hover:bg-accent tw:hover:text-accent-foreground",
        link: "tw:text-primary tw:underline-offset-4 tw:hover:underline",
        unstyled: "",
      },
      size: {
        default: "tw:px-4 tw:py-2 tw:text-md",
        sm: "tw:h-8 tw:rounded-md tw:px-4 tw:py-3 tw:text-xs tw:text-lg",
        lg: "tw:rounded-md tw:px-8 tw:py-3 tw:text-xl",
        unstyled: "",
        icon: "tw:h-9 tw:w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "unstyled"
    | null;
  size?: "default" | "sm" | "lg" | "icon" | "unstyled" | null;
  asChild?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ className, variant, size, asChild = false, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    const computedClassName = cn(
      buttonVariants({ variant, size, className }),
      disabled
        ? "tw:cursor-not-allowed tw:opacity-50 tw:pointer-events-none"
        : "tw:cursor-pointer",
    );

    return (
      <Comp
        className={computedClassName}
        ref={ref}
        aria-disabled={disabled}
        {...(asChild ? { disabled } : {})}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

const SubmitButton = React.forwardRef<HTMLInputElement, ButtonProps>(
  ({ className, variant, size, disabled, ...props }, ref) => {
    const computedClassName = cn(
      buttonVariants({ variant, size, className }),
      disabled
        ? "tw:cursor-not-allowed tw:opacity-50 tw:pointer-events-none"
        : "tw:cursor-pointer",
    );

    return (
      <input
        className={computedClassName}
        ref={ref}
        aria-disabled={disabled}
        {...props}
        type="submit"
      />
    );
  },
);

SubmitButton.displayName = "SubmitButton";

export { Button, buttonVariants, SubmitButton };
