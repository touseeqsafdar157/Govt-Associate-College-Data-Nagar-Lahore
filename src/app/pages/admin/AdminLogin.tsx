import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap, Lock, Eye, EyeOff, AlertCircle, Mail } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const ok = await login(email, password);
    if (ok) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003D1F] via-[#006B3F] to-[#004d2d] flex items-center justify-center px-4">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #C8A951 0, #C8A951 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#003D1F] to-[#006B3F] p-8 text-center">
            <div className="w-20 h-20 bg-[#C8A951] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <GraduationCap className="w-10 h-10 text-[#003D1F]" />
            </div>
            <h1 className="text-white text-xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
              GAC Admin Portal
            </h1>
            <p className="text-green-200 text-sm mt-1">Government Associate College, Data Nagar</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <h2 className="text-gray-800 font-bold mb-1">Administrator Login</h2>
            <p className="text-gray-500 text-sm mb-6">Enter your credentials to access the dashboard</p>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-5 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Mail className="w-3.5 h-3.5 inline mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gac.edu.pk"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F] focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Lock className="w-3.5 h-3.5 inline mr-1" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F] focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* <p className="text-xs text-gray-400 mt-1">Default: admin@gac.edu.pk / admin@gac123</p> */}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#006B3F] to-[#003D1F] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-60 text-sm"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Login to Admin Panel"
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <a href="/" className="text-sm text-[#006B3F] hover:text-[#C8A951] transition-colors">
                ← Back to College Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
