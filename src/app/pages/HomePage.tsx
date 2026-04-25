import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import {
  ChevronLeft, ChevronRight, Users, BookOpen, GraduationCap, Award,
  Calendar, ArrowRight, Phone, Mail, Star, Shield, Clock,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import gatePhoto from "../../imports/WhatsApp_Image_2026-04-07_at_11.52.03_AM_(1).jpeg";
import courtyardPhoto from "../../imports/WhatsApp_Image_2026-04-07_at_11.52.03_AM.jpeg";

const iconMap: Record<string, any> = { Users, BookOpen, GraduationCap, Award, Shield, Clock, Phone, Mail, Star, Calendar };



export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { news, events, settings } = useAdmin();
  console.log(settings, 'settings')
  const heroSlides = [
    {
      img: gatePhoto,
      title: "Government Associate College",
      subtitle: "Data Nagar, Lahore",
      tagline: "Empowering Minds · Building Futures · Serving the Nation",
      cta: { label: "Apply Now", to: "/admissions" },
      cta2: { label: "Explore Programs", to: "/academics" },
    },
    {
      img: courtyardPhoto,
      title: "Excellence in Education",
      subtitle: settings?.collegeEstYear || "Since 1981",
      tagline: "A Legacy of Academic Achievement & Character Development",
      cta: { label: "View Results", to: "/results" },
      cta2: { label: "Meet Our Faculty", to: "/faculty" },
    },
    {
      img: "https://images.unsplash.com/photo-1681171575028-16aa7a6f063e?w=1400&q=80",
      title: "Shaping Tomorrow's Leaders",
      subtitle: "3,500+ Students · 120+ Faculty",
      tagline: "Join a community dedicated to growth, innovation & excellence",
      cta: { label: "Campus Life", to: "/campus-life" },
      cta2: { label: "View Gallery", to: "/gallery" },
    },
  ];
  const isAdmissionActive = () => {
    if (!settings?.admissionsOpen) return false;
    if (!settings?.lastDateAdmission) return true;
    const lastDate = new Date(settings.lastDateAdmission);
    if (isNaN(lastDate.getTime())) return true;
    lastDate.setHours(23, 59, 59, 999);
    return new Date() <= lastDate;
  };
  const admissionOpen = isAdmissionActive();

  const changeSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const nextSlide = () => changeSlide((currentSlide + 1) % heroSlides.length);
  const prevSlide = () => changeSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    const t = setInterval(nextSlide, 6000);
    return () => clearInterval(t);
  }, [currentSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <>  <Helmet>
      <title>Government Associate College Data Nagar Lahore</title>
      <meta
        name="description"
        content="Official website of Govt Associate College Data Nagar Lahore - Admissions, Programs, Faculty and Updates."
      />
    </Helmet>
    <div className="bg-white">
      {/* ── HERO SLIDER ── */}
      <section className="relative h-[85vh] min-h-[500px] max-h-[750px] overflow-hidden">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#002A15]/90 via-[#003D1F]/70 to-transparent" />
          </div>
        ))}

        {/* Slide Content */}
        <div className="relative h-full flex items-center z-10">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="max-w-2xl">
              <span className="inline-block bg-[#C8A951] text-[#003D1F] text-xs font-bold px-3 py-1 rounded mb-4 uppercase tracking-widest">
                {slide.subtitle}
              </span>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {slide.title}
              </h1>
              <p className="text-base sm:text-lg text-gray-200 mb-8 leading-relaxed">{slide.tagline}</p>
              <div className="flex flex-wrap gap-3">
                {(!admissionOpen && slide.cta.label === "Apply Now") ? (
                  <Link
                    to="/admissions"
                    className="bg-white/10 hover:bg-white/20 border border-white/40 text-white px-7 py-3 rounded-lg font-semibold transition-all backdrop-blur-sm text-sm"
                  >
                    View Admission Criteria
                  </Link>
                ) : (
                  <Link
                    to={slide.cta.to}
                    className="bg-[#C8A951] hover:bg-[#b89841] text-[#003D1F] px-7 py-3 rounded-lg font-bold transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm"
                  >
                    {slide.cta.label}
                  </Link>
                )}
                <Link
                  to={slide.cta2.to}
                  className="bg-white/10 hover:bg-white/20 border border-white/40 text-white px-7 py-3 rounded-lg font-semibold transition-all backdrop-blur-sm text-sm"
                >
                  {slide.cta2.label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-[#C8A951] backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-[#C8A951] backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => changeSlide(i)}
              className={`transition-all duration-300 rounded-full ${i === currentSlide ? "w-8 h-2.5 bg-[#C8A951]" : "w-2.5 h-2.5 bg-white/50 hover:bg-white"
                }`}
            />
          ))}
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-gradient-to-r from-[#003D1F] to-[#006B3F] py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(settings.homeStats || []).map((stat: any, i: number) => {
              const Icon = iconMap[stat.icon] || Award;
              return (
                <div key={i} className="text-center text-white group">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 bg-white/10 group-hover:bg-[#C8A951] rounded-xl flex items-center justify-center transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#C8A951]">{stat.value}</p>
                  <p className="text-green-200 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRINCIPAL MESSAGE ── */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo Side */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={gatePhoto}
                  alt="College Gate"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003D1F]/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#C8A951] rounded-full flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-[#003D1F]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Government Associate College</p>
                      <p className="text-[#C8A951] text-xs">Data Nagar, Lahore · Est. 1981</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#C8A951]/20 rounded-full" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#006B3F]/20 rounded-full" />
            </div>

            {/* Message Side */}
            <div>
              <span className="inline-block text-[#C8A951] text-sm font-semibold uppercase tracking-widest mb-2">
                From the Principal's Desk
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#003D1F] mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
                A Message of Welcome
              </h2>
              <div className="w-16 h-1 bg-[#C8A951] mb-6 rounded-full" />
              <div className="bg-[#F0F7F4] rounded-xl p-6 border-l-4 border-[#006B3F] mb-6">
                <p className="text-gray-700 leading-relaxed text-sm italic">
                  "{settings.principalMessage}"
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#006B3F] to-[#003D1F] rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#C8A951]" />
                </div>
                <div>
                  <p className="font-bold text-[#003D1F] text-sm">{settings.principalName}</p>
                  <p className="text-[#006B3F] text-xs">Principal, GAC Data Nagar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-16 bg-[#F8FCF9]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#C8A951] text-sm font-semibold uppercase tracking-widest">Our Strengths</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#003D1F] mt-2" style={{ fontFamily: "Playfair Display, serif" }}>
              Why Choose GAC Data Nagar?
            </h2>
            <div className="w-16 h-1 bg-[#C8A951] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(settings.homeFeatures || []).map((feat: any, i: number) => {
              const Icon = iconMap[feat.icon] || Award;
              const color = i % 2 === 0 ? "#006B3F" : "#C8A951";
              return (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                    style={{ backgroundColor: `${color}18` }}
                  >
                    <Icon className="w-7 h-7" style={{ color }} />
                  </div>
                  <h3 className="font-bold text-[#003D1F] mb-2" style={{ fontFamily: "Playfair Display, serif" }}>{feat.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feat.desc}</p>
                  <div className="w-8 h-0.5 mt-4 rounded-full transition-all group-hover:w-16" style={{ backgroundColor: color }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── NEWS & EVENTS ── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* News */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[#C8A951] text-sm font-semibold uppercase tracking-widest">Stay Updated</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#003D1F] mt-1" style={{ fontFamily: "Playfair Display, serif" }}>
                    Latest News
                  </h2>
                </div>
                <Link to="/news" className="flex items-center gap-1 text-[#006B3F] hover:text-[#C8A951] text-sm font-semibold transition-colors">
                  All News <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-3">
                {news.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="group flex gap-4 bg-[#F8FCF9] hover:bg-white hover:shadow-md p-4 rounded-xl transition-all border border-transparent hover:border-[#006B3F]/10 cursor-pointer"
                  >
                    <div className="shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#C8A951] mt-2" />
                    </div>
                    <div>
                      <span className="text-xs text-[#C8A951] font-semibold">{item.date}</span>
                      <p className="text-gray-800 text-sm font-medium group-hover:text-[#006B3F] transition-colors mt-0.5">{item.title}</p>
                      <span className="inline-block mt-1 text-xs bg-[#006B3F]/10 text-[#006B3F] px-2 py-0.5 rounded-full">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[#C8A951] text-sm font-semibold uppercase tracking-widest">Don't Miss</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#003D1F] mt-1" style={{ fontFamily: "Playfair Display, serif" }}>
                    Upcoming Events
                  </h2>
                </div>
                <Link to="/news" className="flex items-center gap-1 text-[#006B3F] hover:text-[#C8A951] text-sm font-semibold transition-colors">
                  All Events <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-3">
                {events.slice(0, 4).map((event) => (
                  <div
                    key={event.id}
                    className="group flex gap-4 bg-white hover:bg-[#F8FCF9] p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                  >
                    <div className="shrink-0 bg-gradient-to-br from-[#006B3F] to-[#003D1F] text-white text-center p-3 rounded-xl min-w-[52px]">
                      <p className="text-xl font-bold leading-none">{event.day}</p>
                      <p className="text-[10px] font-semibold mt-0.5 opacity-80">{event.month}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm group-hover:text-[#006B3F] transition-colors">{event.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3 h-3" />{event.time}</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-xs text-gray-500">{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section className="py-16 bg-[#003D1F]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-[#C8A951] text-sm font-semibold uppercase tracking-widest">Campus Life</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2" style={{ fontFamily: "Playfair Display, serif" }}>
              Photo Gallery
            </h2>
            <div className="w-16 h-1 bg-[#C8A951] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { img: gatePhoto, title: "College Gate" },
              { img: courtyardPhoto, title: "College Courtyard" },
              { img: "https://images.unsplash.com/photo-1759092912891-9f52486bb059?w=600&q=80", title: "Science Lab" },
              { img: "https://images.unsplash.com/photo-1478104718532-efe04cc3ff7f?w=600&q=80", title: "Library" },
              { img: "https://images.unsplash.com/photo-1762438135827-428acc0e8941?w=600&q=80", title: "Graduation" },
              { img: "https://images.unsplash.com/photo-1681171575028-16aa7a6f063e?w=600&q=80", title: "Campus" },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative aspect-video overflow-hidden rounded-xl cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003D1F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-white text-sm font-semibold">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 bg-[#C8A951] hover:bg-[#b89841] text-[#003D1F] px-8 py-3 rounded-lg font-bold transition-all hover:shadow-lg text-sm"
            >
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUICK CONTACT STRIP ── */}
      <section className="py-12 bg-[#F8FCF9]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-[#006B3F]/10 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#006B3F]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Call Us</p>
                <p className="font-bold text-[#003D1F] text-sm">{settings.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-[#C8A951]/10 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#C8A951]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Email Us</p>
                <p className="font-bold text-[#003D1F] text-sm">{settings.email}</p>
              </div>
            </div>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#006B3F] to-[#003D1F] text-white p-5 rounded-xl font-bold hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}