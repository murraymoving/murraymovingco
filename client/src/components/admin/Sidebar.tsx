import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Clipboard, 
  MessageCircle, 
  Users, 
  Settings, 
  LogOut 
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [location] = useLocation();
  const { logoutMutation, user } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navItems = [
    { 
      name: "Dashboard", 
      href: "/admin/dashboard", 
      icon: LayoutDashboard 
    },
    { 
      name: "Quote Requests", 
      href: "/admin/quotes", 
      icon: Clipboard 
    },
    { 
      name: "Contact Messages", 
      href: "/admin/contacts", 
      icon: MessageCircle 
    }
  ];

  return (
    <div className="h-screen flex flex-col bg-primary-900 text-white w-64 fixed inset-y-0 left-0">
      <div className="p-6 border-b border-primary-800">
        <Link href="/">
          <a className="text-2xl font-bold">MoveMasters</a>
        </Link>
        <div className="mt-2 text-sm text-primary-200">Admin Panel</div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <a className={cn(
                  "flex items-center px-4 py-3 text-base rounded-md",
                  isActive 
                    ? "bg-primary-800 text-white font-medium" 
                    : "text-primary-100 hover:bg-primary-800"
                )}>
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-primary-800">
        <div className="flex items-center px-4 py-3 mb-2">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center">
              {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'A'}
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">
              {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.username}
            </p>
            <p className="text-xs text-primary-300">Admin</p>
          </div>
        </div>
        
        <Link href="/admin/settings">
          <a className="flex items-center px-4 py-3 text-base text-primary-100 rounded-md hover:bg-primary-800">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </a>
        </Link>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 mt-1 text-base text-primary-100 rounded-md hover:bg-primary-800"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
