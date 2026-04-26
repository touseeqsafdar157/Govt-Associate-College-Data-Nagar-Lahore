import { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, BookOpen, Calendar, Upload, AlertCircle } from "lucide-react";
import { useAdmin, ProgramItem } from "../../context/AdminContext";
import { Skeleton } from "../../components/ui/skeleton";

export function AdminAcademics() {
  const { programs, addProgram, updateProgram, deleteProgram, settings, updateSettings, loading } = useAdmin();

  const [activeTab, setActiveTab] = useState<"programs" | "calendar">("programs");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Program Form
  const [form, setForm] = useState<Omit<ProgramItem, "id">>({
    name: "", category: "Intermediate", duration: "", subjects: "", eligibility: "", fee: "", syllabusUrl: ""
  });

  // Calendar Form
  const [calendarForm, setCalendarForm] = useState(settings?.academicCalendar || {
    firstYear: [{ event: "", date: "" }],
    secondYear: [{ event: "", date: "" }]
  });
  const [calendarSaved, setCalendarSaved] = useState(false);


  const handleEdit = (p: ProgramItem) => {
    setEditingId(p.id);
    setForm({ name: p.name, category: p.category, duration: p.duration, subjects: p.subjects, eligibility: p.eligibility, fee: p.fee, syllabusUrl: p.syllabusUrl });
    setSelectedFile(null);
    setShowModal(true);
  };

  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    // Check if it's a PDF
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file for the syllabus.");
      return;
    }
    const maxSize = 1 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("File size must be less than 1MB");
      e.target.value = ""; // reset input
      return;
    }
    setSelectedFile(file);
  };

  const handleSaveProgram = async () => {
    let finalUrl = form.syllabusUrl;

    if (selectedFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);
      try {
        const res = await fetch("https://govt-associate-college-data-nagar-lahore.onrender.com/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (res.ok) {
          finalUrl = data.url;
        } else {
          alert(data.message || data.error || "Upload failed");
          setUploading(false);
          return;
        }
      } catch (err) {
        console.error(err);
        alert("Upload failed");
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    const finalForm = { ...form, syllabusUrl: finalUrl };

    if (editingId) {
      await updateProgram(editingId, finalForm);
    } else {
      await addProgram(finalForm);
    }
    setShowModal(false);
    setEditingId(null);
    setSelectedFile(null);
  };

  const handleSaveCalendar = async () => {
    await updateSettings({ ...settings, academicCalendar: calendarForm });
    setCalendarSaved(true);
    setTimeout(() => setCalendarSaved(false), 2500);
  };

  const handleDelete = async (id: string) => {
    await deleteProgram(id);
    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Playfair Display, serif" }}>Academics Management</h1>
          <p className="text-gray-500 text-sm">Manage programs, syllabus, and academic calendar</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("programs")}
          className={`pb-3 font-semibold text-sm transition-colors ${activeTab === "programs" ? "border-b-2 border-[#006B3F] text-[#006B3F]" : "text-gray-500 hover:text-[#006B3F]"}`}
        >
          Programs & Syllabus
        </button>
        <button
          onClick={() => setActiveTab("calendar")}
          className={`pb-3 font-semibold text-sm transition-colors ${activeTab === "calendar" ? "border-b-2 border-[#006B3F] text-[#006B3F]" : "text-gray-500 hover:text-[#006B3F]"}`}
        >
          Academic Calendar
        </button>
      </div>

      {activeTab === "programs" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="font-bold text-gray-800 flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#006B3F]" /> Academic Programs</h2>
            <button
              onClick={() => {
                setEditingId(null);
                setForm({ name: "", category: "Intermediate", duration: "", subjects: "", eligibility: "", fee: "", syllabusUrl: "" });
                setSelectedFile(null);
                setShowModal(true);
              }}
              className="flex items-center gap-2 bg-[#006B3F] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#003D1F]"
            >
              <Plus className="w-4 h-4" /> Add Program
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
                <tr>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Duration</th>
                  <th className="p-4 font-semibold">Fee</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="p-4"><Skeleton className="h-5 w-32" /></td>
                      <td className="p-4"><Skeleton className="h-5 w-24" /></td>
                      <td className="p-4"><Skeleton className="h-5 w-20" /></td>
                      <td className="p-4"><Skeleton className="h-5 w-24" /></td>
                      <td className="p-4"><div className="flex justify-end gap-2"><Skeleton className="w-8 h-8 rounded" /><Skeleton className="w-8 h-8 rounded" /></div></td>
                    </tr>
                  ))
                ) : (
                  <>
                    {programs.map((p) => (
                      <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-800">{p.name}</td>
                        <td className="p-4 text-gray-600"><span className="bg-gray-200 px-2 py-1 rounded text-xs">{p.category}</span></td>
                        <td className="p-4 text-gray-600">{p.duration}</td>
                        <td className="p-4 text-[#C8A951] font-medium">{p.fee}</td>
                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleEdit(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {programs.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-500">No programs found. Add a new program.</td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "calendar" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-gray-800 flex items-center gap-2"><Calendar className="w-5 h-5 text-[#006B3F]" /> Academic Calendar 2026-27</h2>
            <button onClick={handleSaveCalendar} className="flex items-center gap-2 bg-[#006B3F] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#003D1F]">
              {calendarSaved ? "Saved!" : "Save Calendar"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-[#006B3F]">First Year / Semester 1 & 2</h3>
                <button onClick={() => {
                  const updated = { ...calendarForm };
                  updated.firstYear.push({ event: "", date: "" });
                  setCalendarForm(updated);
                }} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">Add Row</button>
              </div>
              <div className="space-y-2">
                {calendarForm.firstYear.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <input placeholder="Event (e.g. Mid-Term Exams)" value={item.event} onChange={e => {
                      const updated = { ...calendarForm };
                      updated.firstYear[i].event = e.target.value;
                      setCalendarForm(updated);
                    }} className="flex-1 border rounded px-2 py-1 text-sm" />
                    <input placeholder="Date" value={item.date} onChange={e => {
                      const updated = { ...calendarForm };
                      updated.firstYear[i].date = e.target.value;
                      setCalendarForm(updated);
                    }} className="w-1/3 border rounded px-2 py-1 text-sm" />
                    <button onClick={() => {
                      const updated = { ...calendarForm };
                      updated.firstYear.splice(i, 1);
                      setCalendarForm(updated);
                    }} className="text-red-500 px-2">X</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-[#006B3F]">Second Year / Semester 3 & 4</h3>
                <button onClick={() => {
                  const updated = { ...calendarForm };
                  updated.secondYear.push({ event: "", date: "" });
                  setCalendarForm(updated);
                }} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">Add Row</button>
              </div>
              <div className="space-y-2">
                {calendarForm.secondYear.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <input placeholder="Event" value={item.event} onChange={e => {
                      const updated = { ...calendarForm };
                      updated.secondYear[i].event = e.target.value;
                      setCalendarForm(updated);
                    }} className="flex-1 border rounded px-2 py-1 text-sm" />
                    <input placeholder="Date" value={item.date} onChange={e => {
                      const updated = { ...calendarForm };
                      updated.secondYear[i].date = e.target.value;
                      setCalendarForm(updated);
                    }} className="w-1/3 border rounded px-2 py-1 text-sm" />
                    <button onClick={() => {
                      const updated = { ...calendarForm };
                      updated.secondYear.splice(i, 1);
                      setCalendarForm(updated);
                    }} className="text-red-500 px-2">X</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Program Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="font-bold text-gray-800">{editingId ? "Edit Program" : "Add Program"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:bg-gray-200 p-1 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder="e.g. FSc Pre-Medical" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as "Intermediate" | "ADP" })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none">
                    <option value="Intermediate">Intermediate</option>
                    <option value="ADP">ADP (Associate Degree)</option>
                  </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder="e.g. 2 Years" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fee per Year</label>
                  <input value={form.fee} onChange={e => setForm({ ...form, fee: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder="e.g. PKR 15,000/year" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Criteria</label>
                  <input value={form.eligibility} onChange={e => setForm({ ...form, eligibility: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder="e.g. Matric with Science (Minimum 60% marks)" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subjects Covered</label>
                  <textarea value={form.subjects} onChange={e => setForm({ ...form, subjects: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#006B3F] outline-none resize-none" rows={2} placeholder="List main subjects..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Syllabus PDF (Optional)</label>
                  <div className="flex items-center gap-3">
                    {(selectedFile || form.syllabusUrl) ? (
                      <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-sm flex-1">
                        <span className="truncate flex-1">
                          {selectedFile ? `Selected: ${selectedFile.name}` : `Uploaded: ${form.syllabusUrl.split('/').pop()}`}
                        </span>
                        <button onClick={() => { setForm({ ...form, syllabusUrl: "" }); setSelectedFile(null); }} className="text-red-500 font-bold px-2 py-0.5 hover:bg-red-50 rounded">Remove</button>
                      </div>
                    ) : (
                      <label className={`flex-1 border-2 border-dashed border-gray-300 rounded-lg px-4 py-3 text-center cursor-pointer transition-colors ${uploading ? "bg-gray-50 opacity-50" : "hover:bg-gray-50"}`}>
                        <div className="flex flex-col items-center gap-1">
                          <Upload className="w-5 h-5 text-gray-400" />
                          <span className="text-sm font-medium text-gray-600">
                            {uploading ? "Uploading..." : "Click to select syllabus (PDF)"}
                          </span>
                        </div>
                        <input type="file" accept="application/pdf" className="hidden" onChange={handleFileSelect} disabled={uploading} />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">If a PDF is selected, it will be uploaded when you click Save.</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button onClick={() => { setShowModal(false); setSelectedFile(null); }} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleSaveProgram} disabled={uploading} className="px-6 py-2 text-sm font-bold text-white bg-[#006B3F] hover:bg-[#003D1F] rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50">
                {uploading ? "Uploading..." : <><Save className="w-4 h-4" /> {editingId ? "Update" : "Save"} Program</>}
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
            <h3 className="font-bold text-gray-800 mb-1">Delete Program?</h3>
            <p className="text-gray-500 text-sm mb-5">This will permanently remove this program and its syllabus. This cannot be undone.</p>
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


