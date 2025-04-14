"use client";

import { Bell, Search, User } from "lucide-react";
import type { JSX } from "react";
import { useState } from "react";

import { Button } from "../../package/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../package/components/shadcn/dropdown-menu";
import { Input } from "../../package/components/shadcn/input";

export function AdminHeader(): JSX.Element {
  const [notifications] = useState([
    { id: 1, title: "New order received", time: "5 minutes ago" },
    { id: 2, title: "User feedback submitted", time: "1 hour ago" },
    { id: 3, title: "System update completed", time: "2 hours ago" },
  ]);

  return (
    <header className="tw:border-b tw:bg-card tw:px-6 tw:py-3">
      <div className="tw:flex tw:items-center tw:justify-between">
        <div className="tw:flex tw:items-center tw:gap-4 lg:tw:gap-6">
          <div className="tw:relative tw:w-full tw:max-w-[300px]">
            <Search className="tw:absolute tw:left-2.5 tw:top-2.5 tw:h-4 tw:w-4 tw:text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="tw:w-full tw:bg-background tw:pl-8 tw:md:w-[300px] tw:lg:w-[300px]"
            />
          </div>
        </div>
        <div className="tw:flex tw:items-center tw:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="tw:relative">
                <Bell className="tw:h-4 tw:w-4" />
                <span className="tw:absolute -tw:right-1 -tw:top-1 tw:flex tw:h-4 tw:w-4 tw:items-center tw:justify-center tw:rounded-full tw:bg-primary tw:text-[10px] tw:font-medium tw:text-primary-foreground">
                  {notifications.length}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="tw:w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="tw:cursor-pointer tw:flex tw:flex-col tw:items-start tw:py-2"
                >
                  <span>{notification.title}</span>
                  <span className="tw:text-xs tw:text-muted-foreground">
                    {notification.time}
                  </span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="tw:cursor-pointer tw:text-center">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="tw:rounded-full">
                <User className="tw:h-4 tw:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
