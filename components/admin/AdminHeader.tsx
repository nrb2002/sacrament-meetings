
// components/admin/AdminHeader.

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

function getPageTitle(pathname: string) {
  if (pathname === "/admin") {
    return "Dashboard";
  }

  if (pathname === "/admin/meetings") {
    return "All Meetings";
  }

  if (pathname === "/admin/meetings/new") {
    return "Create Meeting";
  }

  if (pathname.includes("/edit")) {
    return "Edit Meeting";
  }

  if (pathname.startsWith("/admin/meetings/")) {
    return "Meeting Details";
  }

  return "Admin Dashboard";
}

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  const isCreateMeetingPage =
    pathname === "/admin/meetings/new";

  return (
    <header className="sticky top-0 z-30 border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            aria-label="Open navigation menu"
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {pageTitle}
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Sacrament Meeting Planner
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {!isCreateMeetingPage && (
            <Link
              href="/admin/meetings/new"
              className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              <span className="sm:hidden">
                +
              </span>

              <span className="hidden sm:inline">
                + Create Meeting
              </span>
            </Link>
          )}

          {/* Admin Profile */}
          <div className="hidden items-center gap-3 border-l pl-4 sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-700">
              A
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-900">
                Admin
              </p>

              <p className="text-xs text-gray-500">
                Bishopric
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

