
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import BrandSetup from "@/components/dashboard/BrandSetup";
import DomainPurchase from "@/components/dashboard/DomainPurchase";
import InboxOverview from "@/components/dashboard/InboxOverview";
import InboxHealth from "@/components/dashboard/InboxHealth";
import LeadGeneration from "@/components/dashboard/LeadGeneration";
import PerformanceDashboard from "@/components/dashboard/PerformanceDashboard";
import BrandManagement from "@/components/dashboard/BrandManagement";
import LeadFinder from "@/components/dashboard/LeadFinder";
import CampaignManagement from "@/components/dashboard/CampaignManagement";

type DashboardTab = 
  | "overview" 
  | "brand-setup" 
  | "domain-purchase" 
  | "inbox-overview" 
  | "inbox-health" 
  | "lead-generation"
  | "brand-management"
  | "lead-finder"
  | "campaign-management";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "brand-setup":
        return <BrandSetup />;
      case "domain-purchase":
        return <DomainPurchase />;
      case "inbox-overview":
        return <InboxOverview />;
      case "inbox-health":
        return <InboxHealth />;
      case "lead-generation":
        return <LeadGeneration />;
      case "brand-management":
        return <BrandManagement />;
      case "lead-finder":
        return <LeadFinder />;
      case "campaign-management":
        return <CampaignManagement />;
      default:
        return <PerformanceDashboard />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderTabContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
