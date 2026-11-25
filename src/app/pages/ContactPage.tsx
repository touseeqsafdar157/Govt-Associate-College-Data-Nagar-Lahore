import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Youtube, MessageSquare } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { Helmet } from "react-helmet-async";

export function ContactPage() {
  const { settings, addMessage } = useAdmin();
  const collegeName = settings?.collegeName || "Govt. Associate College for Women (GACW) Data Nagar Lahore";
  const phoneNumber = settings?.phone || "042-37602172";
  const whatsappUrl = "https://wa.me/923197030016";
  const youtubeUrl = "https://www.youtube.com/@datanagarcollege5538";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [complaintForm, setComplaintForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmittingComplaint, setIsSubmittingComplaint] = useState(false);
  const [complaintSuccess, setComplaintSuccess] = useState(false);

  const handleComplaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingComplaint(true);
    try {
      await addMessage({
        ...complaintForm,
        name: complaintForm.name || "Anonymous",
        email: complaintForm.email || "anonymous@noreply.com",
        subject: "complaint"
      });
      setComplaintSuccess(true);
      setComplaintForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => {
        setComplaintSuccess(false);
        setShowComplaintModal(false);
      }, 3000);
    } catch (error) {
      alert("Failed to submit complaint.");
    } finally {
      setIsSubmittingComplaint(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addMessage(formData);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <Helmet>
        <title>Contact Us | {collegeName}</title>
        <meta name="description" content={`Contact ${collegeName}. Phone: ${phoneNumber}, WhatsApp, Email and Location details.`} />
      </Helmet>

      {/* Page Header */}
      {/* Theme: Changed from green bg-gradient-to-r from-[#006B3F] to-[#004d2d] to sky blue */}
      {/* Previous green: from-[#006B3F] to-[#004d2d] */}
      <section className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white py-16 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Contact Us
          </h1>
          <p className="text-xl text-[#C8A951] max-w-3xl leading-relaxed">
            Get in touch with our administration, faculty, and admissions desk — we are here to assist prospective students, parents, and community members with any inquiries.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      {/* Previous green tint: bg-[#F8F9FA] -> bg-[#F0F9FF]/40 */}
      <section className="py-16 bg-[#F0F9FF]/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center border border-sky-100">
              {/* Previous green: bg-[#006B3F] -> bg-[#0284C7] */}
              <div className="w-16 h-16 bg-[#0284C7] rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-[#082F49] mb-2">Address</h3>
              <p className="text-gray-600 text-sm">
                {(settings?.address || "Ilahi Bakhsh Road, Data Nagar, Badami Bagh, Lahore").split(',')?.map((line: any, i: number) => (
                  <span key={i}>{line?.trim()}<br /></span>
                ))}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center border border-sky-100">
              {/* Previous green: bg-[#006B3F] -> bg-[#0284C7] */}
              <div className="w-16 h-16 bg-[#0284C7] rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-[#082F49] mb-2">Phone & WhatsApp</h3>
              <p className="text-gray-700 text-sm font-semibold">
                Phone: {phoneNumber}
              </p>
              <p className="text-gray-600 text-xs mt-1 font-medium">
                WhatsApp: 0319-7030016
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-xs font-bold text-sky-600 hover:text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200"
              >
                Chat on WhatsApp (0319-7030016)
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center border border-sky-100">
              {/* Previous green: bg-[#006B3F] -> bg-[#0284C7] */}
              <div className="w-16 h-16 bg-[#0284C7] rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-[#082F49] mb-2">Email</h3>
              <p className="text-gray-600 text-sm">
                <a href={`mailto:${settings?.email || "info@gacw-datanagar.edu.pk"}`} className="hover:text-[#0284C7]">
                  {settings?.email || "info@gacw-datanagar.edu.pk"}
                </a>
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center border border-sky-100">
              {/* Previous green: bg-[#006B3F] -> bg-[#0284C7] */}
              <div className="w-16 h-16 bg-[#0284C7] rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-[#082F49] mb-2">Office Hours</h3>
              <p className="text-gray-600 text-sm">
                {(settings?.officeHours || "Monday - Friday\n8:00 AM - 2:00 PM")?.split('\n')?.map((line: any, i: number) => (
                  <span key={i}>{line?.trim()}<br /></span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
              <h2 className="text-4xl font-bold text-[#082F49] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Send Us a Message
              </h2>
              <div className="w-20 h-1 bg-[#0284C7] mb-8" />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                      placeholder="03XX-XXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Subject *</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                  >
                    <option value="">Select a subject</option>
                    <option value="admission">Admission Inquiry</option>
                    <option value="academic">Academic Programs & Faculty</option>
                    <option value="results">Results Query</option>
                    <option value="facilities">Science Labs & Sports Facilities</option>
                    <option value="complaint">Complaint / Suggestion</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                    placeholder="Type your message here..."
                  />
                </div>

                {/* Previous green: bg-[#006B3F] hover:bg-[#004d2d] -> bg-[#0284C7] hover:bg-[#0369A1] */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${submitSuccess ? 'bg-sky-700 hover:bg-sky-800' : 'bg-[#0284C7] hover:bg-[#0369A1]'} ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''} shadow-md`}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : submitSuccess ? (
                    "Message Sent Successfully!"
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 p-4 bg-[#F0F9FF]/60 rounded-xl border border-sky-100">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> For immediate queries, please call us directly at <strong>{phoneNumber}</strong> or message on WhatsApp.
                </p>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div>
              {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
              <h2 className="text-4xl font-bold text-[#082F49] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Find Us Here
              </h2>
              <div className="w-20 h-1 bg-[#0284C7] mb-8" />

              {/* Google Map */}
              <div className="w-full h-96 bg-gray-200 rounded-xl overflow-hidden mb-8 shadow-lg border border-sky-100">
                <iframe
                  src="https://www.google.com/maps?q=31.6018268,74.3219354&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="GACW Data Nagar Location Map"
                />
              </div>

              {/* Directions */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-sky-100 mb-6">
                <h3 className="text-xl font-bold text-[#082F49] mb-4">How to Reach Us</h3>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-[#0284C7] min-w-[80px]">By Bus:</span>
                    <span>Take routes passing through Badami Bagh & Data Nagar Lahore</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-[#0284C7] min-w-[80px]">By Metro:</span>
                    <span>Nearby Metro Station connection to Data Nagar area</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-[#0284C7] min-w-[80px]">By Car:</span>
                    <span>Ilahi Bakhsh Road Data Nagar, safe and accessible campus for female students</span>
                  </p>
                </div>
              </div>

              {/* Social Media */}
              {/* Previous green: bg-[#006B3F] -> bg-[#082F49] */}
              <div className="bg-gradient-to-br from-[#082F49] to-[#0369A1] p-6 rounded-xl shadow-lg text-white">
                <h3 className="text-xl font-bold mb-2">Connect With GACW</h3>
                <p className="mb-4 text-sm text-sky-100">Official YouTube Channel, WhatsApp Support & College Announcements</p>
                <div className="flex flex-wrap gap-4 items-center">
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow"
                    title="Official YouTube Channel"
                  >
                    <Youtube className="w-5 h-5" />
                    <span>YouTube Channel</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow"
                    title="WhatsApp Chat"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16 bg-[#F0F9FF]/40">
        <div className="container mx-auto px-4">
          {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
          <h2 className="text-4xl font-bold text-center text-[#082F49] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Department Contacts
          </h2>
          <div className="w-20 h-1 bg-[#0284C7] mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(settings?.departments || [])?.map((dept: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-sky-100">
                <h3 className="font-bold text-[#082F49] text-lg mb-3">{dept?.dept}</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">{dept?.name}</p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-[#0284C7]" />
                    {dept?.phone}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4 text-[#0284C7]" />
                    <a href={`mailto:${dept?.email}`} className="hover:text-[#0284C7]">{dept?.email}</a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complaint Box */}
      {/* Previous green: bg-[#006B3F] -> bg-[#082F49] */}
      <section className="py-16 bg-[#082F49] text-white">
        <div className="container mx-auto px-4 text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 text-[#C8A951]" />
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Complaint / Suggestion Box
          </h2>
          <p className="mb-6 text-sky-100 max-w-2xl mx-auto">
            We value your feedback. If you have any complaints or suggestions to improve our services at GACW Data Nagar, please submit them anonymously or with your details.
          </p>
          <button
            onClick={() => setShowComplaintModal(true)}
            className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
          >
            Submit Complaint / Suggestion
          </button>
        </div>
      </section>

      {/* Complaint Modal */}
      {showComplaintModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowComplaintModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-[#082F49] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Submit a Complaint or Suggestion
            </h2>
            <form onSubmit={handleComplaintSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name (Optional)</label>
                <input
                  type="text"
                  value={complaintForm.name}
                  onChange={(e) => setComplaintForm({ ...complaintForm, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                  placeholder="Anonymous"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email (Optional)</label>
                <input
                  type="email"
                  value={complaintForm.email}
                  onChange={(e) => setComplaintForm({ ...complaintForm, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                  placeholder="For follow-up"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={complaintForm.message}
                  onChange={(e) => setComplaintForm({ ...complaintForm, message: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                  placeholder="Describe your complaint or suggestion..."
                />
              </div>
              {/* Previous green: bg-[#006B3F] hover:bg-[#004d2d] -> bg-[#0284C7] hover:bg-[#0369A1] */}
              <button
                type="submit"
                disabled={isSubmittingComplaint}
                className={`w-full text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${complaintSuccess ? 'bg-sky-700' : 'bg-[#0284C7] hover:bg-[#0369A1]'} ${isSubmittingComplaint ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmittingComplaint ? "Submitting..." : complaintSuccess ? "Submitted Successfully!" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
