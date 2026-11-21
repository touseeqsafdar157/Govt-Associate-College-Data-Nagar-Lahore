import { useState } from "react";
import { FileDown, Bell, Award, Clock, MapPin } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { Skeleton } from "../components/ui/skeleton";
import { Helmet } from "react-helmet-async";
import { getDisplayEventDate } from "./admin/AdminEvents";

const CATEGORIES = ["All", "Admissions", "Results", "Sports", "Events", "Academic", "General"];

export function NewsPage() {
  const { news, events, settings, loading } = useAdmin();
  const [activeCategory, setActiveCategory] = useState("All");
  const collegeName = settings?.collegeName || "Govt. Associate College for Women (GACW) Data Nagar Lahore";

  const filtered = activeCategory === "All"
    ? (news || [])
    : (news || []).filter((n) => {
        const cat = (n?.category || "General").trim().toLowerCase();
        return cat === activeCategory.trim().toLowerCase();
      });
  const docs = news?.filter(n => n?.fileUrl) || [];

  return (
    <div className="bg-white">
      <Helmet>
        <title>News & Events | {collegeName}</title>
        <meta name="description" content={`Stay updated with the latest news, announcements, sports events, and notices from ${collegeName}.`} />
      </Helmet>

      {/* Header */}
      {/* Theme: Changed from green bg-gradient-to-r from-[#003D1F] to-[#006B3F] to sky blue */}
      {/* Previous green: from-[#003D1F] to-[#006B3F] */}
      <section className="bg-gradient-to-r from-[#0369A1] to-[#0284C7] text-white py-14 sm:py-20 shadow-md">
        <div className="container mx-auto px-4">
          <span className="text-[#C8A951] text-sm font-semibold uppercase tracking-widest">Stay Informed</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2" style={{ fontFamily: "Playfair Display, serif" }}>
            News & Events
          </h1>
          <p className="text-sky-100 mt-2 text-base max-w-3xl leading-relaxed">
            Stay up to date with official college notices, sports fixtures, academic deadlines, departmental announcements, and upcoming events at GACW Data Nagar.
          </p>
        </div>
      </section>

      {/* Filter */}
      {/* Previous green tint: bg-[#F8FCF9] -> bg-[#F0F9FF]/50 */}
      <section className="bg-[#F0F9FF]/50 py-5 border-b border-sky-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                /* Previous green: bg-[#006B3F] -> bg-[#0284C7] */
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#0284C7] text-white shadow-md"
                    : "bg-white text-gray-700 border border-sky-200 hover:bg-sky-50"
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
            {/* Previous green: text-[#003D1F] -> text-[#082F49] */}
            <h2 className="text-2xl font-bold text-[#082F49] mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
              {activeCategory === "All" ? "All News & Announcements" : `${activeCategory} News`}
              <span className="ml-2 text-sm font-normal text-gray-500">({loading ? "..." : filtered.length})</span>
            </h2>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 border-l-4 border-l-gray-200">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No news in this category.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    /* Previous green: hover:border-[#006B3F]/20 border-l-[#006B3F] -> hover:border-[#0284C7]/20 border-l-[#0284C7] */
                    className="bg-white rounded-xl p-5 shadow-sm border border-sky-100 hover:shadow-md hover:border-[#0284C7]/30 transition-all border-l-4 border-l-[#0284C7]"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {/* Previous green: bg-[#006B3F]/10 text-[#006B3F] -> bg-[#0284C7]/10 text-[#0284C7] */}
                      <span className="text-xs bg-[#0284C7]/10 text-[#0284C7] font-semibold px-2 py-0.5 rounded-full">{item.category}</span>
                      <span className="text-xs text-[#0369A1] font-medium">{item.date}</span>
                    </div>
                    {/* Previous green: hover:text-[#006B3F] -> hover:text-[#0284C7] */}
                    <h3 className="font-bold text-gray-800 mb-1 hover:text-[#0284C7] cursor-pointer transition-colors">{item.title}</h3>
                    {item.content && <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>}
                    {item.fileUrl && (
                      <a href={item.fileUrl} target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-1.5 text-xs text-[#0284C7] font-semibold hover:text-[#0369A1] transition-colors inline-block w-max">
                        <FileDown className="w-3.5 h-3.5" /> Download Attachment
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm border border-sky-100 overflow-hidden">
              {/* Previous green: from-[#003D1F] to-[#006B3F] -> from-[#0369A1] to-[#0284C7] */}
              <div className="bg-gradient-to-r from-[#0369A1] to-[#0284C7] p-4">
                <h3 className="font-bold text-white" style={{ fontFamily: "Playfair Display, serif" }}>
                  Upcoming Events
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {loading ? (
                   [1, 2, 3].map(i => (
                    <div key={i} className="flex gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                      <Skeleton className="h-11 w-11 rounded-lg shrink-0" />
                      <div className="w-full">
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))
                ) : events.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-2">No upcoming events.</p>
                ) : (
                  events.map((event) => {
                    const { day, month, fullDate } = getDisplayEventDate(event);
                    return (
                      <div key={event.id} className="flex gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                        {/* Previous green: from-[#006B3F] to-[#003D1F] -> from-[#0284C7] to-[#0369A1] */}
                        <div className="bg-gradient-to-br from-[#0284C7] to-[#0369A1] text-white text-center p-2 rounded-lg min-w-[48px] shrink-0">
                          <p className="text-base font-bold leading-none">{day}</p>
                          <p className="text-[9px] mt-0.5 opacity-80">{month}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 leading-tight">{event.title}</p>
                          {fullDate && <p className="text-xs text-[#0284C7] font-medium mt-0.5">{fullDate}</p>}
                          <div className="flex flex-wrap gap-2 mt-0.5">
                            {event.time && (
                              <span className="flex items-center gap-0.5 text-xs text-gray-500">
                                <Clock className="w-3 h-3 text-[#0284C7]" /> {event.time}
                              </span>
                            )}
                            {event.location && event.location !== "–" && (
                              <span className="flex items-center gap-0.5 text-xs text-gray-500">
                                <MapPin className="w-3 h-3 text-[#0284C7]" /> {event.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-xl shadow-sm border border-sky-100 overflow-hidden">
              {/* Previous green tint: bg-[#F8FCF9] -> bg-[#F0F9FF]/60 */}
              <div className="bg-[#F0F9FF]/60 p-4 border-b border-sky-100">
                {/* Previous green: text-[#003D1F] -> text-[#082F49] */}
                <h3 className="font-bold text-[#082F49]" style={{ fontFamily: "Playfair Display, serif" }}>
                  Downloads & Forms
                </h3>
              </div>
              <div className="p-3">
                {loading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-8 w-full" />)}
                  </div>
                ) : docs.length === 0 ? (
                  <p className="text-sm text-gray-500 p-2">No downloads available.</p>
                ) : (
                  docs.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sky-50 transition-colors text-left group block"
                    >
                      {/* Previous green: text-[#006B3F] -> text-[#0284C7] */}
                      <FileDown className="w-4 h-4 text-[#0284C7] shrink-0 inline-block" />
                      <span className="text-sm text-gray-700 group-hover:text-[#0284C7] transition-colors leading-tight inline-block align-middle">{doc.title}</span>
                      <span className="float-right mt-1 text-[10px] bg-[#0284C7]/10 text-[#0284C7] px-1.5 py-0.5 rounded shrink-0">DL</span>
                    </a>
                  ))
                )}
              </div>
            </div>

            {/* Achievement highlight */}
            {/* Previous green: from-[#003D1F] to-[#006B3F] -> from-[#082F49] to-[#0369A1] */}
            <div className="bg-gradient-to-br from-[#082F49] to-[#0369A1] rounded-xl p-5 text-white shadow-md">
              <Award className="w-8 h-8 text-[#C8A951] mb-3" />
              <h3 className="font-bold mb-1" style={{ fontFamily: "Playfair Display, serif" }}>Excellence in Women's Education</h3>
              <p className="text-sky-100 text-sm">GACW Data Nagar students achieve top positions in BISE Lahore annual examinations and sports galas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
