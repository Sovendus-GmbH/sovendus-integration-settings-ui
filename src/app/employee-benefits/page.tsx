"use client";

import "../../package/components/app.css";

import { type JSX } from "react";
import { type SovendusAppSettings } from "sovendus-integration-types";

import { SovendusEmployeeBenefitsFullPage } from "../../package/components/employee-benefits/employee-benefits-full-page";
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
      <div className="tw:py-6 tw:px-4">
        <SovendusEmployeeBenefitsFullPage
          currentSettings={currentSettings.employeeBenefits}
        />
      </div>
    </AdminDashboard>
  );
}
