import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  content: string;
  category: string;
}

export interface EventItem {
  id: string;
  date: string;
  month: string;
  day: string;
  title: string;
  time: string;
  location: string;
}

export interface Announcement {
  id: string;
  text: string;
  active: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  url: string;
  category: string;
}

export interface SiteSettings {
  admissionsOpen: boolean;
  lastDateAdmission: string;
  principalName: string;
  principalMessage: string;
  phone: string;
  email: string;
  address: string;
  tickerText: string;
}

interface AdminContextType {
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  news: NewsItem[];
  setNews: (news: NewsItem[]) => void;
  events: EventItem[];
  setEvents: (events: EventItem[]) => void;
  announcements: Announcement[];
  setAnnouncements: (a: Announcement[]) => void;
  gallery: GalleryItem[];
  setGallery: (g: GalleryItem[]) => void;
  settings: SiteSettings;
  setSettings: (s: SiteSettings) => void;
}

const defaultNews: NewsItem[] = [
  { id: "1", date: "April 20, 2026", title: "Admissions Open for Academic Year 2026-27", content: "Applications are now being accepted for FSc, FA, ICS, and I.Com programs.", category: "Admissions" },
  { id: "2", date: "April 15, 2026", title: "Annual Result Announced – 98% Success Rate", content: "We are proud to announce outstanding results in the annual examinations.", category: "Results" },
  { id: "3", date: "April 10, 2026", title: "Inter-College Sports Competition – GAC Wins Gold", content: "Our college team secured gold medals in multiple categories.", category: "Sports" },
  { id: "4", date: "April 5, 2026", title: "Science Fair 2026 – Registration Now Open", content: "Students can register for Science Fair 2026 through the admin office.", category: "Events" },
];

const defaultEvents: EventItem[] = [
  { id: "1", date: "May 5", month: "MAY", day: "5", title: "Annual Sports Gala 2026", time: "9:00 AM", location: "College Ground" },
  { id: "2", date: "May 15", month: "MAY", day: "15", title: "Parent-Teacher Meeting", time: "10:00 AM", location: "Main Hall" },
  { id: "3", date: "Jun 1", month: "JUN", day: "1", title: "Final Examinations Begin", time: "8:00 AM", location: "All Halls" },
  { id: "4", date: "Jun 20", month: "JUN", day: "20", title: "Summer Vacation Starts", time: "–", location: "–" },
];

const defaultAnnouncements: Announcement[] = [
  { id: "1", text: "🎓 Admissions Open 2026-27 — Last date: May 31, 2026", active: true },
  { id: "2", text: "📢 Annual Results Declared — 98% pass rate achieved", active: true },
  { id: "3", text: "⚽ Sports Gala 2026 on May 5 — All students invited", active: true },
];

const defaultGallery: GalleryItem[] = [
  { id: "1", title: "Annual Function", url: "https://images.unsplash.com/photo-1762438135827-428acc0e8941?w=600", category: "Events" },
  { id: "2", title: "Science Lab", url: "https://images.unsplash.com/photo-1759092912891-9f52486bb059?w=600", category: "Facilities" },
  { id: "3", title: "Library", url: "https://images.unsplash.com/photo-1478104718532-efe04cc3ff7f?w=600", category: "Facilities" },
  { id: "4", title: "Sports Day", url: "https://images.unsplash.com/photo-1764967116421-342cb89025bf?w=600", category: "Sports" },
  { id: "5", title: "Students", url: "https://images.unsplash.com/photo-1681171575028-16aa7a6f063e?w=600", category: "Campus" },
  { id: "6", title: "Teaching", url: "https://images.unsplash.com/photo-1736066330610-c102cab4e942?w=600", category: "Academic" },
];

const defaultSettings: SiteSettings = {
  admissionsOpen: true,
  lastDateAdmission: "May 31, 2026",
  principalName: "Prof. Dr. Farzana Ashfaq",
  principalMessage: "Welcome to Government Associate College, Data Nagar. It is my privilege to lead an institution that has been shaping young minds for over four decades. Our college is committed to providing quality education that combines academic excellence with character development. We believe in nurturing not just scholars, but well-rounded individuals who will contribute positively to society.",
  phone: "04237602172",
  email: "datanagargacw@gmail.com",
  address: "Ilahi Bakhsh Road Data Nagar, Data Nagar, Lahore, Punjab, Pakistan",
  tickerText: "Admissions Open 2026-27 | Last Date: May 31, 2026 | Results Declared | Sports Gala: May 5",
};

const AdminContext = createContext<AdminContextType | null>(null);

function loadFromStorage<T>(key: string, def: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : def;
  } catch {
    return def;
  }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem("adminAuth") === "true");
  const [news, setNewsState] = useState<NewsItem[]>(() => loadFromStorage("gac_news", defaultNews));
  const [events, setEventsState] = useState<EventItem[]>(() => loadFromStorage("gac_events", defaultEvents));
  const [announcements, setAnnouncementsState] = useState<Announcement[]>(() => loadFromStorage("gac_announcements", defaultAnnouncements));
  const [gallery, setGalleryState] = useState<GalleryItem[]>(() => loadFromStorage("gac_gallery", defaultGallery));
  const [settings, setSettingsState] = useState<SiteSettings>(() => loadFromStorage("gac_settings", defaultSettings));

  const setNews = (d: NewsItem[]) => { setNewsState(d); localStorage.setItem("gac_news", JSON.stringify(d)); };
  const setEvents = (d: EventItem[]) => { setEventsState(d); localStorage.setItem("gac_events", JSON.stringify(d)); };
  const setAnnouncements = (d: Announcement[]) => { setAnnouncementsState(d); localStorage.setItem("gac_announcements", JSON.stringify(d)); };
  const setGallery = (d: GalleryItem[]) => { setGalleryState(d); localStorage.setItem("gac_gallery", JSON.stringify(d)); };
  const setSettings = (d: SiteSettings) => { setSettingsState(d); localStorage.setItem("gac_settings", JSON.stringify(d)); };

  const login = (password: string) => {
    if (password === "admin@gac123") {
      setIsLoggedIn(true);
      sessionStorage.setItem("adminAuth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("adminAuth");
  };

  return (
    <AdminContext.Provider value={{ isLoggedIn, login, logout, news, setNews, events, setEvents, announcements, setAnnouncements, gallery, setGallery, settings, setSettings }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
