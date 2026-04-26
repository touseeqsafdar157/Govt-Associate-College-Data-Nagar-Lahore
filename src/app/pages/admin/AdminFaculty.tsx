import { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, GraduationCap, Building2, AlertCircle } from "lucide-react";
import { useAdmin, FacultyItem } from "../../context/AdminContext";
import { Skeleton } from "../../components/ui/skeleton";

const DEPARTMENTS = ["Science", "Arts", "Commerce", "Computer", "General"];

export function AdminFaculty() {
  const { faculty, addFaculty, updateFaculty, deleteFaculty, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState<"Teaching" | "Non-Teaching">("Teaching");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const [form, setForm] = useState<Omit<FacultyItem, "id">>({
    name: "", designation: "", qualification: "", dept: "Science",
    subject: "", experience: "", email: "", isHOD: false, staffType: "Teaching"
  });

  const handleEdit = (f: FacultyItem) => {
    setEditingId(f.id);
    setForm({ name: f.name, designation: f.designation, qualification: f.qualification, dept: f.dept, subject: f.subject, experience: f.experience, email: f.email, isHOD: f.isHOD, staffType: f.staffType });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (editingId) {
      await updateFaculty(editingId, form);
    } else {
      await addFaculty(form);
    }
    setShowModal(false);
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    await deleteFaculty(id);
    setDeleteId(null);
  };

  const filteredFaculty = faculty.filter(f => f.staffType === activeTab);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Playfair Display, serif" }}>Faculty & Staff</h1>
          <p className="text-gray-500 text-sm">Manage teaching and non-teaching college staff</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("Teaching")}
          className={`pb-3 font-semibold text-sm transition-colors flex items-center gap-2 ${activeTab === "Teaching" ? "border-b-2 border-[#006B3F] text-[#006B3F]" : "text-gray-500 hover:text-[#006B3F]"}`}
        >
          <GraduationCap className="w-4 h-4" /> Teaching Staff
        </button>
        <button
          onClick={() => setActiveTab("Non-Teaching")}
          className={`pb-3 font-semibold text-sm transition-colors flex items-center gap-2 ${activeTab === "Non-Teaching" ? "border-b-2 border-[#006B3F] text-[#006B3F]" : "text-gray-500 hover:text-[#006B3F]"}`}
        >
          <Building2 className="w-4 h-4" /> Non-Teaching Staff
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="font-bold text-gray-800">{activeTab} Directory</h2>
          <button
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", designation: "", qualification: "", dept: "Science", subject: "", experience: "", email: "", isHOD: false, staffType: activeTab });
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-[#006B3F] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#003D1F]"
          >
            <Plus className="w-4 h-4" /> Add Member
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
              <tr>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Designation</th>
                {activeTab === "Teaching" && <th className="p-4 font-semibold">Department</th>}
                {activeTab === "Teaching" && <th className="p-4 font-semibold">Subject</th>}
                <th className="p-4 font-semibold">Experience</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="p-4"><Skeleton className="h-5 w-32" /></td>
                    <td className="p-4"><Skeleton className="h-5 w-24" /></td>
                    {activeTab === "Teaching" && <td className="p-4"><Skeleton className="h-5 w-20" /></td>}
                    {activeTab === "Teaching" && <td className="p-4"><Skeleton className="h-5 w-24" /></td>}
                    <td className="p-4"><Skeleton className="h-5 w-16" /></td>
                    <td className="p-4"><div className="flex justify-end gap-2"><Skeleton className="w-8 h-8 rounded" /><Skeleton className="w-8 h-8 rounded" /></div></td>
                  </tr>
                ))
              ) : (
                <>
                  {filteredFaculty.map((f) => (
                    <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-medium text-gray-800">{f.name}</p>
                        {f.isHOD && <span className="text-[10px] bg-[#C8A951] text-white px-1.5 py-0.5 rounded font-bold uppercase">HOD</span>}
                      </td>
                      <td className="p-4 text-gray-600">
                        <p>{f.designation}</p>
                        <p className="text-xs text-gray-400">{f.qualification}</p>
                      </td>
                      {activeTab === "Teaching" && <td className="p-4 text-gray-600"><span className="bg-gray-200 px-2 py-1 rounded text-xs">{f.dept}</span></td>}
                      {activeTab === "Teaching" && <td className="p-4 text-gray-600">{f.subject}</td>}
                      <td className="p-4 text-gray-600">{f.experience}</td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleEdit(f)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => setDeleteId(f.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredFaculty.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500">No {activeTab.toLowerCase()} members found.</td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="font-bold text-gray-800">{editingId ? "Edit" : "Add"} {form.staffType} Member</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:bg-gray-200 p-1 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder="e.g. Prof. Dr. Amir Khan" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <input value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder={form.staffType === "Teaching" ? "e.g. Associate Professor" : "e.g. Chief Librarian"} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                  <input value={form.qualification} onChange={e => setForm({ ...form, qualification: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder="e.g. Ph.D. in Physics" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder="e.g. 15 years" />
                </div>
                
                {form.staffType === "Teaching" && (
                  <>
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none">
                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder="e.g. Physics" />
                    </div>
                  </>
                )}

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder="e.g. name@gacdatanagar.edu.pk" />
                </div>
                
                {form.staffType === "Teaching" && (
                  <div className="col-span-2 md:col-span-1 flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.isHOD} onChange={e => setForm({ ...form, isHOD: e.target.checked })} className="w-4 h-4 text-[#006B3F] rounded border-gray-300" />
                      <span className="text-sm font-medium text-gray-700">Is Head of Department (HOD)?</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-6 py-2 text-sm font-bold text-white bg-[#006B3F] hover:bg-[#003D1F] rounded-lg transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" /> {editingId ? "Update" : "Save"} Member
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
            <h3 className="font-bold text-gray-800 mb-1">Remove Faculty Member?</h3>
            <p className="text-gray-500 text-sm mb-5">This action will permanently delete this member from the directory.</p>
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

