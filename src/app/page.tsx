"use client";

import "../components/app.css";

import { type JSX, useState } from "react";
import { type SovendusAppSettings } from "sovendus-integration-types";

import { SovendusSettings } from "../sovendus-app-settings";
import { getSettings, saveSettings } from "./settings-util";

export default function Home(): JSX.Element {
  const [currentSettings] = useState<SovendusAppSettings>(getSettings);

  return (
    <main className="min-h-screen p-4">
      <SovendusSettings
        currentStoredSettings={currentSettings}
        saveSettings={saveSettings}
      />
    </main>
  );
}
