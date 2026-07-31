// app/(admin)/admin/layout.tsx

import type { ReactNode } from "react";
import Link from "next/link";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <section>
      <div className="mb-8 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>

            <p className="text-sm text-gray-500">Sacrament Meeting Planner</p>
          </div>

          <nav className="flex gap-4 text-sm font-medium">
            <Link
              href="/admin/meetings"
              className="text-gray-700 hover:text-blue-600"
            >
              Meetings
            </Link>

            <Link
              href="/admin/meetings/new"
              className="text-gray-700 hover:text-blue-600"
            >
              Create Meeting
            </Link>

            <Link
              href="/meetings"
              className="text-gray-700 hover:text-blue-600"
            >
              Public Site
            </Link>
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </section>
  );
}
