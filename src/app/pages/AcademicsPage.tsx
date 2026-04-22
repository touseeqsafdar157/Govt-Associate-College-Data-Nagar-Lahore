import { useState } from "react";
import { BookOpen, Calendar, FileDown, CheckCircle } from "lucide-react";

export function AcademicsPage() {
  const [activeTab, setActiveTab] = useState("intermediate");

  const programs = {
    intermediate: [
      {
        name: "FSc Pre-Medical",
        duration: "2 Years",
        subjects: "Physics, Chemistry, Biology, English, Urdu, Islamiyat, Pakistan Studies",
        eligibility: "Matric with Science (Minimum 60% marks)",
        fee: "PKR 15,000/year",
      },
      {
        name: "FSc Pre-Engineering",
        duration: "2 Years",
        subjects: "Physics, Chemistry, Mathematics, English, Urdu, Islamiyat, Pakistan Studies",
        eligibility: "Matric with Science (Minimum 60% marks)",
        fee: "PKR 15,000/year",
      },
      {
        name: "ICS (Computer Science)",
        duration: "2 Years",
        subjects: "Physics, Mathematics, Computer Science, English, Urdu, Islamiyat, Pakistan Studies",
        eligibility: "Matric with Science (Minimum 55% marks)",
        fee: "PKR 18,000/year",
      },
      {
        name: "FA (Arts)",
        duration: "2 Years",
        subjects: "English, Urdu, Islamic Studies, Pakistan Studies, Economics, Civics",
        eligibility: "Matric with any group (Minimum 50% marks)",
        fee: "PKR 12,000/year",
      },
      {
        name: "I.Com (Commerce)",
        duration: "2 Years",
        subjects: "Principles of Commerce, Accounting, Economics, Business Mathematics, English, Urdu",
        eligibility: "Matric with any group (Minimum 50% marks)",
        fee: "PKR 14,000/year",
      },
    ],
    adp: [
      {
        name: "ADP in Sciences",
        duration: "2 Years (4 Semesters)",
        subjects: "Major: Physics/Chemistry/Biology + Electives",
        eligibility: "FSc/FA/ICS (Minimum 45% marks)",
        fee: "PKR 25,000/year",
      },
      {
        name: "ADP in Arts",
        duration: "2 Years (4 Semesters)",
        subjects: "Major: English/Urdu/Islamic Studies + Electives",
        eligibility: "FA/FSc/ICS (Minimum 45% marks)",
        fee: "PKR 22,000/year",
      },
      {
        name: "ADP in Commerce",
        duration: "2 Years (4 Semesters)",
        subjects: "Major: Accounting/Business Administration + Electives",
        eligibility: "I.Com/FSc/FA (Minimum 45% marks)",
        fee: "PKR 24,000/year",
      },
    ],
  };

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
              onClick={() => setActiveTab("intermediate")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "intermediate"
                  ? "border-b-4 border-[#006B3F] text-[#006B3F]"
                  : "text-gray-600 hover:text-[#006B3F]"
              }`}
            >
              Intermediate Programs
            </button>
            <button
              onClick={() => setActiveTab("adp")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "adp"
                  ? "border-b-4 border-[#006B3F] text-[#006B3F]"
                  : "text-gray-600 hover:text-[#006B3F]"
              }`}
            >
              Associate Degree Programs (ADP)
            </button>
          </div>

          {/* Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs[activeTab as keyof typeof programs].map((program, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
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
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Admissions Open:</span>
                  <span className="text-gray-600">July 1 - August 15</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Classes Begin:</span>
                  <span className="text-gray-600">September 1</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Mid-Term Exams:</span>
                  <span className="text-gray-600">November 15-30</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Winter Break:</span>
                  <span className="text-gray-600">December 20 - January 5</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Final Exams:</span>
                  <span className="text-gray-600">March 1-20</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Summer Vacation:</span>
                  <span className="text-gray-600">June 15 - August 31</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#006B3F] mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Second Year / Semester 3 & 4
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Classes Resume:</span>
                  <span className="text-gray-600">September 1</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Pre-Board Exams:</span>
                  <span className="text-gray-600">January 15 - February 5</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Annual Exams (BISE):</span>
                  <span className="text-gray-600">April 20 - May 20</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Result Declaration:</span>
                  <span className="text-gray-600">August 15</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Convocation:</span>
                  <span className="text-gray-600">September 15</span>
                </li>
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
            {[
              "FSc Pre-Medical Syllabus",
              "FSc Pre-Engineering Syllabus",
              "ICS Syllabus",
              "FA Syllabus",
              "I.Com Syllabus",
              "ADP Science Curriculum",
              "ADP Arts Curriculum",
              "ADP Commerce Curriculum",
              "Examination Scheme",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileDown className="w-8 h-8 text-[#006B3F]" />
                  <span className="font-semibold text-gray-700">{item}</span>
                </div>
                <span className="text-xs text-gray-500">PDF</span>
              </div>
            ))}
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
