import Link from "next/link";

import DashboardStats from "@/components/admin/DashboardStats";
import AttendanceChart from "@/components/admin/AttendanceChart";
import RecentMeetings from "@/components/admin/RecentMeetings";
import UpcomingMeetings from "@/components/admin/UpcomingMeetings";

import {
  getMeetingStats,
  getAttendanceTrend,
  getRecentMeetings,
  getUpcomingMeetings,
} from "@/lib/dashboard-db";

export default async function AdminDashboardPage() {
  const [stats, attendanceTrend, recentMeetings, upcomingMeetings] =
    await Promise.all([
      getMeetingStats(),
      getAttendanceTrend(),
      getRecentMeetings(),
      getUpcomingMeetings(),
    ]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      {/* Dashboard Header */}

      <section>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
          Manage sacrament meetings, review recent activity, and monitor
          attendance.
        </p>
      </section>

      {/* Quick Actions */}

      <section className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/admin/meetings/new"
          className="rounded-lg bg-sky-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-sky-800"
        >
          Create New Meeting
        </Link>

        <Link
          href="/admin/meetings"
          className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          View All Meetings
        </Link>
      </section>

      {/* Statistics */}

      <DashboardStats stats={stats} />

      {/* Attendance */}

      <AttendanceChart data={attendanceTrend} />

      {/* Recent and Upcoming */}

      <section className="grid gap-6 xl:grid-cols-2">
        <RecentMeetings meetings={recentMeetings} />

        <UpcomingMeetings meetings={upcomingMeetings} />
      </section>
    </div>
  );
}
