import { useState, useEffect } from "react";
import { Trash2, X, Eye, Check, AlertCircle, ClipboardList, ChevronDown } from "lucide-react";
import { Skeleton } from "../../components/ui/skeleton";

const API = "https://govt-associate-college-data-nagar-lahore.onrender.com/api";
const STATUSES = ["All","Pending","Reviewed","Accepted","Rejected"];
const STATUS_COLORS: Record<string,string> = {
  Pending:"bg-yellow-100 text-yellow-700",
  Reviewed:"bg-blue-100 text-blue-700",
  Accepted:"bg-green-100 text-green-700",
  Rejected:"bg-red-100 text-red-700",
};

export function AdminApplications() {
  const [apps, setApps] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [viewApp, setViewApp] = useState<any|null>(null);
  const [deleteId, setDeleteId] = useState<string|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchApps(); }, [filter]);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const url = filter==="All" ? `${API}/applications` : `${API}/applications?status=${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      setApps(Array.isArray(data) ? data : []);
    } catch { setApps([]); }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${API}/applications/${id}/status`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify({status}) });
    setApps(prev => prev.map(a => a._id===id ? {...a,status} : a));
    if (viewApp?._id===id) setViewApp({...viewApp,status});
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API}/applications/${id}`, { method:"DELETE" });
    setApps(prev => prev.filter(a => a._id!==id));
    setDeleteId(null); setViewApp(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{fontFamily:"Playfair Display,serif"}}>Admission Applications</h1>
          <p className="text-gray-500 text-sm mt-0.5">{loading ? "Loading applications..." : `${apps.length} applications`}</p>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUSES.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter===s?"bg-[#006B3F] text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <Skeleton className="w-20 h-6 rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <Skeleton className="w-8 h-8 rounded-lg" />
              </div>
            </div>
          ))
        ) : (
          <>
            {apps.map(app => (
              <div key={app._id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-wrap items-center gap-3">
                {/* Photo */}
                <div className="w-12 h-12 rounded-full bg-[#006B3F]/10 overflow-hidden border-2 border-[#006B3F]/10 shrink-0">
                  {app.photoUrl ? <img src={app.photoUrl} alt={app.name} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-[#006B3F] font-bold text-lg">{app.name?.[0]}</div>}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm">{app.name}</p>
                  <p className="text-xs text-gray-500">{app.program} · {app.phone}</p>
                  <p className="text-xs text-gray-400">{new Date(app.appliedAt).toLocaleDateString("en-PK",{day:"numeric",month:"short",year:"numeric"})}</p>
                </div>
                {/* Status badge */}
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[app.status]||""}`}>{app.status}</span>
                {/* Actions */}
                <div className="flex gap-2">
                  <button onClick={() => setViewApp(app)} className="p-2 text-[#006B3F] hover:bg-[#006B3F]/10 rounded-lg transition-colors" title="View">
                    <Eye className="w-4 h-4"/>
                  </button>
                  <button onClick={() => setDeleteId(app._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4"/>
                  </button>
                </div>
              </div>
            ))}
            {apps.length===0 && (
              <div className="text-center py-12 text-gray-400">
                <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-30"/>
                <p className="text-sm">Koi application nahi mili.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* View Application Modal */}
      {viewApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800">Application Detail</h2>
              <button onClick={() => setViewApp(null)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4"/></button>
            </div>
            <div className="p-5 space-y-5">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[#006B3F]/10 overflow-hidden border-4 border-[#006B3F]/10 shrink-0">
                  {viewApp.photoUrl ? <img src={viewApp.photoUrl} alt={viewApp.name} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-[#006B3F] font-bold text-3xl">{viewApp.name?.[0]}</div>}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{viewApp.name}</h3>
                  <p className="text-sm text-[#006B3F]">{viewApp.program}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[viewApp.status]||""}`}>{viewApp.status}</span>
                  </div>
                </div>
              </div>

              {/* Change Status */}
              <div className="bg-[#F8F9FA] rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Status Update Karein</p>
                <div className="flex flex-wrap gap-2">
                  {["Pending","Reviewed","Accepted","Rejected"].map(s => (
                    <button key={s} onClick={() => updateStatus(viewApp._id, s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${viewApp.status===s?"ring-2 ring-[#006B3F] bg-[#006B3F] text-white":"bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Info */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Personal Information</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Name", viewApp.name], ["Father Name", viewApp.fatherName],
                    ["CNIC/B-Form", viewApp.cnic], ["Date of Birth", viewApp.dob],
                    ["Gender", viewApp.gender], ["Phone", viewApp.phone],
                    ["Email", viewApp.email], ["Address", viewApp.address],
                  ].map(([label,val]) => val ? (
                    <div key={label} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="text-sm font-medium text-gray-800">{val}</p>
                    </div>
                  ) : null)}
                </div>
              </div>

              {/* Academic Info */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Academic Information</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Program Applied", viewApp.program],
                    ["Previous Institution", viewApp.previousInstitution],
                    ["Previous Marks %", viewApp.previousMarks],
                  ].map(([label,val]) => val ? (
                    <div key={label} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="text-sm font-medium text-gray-800">{val}</p>
                    </div>
                  ) : null)}
                </div>
              </div>

              {/* Documents */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Uploaded Documents</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Passport Photo", viewApp.photoUrl],
                    ["Matric Certificate", viewApp.matricCertUrl],
                    ["CNIC Copy", viewApp.cnicCopyUrl],
                    ["Character Certificate", viewApp.characterCertUrl],
                  ].map(([label,url]) => (
                    <div key={label} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 mb-1">{label}</p>
                      {url
                        ? <a href={url} target="_blank" rel="noreferrer" className="text-xs text-[#006B3F] font-semibold underline">View Document</a>
                        : <p className="text-xs text-gray-400 italic">Not uploaded</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button onClick={() => { setDeleteId(viewApp._id); setViewApp(null); }} className="flex items-center gap-1 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-semibold transition-colors">
                <Trash2 className="w-4 h-4"/>Delete Application
              </button>
              <button onClick={() => setViewApp(null)} className="flex-1 border border-gray-300 py-2 rounded-lg text-sm hover:bg-gray-50">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3"/>
            <h3 className="font-bold text-gray-800 mb-1">Delete Application?</h3>
            <p className="text-gray-500 text-sm mb-5">Are you sure you want to delete this application? This cannot be undone.</p>
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

