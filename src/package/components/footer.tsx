import type { JSX } from "react";

import { version } from "../utils/constants";
import { cn } from "../utils/utils";
import { Card, CardHeader } from "./shadcn/card";

export function Footer(): JSX.Element {
  return (
    <Card className={cn("tw:w-full")}>
      <CardHeader className={cn("tw:border-b p-4")}>
        <div className="tw:text-sm tw:text-gray-700 tw:text-center">
          <span>sovendus-integration-settings-ui</span> - Version: {version} -{" "}
          <a
            href="https://github.com/Sovendus-GmbH/sovendus-integration-settings-ui#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="tw:text-blue-500 tw:hover:underline"
          >
            View on GitHub
          </a>
        </div>
      </CardHeader>
    </Card>
  );
}
