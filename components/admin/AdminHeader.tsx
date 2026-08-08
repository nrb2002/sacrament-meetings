"use client";

import Link from "next/link";
import { CalendarPlus, LogOut } from "lucide-react";

import { signOutUser } from "@/lib/actions";

interface AdminHeaderProps {
  onMenuClick: () => void;
  userName: string;
}

export default function AdminHeader({
  onMenuClick,
  userName,
}: AdminHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Page title */}
      <div className="hidden lg:block">
        <p className="text-sm text-gray-500">Administration</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Create Meeting */}
        <Link
          href="/admin/meetings/new"
          aria-label="Create new meeting"
          className="flex items-center gap-2 rounded-lg bg-sky-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          <CalendarPlus size={18} aria-hidden="true" />

          <span className="hidden sm:inline">Create Meeting</span>

          <span className="sm:hidden">Create</span>
        </Link>

        {/* Sign Out */}
        <form action={signOutUser}>
          <button
            type="submit"
            aria-label="Sign out"
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <LogOut size={18} aria-hidden="true" />

            <span className="hidden sm:inline">Sign Out</span>

            <span className="sm:hidden">Exit</span>
          </button>
        </form>

        {/* User */}
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-800"
          title={userName}
          aria-label={`Signed in as ${userName}`}
        >
          {userName.charAt(0).toUpperCase()}
        </div>

        {/* User name */}
        <span className="hidden max-w-32 truncate text-sm font-medium text-gray-700 md:block">
          {userName}
        </span>
      </div>
    </header>
  );
}
