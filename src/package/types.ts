import type { ReactNode } from "react";

export interface AdditionalSteps {
  optimize?: {
    simple?: ReactNode;
    advanced?: ReactNode;
  };
  voucherNetwork?: {
    simple?: ReactNode;
    advanced?: ReactNode;
  };
  rewards?: {
    simple?: ReactNode;
    advanced?: ReactNode;
  };
  checkoutProducts?: {
    simple?: ReactNode;
    advanced?: ReactNode;
  };
  employeeBenefits?: {
    simple?: ReactNode;
    advanced?: ReactNode;
  };
}

export interface FeatureFlags {
  optimize?: Record<string, boolean>;
  voucherNetwork?: Record<string, boolean>;
  rewards?: Record<string, boolean>;
  checkoutProducts?: Record<string, boolean>;
  employeeBenefits?: Record<string, boolean>;
}
