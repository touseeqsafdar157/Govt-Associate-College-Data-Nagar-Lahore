import React from "react";  // ✅ Yeh add karo
import { RouterProvider } from "react-router";
import { AdminProvider } from "./context/AdminContext";
import { Toaster } from "./components/ui/sonner";
import { router } from "./routes";

export default function App() {
  return (
    <AdminProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AdminProvider>
  );
}
