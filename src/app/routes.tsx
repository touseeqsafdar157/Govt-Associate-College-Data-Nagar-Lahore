import { createBrowserRouter } from "react-router";
import { Root } from "./components/layout/Root";
import { AdminRoot } from "./components/layout/AdminRoot";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { AcademicsPage } from "./pages/AcademicsPage";
import { AdmissionsPage } from "./pages/AdmissionsPage";
import { FacultyPage } from "./pages/FacultyPage";
import { LabsPage } from "./pages/LabsPage";
import { ResultsPage } from "./pages/ResultsPage";
import { CampusLifePage } from "./pages/CampusLifePage";
import { GalleryPage } from "./pages/GalleryPage";
import { NewsPage } from "./pages/NewsPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminNews } from "./pages/admin/AdminNews";
import { AdminEvents } from "./pages/admin/AdminEvents";
import { AdminAnnouncements } from "./pages/admin/AdminAnnouncements";
import { AdminGallery } from "./pages/admin/AdminGallery";
import { AdminSettings } from "./pages/admin/AdminSettings";

export const router = createBrowserRouter([
  // Public website
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "academics", Component: AcademicsPage },
      { path: "admissions", Component: AdmissionsPage },
      { path: "faculty", Component: FacultyPage },
      { path: "labs", Component: LabsPage },
      { path: "results", Component: ResultsPage },
      { path: "campus-life", Component: CampusLifePage },
      { path: "gallery", Component: GalleryPage },
      { path: "news", Component: NewsPage },
      { path: "contact", Component: ContactPage },
    ],
  },
  // Admin panel — AdminRoot handles login gate internally
  {
    path: "/admin",
    Component: AdminRoot,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "dashboard", Component: AdminDashboard },
      { path: "news", Component: AdminNews },
      { path: "events", Component: AdminEvents },
      { path: "announcements", Component: AdminAnnouncements },
      { path: "gallery", Component: AdminGallery },
      { path: "settings", Component: AdminSettings },
    ],
  },
]);
