"use client";

import Link from "next/link";


interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      {/* Mobile menu button */}

      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
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

      {/* Page title area */}

      <div className="hidden lg:block">
        <p className="text-sm text-gray-500">
          Administration
        </p>
      </div>

      {/* Right side */}

      <div className="flex items-center gap-3">
        <Link
          href="/meetings"
          className="hidden text-sm font-medium text-gray-600 hover:text-sky-700 sm:block"
        >
          View Website
        </Link>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-800">
          A
        </div>
      </div>
    </header>
  );
}