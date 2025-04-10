"use client";

import {
  BarChart3,
  Box,
  Home,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { JSX, ReactNode } from "react";
import { useState } from "react";

import { Button } from "../../package/components/shadcn/button";
import { ScrollArea } from "../../package/components/shadcn/scroll-area";
import { SovendusAppLogo } from "../../package/components/sovendus-app-logo";

export function AdminSidebar({
  page,
  dashboardUrl = "/",
  websiteUrl = "#",
}: {
  page: "settings" | "eBenefits" | "dashboard";
  dashboardUrl?: string;
  websiteUrl?: string;
}): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = (): void => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`tw:bg-card tw:border-r tw:h-screen tw:flex tw:flex-col tw:transition-all tw:duration-300 ${
        collapsed ? "tw:w-[70px]" : "tw:w-[250px]"
      }`}
    >
      <div className="tw:p-4 tw:border-b tw:flex tw:items-center tw:justify-between">
        <div
          onClick={toggleSidebar}
          className={`tw:flex tw:items-center ${collapsed ? "tw:justify-center tw:w-full" : ""}`}
        >
          <ShoppingCart className="tw:h-6 tw:w-6 tw:text-primary" />
          {!collapsed && (
            <span className="tw:ml-2 tw:font-bold tw:text-lg">StyleShop</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={collapsed ? "tw:hidden" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tw:h-4 tw:w-4"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Button>
      </div>

      <ScrollArea className="tw:flex-1 tw:py-2">
        <div className="tw:space-y-1 tw:px-2">
          <SidebarItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            href={dashboardUrl}
            collapsed={collapsed}
            active={page === "dashboard"}
          />
          <SidebarItem
            icon={<Home />}
            label="Website"
            href={websiteUrl}
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<Package />}
            label="Products"
            href="#"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<ShoppingCart />}
            label="Orders"
            href="#"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<Users />}
            label="Customers"
            href="#"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<BarChart3 />}
            label="Analytics"
            href="#"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<Box />}
            label="Inventory"
            href="#"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<SovendusAppLogo />}
            label="Employee Benefits"
            href="/employee-benefits"
            collapsed={collapsed}
            active={page === "eBenefits"}
          />
        </div>

        <div className="tw:px-3 tw:py-2">
          <div
            className={`tw:text-xs tw:font-semibold ${collapsed ? "tw:text-center" : ""} tw:text-muted-foreground tw:py-2`}
          >
            {!collapsed && "SETTINGS"}
          </div>
          <div className="tw:space-y-1 tw:pt-1">
            <SidebarItem
              icon={<Settings />}
              label="Settings"
              href="#"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<SovendusAppLogo />}
              label="Sovendus App"
              href="/settings"
              collapsed={collapsed}
              active={page === "settings"}
            />
            <SidebarItem
              icon={<LifeBuoy />}
              label="Help & Support"
              href="#"
              collapsed={collapsed}
            />
          </div>
        </div>
      </ScrollArea>

      <div className="tw:p-4 tw:border-t tw:mt-auto">
        <Button
          variant="ghost"
          className={`tw:w-full tw:justify-${collapsed ? "center" : "start"} tw:text-muted-foreground hover:tw:text-foreground`}
        >
          <LogOut className="tw:h-5 tw:w-5 tw:mr-2" />
          {!collapsed && "Log out"}
        </Button>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  collapsed: boolean;
  active?: boolean;
}

function SidebarItem({
  icon,
  label,
  href,
  collapsed,
  active,
}: SidebarItemProps): JSX.Element {
  return (
    <Link
      href={href}
      className={`tw:flex tw:items-center tw:py-2 tw:px-3 tw:rounded-md tw:text-sm ${
        active
          ? "tw:bg-accent tw:text-accent-foreground tw:font-medium"
          : "tw:text-muted-foreground tw:hover:bg-accent tw:hover:text-accent-foreground"
      } ${collapsed ? "tw:justify-center" : ""}`}
    >
      <span className="tw:mr-2">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
