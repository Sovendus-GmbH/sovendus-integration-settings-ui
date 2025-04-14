import type { JSX, ReactNode } from "react";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shadcn/tabs";

export interface FeatureLayoutProps {
  title: string;
  simpleTabContent: ReactNode;
  advancedTabContent?: ReactNode;
  defaultTab?: "simple" | "advanced";
  showAdvancedTab?: boolean;
}

export function FeatureLayout({
  title,
  simpleTabContent,
  advancedTabContent,
  defaultTab = "simple",
  showAdvancedTab = true,
}: FeatureLayoutProps): JSX.Element {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="simple">Simple</TabsTrigger>
          {showAdvancedTab && (
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="simple">
          <Card>
            <CardHeader>
              <CardTitle>Simple Configuration</CardTitle>
            </CardHeader>
            <CardContent>{simpleTabContent}</CardContent>
          </Card>
        </TabsContent>

        {showAdvancedTab && (
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Configuration</CardTitle>
              </CardHeader>
              <CardContent>{advancedTabContent}</CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
