"use client";

import { type JSX } from "react";
import { type SovendusAppSettings } from "sovendus-integration-types";

import { SovendusEmployeeBenefitsWidget } from "../package/components/features/employee-benefits/employee-benefits-widget";
import { AdminBar } from "./components/admin-bar";
import { AdminDashboard } from "./components/mock-admin-dashboard";
import { clearSettings, initialSettings, useSettings } from "./settings-util";

export default function MockDashboard({
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
      <AdminBar pageName="Admin Dashboard" clearStorage={clearStorage} />
      <AdminDashboard page="dashboard" urlPrefix={urlPrefix}>
        <div>
          <h1 className="tw:text-3xl tw:font-bold tw:tracking-tight">
            Dashboard
          </h1>
          <p className="tw:text-muted-foreground tw:mt-2">
            Welcome back, Admin
          </p>
        </div>

        <SovendusEmployeeBenefitsWidget />

        {/* Overview Cards */}
        <div className="tw:grid tw:gap-4 tw:md:grid-cols-2 tw:lg:grid-cols-4">
          {["Total Sales", "Active Users", "New Orders", "Pending Returns"].map(
            (title, i) => (
              <div
                key={i}
                className="tw:rounded-lg tw:border tw:bg-card tw:text-card-foreground tw:shadow-sm tw:p-6"
              >
                <div className="tw:flex tw:flex-row tw:items-center tw:justify-between tw:space-y-0 tw:pb-2">
                  <h3 className="tw:tracking-tight tw:text-sm tw:font-medium">
                    {title}
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="tw:h-4 tw:w-4 tw:text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="tw:text-2xl tw:font-bold">
                  {i === 0 && "$12,543.00"}
                  {i === 1 && "2,350"}
                  {i === 2 && "15"}
                  {i === 3 && "3"}
                </div>
                <p className="tw:text-xs tw:text-muted-foreground">
                  {i % 2 === 0 ? "+20.1%" : "-4.5%"} from last month
                </p>
              </div>
            ),
          )}
        </div>

        {/* Recent Activity */}
        <div className="tw:rounded-lg tw:border tw:bg-card tw:text-card-foreground tw:shadow-sm">
          <div className="tw:p-6">
            <h3 className="tw:text-lg tw:font-medium">Recent Activity</h3>
            <p className="tw:text-sm tw:text-muted-foreground">
              Latest transactions and user activities
            </p>
          </div>
          <div className="tw:p-6 tw:pt-0">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="tw:flex tw:items-center tw:py-4 tw:border-b tw:last:border-0"
              >
                <div className="tw:w-10 tw:h-10 tw:rounded-full tw:bg-muted tw:flex tw:items-center tw:justify-center tw:mr-4">
                  <span className="tw:text-sm tw:font-medium">U{item}</span>
                </div>
                <div className="tw:flex-1">
                  <p className="tw:text-sm tw:font-medium">
                    User action placeholder {item}
                  </p>
                  <p className="tw:text-xs tw:text-muted-foreground">
                    April {item + 3}, 2025
                  </p>
                </div>
                <div className="tw:text-sm tw:font-medium">
                  {item % 2 === 0 ? "Order Placed" : "Account Updated"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminDashboard>
    </>
  );
}
