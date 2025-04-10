import type { JSX, ReactNode } from "react";

import { AdminHeader } from "./mock-admin-header";
import { AdminSidebar } from "./mock-admin-sidebar";

export function AdminDashboard({
  children,
  page,
}: {
  children: ReactNode;
  page: "settings" | "eBenefits" | "dashboard";
}): JSX.Element {
  return (
    <div className="tw:flex tw:h-screen tw:bg-muted/30">
      <AdminSidebar page={page} />
      <div className="tw:flex tw:flex-col tw:flex-1 tw:overflow-hidden">
        <AdminHeader />
        <main className="tw:flex-1 tw:overflow-y-auto tw:p-6">
          <div className="tw:space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
