import { useState, useMemo } from "react";
import { Microscope, Database, Network, Building2, BookOpen, Clock, Users, BookMarked, Monitor, Wifi, Trophy, Dumbbell, Target } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { Skeleton } from "../components/ui/skeleton";

const ICONS: Record<string, any> = {
  Microscope, Trophy, BookOpen, Network, Database, Dumbbell, Target, Monitor, Wifi, Building2, Users
};

export function LabsPage() {
  const { facilities, settings, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState<"Laboratory" | "Library" | "Sports" | "Other">("Laboratory");

  const labs = useMemo(() => (facilities || [])?.filter(f => f?.category === "Laboratory"), [facilities]);
  const sports = useMemo(() => (facilities || [])?.filter(f => f?.category === "Sports"), [facilities]);
  const others = useMemo(() => (facilities || [])?.filter(f => f?.category === "Other"), [facilities]);
  
  const libraryStats = settings?.libraryStats;
  const libTiming = settings?.libraryInfo?.timing || ["Monday - Friday: 8:00 AM - 4:00 PM", "Saturday: 8:00 AM - 1:00 PM"];
  const libFacilities = settings?.libraryInfo?.facilities || ["High-speed Wi-Fi Access", "Computer Workstations", "Quiet Study Zones", "Photocopier Services"];
  const libRules = settings?.libraryInfo?.rules || [
    "College ID card is mandatory for entry and borrowing books.",
    "Strict silence must be observed inside the library premises.",
    "Books can be issued for a maximum of 14 days.",
    "Use of mobile phones for calls is strictly prohibited."
  ];

  return (
    <div className="bg-white">
      {/* Theme: Sky Blue #0284c7 (Commented previous green: #006B3F) */}
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
          Campus Facilities
        </h1>
        <p className="text-[#C8A951] text-lg max-w-2xl mx-auto">
          State-of-the-art infrastructure to support academic excellence and physical well-being.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-300">
          {(["Laboratory", "Library", "Sports", "Other"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-colors flex items-center gap-2 ${
                activeTab === tab ? "border-b-4 border-[#0284c7] text-[#0284c7]" : "text-gray-600 hover:text-[#0284c7]"
              }`}
            >
              {tab === "Laboratory" && <Microscope className="w-5 h-5" />}
              {tab === "Library" && <BookOpen className="w-5 h-5" />}
              {tab === "Sports" && <Trophy className="w-5 h-5" />}
              {tab === "Other" && <Building2 className="w-5 h-5" />}
              {tab === "Laboratory" ? "Laboratories" : tab === "Other" ? "Other Facilities" : tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="space-y-12">
          
          {/* Laboratories */}
          {activeTab === "Laboratory" && (
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#0284c7] mb-2" style={{ fontFamily: "Playfair Display, serif" }}>Science & Computer Labs</h2>
                <div className="w-20 h-1 bg-[#C8A951] mb-6" />
                <p className="text-gray-600 max-w-3xl">Our college features modern, well-equipped laboratories designed to provide students with hands-on practical experience aligned with the latest curriculum requirements.</p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-start gap-4 mb-6">
                        <Skeleton className="w-14 h-14 rounded-xl" />
                        <div className="flex-1">
                          <Skeleton className="h-7 w-1/2 mb-2" />
                          <Skeleton className="h-4 w-1/4" />
                        </div>
                      </div>
                      <Skeleton className="h-20 w-full mb-6" />
                      <Skeleton className="h-32 w-full rounded-xl" />
                    </div>
                  ))}
                </div>
              ) : (labs?.length || 0) > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {labs?.map((lab) => {
                    const IconComp = ICONS[lab?.iconName] || Microscope;
                    return (
                      <div key={lab?.id} className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow group flex flex-col justify-between overflow-hidden">
                        {/* Image Section */}
                        {lab?.image ? (
                          <div className="w-full h-52 overflow-hidden bg-sky-50 relative">
                            <img
                              src={lab.image}
                              alt={lab?.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            {/* Capacity badge on image */}
                            {lab?.capacity && (
                              <span className="absolute top-3 right-3 bg-[#0284c7] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                👩‍🔬 Capacity: {lab.capacity}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-36 bg-gradient-to-br from-sky-50 to-blue-100 flex flex-col items-center justify-center border-b border-sky-100 relative">
                            <IconComp className="w-10 h-10 text-[#0284c7]/40 mb-2" />
                            <span className="text-xs text-gray-400 italic">No image uploaded yet</span>
                            {lab?.capacity && (
                              <span className="absolute top-3 right-3 bg-[#0284c7] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                👩‍🔬 Capacity: {lab.capacity}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="p-6 flex flex-col flex-1">
                          {/* Title & Icon */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[#0284c7]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                              <IconComp className="w-6 h-6 text-[#0284c7]" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-0.5">{lab?.title}</h3>
                              {lab?.instructor && (
                                <p className="text-xs text-[#0284c7] font-semibold flex items-center gap-1">
                                  <span>👩‍🏫</span> {lab.instructor}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 text-sm mb-5 leading-relaxed">{lab?.description}</p>

                          {/* Equipment List */}
                          {lab?.equipmentList && (lab?.equipmentList?.length || 0) > 0 && (
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mt-auto">
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                                <Database className="w-4 h-4 text-[#0284c7]" /> Key Equipment
                                <span className="ml-auto text-xs text-gray-400 font-normal">{lab.equipmentList.length} items</span>
                              </h4>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {lab?.equipmentList?.map((item: any, idx: number) => (
                                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C8A951] shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">No laboratory data found.</div>
              )}
            </section>
          )}

          {/* Library */}
          {activeTab === "Library" && (
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#0284c7] mb-2" style={{ fontFamily: "Playfair Display, serif" }}>College Library</h2>
                <div className="w-20 h-1 bg-[#C8A951] mb-6" />
                <p className="text-gray-600 max-w-3xl">The central library is a hub of knowledge, offering a vast collection of academic resources, a peaceful study environment, and digital access to empower students' research and learning.</p>
              </div>

              {/* Library Hero Showcase Image — always shown */}
              <div className="mb-8 rounded-2xl overflow-hidden shadow-md border border-sky-100 h-64 sm:h-80 w-full relative group">
                {settings?.libraryImage ? (
                  <img
                    src={settings.libraryImage}
                    alt="GACW College Library"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#024e8f] flex items-center justify-center">
                    <div className="text-center text-white px-6">
                      <BookOpen className="w-20 h-20 mx-auto mb-4 opacity-25" />
                      <p className="text-sm opacity-50 italic">Library photo not uploaded — Add from Admin Panel → Facilities → Library</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex items-end p-6 md:p-8">
                  <div>
                    <span className="bg-[#0284c7] text-white text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow">
                      GACW Central Library
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-2" style={{ fontFamily: "Playfair Display, serif" }}>
                      Knowledge &amp; Research Center
                    </h3>
                    <p className="text-gray-200 text-sm mt-1 max-w-xl">
                      A peaceful sanctuary fostering curiosity, self-study, and research excellence for students and faculty.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-md">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Library Resources</h3>
                    {loading ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center p-4 bg-[#0284c7]/5 rounded-xl border border-[#0284c7]/10">
                          <BookMarked className="w-8 h-8 text-[#0284c7] mx-auto mb-3" />
                          <h4 className="font-bold text-2xl text-gray-800 mb-1">{libraryStats?.totalBooks || "0"}</h4>
                          <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Total Books</p>
                        </div>
                        <div className="text-center p-4 bg-[#C8A951]/5 rounded-xl border border-[#C8A951]/10">
                          <BookOpen className="w-8 h-8 text-[#C8A951] mx-auto mb-3" />
                          <h4 className="font-bold text-2xl text-gray-800 mb-1">{libraryStats?.journals || "0"}</h4>
                          <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Journals</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                          <Monitor className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                          <h4 className="font-bold text-2xl text-gray-800 mb-1">{libraryStats?.digitalResources || "N/A"}</h4>
                          <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Digital Access</p>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                          <Users className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                          <h4 className="font-bold text-2xl text-gray-800 mb-1">{libraryStats?.seatingCapacity || "0"}</h4>
                          <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Seating</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                      <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#0284c7]" /> Timing
                      </h4>
                      {loading ? (
                        <div className="space-y-2"><Skeleton className="h-5 w-full" /><Skeleton className="h-5 w-5/6" /></div>
                      ) : (
                        libTiming.map((time, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">{time}</p>
                        ))
                      )}
                    </div>
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                      <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                        <Wifi className="w-5 h-5 text-[#0284c7]" /> Facilities
                      </h4>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        {loading ? (
                          [...Array(4)].map((_, i) => <Skeleton key={i} className="h-4 w-full" />)
                        ) : (
                          libFacilities.map((facility, idx) => (
                            <li key={idx}>• {facility}</li>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-[#0284c7] to-[#0369a1] rounded-2xl p-8 text-white shadow-xl">
                    <h3 className="text-xl font-bold mb-6 text-[#C8A951]">Rules & Regulations</h3>
                    <ul className="space-y-4">
                      {loading ? (
                        [...Array(5)].map((_, i) => <Skeleton key={i} className="h-10 w-full opacity-20" />)
                      ) : (
                        libRules.map((rule, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-xs font-bold">{idx + 1}</span>
                            </div>
                            <p className="text-sm opacity-90">{rule}</p>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>

                  {/* Library Photo in Sidebar */}
                  {settings?.libraryImage && (
                    <div className="rounded-2xl overflow-hidden shadow-lg border border-sky-100 group relative">
                      <img
                        src={settings.libraryImage}
                        alt="College Library"
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                        <div>
                          <p className="text-white font-bold text-sm">GACW Library</p>
                          <p className="text-gray-300 text-xs">Quiet study &amp; research zone</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Sports */}
          {activeTab === "Sports" && (
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#0284c7] mb-2" style={{ fontFamily: "Playfair Display, serif" }}>Sports & Recreation</h2>
                <div className="w-20 h-1 bg-[#C8A951] mb-6" />
                <p className="text-gray-600 max-w-3xl">We believe in the holistic development of our students. Our extensive sports facilities—including badminton, athletics track, and table games—encourage physical fitness, teamwork, and healthy competition.</p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-64 w-full rounded-2xl" />)}
                </div>
              ) : sports.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sports.map(sport => {
                    const IconComp = ICONS[sport.iconName] || Trophy;
                    return (
                      <div key={sport.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
                        {sport.image ? (
                          <div className="h-44 w-full overflow-hidden bg-sky-50">
                            <img src={sport.image} alt={sport.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ) : (
                          <div className="h-32 bg-[#0284c7]/5 flex items-center justify-center">
                            <IconComp className="w-16 h-16 text-[#0284c7]/30 group-hover:scale-110 group-hover:text-[#0284c7] transition-all duration-300" />
                          </div>
                        )}
                        <div className="p-6 text-center border-t border-gray-100">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{sport.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{sport.description}</p>
                          {sport.capacity && <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">{sport.capacity}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">No sports facilities data found.</div>
              )}
            </section>
          )}

          {/* Other Facilities */}
          {activeTab === "Other" && (
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#0284c7] mb-2" style={{ fontFamily: "Playfair Display, serif" }}>Campus Amenities</h2>
                <div className="w-20 h-1 bg-[#C8A951] mb-6" />
                <p className="text-gray-600 max-w-3xl">Explore the various other facilities that make campus life convenient, safe, and enjoyable for our students.</p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)}
                </div>
              ) : others.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {others.map(item => {
                    const IconComp = ICONS[item.iconName] || Building2;
                    return (
                      <div key={item.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row hover:shadow-md transition-shadow">
                        {item.image ? (
                          <div className="sm:w-44 h-40 sm:h-auto overflow-hidden bg-sky-50 shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 m-4 rounded-xl bg-[#C8A951]/10 flex items-center justify-center shrink-0 self-center">
                            <IconComp className="w-8 h-8 text-[#C8A951]" />
                          </div>
                        )}
                        <div className="p-5 flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">No additional facilities data found.</div>
              )}
            </section>
          )}

        </div>
      </div>
    </div>
  );
}

