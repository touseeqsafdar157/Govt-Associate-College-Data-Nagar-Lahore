import { useState, useMemo } from "react";
import { Microscope, Database, Network, Building2, BookOpen, Clock, Users, BookMarked, Monitor, Wifi, Trophy, Dumbbell, Target } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

const ICONS: Record<string, any> = {
  Microscope, Trophy, BookOpen, Network, Database, Dumbbell, Target, Monitor, Wifi, Building2, Users
};

export function LabsPage() {
  const { facilities, settings } = useAdmin();
  const [activeTab, setActiveTab] = useState<"Laboratory" | "Library" | "Sports" | "Other">("Laboratory");

  const labs = useMemo(() => facilities.filter(f => f.category === "Laboratory"), [facilities]);
  const sports = useMemo(() => facilities.filter(f => f.category === "Sports"), [facilities]);
  const others = useMemo(() => facilities.filter(f => f.category === "Other"), [facilities]);
  
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
      {/* Hero Section */}
      <div className="bg-[#006B3F] py-20 px-4 text-center">
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
                activeTab === tab ? "border-b-4 border-[#006B3F] text-[#006B3F]" : "text-gray-600 hover:text-[#006B3F]"
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
                <h2 className="text-3xl font-bold text-[#006B3F] mb-2" style={{ fontFamily: "Playfair Display, serif" }}>Science & Computer Labs</h2>
                <div className="w-20 h-1 bg-[#C8A951] mb-6" />
                <p className="text-gray-600 max-w-3xl">Our college features modern, well-equipped laboratories designed to provide students with hands-on practical experience aligned with the latest curriculum requirements.</p>
              </div>

              {labs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {labs.map((lab) => {
                    const IconComp = ICONS[lab.iconName] || Microscope;
                    return (
                      <div key={lab.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow group">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-14 h-14 rounded-xl bg-[#006B3F]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <IconComp className="w-7 h-7 text-[#006B3F]" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-1">{lab.title}</h3>
                            {lab.capacity && <p className="text-sm text-[#C8A951] font-semibold">{lab.capacity}</p>}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-6">{lab.description}</p>
                        
                        {lab.equipmentList && lab.equipmentList.length > 0 && (
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                              <Database className="w-4 h-4 text-[#006B3F]" /> Key Equipment
                            </h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {lab.equipmentList.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#C8A951]" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {lab.instructor && (
                          <div className="mt-4 text-sm text-gray-500">
                            <strong>Incharge:</strong> {lab.instructor}
                          </div>
                        )}
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
                <h2 className="text-3xl font-bold text-[#006B3F] mb-2" style={{ fontFamily: "Playfair Display, serif" }}>College Library</h2>
                <div className="w-20 h-1 bg-[#C8A951] mb-6" />
                <p className="text-gray-600 max-w-3xl">The central library is a hub of knowledge, offering a vast collection of academic resources, a peaceful study environment, and digital access to empower students' research and learning.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-md">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Library Resources</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-[#006B3F]/5 rounded-xl border border-[#006B3F]/10">
                        <BookMarked className="w-8 h-8 text-[#006B3F] mx-auto mb-3" />
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                      <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#006B3F]" /> Timing
                      </h4>
                      {libTiming.map((time, idx) => (
                        <p key={idx} className="text-gray-600">{time}</p>
                      ))}
                    </div>
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                      <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                        <Wifi className="w-5 h-5 text-[#006B3F]" /> Facilities
                      </h4>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        {libFacilities.map((facility, idx) => (
                          <li key={idx}>• {facility}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#006B3F] rounded-2xl p-8 text-white shadow-xl">
                  <h3 className="text-xl font-bold mb-6 text-[#C8A951]">Rules & Regulations</h3>
                  <ul className="space-y-4">
                    {libRules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold">{idx + 1}</span>
                        </div>
                        <p className="text-sm opacity-90">{rule}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Sports */}
          {activeTab === "Sports" && (
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#006B3F] mb-2" style={{ fontFamily: "Playfair Display, serif" }}>Sports & Recreation</h2>
                <div className="w-20 h-1 bg-[#C8A951] mb-6" />
                <p className="text-gray-600 max-w-3xl">We believe in the holistic development of our students. Our extensive sports facilities encourage physical fitness, teamwork, and healthy competition.</p>
              </div>

              {sports.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sports.map(sport => {
                    const IconComp = ICONS[sport.iconName] || Trophy;
                    return (
                      <div key={sport.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
                        <div className="h-32 bg-[#006B3F]/5 flex items-center justify-center">
                          <IconComp className="w-16 h-16 text-[#006B3F]/30 group-hover:scale-110 group-hover:text-[#006B3F] transition-all duration-300" />
                        </div>
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
                <h2 className="text-3xl font-bold text-[#006B3F] mb-2" style={{ fontFamily: "Playfair Display, serif" }}>Campus Amenities</h2>
                <div className="w-20 h-1 bg-[#C8A951] mb-6" />
                <p className="text-gray-600 max-w-3xl">Explore the various other facilities that make campus life convenient, safe, and enjoyable for our students.</p>
              </div>

              {others.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {others.map(item => {
                    const IconComp = ICONS[item.iconName] || Building2;
                    return (
                      <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex gap-5 hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 rounded-full bg-[#C8A951]/10 flex items-center justify-center shrink-0">
                          <IconComp className="w-7 h-7 text-[#C8A951]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.description}</p>
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
