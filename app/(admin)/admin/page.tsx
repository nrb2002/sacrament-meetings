// app/(admin)/admin/page.tsx

import Link from "next/link";

import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export default async function AdminDashboardPage() {
  const [meetings, totalPages] = await Promise.all([
    getMeetings("", 1),
    getMeetingsTotalPages(""),
  ]);

  const today = new Date().toISOString().split("T")[0];

  const upcomingMeetings = meetings.filter((meeting) => meeting.date >= today);

  const pastMeetings = meetings.filter((meeting) => meeting.date < today);

  const totalMeetings = totalPages * 5;

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome to your Sacrament Meeting Planner. Manage upcoming meetings
          and review meeting history.
        </p>
      </div>

      {/* Statistics */}
      <section>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total Meetings */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Meetings</p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalMeetings}
            </p>

            <p className="mt-1 text-xs text-gray-500">All recorded meetings</p>
          </div>

          {/* Upcoming */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Upcoming</p>

            <p className="mt-2 text-3xl font-bold text-sky-700">
              {upcomingMeetings.length}
            </p>

            <p className="mt-1 text-xs text-gray-500">Meetings scheduled</p>
          </div>

          {/* Past */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Past Meetings</p>

            <p className="mt-2 text-3xl font-bold text-gray-700">
              {pastMeetings.length}
            </p>

            <p className="mt-1 text-xs text-gray-500">Meetings completed</p>
          </div>

          {/* This Month */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">This Month</p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {
                meetings.filter((meeting) =>
                  meeting.date.startsWith(today.substring(0, 7)),
                ).length
              }
            </p>

            <p className="mt-1 text-xs text-gray-500">Meetings this month</p>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Upcoming Meetings */}
        <section className="rounded-xl border bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div>
              <h2 className="font-semibold text-gray-900">Upcoming Meetings</h2>

              <p className="text-sm text-gray-500">
                Your next scheduled meetings
              </p>
            </div>

            <Link
              href="/admin/meetings"
              className="text-sm font-medium text-sky-700 hover:text-sky-900"
            >
              View all
            </Link>
          </div>

          <div className="divide-y">
            {upcomingMeetings.length > 0 ? (
              upcomingMeetings.map((meeting) => (
                <Link
                  key={meeting.id}
                  href={`/admin/meetings/${meeting.id}`}
                  className="block px-6 py-4 transition hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {meeting.date}
                      </p>

                      <p className="mt-1 text-sm capitalize text-gray-500">
                        {meeting.meetingType}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">
                        {meeting.presiding}
                      </p>

                      <p className="text-xs text-gray-500">Presiding</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-6 py-10 text-center">
                <p className="text-sm text-gray-500">
                  No upcoming meetings found.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900">Quick Actions</h2>

          <p className="mt-1 text-sm text-gray-500">
            Common administrative tasks
          </p>

          <div className="mt-6 space-y-3">
            <Link
              href="/admin/meetings/new"
              className="flex items-center justify-between rounded-lg bg-sky-700 px-4 py-3 font-semibold text-white transition hover:bg-sky-800"
            >
              <span>Create Meeting</span>
              <span>+</span>
            </Link>

            <Link
              href="/admin/meetings"
              className="flex items-center justify-between rounded-lg border px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <span>Manage Meetings</span>
              <span>→</span>
            </Link>

            <Link
              href="/meetings"
              className="flex items-center justify-between rounded-lg border px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <span>View Public Site</span>
              <span>↗</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
