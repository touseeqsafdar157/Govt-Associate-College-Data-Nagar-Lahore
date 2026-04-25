import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, AlertCircle, Calendar } from "lucide-react";
import { useAdmin, EventItem } from "../../context/AdminContext";

const todayISO = () => new Date().toISOString().split("T")[0];

const blank = { dateISO: todayISO(), title: "", time: "", location: "" };

// Extract day ("5") and month ("MAY") from ISO date string
const extractDayMonth = (iso: string) => {
  if (!iso) return { day: "", month: "MAY" };
  const d = new Date(iso + "T00:00:00");
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  return {
    day: String(d.getDate()),
    month: months[d.getMonth()],
  };
};

const formatEventDate = (iso: string) => {
  if (!iso) return "";
  const { day, month } = extractDayMonth(iso);
  const year = iso.split("-")[0];
  return `${month.charAt(0) + month.slice(1).toLowerCase()} ${day}, ${year}`;
};

type FormState = { dateISO: string; title: string; time: string; location: string };

export function AdminEvents() {
  const { events, addEvent, updateEvent, deleteEvent } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({ ...blank, dateISO: todayISO() });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const openAdd = () => { setForm({ ...blank, dateISO: todayISO() }); setEditingId(null); setShowForm(true); };
  const openEdit = (item: EventItem) => {
    // Try to reconstruct ISO date from stored day/month or use today
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const mIdx = months.indexOf(item.month?.toUpperCase() ?? "");
    const year = new Date().getFullYear();
    const mm = String(mIdx >= 0 ? mIdx + 1 : new Date().getMonth() + 1).padStart(2, "0");
    const dd = String(item.day || new Date().getDate()).padStart(2, "0");
    const dateISO = `${year}-${mm}-${dd}`;
    setForm({ dateISO, title: item.title, time: item.time, location: item.location });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.dateISO) return;
    const { day, month } = extractDayMonth(form.dateISO);
    const entry = {
      date: formatEventDate(form.dateISO),
      month,
      day,
      title: form.title,
      time: form.time,
      location: form.location,
    };
    if (editingId) {
      await updateEvent(editingId, entry);
    } else {
      await addEvent(entry);
    }
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = async (id: string) => {
    await deleteEvent(id);
    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Playfair Display, serif" }}>Events Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">{events.length} events scheduled</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#006B3F] hover:bg-[#003D1F] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 mb-4 text-sm">
          <Check className="w-4 h-4" /> Changes saved!
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">{editingId ? "Edit Event" : "Add New Event"}</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Event name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
                <input
                  type="date"
                  value={form.dateISO}
                  onChange={(e) => setForm({ ...form, dateISO: e.target.value })}
                  max="2099-12-31"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                />
                {form.dateISO && (
                  <p className="text-xs text-gray-400 mt-1">
                    Will show as: <span className="text-[#006B3F] font-medium">{formatEventDate(form.dateISO)}</span>
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input value={form.time} type="time" onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="e.g. 9:00 AM" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Venue" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button onClick={handleSave} disabled={!form.title.trim() || !form.dateISO} className="flex-1 bg-[#006B3F] hover:bg-[#003D1F] text-white py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50">
                {editingId ? "Save Changes" : "Add Event"}
              </button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-1">Delete Event?</h3>
            <p className="text-gray-500 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-300 py-2 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all flex gap-4">
            <div className="bg-gradient-to-br from-[#006B3F] to-[#003D1F] text-white text-center p-3 rounded-xl min-w-[56px] shrink-0">
              <p className="text-xl font-bold leading-none">{item.day}</p>
              <p className="text-[10px] mt-0.5 opacity-80">{item.month}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.time} {item.location && `· ${item.location}`}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => openEdit(item)} className="p-1.5 text-[#006B3F] hover:bg-[#006B3F]/10 rounded-lg transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
              <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="col-span-2 text-center py-12 text-gray-400">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No events scheduled. Add one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
