import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

const API_URL = "https://govt-associate-college-data-nagar-lahore.onrender.com/api";

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  content: string;
  category: string;
  summary?: string;
  fileUrl?: string;
}

export interface EventItem {
  id: string;
  date: string;
  month: string;
  day: string;
  title: string;
  time: string;
  location: string;
  description?: string;
  image?: string;
}

export interface Announcement {
  id: string;
  text?: string;
  title?: string;
  content?: string;
  type?: string;
  active: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  url: string;
  category: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read';
  createdAt: string;
}

export interface EligibilityRow {
  program: string;
  qualification: string;
  marks: string;
  ageLimit: string;
}

export interface ProgramItem {
  id: string;
  name: string;
  category: "Intermediate" | "ADP";
  duration: string;
  subjects: string;
  eligibility: string;
  fee: string;
  syllabusUrl: string;
}

export interface FacultyItem {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  dept: string;
  subject: string;
  experience: string;
  email: string;
  isHOD: boolean;
  staffType: "Teaching" | "Non-Teaching";
}

export interface FacilityItem {
  id: string;
  category: "Laboratory" | "Sports" | "Other";
  title: string;
  description: string;
  iconName: string;
  capacity?: string;
  instructor?: string;
  equipmentList: string[];
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
  eligibilityCriteria: EligibilityRow[];
  officeHours: string;
  departments: { dept: string; name: string; phone: string; email: string }[];
  campusLife?: {
    sportsGala: {
      year: string;
      highlights: { title: string; details: string[] }[];
    };
    annualFunction: {
      year: string;
      chiefGuest: { name: string; title: string };
      highlights: string[];
      awards: { category: string; value: string }[];
    };
    studentSocieties: { name: string; desc: string; activities: string[] }[];
    culturalEvents: { event: string; date: string; desc: string }[];
    studentCouncil: {
      year: string;
      members: { position: string; name: string; program: string }[];
    };
  };
  requiredDocuments?: string[];
  academicCalendar?: {
    firstYear: { event: string; date: string }[];
    secondYear: { event: string; date: string }[];
  };
  libraryStats?: {
    totalBooks: string;
    journals: string;
    newspapers: string;
    digitalResources: string;
    seatingCapacity: string;
  };
  libraryInfo?: {
    timing: string[];
    facilities: string[];
    rules: string[];
  };
  // About Page
  aboutHistory: { year: string; title: string; description: string }[];
  aboutVision: string;
  aboutMission: string[];
  principalTitle: string;
  principalExperience: string;
  principalFullMessage: string;
  achievements: { title: string; description: string }[];
  infrastructureCampus: string[];
  infrastructureSupport: string[];
  // Footer
  totalVisitors: number;
  collegeName: string;
  collegeLocation: string;
  collegeEstYear: string;
  collegeShortHistory: string;
  // Home Page
  homeStats: { icon: string; value: string; label: string }[];
  homeFeatures: { icon: string; title: string; desc: string }[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

interface AdminContextType {
  isLoggedIn: boolean;
  currentUser: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  news: NewsItem[];
  addNews: (item: Omit<NewsItem, "id">) => Promise<void>;
  updateNews: (id: string, item: Partial<NewsItem>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;

  events: EventItem[];
  addEvent: (item: Omit<EventItem, "id">) => Promise<void>;
  updateEvent: (id: string, item: Partial<EventItem>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  announcements: Announcement[];
  addAnnouncement: (item: Omit<Announcement, "id">) => Promise<void>;
  updateAnnouncement: (id: string, item: Partial<Announcement>) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;

  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, "id">) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;

  settings: SiteSettings;
  updateSettings: (s: SiteSettings) => Promise<void>;
  incrementVisitor: () => Promise<void>;

  messages: ContactMessage[];
  addMessage: (item: Omit<ContactMessage, "id" | "status" | "createdAt">) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  markMessageRead: (id: string) => Promise<void>;

  programs: ProgramItem[];
  addProgram: (item: Omit<ProgramItem, "id">) => Promise<void>;
  updateProgram: (id: string, item: Partial<ProgramItem>) => Promise<void>;
  deleteProgram: (id: string) => Promise<void>;

  faculty: FacultyItem[];
  addFaculty: (item: Omit<FacultyItem, "id">) => Promise<void>;
  updateFaculty: (id: string, item: Partial<FacultyItem>) => Promise<void>;
  deleteFaculty: (id: string) => Promise<void>;

  facilities: FacilityItem[];
  addFacility: (item: Omit<FacilityItem, "id">) => Promise<void>;
  updateFacility: (id: string, item: Partial<FacilityItem>) => Promise<void>;
  deleteFacility: (id: string) => Promise<void>;

  adminUsers: AdminUser[];
  fetchUsers: () => Promise<void>;
  addUser: (user: { name: string; email: string; password: string }) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const defaultSettings: SiteSettings = {
  admissionsOpen: true,
  lastDateAdmission: "May 31, 2026",
  principalName: "Prof. Dr. Farzana Ashfaq",
  principalMessage: "Welcome to Government Associate College, Data Nagar.",
  phone: "04237602172",
  email: "datanagargacw@gmail.com",
  address: "Ilahi Bakhsh Road Data Nagar, Lahore",
  tickerText: "Admissions Open 2026-27 | Last Date: May 31, 2026",
  eligibilityCriteria: [
    { program: "FSc Pre-Medical/Engineering", qualification: "Matric (Science)", marks: "60%", ageLimit: "Under 20 years" },
    { program: "ICS", qualification: "Matric (Science)", marks: "55%", ageLimit: "Under 20 years" },
    { program: "FA", qualification: "Matric (Any group)", marks: "50%", ageLimit: "Under 20 years" },
    { program: "I.Com", qualification: "Matric (Any group)", marks: "50%", ageLimit: "Under 20 years" },
    { program: "ADP Science", qualification: "FSc/ICS", marks: "45%", ageLimit: "Under 23 years" },
    { program: "ADP Arts", qualification: "FA/FSc/ICS", marks: "45%", ageLimit: "Under 23 years" },
    { program: "ADP Commerce", qualification: "I.Com/FSc/FA", marks: "45%", ageLimit: "Under 23 years" },
  ],
  officeHours: "Monday - Friday\n8:00 AM - 4:00 PM\nSaturday: 8:00 AM - 1:00 PM",
  departments: [
    { dept: "Principal Office", name: "Prof. Dr. Farzana Ashfaq", phone: "042-1234568", email: "principal@gacdatanagar.edu.pk" },
    { dept: "Admissions Office", name: "Mr. Usman Farooq", phone: "042-1234569", email: "admissions@gacdatanagar.edu.pk" },
    { dept: "Examination Section", name: "Ms. Nida Khan", phone: "042-1234570", email: "exams@gacdatanagar.edu.pk" },
    { dept: "Accounts Office", name: "Mr. Hassan Raza", phone: "042-1234571", email: "accounts@gacdatanagar.edu.pk" },
    { dept: "Library", name: "Mr. Khalid Javed", phone: "042-1234572", email: "library@gacdatanagar.edu.pk" },
    { dept: "IT Department", name: "Professor Komal", phone: "042-1234573", email: "it@gacdatanagar.edu.pk" },
  ],
  aboutHistory: [],
  aboutVision: "",
  aboutMission: [],
  principalTitle: "",
  principalExperience: "",
  principalFullMessage: "",
  achievements: [],
  infrastructureCampus: [],
  infrastructureSupport: [],
  totalVisitors: 0,
  collegeName: "Govt. Associate College",
  collegeLocation: "Data Nagar, Lahore",
  collegeEstYear: "1981",
  collegeShortHistory: "",
  homeStats: [],
  homeFeatures: [],
};

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem("adminAuth") === "true");
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    const u = sessionStorage.getItem("adminUser");
    return u ? JSON.parse(u) : null;
  });
  const [loading, setLoading] = useState(true);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);

  const [news, setNewsState] = useState<NewsItem[]>([]);
  const [events, setEventsState] = useState<EventItem[]>([]);
  const [announcements, setAnnouncementsState] = useState<Announcement[]>([]);
  const [gallery, setGalleryState] = useState<GalleryItem[]>([]);
  const [settings, setSettingsState] = useState<SiteSettings>(defaultSettings);
  const [messages, setMessagesState] = useState<ContactMessage[]>([]);
  const [programs, setProgramsState] = useState<ProgramItem[]>([]);
  const [faculty, setFacultyState] = useState<FacultyItem[]>([]);
  const [facilities, setFacilitiesState] = useState<FacilityItem[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [n, e, a, g, s, c, p, f, fac] = await Promise.all([
        fetch(`${API_URL}/news`).then(res => res.json()),
        fetch(`${API_URL}/events`).then(res => res.json()),
        fetch(`${API_URL}/announcements`).then(res => res.json()).then(data => Array.isArray(data) ? data.map((x: any) => ({ ...x, text: x.content || x.title, active: x.isNew })) : []),
        fetch(`${API_URL}/gallery`).then(res => res.json()),
        fetch(`${API_URL}/settings`).then(res => res.json()),
        fetch(`${API_URL}/contact`).then(res => res.json()).catch(() => []),
        fetch(`${API_URL}/programs`).then(res => res.json()).catch(() => []),
        fetch(`${API_URL}/faculty`).then(res => res.json()).catch(() => []),
        fetch(`${API_URL}/facilities`).then(res => res.json()).catch(() => [])
      ]);
      setNewsState(Array.isArray(n) ? n : []);
      setEventsState(Array.isArray(e) ? e : []);
      setAnnouncementsState(a);
      setGalleryState(Array.isArray(g) ? g : []);
      if (s && !s.message) {
        setSettingsState(prev => ({ ...prev, ...s }));
      }
      setMessagesState(Array.isArray(c) ? c : []);
      setProgramsState(Array.isArray(p) ? p : []);
      setFacultyState(Array.isArray(f) ? f : []);
      setFacilitiesState(Array.isArray(fac) ? fac : []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/users/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      if (!res.ok) return false;
      const user = await res.json();
      setIsLoggedIn(true);
      setCurrentUser(user);
      sessionStorage.setItem("adminAuth", "true");
      sessionStorage.setItem("adminUser", JSON.stringify(user));
      return true;
    } catch { return false; }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    sessionStorage.removeItem("adminAuth");
    sessionStorage.removeItem("adminUser");
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`);
      const data = await res.json();
      setAdminUsers(Array.isArray(data) ? data : []);
    } catch { setAdminUsers([]); }
  };

  const addUser = async (user: { name: string; email: string; password: string }) => {
    const res = await fetch(`${API_URL}/users`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(user) });
    if (!res.ok) { 
      const d = await res.json(); 
      toast.error(d.message || "Failed to create user");
      throw new Error(d.message); 
    }
    await fetchUsers();
    toast.success("User created and saved successfully!");
  };

  const deleteUser = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
      if (!res.ok) { 
        const d = await res.json(); 
        toast.error(d.message || "Failed to delete user");
        throw new Error(d.message); 
      }
      setAdminUsers(adminUsers.filter(u => u.id !== id));
      toast.success("User deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete user");
      throw error;
    }
  };

  const addNews = async (item: Omit<NewsItem, "id">) => {
    try {
      const res = await fetch(`${API_URL}/news`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...item, summary: item.content.substring(0, 50) }) });
      const data = await res.json();
      setNewsState([data, ...news]);
      toast.success("News item saved and uploaded successfully!");
    } catch { toast.error("Failed to add news"); }
  };
  const updateNews = async (id: string, item: Partial<NewsItem>) => {
    try {
      const res = await fetch(`${API_URL}/news/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      const data = await res.json();
      setNewsState(news.map(n => n.id === id ? data : n));
      toast.success("News saved and updated successfully!");
    } catch { toast.error("Failed to update news"); }
  };
  const deleteNews = async (id: string) => {
    try {
      await fetch(`${API_URL}/news/${id}`, { method: "DELETE" });
      setNewsState(news.filter(n => n.id !== id));
      toast.success("News deleted successfully");
    } catch { toast.error("Failed to delete news"); }
  };

  const addEvent = async (item: Omit<EventItem, "id">) => {
    try {
      const res = await fetch(`${API_URL}/events`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...item, description: item.title }) });
      const data = await res.json();
      setEventsState([data, ...events]);
      toast.success("Event saved and uploaded successfully!");
    } catch { toast.error("Failed to add event"); }
  };
  const updateEvent = async (id: string, item: Partial<EventItem>) => {
    try {
      const res = await fetch(`${API_URL}/events/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      const data = await res.json();
      setEventsState(events.map(e => e.id === id ? data : e));
      toast.success("Event saved and updated successfully!");
    } catch { toast.error("Failed to update event"); }
  };
  const deleteEvent = async (id: string) => {
    try {
      await fetch(`${API_URL}/events/${id}`, { method: "DELETE" });
      setEventsState(events.filter(e => e.id !== id));
      toast.success("Event deleted successfully");
    } catch { toast.error("Failed to delete event"); }
  };

  const addAnnouncement = async (item: Omit<Announcement, "id">) => {
    try {
      const res = await fetch(`${API_URL}/announcements`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: item.text, content: item.text, type: "General", date: new Date().toISOString(), isNew: item.active }) });
      const data = await res.json();
      setAnnouncementsState([{ ...data, text: data.content, active: data.isNew }, ...announcements]);
      toast.success("Announcement saved and uploaded successfully!");
    } catch { toast.error("Failed to add announcement"); }
  };
  const updateAnnouncement = async (id: string, item: Partial<Announcement>) => {
    try {
      const res = await fetch(`${API_URL}/announcements/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isNew: item.active, content: item.text }) });
      const data = await res.json();
      const mapped = { ...data, text: data.content, active: data.isNew };
      setAnnouncementsState(announcements.map(a => a.id === id ? mapped : a));
      toast.success("Announcement saved and updated successfully!");
    } catch { toast.error("Failed to update announcement"); }
  };
  const deleteAnnouncement = async (id: string) => {
    try {
      await fetch(`${API_URL}/announcements/${id}`, { method: "DELETE" });
      setAnnouncementsState(announcements.filter(a => a.id !== id));
      toast.success("Announcement deleted successfully");
    } catch { toast.error("Failed to delete announcement"); }
  };

  const addGalleryItem = async (item: Omit<GalleryItem, "id">) => {
    try {
      const res = await fetch(`${API_URL}/gallery`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      const data = await res.json();
      setGalleryState([data, ...gallery]);
      toast.success("Image saved and uploaded successfully!");
    } catch { toast.error("Failed to add gallery item"); }
  };
  const deleteGalleryItem = async (id: string) => {
    try {
      await fetch(`${API_URL}/gallery/${id}`, { method: "DELETE" });
      setGalleryState(gallery.filter(g => g.id !== id));
      toast.success("Image deleted successfully");
    } catch { toast.error("Failed to delete gallery item"); }
  };

  const updateSettings = async (s: SiteSettings) => {
    try {
      const res = await fetch(`${API_URL}/settings`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s) });
      const data = await res.json();
      setSettingsState(data);
      toast.success("Data saved and updated successfully!");
    } catch { toast.error("Failed to update settings"); }
  };

  const incrementVisitor = async () => {
    try {
      const res = await fetch(`${API_URL}/settings/visit`, { method: "POST" });
      const data = await res.json();
      if (data.totalVisitors) {
        setSettingsState(prev => ({ ...prev, totalVisitors: data.totalVisitors }));
      }
    } catch (err) {
      console.error("Error incrementing visitor:", err);
    }
  };

  const addMessage = async (item: Omit<ContactMessage, "id" | "status" | "createdAt">) => {
    try {
      const res = await fetch(`${API_URL}/contact`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      const data = await res.json();
      setMessagesState([data, ...messages]);
      toast.success("Message sent successfully!");
    } catch { toast.error("Failed to send message"); }
  };
  const deleteMessage = async (id: string) => {
    try {
      await fetch(`${API_URL}/contact/${id}`, { method: "DELETE" });
      setMessagesState(messages.filter(m => m.id !== id));
      toast.success("Message deleted successfully");
    } catch { toast.error("Failed to delete message"); }
  };
  const markMessageRead = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/contact/${id}/read`, { method: "PUT" });
      if (res.ok) {
        const data = await res.json();
        setMessagesState(messages.map(m => m.id === id ? data : m));
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };


  const addProgram = async (item: Omit<ProgramItem, "id">) => {
    try {
      const res = await fetch(`${API_URL}/programs`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      const data = await res.json();
      setProgramsState([data, ...programs]);
      toast.success("Program added!");
    } catch { toast.error("Failed to add program"); }
  };
  const updateProgram = async (id: string, item: Partial<ProgramItem>) => {
    try {
      const res = await fetch(`${API_URL}/programs/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      const data = await res.json();
      setProgramsState(programs.map(p => p.id === id ? data : p));
      toast.success("Program updated!");
    } catch { toast.error("Failed to update program"); }
  };
  const deleteProgram = async (id: string) => {
    try {
      await fetch(`${API_URL}/programs/${id}`, { method: "DELETE" });
      setProgramsState(programs.filter(p => p.id !== id));
      toast.success("Program deleted");
    } catch { toast.error("Failed to delete program"); }
  };

  const addFaculty = async (item: Omit<FacultyItem, "id">) => {
    try {
      const res = await fetch(`${API_URL}/faculty`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      const data = await res.json();
      setFacultyState([data, ...faculty]);
      toast.success("Faculty added!");
    } catch { toast.error("Failed to add faculty"); }
  };
  const updateFaculty = async (id: string, item: Partial<FacultyItem>) => {
    try {
      const res = await fetch(`${API_URL}/faculty/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      const data = await res.json();
      setFacultyState(faculty.map(f => f.id === id ? data : f));
      toast.success("Faculty updated!");
    } catch { toast.error("Failed to update faculty"); }
  };
  const deleteFaculty = async (id: string) => {
    try {
      await fetch(`${API_URL}/faculty/${id}`, { method: "DELETE" });
      setFacultyState(faculty.filter(f => f.id !== id));
      toast.success("Faculty deleted");
    } catch { toast.error("Failed to delete faculty"); }
  };

  const addFacility = async (item: Omit<FacilityItem, "id">) => {
    try {
      const res = await fetch(`${API_URL}/facilities`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      const data = await res.json();
      setFacilitiesState([data, ...facilities]);
      toast.success("Facility added!");
    } catch { toast.error("Failed to add facility"); }
  };
  const updateFacility = async (id: string, item: Partial<FacilityItem>) => {
    try {
      const res = await fetch(`${API_URL}/facilities/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      const data = await res.json();
      setFacilitiesState(facilities.map(f => f.id === id ? data : f));
      toast.success("Facility updated!");
    } catch { toast.error("Failed to update facility"); }
  };
  const deleteFacility = async (id: string) => {
    try {
      await fetch(`${API_URL}/facilities/${id}`, { method: "DELETE" });
      setFacilitiesState(facilities.filter(f => f.id !== id));
      toast.success("Facility deleted");
    } catch { toast.error("Failed to delete facility"); }
  };

  return (
    <AdminContext.Provider value={{
      isLoggedIn, currentUser, loading, login, logout,
      news, addNews, updateNews, deleteNews,
      events, addEvent, updateEvent, deleteEvent,
      announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement,
      gallery, addGalleryItem, deleteGalleryItem,
      settings, updateSettings, incrementVisitor,
      messages, addMessage, deleteMessage, markMessageRead,
      programs, addProgram, updateProgram, deleteProgram,
      faculty, addFaculty, updateFaculty, deleteFaculty,
      facilities, addFacility, updateFacility, deleteFacility,
      adminUsers, fetchUsers, addUser, deleteUser
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}

