import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard, Newspaper, Calendar, Settings, LogOut, Menu,
  Image, Bell, GraduationCap, ChevronRight, Home, Award, ClipboardList, Mail, Users, BookOpen, Building2, UserCog
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import { AdminLogin } from "../../pages/admin/AdminLogin";

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/news", label: "News & Announcements", icon: Newspaper },
  { path: "/admin/events", label: "Events", icon: Calendar },
  { path: "/admin/announcements", label: "Ticker Announcements", icon: Bell },
  { path: "/admin/gallery", label: "Gallery", icon: Image },
  { path: "/admin/campus-life", label: "Campus Life & Sports", icon: Users },
  { path: "/admin/academics", label: "Academics", icon: BookOpen },
  { path: "/admin/faculty", label: "Faculty", icon: GraduationCap },
  { path: "/admin/facilities", label: "Facilities & Labs", icon: Building2 },
  { path: "/admin/results", label: "Results", icon: Award },
  { path: "/admin/applications", label: "Admission Applications", icon: ClipboardList },
  { path: "/admin/messages", label: "Contact Messages", icon: Mail },
  { path: "/admin/users", label: "Manage Users", icon: UserCog },
  { path: "/admin/settings", label: "Site Settings", icon: Settings },
];

export function AdminRoot() {
  const { isLoggedIn, logout, currentUser } = useAdmin();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isLoggedIn) return <AdminLogin />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Theme: Changed from green bg-[#003D1F] to deep sky navy */}
      {/* Previous green: bg-[#003D1F] */}
      <aside className={`fixed md:sticky top-0 h-screen w-64 bg-[#082F49] text-white flex flex-col z-50 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        {/* Previous green: border-[#006B3F]/50 -> border-[#0284C7]/30 */}
        <div className="p-5 border-b border-[#0284C7]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0284C7] rounded-lg flex items-center justify-center shrink-0 shadow">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">GACW Admin Panel</p>
              <p className="text-sky-300 text-xs">Data Nagar (Women)</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <p className="text-sky-400/60 text-xs uppercase tracking-widest px-5 mb-2">Management</p>
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path || (path === "/admin/dashboard" && location.pathname === "/admin");
            return (
              <Link key={path} to={path} onClick={() => setSidebarOpen(false)}
                /* Previous green: active: bg-[#C8A951] text-[#003D1F], inactive hover: hover:bg-[#006B3F]/40 -> active bg-[#0284C7] text-white */
                className={`flex items-center gap-3 px-5 py-3 text-sm transition-all ${active ? "bg-[#0284C7] text-white font-semibold shadow-sm" : "text-gray-300 hover:bg-[#0369A1]/40 hover:text-white"}`}>
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight className="w-3 h-3" />}
              </Link>
            );
          })}
        </nav>

        {/* Previous green: border-[#006B3F]/50 -> border-[#0284C7]/30 */}
        <div className="p-4 border-t border-[#0284C7]/30 space-y-2">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#70C4F2] transition-colors px-1 py-1">
            <Home className="w-4 h-4" /> View Website
          </Link>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors px-1 py-1 w-full">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center gap-3 sticky top-0 z-30 shadow-xs">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <p className="font-semibold text-gray-800 text-sm">
              {navItems.find(n => n.path === location.pathname)?.label || "Dashboard"}
            </p>
            <p className="text-xs text-gray-500">Govt. Associate College for Women (GACW), Data Nagar Lahore</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-sky-700 bg-sky-50 border border-sky-200 px-2 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-[#0284C7] rounded-full" /> Logged in
            </div>
            {/* Previous green: from-[#006B3F] to-[#003D1F] -> from-[#0284C7] to-[#0369A1] */}
            <div className="w-8 h-8 bg-gradient-to-br from-[#0284C7] to-[#0369A1] rounded-full flex items-center justify-center shadow-xs">
              <span className="text-white text-xs font-bold">{currentUser?.name?.[0]?.toUpperCase() || "A"}</span>
            </div>
            <span className="hidden sm:block text-xs text-gray-600 font-medium">{currentUser?.name || "Admin"}</span>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
