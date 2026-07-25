// app/(admin)/admin/meetings/page.tsx

import Link from "next/link";

import MeetingCard from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

export default async function AdminMeetingsPage() {
  const meetings = await getMeetings();

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Manage Meetings
          </h1>

          <p className="mt-2 text-gray-600">
            View and manage sacrament meeting programs.
          </p>
        </div>

        <Link
          href="/admin/meetings/new"
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Create Meeting
        </Link>
      </div>

      {meetings.length === 0 ? (
        <p className="py-12 text-center text-gray-600">
          No meetings found.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))}
        </div>
      )}
    </>
  );
}