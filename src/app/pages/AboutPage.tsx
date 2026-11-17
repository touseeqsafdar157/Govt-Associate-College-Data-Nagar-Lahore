import { CheckCircle, Target, Eye, Award } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { Helmet } from "react-helmet-async";

export function AboutPage() {
  const { settings } = useAdmin();
  const collegeName = settings?.collegeName || "Govt. Associate College for Women (GACW) Data Nagar Lahore";

  return (
    <div className="bg-white">
      <Helmet>
        <title>About Us | {collegeName}</title>
        <meta name="description" content={`Learn about the history, vision, and mission of ${collegeName}. Established in 1981.`} />
      </Helmet>
      {/* Page Header */}
      {/* Theme: Changed from green bg-gradient-to-r from-[#006B3F] to-[#004d2d] to sky blue */}
      {/* Previous green: from-[#006B3F] to-[#004d2d] */}
      <section className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white py-16 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            About Us
          </h1>
          <p className="text-xl text-[#C8A951]">Learn about our history, mission, values & sports legacy</p>
        </div>
      </section>

      {/* College History */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
          <h2 className="text-4xl font-bold text-[#082F49] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Our History & Heritage
          </h2>
          <div className="w-20 h-1 bg-[#0284C7] mb-8" />

          <div className="space-y-8">
            {(settings?.aboutHistory || [])?.map((item: any, index: number) => (
              <div key={index} className="flex gap-4">
                {/* Previous green: bg-[#006B3F] -> bg-[#0284C7] */}
                <div className={`${index === (settings?.aboutHistory || [])?.length - 1 ? 'bg-[#0369A1]' : 'bg-[#0284C7]'} text-white font-bold px-4 py-2 rounded-lg h-fit shadow-sm`}>
                  {item?.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item?.title}</h3>
                  <p className="text-gray-700">{item?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      {/* Previous green tint: bg-[#F8F9FA] -> bg-[#F0F9FF]/50 */}
      <section className="py-16 bg-[#F0F9FF]/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md border border-sky-100">
              {/* Previous green: text-[#006B3F] -> text-[#0284C7] */}
              <Eye className="w-16 h-16 text-[#0284C7] mb-4" />
              <h2 className="text-3xl font-bold text-[#082F49] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {settings?.aboutVision}
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-sky-100">
              {/* Previous green: text-[#006B3F] -> text-[#0284C7] */}
              <Target className="w-16 h-16 text-[#0284C7] mb-4" />
              <h2 className="text-3xl font-bold text-[#082F49] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Our Mission
              </h2>
              <ul className="space-y-3 text-gray-700">
                {(settings?.aboutMission || [])?.map((point: any, index: number) => (
                  <li key={index} className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-[#0284C7] flex-shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Full Message */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
          <h2 className="text-4xl font-bold text-[#082F49] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Message from the Principal
          </h2>
          <div className="w-20 h-1 bg-[#0284C7] mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              {/* Previous green: from-[#006B3F] to-[#004d2d] -> from-[#0284C7] to-[#0369A1] */}
              <div className="bg-gradient-to-br from-[#0284C7] to-[#0369A1] p-6 rounded-xl text-white text-center shadow-lg">
                <div className="w-48 h-48 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-24 h-24" />
                </div>
                <h3 className="text-xl font-bold mb-2">{settings?.principalName}</h3>
                <p className="text-[#C8A951] font-semibold">Principal</p>
                <p className="text-sm mt-2">{settings?.principalTitle}</p>
                <p className="text-sm opacity-90">{settings?.principalExperience}</p>
                <p className="text-xs text-sky-100 mt-2 font-medium">Govt. Associate College for Women (GACW) Data Nagar</p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4 text-gray-700">
              {(settings?.principalFullMessage || "")?.split('\n')?.filter((p: any) => p?.trim())?.map((paragraph: any, index: number) => (
                <p key={index} className={`leading-relaxed ${paragraph?.startsWith('With best wishes') ? 'italic font-medium text-gray-800' : ''}`}>
                  {paragraph?.startsWith('With best wishes') ? (
                    <span dangerouslySetInnerHTML={{ __html: paragraph?.replace(/\n/g, '<br />') }} />
                  ) : paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      {/* Previous green tint: bg-[#F8F9FA] -> bg-[#F0F9FF]/50 */}
      <section className="py-16 bg-[#F0F9FF]/50">
        <div className="container mx-auto px-4">
          {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
          <h2 className="text-4xl font-bold text-center text-[#082F49] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Achievements & Milestones
          </h2>
          <div className="w-20 h-1 bg-[#0284C7] mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(settings?.achievements || [])?.map((achievement: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center border border-sky-100">
                <Award className="w-12 h-12 text-[#0284C7] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#082F49] mb-2">{achievement?.title}</h3>
                <p className="text-gray-600">{achievement?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Previous green: text-[#006B3F] -> text-[#082F49] */}
          <h2 className="text-4xl font-bold text-[#082F49] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Infrastructure & Sports Facilities
          </h2>
          <div className="w-20 h-1 bg-[#0284C7] mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F0F9FF]/60 p-6 rounded-xl border border-sky-100">
              <h3 className="text-xl font-bold text-[#082F49] mb-4">Campus Facilities</h3>
              <ul className="space-y-2 text-gray-700">
                {(settings?.infrastructureCampus || [])?.map((item: any, index: number) => (
                  <li key={index} className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-[#0284C7] flex-shrink-0 mt-1" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F0F9FF]/60 p-6 rounded-xl border border-sky-100">
              <h3 className="text-xl font-bold text-[#082F49] mb-4">Support & Sports Facilities</h3>
              <ul className="space-y-2 text-gray-700">
                {(settings?.infrastructureSupport || [])?.map((item: any, index: number) => (
                  <li key={index} className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-[#0284C7] flex-shrink-0 mt-1" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
