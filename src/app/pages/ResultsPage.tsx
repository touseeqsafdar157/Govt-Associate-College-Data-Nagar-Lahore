import { useState, useEffect } from "react";
import { Search, Trophy, UserCircle, Download, FileSpreadsheet } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";
import { Helmet } from "react-helmet-async";

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

  const handleDownloadCSV = () => {
    const list = results?.length > 0 ? results : filtered;
    if (!list || list.length === 0) return;

    const headers = ["Sr #", "Roll Number", "Student Name", "Class", "Year", "Marks Obtained", "Total Marks", "Percentage", "Grade", "Position", "Status"];
    const rows = list.map((r, i) => [
      i + 1,
      `"${(r.rollNumber || "").replace(/"/g, '""')}"`,
      `"${(r.name || "").replace(/"/g, '""')}"`,
      `"${(r.class || filterClass).replace(/"/g, '""')}"`,
      `"${(r.year || filterYear).replace(/"/g, '""')}"`,
      r.marks ?? "",
      r.totalMarks ?? 1100,
      r.marks && r.totalMarks ? ((Number(r.marks) / Number(r.totalMarks)) * 100).toFixed(1) + "%" : "",
      `"${(r.grade || "").replace(/"/g, '""')}"`,
      `"${(r.position || "-").replace(/"/g, '""')}"`,
      `"${(r.status || "Pass").replace(/"/g, '""')}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filterClass.replace(/[^a-zA-Z0-9]/g, "_")}_Results_${filterYear}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadGazette = () => {
    const list = results?.length > 0 ? results : filtered;
    if (!list || list.length === 0) return;

    const totalStudents = list.length;
    const passedCount = list.filter(r => (r.status || "Pass").toLowerCase() === "pass").length;
    const passPercentage = totalStudents > 0 ? ((passedCount / totalStudents) * 100).toFixed(1) : "0";
    const logoUrl = window.location.origin + "/logo.jpg";
    const currentDate = new Date().toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" });

    const rowsHtml = list.map((r, i) => {
      const pct = r.marks && r.totalMarks ? ((Number(r.marks) / Number(r.totalMarks)) * 100).toFixed(1) + "%" : "-";
      const isPass = (r.status || "Pass").toLowerCase() === "pass";
      return `
        <tr style="background-color: ${i % 2 === 0 ? "#ffffff" : "#f8fafc"};">
          <td style="padding: 8px 10px; border: 1px solid #e2e8f0; text-align: center; font-weight: 600;">${i + 1}</td>
          <td style="padding: 8px 10px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: 700; color: #0369a1;">${r.rollNumber || "-"}</td>
          <td style="padding: 8px 10px; border: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${r.name || "-"}</td>
          <td style="padding: 8px 10px; border: 1px solid #e2e8f0; text-align: center; font-weight: 700;">${r.marks ?? "-"}&nbsp;/&nbsp;${r.totalMarks ?? 1100}</td>
          <td style="padding: 8px 10px; border: 1px solid #e2e8f0; text-align: center; font-weight: 600;">${pct}</td>
          <td style="padding: 8px 10px; border: 1px solid #e2e8f0; text-align: center;"><span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-weight: 700; background: #fef3c7; color: #92400e;">${r.grade || "-"}</span></td>
          <td style="padding: 8px 10px; border: 1px solid #e2e8f0; text-align: center; font-weight: 700; color: #0284c7;">${r.position || "-"}</td>
          <td style="padding: 8px 10px; border: 1px solid #e2e8f0; text-align: center;">
            <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 11px; text-transform: uppercase; ${isPass ? "background: #dcfce7; color: #15803d;" : "background: #fee2e2; color: #b91c1c;"}">
              ${r.status || "Pass"}
            </span>
          </td>
        </tr>
      `;
    }).join("");

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Pop-up blocked! Please allow pop-ups for this site to download the full result sheet.");
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Result Gazette - ${filterClass} (${filterYear}) - GACW Data Nagar</title>
        <style>
          @page {
            size: A4;
            margin: 12mm 10mm;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #0f172a;
            background: #f1f5f9;
            padding: 20px;
          }
          .gazette-container {
            max-width: 950px;
            margin: 0 auto;
            background: #ffffff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          }
          .action-bar {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid #e2e8f0;
          }
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 10px 18px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all 0.2s;
          }
          .btn-primary {
            background: #0284c7;
            color: #ffffff;
          }
          .btn-primary:hover {
            background: #0369a1;
          }
          .btn-close {
            background: #f1f5f9;
            color: #475569;
          }
          .btn-close:hover {
            background: #e2e8f0;
          }
          .header-box {
            display: flex;
            align-items: center;
            gap: 20px;
            padding-bottom: 20px;
            border-bottom: 3px double #0284c7;
            margin-bottom: 20px;
          }
          .logo {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 50%;
            border: 2px solid #0284c7;
          }
          .header-text {
            flex: 1;
            text-align: center;
          }
          .college-name {
            font-size: 22px;
            font-weight: 800;
            color: #082f49;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 2px;
          }
          .sub-title {
            font-size: 13px;
            color: #64748b;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 6px;
          }
          .gazette-badge {
            display: inline-block;
            background: #0284c7;
            color: #ffffff;
            font-size: 12px;
            font-weight: 700;
            padding: 4px 14px;
            border-radius: 9999px;
            letter-spacing: 0.5px;
          }
          .meta-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            background: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 8px;
            padding: 12px 16px;
            margin-bottom: 24px;
          }
          .meta-item {
            text-align: center;
          }
          .meta-label {
            font-size: 10px;
            text-transform: uppercase;
            color: #0369a1;
            font-weight: 700;
            margin-bottom: 2px;
          }
          .meta-val {
            font-size: 15px;
            font-weight: 800;
            color: #0c4a6e;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            margin-bottom: 30px;
          }
          th {
            background: #0284c7;
            color: #ffffff;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.5px;
            padding: 10px 8px;
            border: 1px solid #0284c7;
            text-align: center;
          }
          th.text-left {
            text-align: left;
            padding-left: 10px;
          }
          .footer-section {
            margin-top: 40px;
            padding-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .sign-block {
            text-align: center;
            width: 200px;
          }
          .sign-line {
            border-top: 1px dashed #64748b;
            margin-bottom: 6px;
          }
          .sign-title {
            font-size: 11px;
            font-weight: 700;
            color: #334155;
            text-transform: uppercase;
          }
          .watermark-note {
            font-size: 10px;
            color: #94a3b8;
            text-align: center;
            margin-top: 20px;
          }
          @media print {
            body {
              background: #ffffff;
              padding: 0;
            }
            .gazette-container {
              box-shadow: none;
              padding: 0;
              max-width: 100%;
            }
            .no-print {
              display: none !important;
            }
            tr {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="gazette-container">
          <div class="action-bar no-print">
            <button class="btn btn-primary" onclick="window.print()">🖨️ Print / Save as PDF</button>
            <button class="btn btn-close" onclick="window.close()">✖️ Close Window</button>
          </div>

          <div class="header-box">
            <img src="${logoUrl}" alt="College Logo" class="logo" onerror="this.style.display='none'" />
            <div class="header-text">
              <h1 class="college-name">Govt. Associate College for Women</h1>
              <p class="sub-title">Data Nagar, Lahore · Affiliated with BISE Lahore</p>
              <span class="gazette-badge">OFFICIAL EXAMINATION RESULT GAZETTE</span>
            </div>
          </div>

          <div class="meta-grid">
            <div class="meta-item">
              <div class="meta-label">Class / Program</div>
              <div class="meta-val">${filterClass}</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">Academic Session</div>
              <div class="meta-val">${filterYear}</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">Total Appeared</div>
              <div class="meta-val">${totalStudents} Candidates</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">Pass Percentage</div>
              <div class="meta-val" style="color: #15803d;">${passPercentage}% (${passedCount} Passed)</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 45px;">#</th>
                <th style="width: 120px;">Roll Number</th>
                <th class="text-left">Student Name</th>
                <th style="width: 130px;">Marks Obtained</th>
                <th style="width: 80px;">%</th>
                <th style="width: 70px;">Grade</th>
                <th style="width: 80px;">Position</th>
                <th style="width: 85px;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div class="footer-section">
            <div class="sign-block">
              <div class="sign-line"></div>
              <div class="sign-title">Tabulator / Clerk</div>
            </div>
            <div class="sign-block">
              <div class="sign-line"></div>
              <div class="sign-title">Incharge Examination</div>
            </div>
            <div class="sign-block">
              <div class="sign-line"></div>
              <div class="sign-title">Principal GACW</div>
            </div>
          </div>

          <p class="watermark-note">
            Generated officially on ${currentDate} from GACW Data Nagar Portal. Any unauthorized alteration or erasure invalidates this gazette.
          </p>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 400);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Examination Results | Govt. Associate College for Women (GACW) Data Nagar</title>
        <meta name="description" content="Check annual and term examination results of Govt. Associate College for Women (GACW) Data Nagar Lahore." />
      </Helmet>

      {/* Header */}
      {/* Theme: Changed from green bg-gradient-to-r from-[#006B3F] to-[#004d2d] to sky blue */}
      {/* Previous green: from-[#006B3F] to-[#004d2d] */}
      <section className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white py-16 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "Playfair Display,serif" }}>Examination Results</h1>
          <p className="text-xl text-[#C8A951] max-w-3xl leading-relaxed">
            Access college term evaluations, BISE Lahore intermediate board examinations, and Punjab University annual results showcasing academic excellence.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-sky-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-1/4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Class</label>
              {/* Previous green: focus:ring-[#006B3F] -> focus:ring-[#0284C7] */}
              <select value={filterClass} onChange={e => setFilterClass(e.target.value)} className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7] bg-white">
                {CLASSES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="w-full md:w-1/4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Academic Year</label>
              <select value={filterYear} onChange={e => setFilterYear(e.target.value)} className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7] bg-white">
                {YEARS.map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
            <div className="w-full md:w-2/4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Search Student</label>
              <div className="relative">
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by Roll Number or Name..." className="w-full border border-gray-300 rounded-xl px-3 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7] bg-white" />
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Performers */}
      {!loading && (topThree?.length || 0) > 0 && (
        /* Previous green tint: bg-[#F8F9FA] -> bg-[#F0F9FF]/40 */
        <section className="py-12 bg-[#F0F9FF]/40">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 justify-center mb-8">
              <Trophy className="w-8 h-8 text-[#C8A951]" />
              {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
              <h2 className="text-3xl font-bold text-[#082F49] text-center" style={{ fontFamily: "Playfair Display,serif" }}>Position Holders</h2>
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
                    <div className="bg-sky-50 rounded-lg py-2 px-4 inline-block">
                      {/* Previous green: text-[#006B3F] -> text-[#0284C7] */}
                      <p className="text-[#0284C7] font-bold text-lg">{topThree[1]?.marks} / {topThree[1]?.totalMarks}</p>
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
                      {/* Previous green: text-[#006B3F] -> text-[#0284C7] */}
                      <p className="text-[#0284C7] font-extrabold text-2xl">{topThree[0]?.marks} / {topThree[0]?.totalMarks}</p>
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
                    <div className="bg-sky-50 rounded-lg py-2 px-4 inline-block">
                      {/* Previous green: text-[#006B3F] -> text-[#0284C7] */}
                      <p className="text-[#0284C7] font-bold text-lg">{topThree[2]?.marks} / {topThree[2]?.totalMarks}</p>
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
              {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
              <h2 className="text-3xl font-bold text-[#082F49]" style={{ fontFamily: "Playfair Display,serif" }}>{filterClass} Results</h2>
              <p className="text-gray-500 mt-1">Academic Session {filterYear} · GACW Data Nagar</p>
            </div>
            {!loading && filtered.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleDownloadGazette}
                  className="flex items-center gap-2 bg-[#0284C7] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#0369A1] transition-all shadow-md active:scale-95"
                  title="Open & Download Official PDF Result Gazette"
                >
                  <Download className="w-4 h-4" /> Download Full Result (PDF)
                </button>
                <button
                  onClick={handleDownloadCSV}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-md active:scale-95"
                  title="Export results as Excel / CSV spreadsheet"
                >
                  <FileSpreadsheet className="w-4 h-4" /> Export CSV
                </button>
              </div>
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
              <p className="text-gray-400 mt-2 max-w-sm mx-auto">No examination results are currently available for the selected class and academic year.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered?.map((r) => (
                <div key={r?._id} className="group bg-white rounded-xl border border-sky-100 shadow-sm hover:shadow-xl hover:border-[#0284C7]/30 transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="p-4 text-center flex-grow">
                    <div className="mb-3 relative inline-block">
                      {r?.photo ? (
                        <img src={r?.photo} className="w-16 h-16 rounded-full object-cover border-2 border-gray-50 shadow-inner group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-[#0284C7]/10 flex items-center justify-center border-2 border-white shadow-inner">
                          <UserCircle className="w-10 h-10 text-[#0284C7]/30" />
                        </div>
                      )}
                      <div className={`absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full border border-white flex items-center justify-center ${r?.status === "Pass" ? "bg-sky-600" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"}`}>
                        {r?.status === "Pass" ? <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> : <div className="w-1.5 h-0.5 bg-white rotate-45 absolute" />}
                      </div>
                    </div>

                    <h3 className="font-bold text-[13px] text-gray-800 mb-0.5 line-clamp-1">{r?.name}</h3>
                    <p className="text-[9px] font-bold text-[#C8A951] tracking-widest uppercase mb-3">{r?.rollNumber}</p>

                    <div className="grid grid-cols-2 gap-1.5 mt-auto">
                      <div className="bg-sky-50/50 group-hover:bg-[#0284C7]/10 rounded-lg p-1.5 text-center transition-colors">
                        <p className="text-[7px] text-gray-400 font-bold uppercase mb-0.5">Marks</p>
                        {/* Previous green: text-[#006B3F] -> text-[#0284C7] */}
                        <p className="text-[#0284C7] font-bold text-[11px]">{r?.marks}<span className="text-gray-400 font-normal text-[9px] ml-0.5">/{r?.totalMarks}</span></p>
                      </div>
                      <div className="bg-sky-50/50 group-hover:bg-[#C8A951]/10 rounded-lg p-1.5 text-center transition-colors">
                        <p className="text-[7px] text-gray-400 font-bold uppercase mb-0.5">Grade</p>
                        <p className="text-[#C8A951] font-bold text-[11px]">{r?.grade}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`py-1.5 px-3 text-center text-[8px] font-bold uppercase tracking-widest ${r?.status === "Pass" ? "bg-sky-50 text-sky-700" : "bg-red-50 text-red-600"}`}>
                    {r?.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BISE Link */}
      {/* Previous green: bg-[#003D1F] -> bg-[#082F49] */}
      <section className="py-20 bg-[#082F49] text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="w-16 h-16 bg-[#0284C7]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-8 h-8 text-[#C8A951]" />
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "Playfair Display,serif" }}>Official BISE Lahore Results</h2>
          <p className="text-sky-100 mb-8 text-lg">Govt. Associate College for Women (GACW) Data Nagar is affiliated with BISE Lahore. Please visit the official BISE website to view board examination results.</p>
          <a href="https://www.biselahore.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#0284C7] hover:bg-[#0369A1] text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl hover:shadow-2xl">
            Visit BISE Website <Search className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
