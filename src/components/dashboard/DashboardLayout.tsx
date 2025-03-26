
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
  UserCircle 
} from "lucide-react";
import { APP_NAME } from "@/config/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DashboardTab = 
  | "overview" 
  | "brand-setup" 
  | "domain-purchase" 
  | "inbox-overview" 
  | "inbox-health" 
  | "lead-generation";

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
];

export function DashboardLayout({ children, activeTab, setActiveTab }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img 
              src="/scale-mailer-logo-dark.png" 
              alt={APP_NAME} 
              className="h-8 w-auto" 
            />
          </Link>
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
