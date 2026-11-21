import { useState } from "react";
import { X, Upload, Check, AlertCircle, ChevronRight, CheckCircle2, FileText, Calendar, Award, Shield, Clock, Phone, BookOpen, Sparkles } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "../components/ui/skeleton";

const API = "https://govt-associate-college-data-nagar-lahore.onrender.com/api";
const PROGRAMS = ["FSc Pre-Medical","FSc Pre-Engineering","ICS","FA","I.Com","ADP Science","ADP Arts","ADP Commerce"];

export function AdmissionsPage() {
  const { settings, loading } = useAdmin();
  const collegeName = settings?.collegeName || "Govt. Associate College for Women (GACW) Data Nagar Lahore";

  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name:"",fatherName:"",cnic:"",dob:"",gender:"Female",phone:"",email:"",address:"",program:"FSc Pre-Medical",previousInstitution:"",previousMarks:"" });
  const [files, setFiles] = useState<{photo?:File,matricCert?:File,cnicCopy?:File,characterCert?:File}>({});

  const isAdmissionActive = () => {
    if (!settings?.admissionsOpen) return false;
    if (!settings?.lastDateAdmission) return true;
    const lastDate = new Date(settings?.lastDateAdmission);
    if (isNaN(lastDate.getTime())) return true;
    lastDate.setHours(23, 59, 59, 999);
    return new Date() <= lastDate;
  };
  const admissionOpen = isAdmissionActive();

  const f = (k:string) => (e:any) => setForm(p=>({...p,[k]:e.target.value}));
  const setFile = (k:string) => (e:any) => { const f=e.target.files?.[0]; if(f) setFiles(p=>({...p,[k]:f})); };

  const handleSubmit = async () => {
    if (!form?.name||!form?.fatherName||!form?.cnic||!form?.phone||!form?.program) { setError("Starred fields are required"); return; }
    setSubmitting(true); setError("");
    try {
      const fd = new FormData();
      Object.keys(form).forEach(k=>fd.append(k,(form as any)[k]));
      if(files?.photo) fd.append("photo",files?.photo);
      if(files?.matricCert) fd.append("matricCert",files?.matricCert);
      if(files?.cnicCopy) fd.append("cnicCopy",files?.cnicCopy);
      if(files?.characterCert) fd.append("characterCert",files?.characterCert);
      const res = await fetch(`${API}/applications`,{method:"POST",body:fd});
      if(!res.ok) throw new Error();
      setSubmitted(true);
    } catch { setError("Submission failed. Please check your network and try again."); }
    setSubmitting(false);
  };

  /* Previous green ring: focus:ring-[#006B3F] -> focus:ring-[#0284C7] */
  const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]";
  const labelCls = "block text-xs font-semibold text-gray-700 mb-1";

  return (
    <div className="bg-white">
      <Helmet>
        <title>Admissions 2026-27 | {collegeName}</title>
        <meta name="description" content={`Apply for admissions at ${collegeName}. Check eligibility criteria, required documents, and fill the online application form.`} />
      </Helmet>
      {/* Page Header */}
      {/* Theme: Changed from green bg-gradient-to-r from-[#006B3F] to-[#004d2d] to sky blue */}
      {/* Previous green: from-[#006B3F] to-[#004d2d] */}
      <section className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white py-16 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{fontFamily:"Playfair Display,serif"}}>Admissions</h1>
          <p className="text-xl text-[#C8A951] max-w-3xl leading-relaxed">
            Your journey towards academic excellence begins here — explore intermediate & associate degree admissions, eligibility criteria, admission procedures, and merit guidelines at Govt. Associate College for Women (GACW) Data Nagar Lahore.
          </p>
        </div>
      </section>

      {/* Step by Step Admission Procedure */}
      <section className="py-14 bg-gradient-to-b from-[#F0F9FF]/60 to-white border-b border-sky-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#0284C7] text-sm font-semibold uppercase tracking-widest">How to Apply</span>
            <h2 className="text-3xl font-bold text-[#082F49] mt-1" style={{fontFamily:"Playfair Display,serif"}}>Step-by-Step Admission Procedure</h2>
            <p className="text-gray-600 text-sm mt-2">Follow these simple steps to complete your admission process at GACW Data Nagar Lahore.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: FileText,
                title: "Application Submission",
                desc: "Fill in the online application form or obtain the prospectus form directly from the college admission counter."
              },
              {
                step: "02",
                icon: CheckCircle2,
                title: "Document Verification",
                desc: "Submit verified copies of Matric Result Card, CNIC/B-Form, Character Certificate, and passport photos."
              },
              {
                step: "03",
                icon: Award,
                title: "Merit List Display",
                desc: "1st, 2nd & 3rd Merit Lists are displayed on the college notice board and official website as per HED schedule."
              },
              {
                step: "04",
                icon: Sparkles,
                title: "Fee Deposit & Enrollment",
                desc: "Selected candidates submit admission dues in the designated bank counter and receive their roll numbers & identity cards."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100 hover:shadow-md transition-all relative group">
                <span className="text-4xl font-extrabold text-[#0284C7]/15 absolute top-4 right-4 group-hover:text-[#0284C7]/30 transition-colors">{item.step}</span>
                <div className="w-12 h-12 rounded-xl bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7] mb-4 group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-800 text-base mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Table */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
          <h2 className="text-3xl font-bold text-[#082F49] mb-2" style={{fontFamily:"Playfair Display,serif"}}>Eligibility Criteria</h2>
          <div className="w-16 h-1 bg-[#0284C7] mb-6"/>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden text-sm border border-sky-100">
              {/* Previous green: bg-[#006B3F] -> bg-[#0284C7] */}
              <thead className="bg-[#0284C7] text-white">
                <tr>{["Program","Min Qualification","Min Marks","Age Limit"].map(h=><th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(4)].map((__, j) => <td key={j} className="px-4 py-3"><Skeleton className="h-5 w-full" /></td>)}
                    </tr>
                  ))
                ) : (settings?.eligibilityCriteria || [])?.map((r: any, i: number) => (
                  <tr key={i} className={i%2===0?"bg-sky-50/40":"bg-white"}>
                    <td className="px-4 py-3 text-gray-700 font-medium">{r?.program}</td>
                    <td className="px-4 py-3 text-gray-700">{r?.qualification}</td>
                    <td className="px-4 py-3 text-gray-700">{r?.marks}</td>
                    <td className="px-4 py-3 text-gray-700">{r?.ageLimit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Reserved Quota & Scholarships Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quota & Reserved Seats */}
            <div className="bg-[#F0F9FF]/50 p-6 sm:p-8 rounded-2xl border border-sky-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0284C7] text-white flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#082F49]" style={{fontFamily:"Playfair Display,serif"}}>Reserved Seats & Quotas</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                As per Punjab Higher Education Department policy, seats are reserved across various categories in intermediate and associate programs:
              </p>
              <ul className="space-y-2.5 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#0284C7] font-bold">•</span>
                  <span><strong>Open Merit:</strong> Majority seats allocated purely based on matriculation marks percentage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0284C7] font-bold">•</span>
                  <span><strong>Sports Quota:</strong> Special seats for champion athletes & players (trials conducted by Sports Board).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0284C7] font-bold">•</span>
                  <span><strong>Co-Curricular / Fine Arts:</strong> For students excelling in debates, Qirat, Naat, and cultural competitions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0284C7] font-bold">•</span>
                  <span><strong>Special Persons Quota:</strong> Reserved opportunities with fee facilitation for students with disabilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0284C7] font-bold">•</span>
                  <span><strong>College Staff & Kinship:</strong> Seats reserved as per Govt. of Punjab education regulations.</span>
                </li>
              </ul>
            </div>

            {/* Scholarships & Financial Support */}
            <div className="bg-[#F0F9FF]/50 p-6 sm:p-8 rounded-2xl border border-sky-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#C8A951] text-white flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#082F49]" style={{fontFamily:"Playfair Display,serif"}}>Scholarships & Fee Concessions</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Govt. Associate College for Women Data Nagar ensures financial constraints never stop talented young women from acquiring higher education:
              </p>
              <ul className="space-y-2.5 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#C8A951] font-bold">•</span>
                  <span><strong>PEEF Scholarships:</strong> Punjab Educational Endowment Fund scholarships for deserving high-achievers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8A951] font-bold">•</span>
                  <span><strong>Mora & Zakat Scholarships:</strong> Financial support funded through Punjab District Zakat Committees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8A951] font-bold">•</span>
                  <span><strong>Ehsaas / Benazir Scholarships:</strong> Higher education grants for eligible undergraduate candidates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8A951] font-bold">•</span>
                  <span><strong>College Welfare Fund:</strong> Full or partial fee remissions for orphans and low-income students upon interview.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8A951] font-bold">•</span>
                  <span><strong>Sibling Concession:</strong> Standard government sibling fee rebate for sisters enrolled simultaneously.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      {/* Previous green tint: bg-[#F8F9FA] -> bg-[#F0F9FF]/40 */}
      <section className="py-10 bg-[#F0F9FF]/40">
        <div className="container mx-auto px-4">
          {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
          <h2 className="text-3xl font-bold text-[#082F49] mb-2" style={{fontFamily:"Playfair Display,serif"}}>Required Documents</h2>
          <div className="w-16 h-1 bg-[#0284C7] mb-6"/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              [...Array(4)].map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-xl" />)
            ) : (settings?.requiredDocuments || []).map((d: string, i: number)=>(
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-sky-100">
                {/* Previous green: bg-[#006B3F]/10 text-[#006B3F] -> bg-[#0284C7]/10 text-[#0284C7] */}
                <div className="w-6 h-6 rounded-full bg-[#0284C7]/10 flex items-center justify-center shrink-0 mt-0.5"><ChevronRight className="w-3 h-3 text-[#0284C7]"/></div>
                <span className="text-gray-700 text-sm">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Guidelines & Admission Desk Info */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#082F49] to-[#0369A1] rounded-2xl p-6 sm:p-10 text-white shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3 text-[#C8A951]">
                  <Clock className="w-5 h-5" />
                  <h4 className="font-bold text-base uppercase tracking-wider text-white">Desk Timings</h4>
                </div>
                <p className="text-sm text-sky-100 leading-relaxed">
                  Monday to Saturday: <br />
                  <span className="font-semibold text-white">8:00 AM – 1:30 PM</span><br />
                  (Friday: 8:00 AM – 12:00 PM)
                </p>
                <p className="text-xs text-sky-200 mt-2">Closed on Sundays and Gazetted Holidays.</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 text-[#C8A951]">
                  <Phone className="w-5 h-5" />
                  <h4 className="font-bold text-base uppercase tracking-wider text-white">Admission Cell</h4>
                </div>
                <p className="text-sm text-sky-100 leading-relaxed">
                  Direct Inquiries: <a href="tel:04237602172" className="text-white font-semibold underline hover:text-[#C8A951]">042-37602172</a><br />
                  WhatsApp Helpline: <a href="https://wa.me/924237602172" target="_blank" rel="noopener noreferrer" className="text-white font-semibold underline hover:text-[#C8A951]">042-37602172</a><br />
                  Email: <a href="mailto:datanagargacw@gmail.com" className="text-white font-semibold underline hover:text-[#C8A951]">datanagargacw@gmail.com</a>
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 text-[#C8A951]">
                  <BookOpen className="w-5 h-5" />
                  <h4 className="font-bold text-base uppercase tracking-wider text-white">Discipline & Attendance</h4>
                </div>
                <p className="text-sm text-sky-100 leading-relaxed">
                  Students must maintain a minimum of <span className="font-semibold text-white">75% attendance</span> to be eligible for board & university examinations, strictly adhering to the college uniform and code of conduct.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* Previous green: from-[#006B3F] to-[#004d2d] -> from-[#0284C7] to-[#0369A1] */}
      <section className="py-14 bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white text-center shadow-lg">
        <h2 className="text-4xl font-bold mb-3" style={{fontFamily:"Playfair Display,serif"}}>Ready to Apply?</h2>
        {loading ? (
          <div className="flex justify-center"><Skeleton className="h-16 w-64 rounded-xl opacity-20" /></div>
        ) : admissionOpen ? (
          <>
            <p className="text-[#C8A951] mb-8 text-lg font-medium">Fill the online form and submit your documents for GACW Data Nagar</p>
            <button onClick={()=>{setShowModal(true);setStep(1);setSubmitted(false);setError("");}}
              className="bg-[#C8A951] hover:bg-[#b89841] text-[#082F49] px-12 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 shadow-xl">
              Apply Online Now
            </button>
          </>
        ) : (
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-[#C8A951]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Admissions Are Currently Closed</h3>
            <p className="text-sky-100 text-sm leading-relaxed mb-6">
              Online applications for the ongoing academic cycle are closed. Prospective candidates are encouraged to check eligibility criteria, required documents, and preparation guidelines above. Notice for the upcoming admission intake will be announced on the college portal.
            </p>
            <button onClick={() => window.scrollTo({ top: 350, behavior: 'smooth' })} className="bg-white hover:bg-gray-100 text-[#0284C7] px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-lg">
              Explore Eligibility & Requirements
            </button>
          </div>
        )}
      </section>

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <h2 className="font-bold text-gray-800 text-lg">Online Admission Application - GACW</h2>
                <p className="text-xs text-gray-500">Step {step} of 3</p>
              </div>
              <button onClick={()=>setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4"/></button>
            </div>

            {/* Step indicator */}
            <div className="flex px-5 pt-4 gap-2">
              {["Personal Info","Academic Info","Documents"].map((s,i)=>(
                <div key={i} className="flex-1">
                  {/* Previous green: bg-[#006B3F] text-[#006B3F] -> bg-[#0284C7] text-[#0284C7] */}
                  <div className={`h-1.5 rounded-full transition-colors ${step>i?"bg-[#0284C7]":"bg-gray-200"}`}/>
                  <p className={`text-xs mt-1 font-medium ${step===i+1?"text-[#0284C7]":"text-gray-400"}`}>{s}</p>
                </div>
              ))}
            </div>

            {submitted ? (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-[#0284C7]"/></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
                <p className="text-gray-500 text-sm mb-6">Aapki application GACW college administration ko mil gayi hai. Notice board aur call k zariye jald mutla kia jaye ga.</p>
                <button onClick={()=>setShowModal(false)} className="bg-[#0284C7] text-white px-8 py-2.5 rounded-lg font-semibold">Close</button>
              </div>
            ) : (
              <div className="p-5">
                {/* Step 1 */}
                {step===1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 md:col-span-1"><label className={labelCls}>Full Name *</label><input value={form.name} onChange={f("name")} placeholder="Apna poora naam" className={inputCls}/></div>
                      <div className="col-span-2 md:col-span-1"><label className={labelCls}>Father Name *</label><input value={form.fatherName} onChange={f("fatherName")} placeholder="Walid ka naam" className={inputCls}/></div>
                      <div><label className={labelCls}>CNIC / B-Form *</label><input value={form.cnic} onChange={f("cnic")} placeholder="00000-0000000-0" className={inputCls}/></div>
                      <div><label className={labelCls}>Date of Birth</label><input type="date" value={form.dob} onChange={f("dob")} className={inputCls}/></div>
                      <div><label className={labelCls}>Gender</label><select value={form.gender} onChange={f("gender")} className={inputCls}><option>Female</option><option>Male</option></select></div>
                      <div><label className={labelCls}>Phone *</label><input value={form.phone} onChange={f("phone")} placeholder="03XX-XXXXXXX" className={inputCls}/></div>
                      <div><label className={labelCls}>Email</label><input value={form.email} onChange={f("email")} placeholder="email@example.com" className={inputCls}/></div>
                      <div><label className={labelCls}>Address</label><input value={form.address} onChange={f("address")} placeholder="Ghar ka address" className={inputCls}/></div>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step===2 && (
                  <div className="space-y-4">
                    <div><label className={labelCls}>Program *</label>
                      <select value={form.program} onChange={f("program")} className={inputCls}>
                        {PROGRAMS.map(p=><option key={p}>{p}</option>)}
                      </select>
                    </div>
                    <div><label className={labelCls}>Previous Institution</label><input value={form.previousInstitution} onChange={f("previousInstitution")} placeholder="School / College ka naam" className={inputCls}/></div>
                    <div><label className={labelCls}>Previous Marks %</label><input value={form.previousMarks} onChange={f("previousMarks")} placeholder="e.g. 85%" className={inputCls}/></div>
                  </div>
                )}

                {/* Step 3 */}
                {step===3 && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500">Documents upload karein (JPG/PNG/PDF, max 5MB)</p>
                    {[
                      {key:"photo",label:"Passport Size Photo *"},
                      {key:"matricCert",label:"Matric Certificate"},
                      {key:"cnicCopy",label:"CNIC / B-Form Copy"},
                      {key:"characterCert",label:"Character Certificate"},
                    ].map(({key,label})=>(
                      <div key={key}>
                        <label className={labelCls}>{label}</label>
                        {/* Previous green: hover:border-[#006B3F] -> hover:border-[#0284C7] */}
                        <label className="flex items-center gap-3 border-2 border-dashed border-gray-300 hover:border-[#0284C7] rounded-xl p-3 cursor-pointer transition-colors">
                          <Upload className="w-5 h-5 text-gray-400"/>
                          <span className="text-sm text-gray-500">{(files as any)[key]?.name || "Click to select file"}</span>
                          <input type="file" accept="image/*,.pdf" onChange={setFile(key)} className="hidden"/>
                        </label>
                      </div>
                    ))}
                    {error && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-xs"><AlertCircle className="w-4 h-4"/>{error}</div>}
                  </div>
                )}

                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                  {step>1 && <button onClick={()=>setStep(s=>s-1)} className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Back</button>}
                  {/* Previous green: bg-[#006B3F] hover:bg-[#003D1F] -> bg-[#0284C7] hover:bg-[#0369A1] */}
                  {step<3
                    ? <button onClick={()=>setStep(s=>s+1)} className="flex-1 bg-[#0284C7] hover:bg-[#0369A1] text-white py-2.5 rounded-lg text-sm font-semibold">Next Step</button>
                    : <button onClick={handleSubmit} disabled={submitting} className="flex-1 bg-[#0284C7] hover:bg-[#0369A1] text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50">
                        {submitting?"Submitting...":"Submit Application"}
                      </button>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
