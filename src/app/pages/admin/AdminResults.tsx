import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, X, Check, AlertCircle, Upload, UserCircle } from "lucide-react";
import { Skeleton } from "../../components/ui/skeleton";

const CLASSES = ["FSc Pre-Medical","FSc Pre-Engineering","ICS","FA","I.Com","ADP Science","ADP Arts","ADP Commerce"];
const YEARS = ["2026","2025","2024","2023"];
const API = "https://govt-associate-college-data-nagar-lahore.onrender.com/api";

const blankForm = { name:"", rollNumber:"", class:"FSc Pre-Medical", year:"2026", marks:"", totalMarks:"1100", grade:"A+", position:"", status:"Pass" };

export function AdminResults() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterClass, setFilterClass] = useState("FSc Pre-Medical");
  const [filterYear, setFilterYear] = useState("2026");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<any>(blankForm);
  const [photoFile, setPhotoFile] = useState<File|null>(null);
  const [photoPreview, setPhotoPreview] = useState<string|null>(null);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleteId, setDeleteId] = useState<string|null>(null);
  const [error, setError] = useState<string|null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchResults(); }, [filterClass, filterYear]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/results?class=${encodeURIComponent(filterClass)}&year=${filterYear}`);
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch { 
      setResults([]); 
    } finally {
      setLoading(false);
    }
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setPhotoFile(f);
    const r = new FileReader(); r.onloadend = () => setPhotoPreview(r.result as string); r.readAsDataURL(f);
  };

  const handleSave = async () => {
    if (!form.name || !form.rollNumber || !form.marks) { setError("Name, Roll No aur Marks zaruri hain"); return; }
    setUploading(true); setError(null);
    try {
      const fd = new FormData();
      Object.keys(form).forEach(k => fd.append(k, form[k]));
      if (photoFile) fd.append("photo", photoFile);
      const res = await fetch(`${API}/results`, { method:"POST", body: fd });
      if (!res.ok) throw new Error("Failed");
      await fetchResults();
      setShowForm(false); setForm(blankForm); setPhotoFile(null); setPhotoPreview(null);
      setSaved(true); setTimeout(() => setSaved(false), 2000);
    } catch { setError("Upload failed. Backend chal raha hai?"); }
    finally { setUploading(false); }
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API}/results/${id}`, { method:"DELETE" });
    setResults(prev => prev.filter(r => r._id !== id)); setDeleteId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{fontFamily:"Playfair Display,serif"}}>Results Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">{loading ? "Loading..." : `${results.length} students in selected class/year`}</p>
        </div>
        <button onClick={() => { setForm(blankForm); setPhotoFile(null); setPhotoPreview(null); setError(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-[#006B3F] hover:bg-[#003D1F] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          <Plus className="w-4 h-4" /> Add Student Result
        </button>
      </div>

      {saved && <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 mb-4 text-sm"><Check className="w-4 h-4"/>Result added!</div>}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select value={filterClass} onChange={e => setFilterClass(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]">
          {CLASSES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterYear} onChange={e => setFilterYear(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]">
          {YEARS.map(y => <option key={y}>{y}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-[#006B3F] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Photo</th>
              <th className="px-4 py-3 text-left">Roll No</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-center">Marks</th>
              <th className="px-4 py-3 text-center">Grade</th>
              <th className="px-4 py-3 text-center">Position</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className={i%2===0?"bg-gray-50":"bg-white"}>
                  <td className="px-4 py-3"><Skeleton className="w-10 h-10 rounded-full" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-4 w-24" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
                  <td className="px-4 py-3 text-center"><Skeleton className="h-4 w-16 mx-auto" /></td>
                  <td className="px-4 py-3 text-center"><Skeleton className="h-4 w-8 mx-auto" /></td>
                  <td className="px-4 py-3 text-center"><Skeleton className="h-4 w-12 mx-auto" /></td>
                  <td className="px-4 py-3 text-center"><Skeleton className="h-4 w-12 mx-auto" /></td>
                  <td className="px-4 py-3 text-center"><Skeleton className="h-8 w-8 rounded-lg mx-auto" /></td>
                </tr>
              ))
            ) : (
              <>
                {results?.map((r, i) => (
                  <tr key={r?._id} className={i%2===0?"bg-gray-50":"bg-white"}>
                    <td className="px-4 py-3">
                      {r?.photo ? <img src={r?.photo} alt={r?.name} className="w-10 h-10 rounded-full object-cover border-2 border-[#006B3F]/20"/>
                      : <div className="w-10 h-10 rounded-full bg-[#006B3F]/10 flex items-center justify-center"><UserCircle className="w-6 h-6 text-[#006B3F]/40"/></div>}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-700">{r?.rollNumber}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{r?.name}</td>
                    <td className="px-4 py-3 text-center font-semibold">{r?.marks}/{r?.totalMarks}</td>
                    <td className="px-4 py-3 text-center"><span className="bg-[#C8A951] text-white px-2 py-0.5 rounded font-bold text-xs">{r?.grade}</span></td>
                    <td className="px-4 py-3 text-center text-[#006B3F] font-semibold">{r?.position||"-"}</td>
                    <td className="px-4 py-3 text-center"><span className={`px-2 py-0.5 rounded text-xs font-semibold ${r?.status==="Pass"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`}>{r?.status}</span></td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => setDeleteId(r?._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                    </td>
                  </tr>
                ))}
                {results?.length===0 && <tr><td colSpan={8} className="text-center py-12 text-gray-400">Koi result nahi mila. Upar filter check karein ya Add karein.</td></tr>}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800">Add Student Result</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4"/></button>
            </div>
            <div className="p-5 space-y-4">
              {/* Photo Upload */}
              <div className="flex flex-col items-center gap-2">
                <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden"/>
                {photoPreview
                  ? <img src={photoPreview} className="w-24 h-24 rounded-full object-cover border-4 border-[#006B3F]/20 cursor-pointer" onClick={() => fileRef.current?.click()}/>
                  : <button type="button" onClick={() => fileRef.current?.click()} className="w-24 h-24 rounded-full bg-[#006B3F]/10 border-2 border-dashed border-[#006B3F]/30 flex flex-col items-center justify-center gap-1 hover:bg-[#006B3F]/20 transition-colors">
                      <Upload className="w-6 h-6 text-[#006B3F]/50"/>
                      <span className="text-xs text-[#006B3F]/60">Photo</span>
                    </button>}
                <p className="text-xs text-gray-400">Student photo (optional)</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Student Name *</label>
                  <input value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Full name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Roll Number *</label>
                  <input value={form.rollNumber} onChange={e => setForm({...form,rollNumber:e.target.value})} placeholder="e.g. 2026-FSC-001" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Year *</label>
                  <select value={form.year} onChange={e => setForm({...form,year:e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]">
                    {YEARS.map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Class *</label>
                  <select value={form.class} onChange={e => setForm({...form,class:e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]">
                    {CLASSES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Marks Obtained *</label>
                  <input type="number" value={form.marks} onChange={e => setForm({...form,marks:e.target.value})} placeholder="e.g. 1050" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Total Marks</label>
                  <input type="number" value={form.totalMarks} onChange={e => setForm({...form,totalMarks:e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Grade</label>
                  <select value={form.grade} onChange={e => setForm({...form,grade:e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]">
                    {["A+","A","B+","B","C","D","F"].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Position</label>
                  <input value={form.position} onChange={e => setForm({...form,position:e.target.value})} placeholder="e.g. 1st (optional)" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({...form,status:e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]">
                    <option>Pass</option><option>Fail</option>
                  </select>
                </div>
              </div>
              {error && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-xs"><AlertCircle className="w-4 h-4"/>{error}</div>}
            </div>
            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button onClick={handleSave} disabled={uploading} className="flex-1 bg-[#006B3F] hover:bg-[#003D1F] text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
                {uploading ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Saving...</> : <><Check className="w-4 h-4"/>Save Result</>}
              </button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3"/>
            <h3 className="font-bold text-gray-800 mb-1">Delete Result?</h3>
            <p className="text-gray-500 text-sm mb-5">Are you sure you want to delete this result? This cannot be undone.</p>
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

