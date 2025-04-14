import type { JSX } from "react";

import { Input } from "../shadcn/input";
import { Label } from "../shadcn/label";
import { Switch } from "../shadcn/switch";

interface FeatureToggleProps {
  label: string;
  description?: string;
  enabled: boolean;
  idValue: string;
  onToggleChange: (value: boolean) => void;
  onIdChange: (value: string) => void;
  idPlaceholder?: string;
  idLabel?: string;
}

export function FeatureToggle({
  label,
  description,
  enabled,
  idValue,
  onToggleChange,
  onIdChange,
  idPlaceholder = "Enter ID",
  idLabel = "ID",
}: FeatureToggleProps): JSX.Element {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label>{label}</Label>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <Switch checked={enabled} onCheckedChange={onToggleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="feature-id">{idLabel}</Label>
        <Input
          id="feature-id"
          value={idValue || ""}
          onChange={(e) => onIdChange(e.target.value)}
          placeholder={idPlaceholder}
          disabled={!enabled}
        />
      </div>
    </div>
  );
}
