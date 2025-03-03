"use client";

import "../components/app.css";

import { type JSX, useEffect, useState } from "react";
import { type SovendusAppSettings } from "sovendus-integration-types";

import { SovendusSettings } from "../sovendus-app-settings";
import { getSettings, saveSettings } from "./settings-util";

export default function Home(): JSX.Element {
  const [currentSettings, setCurrentSettings] = useState<SovendusAppSettings>();

  useEffect(() => {
    setCurrentSettings(getSettings());
  }, []);

  if (!currentSettings) {
    return <></>;
  }

  return (
    <main className="min-h-screen p-4">
      <SovendusSettings
        currentStoredSettings={currentSettings}
        saveSettings={saveSettings}
      />
    </main>
  );
}
