import { useState, useMemo } from "react";
import { Mail, GraduationCap, Building2 } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { Skeleton } from "../components/ui/skeleton";

export function FacultyPage() {
  const { faculty, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState<"Teaching" | "Non-Teaching">("Teaching");
  const [selectedDept, setSelectedDept] = useState("All");

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
                    <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 group">
                      <div className="h-48 bg-[#0284c7]/10 flex items-center justify-center relative overflow-hidden">
                        <GraduationCap className="w-20 h-20 text-[#0284c7]/20 group-hover:scale-110 transition-transform duration-500"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                           {hod.email && <a href={`mailto:${hod.email}`} className="text-white flex items-center gap-2 hover:text-[#C8A951]"><Mail className="w-4 h-4"/> Contact</a>}
                        </div>
                      </div>
                      <div className="p-6">
                        <span className="text-xs font-bold text-[#C8A951] uppercase tracking-wider mb-2 block">{formatDept(hod.dept)}</span>
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
                    <div key={idx} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-lg text-gray-800 mb-1">{member.name}</h4>
                      <p className="text-[#0284c7] text-sm font-medium mb-2">{member.designation}</p>
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
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 mb-0.5">{staff.name}</h4>
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
    </div>
  );
}

