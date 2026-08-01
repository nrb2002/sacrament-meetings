// components/admin/RecentMeetings.tsx

import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface RecentMeetingsProps {
  meetings: SacramentMeeting[];
}

export default function RecentMeetings({
  meetings,
}: RecentMeetingsProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <div>
          <h2 className="font-semibold text-gray-900">
            Recent & Upcoming Meetings
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View your latest and upcoming meeting plans.
          </p>
        </div>

        <Link
          href="/admin/meetings"
          className="text-sm font-medium text-sky-700 hover:text-sky-900"
        >
          View all
        </Link>
      </div>

      {/* Meeting List */}
      <div className="divide-y divide-gray-100">
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <Link
              key={meeting.id}
              href={`/admin/meetings/${meeting.id}`}
              className="block px-6 py-4 transition hover:bg-gray-50"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Meeting Information */}
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-gray-900">
                      {meeting.date}
                    </p>

                    <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium capitalize text-sky-700">
                      {meeting.meetingType}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-sm text-gray-500">
                    Presiding: {meeting.presiding}
                  </p>
                </div>

                {/* Arrow */}
                <span
                  aria-hidden="true"
                  className="text-lg text-gray-400"
                >
                  →
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="px-6 py-12 text-center">
            <p className="font-medium text-gray-700">
              No meetings found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Create your first meeting to get started.
            </p>

            <Link
              href="/admin/meetings/new"
              className="mt-4 inline-block rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800"
            >
              Create Meeting
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}