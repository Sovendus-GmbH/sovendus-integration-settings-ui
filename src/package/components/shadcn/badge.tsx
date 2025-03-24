import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../utils/utils";

const badgeVariants = cva(
  "tw:inline-flex tw:items-center tw:rounded-md tw:border tw:px-2.5 tw:py-0.5 tw:text-xs tw:font-semibold tw:transition-colors tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "tw:border-transparent tw:bg-primary tw:text-primary-foreground tw:shadow tw:hover:bg-primary/80 tw:text-sm",
        secondary:
          "tw:border-transparent tw:bg-secondary tw:text-secondary-foreground tw:hover:bg-secondary/80 tw:text-sm",
        destructive:
          "tw:border-transparent tw:bg-destructive tw:text-destructive-foreground tw:shadow tw:hover:bg-destructive/80 tw:text-sm",
        outline: "tw:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant,
  ...props
}: BadgeProps): React.JSX.Element {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
