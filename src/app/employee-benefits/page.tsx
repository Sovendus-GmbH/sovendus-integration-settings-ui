"use client";

import { type JSX } from "react";
import { type SovendusAppSettings } from "sovendus-integration-types";

import { SovendusEmployeeBenefitsFullPage } from "../../package/components/features/employee-benefits";
import { AdminDashboard } from "../components/mock-admin-dashboard";
import { initialSettings, useSettings } from "../settings-util";

export default function EmployeeBenefitsDemo({
  initialSettings: _initialSettings,
  urlPrefix = "",
}: {
  initialSettings?: SovendusAppSettings;
  urlPrefix?: string;
}): JSX.Element {
  const { currentSettings } = useSettings(_initialSettings || initialSettings);

  if (!currentSettings) {
    return <></>;
  }
  return (
    <AdminDashboard page="eBenefits" urlPrefix={urlPrefix}>
      <SovendusEmployeeBenefitsFullPage
        currentSettings={currentSettings.employeeBenefits}
      />
    </AdminDashboard>
  );
}
