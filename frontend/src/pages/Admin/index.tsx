import { useState, useEffect } from "react";
import { AdminLogin } from "./AdminLogin";
import { AdminDashboard } from "./AdminDashboard";

export interface AdminUser {
  id: string;
  email: string;
}

import { toast } from "react-hot-toast";

export const AdminRoot = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminUser");
    if (savedAdmin) {
      try {
        setAdminUser(JSON.parse(savedAdmin));
      } catch (e) {
        localStorage.removeItem("adminUser");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("admin_token");
    setAdminUser(null);
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    if (adminUser) {
      if (window.location.pathname === "/admin/login" || window.location.pathname === "/admin" || window.location.pathname === "/admin/") {
         window.history.pushState({}, "", "/admin/dashboard");
         window.dispatchEvent(new Event("navigate"));
      }
    } else {
      if (window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin/login") {
         window.history.pushState({}, "", "/admin/login");
         window.dispatchEvent(new Event("navigate"));
      }
    }
  }, [adminUser]);

  if (adminUser) {
    return <AdminDashboard adminUser={adminUser} onLogout={handleLogout} />;
  }

  return <AdminLogin setAdminUser={setAdminUser} />;
};

export default AdminRoot;
