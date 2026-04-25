import { useState, useEffect } from "react";
import { Search, Trophy, UserCircle } from "lucide-react";

const API = "https://govt-associate-college-data-nagar-lahore.onrender.com/api";
const CLASSES = ["FSc Pre-Medical","FSc Pre-Engineering","ICS","FA","I.Com","ADP Science","ADP Arts","ADP Commerce"];
const YEARS = ["2026","2025","2024","2023"];

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

  const filtered = results.filter(r =>
    !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.rollNumber.toLowerCase().includes(search.toLowerCase())
  );

  const topThree = [...results].filter(r=>r.position).slice(0,3);

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-[#006B3F] to-[#004d2d] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{fontFamily:"Playfair Display,serif"}}>Results</h1>
          <p className="text-xl text-[#C8A951]">Class-wise examination results</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-[#006B3F] mb-4" style={{fontFamily:"Playfair Display,serif"}}>Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Class</label>
                <select value={filterClass} onChange={e=>setFilterClass(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]">
                  {CLASSES.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
                <select value={filterYear} onChange={e=>setFilterYear(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]">
                  {YEARS.map(y=><option key={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Search by Name / Roll No</label>
                <div className="relative">
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Name ya Roll No..." className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]"/>
                  <Search className="absolute left-2.5 top-3 w-4 h-4 text-gray-400"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Performers */}
      {topThree.length>0 && (
        <section className="py-8 bg-[#F8F9FA]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#006B3F] mb-6 text-center" style={{fontFamily:"Playfair Display,serif"}}>Position Holders — {filterClass} {filterYear}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {topThree.map((s,i)=>(
                <div key={s._id} className={`bg-white rounded-xl shadow-lg overflow-hidden border-t-4 ${i===0?"border-[#C8A951]":i===1?"border-gray-400":"border-[#CD7F32]"}`}>
                  <div className={`py-5 text-center text-white ${i===0?"bg-[#C8A951]":i===1?"bg-gray-400":"bg-[#CD7F32]"}`}>
                    <Trophy className="w-10 h-10 mx-auto mb-1"/>
                    <p className="text-2xl font-bold">{s.position}</p>
                  </div>
                  <div className="p-4 text-center">
                    {s.photo ? <img src={s.photo} className="w-16 h-16 rounded-full mx-auto mb-2 object-cover border-2 border-[#006B3F]/20"/> : <div className="w-16 h-16 rounded-full bg-[#006B3F]/10 mx-auto mb-2 flex items-center justify-center"><UserCircle className="w-10 h-10 text-[#006B3F]/30"/></div>}
                    <p className="font-bold text-gray-800">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.rollNumber}</p>
                    <p className="text-[#006B3F] font-semibold mt-1">{s.marks}/{s.totalMarks}</p>
                    <span className="inline-block bg-[#C8A951] text-white text-xs px-2 py-0.5 rounded font-bold mt-1">{s.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results Table */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#006B3F] mb-4" style={{fontFamily:"Playfair Display,serif"}}>{filterClass} — {filterYear} Results</h2>
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading...</div>
          ) : filtered.length===0 ? (
            <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl">
              <Trophy className="w-12 h-12 mx-auto mb-3 opacity-20"/>
              <p>Is class ka koi result upload nahi hua abhi.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-[#006B3F] text-white">
                  <tr>
                    {["#","Photo","Roll No","Name","Marks","Grade","Position","Status"].map(h=><th key={h} className="px-4 py-3 text-left">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r,i)=>(
                    <tr key={r._id} className={i%2===0?"bg-gray-50":"bg-white"}>
                      <td className="px-4 py-3 text-gray-400">{i+1}</td>
                      <td className="px-4 py-3">{r.photo ? <img src={r.photo} className="w-9 h-9 rounded-full object-cover"/> : <div className="w-9 h-9 rounded-full bg-[#006B3F]/10 flex items-center justify-center"><UserCircle className="w-5 h-5 text-[#006B3F]/30"/></div>}</td>
                      <td className="px-4 py-3 font-semibold text-gray-700">{r.rollNumber}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{r.name}</td>
                      <td className="px-4 py-3 font-semibold">{r.marks}/{r.totalMarks}</td>
                      <td className="px-4 py-3"><span className="bg-[#C8A951] text-white px-2 py-0.5 rounded font-bold text-xs">{r.grade}</span></td>
                      <td className="px-4 py-3 text-[#006B3F] font-semibold">{r.position||"-"}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-semibold ${r.status==="Pass"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`}>{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <section className="py-10 bg-[#006B3F] text-white text-center">
        <h2 className="text-2xl font-bold mb-2" style={{fontFamily:"Playfair Display,serif"}}>BISE Board Results</h2>
        <p className="mb-6 text-[#C8A951]">Official BISE Lahore results ke liye</p>
        <a href="https://www.biselahore.com" target="_blank" rel="noreferrer" className="inline-block bg-[#C8A951] hover:bg-[#b89841] text-white px-8 py-3 rounded-lg font-semibold">Visit BISE Lahore</a>
      </section>
    </div>
  );
}
