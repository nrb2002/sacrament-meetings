import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface UpcomingMeetingsProps {
  meetings: SacramentMeeting[];
}

export default function UpcomingMeetings({
  meetings,
}: UpcomingMeetingsProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Upcoming Meetings
          </h2>

          <p className="text-sm text-gray-500">
            Your next scheduled meetings.
          </p>
        </div>

        <Link
          href="/admin/meetings"
          className="text-sm font-medium text-sky-700 hover:text-sky-900"
        >
          View all
        </Link>
      </div>

      <div className="divide-y divide-gray-100">
        {meetings.length === 0 ? (
          <p className="py-6 text-sm text-gray-500">
            No upcoming meetings found.
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
                  <p className="font-medium capitalize text-gray-900">
                    {meeting.meetingType}
                  </p>

                  <p className="text-sm text-gray-500">
                    {meeting.date}
                  </p>
                </div>

                <span className="text-sm text-gray-600">
                  {meeting.presiding}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}