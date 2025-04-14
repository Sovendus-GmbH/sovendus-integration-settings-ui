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

export default function TestModals(): JSX.Element {
  const { currentSettings, setCurrentSettings } = useSettings(initialSettings);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  if (!currentSettings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tw:p-8 tw:max-w-6xl tw:mx-auto">
      <h1 className="tw:text-3xl tw:font-bold tw:mb-8">Test Feature Component Modals</h1>
      
      <div className="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 lg:tw:grid-cols-3 tw:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Checkout Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setActiveModal("checkoutProducts")}>Open Modal</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Optimize</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setActiveModal("optimize")}>Open Modal</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Employee Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setActiveModal("employeeBenefits")}>Open Modal</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setActiveModal("rewards")}>Open Modal</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Voucher Network</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setActiveModal("voucherNetwork")}>Open Modal</Button>
          </CardContent>
        </Card>
      </div>

      {/* Checkout Products Modal */}
      <Dialog open={activeModal === "checkoutProducts"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="tw:max-w-[1200px] tw:max-h-[90vh] tw:overflow-y-auto">
          <SovendusCheckoutProducts
            enabled={currentSettings.checkoutProducts || false}
            setCurrentSettings={setCurrentSettings}
          />
        </DialogContent>
      </Dialog>

      {/* Optimize Modal */}
      <Dialog open={activeModal === "optimize"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="tw:max-w-[1200px] tw:max-h-[90vh] tw:overflow-y-auto">
          <SovendusOptimize
            currentOptimizeSettings={currentSettings.optimize}
            savedOptimizeSettings={currentSettings.optimize}
            setCurrentSettings={setCurrentSettings}
          />
        </DialogContent>
      </Dialog>

      {/* Employee Benefits Modal */}
      <Dialog open={activeModal === "employeeBenefits"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="tw:max-w-[1200px] tw:max-h-[90vh] tw:overflow-y-auto">
          <SovendusEmployeeBenefitsSettings
            currentSettings={currentSettings.employeeBenefits}
            setCurrentSettings={setCurrentSettings}
            featureFlags={{
              addToSidebar: true,
              showWidgetOnDashboard: true,
              isEnabled: true,
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Rewards Modal */}
      <Dialog open={activeModal === "rewards"} onOpenChange={() => setActiveModal(null)}>
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
          />
        </DialogContent>
      </Dialog>

      {/* Voucher Network Modal */}
      <Dialog open={activeModal === "voucherNetwork"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="tw:max-w-[1200px] tw:max-h-[90vh] tw:overflow-y-auto">
          <SovendusVoucherNetwork
            currentSettings={currentSettings.voucherNetwork}
            setCurrentSettings={setCurrentSettings}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
