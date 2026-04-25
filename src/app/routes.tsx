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
import { AdminResults } from "./pages/admin/AdminResults";
import { AdminApplications } from "./pages/admin/AdminApplications";
import { AdminMessages } from "./pages/admin/AdminMessages";
import { AdminCampusLife } from "./pages/admin/AdminCampusLife";
import { AdminAcademics } from "./pages/admin/AdminAcademics";
import { AdminFaculty } from "./pages/admin/AdminFaculty";
import { AdminFacilities } from "./pages/admin/AdminFacilities";
import { AdminUsers } from "./pages/admin/AdminUsers";

export const router = createBrowserRouter([
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
      { path: "campus-life", Component: AdminCampusLife },
      { path: "academics", Component: AdminAcademics },
      { path: "faculty", Component: AdminFaculty },
      { path: "facilities", Component: AdminFacilities },
      { path: "settings", Component: AdminSettings },
      { path: "results", Component: AdminResults },
      { path: "applications", Component: AdminApplications },
      { path: "messages", Component: AdminMessages },
      { path: "users", Component: AdminUsers },
    ],
  },
]);
