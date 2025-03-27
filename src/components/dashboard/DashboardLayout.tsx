
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  Globe, 
  Inbox, 
  LayoutDashboard, 
  LineChart, 
  Mail, 
  Plus, 
  Settings, 
  UserCircle,
  Users,
  Search,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FiSend } from 'react-icons/fi';

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

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
}

const NAV_ITEMS = [
  {
    id: "overview",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "brand-management",
    label: "Brand Management",
    icon: Users,
  },
  {
    id: "brand-setup",
    label: "Brand Setup",
    icon: Plus,
  },
  {
    id: "domain-purchase",
    label: "Domain Purchase",
    icon: Globe,
  },
  {
    id: "inbox-overview",
    label: "Inbox Overview",
    icon: Mail,
  },
  {
    id: "inbox-health",
    label: "Inbox Health",
    icon: LineChart,
  },
  {
    id: "lead-generation",
    label: "Lead Generation",
    icon: BarChart3,
  },
  {
    id: "lead-finder",
    label: "Lead Finder",
    icon: Search,
  },
  {
    id: "campaign-management",
    label: "Campaigns",
    icon: Send,
  },
];

export function DashboardLayout({ children, activeTab, setActiveTab }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          <a href="/" className="flex items-center space-x-2">
            {/* Icon */}
            <FiSend className="text-[#3C82F4] w-6 h-6" />

            {/* Brand name with color split */}
            <span className="text-xl font-semibold">
              <span className="text-[#3C82F4]">Scale</span>
              <span className="text-black">Mailer</span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon">
              <UserCircle className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="flex-1 flex">
        <aside className="w-64 border-r bg-muted/40 hidden md:block">
          <nav className="flex flex-col gap-2 p-4">
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={cn(
                  "justify-start gap-2 px-3",
                  activeTab === item.id ? "bg-secondary" : "hover:bg-secondary/80"
                )}
                onClick={() => setActiveTab(item.id as DashboardTab)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
