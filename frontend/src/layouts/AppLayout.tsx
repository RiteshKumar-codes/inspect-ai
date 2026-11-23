
import { Outlet } from "react-router-dom";
import { Bell, UserCircle } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar />

      <div className="flex-1 min-w-0">

        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

          <div>
            <p className="text-sm text-slate-500">
              InspectAI / Workspace
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button className="text-slate-500 hover:text-blue-600">
              <Bell size={21} />
            </button>

            <div className="flex items-center gap-2">
              <UserCircle size={30} className="text-slate-500" />
              <div>
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
            </div>
          </div>

        </header>

        {/* Page content */}
        <main className="p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
