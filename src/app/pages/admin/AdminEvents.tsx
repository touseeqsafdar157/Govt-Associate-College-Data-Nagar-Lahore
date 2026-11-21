import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, AlertCircle, Calendar } from "lucide-react";
import { useAdmin, EventItem } from "../../context/AdminContext";
import { Skeleton } from "../../components/ui/skeleton";

const todayISO = () => new Date().toISOString().split("T")[0];

const blank = { dateISO: todayISO(), title: "", time: "", location: "" };

const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

// Extract day ("5") and month ("MAY") from ISO date string
const extractDayMonth = (iso: string) => {
  if (!iso) return { day: "", month: "MAY" };
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return { day: "", month: "MAY" };
  return {
    day: String(d.getDate()),
    month: MONTHS[d.getMonth()],
  };
};

const formatEventDate = (iso: string) => {
  if (!iso) return "";
  const { day, month } = extractDayMonth(iso);
  const year = iso.split("-")[0];
  return `${month.charAt(0) + month.slice(1).toLowerCase()} ${day}, ${year}`;
};

export const getDisplayEventDate = (item: { day?: string; month?: string; date?: string; dateISO?: string }) => {
  let day = item.day;
  let month = item.month;
  if (!day || !month) {
    if (item.dateISO) {
      const parts = extractDayMonth(item.dateISO);
      day = day || parts.day;
      month = month || parts.month;
    } else if (item.date) {
      const d = new Date(item.date);
      if (!isNaN(d.getTime())) {
        day = day || String(d.getDate());
        month = month || MONTHS[d.getMonth()];
      } else {
        const match = item.date.match(/([a-zA-Z]+)\s+(\d{1,2})|(\d{1,2})\s+([a-zA-Z]+)/);
        if (match) {
          if (match[1] && match[2]) {
            month = month || match[1].slice(0, 3).toUpperCase();
            day = day || match[2];
          } else if (match[3] && match[4]) {
            day = day || match[3];
            month = month || match[4].slice(0, 3).toUpperCase();
          }
        }
      }
    }
  }
  return {
    day: day || "—",
    month: month || "EVENT",
    fullDate: item.date || (item.dateISO ? formatEventDate(item.dateISO) : "")
  };
};

type FormState = { dateISO: string; title: string; time: string; location: string };

export function AdminEvents() {
  const { events, addEvent, updateEvent, deleteEvent, loading } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({ ...blank, dateISO: todayISO() });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const openAdd = () => { setForm({ ...blank, dateISO: todayISO() }); setEditingId(null); setShowForm(true); };
  
  const openEdit = (item: EventItem) => {
    let dateISO = item.dateISO || "";
    if (!dateISO && item.date) {
      const parsed = new Date(item.date);
      if (!isNaN(parsed.getTime())) {
        dateISO = parsed.toISOString().split("T")[0];
      }
    }
    if (!dateISO) {
      const mIdx = MONTHS.indexOf(item.month?.toUpperCase() ?? "");
      const year = new Date().getFullYear();
      const mm = String(mIdx >= 0 ? mIdx + 1 : new Date().getMonth() + 1).padStart(2, "0");
      const dd = String(item.day || new Date().getDate()).padStart(2, "0");
      dateISO = `${year}-${mm}-${dd}`;
    }
    setForm({ dateISO, title: item.title, time: item.time || "", location: item.location || "" });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.dateISO) return;
    setIsSaving(true);
    try {
      const { day, month } = extractDayMonth(form.dateISO);
      const entry = {
        date: formatEventDate(form.dateISO),
        dateISO: form.dateISO,
        month,
        day,
        title: form.title,
        time: form.time,
        location: form.location,
        description: form.title,
      };
      if (editingId) {
        await updateEvent(editingId, entry);
      } else {
        await addEvent(entry);
      }
      setShowForm(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      alert("Failed to save event: " + (err.message || "Unknown error"));
    } finally {
      setIsSaving(false);
    }
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
          <p className="text-gray-500 text-sm mt-0.5">{loading ? "Loading events..." : `${events.length} events scheduled`}</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#0284C7] hover:bg-[#0369A1] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
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
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Event name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
                <input
                  type="date"
                  value={form.dateISO}
                  onChange={(e) => setForm({ ...form, dateISO: e.target.value })}
                  max="2099-12-31"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                />
                {form.dateISO && (
                  <p className="text-xs text-gray-400 mt-1">
                    Will show as: <span className="text-[#0284C7] font-medium">{formatEventDate(form.dateISO)}</span>
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input value={form.time} type="time" onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="e.g. 9:00 AM" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Venue" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button onClick={handleSave} disabled={isSaving || !form.title.trim() || !form.dateISO} className="flex-1 bg-[#0284C7] hover:bg-[#0369A1] text-white py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50">
                {isSaving ? "Saving..." : (editingId ? "Save Changes" : "Add Event")}
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
            <p className="text-gray-500 text-sm mb-5">Are you sure you want to delete this event? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-300 py-2 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4">
              <Skeleton className="w-14 h-14 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <div className="flex gap-1 shrink-0">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <Skeleton className="w-8 h-8 rounded-lg" />
              </div>
            </div>
          ))
        ) : (
          <>
            {events.map((item) => {
              const { day, month, fullDate } = getDisplayEventDate(item);
              return (
                <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all flex gap-4">
                  <div className="bg-gradient-to-br from-[#0284C7] to-[#0369A1] text-white text-center p-3 rounded-xl min-w-[56px] shrink-0">
                    <p className="text-xl font-bold leading-none">{day}</p>
                    <p className="text-[10px] mt-0.5 opacity-80">{month}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                    {fullDate && <p className="text-xs text-[#0284C7] font-medium mt-0.5">{fullDate}</p>}
                    <p className="text-xs text-gray-500 mt-0.5">{item.time} {item.location && `· ${item.location}`}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => openEdit(item)} className="p-1.5 text-[#0284C7] hover:bg-[#0284C7]/10 rounded-lg transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              );
            })}
            {events.length === 0 && (
              <div className="col-span-2 text-center py-12 text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No events scheduled. Add one!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
