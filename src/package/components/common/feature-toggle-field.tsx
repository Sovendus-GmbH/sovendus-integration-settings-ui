import type { JSX } from "react";

import { Input } from "../shadcn/input";
import { Label } from "../shadcn/label";
import { Switch } from "../shadcn/switch";

interface FeatureToggleFieldProps {
  label: string;
  description?: string;
  enabled: boolean;
  onToggle: (value: boolean) => void;
  idValue: string;
  onIdChange: (value: string) => void;
  idPlaceholder?: string;
  idFieldLabel?: string;
}

export function FeatureToggleField({
  label,
  description,
  enabled,
  onToggle,
  idValue,
  onIdChange,
  idPlaceholder = "Enter ID",
  idFieldLabel = "ID",
}: FeatureToggleFieldProps): JSX.Element {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label>{label}</Label>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <Switch checked={enabled} onCheckedChange={onToggle} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="feature-id">{idFieldLabel}</Label>
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
