// components/admin/AdminMobileSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminMobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "▦",
  },
  {
    title: "All Meetings",
    href: "/admin/meetings",
    icon: "▤",
  },
  {
    title: "Create Meeting",
    href: "/admin/meetings/new",
    icon: "+",
  },
];

export default function AdminMobileSidebar({
  isOpen,
  onClose,
}: AdminMobileSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-5">
          <Link
            href="/admin"
            onClick={onClose}
            className="text-lg font-bold text-gray-900"
          >
            Sacrament Planner
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close navigation menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Navigation
          </p>

          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-sky-100 text-sky-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center">
                  {item.icon}
                </span>

                {item.title}
              </Link>
            );
          })}

          {/* Public Site */}
          <div className="mt-8 border-t pt-6">
            <Link
              href="/meetings"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <span className="flex h-6 w-6 items-center justify-center">
                ↗
              </span>
              View Public Site
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
