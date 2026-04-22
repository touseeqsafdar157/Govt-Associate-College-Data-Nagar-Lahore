import { useState } from "react";
import { Plus, Trash2, X, Check, AlertCircle, Image } from "lucide-react";
import { useAdmin, GalleryItem } from "../../context/AdminContext";

const CATEGORIES = ["Events", "Facilities", "Sports", "Academic", "Campus", "General"];
const blank = { title: "", url: "", category: "General" };

export function AdminGallery() {
  const { gallery, setGallery } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(blank);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleAdd = () => {
    if (!form.title.trim() || !form.url.trim()) return;
    setGallery([...gallery, { id: Date.now().toString(), ...form }]);
    setShowForm(false);
    setForm(blank);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id: string) => {
    setGallery(gallery.filter((g) => g.id !== id));
    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Playfair Display, serif" }}>Gallery Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">{gallery.length} photos in gallery</p>
        </div>
        <button
          onClick={() => { setForm(blank); setShowForm(true); }}
          className="flex items-center gap-2 bg-[#006B3F] hover:bg-[#003D1F] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Photo
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 mb-4 text-sm">
          <Check className="w-4 h-4" /> Gallery updated!
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">Add Gallery Photo</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo Title *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Annual Sports Day" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]" />
                <p className="text-xs text-gray-400 mt-1">Paste a direct image URL (e.g. from Unsplash or Imgur)</p>
              </div>
              {form.url && (
                <div className="rounded-lg overflow-hidden border border-gray-200 h-32">
                  <img src={form.url} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = "")} />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button onClick={handleAdd} disabled={!form.title.trim() || !form.url.trim()} className="flex-1 bg-[#006B3F] hover:bg-[#003D1F] text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50">Add Photo</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-1">Delete Photo?</h3>
            <p className="text-gray-500 text-sm mb-5">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-300 py-2 rounded-lg text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <div key={item.id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="aspect-video overflow-hidden">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold text-gray-700 truncate">{item.title}</p>
              <span className="text-[10px] bg-[#006B3F]/10 text-[#006B3F] px-1.5 py-0.5 rounded-full">{item.category}</span>
            </div>
            <button
              onClick={() => setDeleteId(item.id)}
              className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        {gallery.length === 0 && (
          <div className="col-span-4 text-center py-12 text-gray-400">
            <Image className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No photos yet. Add some!</p>
          </div>
        )}
      </div>
    </div>
  );
}
