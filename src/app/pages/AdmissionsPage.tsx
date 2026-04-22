import { Calendar, FileText, DollarSign, HelpCircle, Award } from "lucide-react";
import { useState } from "react";

export function AdmissionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is the admission process?",
      a: "Submit the online application form along with required documents. After document verification, merit lists will be published. Selected candidates must complete fee submission within the given deadline.",
    },
    {
      q: "Can I apply for multiple programs?",
      a: "Yes, you can apply for up to two programs, but you must indicate your preference. Admission will be offered based on merit and program availability.",
    },
    {
      q: "What documents are required for admission?",
      a: "Original and photocopies of: Matric/FSc certificates and mark sheets, CNIC/B-Form, domicile, 4 passport-size photos, and migration certificate (if applicable).",
    },
    {
      q: "Are there scholarships available?",
      a: "Yes, we offer merit-based scholarships for position holders and need-based financial assistance for deserving students. Apply during the admission process.",
    },
    {
      q: "What is the last date for admissions?",
      a: "The last date for intermediate programs is August 15, 2026. For ADP programs, the deadline is August 20, 2026. Late admissions may be considered on a case-by-case basis.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#006B3F] to-[#004d2d] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Admissions
          </h1>
          <p className="text-xl text-[#C8A951]">Join our community of excellence</p>
        </div>
      </section>

      {/* Admission Schedule */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Admission Schedule 2026-27
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="relative">
            <div className="absolute left-0 md:left-1/2 h-full w-1 bg-[#C8A951]" />

            {[
              { date: "July 1, 2026", event: "Admissions Open", desc: "Online application portal opens" },
              { date: "July 15, 2026", event: "Information Session", desc: "Open day for prospective students" },
              { date: "August 10, 2026", event: "Application Deadline (Intermediate)", desc: "Last date for submission" },
              { date: "August 15, 2026", event: "Application Deadline (ADP)", desc: "Last date for ADP programs" },
              { date: "August 20, 2026", event: "Merit Lists Published", desc: "First merit list announcement" },
              { date: "August 25, 2026", event: "Fee Submission Deadline", desc: "Confirm admission with fee payment" },
              { date: "September 1, 2026", event: "Classes Commence", desc: "Academic session begins" },
            ].map((item, index) => (
              <div key={index} className="mb-8 flex items-center">
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:ml-auto md:pl-12'} ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-sm text-[#C8A951] mb-1">{item.date}</p>
                    <h3 className="text-xl font-bold text-[#006B3F] mb-2">{item.event}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[#006B3F] rounded-full border-4 border-white -ml-[7px]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Eligibility Criteria
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead className="bg-[#006B3F] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Program</th>
                  <th className="px-6 py-4 text-left">Minimum Qualification</th>
                  <th className="px-6 py-4 text-left">Minimum Marks</th>
                  <th className="px-6 py-4 text-left">Age Limit</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { program: "FSc (Pre-Medical/Engineering)", qualification: "Matric (Science)", marks: "60%", age: "Under 20 years" },
                  { program: "ICS", qualification: "Matric (Science)", marks: "55%", age: "Under 20 years" },
                  { program: "FA", qualification: "Matric (Any group)", marks: "50%", age: "Under 20 years" },
                  { program: "I.Com", qualification: "Matric (Any group)", marks: "50%", age: "Under 20 years" },
                  { program: "ADP (Science)", qualification: "FSc/ICS", marks: "45%", age: "Under 23 years" },
                  { program: "ADP (Arts)", qualification: "FA/FSc/ICS", marks: "45%", age: "Under 23 years" },
                  { program: "ADP (Commerce)", qualification: "I.Com/FSc/FA", marks: "45%", age: "Under 23 years" },
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-semibold text-gray-800">{row.program}</td>
                    <td className="px-6 py-4 text-gray-600">{row.qualification}</td>
                    <td className="px-6 py-4 text-gray-600">{row.marks}</td>
                    <td className="px-6 py-4 text-gray-600">{row.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Fee Structure 2026-27
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead className="bg-[#006B3F] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Program</th>
                  <th className="px-6 py-4 text-right">Tuition Fee</th>
                  <th className="px-6 py-4 text-right">Lab Fee</th>
                  <th className="px-6 py-4 text-right">Admission Fee</th>
                  <th className="px-6 py-4 text-right">Total (Annual)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { program: "FSc Pre-Medical", tuition: "12,000", lab: "2,500", admission: "500", total: "15,000" },
                  { program: "FSc Pre-Engineering", tuition: "12,000", lab: "2,500", admission: "500", total: "15,000" },
                  { program: "ICS", tuition: "14,000", lab: "3,500", admission: "500", total: "18,000" },
                  { program: "FA", tuition: "11,000", lab: "500", admission: "500", total: "12,000" },
                  { program: "I.Com", tuition: "13,000", lab: "500", admission: "500", total: "14,000" },
                  { program: "ADP Science", tuition: "20,000", lab: "4,500", admission: "500", total: "25,000" },
                  { program: "ADP Arts", tuition: "21,000", lab: "500", admission: "500", total: "22,000" },
                  { program: "ADP Commerce", tuition: "23,000", lab: "500", admission: "500", total: "24,000" },
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-semibold text-gray-800">{row.program}</td>
                    <td className="px-6 py-4 text-right text-gray-600">PKR {row.tuition}</td>
                    <td className="px-6 py-4 text-right text-gray-600">PKR {row.lab}</td>
                    <td className="px-6 py-4 text-right text-gray-600">PKR {row.admission}</td>
                    <td className="px-6 py-4 text-right font-bold text-[#006B3F]">PKR {row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-[#F8F9FA] p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> Fee concessions and scholarships are available for deserving students. Government employees can avail special discounts. Fee can be paid in two installments.
            </p>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Required Documents
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Matric/Intermediate Certificate & Mark Sheets (Original + 2 Photocopies)",
              "CNIC or B-Form (Original + 2 Photocopies)",
              "Domicile Certificate (Original + 2 Photocopies)",
              "4 Recent Passport-size Photographs",
              "Character Certificate from Previous Institution",
              "Migration Certificate (if from another board)",
              "Hafiz-e-Quran Certificate (if applicable, for fee concession)",
              "Income Certificate for Scholarship (if applying)",
            ].map((doc, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <FileText className="w-6 h-6 text-[#006B3F] flex-shrink-0 mt-1" />
                <span className="text-gray-700">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Scholarships & Fee Concessions
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Merit Scholarships", desc: "100% fee waiver for position holders (1st-3rd position)", percent: "100%" },
              { title: "Need-Based Aid", desc: "50-75% fee concession for financially deserving students", percent: "50-75%" },
              { title: "Hafiz-e-Quran", desc: "50% fee concession for Hafiz-e-Quran students", percent: "50%" },
              { title: "Orphan Students", desc: "100% fee waiver for orphan students with valid documentation", percent: "100%" },
              { title: "Government Employees", desc: "20% discount for children of government employees", percent: "20%" },
              { title: "Sports Quota", desc: "25% concession for district/provincial level players", percent: "25%" },
            ].map((scholarship, index) => (
              <div key={index} className="bg-white border-2 border-[#006B3F] rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <Award className="w-10 h-10 text-[#C8A951]" />
                  <span className="text-2xl font-bold text-[#006B3F]">{scholarship.percent}</span>
                </div>
                <h3 className="text-xl font-bold text-[#006B3F] mb-2">{scholarship.title}</h3>
                <p className="text-gray-600 text-sm">{scholarship.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#006B3F]" />
                    {faq.q}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#006B3F] transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#006B3F] to-[#004d2d] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to Apply?
          </h2>
          <p className="text-xl mb-8 text-[#C8A951]">Join us and start your journey to success</p>
          <button className="bg-[#C8A951] hover:bg-[#b89841] text-white px-12 py-4 rounded-lg text-lg font-semibold transition-colors">
            Apply Now Online
          </button>
        </div>
      </section>
    </div>
  );
}
