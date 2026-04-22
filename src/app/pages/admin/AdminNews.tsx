import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, AlertCircle } from "lucide-react";
import { useAdmin, NewsItem } from "../../context/AdminContext";

const CATEGORIES = ["Admissions", "Results", "Sports", "Events", "Academic", "General"];

const blankForm = { title: "", date: "", content: "", category: "General" };

export function AdminNews() {
  const { news, setNews } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(blankForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const openAdd = () => { setForm(blankForm); setEditingId(null); setShowForm(true); };
  const openEdit = (item: NewsItem) => {
    setForm({ title: item.title, date: item.date, content: item.content, category: item.category });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.date.trim()) return;
    if (editingId) {
      setNews(news.map((n) => n.id === editingId ? { ...n, ...form } : n));
    } else {
      setNews([{ id: Date.now().toString(), ...form }, ...news]);
    }
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id: string) => {
    setNews(news.filter((n) => n.id !== id));
    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Playfair Display, serif" }}>News Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">{news.length} articles total</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#006B3F] hover:bg-[#003D1F] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> Add News
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 mb-4 text-sm">
          <Check className="w-4 h-4" /> Changes saved successfully!
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">{editingId ? "Edit News" : "Add News Article"}</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="News article title"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="e.g. April 20, 2026"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="News article content..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F] resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button
                onClick={handleSave}
                disabled={!form.title.trim() || !form.date.trim()}
                className="flex-1 bg-[#006B3F] hover:bg-[#003D1F] text-white py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {editingId ? "Save Changes" : "Add Article"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-1">Delete Article?</h3>
            <p className="text-gray-500 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold transition-colors">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-300 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* News List */}
      <div className="space-y-3">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs bg-[#006B3F]/10 text-[#006B3F] px-2 py-0.5 rounded-full font-medium">{item.category}</span>
                  <span className="text-xs text-[#C8A951] font-medium">{item.date}</span>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                {item.content && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.content}</p>}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => openEdit(item)}
                  className="p-2 text-[#006B3F] hover:bg-[#006B3F]/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteId(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {news.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No news articles yet. Add one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
