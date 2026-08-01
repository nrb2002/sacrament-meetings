// app/(admin)/admin/layout.tsx

import type { ReactNode } from "react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <AdminSidebar />

      {/* Main Dashboard Area */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

