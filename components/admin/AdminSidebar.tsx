// components/admin/AdminSidebar.

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "▦",
  },
];

const meetingNavigation = [
  {
    title: "All Meetings",
    href: "/admin/meetings",
    icon: "▤",
  },
  {
    title: "Current Meeting",
    href: "/admin/meetings/current",
    icon: "●",
  },
  {
    title: "Upcoming Meetings",
    href: "/admin/meetings/upcoming",
    icon: "→",
  },
  {
    title: "Past Meetings",
    href: "/admin/meetings/past",
    icon: "◷",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-white lg:block">
      {/* Logo / Brand */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin" className="text-lg font-bold text-gray-900">
          Sacrament Planner
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex h-[calc(100vh-4rem)] flex-col px-4 py-6">
        <div className="space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-sky-100 text-sky-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="w-5 text-center">{item.icon}</span>

                {item.title}
              </Link>
            );
          })}
        </div>

        {/* Meetings */}
        <div className="mt-8">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Meetings
          </p>

          <div className="space-y-1">
            {meetingNavigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-sky-100 text-sky-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="w-5 text-center">{item.icon}</span>

                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Actions
          </p>

          <Link
            href="/admin/meetings/new"
            className="flex items-center gap-3 rounded-lg bg-sky-700 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            <span className="w-5 text-center text-lg">+</span>
            Create Meeting
          </Link>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-auto border-t pt-4">
          <Link
            href="/meetings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <span className="w-5 text-center">↗</span>
            View Public Site
          </Link>
        </div>
      </nav>
    </aside>
  );
}
