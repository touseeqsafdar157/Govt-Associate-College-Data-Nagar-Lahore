import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Youtube, MessageSquare } from "lucide-react";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#006B3F] to-[#004d2d] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Contact Us
          </h1>
          <p className="text-xl text-[#C8A951]">Get in touch with us</p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-[#006B3F] rounded-full mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-[#006B3F] mb-2">Address</h3>
              <p className="text-gray-600 text-sm">
                Ilahi Bakhsh Road Data Nagar<br />
                Data Nagar, Lahore<br />
                Punjab, Pakistan
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-[#006B3F] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-[#006B3F] mb-2">Phone</h3>
              <p className="text-gray-600 text-sm">
                Office: 04237602172<br />
                Principal: 042-1234568<br />
                Admission: 042-1234569
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-[#006B3F] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-[#006B3F] mb-2">Email</h3>
              <p className="text-gray-600 text-sm">
                datanagargacw@gmail.com<br />
                principal@gacdatanagar.edu.pk<br />
                admissions@gacdatanagar.edu.pk
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-[#006B3F] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-[#006B3F] mb-2">Office Hours</h3>
              <p className="text-gray-600 text-sm">
                Monday - Friday<br />
                8:00 AM - 4:00 PM<br />
                Saturday: 8:00 AM - 1:00 PM
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
              <h2 className="text-4xl font-bold text-[#006B3F] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Send Us a Message
              </h2>
              <div className="w-20 h-1 bg-[#C8A951] mb-8" />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                  >
                    <option value="">Select a subject</option>
                    <option value="admission">Admission Inquiry</option>
                    <option value="academic">Academic Information</option>
                    <option value="results">Results Query</option>
                    <option value="facilities">Facilities & Infrastructure</option>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                    placeholder="Type your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#006B3F] hover:bg-[#004d2d] text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>

              <div className="mt-8 p-4 bg-[#F8F9FA] rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> For urgent matters, please call our office directly. We typically respond to messages within 24-48 hours during working days.
                </p>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div>
              <h2 className="text-4xl font-bold text-[#006B3F] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Find Us Here
              </h2>
              <div className="w-20 h-1 bg-[#C8A951] mb-8" />

              {/* Google Map */}
              <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-8 shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54449.96683984406!2d74.30943!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMTgnMzMuOSJF!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="College Location Map"
                />
              </div>

              {/* Directions */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-bold text-[#006B3F] mb-4">How to Reach Us</h3>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-[#C8A951] min-w-[80px]">By Bus:</span>
                    <span>Take routes 15, 22, or 45 from Main Lahore Terminal</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-[#C8A951] min-w-[80px]">By Metro:</span>
                    <span>Data Nagar Metro Station is 10 minutes walk from college</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-[#C8A951] min-w-[80px]">By Car:</span>
                    <span>Ilahi Bakhsh Road Data Nagar, ample parking available on campus</span>
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-[#006B3F] p-6 rounded-lg shadow-lg text-white">
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <p className="mb-4 text-sm">Follow us on social media for latest updates and announcements</p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Department Contacts
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { dept: "Principal Office", name: "Prof. Dr. Farzana Ashfaq", phone: "042-1234568", email: "principal@gacdatanagar.edu.pk" },
              { dept: "Admissions Office", name: "Mr. Usman Farooq", phone: "042-1234569", email: "admissions@gacdatanagar.edu.pk" },
              { dept: "Examination Section", name: "Ms. Nida Khan", phone: "042-1234570", email: "exams@gacdatanagar.edu.pk" },
              { dept: "Accounts Office", name: "Mr. Hassan Raza", phone: "042-1234571", email: "accounts@gacdatanagar.edu.pk" },
              { dept: "Library", name: "Mr. Khalid Javed", phone: "042-1234572", email: "library@gacdatanagar.edu.pk" },
              { dept: "IT Department", name: "Professor Komal", phone: "042-1234573", email: "it@gacdatanagar.edu.pk" },
            ].map((dept, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-[#006B3F] text-lg mb-3">{dept.dept}</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">{dept.name}</p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-[#C8A951]" />
                    {dept.phone}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4 text-[#C8A951]" />
                    <a href={`mailto:${dept.email}`} className="hover:text-[#006B3F]">{dept.email}</a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complaint Box */}
      <section className="py-16 bg-[#006B3F] text-white">
        <div className="container mx-auto px-4 text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Complaint / Suggestion Box
          </h2>
          <p className="mb-6 text-[#C8A951] max-w-2xl mx-auto">
            We value your feedback. If you have any complaints or suggestions to improve our services, please submit them anonymously or with your details.
          </p>
          <button className="bg-[#C8A951] hover:bg-[#b89841] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Submit Complaint / Suggestion
          </button>
        </div>
      </section>
    </div>
  );
}
