"use client";

import { type JSX } from "react";
import { type SovendusAppSettings } from "sovendus-integration-types";

import { SovendusEmployeeBenefitsFullPage } from "../../package/components/features/employee-benefits";
import { AdminBar } from "../components/admin-bar";
import { AdminDashboard } from "../components/mock-admin-dashboard";
import { clearSettings, initialSettings, useSettings } from "../settings-util";

export default function EmployeeBenefitsDemo({
  initialSettings: _initialSettings,
  urlPrefix = "",
  clearStorage = clearSettings,
}: {
  initialSettings?: SovendusAppSettings;
  urlPrefix?: string;
  clearStorage: () => void;
}): JSX.Element {
  const { currentSettings } = useSettings(_initialSettings || initialSettings);

  if (!currentSettings) {
    return <></>;
  }
  return (
    <>
      <AdminBar pageName="Employee Benefits Page" clearStorage={clearStorage} />
      <AdminDashboard page="eBenefits" urlPrefix={urlPrefix}>
        <SovendusEmployeeBenefitsFullPage
          currentSettings={currentSettings.employeeBenefits}
        />
      </AdminDashboard>
    </>
  );
}
