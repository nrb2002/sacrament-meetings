// app/(public)/meetings/page.tsx

import MeetingCard from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">
        All Meetings
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
          />
        ))}
      </div>
    </>
  );
}