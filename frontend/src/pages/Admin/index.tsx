import { useState, useEffect } from "react";
import { AdminLogin } from "./AdminLogin";
import { AdminDashboard } from "./AdminDashboard";

export interface AdminUser {
  id: string;
  email: string;
}

import { toast } from "react-hot-toast";

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const decoded = window.atob(base64);
    const payload = JSON.parse(decoded);
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return true;
    }
    return false;
  } catch (e) {
    return true;
  }
};

export const AdminRoot = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminUser");
    const token = localStorage.getItem("admin_token");
    if (savedAdmin && token && !isTokenExpired(token)) {
      try {
        setAdminUser(JSON.parse(savedAdmin));
      } catch (e) {
        localStorage.removeItem("adminUser");
        localStorage.removeItem("admin_token");
      }
    } else {
      localStorage.removeItem("adminUser");
      localStorage.removeItem("admin_token");
      setAdminUser(null);
    }
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      localStorage.removeItem("adminUser");
      localStorage.removeItem("admin_token");
      setAdminUser(null);
      toast.error("Session expired. Please log in again.");
    };

    window.addEventListener("admin-unauthorized", handleUnauthorized);

    const interval = setInterval(() => {
      const token = localStorage.getItem("admin_token");
      if (token && isTokenExpired(token)) {
        handleUnauthorized();
      }
    }, 15000);

    return () => {
      window.removeEventListener("admin-unauthorized", handleUnauthorized);
      clearInterval(interval);
    };
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
