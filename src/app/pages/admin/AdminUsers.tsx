import { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Users, Plus, Trash2, AlertCircle, Check, Mail, Lock, User } from "lucide-react";

export function AdminUsers() {
  const { adminUsers, fetchUsers, addUser, deleteUser, currentUser } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => { fetchUsers(); }, []);

  const handleAdd = async () => {
    if (!form.name || !form.email || !form.password) { setError("All fields are required"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setError("");
    try {
      await addUser(form);
      setForm({ name: "", email: "", password: "" });
      setShowForm(false);
      setSuccess("User created successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to create user");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await deleteUser(id);
      setSuccess("User deleted");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Cannot delete user");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Playfair Display, serif" }}>
            Manage Admin Users
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Create and manage administrator accounts</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setError(""); }}
          className="flex items-center gap-2 bg-[#006B3F] hover:bg-[#003D1F] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 mb-5 text-sm">
          <Check className="w-4 h-4" /> {success}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-5 text-sm">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {/* Add User Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#006B3F]" /> New Admin User
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <User className="w-3 h-3 inline mr-1" /> Full Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Administrator"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Mail className="w-3 h-3 inline mr-1" /> Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="user@gac.edu.pk"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Lock className="w-3 h-3 inline mr-1" /> Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Min 6 characters"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleAdd} className="bg-[#006B3F] hover:bg-[#003D1F] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors">
              Create User
            </button>
            <button onClick={() => { setShowForm(false); setError(""); }} className="border border-gray-300 hover:bg-gray-50 px-5 py-2 rounded-lg text-sm text-gray-600">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 text-sm">All Admin Users ({adminUsers.length})</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {adminUsers.map((user) => (
            <div key={user.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#006B3F] to-[#003D1F] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{user.name?.[0]?.toUpperCase() || "A"}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {user.name}
                    {currentUser?.id === user.id && (
                      <span className="ml-2 text-xs bg-[#C8A951]/20 text-[#C8A951] px-2 py-0.5 rounded-full">You</span>
                    )}
                  </p>
                  <p className="text-gray-500 text-xs">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">{user.role}</span>
                {currentUser?.id !== user.id && (
                  <button
                    onClick={() => handleDelete(user.id, user.name)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
          {adminUsers.length === 0 && (
            <div className="px-6 py-10 text-center text-gray-400 text-sm">No admin users found. Create one to get started.</div>
          )}
        </div>
      </div>
    </div>
  );
}
