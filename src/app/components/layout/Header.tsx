import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Phone, Mail, Facebook, Youtube, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Logo from "../../../imports/logo.jpeg";
import { useAdmin } from "../../context/AdminContext";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  {
    label: "Academics",
    children: [
      { path: "/academics", label: "Programs" },
      { path: "/faculty", label: "Faculty" },
      { path: "/labs", label: "Labs & Facilities" },
    ],
  },
  { path: "/admissions", label: "Admissions" },
  { path: "/results", label: "Results" },
  {
    label: "Student Life",
    children: [
      { path: "/campus-life", label: "Campus Life" },
      { path: "/gallery", label: "Gallery" },
    ],
  },
  { path: "/news", label: "News & Events" },
  { path: "/contact", label: "Contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { announcements } = useAdmin();
  const activeAnnouncements = announcements.filter((a) => a.active);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
  }, [location.pathname]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-xl" : "shadow-md"}`}>
      {/* Announcement Ticker */}
      {activeAnnouncements.length > 0 && (
        <div className="bg-[#C8A951] text-[#003D1F] py-1.5 overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="bg-[#003D1F] text-[#C8A951] text-xs px-3 py-0.5 whitespace-nowrap font-semibold shrink-0 ml-2">
              ANNOUNCEMENTS
            </span>
            <div className="overflow-hidden flex-1">
              <div className="animate-ticker whitespace-nowrap text-sm font-medium">
                {activeAnnouncements.map((a) => a.text).join("   •   ")}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Contact Bar */}
      <div className="bg-[#003D1F] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs gap-1.5">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C8A951]" />
                <span>04237602172</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#C8A951]" />
                <span>datanagargacw@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-xs hidden sm:block">Follow Us:</span>
              <a href="#" className="w-6 h-6 bg-[#006B3F] hover:bg-[#C8A951] rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-3 h-3" />
              </a>
              <a href="#" className="w-6 h-6 bg-[#006B3F] hover:bg-[#C8A951] rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-3 h-3" />
              </a>
              <a href="#" className="w-6 h-6 bg-[#006B3F] hover:bg-[#C8A951] rounded-full flex items-center justify-center transition-colors">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              <Link to="/admin" className="text-[#C8A951] hover:text-white transition-colors text-xs border border-[#C8A951]/40 px-2 py-0.5 rounded">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              {/* Logo */}
              <div className="relative w-14 h-14 shrink-0">
                {/* <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#006B3F] to-[#003D1F] flex items-center justify-center shadow-lg"> */}
                  <div className="w-14 h-14 text-center rounded-full bg-gradient-to-br from-[#006B3F] to-[#003D1F] flex items-center justify-center shadow-lg">
                     <img src={Logo} alt="GAC Logo" className="w-13 h-13 rounded-full object-cover"  />
                    {/* <div className="text-[#C8A951] text-xs font-bold leading-none">GAC</div>
                    <div className="text-white text-[8px] leading-none mt-0.5">Est. 1981</div> */}
                  {/* </div> */}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#C8A951] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  
                  
                </div>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-[#003D1F] leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
                  Government Associate College
                </h1>
                <p className="text-xs text-[#006B3F] font-medium tracking-wider uppercase">Data Nagar, Lahore · Punjab, Pakistan</p>
              </div>
            </Link>

            {/* Affiliation Badges - desktop only */}
            <div className="hidden lg:flex items-center gap-4">
              {["HEC", "BISE", "Govt. of Punjab"].map((b) => (
                <div key={b} className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#F0F7F4] border-2 border-[#006B3F]/20 flex items-center justify-center">
                    <span className="text-[#006B3F] text-xs font-bold">{b.split(" ")[0]}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-tight max-w-[60px]">{b}</p>
                </div>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-[#006B3F] hover:bg-[#F0F7F4] rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-[#006B3F] hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center">
            {navLinks.map((link) => {
              const isActive = link.path
                ? location.pathname === link.path
                : link.children?.some((c) => location.pathname === c.path);
              return (
                <li
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {link.path ? (
                    <Link
                      to={link.path}
                      className={`flex items-center gap-1 px-4 py-3.5 text-sm text-white hover:bg-[#C8A951] hover:text-[#003D1F] transition-all duration-200 font-medium ${
                        isActive ? "bg-[#C8A951] text-[#003D1F]" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      className={`flex items-center gap-1 px-4 py-3.5 text-sm text-white hover:bg-[#C8A951] hover:text-[#003D1F] transition-all duration-200 font-medium ${
                        isActive ? "bg-[#C8A951] text-[#003D1F]" : ""
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {link.children && (
                    <div className={`absolute top-full left-0 w-48 bg-white shadow-xl border-t-2 border-[#C8A951] z-50 transition-all duration-200 ${openDropdown === link.label ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"}`}>
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F0F7F4] hover:text-[#006B3F] transition-colors border-b border-gray-100 last:border-0 ${
                            location.pathname === child.path ? "bg-[#F0F7F4] text-[#006B3F] font-semibold" : ""
                          }`}
                        >
                          <ChevronRight className="w-3 h-3 text-[#C8A951]" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#003D1F] border-t border-[#006B3F]">
          {navLinks.map((link) => (
            <div key={link.label}>
              {link.path ? (
                <Link
                  to={link.path}
                  className={`flex items-center px-5 py-3 text-white border-b border-[#006B3F]/40 text-sm hover:bg-[#C8A951] hover:text-[#003D1F] transition-colors ${
                    location.pathname === link.path ? "bg-[#C8A951] text-[#003D1F]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setOpenMobileDropdown(openMobileDropdown === link.label ? null : link.label)}
                    className="w-full flex items-center justify-between px-5 py-3 text-white border-b border-[#006B3F]/40 text-sm"
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openMobileDropdown === link.label ? "rotate-180" : ""}`} />
                  </button>
                  {openMobileDropdown === link.label && (
                    <div className="bg-[#002A15]">
                      {link.children?.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="flex items-center gap-2 pl-9 pr-5 py-2.5 text-gray-300 hover:text-[#C8A951] text-sm border-b border-[#006B3F]/20 transition-colors"
                        >
                          <ChevronRight className="w-3 h-3 text-[#C8A951]" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
