import { useState, useEffect } from "react";
import { Search, Trophy, UserCircle, Download, FileSpreadsheet } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";

const API = "https://govt-associate-college-data-nagar-lahore.onrender.com/api";

const CLASSES = ["FSc Pre-Medical", "FSc Pre-Engineering", "ICS", "FA", "I.Com", "ADP Science", "ADP Arts", "ADP Commerce"];
const YEARS = ["2026", "2025", "2024", "2023"];

export function ResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [filterClass, setFilterClass] = useState("FSc Pre-Medical");
  const [filterYear, setFilterYear] = useState("2026");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchResults(); }, [filterClass, filterYear]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/results?class=${encodeURIComponent(filterClass)}&year=${filterYear}`);
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch { setResults([]); }
    setLoading(false);
  };

  const filtered = results?.filter(r =>
    !search || r?.name?.toLowerCase()?.includes(search?.toLowerCase()) || r?.rollNumber?.toLowerCase()?.includes(search?.toLowerCase())
  );

  const topThree = [...(results || [])]?.filter(r => r?.position)?.slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-r from-[#006B3F] to-[#004d2d] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "Playfair Display,serif" }}>Examination Results</h1>
          <p className="text-xl text-[#C8A951]">Track your academic excellence and progress</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-1/4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Class</label>
              <select value={filterClass} onChange={e => setFilterClass(e.target.value)} className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F] bg-white">
                {CLASSES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="w-full md:w-1/4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Academic Year</label>
              <select value={filterYear} onChange={e => setFilterYear(e.target.value)} className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F] bg-white">
                {YEARS.map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
            <div className="w-full md:w-2/4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Search Student</label>
              <div className="relative">
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Roll Number ya Name likhen..." className="w-full border border-gray-300 rounded-xl px-3 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F] bg-white" />
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Performers */}
      {!loading && (topThree?.length || 0) > 0 && (
        <section className="py-12 bg-[#F8F9FA]">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 justify-center mb-8">
              <Trophy className="w-8 h-8 text-[#C8A951]" />
              <h2 className="text-3xl font-bold text-[#006B3F] text-center" style={{ fontFamily: "Playfair Display,serif" }}>Position Holders</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-end">
              {/* 2nd Position */}
              {topThree[1] && (
                <div className="order-2 md:order-1 bg-white rounded-2xl shadow-lg overflow-hidden border-t-8 border-gray-300 transform transition hover:-translate-y-1">
                  <div className="p-6 text-center">
                    <div className="relative inline-block mb-4">
                      {topThree[1]?.photo ? <img src={topThree[1]?.photo} className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-md" /> : <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-md"><UserCircle className="w-16 h-16 text-gray-300" /></div>}
                      <span className="absolute -bottom-1 -right-1 bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white text-xs">2nd</span>
                    </div>
                    <h3 className="font-bold text-xl text-gray-800">{topThree[1]?.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{topThree[1]?.rollNumber}</p>
                    <div className="bg-gray-50 rounded-lg py-2 px-4 inline-block">
                      <p className="text-[#006B3F] font-bold text-lg">{topThree[1]?.marks} / {topThree[1]?.totalMarks}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 1st Position */}
              {topThree[0] && (
                <div className="order-1 md:order-2 bg-white rounded-2xl shadow-2xl overflow-hidden border-t-8 border-[#C8A951] transform transition hover:-translate-y-2 relative md:-top-4">
                  <div className="bg-[#C8A951]/10 py-2 text-center text-[#C8A951] text-xs font-bold uppercase tracking-widest">Topper of the Class</div>
                  <div className="p-8 text-center">
                    <div className="relative inline-block mb-4">
                      {topThree[0]?.photo ? <img src={topThree[0]?.photo} className="w-32 h-32 rounded-full object-cover border-4 border-[#C8A951]/20 shadow-xl" /> : <div className="w-32 h-32 rounded-full bg-[#C8A951]/5 flex items-center justify-center border-4 border-white shadow-xl"><UserCircle className="w-20 h-20 text-[#C8A951]/30" /></div>}
                      <span className="absolute -bottom-2 -right-2 bg-[#C8A951] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-white text-sm">1st</span>
                    </div>
                    <h3 className="font-bold text-2xl text-gray-900">{topThree[0]?.name}</h3>
                    <p className="text-base text-gray-500 mb-4">{topThree[0]?.rollNumber}</p>
                    <div className="bg-[#C8A951]/10 rounded-xl py-3 px-6 inline-block">
                      <p className="text-[#006B3F] font-extrabold text-2xl">{topThree[0]?.marks} / {topThree[0]?.totalMarks}</p>
                      <p className="text-xs text-[#C8A951] font-bold uppercase mt-1">Grade: {topThree[0]?.grade}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3rd Position */}
              {topThree[2] && (
                <div className="order-3 bg-white rounded-2xl shadow-lg overflow-hidden border-t-8 border-[#CD7F32]/50 transform transition hover:-translate-y-1">
                  <div className="p-6 text-center">
                    <div className="relative inline-block mb-4">
                      {topThree[2]?.photo ? <img src={topThree[2]?.photo} className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-md" /> : <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-md"><UserCircle className="w-16 h-16 text-gray-300" /></div>}
                      <span className="absolute -bottom-1 -right-1 bg-[#CD7F32] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white text-xs">3rd</span>
                    </div>
                    <h3 className="font-bold text-xl text-gray-800">{topThree[2]?.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{topThree[2]?.rollNumber}</p>
                    <div className="bg-gray-50 rounded-lg py-2 px-4 inline-block">
                      <p className="text-[#006B3F] font-bold text-lg">{topThree[2]?.marks} / {topThree[2]?.totalMarks}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Results Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#006B3F]" style={{ fontFamily: "Playfair Display,serif" }}>{filterClass} Results</h2>
              <p className="text-gray-500 mt-1">Academic Session {filterYear}</p>
            </div>
            {!loading && filtered.length > 0 && (
              <button className="flex items-center gap-2 bg-[#006B3F] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#004d2d] transition-all shadow-md">
                <Download className="w-4 h-4" /> Download Full Result
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <Skeleton className="w-16 h-16 rounded-full mx-auto mb-3" />
                  <Skeleton className="h-4 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-3 w-1/2 mx-auto mb-3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-full rounded-lg" />
                    <Skeleton className="h-8 w-full rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered?.length === 0 ? (
            <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <FileSpreadsheet className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-bold text-gray-600">No Results Found</h3>
              <p className="text-gray-400 mt-2 max-w-sm mx-auto">Is class ya year ke liye abhi koi result data available nahi hai. Admin panel se results upload karen.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered?.map((r) => (
                <div key={r?._id} className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#006B3F]/20 transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="p-4 text-center flex-grow">
                    <div className="mb-3 relative inline-block">
                      {r?.photo ? (
                        <img src={r?.photo} className="w-16 h-16 rounded-full object-cover border-2 border-gray-50 shadow-inner group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-[#006B3F]/5 flex items-center justify-center border-2 border-white shadow-inner">
                          <UserCircle className="w-10 h-10 text-[#006B3F]/20" />
                        </div>
                      )}
                      <div className={`absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full border border-white flex items-center justify-center ${r?.status === "Pass" ? "bg-green-500" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"}`}>
                        {r?.status === "Pass" ? <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> : <div className="w-1.5 h-0.5 bg-white rotate-45 absolute" />}
                      </div>
                    </div>

                    <h3 className="font-bold text-[13px] text-gray-800 mb-0.5 line-clamp-1">{r?.name}</h3>
                    <p className="text-[9px] font-bold text-[#C8A951] tracking-widest uppercase mb-3">{r?.rollNumber}</p>

                    <div className="grid grid-cols-2 gap-1.5 mt-auto">
                      <div className="bg-gray-50 group-hover:bg-[#006B3F]/5 rounded-lg p-1.5 text-center transition-colors">
                        <p className="text-[7px] text-gray-400 font-bold uppercase mb-0.5">Marks</p>
                        <p className="text-[#006B3F] font-bold text-[11px]">{r?.marks}<span className="text-gray-400 font-normal text-[9px] ml-0.5">/{r?.totalMarks}</span></p>
                      </div>
                      <div className="bg-gray-50 group-hover:bg-[#C8A951]/5 rounded-lg p-1.5 text-center transition-colors">
                        <p className="text-[7px] text-gray-400 font-bold uppercase mb-0.5">Grade</p>
                        <p className="text-[#C8A951] font-bold text-[11px]">{r?.grade}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`py-1.5 px-3 text-center text-[8px] font-bold uppercase tracking-widest ${r?.status === "Pass" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                    {r?.status}
                  </div>
                </div>
              ))}
            </div>
          )}


        </div>
      </section>

      {/* BISE Link */}
      <section className="py-20 bg-[#003D1F] text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="w-16 h-16 bg-[#C8A951]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-8 h-8 text-[#C8A951]" />
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "Playfair Display,serif" }}>Official BISE Lahore Results</h2>
          <p className="text-green-200 mb-8 text-lg">Govt. Associate College Data Nagar is affiliated with BISE Lahore. Board results ke liye official website visit karen.</p>
          <a href="https://www.biselahore.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#C8A951] hover:bg-[#b89841] text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl hover:shadow-2xl">
            Visit BISE Website <Search className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}

