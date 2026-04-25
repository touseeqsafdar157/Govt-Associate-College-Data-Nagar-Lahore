import { useState } from "react";
import { X, Upload, Check, AlertCircle, ChevronRight } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { Helmet } from "react-helmet-async";

const API = "https://govt-associate-college-data-nagar-lahore.onrender.com/api";
const PROGRAMS = ["FSc Pre-Medical","FSc Pre-Engineering","ICS","FA","I.Com","ADP Science","ADP Arts","ADP Commerce"];

export function AdmissionsPage() {
  const { settings } = useAdmin();
  const collegeName = settings?.collegeName || "Govt Associate College Data Nagar Lahore";

  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name:"",fatherName:"",cnic:"",dob:"",gender:"Male",phone:"",email:"",address:"",program:"FSc Pre-Medical",previousInstitution:"",previousMarks:"" });
  const [files, setFiles] = useState<{photo?:File,matricCert?:File,cnicCopy?:File,characterCert?:File}>({});

  const isAdmissionActive = () => {
    if (!settings?.admissionsOpen) return false;
    if (!settings?.lastDateAdmission) return true;
    const lastDate = new Date(settings.lastDateAdmission);
    if (isNaN(lastDate.getTime())) return true;
    lastDate.setHours(23, 59, 59, 999);
    return new Date() <= lastDate;
  };
  const admissionOpen = isAdmissionActive();

  const f = (k:string) => (e:any) => setForm(p=>({...p,[k]:e.target.value}));
  const setFile = (k:string) => (e:any) => { const f=e.target.files?.[0]; if(f) setFiles(p=>({...p,[k]:f})); };

  const handleSubmit = async () => {
    if (!form.name||!form.fatherName||!form.cnic||!form.phone||!form.program) { setError("Starred fields zaruri hain"); return; }
    setSubmitting(true); setError("");
    try {
      const fd = new FormData();
      Object.keys(form).forEach(k=>fd.append(k,(form as any)[k]));
      if(files.photo) fd.append("photo",files.photo);
      if(files.matricCert) fd.append("matricCert",files.matricCert);
      if(files.cnicCopy) fd.append("cnicCopy",files.cnicCopy);
      if(files.characterCert) fd.append("characterCert",files.characterCert);
      const res = await fetch(`${API}/applications`,{method:"POST",body:fd});
      if(!res.ok) throw new Error();
      setSubmitted(true);
    } catch { setError("Submit nahi hua. Backend chal raha hai?"); }
    setSubmitting(false);
  };

  const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3F]";
  const labelCls = "block text-xs font-semibold text-gray-700 mb-1";

  return (
    <div className="bg-white">
      <Helmet>
        <title>Admissions 2026-27 | {collegeName}</title>
        <meta name="description" content={`Apply for admissions at ${collegeName}. Check eligibility criteria, required documents, and fill the online application form.`} />
      </Helmet>
      <section className="bg-gradient-to-r from-[#006B3F] to-[#004d2d] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{fontFamily:"Playfair Display,serif"}}>Admissions</h1>
          <p className="text-xl text-[#C8A951]">Join our community of excellence</p>
        </div>
      </section>

      {/* Eligibility Table */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#006B3F] mb-2" style={{fontFamily:"Playfair Display,serif"}}>Eligibility Criteria</h2>
          <div className="w-16 h-1 bg-[#C8A951] mb-6"/>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden text-sm">
              <thead className="bg-[#006B3F] text-white">
                <tr>{["Program","Min Qualification","Min Marks","Age Limit"].map(h=><th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr>
              </thead>
              <tbody>
                {(settings?.eligibilityCriteria || []).map((r: any, i: number) => (
                  <tr key={i} className={i%2===0?"bg-gray-50":"bg-white"}>
                    <td className="px-4 py-3 text-gray-700">{r.program}</td>
                    <td className="px-4 py-3 text-gray-700">{r.qualification}</td>
                    <td className="px-4 py-3 text-gray-700">{r.marks}</td>
                    <td className="px-4 py-3 text-gray-700">{r.ageLimit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-10 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#006B3F] mb-2" style={{fontFamily:"Playfair Display,serif"}}>Required Documents</h2>
          <div className="w-16 h-1 bg-[#C8A951] mb-6"/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(settings?.requiredDocuments || []).map((d: string, i: number)=>(
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <div className="w-6 h-6 rounded-full bg-[#006B3F]/10 flex items-center justify-center shrink-0 mt-0.5"><ChevronRight className="w-3 h-3 text-[#006B3F]"/></div>
                <span className="text-gray-700 text-sm">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-r from-[#006B3F] to-[#004d2d] text-white text-center">
        <h2 className="text-4xl font-bold mb-3" style={{fontFamily:"Playfair Display,serif"}}>Ready to Apply?</h2>
        {admissionOpen ? (
          <>
            <p className="text-[#C8A951] mb-8 text-lg">Fill the online form and submit your documents</p>
            <button onClick={()=>{setShowModal(true);setStep(1);setSubmitted(false);setError("");}}
              className="bg-[#C8A951] hover:bg-[#b89841] text-white px-12 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 shadow-xl">
              Apply Online Now
            </button>
          </>
        ) : (
          <>
            <p className="text-red-300 mb-8 text-lg font-semibold">Admissions are currently closed.</p>
            <button onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })} className="bg-white hover:bg-gray-100 text-[#006B3F] px-12 py-4 rounded-xl text-lg font-bold transition-all shadow-xl">
              View Admission Criteria
            </button>
          </>
        )}
      </section>

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <h2 className="font-bold text-gray-800 text-lg">Online Admission Application</h2>
                <p className="text-xs text-gray-500">Step {step} of 3</p>
              </div>
              <button onClick={()=>setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4"/></button>
            </div>

            {/* Step indicator */}
            <div className="flex px-5 pt-4 gap-2">
              {["Personal Info","Academic Info","Documents"].map((s,i)=>(
                <div key={i} className="flex-1">
                  <div className={`h-1.5 rounded-full transition-colors ${step>i?"bg-[#006B3F]":"bg-gray-200"}`}/>
                  <p className={`text-xs mt-1 font-medium ${step===i+1?"text-[#006B3F]":"text-gray-400"}`}>{s}</p>
                </div>
              ))}
            </div>

            {submitted ? (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-green-600"/></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
                <p className="text-gray-500 text-sm mb-6">Aapki application college administration ko mil gayi hai. Jaldi notification aayega.</p>
                <button onClick={()=>setShowModal(false)} className="bg-[#006B3F] text-white px-8 py-2.5 rounded-lg font-semibold">Close</button>
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
                      <div><label className={labelCls}>Gender</label><select value={form.gender} onChange={f("gender")} className={inputCls}><option>Male</option><option>Female</option></select></div>
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
                        <label className="flex items-center gap-3 border-2 border-dashed border-gray-300 hover:border-[#006B3F] rounded-xl p-3 cursor-pointer transition-colors">
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
                  {step<3
                    ? <button onClick={()=>setStep(s=>s+1)} className="flex-1 bg-[#006B3F] hover:bg-[#003D1F] text-white py-2.5 rounded-lg text-sm font-semibold">Next Step</button>
                    : <button onClick={handleSubmit} disabled={submitting} className="flex-1 bg-[#006B3F] hover:bg-[#003D1F] text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50">
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
