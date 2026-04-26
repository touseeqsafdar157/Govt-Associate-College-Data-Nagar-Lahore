import { useState, useRef } from "react";
import { Plus, Trash2, X, Check, AlertCircle, Image, Upload } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import { Skeleton } from "../../components/ui/skeleton";

const CATEGORIES = ["Events", "Facilities", "Sports", "Academic", "Campus", "General"];
const blank = { title: "", url: "", category: "General" };

const LOCAL_API = "https://govt-associate-college-data-nagar-lahore.onrender.com/api";

export function AdminGallery() {
  const { gallery, addGalleryItem, deleteGalleryItem, loading } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(blank);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 1 * 1024 * 1024; // 1MB

    if (file.size > maxSize) {
      alert("Image size must be less than 1MB");
      e.target.value = ""; // reset input
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAdd = async () => {
    if (!form.title.trim() || !selectedFile) return;
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      const res = await fetch(`${LOCAL_API}/upload`, { method: "POST", body: formData });
      const data = await res.json();
      if (!data.url) throw new Error("Upload failed");

      await addGalleryItem({ ...form, url: data.url });
      setShowForm(false);
      setForm(blank);
      setPreview(null);
      setSelectedFile(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError("Image upload failed. Make sure backend is running.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteGalleryItem(id);
    setDeleteId(null);
  };

  const resetForm = () => {
    setShowForm(false);
    setForm(blank);
    setPreview(null);
    setSelectedFile(null);
    setError(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Playfair Display, serif" }}>Gallery Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">{loading ? "Loading..." : `${gallery.length} photos in gallery`}</p>
        </div>
        <button
          onClick={() => { setForm(blank); setPreview(null); setSelectedFile(null); setError(null); setShowForm(true); }}
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          [...Array(8)].map((_, i) => (
            <div key={i} className="aspect-video rounded-xl overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
          ))
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Add Photo Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">Add Gallery Photo</h2>
              <button onClick={resetForm} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Annual Sports Day"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image *</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="gallery-file-input"
                />
                {!preview ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-300 hover:border-[#006B3F] rounded-xl p-8 flex flex-col items-center gap-2 transition-colors cursor-pointer group"
                  >
                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#006B3F] transition-colors" />
                    <span className="text-sm text-gray-500 group-hover:text-[#006B3F]">Click to select image from your drive</span>
                    <span className="text-xs text-gray-400">JPG, PNG, WEBP — max 1MB</span>
                  </button>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-gray-200">
                    <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
                    <button
                      type="button"
                      onClick={() => { setPreview(null); setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs px-3 py-1.5 flex justify-between">
                      <span className="truncate">{selectedFile?.name}</span>
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[#C8A951] ml-2 shrink-0">Change</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Category */}
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

              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  {error}
                </div>
              )}
            </div>

            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button
                onClick={handleAdd}
                disabled={!form.title.trim() || !selectedFile || uploading}
                className="flex-1 bg-[#006B3F] hover:bg-[#003D1F] text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <><Upload className="w-4 h-4" /> Upload & Add</>
                )}
              </button>
              <button onClick={resetForm} className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
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
    </div>
  );
}

