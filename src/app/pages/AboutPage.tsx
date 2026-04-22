import { CheckCircle, Target, Eye, Award } from "lucide-react";

export function AboutPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#006B3F] to-[#004d2d] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            About Us
          </h1>
          <p className="text-xl text-[#C8A951]">Learn about our history, mission, and values</p>
        </div>
      </section>

      {/* College History */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Our History
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="bg-[#006B3F] text-white font-bold px-4 py-2 rounded-lg h-fit">1981</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Foundation</h3>
                <p className="text-gray-700">Government Associate College, Data Nagar was established by the Government of Punjab to provide quality intermediate education to the youth of the region.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-[#006B3F] text-white font-bold px-4 py-2 rounded-lg h-fit">1995</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Expansion</h3>
                <p className="text-gray-700">Introduction of Associate Degree Programs (ADP) in multiple disciplines, expanding educational opportunities for students.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-[#006B3F] text-white font-bold px-4 py-2 rounded-lg h-fit">2010</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Modernization</h3>
                <p className="text-gray-700">Comprehensive upgrade of laboratory facilities and introduction of modern computer labs with latest technology.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-[#C8A951] text-white font-bold px-4 py-2 rounded-lg h-fit">2026</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Present Day</h3>
                <p className="text-gray-700">Today, GAC Data Nagar stands as a leading public-sector college with over 3,500 students and a legacy of academic excellence spanning 45 years.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Eye className="w-16 h-16 text-[#006B3F] mb-4" />
              <h2 className="text-3xl font-bold text-[#006B3F] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To be a center of academic excellence that empowers students with knowledge, skills, and ethical values, preparing them to become responsible citizens and future leaders who contribute meaningfully to the nation's development and progress.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Target className="w-16 h-16 text-[#006B3F] mb-4" />
              <h2 className="text-3xl font-bold text-[#006B3F] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Our Mission
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span>Provide quality education accessible to all segments of society</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span>Foster critical thinking and innovation among students</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span>Develop character and ethical values alongside academics</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span>Promote research and scholarly activities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Full Message */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Message from the Principal
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#006B3F] to-[#004d2d] p-6 rounded-lg text-white text-center">
                <div className="w-48 h-48 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-24 h-24" />
                </div>
                <h3 className="text-xl font-bold mb-2">Prof. Dr. Farzana Ashfaq</h3>
                <p className="text-[#C8A951]">Principal</p>
                <p className="text-sm mt-2">Ph.D. in Education Management</p>
                <p className="text-sm">30+ Years in Academia</p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4 text-gray-700">
              <p className="leading-relaxed">
                Dear Students, Parents, and Well-wishers,
              </p>
              <p className="leading-relaxed">
                It gives me immense pleasure to welcome you to Government Associate College, Data Nagar. As we complete 45 years of service to education, I am proud to lead an institution that has consistently maintained the highest standards of academic excellence and moral values.
              </p>
              <p className="leading-relaxed">
                Education is not merely about acquiring knowledge from textbooks; it is about character building, developing critical thinking, and preparing young minds to face the challenges of the modern world. At GAC Data Nagar, we are committed to nurturing well-rounded individuals who excel not only academically but also in extracurricular activities and community service.
              </p>
              <p className="leading-relaxed">
                Our dedicated faculty members, modern infrastructure, and comprehensive curriculum ensure that every student receives individual attention and the best possible education. We take pride in our state-of-the-art laboratories, extensive library, and sports facilities that provide students with opportunities for holistic development.
              </p>
              <p className="leading-relaxed">
                I encourage all our students to make the most of the opportunities available to them, maintain discipline, work hard, and aspire to become responsible citizens of Pakistan. Together, we can build a brighter future for our nation.
              </p>
              <p className="leading-relaxed italic">
                With best wishes for your success,<br />
                Prof. Dr. Farzana Ashfaq<br />
                Principal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Achievements & Milestones
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "98% Success Rate", desc: "Consistent excellent results in board examinations" },
              { title: "50+ Position Holders", desc: "Students securing top positions in BISE annually" },
              { title: "National Champions", desc: "Multiple sports championships at provincial level" },
              { title: "Research Excellence", desc: "Published research papers by faculty members" },
              { title: "Community Service", desc: "Active participation in social welfare programs" },
              { title: "HEC Recognition", desc: "Recognized by Higher Education Commission" },
            ].map((achievement, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
                <Award className="w-12 h-12 text-[#C8A951] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#006B3F] mb-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Infrastructure Overview
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8F9FA] p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#006B3F] mb-4">Campus Facilities</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" /> 15 acres campus area</li>
                <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" /> 45 well-equipped classrooms</li>
                <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" /> 4 specialized science laboratories</li>
                <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" /> Modern computer lab with 60 systems</li>
                <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" /> Library with 15,000+ books</li>
              </ul>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#006B3F] mb-4">Support Facilities</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" /> Air-conditioned seminar hall (capacity 500)</li>
                <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" /> Sports complex with indoor/outdoor facilities</li>
                <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" /> Spacious parking area</li>
                <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" /> Canteen with hygienic food options</li>
                <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-[#C8A951] flex-shrink-0 mt-1" /> 24/7 security and CCTV surveillance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
