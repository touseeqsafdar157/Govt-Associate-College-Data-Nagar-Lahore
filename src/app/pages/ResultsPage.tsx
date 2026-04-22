import { useState } from "react";
import { Search, Download, Award, Trophy } from "lucide-react";

export function ResultsPage() {
  const [rollNumber, setRollNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const topPerformers = [
    { name: "Ayesha Zahid", rollNo: "2024-FSC-001", program: "FSc Pre-Medical", marks: "1098/1100", grade: "A+", position: "1st" },
    { name: "Muhammad Usman", rollNo: "2024-FSC-045", program: "FSc Pre-Engineering", marks: "1095/1100", grade: "A+", position: "2nd" },
    { name: "Fatima Noor", rollNo: "2024-ICS-012", program: "ICS", marks: "1089/1100", grade: "A+", position: "3rd" },
  ];

  const results = [
    { rollNo: "2024-FSC-001", name: "Ayesha Zahid", program: "FSc Pre-Medical", marks: "1098/1100", grade: "A+", status: "Pass" },
    { rollNo: "2024-FSC-002", name: "Ali Raza", program: "FSc Pre-Medical", marks: "985/1100", grade: "A", status: "Pass" },
    { rollNo: "2024-FSC-003", name: "Sara Ahmed", program: "FSc Pre-Medical", marks: "967/1100", grade: "A", status: "Pass" },
    { rollNo: "2024-FSC-045", name: "Muhammad Usman", program: "FSc Pre-Engineering", marks: "1095/1100", grade: "A+", status: "Pass" },
    { rollNo: "2024-ICS-012", name: "Fatima Noor", program: "ICS", marks: "1089/1100", grade: "A+", status: "Pass" },
    { rollNo: "2024-FA-018", name: "Zainab Khan", program: "FA", marks: "892/1100", grade: "A", status: "Pass" },
  ];

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#006B3F] to-[#004d2d] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Results
          </h1>
          <p className="text-xl text-[#C8A951]">Check examination results and performance records</p>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-12 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-[#006B3F] mb-2">98%</div>
              <p className="text-gray-600">Overall Success Rate</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-[#C8A951] mb-2">52</div>
              <p className="text-gray-600">Position Holders</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-[#006B3F] mb-2">380</div>
              <p className="text-gray-600">A+ Grades</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-[#C8A951] mb-2">3,420</div>
              <p className="text-gray-600">Total Students Appeared</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Search Your Result
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Search by Roll Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      placeholder="e.g., 2024-FSC-001"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                    />
                    <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Search by Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      placeholder="Enter student name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                    />
                    <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Select Year</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]">
                    <option>2026</option>
                    <option>2025</option>
                    <option>2024</option>
                    <option>2023</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Select Program</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]">
                    <option>All Programs</option>
                    <option>FSc Pre-Medical</option>
                    <option>FSc Pre-Engineering</option>
                    <option>ICS</option>
                    <option>FA</option>
                    <option>I.Com</option>
                    <option>ADP Science</option>
                    <option>ADP Arts</option>
                    <option>ADP Commerce</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-[#006B3F] hover:bg-[#004d2d] text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Search Result
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Performers */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Top Position Holders 2026
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {topPerformers.map((student, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform ${
                  index === 0 ? 'border-t-8 border-[#C8A951]' : index === 1 ? 'border-t-8 border-gray-400' : 'border-t-8 border-[#CD7F32]'
                }`}
              >
                <div className={`py-8 text-center ${index === 0 ? 'bg-[#C8A951]' : index === 1 ? 'bg-gray-400' : 'bg-[#CD7F32]'} text-white`}>
                  <Trophy className="w-16 h-16 mx-auto mb-2" />
                  <h3 className="text-3xl font-bold">{student.position}</h3>
                  <p className="text-sm">Position</p>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{student.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Roll No:</span>
                      <span className="font-semibold">{student.rollNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Program:</span>
                      <span className="font-semibold">{student.program}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Marks:</span>
                      <span className="font-semibold text-[#006B3F]">{student.marks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Grade:</span>
                      <span className="font-bold text-[#C8A951] text-lg">{student.grade}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Recent Results (Sample)
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="w-full">
              <thead className="bg-[#006B3F] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Roll Number</th>
                  <th className="px-6 py-4 text-left">Student Name</th>
                  <th className="px-6 py-4 text-left">Program</th>
                  <th className="px-6 py-4 text-center">Marks Obtained</th>
                  <th className="px-6 py-4 text-center">Grade</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-semibold text-gray-800">{result.rollNo}</td>
                    <td className="px-6 py-4 text-gray-700">{result.name}</td>
                    <td className="px-6 py-4 text-gray-700">{result.program}</td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-800">{result.marks}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block bg-[#C8A951] text-white px-3 py-1 rounded font-bold">
                        {result.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded font-semibold">
                        {result.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-[#006B3F] hover:text-[#C8A951] font-semibold flex items-center gap-1 mx-auto">
                        <Download className="w-4 h-4" />
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Showing sample results. Use the search form above to find specific results.
            </p>
          </div>
        </div>
      </section>

      {/* Board Results Link */}
      <section className="py-16 bg-[#006B3F] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            BISE Board Results
          </h2>
          <p className="mb-8 text-[#C8A951]">
            For official BISE Lahore results, visit the board website
          </p>
          <a
            href="https://www.biselahore.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#C8A951] hover:bg-[#b89841] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Visit BISE Lahore Website
          </a>
        </div>
      </section>
    </div>
  );
}
