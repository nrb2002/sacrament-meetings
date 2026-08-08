import Link from "next/link";
import type { DashboardMeeting } from "@/lib/dashboard-db";

interface RecentMeetingsProps {
  meetings: DashboardMeeting[];
}

export default function RecentMeetings({
  meetings,
}: RecentMeetingsProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Meetings
          </h2>

          <p className="text-sm text-gray-500">
            Recently completed meetings.
          </p>
        </div>

        <Link
          href="/admin/meetings/past"
          className="text-sm font-medium text-sky-700 hover:text-sky-900"
        >
          View all
        </Link>
      </div>

      <div className="divide-y divide-gray-100">
        {meetings.length === 0 ? (
          <p className="py-6 text-sm text-gray-500">
            No past meetings found.
          </p>
        ) : (
          meetings.map((meeting) => (
            <Link
              key={meeting.id}
              href={`/admin/meetings/${meeting.id}`}
              className="block py-4 transition hover:bg-gray-50"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {meeting.meetingType}
                  </p>

                  <p className="text-sm text-gray-500">
                    {meeting.date}
                  </p>
                </div>

                <span className="text-sm text-gray-600">
                  {meeting.attendance ?? "Not recorded"}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}