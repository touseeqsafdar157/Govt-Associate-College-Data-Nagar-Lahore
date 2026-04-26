import { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Microscope, Trophy, BookOpen, Network, CheckCircle, Database, Video, AlertCircle } from "lucide-react";
import { useAdmin, FacilityItem } from "../../context/AdminContext";
import { Skeleton } from "../../components/ui/skeleton";

const ICONS = [
  { name: 'Microscope', icon: Microscope },
  { name: 'Trophy', icon: Trophy },
  { name: 'BookOpen', icon: BookOpen },
  { name: 'Network', icon: Network },
  { name: 'Database', icon: Database },
  { name: 'Video', icon: Video },
];

export function AdminFacilities() {
  const { facilities, addFacility, updateFacility, deleteFacility, settings, updateSettings, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState<"Laboratory" | "Sports" | "Other" | "Library">("Laboratory");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const [form, setForm] = useState<Omit<FacilityItem, "id">>({
    category: "Laboratory", title: "", description: "", iconName: "Microscope", capacity: "", instructor: "", equipmentList: []
  });

  const [libForm, setLibForm] = useState(settings?.libraryStats || {
    totalBooks: "", journals: "", newspapers: "", digitalResources: "", seatingCapacity: ""
  });
  const [libInfoForm, setLibInfoForm] = useState(settings?.libraryInfo || {
    timing: ["Monday - Friday: 8:00 AM - 4:00 PM", "Saturday: 8:00 AM - 1:00 PM"],
    facilities: ["High-speed Wi-Fi Access", "Computer Workstations", "Quiet Study Zones", "Photocopier Services"],
    rules: ["College ID card is mandatory for entry and borrowing books.", "Strict silence must be observed inside the library premises.", "Books can be issued for a maximum of 14 days.", "Use of mobile phones for calls is strictly prohibited."]
  });
  const [libSaved, setLibSaved] = useState(false);

  const handleEdit = (f: FacilityItem) => {
    setEditingId(f.id);
    setForm({ category: f.category, title: f.title, description: f.description, iconName: f.iconName, capacity: f.capacity, instructor: f.instructor, equipmentList: f.equipmentList || [] });
    setShowModal(true);
  };

  const handleSaveFacility = async () => {
    if (editingId) {
      await updateFacility(editingId, form);
    } else {
      await addFacility(form);
    }
    setShowModal(false);
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    await deleteFacility(id);
    setDeleteId(null);
  };

  const handleSaveLibrary = async () => {
    await updateSettings({ ...settings, libraryStats: libForm, libraryInfo: libInfoForm });
    setLibSaved(true);
    setTimeout(() => setLibSaved(false), 2500);
  };

  const filteredFacilities = facilities.filter(f => f.category === activeTab);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Playfair Display, serif" }}>Facilities Management</h1>
          <p className="text-gray-500 text-sm">Manage labs, sports, library, and other campus facilities</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {(["Laboratory", "Library", "Sports", "Other"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-semibold text-sm transition-colors ${activeTab === tab ? "border-b-2 border-[#006B3F] text-[#006B3F]" : "text-gray-500 hover:text-[#006B3F]"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex gap-4">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        activeTab === "Library" ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-gray-800 flex items-center gap-2"><BookOpen className="w-5 h-5 text-[#006B3F]" /> Library Statistics</h2>
              <button onClick={handleSaveLibrary} className="flex items-center gap-2 bg-[#006B3F] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#003D1F]">
                {libSaved ? "Saved!" : "Save Stats"}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Books</label>
                <input value={libForm.totalBooks} onChange={e => setLibForm({...libForm, totalBooks: e.target.value})} className="w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Journals</label>
                <input value={libForm.journals} onChange={e => setLibForm({...libForm, journals: e.target.value})} className="w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Newspapers</label>
                <input value={libForm.newspapers} onChange={e => setLibForm({...libForm, newspapers: e.target.value})} className="w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Digital Resources</label>
                <input value={libForm.digitalResources} onChange={e => setLibForm({...libForm, digitalResources: e.target.value})} className="w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Seating Capacity</label>
                <input value={libForm.seatingCapacity} onChange={e => setLibForm({...libForm, seatingCapacity: e.target.value})} className="w-full border rounded px-3 py-2 text-sm" />
              </div>

              {/* Library Timing */}
              <div className="col-span-2 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-[#006B3F]">Library Timings</label>
                  <button onClick={() => setLibInfoForm({...libInfoForm, timing: [...libInfoForm.timing, ""]})} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">Add Timing</button>
                </div>
                <div className="space-y-2">
                  {libInfoForm.timing.map((t, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input value={t} onChange={e => {
                        const updated = [...libInfoForm.timing];
                        updated[idx] = e.target.value;
                        setLibInfoForm({...libInfoForm, timing: updated});
                      }} className="flex-1 border rounded px-3 py-2 text-sm" placeholder="e.g. Monday - Friday: 8:00 AM - 4:00 PM" />
                      <button onClick={() => {
                        const updated = [...libInfoForm.timing];
                        updated.splice(idx, 1);
                        setLibInfoForm({...libInfoForm, timing: updated});
                      }} className="text-red-500 px-2 font-bold hover:bg-red-50 rounded">X</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Library Facilities */}
              <div className="col-span-2 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-[#006B3F]">Facilities & Services</label>
                  <button onClick={() => setLibInfoForm({...libInfoForm, facilities: [...libInfoForm.facilities, ""]})} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">Add Facility</button>
                </div>
                <div className="space-y-2">
                  {libInfoForm.facilities.map((f, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input value={f} onChange={e => {
                        const updated = [...libInfoForm.facilities];
                        updated[idx] = e.target.value;
                        setLibInfoForm({...libInfoForm, facilities: updated});
                      }} className="flex-1 border rounded px-3 py-2 text-sm" placeholder="e.g. High-speed Wi-Fi Access" />
                      <button onClick={() => {
                        const updated = [...libInfoForm.facilities];
                        updated.splice(idx, 1);
                        setLibInfoForm({...libInfoForm, facilities: updated});
                      }} className="text-red-500 px-2 font-bold hover:bg-red-50 rounded">X</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Library Rules */}
              <div className="col-span-2 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-[#006B3F]">Rules & Regulations</label>
                  <button onClick={() => setLibInfoForm({...libInfoForm, rules: [...libInfoForm.rules, ""]})} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">Add Rule</button>
                </div>
                <div className="space-y-2">
                  {libInfoForm.rules.map((r, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input value={r} onChange={e => {
                        const updated = [...libInfoForm.rules];
                        updated[idx] = e.target.value;
                        setLibInfoForm({...libInfoForm, rules: updated});
                      }} className="flex-1 border rounded px-3 py-2 text-sm" placeholder="e.g. Silence must be observed" />
                      <button onClick={() => {
                        const updated = [...libInfoForm.rules];
                        updated.splice(idx, 1);
                        setLibInfoForm({...libInfoForm, rules: updated});
                      }} className="text-red-500 px-2 font-bold hover:bg-red-50 rounded">X</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="font-bold text-gray-800">{activeTab} List</h2>
              <button
                onClick={() => {
                  setEditingId(null);
                  setForm({ category: activeTab, title: "", description: "", iconName: "Microscope", capacity: "", instructor: "", equipmentList: [] });
                  setShowModal(true);
                }}
                className="flex items-center gap-2 bg-[#006B3F] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#003D1F]"
              >
                <Plus className="w-4 h-4" /> Add {activeTab}
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFacilities.map(f => {
                const IconComp = ICONS.find(i => i.name === f.iconName)?.icon || CheckCircle;
                return (
                  <div key={f.id} className="border border-gray-200 rounded-lg p-5 relative group hover:border-[#006B3F] transition-colors">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(f)} className="p-1.5 bg-blue-50 text-blue-600 rounded"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteId(f.id)} className="p-1.5 bg-red-50 text-red-600 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#006B3F]/10 flex items-center justify-center shrink-0">
                        <IconComp className="w-6 h-6 text-[#006B3F]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{f.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{f.description}</p>
                        <div className="mt-3 text-xs text-gray-500 space-y-1">
                          {f.instructor && <p><strong>Instructor:</strong> {f.instructor}</p>}
                          {f.capacity && <p><strong>Capacity:</strong> {f.capacity}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredFacilities.length === 0 && <p className="text-gray-500 col-span-2 py-4 text-center">No {activeTab} facilities added yet.</p>}
            </div>
          </div>
        )
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="font-bold text-gray-800">{editingId ? "Edit" : "Add"} {form.category}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:bg-gray-200 p-1 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder="e.g. Physics Lab" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <select value={form.iconName} onChange={e => setForm({ ...form, iconName: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none">
                    {ICONS.map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none resize-none" rows={3} placeholder="Brief description of the facility..." />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (Optional)</label>
                  <input value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder="e.g. 50 Students" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor / Incharge (Optional)</label>
                  <input value={form.instructor} onChange={e => setForm({ ...form, instructor: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder="e.g. Prof. Amir Khan" />
                </div>
                
                {form.category === "Laboratory" && (
                  <div className="col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">Equipment List</label>
                      <button onClick={() => {
                        const updated = [...(form.equipmentList || [])];
                        updated.push("");
                        setForm({...form, equipmentList: updated});
                      }} className="text-xs bg-gray-100 px-2 py-1 rounded">Add Item</button>
                    </div>
                    <div className="space-y-2">
                      {form.equipmentList?.map((eq, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input value={eq} onChange={e => {
                            const updated = [...(form.equipmentList || [])];
                            updated[idx] = e.target.value;
                            setForm({...form, equipmentList: updated});
                          }} className="flex-1 border rounded px-2 py-1 text-sm" placeholder="e.g. Oscilloscopes" />
                          <button onClick={() => {
                            const updated = [...(form.equipmentList || [])];
                            updated.splice(idx, 1);
                            setForm({...form, equipmentList: updated});
                          }} className="text-red-500 px-2">X</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleSaveFacility} className="px-6 py-2 text-sm font-bold text-white bg-[#006B3F] hover:bg-[#003D1F] rounded-lg transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-1">Delete Facility?</h3>
            <p className="text-gray-500 text-sm mb-5">Are you sure you want to remove this facility? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold transition-colors">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-300 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


