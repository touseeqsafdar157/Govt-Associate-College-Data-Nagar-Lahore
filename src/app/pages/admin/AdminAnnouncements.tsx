import { useState } from "react";
import { Plus, Trash2, Check, ToggleLeft, ToggleRight, Bell } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

export function AdminAnnouncements() {
  const { announcements, setAnnouncements } = useAdmin();
  const [newText, setNewText] = useState("");
  const [saved, setSaved] = useState(false);

  const addAnnouncement = () => {
    if (!newText.trim()) return;
    setAnnouncements([...announcements, { id: Date.now().toString(), text: newText.trim(), active: true }]);
    setNewText("");
    showSaved();
  };

  const toggleActive = (id: string) => {
    setAnnouncements(announcements.map((a) => a.id === id ? { ...a, active: !a.active } : a));
    showSaved();
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
    showSaved();
  };

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Playfair Display, serif" }}>Ticker Announcements</h1>
        <p className="text-gray-500 text-sm mt-0.5">These announcements scroll in the header bar of the website.</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 mb-4 text-sm">
          <Check className="w-4 h-4" /> Changes saved!
        </div>
      )}

      {/* Add new */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
        <h2 className="font-semibold text-gray-800 text-sm mb-3">Add New Announcement</h2>
        <div className="flex gap-3">
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addAnnouncement()}
            placeholder="e.g. 🎓 Admissions Open 2026-27 — Last date: May 31, 2026"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
          />
          <button
            onClick={addAnnouncement}
            disabled={!newText.trim()}
            className="flex items-center gap-2 bg-[#006B3F] hover:bg-[#003D1F] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 shrink-0"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">Tip: Use emojis at the start (e.g. 📢 🎓 ⚽) to make it visually engaging.</p>
      </div>

      {/* List */}
      <div className="space-y-3">
        {announcements.map((item) => (
          <div key={item.id} className={`bg-white rounded-xl p-4 shadow-sm border transition-all ${item.active ? "border-[#006B3F]/20" : "border-gray-100 opacity-60"}`}>
            <div className="flex items-center gap-3">
              <Bell className={`w-4 h-4 shrink-0 ${item.active ? "text-[#C8A951]" : "text-gray-300"}`} />
              <p className="flex-1 text-sm text-gray-700 min-w-0">{item.text}</p>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {item.active ? "Active" : "Hidden"}
                </span>
                <button
                  onClick={() => toggleActive(item.id)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  title={item.active ? "Deactivate" : "Activate"}
                >
                  {item.active
                    ? <ToggleRight className="w-5 h-5 text-[#006B3F]" />
                    : <ToggleLeft className="w-5 h-5 text-gray-400" />
                  }
                </button>
                <button onClick={() => deleteAnnouncement(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {announcements.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No announcements yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
