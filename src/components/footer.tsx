import type { JSX } from "react";
import React from "react";

import { version } from "../utils/constants";
import { cn } from "../utils/utils";
import { Card, CardHeader } from "./shadcn/card";

export function Footer(): JSX.Element {
  return (
    <Card className={cn("w-full")}>
      <CardHeader className={cn("border-b p-4")}>
        <div className="text-sm text-gray-700 text-center">
          <span>sovendus-integration-settings-ui</span> - Version: {version} -{" "}
          <a
            href="https://github.com/Sovendus-GmbH/sovendus-integration-settings-ui#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View on GitHub
          </a>
        </div>
      </CardHeader>
    </Card>
  );
}
