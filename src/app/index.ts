import EmployeeBenefitsDemo from "./employee-benefits/page";
import MockDashboard from "./page";
import SettingsUIDemo from "./settings/page";

export { EmployeeBenefitsDemo, MockDashboard, SettingsUIDemo };
export { AdminDashboard } from "./components/mock-admin-dashboard";
export { AdminHeader } from "./components/mock-admin-header";
export { AdminSidebar } from "./components/mock-admin-sidebar";
export {
  DashboardTour,
  EmployeeBenefitsTour,
  OptimizeTour,
  SettingsTour,
} from "./components/tours";
export {
  defaultOnboardingState,
  getOnboardingState,
  type OnboardingState,
  resetOnboardingState,
  saveOnboardingState,
  useOnboardingState,
} from "./onboarding-util";
export { getSettings, initialSettings, saveSettings } from "./settings-util";
