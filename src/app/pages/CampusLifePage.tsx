import { Trophy, Music, Users, Heart, Award, BookOpen } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

const ICON_MAP: Record<string, any> = {
  "Literary Society": Users,
  "Science Society": Trophy,
  "Debating Club": Music,
  "Sports Club": Trophy,
  "Community Service Society": Heart,
  "Islamic Society": Users,
};

export function CampusLifePage() {
  const { settings } = useAdmin();
  const campusLife = settings?.campusLife;

  if (!campusLife) return null; // or a loading spinner

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
      {campusLife?.sportsGala && (campusLife?.sportsGala?.highlights?.length || 0) > 0 && (
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
                  This year's sports gala was held in {campusLife?.sportsGala?.year}, with over 800 student participants. The event concluded with a grand prize distribution ceremony.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#006B3F] mb-4">{campusLife?.sportsGala?.year} Sports Gala Highlights</h3>
                {campusLife?.sportsGala?.highlights?.map((hlt, i) => (
                  <div key={i} className="bg-[#F8F9FA] p-4 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-2">{hlt?.title}</h4>
                    {hlt?.details?.map((detail, j) => (
                      <p key={j} className="text-sm text-gray-600">{detail}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Annual Function */}
      {campusLife?.annualFunction && (
        <section className="py-16 bg-[#F8F9FA]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Annual Function & Prize Distribution
            </h2>
            <div className="w-20 h-1 bg-[#C8A951] mb-8" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#006B3F]">Annual Function {campusLife?.annualFunction?.year}</h3>
                <p className="text-gray-700">
                  The annual function and prize distribution ceremony is the pinnacle event of our academic calendar. The event celebrated academic excellence, extracurricular achievements, and student contributions to college life.
                </p>

                {campusLife?.annualFunction?.chiefGuest?.name && (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="font-bold text-[#006B3F] mb-3">Chief Guest</h4>
                    <p className="font-semibold text-gray-800">{campusLife?.annualFunction?.chiefGuest?.name}</p>
                    <p className="text-sm text-gray-600">{campusLife?.annualFunction?.chiefGuest?.title}</p>
                  </div>
                )}

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-bold text-[#006B3F] mb-3">Event Highlights</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {campusLife?.annualFunction?.highlights?.map((hlt, i) => (
                      <li key={i}>• {hlt}</li>
                    ))}
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
                    {campusLife?.annualFunction?.awards?.map((award, i) => (
                      <div key={i} className={`flex justify-between items-center ${i !== (campusLife?.annualFunction?.awards?.length || 0) - 1 ? 'border-b pb-2' : ''}`}>
                        <span className="text-gray-700">{award?.category}</span>
                        <span className="font-bold text-[#C8A951]">{award?.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Student Societies */}
      {campusLife?.studentSocieties && (campusLife?.studentSocieties?.length || 0) > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Student Societies & Clubs
            </h2>
            <div className="w-20 h-1 bg-[#C8A951] mx-auto mb-12" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campusLife?.studentSocieties?.map((society, index) => {
                const Icon = ICON_MAP[society?.name] || BookOpen;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <Icon className="w-12 h-12 text-[#006B3F] mb-4" />
                    <h3 className="text-xl font-bold text-[#006B3F] mb-3">{society?.name}</h3>
                    <p className="text-gray-700 text-sm mb-4">{society?.desc}</p>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">Key Activities:</h4>
                      <ul className="space-y-1">
                        {society?.activities?.map((activity, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#C8A951] rounded-full"></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Cultural Events */}
      {campusLife?.culturalEvents && (campusLife?.culturalEvents?.length || 0) > 0 && (
        <section className="py-16 bg-[#F8F9FA]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Cultural Events & Celebrations
            </h2>
            <div className="w-20 h-1 bg-[#C8A951] mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campusLife?.culturalEvents?.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-[#006B3F] text-white px-3 py-2 rounded font-bold text-sm">{item?.date}</div>
                    <h3 className="font-bold text-gray-800">{item?.event}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{item?.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Student Council */}
      {campusLife?.studentCouncil && (campusLife?.studentCouncil?.members?.length || 0) > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-[#006B3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Student Council {campusLife?.studentCouncil?.year}
            </h2>
            <div className="w-20 h-1 bg-[#C8A951] mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {campusLife?.studentCouncil?.members?.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center border-t-4 border-[#006B3F]">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#006B3F] to-[#004d2d] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member?.name?.split(' ')?.map((n: string) => n[0])?.join('')}
                  </div>
                  <h3 className="font-bold text-[#006B3F] mb-1">{member?.position}</h3>
                  <p className="font-semibold text-gray-800 mb-1">{member?.name}</p>
                  <p className="text-sm text-gray-600">{member?.program}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
