"use client";

import { useState, type JSX } from "react";
import { type SovendusAppSettings } from "sovendus-integration-types";

import { SovendusCheckoutProducts } from "../../package/components/features/checkout-products";
import { SovendusEmployeeBenefitsSettings } from "../../package/components/features/employee-benefits/employee-benefits-settings";
import { SovendusOptimize } from "../../package/components/features/optimize";
import { SovendusRewards } from "../../package/components/features/rewards/rewards";
import { SovendusVoucherNetwork } from "../../package/components/features/voucher-network";
import { Button } from "../../package/components/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../package/components/shadcn/card";
import { Dialog, DialogContent } from "../../package/components/shadcn/dialog";
import { initialSettings, useSettings } from "../settings-util";

export default function TestTabs(): JSX.Element {
  const { currentSettings, setCurrentSettings } = useSettings(initialSettings);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [defaultTab, setDefaultTab] = useState<"configure" | "benefits" | "how-it-works">("configure");

  if (!currentSettings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tw:p-8 tw:max-w-6xl tw:mx-auto">
      <h1 className="tw:text-3xl tw:font-bold tw:mb-8">Test Different Default Tabs</h1>
      
      <div className="tw:mb-8 tw:p-4 tw:bg-gray-100 tw:rounded-lg">
        <h2 className="tw:text-xl tw:font-bold tw:mb-4">Select Default Tab</h2>
        <div className="tw:flex tw:gap-4">
          <Button 
            onClick={() => setDefaultTab("configure")}
            variant={defaultTab === "configure" ? "default" : "outline"}
          >
            Configure
          </Button>
          <Button 
            onClick={() => setDefaultTab("benefits")}
            variant={defaultTab === "benefits" ? "default" : "outline"}
          >
            Key Benefits
          </Button>
          <Button 
            onClick={() => setDefaultTab("how-it-works")}
            variant={defaultTab === "how-it-works" ? "default" : "outline"}
          >
            How It Works
          </Button>
        </div>
        <p className="tw:mt-4 tw:text-gray-600">
          Current default tab: <strong>{defaultTab}</strong>
        </p>
      </div>
      
      <div className="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 lg:tw:grid-cols-3 tw:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Checkout Products</CardTitle>
          </CardHeader>
          <CardContent className="tw:flex tw:flex-col tw:gap-2">
            <Button onClick={() => {
              setActiveModal("checkoutProducts-configure");
              setDefaultTab("configure");
            }}>
              Configure
            </Button>
            <Button onClick={() => {
              setActiveModal("checkoutProducts-benefits");
              setDefaultTab("benefits");
            }}>
              Learn More
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Optimize</CardTitle>
          </CardHeader>
          <CardContent className="tw:flex tw:flex-col tw:gap-2">
            <Button onClick={() => {
              setActiveModal("optimize-configure");
              setDefaultTab("configure");
            }}>
              Configure
            </Button>
            <Button onClick={() => {
              setActiveModal("optimize-benefits");
              setDefaultTab("benefits");
            }}>
              Learn More
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Employee Benefits</CardTitle>
          </CardHeader>
          <CardContent className="tw:flex tw:flex-col tw:gap-2">
            <Button onClick={() => {
              setActiveModal("employeeBenefits-configure");
              setDefaultTab("configure");
            }}>
              Configure
            </Button>
            <Button onClick={() => {
              setActiveModal("employeeBenefits-benefits");
              setDefaultTab("benefits");
            }}>
              Learn More
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Rewards</CardTitle>
          </CardHeader>
          <CardContent className="tw:flex tw:flex-col tw:gap-2">
            <Button onClick={() => {
              setActiveModal("rewards-configure");
              setDefaultTab("configure");
            }}>
              Configure
            </Button>
            <Button onClick={() => {
              setActiveModal("rewards-benefits");
              setDefaultTab("benefits");
            }}>
              Learn More
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Voucher Network</CardTitle>
          </CardHeader>
          <CardContent className="tw:flex tw:flex-col tw:gap-2">
            <Button onClick={() => {
              setActiveModal("voucherNetwork-configure");
              setDefaultTab("configure");
            }}>
              Configure
            </Button>
            <Button onClick={() => {
              setActiveModal("voucherNetwork-benefits");
              setDefaultTab("benefits");
            }}>
              Learn More
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Checkout Products Modal */}
      <Dialog 
        open={activeModal?.startsWith("checkoutProducts")} 
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent className="tw:max-w-[1200px] tw:max-h-[90vh] tw:overflow-y-auto">
          <SovendusCheckoutProducts
            enabled={currentSettings.checkoutProducts || false}
            setCurrentSettings={setCurrentSettings}
            defaultTab={defaultTab}
          />
        </DialogContent>
      </Dialog>

      {/* Optimize Modal */}
      <Dialog 
        open={activeModal?.startsWith("optimize")} 
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent className="tw:max-w-[1200px] tw:max-h-[90vh] tw:overflow-y-auto">
          <SovendusOptimize
            currentOptimizeSettings={currentSettings.optimize}
            savedOptimizeSettings={currentSettings.optimize}
            setCurrentSettings={setCurrentSettings}
            defaultTab={defaultTab}
          />
        </DialogContent>
      </Dialog>

      {/* Employee Benefits Modal */}
      <Dialog 
        open={activeModal?.startsWith("employeeBenefits")} 
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent className="tw:max-w-[1200px] tw:max-h-[90vh] tw:overflow-y-auto">
          <SovendusEmployeeBenefitsSettings
            currentSettings={currentSettings.employeeBenefits}
            setCurrentSettings={setCurrentSettings}
            featureFlags={{
              addToSidebar: true,
              showWidgetOnDashboard: true,
              isEnabled: true,
            }}
            defaultTab={defaultTab}
          />
        </DialogContent>
      </Dialog>

      {/* Rewards Modal */}
      <Dialog 
        open={activeModal?.startsWith("rewards")} 
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent className="tw:max-w-[1200px] tw:max-h-[90vh] tw:overflow-y-auto">
          <SovendusRewards
            currentRewardsSettings={currentSettings.rewards}
            setCurrentSettings={setCurrentSettings}
            featureFlags={{
              rewardsEnabled: true,
              triggers: {
                myAccountDashboard: true,
                myOrders: true,
                myOrdersDetail: true,
                custom: true,
              }
            }}
            defaultTab={defaultTab}
          />
        </DialogContent>
      </Dialog>

      {/* Voucher Network Modal */}
      <Dialog 
        open={activeModal?.startsWith("voucherNetwork")} 
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent className="tw:max-w-[1200px] tw:max-h-[90vh] tw:overflow-y-auto">
          <SovendusVoucherNetwork
            currentSettings={currentSettings.voucherNetwork}
            setCurrentSettings={setCurrentSettings}
            defaultTab={defaultTab}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
