import { useState } from "react";
import { Mail, GraduationCap, Award } from "lucide-react";

export function FacultyPage() {
  const [activeDept, setActiveDept] = useState("all");

  const faculty = [
    { name: "Dr. Fatima Ahmed", designation: "Associate Professor", qualification: "Ph.D. in Physics", dept: "Science", subject: "Physics", experience: "18 years", email: "fatima.ahmed@gacdatanagar.edu.pk", isHOD: true },
    { name: "Prof. Amir Khan", designation: "Professor", qualification: "Ph.D. in Chemistry", dept: "Science", subject: "Chemistry", experience: "22 years", email: "amir.khan@gacdatanagar.edu.pk", isHOD: false },
    { name: "Dr. Sarah Malik", designation: "Assistant Professor", qualification: "Ph.D. in Biology", dept: "Science", subject: "Biology", experience: "12 years", email: "sarah.malik@gacdatanagar.edu.pk", isHOD: false },
    { name: "Mr. Hassan Ali", designation: "Lecturer", qualification: "M.Phil Mathematics", dept: "Science", subject: "Mathematics", experience: "10 years", email: "hassan.ali@gacdatanagar.edu.pk", isHOD: false },

    { name: "Dr. Ayesha Siddiqui", designation: "Associate Professor", qualification: "Ph.D. in English Literature", dept: "Arts", subject: "English", experience: "15 years", email: "ayesha.siddiqui@gacdatanagar.edu.pk", isHOD: true },
    { name: "Prof. Tariq Mahmood", designation: "Professor", qualification: "Ph.D. in Urdu", dept: "Arts", subject: "Urdu", experience: "25 years", email: "tariq.mahmood@gacdatanagar.edu.pk", isHOD: false },
    { name: "Ms. Zainab Hussain", designation: "Lecturer", qualification: "M.A. Islamic Studies", dept: "Arts", subject: "Islamic Studies", experience: "8 years", email: "zainab.hussain@gacdatanagar.edu.pk", isHOD: false },
    { name: "Mr. Bilal Ahmed", designation: "Lecturer", qualification: "M.A. Pakistan Studies", dept: "Arts", subject: "Pakistan Studies", experience: "6 years", email: "bilal.ahmed@gacdatanagar.edu.pk", isHOD: false },

    { name: "Mr. Usman Farooq", designation: "Assistant Professor", qualification: "M.Phil Commerce", dept: "Commerce", subject: "Accounting", experience: "14 years", email: "usman.farooq@gacdatanagar.edu.pk", isHOD: true },
    { name: "Ms. Mariam Naveed", designation: "Lecturer", qualification: "MBA (Finance)", dept: "Commerce", subject: "Business", experience: "9 years", email: "mariam.naveed@gacdatanagar.edu.pk", isHOD: false },
    { name: "Mr. Kamran Raza", designation: "Lecturer", qualification: "M.Com Economics", dept: "Commerce", subject: "Economics", experience: "11 years", email: "kamran.raza@gacdatanagar.edu.pk", isHOD: false },

    { name: "Professor Komal", designation: "Assistant Professor", qualification: "M.Phil Computer Science", dept: "Computer", subject: "Computer Science", experience: "13 years", email: "imran.shahid@gacdatanagar.edu.pk", isHOD: true },
    { name: "Miss Saba Ather", designation: "Lecturer", qualification: "MS Computer Science", dept: "Computer", subject: "Programming", experience: "7 years", email: "sana.iqbal@gacdatanagar.edu.pk", isHOD: false },
    // { name: "Mr. Adnan Malik", designation: "Lab Instructor", qualification: "BS Computer Science", dept: "Computer", subject: "Computer Lab", experience: "5 years", email: "adnan.malik@gacdatanagar.edu.pk", isHOD: false },
  ];

  const nonTeaching = [
    { name: "Mr. Khalid Javed", designation: "Chief Librarian", qualification: "M.A. Library Science", experience: "20 years" },
    { name: "Ms. Rabia Noor", designation: "Lab Assistant (Chemistry)", qualification: "BS Chemistry", experience: "6 years" },
    { name: "Mr. Faisal Abbas", designation: "Lab Assistant (Physics)", qualification: "BS Physics", experience: "8 years" },
    { name: "Ms. Nida Khan", designation: "Admin Officer", qualification: "MBA", experience: "12 years" },
  ];

  const filteredFaculty = activeDept === "all" ? faculty : faculty.filter(f => f.dept === activeDept);
  const hods = filteredFaculty.filter(f => f.isHOD);
  const others = filteredFaculty.filter(f => !f.isHOD);

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#006B3F] to-[#004d2d] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Faculty
          </h1>
          <p className="text-xl text-[#C8A951]">Meet our dedicated team of educators</p>
        </div>
      </section>

      {/* Department Tabs */}
      <section className="py-8 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: "all", label: "All Faculty" },
              { id: "Science", label: "Science" },
              { id: "Arts", label: "Arts" },
              { id: "Commerce", label: "Commerce" },
              { id: "Computer", label: "Computer" },
            ].map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveDept(dept.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeDept === dept.id
                    ? "bg-[#006B3F] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* HODs Section */}
      {hods.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#006B3F] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Heads of Departments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hods.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-[#C8A951] hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#006B3F] to-[#004d2d] rounded-full mx-auto mb-4 flex items-center justify-center">
                      <GraduationCap className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                      <p className="text-[#C8A951] font-semibold mb-1">{member.designation}</p>
                      <p className="text-sm text-gray-600 mb-2">{member.qualification}</p>
                      <span className="inline-block bg-[#006B3F] text-white text-xs px-3 py-1 rounded-full">HOD - {member.dept}</span>
                    </div>
                    <div className="border-t pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subject:</span>
                        <span className="font-semibold text-gray-800">{member.subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experience:</span>
                        <span className="font-semibold text-gray-800">{member.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <Mail className="w-4 h-4 text-[#006B3F]" />
                        <a href={`mailto:${member.email}`} className="text-[#006B3F] hover:underline text-xs">
                          {member.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Faculty Grid */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#006B3F] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Teaching Staff
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {others.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#006B3F] to-[#004d2d] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center mb-4">
                    <h3 className="font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-sm text-[#C8A951] mb-1">{member.designation}</p>
                    <p className="text-xs text-gray-600 mb-2">{member.qualification}</p>
                    <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">{member.dept}</span>
                  </div>
                  <div className="border-t pt-3 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subject:</span>
                      <span className="font-semibold text-gray-800">{member.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Exp:</span>
                      <span className="font-semibold text-gray-800">{member.experience}</span>
                    </div>
                    <a href={`mailto:${member.email}`} className="flex items-center gap-1 text-[#006B3F] hover:underline mt-2">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">Email</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Non-Teaching Staff */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#006B3F] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Non-Teaching Staff
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nonTeaching.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-[#C8A951] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{member.name.charAt(0)}</span>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-sm text-[#006B3F] mb-2">{member.designation}</p>
                  <p className="text-xs text-gray-600 mb-1">{member.qualification}</p>
                  <p className="text-xs text-gray-500">{member.experience} experience</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
