import { Link } from "react-router";
import { Newspaper, Calendar, Bell, Image, Settings, Users, BookOpen, Award, GraduationCap, ArrowRight, TrendingUp } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

const quickLinks = [
  { to: "/admin/news", icon: Newspaper, label: "Manage News", desc: "Add or edit news articles", color: "#006B3F" },
  { to: "/admin/events", icon: Calendar, label: "Manage Events", desc: "Update upcoming events", color: "#C8A951" },
  { to: "/admin/announcements", icon: Bell, label: "Announcements", desc: "Edit ticker announcements", color: "#006B3F" },
  { to: "/admin/gallery", icon: Image, label: "Gallery", desc: "Manage photo gallery", color: "#C8A951" },
  { to: "/admin/settings", icon: Settings, label: "Site Settings", desc: "Contact, principal info", color: "#006B3F" },
];

export function AdminDashboard() {
  const { news, events, announcements, gallery, settings, messages, faculty, programs, facilities } = useAdmin();

  const stats = [
    { icon: Newspaper, label: "News Articles", value: news.length, color: "#006B3F" },
    { icon: Calendar, label: "Events", value: events.length, color: "#C8A951" },
    { icon: Bell, label: "Active Announcements", value: announcements.filter((a) => a.active).length, color: "#006B3F" },
    { icon: Image, label: "Gallery Photos", value: gallery.length, color: "#C8A951" },
    { icon: GraduationCap, label: "Faculty Members", value: faculty.length, color: "#006B3F" },
    { icon: BookOpen, label: "Programs", value: programs.length, color: "#C8A951" },
    { icon: Award, label: "Facilities", value: facilities.length, color: "#006B3F" },
    { icon: Users, label: "Messages", value: messages.length, color: "#C8A951" },
  ];

  return (
    <div>
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "Playfair Display, serif" }}>
          Welcome, Administrator 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">Here's an overview of your college website content.</p>
      </div>

      {/* Admissions Status Banner */}
      <div className={`rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${settings.admissionsOpen ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
        <div className="flex items-center gap-3">
          <GraduationCap className={`w-6 h-6 ${settings.admissionsOpen ? "text-green-600" : "text-red-600"}`} />
          <div>
            <p className={`font-semibold text-sm ${settings.admissionsOpen ? "text-green-800" : "text-red-800"}`}>
              Admissions are currently {settings.admissionsOpen ? "OPEN" : "CLOSED"}
            </p>
            {settings.admissionsOpen && (
              <p className="text-green-600 text-xs">Last date: {settings.lastDateAdmission}</p>
            )}
          </div>
        </div>
        <Link
          to="/admin/settings"
          className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-lg font-semibold hover:shadow-sm transition-all"
        >
          Change Status
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <TrendingUp className="w-4 h-4 text-gray-300" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="font-bold text-gray-700 mb-4 text-sm uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map(({ to, icon: Icon, label, desc, color }) => (
            <Link
              key={to}
              to={to}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#006B3F]/20 transition-all group flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}18` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm group-hover:text-[#006B3F] transition-colors">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#006B3F] transition-colors mt-0.5 shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent News */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800 text-sm">Recent News</h2>
          <Link to="/admin/news" className="text-xs text-[#006B3F] hover:text-[#C8A951] font-semibold flex items-center gap-1 transition-colors">
            Manage <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {news.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
              <div className="w-2 h-2 rounded-full bg-[#C8A951] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 truncate">{item.title}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
              <span className="text-xs bg-[#006B3F]/10 text-[#006B3F] px-2 py-0.5 rounded-full shrink-0">{item.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
