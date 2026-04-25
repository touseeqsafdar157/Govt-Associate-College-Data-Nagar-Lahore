import { useState } from "react";
import { BookOpen, Calendar, FileDown, CheckCircle } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export function AcademicsPage() {
  const { programs, settings } = useAdmin();
  const [activeTab, setActiveTab] = useState("Intermediate");

  const intermediatePrograms = programs.filter(p => p.category === "Intermediate");
  const adpPrograms = programs.filter(p => p.category === "ADP");
  
  const currentPrograms = activeTab === "Intermediate" ? intermediatePrograms : adpPrograms;

  const firstYearEvents = settings?.academicCalendar?.firstYear || [];
  const secondYearEvents = settings?.academicCalendar?.secondYear || [];

  const syllabusPrograms = programs.filter(p => p.syllabusUrl && p.syllabusUrl.trim() !== "");

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#006B3F] to-[#004d2d] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Academics
          </h1>
          <p className="text-xl text-[#C8A951]">Explore our comprehensive programs</p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Our Programs
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-300">
            <button
              onClick={() => setActiveTab("Intermediate")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "Intermediate"
                  ? "border-b-4 border-[#006B3F] text-[#006B3F]"
                  : "text-gray-600 hover:text-[#006B3F]"
              }`}
            >
              Intermediate Programs
            </button>
            <button
              onClick={() => setActiveTab("ADP")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "ADP"
                  ? "border-b-4 border-[#006B3F] text-[#006B3F]"
                  : "text-gray-600 hover:text-[#006B3F]"
              }`}
            >
              Associate Degree Programs (ADP)
            </button>
          </div>

          {/* Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPrograms.map((program) => (
              <div key={program.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-[#006B3F] mb-4">{program.name}</h3>
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
                    <span className="text-[#C8A951] font-bold">{program.fee}</span>
                  </div>
                </div>
              </div>
            ))}
            {currentPrograms.length === 0 && (
              <div className="col-span-1 md:col-span-2 bg-gray-50 p-8 text-center text-gray-500 rounded-xl border border-gray-100">
                Loading academic programs or none available yet...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Academic Calendar 2026-27
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#006B3F] mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                First Year / Semester 1 & 2
              </h3>
              <ul className="space-y-3">
                {firstYearEvents.map((ev, i) => (
                  <li key={i} className="flex justify-between border-b pb-2">
                    <span className="font-semibold">{ev.event}:</span>
                    <span className="text-gray-600">{ev.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#006B3F] mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Second Year / Semester 3 & 4
              </h3>
              <ul className="space-y-3">
                {secondYearEvents.map((ev, i) => (
                  <li key={i} className="flex justify-between border-b pb-2">
                    <span className="font-semibold">{ev.event}:</span>
                    <span className="text-gray-600">{ev.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Downloads */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Syllabus & Course Outlines
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {syllabusPrograms.length > 0 ? syllabusPrograms.map((program) => (
              <a
                href={program.syllabusUrl}
                target="_blank"
                rel="noreferrer"
                key={program.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <FileDown className="w-8 h-8 text-[#006B3F] group-hover:-translate-y-1 transition-transform" />
                  <span className="font-semibold text-gray-700">{program.name} Syllabus</span>
                </div>
                <span className="text-xs text-gray-500 border border-gray-200 px-2 py-1 rounded">View</span>
              </a>
            )) : (
              <p className="text-gray-500 italic col-span-3">No syllabus files have been uploaded yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Academic Excellence */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Our Academic Commitment
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Qualified Faculty", desc: "100% qualified teachers with advanced degrees" },
              { title: "Modern Teaching", desc: "Interactive classrooms with multimedia support" },
              { title: "Regular Assessment", desc: "Continuous evaluation and feedback system" },
              { title: "Career Counseling", desc: "Guidance for higher education and careers" },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <CheckCircle className="w-12 h-12 text-[#C8A951] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#006B3F] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
