import { Trophy, Music, Users, Heart, Award, BookOpen, Activity } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { Helmet } from "react-helmet-async";

const ICON_MAP: Record<string, any> = {
  "Literary Society": Users,
  "Science Society": Trophy,
  "Debating Club": Music,
  "Sports Club": Trophy,
  "Community Service Society": Heart,
  "Islamic Society": Users,
};

export function CampusLifePage() {
  const { settings, facilities } = useAdmin();
  const campusLife = settings?.campusLife;

  const collegeName = settings?.collegeName || "Govt. Associate College for Women (GACW) Data Nagar Lahore";

  // Find dynamic sports images if uploaded in admin facilities
  const badmintonFacility = facilities?.find(f => f.title?.toLowerCase().includes("badminton"));
  const athleticsFacility = facilities?.find(f => f.title?.toLowerCase().includes("athletic"));
  const tableGamesFacility = facilities?.find(f => f.title?.toLowerCase().includes("table") || f.title?.toLowerCase().includes("tennis"));

  return (
    <div className="bg-white">
      <Helmet>
        <title>Campus Life & Sports | {collegeName}</title>
        <meta name="description" content={`Explore Campus Life, Sports, Badminton, Athletics, and Table Games at ${collegeName}.`} />
      </Helmet>
      {/* Page Header */}
      {/* Theme: Changed from green bg-gradient-to-r from-[#006B3F] to-[#004d2d] to sky blue */}
      {/* Previous green: from-[#006B3F] to-[#004d2d] */}
      <section className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white py-16 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Campus Life & Sports
          </h1>
          <p className="text-xl text-[#C8A951] max-w-3xl leading-relaxed">
            Experience a vibrant campus atmosphere enriched with championship badminton courts, competitive athletics, table games, creative student societies, and cultural festivities.
          </p>
        </div>
      </section>

      {/* ── DEDICATED SPORTS HIGHLIGHT (BADMINTON, ATHLETICS, TABLE GAMES) ── */}
      <section className="py-12 bg-[#F0F9FF]/60 border-b border-sky-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-8">
            <span className="text-[#0284C7] text-sm font-semibold uppercase tracking-widest">Athletic Excellence</span>
            <h2 className="text-3xl font-bold text-[#082F49] mt-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              Sports Facilities at GACW Data Nagar
            </h2>
            <p className="text-gray-600 mt-2">
              We promote active fitness, sportsmanship, and mental agility for our female students with dedicated coaching and modern play areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-sky-100 hover:shadow-md transition-all overflow-hidden flex flex-col">
              {badmintonFacility?.image ? (
                <div className="h-44 w-full bg-sky-50 overflow-hidden">
                  <img src={badmintonFacility.image} alt="Badminton Court" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ) : null}
              <div className="p-6 flex-1 flex flex-col">
                <div className="w-12 h-12 bg-[#0284C7]/10 text-[#0284C7] rounded-xl flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#082F49] mb-2">Badminton</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Dedicated outdoor & indoor badminton courts with tournament-grade equipment and annual inter-class championships.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-sky-100 hover:shadow-md transition-all overflow-hidden flex flex-col">
              {athleticsFacility?.image ? (
                <div className="h-44 w-full bg-sky-50 overflow-hidden">
                  <img src={athleticsFacility.image} alt="Athletics Track" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ) : null}
              <div className="p-6 flex-1 flex flex-col">
                <div className="w-12 h-12 bg-[#0369A1]/10 text-[#0369A1] rounded-xl flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#082F49] mb-2">Athletics</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Track and field sports including sprint races, relays, long jump, and obstacle races held during the Annual Sports Gala.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-sky-100 hover:shadow-md transition-all overflow-hidden flex flex-col">
              {tableGamesFacility?.image ? (
                <div className="h-44 w-full bg-sky-50 overflow-hidden">
                  <img src={tableGamesFacility.image} alt="Table Games" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ) : null}
              <div className="p-6 flex-1 flex flex-col">
                <div className="w-12 h-12 bg-[#0284C7]/10 text-[#0284C7] rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#082F49] mb-2">Table Games</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Recreation and indoor games arena featuring Table Tennis, Carrom, Chess, and Scrabble encouraging mental acuity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Gala */}
      {campusLife?.sportsGala && (campusLife?.sportsGala?.highlights?.length || 0) > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
            <h2 className="text-4xl font-bold text-[#082F49] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Annual Sports Gala
            </h2>
            <div className="w-20 h-1 bg-[#0284C7] mb-8" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                {/* Previous green: from-[#006B3F] to-[#004d2d] -> from-[#0284C7] to-[#0369A1] */}
                <div className="aspect-video bg-gradient-to-br from-[#0284C7] to-[#0369A1] rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <Trophy className="w-32 h-32 text-white opacity-60" />
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our annual sports gala is a highlight of the academic year at Govt. Associate College for Women (GACW), bringing together students to compete in Badminton, Athletics, Table Games, and other fitness competitions.
                </p>
                <p className="text-gray-700">
                  This year's sports gala was held in {campusLife?.sportsGala?.year}, with enthusiastic student participation. The event concluded with an honorable prize distribution ceremony.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#082F49] mb-4">{campusLife?.sportsGala?.year} Sports Gala Highlights</h3>
                {campusLife?.sportsGala?.highlights?.map((hlt, i) => (
                  <div key={i} className="bg-[#F0F9FF]/70 p-4 rounded-xl border border-sky-100">
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
        <section className="py-16 bg-[#F0F9FF]/40">
          <div className="container mx-auto px-4">
            {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
            <h2 className="text-4xl font-bold text-[#082F49] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Annual Function & Prize Distribution
            </h2>
            <div className="w-20 h-1 bg-[#0284C7] mb-8" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#082F49]">Annual Function {campusLife?.annualFunction?.year}</h3>
                <p className="text-gray-700">
                  The annual function and prize distribution ceremony is the pinnacle event celebrating academic excellence, sports achievements in Badminton & Athletics, and student contributions.
                </p>

                {campusLife?.annualFunction?.chiefGuest?.name && (
                  <div className="bg-white p-6 rounded-xl shadow-md border border-sky-100">
                    <h4 className="font-bold text-[#0284C7] mb-3">Chief Guest</h4>
                    <p className="font-semibold text-gray-800">{campusLife?.annualFunction?.chiefGuest?.name}</p>
                    <p className="text-sm text-gray-600">{campusLife?.annualFunction?.chiefGuest?.title}</p>
                  </div>
                )}

                <div className="bg-white p-6 rounded-xl shadow-md border border-sky-100">
                  <h4 className="font-bold text-[#0284C7] mb-3">Event Highlights</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {campusLife?.annualFunction?.highlights?.map((hlt, i) => (
                      <li key={i}>• {hlt}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                {/* Previous green: from-[#006B3F] to-[#004d2d] -> from-[#0284C7] to-[#0369A1] */}
                <div className="aspect-video bg-gradient-to-br from-[#0284C7] to-[#0369A1] rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <Award className="w-32 h-32 text-white opacity-60" />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-sky-100">
                  <h4 className="font-bold text-[#0284C7] mb-4">Awards Distributed</h4>
                  <div className="space-y-3">
                    {campusLife?.annualFunction?.awards?.map((award, i) => (
                      <div key={i} className={`flex justify-between items-center ${i !== (campusLife?.annualFunction?.awards?.length || 0) - 1 ? 'border-b pb-2' : ''}`}>
                        <span className="text-gray-700">{award?.category}</span>
                        <span className="font-bold text-[#0284C7]">{award?.value}</span>
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
            {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
            <h2 className="text-4xl font-bold text-center text-[#082F49] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Student Societies & Clubs
            </h2>
            <div className="w-20 h-1 bg-[#0284C7] mx-auto mb-12" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campusLife?.studentSocieties?.map((society, index) => {
                const Icon = ICON_MAP[society?.name] || BookOpen;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border border-sky-100">
                    <Icon className="w-12 h-12 text-[#0284C7] mb-4" />
                    <h3 className="text-xl font-bold text-[#082F49] mb-3">{society?.name}</h3>
                    <p className="text-gray-700 text-sm mb-4">{society?.desc}</p>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">Key Activities:</h4>
                      <ul className="space-y-1">
                        {society?.activities?.map((activity, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#0284C7] rounded-full"></span>
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
        <section className="py-16 bg-[#F0F9FF]/40">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-[#082F49] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Cultural Events & Celebrations
            </h2>
            <div className="w-20 h-1 bg-[#0284C7] mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campusLife?.culturalEvents?.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-sky-100">
                  <div className="flex items-center gap-3 mb-3">
                    {/* Previous green: bg-[#006B3F] -> bg-[#0284C7] */}
                    <div className="bg-[#0284C7] text-white px-3 py-2 rounded-lg font-bold text-sm">{item?.date}</div>
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
            <h2 className="text-4xl font-bold text-[#082F49] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Student Council {campusLife?.studentCouncil?.year}
            </h2>
            <div className="w-20 h-1 bg-[#0284C7] mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {campusLife?.studentCouncil?.members?.map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-[#0284C7]">
                  {/* Previous green: from-[#006B3F] to-[#004d2d] -> from-[#0284C7] to-[#0369A1] */}
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0284C7] to-[#0369A1] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    {member?.name?.split(' ')?.map((n: string) => n[0])?.join('')}
                  </div>
                  <h3 className="font-bold text-[#0284C7] mb-1">{member?.position}</h3>
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
