import { useState } from "react";
import { Calendar, FileDown, Bell, Award, Clock, MapPin } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

const CATEGORIES = ["All", "Admissions", "Results", "Sports", "Events", "Academic", "General"];

export function NewsPage() {
  const { news, events } = useAdmin();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? news : news.filter((n) => n.category === activeCategory);

  const docs = [
    "Examination Schedule 2026 – All Programs",
    "Admission Policy 2026-27",
    "Fee Concession Application Form",
    "Code of Conduct for Students",
    "Academic Calendar 2026-27",
    "Sports Gala Registration Form",
    "Scholarship Application Guidelines",
    "Library Rules and Regulations",
    "Anti-Ragging Policy Document",
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#003D1F] to-[#006B3F] text-white py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <span className="text-[#C8A951] text-sm font-semibold uppercase tracking-widest">Stay Informed</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2" style={{ fontFamily: "Playfair Display, serif" }}>
            News & Events
          </h1>
          <p className="text-green-200 mt-2">Latest announcements, achievements & upcoming events</p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-[#F8FCF9] py-5 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#006B3F] text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* News List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#003D1F] mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
              {activeCategory === "All" ? "All News & Announcements" : `${activeCategory} News`}
              <span className="ml-2 text-sm font-normal text-gray-500">({filtered.length})</span>
            </h2>

            {filtered.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No news in this category.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#006B3F]/20 transition-all border-l-4 border-l-[#006B3F]"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs bg-[#006B3F]/10 text-[#006B3F] font-semibold px-2 py-0.5 rounded-full">{item.category}</span>
                      <span className="text-xs text-[#C8A951] font-medium">{item.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1 hover:text-[#006B3F] cursor-pointer transition-colors">{item.title}</h3>
                    {item.content && <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>}
                    {item.category === "Admissions" || item.category === "Results" ? (
                      <button className="mt-3 flex items-center gap-1.5 text-xs text-[#006B3F] font-semibold hover:text-[#C8A951] transition-colors">
                        <FileDown className="w-3.5 h-3.5" /> Download PDF
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#003D1F] to-[#006B3F] p-4">
                <h3 className="font-bold text-white" style={{ fontFamily: "Playfair Display, serif" }}>
                  Upcoming Events
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {events.map((event) => (
                  <div key={event.id} className="flex gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="bg-gradient-to-br from-[#006B3F] to-[#003D1F] text-white text-center p-2 rounded-lg min-w-[44px] shrink-0">
                      <p className="text-base font-bold leading-none">{event.day}</p>
                      <p className="text-[9px] mt-0.5 opacity-80">{event.month}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 leading-tight">{event.title}</p>
                      <div className="flex flex-wrap gap-2 mt-0.5">
                        <span className="flex items-center gap-0.5 text-xs text-gray-500">
                          <Clock className="w-3 h-3" /> {event.time}
                        </span>
                        {event.location && event.location !== "–" && (
                          <span className="flex items-center gap-0.5 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" /> {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#F8FCF9] p-4 border-b border-gray-100">
                <h3 className="font-bold text-[#003D1F]" style={{ fontFamily: "Playfair Display, serif" }}>
                  Downloads
                </h3>
              </div>
              <div className="p-3">
                {docs.map((doc, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F8FCF9] transition-colors text-left group"
                  >
                    <FileDown className="w-4 h-4 text-[#006B3F] shrink-0" />
                    <span className="text-sm text-gray-700 group-hover:text-[#006B3F] transition-colors leading-tight">{doc}</span>
                    <span className="ml-auto text-[10px] bg-[#C8A951]/20 text-[#C8A951] px-1.5 py-0.5 rounded shrink-0">PDF</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Achievement highlight */}
            <div className="bg-gradient-to-br from-[#003D1F] to-[#006B3F] rounded-xl p-5 text-white">
              <Award className="w-8 h-8 text-[#C8A951] mb-3" />
              <h3 className="font-bold mb-1" style={{ fontFamily: "Playfair Display, serif" }}>98% Pass Rate</h3>
              <p className="text-green-200 text-sm">Our students achieved exceptional results in BISE Lahore annual examinations 2026.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
