"use client";

import { type JSX } from "react";
import { type SovendusAppSettings } from "sovendus-integration-types";

import { SovendusEmployeeBenefitsFullPage } from "../../package/components/features/employee-benefits";
import { AdminDashboard } from "../components/mock-admin-dashboard";
import { initialSettings, useSettings } from "../settings-util";

export default function EmployeeBenefitsDemo({
  initialSettings: _initialSettings,
}: {
  initialSettings?: SovendusAppSettings;
}): JSX.Element {
  const { currentSettings } = useSettings(_initialSettings || initialSettings);

  if (!currentSettings) {
    return <></>;
  }
  return (
    <AdminDashboard page="eBenefits">
      <SovendusEmployeeBenefitsFullPage
        currentSettings={currentSettings.employeeBenefits}
      />
    </AdminDashboard>
  );
}
