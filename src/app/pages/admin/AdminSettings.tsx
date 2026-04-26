import { useState, useEffect } from "react";
import { Save, Check, Settings, Plus, Trash2 } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import { Skeleton } from "../../components/ui/skeleton";

function SectionCard({ title, icon, children }: { title: string; icon?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        {icon && <Settings className="w-4 h-4 text-[#006B3F]" />} {title}
      </h2>
      {children}
    </div>
  );
}

export function AdminSettings() {
  const { settings, updateSettings, loading } = useAdmin();
  const [form, setForm] = useState({ ...(settings || {}) });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm({ ...(settings || {}) });
  }, [settings]);

  const handleSave = async () => {
    await updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const field = (label: string, key: keyof typeof form, type: string = "text", placeholder = "") => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {type === "textarea" ? (
        <textarea
          value={form[key] as string}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          placeholder={placeholder}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F] resize-none"
        />
      ) : (
        <input
          type={type}
          value={form[key] as string}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
        />
      )}
    </div>
  );

  const saveBtn = (
    <button
      onClick={handleSave}
      disabled={loading}
      className="flex items-center gap-2 bg-[#006B3F] hover:bg-[#003D1F] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
    >
      {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
    </button>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Playfair Display, serif" }}>Site Settings</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage college information displayed on the website</p>
        </div>
        {saveBtn}
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 mb-5 text-sm">
          <Check className="w-4 h-4" /> Settings saved successfully!
        </div>
      )}

      {loading ? (
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
              <Skeleton className="h-6 w-1/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Admissions Status */}
          <SectionCard title="Admissions Status" icon="yes">
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setForm({ ...form, admissionsOpen: !form.admissionsOpen })}
                  className={`w-12 h-6 rounded-full transition-all relative cursor-pointer ${form.admissionsOpen ? "bg-[#006B3F]" : "bg-gray-300"}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${form.admissionsOpen ? "left-6" : "left-0.5"}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Admissions are {form.admissionsOpen ? <span className="text-green-600">OPEN</span> : <span className="text-red-500">CLOSED</span>}
                </span>
              </label>
            </div>
            {form.admissionsOpen && (
              <div className="max-w-xs">
                {field("Last Date to Apply", "lastDateAdmission", "date")}
              </div>
            )}
          </SectionCard>

          {/* Principal Info */}
          <SectionCard title="Principal Information">
            <div className="space-y-4">
              {field("Principal's Full Name", "principalName", "text", "Prof. Dr. ...")}
              {field("Principal's Message (Home Page)", "principalMessage", "textarea", "Short welcome message...")}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field("Title / Qualification", "principalTitle", "text", "Ph.D. in ...")}
                {field("Experience", "principalExperience", "text", "30+ Years...")}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Message (About Page)</label>
                <textarea
                  value={form.principalFullMessage as string || ""}
                  onChange={(e) => setForm({ ...form, principalFullMessage: e.target.value })}
                  placeholder="Dear Students, Parents, and Well-wishers..."
                  rows={8}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F] resize-none"
                />
              </div>
            </div>
          </SectionCard>

          {/* Contact Info */}
          <SectionCard title="Contact Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field("Phone Number", "phone", "text", "042-XXXXXXX")}
              {field("Email Address", "email", "email", "info@...")}
              <div className="sm:col-span-2">
                {field("Full Address", "address", "text", "Street, City, Province, Pakistan")}
              </div>
            </div>
          </SectionCard>

          {/* Office Hours */}
          <SectionCard title="Office Hours">
            {field("Office Hours", "officeHours", "textarea", "Monday - Friday...")}
          </SectionCard>

          {/* Eligibility Criteria */}
          <SectionCard title="Eligibility Criteria (Admissions Page)">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-gray-500">Shown on the Admissions page eligibility table</p>
              <button onClick={() => setForm({ ...form, eligibilityCriteria: [...(form.eligibilityCriteria || []), { program: "", qualification: "", marks: "", ageLimit: "" }] })} className="text-sm bg-[#006B3F] text-white px-3 py-1.5 rounded hover:bg-[#003D1F] flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Row
              </button>
            </div>
            <div className="space-y-3">
              {(form.eligibilityCriteria || []).map((row: any, i: number) => (
                <div key={i} className="flex gap-2 items-start p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <input value={row.program} onChange={(e) => { const n = [...(form.eligibilityCriteria || [])]; n[i] = { ...n[i], program: e.target.value }; setForm({ ...form, eligibilityCriteria: n }); }} placeholder="Program" className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                    <input value={row.qualification} onChange={(e) => { const n = [...(form.eligibilityCriteria || [])]; n[i] = { ...n[i], qualification: e.target.value }; setForm({ ...form, eligibilityCriteria: n }); }} placeholder="Qualification" className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                    <input value={row.marks} onChange={(e) => { const n = [...(form.eligibilityCriteria || [])]; n[i] = { ...n[i], marks: e.target.value }; setForm({ ...form, eligibilityCriteria: n }); }} placeholder="Marks" className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                    <input value={row.ageLimit} onChange={(e) => { const n = [...(form.eligibilityCriteria || [])]; n[i] = { ...n[i], ageLimit: e.target.value }; setForm({ ...form, eligibilityCriteria: n }); }} placeholder="Age Limit" className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                  </div>
                  <button onClick={() => { const n = [...(form.eligibilityCriteria || [])]; n.splice(i, 1); setForm({ ...form, eligibilityCriteria: n }); }} className="text-red-500 p-1 mt-1"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Home Page — Stats Strip */}
          <SectionCard title="Home Page — Stats Strip">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-gray-500">Stats shown on homepage (icons: Users, BookOpen, GraduationCap, Award, Shield, Clock)</p>
              <button onClick={() => setForm({ ...form, homeStats: [...(form.homeStats || []), { icon: "Award", value: "", label: "" }] })} className="text-sm bg-[#006B3F] text-white px-3 py-1.5 rounded hover:bg-[#003D1F] flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Stat
              </button>
            </div>
            <div className="space-y-3">
              {(form.homeStats || []).map((stat: any, i: number) => (
                <div key={i} className="flex gap-2 items-center p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <input value={stat.icon} onChange={(e) => { const n = [...(form.homeStats || [])]; n[i] = { ...n[i], icon: e.target.value }; setForm({ ...form, homeStats: n }); }} placeholder="Icon name" className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                    <input value={stat.value} onChange={(e) => { const n = [...(form.homeStats || [])]; n[i] = { ...n[i], value: e.target.value }; setForm({ ...form, homeStats: n }); }} placeholder="e.g. 3,500+" className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                    <input value={stat.label} onChange={(e) => { const n = [...(form.homeStats || [])]; n[i] = { ...n[i], label: e.target.value }; setForm({ ...form, homeStats: n }); }} placeholder="Label" className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                  </div>
                  <button onClick={() => { const n = [...(form.homeStats || [])]; n.splice(i, 1); setForm({ ...form, homeStats: n }); }} className="text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Home Page — Why Choose Us */}
          <SectionCard title="Home Page — Why Choose Us Features">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-gray-500">Feature cards on homepage</p>
              <button onClick={() => setForm({ ...form, homeFeatures: [...(form.homeFeatures || []), { icon: "Award", title: "", desc: "" }] })} className="text-sm bg-[#006B3F] text-white px-3 py-1.5 rounded hover:bg-[#003D1F] flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Feature
              </button>
            </div>
            <div className="space-y-3">
              {(form.homeFeatures || []).map((feat: any, i: number) => (
                <div key={i} className="flex gap-2 items-start p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input value={feat.icon} onChange={(e) => { const n = [...(form.homeFeatures || [])]; n[i] = { ...n[i], icon: e.target.value }; setForm({ ...form, homeFeatures: n }); }} placeholder="Icon name" className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                    <input value={feat.title} onChange={(e) => { const n = [...(form.homeFeatures || [])]; n[i] = { ...n[i], title: e.target.value }; setForm({ ...form, homeFeatures: n }); }} placeholder="Title" className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                    <input value={feat.desc} onChange={(e) => { const n = [...(form.homeFeatures || [])]; n[i] = { ...n[i], desc: e.target.value }; setForm({ ...form, homeFeatures: n }); }} placeholder="Description" className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                  </div>
                  <button onClick={() => { const n = [...(form.homeFeatures || [])]; n.splice(i, 1); setForm({ ...form, homeFeatures: n }); }} className="text-red-500 p-1 mt-1"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* About Page — History Timeline */}
          <SectionCard title="About Page — History Timeline">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-gray-500">Timeline entries shown on the About page</p>
              <button
                onClick={() => setForm({ ...form, aboutHistory: [...(form.aboutHistory || []), { year: "", title: "", description: "" }] })}
                className="text-sm bg-[#006B3F] text-white px-3 py-1.5 rounded hover:bg-[#003D1F] flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Entry
              </button>
            </div>
            <div className="space-y-4">
              {(form.aboutHistory || []).map((item: any, i: number) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg relative">
                  <button onClick={() => { const n = [...(form.aboutHistory || [])]; n.splice(i, 1); setForm({ ...form, aboutHistory: n }); }} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-1">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
                      <input value={item.year} onChange={(e) => { const n = [...(form.aboutHistory || [])]; n[i] = { ...n[i], year: e.target.value }; setForm({ ...form, aboutHistory: n }); }} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                      <input value={item.title} onChange={(e) => { const n = [...(form.aboutHistory || [])]; n[i] = { ...n[i], title: e.target.value }; setForm({ ...form, aboutHistory: n }); }} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                    </div>
                    <div className="sm:col-span-4">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                      <textarea value={item.description} onChange={(e) => { const n = [...(form.aboutHistory || [])]; n[i] = { ...n[i], description: e.target.value }; setForm({ ...form, aboutHistory: n }); }} rows={2} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F] resize-none" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* About Page — Vision & Mission */}
          <SectionCard title="About Page — Vision & Mission">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Vision Statement</label>
                <textarea value={form.aboutVision || ""} onChange={(e) => setForm({ ...form, aboutVision: e.target.value })} rows={3} placeholder="Our vision..." className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F] resize-none" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Mission Points</label>
                  <button onClick={() => setForm({ ...form, aboutMission: [...(form.aboutMission || []), ""] })} className="text-sm bg-[#006B3F] text-white px-3 py-1 rounded hover:bg-[#003D1F] flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {(form.aboutMission || []).map((point: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <input value={point} onChange={(e) => { const n = [...(form.aboutMission || [])]; n[i] = e.target.value; setForm({ ...form, aboutMission: n }); }} placeholder="Mission point..." className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                      <button onClick={() => { const n = [...(form.aboutMission || [])]; n.splice(i, 1); setForm({ ...form, aboutMission: n }); }} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* About Page — Achievements */}
          <SectionCard title="About Page — Achievements & Milestones">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-gray-500">Achievement cards on the About page</p>
              <button onClick={() => setForm({ ...form, achievements: [...(form.achievements || []), { title: "", description: "" }] })} className="text-sm bg-[#006B3F] text-white px-3 py-1.5 rounded hover:bg-[#003D1F] flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Achievement
              </button>
            </div>
            <div className="space-y-3">
              {(form.achievements || []).map((item: any, i: number) => (
                <div key={i} className="flex gap-3 items-start p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input value={item.title} onChange={(e) => { const n = [...(form.achievements || [])]; n[i] = { ...n[i], title: e.target.value }; setForm({ ...form, achievements: n }); }} placeholder="Title (e.g. 98% Success Rate)" className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                    <input value={item.description} onChange={(e) => { const n = [...(form.achievements || [])]; n[i] = { ...n[i], description: e.target.value }; setForm({ ...form, achievements: n }); }} placeholder="Description" className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                  </div>
                  <button onClick={() => { const n = [...(form.achievements || [])]; n.splice(i, 1); setForm({ ...form, achievements: n }); }} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* About Page — Infrastructure */}
          <SectionCard title="About Page — Infrastructure">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">Campus Facilities</label>
                  <button onClick={() => setForm({ ...form, infrastructureCampus: [...(form.infrastructureCampus || []), ""] })} className="text-xs bg-[#006B3F] text-white px-2 py-1 rounded hover:bg-[#003D1F]">+ Add</button>
                </div>
                <div className="space-y-2">
                  {(form.infrastructureCampus || []).map((item: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <input value={item} onChange={(e) => { const n = [...(form.infrastructureCampus || [])]; n[i] = e.target.value; setForm({ ...form, infrastructureCampus: n }); }} className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                      <button onClick={() => { const n = [...(form.infrastructureCampus || [])]; n.splice(i, 1); setForm({ ...form, infrastructureCampus: n }); }} className="text-red-500 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">Support Facilities</label>
                  <button onClick={() => setForm({ ...form, infrastructureSupport: [...(form.infrastructureSupport || []), ""] })} className="text-xs bg-[#006B3F] text-white px-2 py-1 rounded hover:bg-[#003D1F]">+ Add</button>
                </div>
                <div className="space-y-2">
                  {(form.infrastructureSupport || []).map((item: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <input value={item} onChange={(e) => { const n = [...(form.infrastructureSupport || [])]; n[i] = e.target.value; setForm({ ...form, infrastructureSupport: n }); }} className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                      <button onClick={() => { const n = [...(form.infrastructureSupport || [])]; n.splice(i, 1); setForm({ ...form, infrastructureSupport: n }); }} className="text-red-500 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Footer — College Info */}
          <SectionCard title="Footer — College Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field("College Name", "collegeName", "text", "Govt. Associate College")}
              {field("College Location", "collegeLocation", "text", "Data Nagar, Lahore")}
              {field("Established Year", "collegeEstYear", "text", "1981")}
              <div className="sm:col-span-2">
                {field("Short History (Footer)", "collegeShortHistory", "textarea", "Brief history paragraph...")}
              </div>
            </div>
          </SectionCard>

          {/* Footer — Visitor Counter */}
          <SectionCard title="Footer — Visitor Counter">
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Visitor Count</label>
                <input
                  type="number"
                  value={form.totalVisitors || 0}
                  onChange={(e) => setForm({ ...form, totalVisitors: parseInt(e.target.value) || 0 })}
                  className="w-48 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                />
              </div>
              <p className="text-xs text-gray-500 mt-6">This counter auto-increments on each unique visitor session.</p>
            </div>
          </SectionCard>

          {/* Departments */}
          <SectionCard title="Department Contacts">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setForm({ ...form, departments: [...(form.departments || []), { dept: "", name: "", phone: "", email: "" }] })}
                className="text-sm bg-[#006B3F] text-white px-3 py-1.5 rounded hover:bg-[#003D1F]"
              >
                Add Department
              </button>
            </div>
            <div className="space-y-4">
              {form.departments?.map((dept: any, index: number) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                  <button
                    onClick={() => { const newDepts = [...form.departments]; newDepts.splice(index, 1); setForm({ ...form, departments: newDepts }); }}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                      <input value={dept.dept} onChange={(e) => { const n = [...form.departments]; n[index] = { ...n[index], dept: e.target.value }; setForm({ ...form, departments: n }); }} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Contact Person</label>
                      <input value={dept.name} onChange={(e) => { const n = [...form.departments]; n[index] = { ...n[index], name: e.target.value }; setForm({ ...form, departments: n }); }} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                      <input value={dept.phone} onChange={(e) => { const n = [...form.departments]; n[index] = { ...n[index], phone: e.target.value }; setForm({ ...form, departments: n }); }} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                      <input value={dept.email} onChange={(e) => { const n = [...form.departments]; n[index] = { ...n[index], email: e.target.value }; setForm({ ...form, departments: n }); }} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Required Documents */}
          <SectionCard title="Required Admission Documents">
            <div className="flex justify-end mb-4">
              <button onClick={() => setForm({ ...form, requiredDocuments: [...(form.requiredDocuments || []), ""] })} className="text-sm bg-[#006B3F] text-white px-3 py-1.5 rounded hover:bg-[#003D1F]">Add Document</button>
            </div>
            <div className="space-y-3">
              {form.requiredDocuments?.map((doc: string, index: number) => (
                <div key={index} className="flex gap-2 items-center">
                  <input value={doc} onChange={(e) => { const n = [...(form.requiredDocuments || [])]; n[index] = e.target.value; setForm({ ...form, requiredDocuments: n }); }} placeholder="e.g. Matric Certificate (2 copies)" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#006B3F]" />
                  <button onClick={() => { const n = [...(form.requiredDocuments || [])]; n.splice(index, 1); setForm({ ...form, requiredDocuments: n }); }} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">Remove</button>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Ticker */}
          <SectionCard title="Header Ticker (Backup)">
            <p className="text-xs text-gray-400 mb-4">Fallback if no announcements are active.</p>
            {field("Ticker Text", "tickerText", "text", "Important announcement text...")}
          </SectionCard>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-[#006B3F] hover:bg-[#003D1F] text-white px-8 py-3 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
        >
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save All Changes</>}
        </button>
      </div>
    </div>
  );
}
