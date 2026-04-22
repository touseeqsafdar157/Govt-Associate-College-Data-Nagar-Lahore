import { useState } from "react";
import { Save, Check, Settings } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

export function AdminSettings() {
  const { settings, setSettings } = useAdmin();
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSettings(form);
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Playfair Display, serif" }}>Site Settings</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage college information displayed on the website</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#006B3F] hover:bg-[#003D1F] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 mb-5 text-sm">
          <Check className="w-4 h-4" /> Settings saved successfully!
        </div>
      )}

      <div className="space-y-6">
        {/* Admissions Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#006B3F]" /> Admissions Status
          </h2>
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
              {field("Last Date to Apply", "lastDateAdmission", "text", "e.g. May 31, 2026")}
            </div>
          )}
        </div>

        {/* Principal Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4">Principal Information</h2>
          <div className="space-y-4">
            {field("Principal's Full Name", "principalName", "text", "Prof. Dr. ...")}
            {field("Principal's Message", "principalMessage", "textarea", "Write the welcome message...")}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field("Phone Number", "phone", "text", "042-XXXXXXX")}
            {field("Email Address", "email", "email", "info@...")}
            <div className="sm:col-span-2">
              {field("Full Address", "address", "text", "Street, City, Province, Pakistan")}
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-1">Header Ticker (Backup)</h2>
          <p className="text-xs text-gray-400 mb-4">This is a fallback if no announcements are active. Managed separately via Announcements page.</p>
          {field("Ticker Text", "tickerText", "text", "Important announcement text...")}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#006B3F] hover:bg-[#003D1F] text-white px-8 py-3 rounded-lg text-sm font-semibold transition-colors"
        >
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save All Changes</>}
        </button>
      </div>
    </div>
  );
}
