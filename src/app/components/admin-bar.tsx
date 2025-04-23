"use client";

import { ChevronLeft, Gauge, Settings, Trash2 } from "lucide-react";
import Link from "next/link";
import type { Dispatch, JSX, SetStateAction } from "react";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "sovendus-integration-settings-ui/ui";

interface AdminBarProps {
  configContent?: (
    setConfigOpen: Dispatch<SetStateAction<boolean>>,
  ) => JSX.Element;
  pageName: string;
  clearStorage: () => void;
}

export function AdminBar({
  configContent,
  pageName,
  clearStorage,
}: AdminBarProps): JSX.Element {
  const [configOpen, setConfigOpen] = useState(false);

  return (
    <>
      <div className="tw:bg-black tw:text-white tw:h-10 tw:fixed tw:top-0 tw:left-0 tw:right-0 tw:z-50 tw:flex tw:items-center tw:px-4 tw:shadow-md">
        <div className="tw:flex tw:items-center tw:justify-between tw:w-full">
          <div className="tw:flex tw:items-center tw:space-x-4">
            <Link
              href={"/site"}
              className="tw:flex tw:items-center tw:text-sm tw:font-medium tw:hover:text-gray-300"
            >
              <ChevronLeft className="tw:h-4 tw:w-4 tw:mr-1" />
              Back to Website
            </Link>
            <div className="tw:h-4 tw:border-r tw:border-gray-700"></div>
            <div className="tw:flex tw:items-center tw:text-sm">
              <Gauge className="tw:h-4 tw:w-4 tw:mr-1" />
              <span>
                Current Page Type:{" "}
                <span className="tw:font-medium">{pageName}</span>
              </span>
            </div>
          </div>
          <div className="tw:flex tw:items-center tw:space-x-3">
            <Button
              variant="unstyled"
              size="sm"
              className="tw:text-red-400 tw:hover:text-red-500 tw:p-0 tw:h-auto"
              onClick={clearStorage}
            >
              <Trash2 className="tw:h-4 tw:w-4 tw:mr-1" />
              Reset all Settings
            </Button>
            {configContent ? (
              <Button
                variant="unstyled"
                size="sm"
                className="tw:text-orange-400 tw:hover:text-orange-500 tw:p-0 tw:h-auto"
                onClick={() => setConfigOpen(true)}
              >
                <Settings className="h-4 w-4 mr-1" />
                Configure {pageName}
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/* Add padding to the top of the page to account for the admin bar */}
      <div className="tw:h-10"></div>

      {/* Configuration Modal */}
      <Dialog open={configOpen} onOpenChange={setConfigOpen}>
        <DialogContent className="tw:max-w-[800px] tw:max-h-[80vh] tw:overflow-auto tw:mt-[50px]">
          <DialogHeader className="tw:border-b tw:pb-4">
            <DialogTitle className="tw:text-xl tw:flex tw:items-center tw:gap-2">
              <Settings className="tw:h-5 tw:w-5" />
              {pageName} Configuration
            </DialogTitle>
          </DialogHeader>
          {configContent ? (
            <div className="tw:py-4">{configContent(setConfigOpen)}</div>
          ) : (
            <></>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
