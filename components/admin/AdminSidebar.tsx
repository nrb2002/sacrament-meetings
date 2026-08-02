"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: "⌂",
  },
  {
    name: "Current Meeting",
    href: "/admin/meetings/current",
    icon: "▣",
  },
  {
    name: "Future Meetings",
    href: "/admin/meetings/future",
    icon: "◷",
  },
  {
    name: "Past Meetings",
    href: "/admin/meetings/past",
    icon: "✓",
  },
  {
    name: "All Meetings",
    href: "/admin/meetings",
    icon: "▣",
  },
  {
    name: "Attendance",
    href: "/admin/attendance",
    icon: "♙",
  },
  {
    name: "Reports",
    href: "/admin/reports",
    icon: "▥",
  },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({
  mobileOpen,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64
          flex-col border-r border-gray-200 bg-white
          transition-transform duration-300
          lg:static lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-gray-200 px-6">
          <Link href="/admin" onClick={onClose} className="flex flex-col">
            <span className="text-lg font-bold text-sky-800">
              Sacrament Meeting
            </span>

            <span className="text-sm text-gray-500">Planner</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Management
          </p>

          {navigation.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 rounded-lg px-3 py-3
                  text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-sky-50 text-sky-800"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md text-lg">
                  {item.icon}
                </span>

                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200 p-4">
          <Link
            href="/meetings"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="text-lg">←</span>
            Back to Website
          </Link>
        </div>
      </aside>
    </>
  );
}
