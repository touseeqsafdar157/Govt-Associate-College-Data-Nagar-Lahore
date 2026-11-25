import { useState, useMemo } from "react";
import { Mail, GraduationCap, Building2, X, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { Skeleton } from "../components/ui/skeleton";

export function FacultyPage() {
  const { faculty, loading, sendFacultyQuery, settings } = useAdmin();
  const [activeTab, setActiveTab] = useState<"Teaching" | "Non-Teaching">("Teaching");
  const [selectedDept, setSelectedDept] = useState("All");

  // Query / Email modal state
  const [selectedFaculty, setSelectedFaculty] = useState<any | null>(null);
  const [queryForm, setQueryForm] = useState({ name: "", email: "", phone: "", subject: "", description: "" });
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sentRecipient, setSentRecipient] = useState({ name: "", email: "" });

  const openEmailModal = (member: any) => {
    setSelectedFaculty(member);
    setQueryForm({ name: "", email: "", phone: "", subject: "", description: "" });
    setSendSuccess(false);
    setSendError("");
    setSentRecipient({ name: "", email: "" });
  };

  const handleSendQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryForm.name.trim() || !queryForm.email.trim() || !queryForm.subject.trim() || !queryForm.description.trim()) {
      setSendError("Please fill in all required fields.");
      return;
    }

    setSending(true);
    setSendError("");
    try {
      const targetEmail = selectedFaculty?.email?.trim() || settings?.email || "datanagargacw@gmail.com";
      
      const res = await sendFacultyQuery({
        facultyId: selectedFaculty?.id,
        facultyName: selectedFaculty?.name,
        facultyEmail: targetEmail,
        senderName: queryForm.name.trim(),
        senderEmail: queryForm.email.trim(),
        senderPhone: queryForm.phone?.trim() || "",
        subject: queryForm.subject.trim(),
        message: queryForm.description.trim(),
        department: formatDept(selectedFaculty?.dept),
        designation: selectedFaculty?.designation
      });

      setSentRecipient({
        name: selectedFaculty?.name,
        email: res?.facultyEmail || targetEmail
      });
      setSendSuccess(true);
    } catch (err: any) {
      setSendError(err?.message || "Failed to deliver your email and query. Please check your network and try again.");
    } finally {
      setSending(false);
    }
  };

  const teachingStaff = useMemo(() => (faculty || [])?.filter(f => f?.staffType === "Teaching"), [faculty]);
  const nonTeachingStaff = useMemo(() => (faculty || [])?.filter(f => f?.staffType === "Non-Teaching"), [faculty]);

  // Helper to display "General Science" instead of "General"
  const formatDept = (d?: string) => {
    if (!d) return "";
    if (d.trim().toLowerCase() === "general") return "General Science";
    return d;
  };

  // Extract unique departments dynamically from teaching staff
  const departments = useMemo(() => {
    const depts = new Set<string>();
    teachingStaff?.forEach(f => {
      if (f?.dept) depts.add(formatDept(f.dept));
    });
    return ["All", ...Array.from(depts)];
  }, [teachingStaff]);

  const hods = useMemo(() => teachingStaff?.filter(f => f?.isHOD), [teachingStaff]);
  
  const filteredHods = useMemo(() => {
    if (selectedDept === "All") return hods;
    return hods?.filter(h => formatDept(h?.dept) === selectedDept);
  }, [hods, selectedDept]);

  const filteredTeachingStaff = useMemo(() => {
    // Exclude HODs from the main list so they don't appear twice if they are already in the HOD section
    const nonHods = teachingStaff?.filter(f => !f?.isHOD);
    if (selectedDept === "All") return nonHods;
    return nonHods?.filter(f => formatDept(f?.dept) === selectedDept);
  }, [teachingStaff, selectedDept]);

  return (
    <div className="bg-white">
      {/* Theme: Sky Blue #0284c7 (Commented previous green: #006B3F) */}
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{fontFamily:"Playfair Display,serif"}}>Faculty & Staff</h1>
        <p className="text-[#C8A951] text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Meet our highly qualified, inspiring educators and devoted administrative staff committed to academic distinction, student mentorship, and holistic personal growth.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-12 border-b border-gray-300">
          <button
            onClick={() => setActiveTab("Teaching")}
            className={`px-6 py-3 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === "Teaching" ? "border-b-4 border-[#0284c7] text-[#0284c7]" : "text-gray-600 hover:text-[#0284c7]"
            }`}
          >
            <GraduationCap className="w-5 h-5"/> Teaching Staff
          </button>
          <button
            onClick={() => setActiveTab("Non-Teaching")}
            className={`px-6 py-3 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === "Non-Teaching" ? "border-b-4 border-[#0284c7] text-[#0284c7]" : "text-gray-600 hover:text-[#0284c7]"
            }`}
          >
            <Building2 className="w-5 h-5"/> Non-Teaching Staff
          </button>
        </div>

        {activeTab === "Teaching" ? (
          <>
            {/* Department Filter at the Top */}
            <div className="mb-12 flex flex-wrap gap-2 items-center">
              <span className="font-semibold text-gray-700 mr-2">Filter by Department:</span>
              {loading ? (
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16 rounded-full" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                  <Skeleton className="h-8 w-20 rounded-full" />
                </div>
              ) : (
                departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedDept === dept ? "bg-[#0284c7] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {dept}
                  </button>
                ))
              )}
            </div>

            {/* Heads of Departments Section */}
            {(loading || filteredHods.length > 0) && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-[#0284c7] mb-2" style={{fontFamily:"Playfair Display,serif"}}>Heads of Departments</h2>
                <div className="w-20 h-1 bg-[#C8A951] mb-8"/>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {loading ? (
                    [1, 2, 3].map(i => (
                      <div key={i} className="bg-gray-50 rounded-xl overflow-hidden shadow-md border border-gray-100 p-6">
                        <Skeleton className="h-48 w-full rounded-lg mb-4" />
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-6 w-3/4 mb-1" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ))
                  ) : filteredHods.map((hod, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 group flex flex-col justify-between">
                      <div>
                        <div className="h-48 bg-[#0284c7]/10 flex items-center justify-center relative overflow-hidden">
                          <GraduationCap className="w-20 h-20 text-[#0284c7]/20 group-hover:scale-110 transition-transform duration-500"/>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                            <button
                              type="button"
                              onClick={() => openEmailModal(hod)}
                              className="text-white flex items-center gap-2 hover:text-[#C8A951] text-sm font-semibold transition-colors cursor-pointer bg-black/30 hover:bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-xs"
                            >
                              <Mail className="w-4 h-4"/> Contact {hod.name}
                            </button>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-xs font-bold text-[#C8A951] uppercase tracking-wider block">{formatDept(hod.dept)}</span>
                            {/* <button
                              type="button"
                              onClick={() => openEmailModal(hod)}
                              className="p-1.5 text-[#0284c7] hover:bg-[#0284c7]/10 rounded-lg transition-colors cursor-pointer"
                              title={`Send email to ${hod.name}`}
                            >
                              <Mail className="w-4 h-4" />
                            </button> */}
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{hod.name}</h3>
                          <p className="text-[#0284c7] font-medium mb-3">{hod.designation}</p>
                          {/* Subject Badge */}
                          {(hod.subject || hod.dept) && (
                            <div className="mb-3">
                              <span className="inline-flex items-center gap-1 bg-[#0284c7] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                📚 {hod.subject || formatDept(hod.dept)}
                              </span>
                            </div>
                          )}
                          <div className="space-y-2 text-sm text-gray-600">
                            <p><span className="font-semibold text-gray-800">Qualification:</span> {hod.qualification}</p>
                            <p><span className="font-semibold text-gray-800">Experience:</span> {hod.experience}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Teaching Faculty List */}
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#0284c7] mb-2" style={{fontFamily:"Playfair Display,serif"}}>Faculty Members</h2>
                <div className="w-20 h-1 bg-[#C8A951]"/>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-3" />
                      <Skeleton className="h-3 w-full mb-1" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  ))}
                </div>
              ) : filteredTeachingStaff.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredTeachingStaff.map((member, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <h4 className="font-bold text-lg text-gray-800">{member.name}</h4>
                            <p className="text-[#0284c7] text-sm font-medium">{member.designation}</p>
                          </div>
                         {/* <button
                            type="button"
                            onClick={() => openEmailModal(member)}
                            className="p-2 text-[#0284c7] bg-sky-50 hover:bg-[#0284c7] hover:text-white rounded-lg transition-colors shrink-0 cursor-pointer"
                            title={`Send query to ${member.name}`}
                          >
                            <Mail className="w-4 h-4" />
                          </button>*/}
                        </div>
                        {/* Subject Badge */}
                        {(member.subject || member.dept) && (
                          <div className="mb-3">
                            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200">
                              📚 {member.subject || formatDept(member.dept)}
                            </span>
                          </div>
                        )}
                        <div className="space-y-1.5 text-xs text-gray-600">
                          <p><span className="font-semibold text-gray-800">Department:</span> {formatDept(member.dept)}</p>
                          <p><span className="font-semibold">Qualification:</span> {member.qualification}</p>
                          <p><span className="font-semibold">Experience:</span> {member.experience}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
                  No faculty members found for this department.
                </div>
              )}
            </section>
          </>
        ) : (
          /* Non-Teaching Staff */
          <section>
            <h2 className="text-3xl font-bold text-[#0284c7] mb-2" style={{fontFamily:"Playfair Display,serif"}}>Administrative & Support Staff</h2>
            <div className="w-20 h-1 bg-[#C8A951] mb-8"/>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-start gap-4">
                    <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                    <div className="w-full">
                      <Skeleton className="h-6 w-3/4 mb-1" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : nonTeachingStaff.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {nonTeachingStaff.map((staff, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#0284c7]/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-[#0284c7]"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-lg text-gray-800 mb-0.5">{staff.name}</h4>
                        {/* <button
                          type="button"
                          onClick={() => openEmailModal(staff)}
                          className="p-1.5 text-[#0284c7] hover:bg-sky-50 rounded-lg transition-colors cursor-pointer shrink-0"
                          title={`Send query to ${staff.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </button> */}
                      </div>
                      <p className="text-[#C8A951] text-sm font-medium mb-2">{staff.designation}</p>
                      {staff.experience && <p className="text-xs text-gray-500">Experience: {staff.experience}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
                No staff members found.
              </div>
            )}
          </section>
        )}
      </div>

      {/* Contact / Query Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Send Query to {selectedFaculty.name}</h3>
                  <p className="text-xs text-sky-100">{selectedFaculty.designation} {selectedFaculty.dept ? `· ${formatDept(selectedFaculty.dept)}` : ""}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFaculty(null)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            {sendSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-800">Email & Query Sent!</h4>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Your query and email have been sent directly to <strong>{sentRecipient.name || selectedFaculty.name}</strong> at <span className="font-semibold text-gray-800 underline">{sentRecipient.email || selectedFaculty.email || 'datanagargacw@gmail.com'}</span>.
                </p>
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-xs text-sky-800 text-left space-y-1">
                  <p><strong>Status:</strong> The faculty member will receive this inquiry directly in their inbox. They can reply to your provided email address ({queryForm.email}). A copy is also saved in the college administration records.</p>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedFaculty(null)}
                    className="w-full sm:w-auto bg-[#0284c7] hover:bg-[#0369a1] text-white px-8 py-2.5 rounded-xl font-semibold transition-colors shadow-md cursor-pointer"
                  >
                    Done
                  </button>
                  <a
                    href={`mailto:${sentRecipient.email || selectedFaculty.email || 'datanagargacw@gmail.com'}?subject=${encodeURIComponent('[GACW Query] ' + queryForm.subject.trim())}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto text-xs text-gray-500 hover:text-gray-700 underline text-center"
                  >
                    Also open in local mail client
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendQuery} className="p-6 space-y-4">
                {sendError && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{sendError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={queryForm.name}
                      onChange={(e) => setQueryForm({ ...queryForm, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={queryForm.email}
                      onChange={(e) => setQueryForm({ ...queryForm, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={queryForm.phone}
                    onChange={(e) => setQueryForm({ ...queryForm, phone: e.target.value })}
                    placeholder="03XX-XXXXXXX"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={queryForm.subject}
                    onChange={(e) => setQueryForm({ ...queryForm, subject: e.target.value })}
                    placeholder="e.g. Academic Inquiry / Course Guidance"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Description / Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={queryForm.description}
                    onChange={(e) => setQueryForm({ ...queryForm, description: e.target.value })}
                    placeholder="Type your message or query for this faculty member here..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex-1 bg-[#0284c7] hover:bg-[#0369a1] text-white py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    {sending ? (
                      <>
                        <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Email / Query</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFaculty(null)}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

