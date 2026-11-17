import { useState } from "react";
import { Calendar, FileDown, CheckCircle } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { Skeleton } from "../components/ui/skeleton";
import { Helmet } from "react-helmet-async";

export function AcademicsPage() {
  const { programs, settings, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState("Intermediate");
  const collegeName = settings?.collegeName || "Govt. Associate College for Women (GACW) Data Nagar Lahore";

  const intermediatePrograms = programs?.filter(p => p?.category === "Intermediate") || [];
  const adpPrograms = programs?.filter(p => p?.category === "ADP") || [];
  
  const currentPrograms = activeTab === "Intermediate" ? intermediatePrograms : adpPrograms;

  const firstYearEvents = settings?.academicCalendar?.firstYear || [];
  const secondYearEvents = settings?.academicCalendar?.secondYear || [];

  const syllabusPrograms = programs?.filter(p => p?.syllabusUrl && p?.syllabusUrl?.trim() !== "") || [];

  return (
    <div className="bg-white">
      <Helmet>
        <title>Academics & Programs | {collegeName}</title>
        <meta name="description" content={`Academic programs, Intermediate, ADP, syllabus and calendar of ${collegeName}.`} />
      </Helmet>
      {/* Page Header */}
      {/* Theme: Changed from green bg-gradient-to-r from-[#006B3F] to-[#004d2d] to sky blue */}
      {/* Previous green: from-[#006B3F] to-[#004d2d] */}
      <section className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white py-16 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Academics
          </h1>
          <p className="text-xl text-[#C8A951]">Explore our comprehensive academic programs at GACW Data Nagar</p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
          <h2 className="text-4xl font-bold text-[#082F49] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Our Programs
          </h2>
          <div className="w-20 h-1 bg-[#0284C7] mb-8" />

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-300">
            <button
              onClick={() => setActiveTab("Intermediate")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "Intermediate"
                  ? "border-b-4 border-[#0284C7] text-[#0284C7]"
                  : "text-gray-600 hover:text-[#0284C7]"
              }`}
            >
              Intermediate Programs (FSc, ICS, FA, ICom)
            </button>
            <button
              onClick={() => setActiveTab("ADP")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "ADP"
                  ? "border-b-4 border-[#0284C7] text-[#0284C7]"
                  : "text-gray-600 hover:text-[#0284C7]"
              }`}
            >
              Associate Degree Programs (ADP)
            </button>
          </div>

          {/* Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-5/6" />
                    <Skeleton className="h-5 w-4/6" />
                    <Skeleton className="h-8 w-1/3 mt-2" />
                  </div>
                </div>
              ))
            ) : currentPrograms.map((program) => (
              <div key={program.id} className="bg-white border border-sky-100 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
                <h3 className="text-2xl font-bold text-[#082F49] mb-4">{program.name}</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <span className="font-semibold text-gray-700 min-w-[100px]">Duration:</span>
                    <span className="text-gray-600">{program.duration}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-gray-700 min-w-[100px]">Subjects:</span>
                    <span className="text-gray-600">{program.subjects}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-gray-700 min-w-[100px]">Eligibility:</span>
                    <span className="text-gray-600">{program.eligibility}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-gray-700 min-w-[100px]">Fee:</span>
                    <span className="text-[#0284C7] font-bold">{program.fee}</span>
                  </div>
                </div>
              </div>
            ))}
            {!loading && currentPrograms.length === 0 && (
              <div className="col-span-1 md:col-span-2 bg-[#F0F9FF]/50 p-8 text-center text-gray-500 rounded-xl border border-sky-100">
                No academic programs available in this category.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      {/* Previous green tint: bg-[#F8F9FA] -> bg-[#F0F9FF]/40 */}
      <section className="py-16 bg-[#F0F9FF]/40">
        <div className="container mx-auto px-4">
          {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
          <h2 className="text-4xl font-bold text-[#082F49] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Academic Calendar 2026-27
          </h2>
          <div className="w-20 h-1 bg-[#0284C7] mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-sky-100">
              <h3 className="text-xl font-bold text-[#082F49] mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#0284C7]" />
                First Year / Semester 1 & 2
              </h3>
              <ul className="space-y-3">
                {loading ? (
                  [...Array(5)].map((_, i) => <Skeleton key={i} className="h-6 w-full" />)
                ) : firstYearEvents.length > 0 ? (
                  firstYearEvents.map((ev, i) => (
                    <li key={i} className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-gray-800">{ev.event}:</span>
                      <span className="text-gray-600">{ev.date}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-400 italic">Calendar not updated yet.</p>
                )}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-sky-100">
              <h3 className="text-xl font-bold text-[#082F49] mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#0284C7]" />
                Second Year / Semester 3 & 4
              </h3>
              <ul className="space-y-3">
                {loading ? (
                  [...Array(5)].map((_, i) => <Skeleton key={i} className="h-6 w-full" />)
                ) : secondYearEvents.length > 0 ? (
                  secondYearEvents.map((ev, i) => (
                    <li key={i} className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-gray-800">{ev.event}:</span>
                      <span className="text-gray-600">{ev.date}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-400 italic">Calendar not updated yet.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Downloads */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
          <h2 className="text-4xl font-bold text-[#082F49] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Syllabus & Course Outlines
          </h2>
          <div className="w-20 h-1 bg-[#0284C7] mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              [...Array(3)].map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)
            ) : syllabusPrograms.length > 0 ? syllabusPrograms.map((program) => (
              <a
                href={program.syllabusUrl}
                target="_blank"
                rel="noreferrer"
                key={program.id}
                className="bg-white border border-sky-100 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  {/* Previous green: text-[#006B3F] -> text-[#0284C7] */}
                  <FileDown className="w-8 h-8 text-[#0284C7] group-hover:-translate-y-1 transition-transform" />
                  <span className="font-semibold text-gray-700">{program.name} Syllabus</span>
                </div>
                <span className="text-xs text-sky-600 border border-sky-200 bg-sky-50 px-2 py-1 rounded">View</span>
              </a>
            )) : (
              <p className="text-gray-500 italic col-span-3">No syllabus files have been uploaded yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Academic Excellence */}
      {/* Previous green tint: bg-[#F8F9FA] -> bg-[#F0F9FF]/40 */}
      <section className="py-16 bg-[#F0F9FF]/40">
        <div className="container mx-auto px-4">
          {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
          <h2 className="text-4xl font-bold text-center text-[#082F49] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Our Academic Commitment
          </h2>
          <div className="w-20 h-1 bg-[#0284C7] mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Qualified Faculty", desc: "100% qualified teachers with advanced degrees and subject specialization" },
              { title: "Modern Science & IT", desc: "Well-equipped laboratories for Physics, Chemistry, Biology, and Computer Science" },
              { title: "Sports & Fitness", desc: "Active training in Badminton, Athletics, and Table Games" },
              { title: "Career Counseling", desc: "Dedicated guidance for higher education and professional career paths" },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center border border-sky-100">
                <CheckCircle className="w-12 h-12 text-[#0284C7] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#082F49] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
