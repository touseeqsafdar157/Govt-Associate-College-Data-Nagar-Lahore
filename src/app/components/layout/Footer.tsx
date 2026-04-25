import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { Phone, Mail, MapPin, Facebook, Youtube, ArrowRight, GraduationCap } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

export function Footer() {
  const { settings, incrementVisitor } = useAdmin();
  const visitCounted = useRef(false);

  useEffect(() => {
    if (!visitCounted.current) {
      visitCounted.current = true;
      // Only count once per session
      const visited = sessionStorage.getItem("visitorCounted");
      if (!visited) {
        incrementVisitor();
        sessionStorage.setItem("visitorCounted", "true");
      }
    }
  }, []);

  const formatNumber = (num: number) => {
    return num?.toLocaleString('en-IN') || '0';
  };

  return (
    <footer className="bg-[#0D2B1F] text-white">
      {/* Top CTA Strip */}
      <div className="bg-gradient-to-r from-[#006B3F] to-[#004d2d] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "Playfair Display, serif" }}>
                {settings.admissionsOpen ? "🎓 Admissions Are Open!" : "Admissions Closed"}
              </h3>
              {settings.admissionsOpen && (
                <p className="text-green-200 text-sm">Last date to apply: {settings.lastDateAdmission}</p>
              )}
            </div>
            <Link
              to="/admissions"
              className="bg-[#C8A951] hover:bg-[#b89841] text-[#003D1F] px-6 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* About College */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#006B3F] to-[#C8A951] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
                  {settings.collegeName || "Govt. Associate College"}
                </p>
                <p className="text-[#C8A951] text-xs">{settings.collegeLocation || "Data Nagar, Lahore"}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {settings.collegeShortHistory || "Established in 1981, GAC Data Nagar has been a beacon of quality education and academic excellence in Punjab for over four decades."}
            </p>
            <div className="flex gap-2">
              {[
                { icon: Facebook, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} className="w-8 h-8 bg-[#1a4d35] hover:bg-[#C8A951] rounded-full flex items-center justify-center transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
              <a href="#" className="w-8 h-8 bg-[#1a4d35] hover:bg-[#C8A951] rounded-full flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[#C8A951] mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: "Playfair Display, serif" }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/academics", label: "Academics" },
                { to: "/admissions", label: "Admissions" },
                { to: "/faculty", label: "Faculty" },
                { to: "/results", label: "Results" },
                { to: "/news", label: "News & Events" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="flex items-center gap-1.5 text-gray-400 hover:text-[#C8A951] text-sm transition-colors group">
                    <ArrowRight className="w-3 h-3 text-[#006B3F] group-hover:text-[#C8A951] transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[#C8A951] mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: "Playfair Display, serif" }}>
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8A951] mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8A951] shrink-0" />
                <a href={`tel:${settings.phone}`} className="text-gray-400 hover:text-white text-sm transition-colors">{settings.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8A951] shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-gray-400 hover:text-white text-sm transition-colors">{settings.email}</a>
              </li>
            </ul>

            {/* Visitor Counter */}
            <div className="mt-5 bg-[#1a4d35] rounded-lg p-3 text-center border border-[#006B3F]/30">
              <p className="text-gray-400 text-xs mb-0.5">Total Visitors</p>
              <p className="text-[#C8A951] text-xl font-bold">{formatNumber(settings.totalVisitors)}</p>
            </div>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-bold text-[#C8A951] mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: "Playfair Display, serif" }}>
              Our Location
            </h4>
            <div className="w-full h-40 rounded-lg overflow-hidden border border-[#006B3F]/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54449.96683984406!2d74.30943!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMTgnMzMuOSJF!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Affiliations */}
        <div className="border-t border-[#1a4d35] pt-6 mb-6">
          <p className="text-center text-gray-500 text-xs mb-4 uppercase tracking-wider">Affiliated With</p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {["HEC", "BISE Lahore", "Govt. of Punjab", "Punjab Higher Education"].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-[#1a4d35] px-3 py-1.5 rounded-full border border-[#006B3F]/40">
                <div className="w-5 h-5 bg-[#C8A951] rounded-full flex items-center justify-center">
                  <span className="text-[#003D1F] text-[8px] font-bold">{item[0]}</span>
                </div>
                <span className="text-gray-400 text-xs">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#1a4d35] pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {settings.collegeName || "Government Associate College"}, {settings.collegeLocation || "Data Nagar"}. All rights reserved.</p>
          <p>Designed for <span className="text-[#C8A951]">GAC Data Nagar</span></p>
        </div>
      </div>
    </footer>
  );
}
