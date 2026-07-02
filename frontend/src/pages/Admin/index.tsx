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
    setAdminUser(null);
    toast.success("Logged out successfully");
  };

  if (adminUser) {
    return <AdminDashboard adminUser={adminUser} onLogout={handleLogout} />;
  }

  return <AdminLogin setAdminUser={setAdminUser} />;
};

export default AdminRoot;
