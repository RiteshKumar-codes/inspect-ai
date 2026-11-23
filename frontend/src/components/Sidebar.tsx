
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  ScanSearch,
  ChartNoAxesCombined,
  FileText,
  Settings,
  ShieldCheck,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "New Inspection", path: "/new-inspection", icon: ScanSearch },
  { name: "Inspections", path: "/inspections", icon: ClipboardList },
  { name: "Analytics", path: "/analytics", icon: ChartNoAxesCombined },
  { name: "Reports", path: "/reports", icon: FileText },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ShieldCheck size={25} />
          </div>

          <div>
            <h1 className="text-xl font-bold">InspectAI</h1>
            <p className="text-xs text-slate-400">
              Quality Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <p className="text-xs text-slate-500 uppercase px-3 mb-3">
          Main Menu
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <p className="text-xs text-slate-500">
          AI Inspection Platform
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Version 1.0.0
        </p>
      </div>

    </aside>
  );
}

