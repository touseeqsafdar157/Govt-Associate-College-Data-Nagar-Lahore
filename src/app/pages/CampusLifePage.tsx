import { Trophy, Music, Users, Heart, Award } from "lucide-react";

export function CampusLifePage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#006B3F] to-[#004d2d] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Campus Life
          </h1>
          <p className="text-xl text-[#C8A951]">Beyond academics - a vibrant community experience</p>
        </div>
      </section>

      {/* Sports Gala */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Annual Sports Gala
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="aspect-video bg-gradient-to-br from-[#006B3F] to-[#004d2d] rounded-lg flex items-center justify-center mb-6">
                <Trophy className="w-32 h-32 text-white opacity-50" />
              </div>
              <p className="text-gray-700 mb-4">
                Our annual sports gala is a highlight of the academic year, bringing together students from all departments to compete in various sporting events. The three-day event includes cricket, football, volleyball, badminton, and athletics competitions.
              </p>
              <p className="text-gray-700">
                This year's sports gala was held from March 15-17, 2026, with over 800 student participants. The event concluded with a grand prize distribution ceremony presided over by Mr. Jahangir Khan, former world squash champion.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#006B3F] mb-4">2026 Sports Gala Highlights</h3>
              <div className="bg-[#F8F9FA] p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-2">Cricket Championship</h4>
                <p className="text-sm text-gray-600">Winners: FSc Pre-Engineering Team A</p>
                <p className="text-sm text-gray-600">Best Player: Muhammad Hamza (50 runs, 3 wickets)</p>
              </div>
              <div className="bg-[#F8F9FA] p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-2">Football Tournament</h4>
                <p className="text-sm text-gray-600">Winners: ADP Science Team</p>
                <p className="text-sm text-gray-600">Best Player: Ahmed Raza (4 goals)</p>
              </div>
              <div className="bg-[#F8F9FA] p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-2">Athletics Events</h4>
                <p className="text-sm text-gray-600">100m Sprint: Ali Akbar (11.2 seconds)</p>
                <p className="text-sm text-gray-600">Long Jump: Sara Khan (5.2 meters)</p>
              </div>
              <div className="bg-[#F8F9FA] p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-2">Volleyball Championship</h4>
                <p className="text-sm text-gray-600">Winners: I.Com Department Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Function */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Annual Function & Prize Distribution
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#006B3F]">Annual Function 2026</h3>
              <p className="text-gray-700">
                The annual function and prize distribution ceremony is the pinnacle event of our academic calendar. Held on April 18, 2026, the event celebrated academic excellence, extracurricular achievements, and student contributions to college life.
              </p>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-[#006B3F] mb-3">Chief Guest</h4>
                <p className="font-semibold text-gray-800">Prof. Dr. Khalid Manzoor Butt</p>
                <p className="text-sm text-gray-600">Vice Chancellor, University of Engineering & Technology, Lahore</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-[#006B3F] mb-3">Event Highlights</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Recitation of Holy Quran</li>
                  <li>• National Anthem</li>
                  <li>• Principal's Annual Report</li>
                  <li>• Chief Guest's Address</li>
                  <li>• Prize Distribution to Position Holders</li>
                  <li>• Cultural Performances</li>
                  <li>• Vote of Thanks</li>
                </ul>
              </div>
            </div>

            <div>
              <div className="aspect-video bg-gradient-to-br from-[#006B3F] to-[#004d2d] rounded-lg flex items-center justify-center mb-6">
                <Award className="w-32 h-32 text-white opacity-50" />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-[#006B3F] mb-4">Awards Distributed</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700">Position Holders</span>
                    <span className="font-bold text-[#C8A951]">52 students</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700">Sports Excellence</span>
                    <span className="font-bold text-[#C8A951]">28 students</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700">Best Debater</span>
                    <span className="font-bold text-[#C8A951]">3 students</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700">Literary Achievements</span>
                    <span className="font-bold text-[#C8A951]">15 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Community Service</span>
                    <span className="font-bold text-[#C8A951]">10 students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Societies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Student Societies & Clubs
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                name: "Literary Society",
                desc: "Organizes debates, poetry competitions, essay writing contests, and book reading sessions. Active participation in inter-college literary events.",
                activities: ["Monthly Mushaira", "English Debates", "Book Club", "Magazine Publication"]
              },
              {
                icon: Trophy,
                name: "Science Society",
                desc: "Promotes scientific thinking through experiments, science fairs, exhibitions, and guest lectures by renowned scientists.",
                activities: ["Annual Science Fair", "Lab Demonstrations", "Research Projects", "Quiz Competitions"]
              },
              {
                icon: Music,
                name: "Debating Club",
                desc: "Develops public speaking and critical thinking skills through regular debate sessions on current affairs and social issues.",
                activities: ["Weekly Debates", "MUN Participation", "Public Speaking Workshops", "Inter-College Competitions"]
              },
              {
                icon: Trophy,
                name: "Sports Club",
                desc: "Coordinates sports activities, training sessions, and represents college in inter-college tournaments across Punjab.",
                activities: ["Daily Practice Sessions", "Tournament Participation", "Sports Training Camps", "Fitness Programs"]
              },
              {
                icon: Heart,
                name: "Community Service Society",
                desc: "Engages students in social welfare activities, charity drives, and community development initiatives.",
                activities: ["Blood Donation Camps", "Tree Plantation Drives", "Charity Collections", "Orphanage Visits"]
              },
              {
                icon: Users,
                name: "Islamic Society",
                desc: "Organizes religious activities, Quranic studies, lectures on Islamic history and values, and Ramadan programs.",
                activities: ["Quran Classes", "Islamic Lectures", "Ramadan Activities", "Naat Competitions"]
              },
            ].map((society, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <society.icon className="w-12 h-12 text-[#006B3F] mb-4" />
                <h3 className="text-xl font-bold text-[#006B3F] mb-3">{society.name}</h3>
                <p className="text-gray-700 text-sm mb-4">{society.desc}</p>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">Key Activities:</h4>
                  <ul className="space-y-1">
                    {society.activities.map((activity, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#C8A951] rounded-full"></span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Events */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Cultural Events & Celebrations
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { event: "Pakistan Day Celebration", date: "March 23", desc: "Flag hoisting, speeches, and cultural performances celebrating Pakistan's history" },
              { event: "Independence Day", date: "August 14", desc: "Patriotic celebrations with flag ceremony, tableaux, and national songs" },
              { event: "Iqbal Day", date: "November 9", desc: "Poetry recitations, speeches on Allama Iqbal's philosophy and vision" },
              { event: "Kashmir Solidarity Day", date: "February 5", desc: "Awareness sessions and solidarity rallies supporting Kashmir cause" },
              { event: "Defence Day", date: "September 6", desc: "Tribute to armed forces with speeches and documentary screenings" },
              { event: "Quaid-e-Azam Day", date: "December 25", desc: "Celebrating founder's birthday with speeches and essay competitions" },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#006B3F] text-white px-3 py-2 rounded font-bold text-sm">{item.date}</div>
                  <h3 className="font-bold text-gray-800">{item.event}</h3>
                </div>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Council */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Student Council 2026
          </h2>
          <div className="w-20 h-1 bg-[#C8A951] mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { position: "President", name: "Ali Hassan", program: "FSc Pre-Engineering" },
              { position: "Vice President", name: "Ayesha Malik", program: "FSc Pre-Medical" },
              { position: "General Secretary", name: "Usman Tariq", program: "ICS" },
              { position: "Sports Secretary", name: "Ahmed Raza", program: "ADP Science" },
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center border-t-4 border-[#006B3F]">
                <div className="w-20 h-20 bg-gradient-to-br from-[#006B3F] to-[#004d2d] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-bold text-[#006B3F] mb-1">{member.position}</h3>
                <p className="font-semibold text-gray-800 mb-1">{member.name}</p>
                <p className="text-sm text-gray-600">{member.program}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
